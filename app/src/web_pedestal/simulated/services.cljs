(ns web-pedestal.simulated.services
  (:require [io.pedestal.app.protocols :as p]
            [io.pedestal.app.messages :as msg]
            [servant.core :as servant]
            [web-pedestal.file-reader :as file-reader]
            [web-pedestal.chrome.file-system :as file-system]
            [cljs.core.async :refer [chan close! timeout put!]]
            [web-pedestal.servant.crypt :as crypt-servant])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))

;;We need to know what our worker file will be, this can be found in the cljsbuild config
(def worker-script "/crypt-worker.js")
(def worker-count 1)

;; Create our initial set of servants
(def servant-channel (servant/spawn-servants worker-count worker-script))

;; Some prefilled servant threads
(def encrypt-servant-fn (partial servant/servant-thread-with-key servant-channel servant/array-buffer-message :servant-encrypt))
(def decrypt-servant-fn (partial servant/servant-thread-with-key servant-channel servant/array-buffer-message :servant-decrypt))

(defn simulate-upload-string [string]
  (let [key (.fromBits js/sjcl.codec.hex (.randomWords js/sjcl.random 6))]
    (aset js/localStorage key string)
    key))

(defn simulate-fetch-string [key]
  (aget js/localStorage key))

(defn simulate-upload-arraybuffer [arraybuffer]
  (let [key (.fromBits js/sjcl.codec.hex (.randomWords js/sjcl.random 6))]
    (go 
      (<! (file-system/store-arraybuffer key arraybuffer))
      key)))


(defn simulate-fetch-arraybuffer [key]
  (file-system/fetch-arraybuffer key))
        
(defn upload-arraybuffer 
  "Uploads an array buffer, returns the channel of the completed action"
  [arraybuffer]
  (simulate-upload-arraybuffer arraybuffer))

(defn encrypt-arraybuffer [arraybuffer password IV]
  (encrypt-servant-fn [password IV arraybuffer] [arraybuffer]))

(defn decrypt-arraybuffer [arraybuffer password IV tag]
  (decrypt-servant-fn [password IV tag arraybuffer] [arraybuffer]))

(defn encrypt-arraybuffers [{:keys [arraybuffers passwords IVs]} input-queue]
  (doseq [ [arraybuffer password IV index] (map vector arraybuffers passwords IVs (range (count passwords))) ]
    (go
      (let [ciphertext-object (<! (encrypt-arraybuffer arraybuffer password IV))
            ct-buffer (aget ciphertext-object "ciphertext_buffer")
            tag (aget ciphertext-object "tag")]
        ;; give the frontend the encrypted file
        (p/put-message input-queue
                       {msg/type :add-encrypted-chunk
                        msg/topic [:upload-file :encrypted-file index]
                        :value ct-buffer})
        ;; now call the upload function
        (p/put-message input-queue
                       {msg/type :add-encrypted-chunk-info
                        msg/topic [:upload-file :manifest :chunks index]
                        :tag tag
                        :linkName (<! (upload-arraybuffer ct-buffer))
                        :password password
                        :IV IV
                        :index index})))))

(defn download-decrypt-chunk [{:keys [link IV password tag index]} input-queue]
  (.log js/console "downloading buffer")
  (go
    (let [buf (<! (simulate-fetch-arraybuffer link))]
      (.log js/console "buf is" buf)
      (p/put-message 
        input-queue
        {msg/type :swap
         msg/topic [:download-file :decrypted-chunks index]
         :value (<! (decrypt-arraybuffer buf password IV tag))}))))

(defn decrypt-arraybuffers [{:keys [arraybuffers passwords IVs tags]} input-queue]
  (.log js/console (str " I'm going to encrypt the array buffers" (clj->js arraybuffers) passwords IVs))
  (.log js/console "sending off to the web worker!")
  (go 
    (let [plaintext-objects (<! (crypt-servant/decrypt-arraybuffers arraybuffers decrypt-servant-fn tags passwords IVs))]
      (.log js/console "plaintext-objects where" (clj->js plaintext-objects))
      (p/put-message input-queue 
                     {msg/type :swap 
                      msg/topic [:upload-file :decrypted-file]
                      :value plaintext-objects})
      (.log js/console "finished decrypting"))))

(defn normal-service-call [message input-queue]
  (.log js/console (str "Sending message to server: " message)))

(defn upload-manifest [message input-queue]
  (p/put-message 
    input-queue
    {msg/type :swap
     msg/topic [:upload-file :manifest-link]
     :value (simulate-upload-string (:encrypted-manifest message))}))

(defn download-manifest [message input-queue]
  (p/put-message 
    input-queue
    {msg/type :swap
     msg/topic [:download-file :encrypted-manifest]
     :value (simulate-fetch-string (:link message))}))

(defn write-chunks-to-file [message input-queue]
  (go
     (p/put-message
       input-queue
       {msg/type :swap
        msg/topic [:download-file :decrypted-link]
        :value (<! (file-system/write-arraybuffers-to-file (:file-name message) (:value message)))})))

(defn services-router [message input-queue]
  (.log js/console "I got " message " and I'm routing it")
  (condp = (msg/type message) 
    :encrypt (encrypt-arraybuffers message input-queue)
    :decrypt (decrypt-arraybuffers message input-queue)
    :upload-encrypted-manifest (upload-manifest message input-queue)
    :fetch-manifest (download-manifest message input-queue)
    :fetch-chunk (download-decrypt-chunk message input-queue)
    :write-chunks (write-chunks-to-file message input-queue)
    (normal-service-call message input-queue)))


(defrecord MockServices [app]
  p/Activity
  (start [this])
  (stop [this]))
