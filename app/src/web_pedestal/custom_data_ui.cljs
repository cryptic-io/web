(ns web-pedestal.custom-data-ui
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


(defn file-modal-input-html [id transform-name messages]
  (let [syms (msg/message-params messages)]
    (when (seq syms)
      (let [modal-id (auto/modal-id id transform-name)
            continue-button-id (auto/modal-continue-button-id id transform-name)]
        (str "<div class='modal hide fade' id='" modal-id "' tabindex='-1' role='dialog'"
             "     aria-labelledby='" modal-id "Label' aria-hidden='true'>"
             "  <div class='modal-header'>"
             "    <button type='button' class='close' data-dismiss='modal'"
             "            aria-hidden='true'>×</button>"
             "    <h3 id='" modal-id "Label'>" (auto/modal-title transform-name messages) "</h3>"
             "  </div>"
             "  <div class='modal-body'>"
             "<div class='control-group' id='modal-control-group'>"
             "    <form onsubmit='return false;'>"
             "      <input type=file id=filePicker></input>"
             "    </form>"
             "  </div>"
             "</div>"
             "  <div class='modal-footer'>"
             "    <button class='btn' data-dismiss='modal' aria-hidden='true'>Cancel</button>"
             "    <button class='btn btn-primary' id='" continue-button-id "'>Continue</button>"
             "  </div>"
             "</div>")))))

(defn generic-file-modal-collect-input [parent-id id input-queue transform-name messages]
  (let [modal-continue-button-id (auto/modal-continue-button-id id transform-name)]
    (d/append! (d/by-id parent-id)
               (file-modal-input-html id transform-name messages))
    (events/send-on-click (d/by-id modal-continue-button-id)
                      input-queue
                      #(auto/hide-and-return-messages id transform-name 
                                                      (msg/fill transform-name messages 
                                                                {:value (aget (.-files (d/by-id "filePicker")) "0")})))

    (js/showModal (auto/modal-id id transform-name))))

(defn file-modal-collect-input [r input-queue path transform-name messages]
  (let [path (conj path :modal)
        parent-id (render/get-parent-id r path)
        id (render/new-id! r path)]
    (generic-file-modal-collect-input parent-id id input-queue transform-name messages)))

(defn file-render-event-enter [r [_ path transform-name messages] input-queue]
  (let [control-id (render/get-id r (conj path "control"))
        button-id (render/new-id! r (conj path "control" transform-name))]
    (let [messages (map (partial msg/add-message-type transform-name) messages)
          syms (msg/message-params messages)]
      (assert input-queue "Input-Queue is nil")
      (d/append! (d/by-id control-id)
                 (str "<a class='btn btn-primary' style='margin-top:5px;margin-right:5px;' "
                      "id='" button-id "'>"
                      (str transform-name)
                      "</a>"))
      (if (seq syms)
        ;; Open the modal dialog for this event
        (event/listen! (d/by-id button-id)
                       :click
                       (fn [e]
                         (event/prevent-default e)
                         (file-modal-collect-input r input-queue path transform-name messages)))
        ;; Gather input and send messages
        (events/send-on-click (d/by-id button-id)
                          input-queue
                          (get-missing-input (mapv #(assoc % :from :ui) messages))))

      (render/on-destroy! r path #(event/unlisten! (d/by-id button-id) :click)))))


(def data-renderer-config
  [[:node-create    []    (constantly nil)]
   [:node-destroy   []    (constantly nil)]
   [:node-create    [:**] auto/render-node-enter]
   [:node-destroy   [:**] auto/default-exit]
   [:value          [:**] auto/render-value-update]
   [:attr           [:**] (constantly nil)]
   [:transform-enable  [:main :file :*] file-render-event-enter]
   ;[:transform-enable  [:**] auto/render-event-enter]
   [:transform-disable [:**] auto/event-exit]])
