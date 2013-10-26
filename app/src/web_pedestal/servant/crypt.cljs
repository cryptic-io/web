(ns web-pedestal.servant.crypt
  "A Separate namespace for the worker, this will also be compiled in a
  separate file to avoid giving the worker all of pedestal."
  (:require 
    [cljs.core.async :refer [chan close! timeout put!]]
    [servant.core :as servant]
    [servant.worker :as worker])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]
                   [servant.macros :refer [defservantfn]]))

;; This function is interesting, because we have a whole bunch of arraybuffers, and our servant-fn
;; We map through them creating a lazy seq of channels that will hold the value of the encrypted
;; arraybuffers. We loop through each one in sequence and add them to a ciphertexts seq
(defn encrypt-arraybuffers 
  "Given a seq of arraybuffers lets encrypt them all, returns a channel"
  [arraybuffers encrypt-servant-fn passwords IVs]
  (let [ servant-channels (map #(encrypt-servant-fn [%2 %3 %1] [%1]) arraybuffers passwords IVs)
        ciphertexts-channel (chan)]
    (go 
      (loop [servant-channels servant-channels    
             ciphertexts []]
        (if (seq servant-channels)
          (recur (rest servant-channels)
                 (conj ciphertexts (<! (first servant-channels))))
          (>! ciphertexts-channel ciphertexts))))
    ciphertexts-channel))

;; Here we do the same thing, but we need to include tags, since we are using CCM encryption
(defn decrypt-arraybuffers 
  "Given a seq of arraybuffers lets encrypt them all"
  [arraybuffers decrypt-servant-fn tags passwords IVs]
  (let [ servant-channels (map #(decrypt-servant-fn [%1 %2 %3 %4] [%4]) passwords IVs tags arraybuffers)
         plaintexts-channel (chan) ]
    (go 
      (loop [servant-channels servant-channels    
             plaintexts []]
        (if (seq servant-channels)
          (recur (rest servant-channels)
                 (conj plaintexts (<! (first servant-channels))))
          (>! plaintexts-channel plaintexts))))
    plaintexts-channel))


;;These are the underlying functions for cryptography
(defn encrypt-arraybuffer [password iv arraybuffer]
  (let [ aes (js/sjcl.cipher.aes. password)]
    (.encrypt js/sjcl.arrayBuffer.ccm
       aes arraybuffer iv))) 

(defn decrypt-arraybuffer [password iv tag arraybuffer]
  (let [ aes (js/sjcl.cipher.aes. password)]
    (.decrypt js/sjcl.arrayBuffer.ccm
       aes arraybuffer iv tag))) 

;; Here we put out servantfn wrapper around the raw crypto fns
;; Notice how we return a vector of two items:
;;  [ result [arrayBuffer1 arrayBuffer2] ]
;; We do this because we are planning to send arraybuffer messages
;; Which means we save time by transffering context
(defservantfn servant-encrypt [password iv arraybuffer]
  (let [cipherObj (encrypt-arraybuffer password iv arraybuffer)]
    [cipherObj [(aget cipherObj "ciphertext_buffer")]]))

(defservantfn servant-decrypt [password iv tag arraybuffer]
  (let [decrypted-arraybuffer (decrypt-arraybuffer password iv tag arraybuffer)]
    [decrypted-arraybuffer [decrypted-arraybuffer]]))

(defservantfn simple-test [stuff]
  (str "woot!" stuff))

