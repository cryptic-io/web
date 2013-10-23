(ns web-pedestal.browsers)

(def chrome? (> (.indexOf js/navigator.userAgent "Chrome") 0))
(def firefox? (> (.indexOf js/navigator.userAgent "Firefox") 0))
(def webkit? (> (.indexOf js/navigator.userAgent "AppleWebKit") 0))
