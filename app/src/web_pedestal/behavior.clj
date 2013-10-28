(ns ^:shared web-pedestal.behavior
    (:require [clojure.string :as string]
              [io.pedestal.app :as app]
              [io.pedestal.app.util.platform :as platform]
              [io.pedestal.app.messages :as msg]
              [clojure.string :as s]))
;; While creating new behavior, write tests to confirm that it is
;; correct. For examples of various kinds of tests, see
;; test/web_pedestal/behavior-test.clj.

(defn init-main []
  (let [ab1 (js/ArrayBuffer. 1600)]
    [[:transform-enable [:main :upload-file :current-file] 
      :update-current-file 
      [{msg/topic [:upload-file :current-file] 
        (msg/param :file-size) {} 
        (msg/param :file-buffers) {} 
        (msg/param :file-type) {} 
        (msg/param :file-name) {} 
        (msg/param :chunk-size) {}}]]
     [:transform-enable [:main :upload-file] 
      :decrypt-file
      [{msg/topic [:upload-file :actions :decrypt-file]}]]
     [:transform-enable [:main :upload-file] 
      :use-test-file
      [{msg/topic [:upload-file :current-file] 
        msg/type :update-current-file
        :file-size 1600
        :file-type "application/octet-stream"
        :file-name "test-file1"
        :file-buffers [ab1]
        :chunk-size 2e6}]]
     [:transform-enable [:main :upload-file] 
      :use-test-file2
      [{msg/topic [:upload-file :current-file] 
        msg/type :update-current-file
        :file-size 16000
        :file-type "application/octet-stream"
        :file-name "test-file2"
        :file-buffers [(js/ArrayBuffer. 16000)]
        :chunk-size 2e6}]]
     [:transform-enable [:main :download-file] 
      :load-manifest
      [{msg/topic [:download-file :manifest-keys] 
        msg/type :load-manifest
        (msg/param :manifest-url) {}}]]
     [:transform-enable [:main :download-file] 
      :load-test-manifest
      [{msg/topic [:download-file :manifest-keys] 
        msg/type :load-manifest
        :manifest-url "#ccd448f309bca8795f7ba95ddf3eaab0d01c1e2e3f468291/O66xsj3y3qu-01w8-ukz4UFbYxwAXtMBtEYrIZUFy54"}]]]))

(defn update-current-file [_ {:keys [file-buffers file-size chunk-size file-type file-name]}]
  {:file-buffers file-buffers
   :file-size file-size
   :chunk-size chunk-size
   :file-type file-type
   :file-name file-name})

(defn encrypt-current-file [{:keys [arraybuffers passwords IVs]}]
  [{msg/type :encrypt 
    :arraybuffers arraybuffers
    :passwords passwords
    :IVs IVs}])

(defn decrypt-current-file [inputs]
  (when (= (first (:input-paths inputs))  (get-in inputs [:message msg/topic]))
    [{msg/type :decrypt
      :arraybuffers (get-in inputs [:new-model :upload-file :download-file])
      :passwords (get-in inputs [:new-model :upload-file :passwords])
      :IVs (get-in inputs [:new-model :upload-file :IVs])
      :tags (get-in inputs [:new-model :upload-file :encrypted-file-tags])}]))

(defn generate-passwords [_ arraybuffers]
  (let [count (count arraybuffers)]
    (for [_ (range count)]
      (.randomWords (.-random js/sjcl) 8))))

(defn generate-IVs [_ arraybuffers]
  (let [count (count arraybuffers)]
    (for [_ (range count)]
      (.randomWords (.-random js/sjcl) 2))))

(defn swap-value [_ new-message]
  (:value new-message))

(defn update-decrypt-action [_ _]
  (platform/date))

(defn save-manifest [_ manifest-map]
  manifest-map)

(defn update-chunk-info [_ message]
  (select-keys message [:tag :password :IV :linkName :index]))

(defn update-chunk-count [_ chunks]
  (count chunks))

(defn manifest-done? [inputs]
  (and 
    (not= 0 (get-in inputs [:new-model :upload-file :manifest :chunk-count]))
    (= (get-in inputs [:new-model :upload-file :manifest :chunk-count])
       (count (get-in inputs [:new-model :upload-file :current-file :file-buffers])))))

(defn generate-manifest-password-iv [_ inputs]
  (when (manifest-done? inputs)
    (let [iv (first (generate-IVs nil [:foo]))
          password (first (generate-passwords nil [:foo]))]
      {:IV iv
       :password password})))

(defn encrypt-manifest [_ inputs]
  (.log js/console "manifest count is" (get-in inputs [:new-model :upload-file :manifest :chunk-count]) (clj->js inputs))
  (when (manifest-done? inputs)
    ;; Done with the chunks, we can encrypt now
    (.log js/console "inputs where =")
    (let [iv (get-in inputs [:new-model :upload-file :manifest :keys :IV])
          password (get-in inputs [:new-model :upload-file :manifest :keys :password])]
      (.encrypt js/sjcl password (pr-str (js->clj (get-in inputs [:new-model :upload-file :manifest]))) (clj->js {:iv iv :ks 256}))))) 

(defn decrypt-manifest [_ {:keys [password encrypted-manifest]}]
  (when (not-any? nil? [password encrypted-manifest])
    (platform/safe-read-string (.decrypt js/sjcl password encrypted-manifest))))

(defn upload-encrypted-manifest [encrypted-manifest]
  [{msg/type :upload-encrypted-manifest
    :encrypted-manifest encrypted-manifest}])

(defn generate-manifest-url [_ {:keys [password manifest-link]}]
  (when-not (or (nil? password) (nil? manifest-link))
    (str "#" manifest-link "/" (.fromBits js/sjcl.codec.base64url password))))

(defn load-manifest [_ message]
  (let [[link password] (s/split (s/replace (:manifest-url message) #"#" "") #"/")
        password (.toBits js/sjcl.codec.base64url password)]
    {:link link
     :password password}))

(defn fetch-manifest [{:keys [link]}]
  [{msg/type :fetch-manifest
    :link link}])

(defn fetch-chunks [chunks]
  (when-not (nil? chunks)
    (for [{:keys [tag password linkName IV index]} (map second chunks)]
      {msg/type :fetch-chunk
        :tag tag
        :password password
        :link linkName
        :IV IV
        :index index})))

(defn decryption-done? [inputs]
  (and 
    (not= 0 (get-in inputs [:new-model :download-file :manifest :chunk-count]))
    (= (get-in inputs [:new-model :download-file :manifest :chunk-count])
       (count (get-in inputs [:new-model :download-file :decrypted-chunks])))))

(defn write-chunks-to-file [inputs]
  (.log js/console "checking if decryption is done" (clj->js inputs))
  (when (decryption-done? inputs)
    (.log js/console "It is")
    [{msg/type :write-chunks
      :file-name (get-in inputs [:new-model :download-file :manifest :file-name])
      :value (->>
               (get-in inputs [:new-model :download-file :decrypted-chunks])
               (apply vector)
               (sort-by first)
               (map second))}]))

(def cryptic-app
  ;; There are currently 2 versions (formats) for dataflow
  ;; description: the original version (version 1) and the current
  ;; version (version 2). If the version is not specified, the
  ;; description will be assumed to be version 1 and an attempt
  ;; will be made to convert it to version 2.
  {:version 2
   :transform [[:update-current-file [:upload-file :current-file] update-current-file]
               [:swap [:**] swap-value]
               [:load-manifest [:download-file :manifest-keys] load-manifest]
               [:decrypt-file [:upload-file :actions :decrypt-file] update-decrypt-action]
               [:add-encrypted-chunk [:upload-file :download-file :*] swap-value]
               [:add-encrypted-chunk-info [:upload-file :manifest :chunks :*] update-chunk-info] ]
   :derive [[#{[:upload-file :current-file :file-buffers]} 
              [:upload-file :IVs] generate-IVs :single-val]
             [#{[:upload-file :current-file :file-buffers]} 
              [:upload-file :passwords] generate-passwords :single-val]
            ;; Derive the manifest
            [{[:upload-file :IVs] :IVs 
              [:upload-file :passwords] :passwords
              [:upload-file :encrypted-file-tags] :encrypted-file-tags
              [:upload-file :current-file :file-size] :file-size
              [:upload-file :current-file :chunk-size] :chunk-size
              [:upload-file :current-file :file-type] :file-type
              [:upload-file :current-file :file-name] :file-name}
             [:upload-file :manifest] save-manifest :map]
            [#{[:upload-file :manifest :chunks]} [:upload-file :manifest :chunk-count] update-chunk-count :single-val]
            [#{[:upload-file :manifest]} [:upload-file :manifest :keys] generate-manifest-password-iv :default]
            [#{[:upload-file :manifest]} [:upload-file :encrypted-manifest] encrypt-manifest :default]
            [{[:upload-file :manifest-link] :manifest-link
              [:upload-file :manifest :keys :password] :password} 
             [:upload-file :manifest-url] generate-manifest-url :map]
            [{[:download-file :manifest-keys :password] :password
               [:download-file :encrypted-manifest] :encrypted-manifest}
             [:download-file :manifest] decrypt-manifest :map]]
   :effect #{[{[:upload-file :current-file :file-buffers] :arraybuffers
                [:upload-file :passwords] :passwords
                [:upload-file :IVs] :IVs}  
              encrypt-current-file :map]
             [[[:upload-file :actions :decrypt-file]] decrypt-current-file :default]
             [[[:upload-file :encrypted-manifest]] upload-encrypted-manifest :single-val]
             [[[:download-file :manifest-keys]] fetch-manifest :single-val]
             [[[:download-file :manifest :chunks]] fetch-chunks :single-val]
             [[[:download-file :decrypted-chunks]] write-chunks-to-file :default]}
   :emit [{:init init-main}
          [#{[:upload-file :encrypted-file]} (app/default-emitter [:main])]
          [#{[:upload-file :encrypted-manifest]} (app/default-emitter [:main])]
          [#{[:upload-file :decrypted-file]} (app/default-emitter [:main])]
          [#{[:download-file :*]} (app/default-emitter [:main])]
          [#{[:upload-file :actions :*]} (app/default-emitter [:main])]
          [#{[:upload-file :manifest]} (app/default-emitter [:main])]
          [#{[:upload-file :manifest-url]} (app/default-emitter [:main])]
          [#{[:upload-file :current-file]} (app/default-emitter [:main])]
          [#{[:debug :current-file :download-link]} (app/default-emitter [])]]})
