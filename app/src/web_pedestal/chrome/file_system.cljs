(ns web-pedestal.chrome.file-system
  (:require 
            [cljs.core.async :refer [chan close! timeout]])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]))


(defn append-to-file [fs filename blob]
  (let [append-channel (chan)]
    (.getFile (.-root fs) filename (js-obj "create" true)
      (fn [file-entry] 
        (.createWriter file-entry 
          (fn [file-writer]
            (.seek file-writer (.-length file-writer) )
            (aset file-writer "onwriteend" (fn [] (go (>! append-channel true))))
            (.write file-writer blob)))))
    append-channel))

(defn load-fs [size]
  (let [fs-channel (chan)]
    (.webkitRequestFileSystem js/window (.-TEMPORARY js/window) size #(go (>! fs-channel %) ) )
    fs-channel))

(defn delete-file [fs filename]
  (let [delete-channel (chan)]
    (.getFile (.-root fs) filename (js-obj "create" true)
      (fn [file-entry]
        (.remove file-entry
          (fn []
            (go (>! delete-channel true)))
          (fn []
            (go (>! delete-channel false))))))
    delete-channel))


(defn write-blobs-to-file 
  "Returns a channel with the url for the file"
  [filename blobs]
  (go
    (let [file-size (* (count blobs) (.-size (first blobs)))
          fs (<! (load-fs file-size))]
      (<! (delete-file fs filename))
      (doseq [blob blobs]
        (<! (append-to-file fs filename blob)))
      (str "filesystem:" js/location.origin "/temporary/" filename))))

(defn write-arraybuffers-to-file 
  "Returns a channel with the url for the file"
  [filename arraybuffers]
  (write-blobs-to-file 
    filename 
    (map #(js/Blob. (array %)) arraybuffers)))

(defn store-arraybuffer
  "store a single arraybuffer with a given key"
  [key arraybuffer]
  (write-arraybuffers-to-file key [arraybuffer]))

(defn fetch-arraybuffer
  "fetch a single arraybuffer"
  [ab-key]
  (let [arraybuffer-chan (chan)]
    (go 
      (let [fs (<! (load-fs (* 1024 1024)))]
        (.getFile (.-root fs) ab-key (js-obj)
          (fn [file-entry]
            (.file file-entry 
              (fn [file]
                (let [reader (js/FileReader.)]
                  (set! js/asdff reader)
                  (set! (.-onloadend reader) 
                        #(go (>! arraybuffer-chan (aget reader "result"))))
                  (.readAsArrayBuffer reader file))))))))
    arraybuffer-chan))


