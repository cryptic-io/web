(ns web-pedestal.servant.crypt
  "A Separate namespace for the worker, this will actually be compiled in a separate file to avoid giving the worker all of pedestal"
  (:require 
    [cljs.core.async :refer [chan close! timeout put!]]
    [servant.core :as servant]
    [servant.worker :as worker])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]
                   [servant.macros :refer [defservantfn]]))

(defn make-it-funny [not-funny]
      (str "Hahahah:" not-funny))

(defservantfn servant-with-humor [your-joke]
  (make-it-funny your-joke))

;;These are the underlying functions for cryptography
(defn encrypt-arraybuffer [password iv arraybuffer]
  (let [ aes (js/sjcl.cipher.aes. password) 
         arraybuffer (pad-arraybuffer arraybuffer)]
    (.encrypt js/sjcl.arrayBuffer.ccm
       aes arraybuffer iv))) 

(defn decrypt-arraybuffer [password iv tag arraybuffer]
  (let [ aes (js/sjcl.cipher.aes. password) 
         arraybuffer (pad-arraybuffer arraybuffer)]
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
