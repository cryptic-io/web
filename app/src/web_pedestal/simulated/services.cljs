(ns web-pedestal.simulated.services
  (:require [io.pedestal.app.protocols :as p]
            [io.pedestal.app.messages :as msg]
            [servant.core :as servant]
            [cljs.core.async :refer [chan close! timeout put!]]
            [web-pedestal.servant.crypt :as crypt-servant])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

;;We need to know what our worker file will be, this can be found in the cljsbuild config
(def worker-script "/crypt-worker.js")
(def worker-count 1)
(def servant-channel (servant/spawn-servants worker-count worker-script))

;; Some prefilled servant threads
(def encrypt-servant-fn (partial servant/servant-thread-with-key servant-channel servant/array-buffer-message :servant-encrypt))
(def decrypt-servant-fn (partial servant/servant-thread-with-key servant-channel servant/array-buffer-message :servant-decrypt))

;; Create our initial set of servants

(defn encrypt-arraybuffers [{:keys [arraybuffers passwords IVs]} input-queue]
  (.log js/console (str " I'm going to encrypt the array buffers" arraybuffers passwords IVs))
  (.log js/console "sending off to the web worker!")
  (go 
    (let [ciphertext-objects (<! (crypt-servant/encrypt-arraybuffers arraybuffers encrypt-servant-fn passwords IVs))
          ciphertext-buffers (map #(aget % "ciphertext_buffer") ciphertext-objects)
          ciphertext-tags (map #(aget % "tag") ciphertext-objects)]
      (.log js/console "ciphertext-objects where" (clj->js ciphertext-objects))
      (p/put-message input-queue 
                     {msg/type :swap 
                      msg/topic [:file :encrypted-file]
                      :value ciphertext-buffers})
      (p/put-message input-queue
                     {msg/type :swap
                      msg/topic [:file :encrypted-file-tags]
                      :value ciphertext-tags})
      (.log js/console "finished encrypting!"))))

(defn decrypt-arraybuffers [{:keys [arraybuffers passwords IVs tags]} input-queue]
  (.log js/console (str " I'm going to encrypt the array buffers" (clj->js arraybuffers) passwords IVs))
  (.log js/console "sending off to the web worker!")
  (go 
    (let [plaintext-objects (<! (crypt-servant/decrypt-arraybuffers arraybuffers decrypt-servant-fn tags passwords IVs))]
      (.log js/console "plaintext-objects where" (clj->js plaintext-objects))
      (p/put-message input-queue 
                     {msg/type :swap 
                      msg/topic [:file :decrypted-file]
                      :value plaintext-objects})
      (.log js/console "finished decrypting"))))


(defn services-router [message input-queue]
  (.log js/console "I got " message " and I'm routing it")
  (condp = (msg/type message) 
    :encrypt (encrypt-arraybuffers message input-queue)
    :decrypt (decrypt-arraybuffers message input-queue)
    (normal-service-call message input-queue)))

(defn normal-service-call [message input-queue]
  (.log js/console (str "Sending message to server: " message)))

(defrecord MockServices [app]
  p/Activity
  (start [this])
  (stop [this]))
