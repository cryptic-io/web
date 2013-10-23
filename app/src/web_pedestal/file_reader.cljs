(ns web-pedestal.file-reader
  "Deals with reading file objects"
  (:require 
    [cljs.core.async :refer [chan close! timeout put! take!]])
  (:require-macros [cljs.core.async.macros :as m :refer [go]]
                   [web-pedestal.macros :refer [<!-and-apply go->]]))

(def chunk-size 2e6)

(defn concat-arraybuffer [ab1 ab2]
  (let [ab1-length (aget ab1 "byteLength")
        ab2-length (aget ab2 "byteLength")
        new-length (+  ab1-length ab2-length)
        new-ab (js/ArrayBuffer. new-length)
        d1 (js/DataView. ab1)
        d2 (js/DataView. ab2)
        new-d (js/DataView. new-ab) ]
    (doseq [x (range 0 ab1-length)] 
      (.setUint8 new-d x (.getUint8 d1 x)))
    (doseq [x (range 0 ab2-length) :let [new-d-index (+ x ab1-length)]]
      (.setUint8 new-d new-d-index (.getUint8 d1 x)))
    new-ab))

(defn- create-padding-arraybuffer [padding-count]
    (let [new-ab (js/ArrayBuffer. padding-count)
                  d (js/DataView. new-ab)]
          (doseq [x (range padding-count)]
                  (.setUint8 d x padding-count))
          new-ab))

(defn- pad-arraybuffer [arraybuffer]
  (let [remainder (mod (aget arraybuffer "byteLength") 16)]
    (if (= 0 remainder)
      arraybuffer
      (concat-arraybuffer arraybuffer (create-padding-arraybuffer (- 16 remainder))))))


(defn- pad-last-array-buffer [array-buffers]
  (conj
    (butlast array-buffers)
    (pad-arraybuffer (last array-buffers))))

(defn- remove-padding-from-last-array-buffer [file-size chunk-size array-buffers]
  (conj 
    (butlast array-buffers)
    (let [padding-count (- 16 (mod (mod file-size chunk-size) 16))
          arraybuffer (last array-buffers)]
      (if (= padding-count 16)
        arraybuffer
        (.slice arraybuffer 0 (- (mod file-size chunk-size) 16)))))) 

(defn split-file-into-blobs [file]
  (go 
    (mapv
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
  (go 
    (pad-last-array-buffer
      (<! 
        (get-arraybuffers-from-blobs 
          (<! (split-file-into-blobs file)))))))

(defn read-file-size [file]
  (.-size file))

