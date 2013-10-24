(ns web-pedestal.simulated.services)

;; Implement services to simulate talking to back-end services
(defn encrypt-arraybuffers []

  )

(defn services-fn [message input-queue]
    (.log js/console (str "Sending message to server: " message)))

(defrecord MockServices [app]
    p/Activity
    (start [this])
          
    (stop [this]))
