(ns web-pedestal.servant.start
  "This is the startpoint for the web-worker, this won't get loaded 
  by our main app"
  (:require 
    [servant.core :as servant]
    [servant.worker :as worker]
    [web-pedestal.servant.crypt :as crypt-servant]))

(when (servant/webworker?)
  ;; load sjcl
  (.importScripts js/self "sjcl.js")
  ;; setup worker to recieve messages
  (worker/bootstrap))
