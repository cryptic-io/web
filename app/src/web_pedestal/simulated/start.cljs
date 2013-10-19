(ns web-pedestal.simulated.start
  (:require [web-pedestal.custom-data-ui :as custom-d]
            [io.pedestal.app.render.push.handlers.automatic :as d]
            [web-pedestal.start :as start]
            [web-pedestal.rendering :as rendering]
            [goog.Uri]
            ;; This needs to be included somewhere in order for the
            ;; tools to work.
            [io.pedestal.app-tools.tooling :as tooling]))

(defn param [name]
  (let [uri (goog.Uri. (.toString  (.-location js/document)))]
    (.getParameterValue uri name)))

(defn ^:export main []
  ;; Create an application which uses the data renderer. The :data-ui
  ;; aspect is configured to run this main function. See
  ;;
  ;; config/config.edn
  ;;
  (start/create-app (if (= "auto" (param "renderer"))
                      custom-d/data-renderer-config
                      (rendering/render-config))))
