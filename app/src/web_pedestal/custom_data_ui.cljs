(ns cryptic.web.data-ui
  (:require [cljs.reader :as reader]
            [io.pedestal.app.util.log :as log]
            [io.pedestal.app.render.push :as render]
            [io.pedestal.app.messages :as msg]
            [io.pedestal.app.render.push.cljs-formatter :as formatter]
            [io.pedestal.app.render.events :as events]
            [io.pedestal.app.render.push.templates :as templates]
            [domina :as d]
            [domina.events :as event]
            [io.pedestal.app.render.push.handlers.automatic :as auto]))


(def data-renderer-config
  [[:node-create    []    (constantly nil)]
   [:node-destroy   []    (constantly nil)]
   [:node-create    [:**] auto/render-node-enter]
   [:node-destroy   [:**] auto/default-exit]
   [:value          [:**] auto/render-value-update]
   [:attr           [:**] (constantly nil)]
   ;[:transform-enable  [:main :file :*] auto/render-event-enter]
   [:transform-enable  [:**] auto/render-event-enter]
   [:transform-disable [:**] auto/event-exit]])
