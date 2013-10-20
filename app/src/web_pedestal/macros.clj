(ns web-pedestal.macros
  (:require [clojure.walk :refer [macroexpand-all]]))

(defmacro <!-and-apply 
  ([port f]
    `(~f (cljs.core.async/<! ~port)))
  ([port f args]
    `(~f (cljs.core.async/<! ~port) ~@args)))

(defmacro go->
    "Threads the expr through the forms. Inserts x as the
      second item in the first form, making a list of it if it is not a
      list already. If there are more forms, inserts the first form as the
      second item in second form, etc."
    ([x] `(cljs.core.async.macros/go ~x))
    ([x form] `(cljs.core.async.marcros/go ~(macroexpand-all `(-> ~x ~form))))
    ([x form & more] `(cljs.core.async.macros/go ~(macroexpand-all `(-> (-> ~x ~form) ~@more)))))

(comment 
  ;; Testing the macro

  (macroexpand-1
  '(go->
    (read-file-from-dom "filePicker")
    (<!-and-call split-file-into-blobs)
    (<!-and-call get-arraybuffers-from-blobs)
    (<!-and-call #(println "Woo!"))))
  )
