(ns web-pedestal.file-reader
  "Deals with reading file objects"
  (:require 
    [cljs.core.async :refer [chan close! timeout put! take!]])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]
                   [web-pedestal.macros :refer [<!-and-apply go->]]))

(def chunk-size 2e3)

(defn split-file-into-blobs [file]
  (go 
    (map 
      #(.slice file % (+ chunk-size %))
      (range 0 (aget file "size") chunk-size))))

(defn get-arraybuffers-from-blobs [blobs]
  (let [file-reader (js/FileReader.)
        arraybuffer-channel (chan)
        all-arraybuffers-chan (chan)]
    (set! (.-onload file-reader) 
          #(go 
             (>! arraybuffer-channel (aget file-reader "result"))))
    (go 
      (loop [blobs blobs arraybuffers []]
        (if (seq blobs)
          (do 
            (.readAsArrayBuffer file-reader (first blobs))
            (recur (rest blobs)
                   (conj arraybuffers (<! arraybuffer-channel))))
          (>! all-arraybuffers-chan arraybuffers))))
    all-arraybuffers-chan))

(defn split-file [file]
  (go (<! 
        (get-arraybuffers-from-blobs 
          (<! (split-file-into-blobs file))))))


