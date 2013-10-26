(ns web-pedestal.simulated.start
  (:require [web-pedestal.custom-data-ui :as custom-d]
            [io.pedestal.app.render.push.handlers.automatic :as d]
            [io.pedestal.app :as app]
            [io.pedestal.app.protocols :as p]
            [web-pedestal.start :as start]
            [web-pedestal.simulated.services :as services]
            [web-pedestal.rendering :as rendering]
            [ilshad.pedestal-introspector :as introspector]
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
  (let [app (start/create-app (if (= "auto" (param "renderer"))
                                custom-d/data-renderer-config
                                (rendering/render-config)))
        mock (services/->MockServices (:app app))]
    (introspector/create app)
    (p/start mock)
    (app/consume-effects (:app app) services/services-router)))
