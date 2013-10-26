(ns ^:shared web-pedestal.behavior
    (:require [clojure.string :as string]
              [io.pedestal.app :as app]
              [io.pedestal.app.util.platform :as platform]
              [io.pedestal.app.messages :as msg]))
;; While creating new behavior, write tests to confirm that it is
;; correct. For examples of various kinds of tests, see
;; test/web_pedestal/behavior-test.clj.

(defn init-main []
  (let [ab1 (js/ArrayBuffer. 1600)]
    [[:transform-enable [:main :file :current-file] 
      :update-current-file 
      [{msg/topic [:file :current-file] 
        (msg/param :file-size) {} 
        (msg/param :file-buffers) {} 
        (msg/param :file-type) {} 
        (msg/param :file-name) {} 
        (msg/param :chunk-size) {}}]]
     [:transform-enable [:main :file] 
      :decrypt-file
      [{msg/topic [:file :actions :decrypt-file]}]]
    
     [:transform-enable [:main :file] 
      :use-test-file
      [{msg/topic [:file :current-file] 
        msg/type :update-current-file
        :file-size 1600
        :file-type "application/octet-stream"
        :file-name "test-file1"
        :file-buffers [ab1]
        :chunk-size 2e6}]]
     [:transform-enable [:main :file] 
      :use-test-file2
      [{msg/topic [:file :current-file] 
        msg/type :update-current-file
        :file-size 16000
        :file-type "application/octet-stream"
        :file-name "test-file2"
        :file-buffers [(js/ArrayBuffer. 16000)]
        :chunk-size 2e6}]]]))

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
      :arraybuffers (get-in inputs [:new-model :file :encrypted-file])
      :passwords (get-in inputs [:new-model :file :passwords])
      :IVs (get-in inputs [:new-model :file :IVs])
      :tags (get-in inputs [:new-model :file :encrypted-file-tags])}]))

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

(def cryptic-app
  ;; There are currently 2 versions (formats) for dataflow
  ;; description: the original version (version 1) and the current
  ;; version (version 2). If the version is not specified, the
  ;; description will be assumed to be version 1 and an attempt
  ;; will be made to convert it to version 2.
  {:version 2
   :transform [[:update-current-file [:file :current-file] update-current-file]
               [:swap [:**] swap-value]
               [:decrypt-file [:file :actions :decrypt-file] update-decrypt-action]]
   :derive [[#{[:file :current-file :file-buffers]} 
              [:file :IVs] generate-IVs :single-val]
             [#{[:file :current-file :file-buffers]} 
              [:file :passwords] generate-passwords :single-val]
            ;; Derive the manifest
            [{[:file :IVs] :IVs 
              [:file :passwords] :passwords
              [:file :encrypted-file-tags] :encrypted-file-tags
              [:file :current-file :file-size] :file-size
              [:file :current-file :chunk-size] :chunk-size
              [:file :current-file :file-type] :file-type
              [:file :current-file :file-name] :file-name}
             [:file :manifest] save-manifest :map] ]
   :effect #{[{[:file :current-file :file-buffers] :arraybuffers
                [:file :passwords] :passwords
                [:file :IVs] :IVs}  
              encrypt-current-file :map]
             [[[:file :actions :decrypt-file]] decrypt-current-file :default]}
   :emit [{:init init-main}
          [#{[:file :encrypted-file]} (app/default-emitter [:main])]
          [#{[:file :decrypted-file]} (app/default-emitter [:main])]
          [#{[:file :manifest]} (app/default-emitter [:main])]
          [#{[:file :current-file]} (app/default-emitter [:main])]
          [#{[:debug :current-file :download-link]} (app/default-emitter [])]]})

;; Once this behavior works, run the Data UI and record
;; rendering data which can be used while working on a custom
;; renderer. Rendering involves making a template:
;;
;; app/templates/web-pedestal.html
;;
;; slicing the template into pieces you can use:
;;
;; app/src/web_pedestal/html_templates.cljs
;;
;; and then writing the rendering code:
;;
;; app/src/web_pedestal/rendering.cljs

(comment
  ;; The examples below show the signature of each type of function
  ;; that is used to build a behavior dataflow.

  ;; transform

  (defn example-transform [old-state message]
    ;; returns new state
    )

  ;; derive

  (defn example-derive [old-state inputs]
    ;; returns new state
    )

  ;; emit

  (defn example-emit [inputs]
    ;; returns rendering deltas
    )

  ;; effect

  (defn example-effect [inputs]
    ;; returns a vector of messages which effect the outside world
    )

  ;; continue

  (defn example-continue [inputs]
    ;; returns a vector of messages which will be processed as part of
    ;; the same dataflow transaction
    )

  ;; dataflow description reference

  {:transform [[:op [:path] example-transform]]
   :derive    #{[#{[:in]} [:path] example-derive]}
   :effect    #{[#{[:in]} example-effect]}
   :continue  #{[#{[:in]} example-continue]}
   :emit      [[#{[:in]} example-emit]]}
  )
