(defproject web-pedestal "0.0.1-SNAPSHOT"
  :description "FIXME: write description"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-1934"]
                 [domina "1.0.1"]
                 [org.clojure/core.async "0.1.242.0-44b1e3-alpha"]
                 [ch.qos.logback/logback-classic "1.0.7" :exclusions [org.slf4j/slf4j-api]]
                 [io.pedestal/pedestal.app "0.2.1"]
                 [io.pedestal/pedestal.app-tools "0.2.1"]
                 [com.cemerick/piggieback "0.1.0"]
                 [servant "0.1.2"] ]
  :min-lein-version "2.0.0"
  :source-paths ["app/src" "app/templates"]
  :resource-paths ["config"]
  :target-path "out/"
  :repl-options  {:init-ns user
                  :init (try
                          (use 'io.pedestal.app-tools.dev)
                          (catch Throwable t
                            (println "ERROR: There was a problem loading io.pedestal.app-tools.dev")
                            (clojure.stacktrace/print-stack-trace t)
                            (println)))
                  :welcome (println "Welcome to pedestal-app! Run (tools-help) to see a list of useful functions.")
                  :nrepl-middleware [cemerick.piggieback/wrap-cljs-repl]}
  :plugins [[lein-cljsbuild "0.3.3"]]
  :cljsbuild 
            {:builds
              [{:id "servant_demo"
                :source-paths ["app/src/web_pedestal/servant/" "app/assets/javascripts"]
                :compiler {:optimizations :whitespace
                           :pretty-print false
                           :externs ["sjcl.js"]
                           :output-to "main.js" 
                           :source-map "main.js.map"}}]}
  :main ^{:skip-aot true} io.pedestal.app-tools.dev)
