(ns ^:shared web-pedestal.behavior
    (:require [clojure.string :as string]
              [io.pedestal.app :as app]
              [io.pedestal.app.messages :as msg]))
;; While creating new behavior, write tests to confirm that it is
;; correct. For examples of various kinds of tests, see
;; test/web_pedestal/behavior-test.clj.

(defn init-main []
  [[:transform-enable [:main :file :current-file] 
    :update-current-file 
    [{msg/topic [:file :current-file] 
      (msg/param :file-size) {} 
      (msg/param :file-buffers) {} 
      (msg/param :chunk-size) {}}]] 
  [:transform-enable [:main :file] 
    :encrypt-current-file 
    [{msg/topic [:file :current-file]}]]])

(defn update-current-file [_ {:keys [file-buffers file-size chunk-size]}]
  {:file-buffers file-buffers
   :file-size file-size
   :chunk-size chunk-size})

(defn swap-value [_ new-message]
  (:value new-message))

(def cryptic-app
  ;; There are currently 2 versions (formats) for dataflow
  ;; description: the original version (version 1) and the current
  ;; version (version 2). If the version is not specified, the
  ;; description will be assumed to be version 1 and an attempt
  ;; will be made to convert it to version 2.
  {:version 2
   :transform [[:update-current-file [:file :current-file] update-current-file]
               [:swap [:debug :current-file :download-link] swap-value]]
   :emit [{:init init-main}
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
