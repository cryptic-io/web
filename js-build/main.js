
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.3";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?-1!=n.indexOf(t):E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2);return w.map(n,function(n){return(w.isFunction(t)?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t){return w.isEmpty(t)?[]:w.filter(n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=F(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return k(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i};var I=function(){};w.bind=function(n,t){var r,e;if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));if(!w.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));I.prototype=n.prototype;var u=new I;I.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},w.bindAll=function(n){var t=o.call(arguments,1);return 0==t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=S(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&S(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return S(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),w.isFunction=function(n){return"function"==typeof n},w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return void 0===n},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+(0|Math.random()*(t-n+1))};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};T.unescape=w.invert(T.escape);var M={escape:RegExp("["+w.keys(T.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(T.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(M[n],function(t){return T[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=""+ ++N;return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){r=w.defaults({},r,w.templateSettings);var e=RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(D,function(n){return"\\"+B[n]}),r&&(i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(i+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),a&&(i+="';\n"+a+"\n__p+='"),u=o+t.length,t}),i+="';\n",r.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=Function(r.variable||"obj","_",i)}catch(o){throw o.source=i,o}if(t)return a(t,w);var c=function(n){return a.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+i+"}",c},w.chain=function(n){return w(n).chain()};var z=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
define("core/underscore", function(){});

/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.3.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);

(function(){var t=this;var e=t.Backbone;var i=[];var r=i.push;var s=i.slice;var n=i.splice;var a;if(typeof exports!=="undefined"){a=exports}else{a=t.Backbone={}}a.VERSION="1.0.0";var h=t._;if(!h&&typeof require!=="undefined")h=require("underscore");a.$=t.jQuery||t.Zepto||t.ender||t.$;a.noConflict=function(){t.Backbone=e;return this};a.emulateHTTP=false;a.emulateJSON=false;var o=a.Events={on:function(t,e,i){if(!l(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,i){if(!l(this,"once",t,[e,i])||!e)return this;var r=this;var s=h.once(function(){r.off(t,s);e.apply(this,arguments)});s._callback=e;return this.on(t,s,i)},off:function(t,e,i){var r,s,n,a,o,u,c,f;if(!this._events||!l(this,"off",t,[e,i]))return this;if(!t&&!e&&!i){this._events={};return this}a=t?[t]:h.keys(this._events);for(o=0,u=a.length;o<u;o++){t=a[o];if(n=this._events[t]){this._events[t]=r=[];if(e||i){for(c=0,f=n.length;c<f;c++){s=n[c];if(e&&e!==s.callback&&e!==s.callback._callback||i&&i!==s.context){r.push(s)}}}if(!r.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=s.call(arguments,1);if(!l(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)c(i,e);if(r)c(r,arguments);return this},stopListening:function(t,e,i){var r=this._listeners;if(!r)return this;var s=!e&&!i;if(typeof e==="object")i=this;if(t)(r={})[t._listenerId]=t;for(var n in r){r[n].off(e,i,this);if(s)delete this._listeners[n]}return this}};var u=/\s+/;var l=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(u.test(i)){var n=i.split(u);for(var a=0,h=n.length;a<h;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var c=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,h);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e)}};var f={listenTo:"on",listenToOnce:"once"};h.each(f,function(t,e){o[e]=function(e,i,r){var s=this._listeners||(this._listeners={});var n=e._listenerId||(e._listenerId=h.uniqueId("l"));s[n]=e;if(typeof i==="object")r=this;e[t](i,r,this);return this}});o.bind=o.on;o.unbind=o.off;h.extend(a,o);var d=a.Model=function(t,e){var i;var r=t||{};e||(e={});this.cid=h.uniqueId("c");this.attributes={};h.extend(this,h.pick(e,p));if(e.parse)r=this.parse(r,e)||{};if(i=h.result(this,"defaults")){r=h.defaults({},r,i)}this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};var p=["url","urlRoot","collection"];h.extend(d.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return h.clone(this.attributes)},sync:function(){return a.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return h.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,i){var r,s,n,a,o,u,l,c;if(t==null)return this;if(typeof t==="object"){s=t;i=e}else{(s={})[t]=e}i||(i={});if(!this._validate(s,i))return false;n=i.unset;o=i.silent;a=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=h.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in s)this.id=s[this.idAttribute];for(r in s){e=s[r];if(!h.isEqual(c[r],e))a.push(r);if(!h.isEqual(l[r],e)){this.changed[r]=e}else{delete this.changed[r]}n?delete c[r]:c[r]=e}if(!o){if(a.length)this._pending=true;for(var f=0,d=a.length;f<d;f++){this.trigger("change:"+a[f],this,c[a[f]],i)}}if(u)return this;if(!o){while(this._pending){this._pending=false;this.trigger("change",this,i)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,h.extend({},e,{unset:true}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,h.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!h.isEmpty(this.changed);return h.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?h.clone(this.changed):false;var e,i=false;var r=this._changing?this._previousAttributes:this.attributes;for(var s in t){if(h.isEqual(r[s],e=t[s]))continue;(i||(i={}))[s]=e}return i},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return h.clone(this._previousAttributes)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var i=t.success;t.success=function(r){if(!e.set(e.parse(r,t),t))return false;if(i)i(e,r,t);e.trigger("sync",e,r,t)};R(this,t);return this.sync("read",this,t)},save:function(t,e,i){var r,s,n,a=this.attributes;if(t==null||typeof t==="object"){r=t;i=e}else{(r={})[t]=e}if(r&&(!i||!i.wait)&&!this.set(r,i))return false;i=h.extend({validate:true},i);if(!this._validate(r,i))return false;if(r&&i.wait){this.attributes=h.extend({},a,r)}if(i.parse===void 0)i.parse=true;var o=this;var u=i.success;i.success=function(t){o.attributes=a;var e=o.parse(t,i);if(i.wait)e=h.extend(r||{},e);if(h.isObject(e)&&!o.set(e,i)){return false}if(u)u(o,t,i);o.trigger("sync",o,t,i)};R(this,i);s=this.isNew()?"create":i.patch?"patch":"update";if(s==="patch")i.attrs=r;n=this.sync(s,this,i);if(r&&i.wait)this.attributes=a;return n},destroy:function(t){t=t?h.clone(t):{};var e=this;var i=t.success;var r=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(s){if(t.wait||e.isNew())r();if(i)i(e,s,t);if(!e.isNew())e.trigger("sync",e,s,t)};if(this.isNew()){t.success();return false}R(this,t);var s=this.sync("delete",this,t);if(!t.wait)r();return s},url:function(){var t=h.result(this,"urlRoot")||h.result(this.collection,"url")||U();if(this.isNew())return t;return t+(t.charAt(t.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(t){return this._validate({},h.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=h.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;if(!i)return true;this.trigger("invalid",this,i,h.extend(e||{},{validationError:i}));return false}});var v=["keys","values","pairs","invert","pick","omit"];h.each(v,function(t){d.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.attributes);return h[t].apply(h,e)}});var g=a.Collection=function(t,e){e||(e={});if(e.url)this.url=e.url;if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,h.extend({silent:true},e))};var m={add:true,remove:true,merge:true};var y={add:true,merge:false,remove:false};h.extend(g.prototype,o,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return a.sync.apply(this,arguments)},add:function(t,e){return this.set(t,h.defaults(e||{},y))},remove:function(t,e){t=h.isArray(t)?t.slice():[t];e||(e={});var i,r,s,n;for(i=0,r=t.length;i<r;i++){n=this.get(t[i]);if(!n)continue;delete this._byId[n.id];delete this._byId[n.cid];s=this.indexOf(n);this.models.splice(s,1);this.length--;if(!e.silent){e.index=s;n.trigger("remove",n,this,e)}this._removeReference(n)}return this},set:function(t,e){e=h.defaults(e||{},m);if(e.parse)t=this.parse(t,e);if(!h.isArray(t))t=t?[t]:[];var i,s,a,o,u,l;var c=e.at;var f=this.comparator&&c==null&&e.sort!==false;var d=h.isString(this.comparator)?this.comparator:null;var p=[],v=[],g={};for(i=0,s=t.length;i<s;i++){if(!(a=this._prepareModel(t[i],e)))continue;if(u=this.get(a)){if(e.remove)g[u.cid]=true;if(e.merge){u.set(a.attributes,e);if(f&&!l&&u.hasChanged(d))l=true}}else if(e.add){p.push(a);a.on("all",this._onModelEvent,this);this._byId[a.cid]=a;if(a.id!=null)this._byId[a.id]=a}}if(e.remove){for(i=0,s=this.length;i<s;++i){if(!g[(a=this.models[i]).cid])v.push(a)}if(v.length)this.remove(v,e)}if(p.length){if(f)l=true;this.length+=p.length;if(c!=null){n.apply(this.models,[c,0].concat(p))}else{r.apply(this.models,p)}}if(l)this.sort({silent:true});if(e.silent)return this;for(i=0,s=p.length;i<s;i++){(a=p[i]).trigger("add",a,this,e)}if(l)this.trigger("sort",this,e);return this},reset:function(t,e){e||(e={});for(var i=0,r=this.models.length;i<r;i++){this._removeReference(this.models[i])}e.previousModels=this.models;this._reset();this.add(t,h.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return this},push:function(t,e){t=this._prepareModel(t,e);this.add(t,h.extend({at:this.length},e));return t},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){t=this._prepareModel(t,e);this.add(t,h.extend({at:0},e));return t},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(t,e){return this.models.slice(t,e)},get:function(t){if(t==null)return void 0;return this._byId[t.id!=null?t.id:t.cid||t]},at:function(t){return this.models[t]},where:function(t,e){if(h.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(h.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(h.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},sortedIndex:function(t,e,i){e||(e=this.comparator);var r=h.isFunction(e)?e:function(t){return t.get(e)};return h.sortedIndex(this.models,t,r,i)},pluck:function(t){return h.invoke(this.models,"get",t)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var i=this;t.success=function(r){var s=t.reset?"reset":"set";i[s](r,t);if(e)e(i,r,t);i.trigger("sync",i,r,t)};R(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?h.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var i=this;var r=e.success;e.success=function(s){if(e.wait)i.add(t,e);if(r)r(t,s,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof d){if(!t.collection)t.collection=this;return t}e||(e={});e.collection=this;var i=new this.model(t,e);if(!i._validate(t,e)){this.trigger("invalid",this,t,e);return false}return i},_removeReference:function(t){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];h.each(_,function(t){g.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.models);return h[t].apply(h,e)}});var w=["groupBy","countBy","sortBy"];h.each(w,function(t){g.prototype[t]=function(e,i){var r=h.isFunction(e)?e:function(t){return t.get(e)};return h[t](this.models,r,i)}});var b=a.View=function(t){this.cid=h.uniqueId("view");this._configure(t||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var x=/^(\S+)\s*(.*)$/;var E=["model","collection","el","id","attributes","className","tagName","events"];h.extend(b.prototype,o,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,e){if(this.$el)this.undelegateEvents();this.$el=t instanceof a.$?t:a.$(t);this.el=this.$el[0];if(e!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=h.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var i=t[e];if(!h.isFunction(i))i=this[t[e]];if(!i)continue;var r=e.match(x);var s=r[1],n=r[2];i=h.bind(i,this);s+=".delegateEvents"+this.cid;if(n===""){this.$el.on(s,i)}else{this.$el.on(s,n,i)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_configure:function(t){if(this.options)t=h.extend({},h.result(this,"options"),t);h.extend(this,h.pick(t,E));this.options=t},_ensureElement:function(){if(!this.el){var t=h.extend({},h.result(this,"attributes"));if(this.id)t.id=h.result(this,"id");if(this.className)t["class"]=h.result(this,"className");var e=a.$("<"+h.result(this,"tagName")+">").attr(t);this.setElement(e,false)}else{this.setElement(h.result(this,"el"),false)}}});a.sync=function(t,e,i){var r=k[t];h.defaults(i||(i={}),{emulateHTTP:a.emulateHTTP,emulateJSON:a.emulateJSON});var s={type:r,dataType:"json"};if(!i.url){s.url=h.result(e,"url")||U()}if(i.data==null&&e&&(t==="create"||t==="update"||t==="patch")){s.contentType="application/json";s.data=JSON.stringify(i.attrs||e.toJSON(i))}if(i.emulateJSON){s.contentType="application/x-www-form-urlencoded";s.data=s.data?{model:s.data}:{}}if(i.emulateHTTP&&(r==="PUT"||r==="DELETE"||r==="PATCH")){s.type="POST";if(i.emulateJSON)s.data._method=r;var n=i.beforeSend;i.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",r);if(n)return n.apply(this,arguments)}}if(s.type!=="GET"&&!i.emulateJSON){s.processData=false}if(s.type==="PATCH"&&window.ActiveXObject&&!(window.external&&window.external.msActiveXFilteringEnabled)){s.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var o=i.xhr=a.ajax(h.extend(s,i));e.trigger("request",e,o,i);return o};var k={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};a.ajax=function(){return a.$.ajax.apply(a.$,arguments)};var S=a.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var $=/\((.*?)\)/g;var T=/(\(\?)?:\w+/g;var H=/\*\w+/g;var A=/[\-{}\[\]+?.,\\\^$|#\s]/g;h.extend(S.prototype,o,{initialize:function(){},route:function(t,e,i){if(!h.isRegExp(t))t=this._routeToRegExp(t);if(h.isFunction(e)){i=e;e=""}if(!i)i=this[e];var r=this;a.history.route(t,function(s){var n=r._extractParameters(t,s);i&&i.apply(r,n);r.trigger.apply(r,["route:"+e].concat(n));r.trigger("route",e,n);a.history.trigger("route",r,e,n)});return this},navigate:function(t,e){a.history.navigate(t,e);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=h.result(this,"routes");var t,e=h.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(A,"\\$&").replace($,"(?:$1)?").replace(T,function(t,e){return e?t:"([^/]+)"}).replace(H,"(.*?)");return new RegExp("^"+t+"$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return h.map(i,function(t){return t?decodeURIComponent(t):null})}});var I=a.History=function(){this.handlers=[];h.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var N=/^[#\/]|\s+$/g;var P=/^\/+|\/+$/g;var O=/msie [\w.]+/;var C=/\/$/;I.started=false;h.extend(I.prototype,o,{interval:50,getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=this.location.pathname;var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.substr(i.length)}else{t=this.getHash()}}return t.replace(N,"")},start:function(t){if(I.started)throw new Error("Backbone.history has already been started");I.started=true;this.options=h.extend({},{root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var e=this.getFragment();var i=document.documentMode;var r=O.exec(navigator.userAgent.toLowerCase())&&(!i||i<=7);this.root=("/"+this.root+"/").replace(P,"/");if(r&&this._wantsHashChange){this.iframe=a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;this.navigate(e)}if(this._hasPushState){a.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!r){a.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=e;var s=this.location;var n=s.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!n){this.fragment=this.getFragment(null,true);this.location.replace(this.root+this.location.search+"#"+this.fragment);return true}else if(this._wantsPushState&&this._hasPushState&&n&&s.hash){this.fragment=this.getHash().replace(N,"");this.history.replaceState({},document.title,this.root+this.fragment+s.search)}if(!this.options.silent)return this.loadUrl()},stop:function(){a.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);I.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(t){var e=this.fragment=this.getFragment(t);var i=h.any(this.handlers,function(t){if(t.route.test(e)){t.callback(e);return true}});return i},navigate:function(t,e){if(!I.started)return false;if(!e||e===true)e={trigger:e};t=this.getFragment(t||"");if(this.fragment===t)return;this.fragment=t;var i=this.root+t;if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});a.history=new I;var j=function(t,e){var i=this;var r;if(t&&h.has(t,"constructor")){r=t.constructor}else{r=function(){return i.apply(this,arguments)}}h.extend(r,i,e);var s=function(){this.constructor=r};s.prototype=i.prototype;r.prototype=new s;if(t)h.extend(r.prototype,t);r.__super__=i.prototype;return r};d.extend=g.extend=S.extend=b.extend=I.extend=j;var U=function(){throw new Error('A "url" property or function must be specified')};var R=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}}}).call(this);
/*
//@ sourceMappingURL=backbone-min.map
*/;
define("core/backbone", ["core/underscore","jquery"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.Backbone;
    };
}(this)));

function q(a){throw a;}var s=void 0,u=!0,w=!1;var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
"undefined"!=typeof module&&module.exports&&(module.exports=sjcl);
sjcl.cipher.aes=function(a){this.j[0][0][0]||this.D();var b,d,c,e,f=this.j[0][4],g=this.j[1];b=a.length;var h=1;4!==b&&(6!==b&&8!==b)&&q(new sjcl.exception.invalid("invalid aes key size"));this.a=[c=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){d=c[a-1];if(0===a%b||8===b&&4===a%b)d=f[d>>>24]<<24^f[d>>16&255]<<16^f[d>>8&255]<<8^f[d&255],0===a%b&&(d=d<<8^d>>>24^h<<24,h=h<<1^283*(h>>7));c[a]=c[a-b]^d}for(b=0;a;b++,a--)d=c[b&3?a:a-4],e[b]=4>=a||4>b?d:g[0][f[d>>>24]]^g[1][f[d>>16&255]]^g[2][f[d>>8&255]]^g[3][f[d&
255]]};
sjcl.cipher.aes.prototype={encrypt:function(a){return z(this,a,0)},decrypt:function(a){return z(this,a,1)},j:[[[],[],[],[],[]],[[],[],[],[],[]]],D:function(){var a=this.j[0],b=this.j[1],d=a[4],c=b[4],e,f,g,h=[],l=[],k,m,n,p;for(e=0;0x100>e;e++)l[(h[e]=e<<1^283*(e>>7))^e]=e;for(f=g=0;!d[f];f^=k||1,g=l[g]||1){n=g^g<<1^g<<2^g<<3^g<<4;n=n>>8^n&255^99;d[f]=n;c[n]=f;m=h[e=h[k=h[f]]];p=0x1010101*m^0x10001*e^0x101*k^0x1010100*f;m=0x101*h[n]^0x1010100*n;for(e=0;4>e;e++)a[e][f]=m=m<<24^m>>>8,b[e][n]=p=p<<24^p>>>8}for(e=
0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)}};
function z(a,b,d){4!==b.length&&q(new sjcl.exception.invalid("invalid aes block size"));var c=a.a[d],e=b[0]^c[0],f=b[d?3:1]^c[1],g=b[2]^c[2];b=b[d?1:3]^c[3];var h,l,k,m=c.length/4-2,n,p=4,t=[0,0,0,0];h=a.j[d];a=h[0];var r=h[1],v=h[2],x=h[3],y=h[4];for(n=0;n<m;n++)h=a[e>>>24]^r[f>>16&255]^v[g>>8&255]^x[b&255]^c[p],l=a[f>>>24]^r[g>>16&255]^v[b>>8&255]^x[e&255]^c[p+1],k=a[g>>>24]^r[b>>16&255]^v[e>>8&255]^x[f&255]^c[p+2],b=a[b>>>24]^r[e>>16&255]^v[f>>8&255]^x[g&255]^c[p+3],p+=4,e=h,f=l,g=k;for(n=0;4>
n;n++)t[d?3&-n:n]=y[e>>>24]<<24^y[f>>16&255]<<16^y[g>>8&255]<<8^y[b&255]^c[p++],h=e,e=f,f=g,g=b,b=h;return t}
sjcl.bitArray={bitSlice:function(a,b,d){a=sjcl.bitArray.O(a.slice(b/32),32-(b&31)).slice(1);return d===s?a:sjcl.bitArray.clamp(a,d-b)},extract:function(a,b,d){var c=Math.floor(-b-d&31);return((b+d-1^b)&-32?a[b/32|0]<<32-c^a[b/32+1|0]>>>c:a[b/32|0]>>>c)&(1<<d)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var d=a[a.length-1],c=sjcl.bitArray.getPartial(d);return 32===c?a.concat(b):sjcl.bitArray.O(b,c,d|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var d=a.length;b&=31;0<d&&b&&(a[d-1]=sjcl.bitArray.partial(b,a[d-1]&2147483648>>b-1,1));return a},partial:function(a,b,d){return 32===a?b:(d?b|0:b<<32-a)+0x10000000000*a},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return w;var d=0,c;for(c=0;c<a.length;c++)d|=a[c]^b[c];return 0===
d},O:function(a,b,d,c){var e;e=0;for(c===s&&(c=[]);32<=b;b-=32)c.push(d),d=0;if(0===b)return c.concat(a);for(e=0;e<a.length;e++)c.push(d|a[e]>>>b),d=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);c.push(sjcl.bitArray.partial(b+a&31,32<b+a?d:c.pop(),1));return c},k:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}};
sjcl.codec.utf8String={fromBits:function(a){var b="",d=sjcl.bitArray.bitLength(a),c,e;for(c=0;c<d/8;c++)0===(c&3)&&(e=a[c/4]),b+=String.fromCharCode(e>>>24),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],d,c=0;for(d=0;d<a.length;d++)c=c<<8|a.charCodeAt(d),3===(d&3)&&(b.push(c),c=0);d&3&&b.push(sjcl.bitArray.partial(8*(d&3),c));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",d;for(d=0;d<a.length;d++)b+=((a[d]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,d=[],c;a=a.replace(/\s|0x/g,"");c=a.length;a+="00000000";for(b=0;b<a.length;b+=8)d.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(d,4*c)}};"undefined"===typeof ArrayBuffer&&eval("ArrayBuffer = function(){}; DataView = function(){}");
sjcl.codec.arrayBuffer={fromBits:function(a,b,d){var c;b=b==s?u:b;d=d||8;c=sjcl.bitArray.bitLength(a)/8;b&&0!==c%d&&(c+=d-c%d);d=new DataView(new ArrayBuffer(4*a.length));for(b=0;b<a.length;b++)d.setUint32(4*b,a[b]<<32);a=new DataView(new ArrayBuffer(c));c=d.byteLength<a.byteLength?d.byteLength:a.byteLength;for(b=0;b<c;b++)a.setUint8(b,d.getUint8(b));return a.buffer},toBits:function(a){var b=[],d;d=new DataView(a);for(a=0;a<d.byteLength;a+=4)b.push(d.getUint32(a));return b},Y:function(a){function b(a){a+=
"";return 4<=a.length?a:Array(4-a.length+1).join("0")+a}a=new DataView(a);for(var d="",c=0;c<a.byteLength;c+=2)0==c%16&&(d+="\n"+c.toString(16)+"\t"),d+=b(a.getUint16(c).toString(16))+" ";typeof console===s&&(console=console||{log:function(){}});console.log(d.toUpperCase())}};
sjcl.codec.base64={I:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,d){var c="",e=0,f=sjcl.codec.base64.I,g=0,h=sjcl.bitArray.bitLength(a);d&&(f=f.substr(0,62)+"-_");for(d=0;6*c.length<h;)c+=f.charAt((g^a[d]>>>e)>>>26),6>e?(g=a[d]<<6-e,e+=26,d++):(g<<=6,e-=6);for(;c.length&3&&!b;)c+="=";return c},toBits:function(a,b){a=a.replace(/\s|=/g,"");var d=[],c,e=0,f=sjcl.codec.base64.I,g=0,h;b&&(f=f.substr(0,62)+"-_");for(c=0;c<a.length;c++)h=f.indexOf(a.charAt(c)),
0>h&&q(new sjcl.exception.invalid("this isn't base64!")),26<e?(e-=26,d.push(g^h>>>e),g=h<<32-e):(e+=6,g^=h<<32-e);e&56&&d.push(sjcl.bitArray.partial(e&56,g,1));return d}};sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}};sjcl.hash.sha256=function(a){this.a[0]||this.D();a?(this.q=a.q.slice(0),this.m=a.m.slice(0),this.g=a.g):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.q=this.M.slice(0);this.m=[];this.g=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,d=this.m=sjcl.bitArray.concat(this.m,a);b=this.g;a=this.g=b+sjcl.bitArray.bitLength(a);for(b=512+b&-512;b<=a;b+=512)A(this,d.splice(0,16));return this},finalize:function(){var a,b=this.m,d=this.q,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.g/
4294967296));for(b.push(this.g|0);b.length;)A(this,b.splice(0,16));this.reset();return d},M:[],a:[],D:function(){function a(a){return 0x100000000*(a-Math.floor(a))|0}var b=0,d=2,c;a:for(;64>b;d++){for(c=2;c*c<=d;c++)if(0===d%c)continue a;8>b&&(this.M[b]=a(Math.pow(d,0.5)));this.a[b]=a(Math.pow(d,1/3));b++}}};
function A(a,b){var d,c,e,f=b.slice(0),g=a.q,h=a.a,l=g[0],k=g[1],m=g[2],n=g[3],p=g[4],t=g[5],r=g[6],v=g[7];for(d=0;64>d;d++)16>d?c=f[d]:(c=f[d+1&15],e=f[d+14&15],c=f[d&15]=(c>>>7^c>>>18^c>>>3^c<<25^c<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+f[d&15]+f[d+9&15]|0),c=c+v+(p>>>6^p>>>11^p>>>25^p<<26^p<<21^p<<7)+(r^p&(t^r))+h[d],v=r,r=t,t=p,p=n+c|0,n=m,m=k,k=l,l=c+(k&m^n&(k^m))+(k>>>2^k>>>13^k>>>22^k<<30^k<<19^k<<10)|0;g[0]=g[0]+l|0;g[1]=g[1]+k|0;g[2]=g[2]+m|0;g[3]=g[3]+n|0;g[4]=g[4]+p|0;g[5]=g[5]+t|0;g[6]=
g[6]+r|0;g[7]=g[7]+v|0}
sjcl.mode.ccm={name:"ccm",encrypt:function(a,b,d,c,e){var f,g=b.slice(0),h=sjcl.bitArray,l=h.bitLength(d)/8,k=h.bitLength(g)/8;e=e||64;c=c||[];7>l&&q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"));for(f=2;4>f&&k>>>8*f;f++);f<15-l&&(f=15-l);d=h.clamp(d,8*(15-f));b=sjcl.mode.ccm.K(a,b,d,c,e,f);g=sjcl.mode.ccm.n(a,g,d,b,e,f);return h.concat(g.data,g.tag)},decrypt:function(a,b,d,c,e){e=e||64;c=c||[];var f=sjcl.bitArray,g=f.bitLength(d)/8,h=f.bitLength(b),l=f.clamp(b,h-e),k=f.bitSlice(b,
h-e),h=(h-e)/8;7>g&&q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes"));for(b=2;4>b&&h>>>8*b;b++);b<15-g&&(b=15-g);d=f.clamp(d,8*(15-b));l=sjcl.mode.ccm.n(a,l,d,k,e,b);a=sjcl.mode.ccm.K(a,l.data,d,c,e,b);f.equal(l.tag,a)||q(new sjcl.exception.corrupt("ccm: tag doesn't match"));return l.data},K:function(a,b,d,c,e,f){var g=[],h=sjcl.bitArray,l=h.k;e/=8;(e%2||4>e||16<e)&&q(new sjcl.exception.invalid("ccm: invalid tag length"));(0xffffffff<c.length||0xffffffff<b.length)&&q(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data"));
f=[h.partial(8,(c.length?64:0)|e-2<<2|f-1)];f=h.concat(f,d);f[3]|=h.bitLength(b)/8;f=a.encrypt(f);if(c.length){d=h.bitLength(c)/8;65279>=d?g=[h.partial(16,d)]:0xffffffff>=d&&(g=h.concat([h.partial(16,65534)],[d]));g=h.concat(g,c);for(c=0;c<g.length;c+=4)f=a.encrypt(l(f,g.slice(c,c+4).concat([0,0,0])))}for(c=0;c<b.length;c+=4)f=a.encrypt(l(f,b.slice(c,c+4).concat([0,0,0])));return h.clamp(f,8*e)},n:function(a,b,d,c,e,f){var g,h=sjcl.bitArray;g=h.k;var l=b.length,k=h.bitLength(b);d=h.concat([h.partial(8,
f-1)],d).concat([0,0,0]).slice(0,4);c=h.bitSlice(g(c,a.encrypt(d)),0,e);if(!l)return{tag:c,data:[]};for(g=0;g<l;g+=4)d[3]++,e=a.encrypt(d),b[g]^=e[0],b[g+1]^=e[1],b[g+2]^=e[2],b[g+3]^=e[3];return{tag:c,data:h.clamp(b,k)}}};sjcl.arrayBuffer=sjcl.arrayBuffer||{};"undefined"===typeof ArrayBuffer&&eval("ArrayBuffer = function(){}; DataView = function(){}");
sjcl.arrayBuffer.ccm={mode:"ccm",defaults:{adata_buffer:new ArrayBuffer,tlen:128},compat_encrypt:function(a,b,d,c,e){var f=sjcl.codec.arrayBuffer.fromBits(b,u,16);e=e||64;c=c||[];b=sjcl.bitArray.bitLength(b)/8;c=sjcl.codec.arrayBuffer.fromBits(c,w);a=sjcl.arrayBuffer.ccm.encrypt(a,f,d,c,e,b);d=sjcl.codec.arrayBuffer.toBits(a.ciphertext_buffer);d=sjcl.bitArray.clamp(d,8*b);return sjcl.bitArray.concat(d,a.tag)},compat_decrypt:function(a,b,d,c,e){e=e||64;c=c||[];var f=sjcl.bitArray;f.bitLength(d);var g=
f.bitLength(b),h=f.clamp(b,g-e);b=f.bitSlice(b,g-e);c=sjcl.codec.arrayBuffer.fromBits(c,w);h=sjcl.codec.arrayBuffer.fromBits(h,u,16);a=sjcl.arrayBuffer.ccm.decrypt(a,h,d,b,c,e,(g-e)/8);return sjcl.bitArray.clamp(sjcl.codec.arrayBuffer.toBits(a),g-e)},encrypt:function(a,b,d,c,e,f){c=c||sjcl.arrayBuffer.ccm.defaults.adata_buffer;e=e||sjcl.arrayBuffer.ccm.defaults.tlen;f=f||b.byteLength;e=Math.ceil(e/8);2!==d.length&&q(new sjcl.exception.invalid("Invalid IV length, it should be 8 bytes"));c=sjcl.arrayBuffer.ccm.compute_tag(a,
b,d,c,e,f);c=sjcl.arrayBuffer.ccm.ctrCipher(a,b,d,c,e);return{ciphertext_buffer:b,tag:c}},decrypt:function(a,b,d,c,e,f,g){e=e||sjcl.arrayBuffer.ccm.defaults.adata_buffer;f=f||sjcl.arrayBuffer.ccm.defaults.tlen;g=g||b.byteLength;f=Math.ceil(f/8);2!==d.length&&q(new sjcl.exception.invalid("Invalid IV length, it should be 8 bytes"));c=sjcl.arrayBuffer.ccm.ctrCipher(a,b,d,c,f);a=sjcl.arrayBuffer.ccm.compute_tag(a,b,d,e,f,g);sjcl.bitArray.equal(c,a)||q(new sjcl.exception.corrupt("ccm: tag doesn't match"));
return b},compute_tag:function(a,b,d,c,e,f){var g,h,l,k,m;g=c.byteLength;0===g?(h=0,l=[]):0xff00>g?(h=2,l=[]):0x100000000>g?(h=6,l=[255,254]):q("your authenticated data is too big: "+g+" "+c);k=Math.ceil((h+g+16)/16);k=new DataView(new ArrayBuffer(16*k));m=(0===h?6:70)|(e-2)/2<<3;k.setUint8(0,m);k.setUint32(1,d[0]);k.setUint32(5,d[1]);k.setUint32(12,f);d=16;0<l.length&&(k.setUint8(d++,l[0]),k.setUint8(d++,l[1]));0!==h&&(2===h?(k.setUint16(d,g),d+=2):6===h?(k.setUint32(d,g),d+=4):q("Error in encoding length into Authorized blocks"));
g=new DataView(c);for(c=0;c<g.byteLength;c++)k.setUint8(d,g.getUint8(c)),d++;g=[0,0,0,0];for(c=0;c<k.byteLength;c+=16)g[0]^=k.getUint32(c),g[1]^=k.getUint32(c+4),g[2]^=k.getUint32(c+8),g[3]^=k.getUint32(c+12),g=a.encrypt(g);k=new DataView(b);for(c=f;c<b.byteLength;c++)k.setUint8(c,0);for(c=0;c<k.byteLength;c+=16)g[0]^=k.getUint32(c),g[1]^=k.getUint32(c+4),g[2]^=k.getUint32(c+8),g[3]^=k.getUint32(c+12),g=a.encrypt(g);return sjcl.bitArray.clamp(g,8*e)},ctrCipher:function(a,b,d,c,e){var f,g,h,l,k,m;
b=new DataView(b);f=new DataView(new ArrayBuffer(16));f.setUint8(0,6);f.setUint32(1,d[0]);f.setUint32(5,d[1]);f=[f.getUint32(0),f.getUint32(4),f.getUint32(8),f.getUint32(12)];k=a.encrypt(f);c[0]^=k[0];c[1]^=k[1];c[2]^=k[2];c[3]^=k[3];f[3]++;0===f[3]&&f[2]++;for(m=0;m<b.byteLength;m+=16)k=a.encrypt(f),d=b.getUint32(m),g=b.getUint32(m+4),h=b.getUint32(m+8),l=b.getUint32(m+12),b.setUint32(m,d^k[0]),b.setUint32(m+4,g^k[1]),b.setUint32(m+8,h^k[2]),b.setUint32(m+12,l^k[3]),f[3]++,0===f[3]&&f[2]++;return sjcl.bitArray.clamp(c,
8*e)}};
sjcl.mode.ocb2={name:"ocb2",encrypt:function(a,b,d,c,e,f){128!==sjcl.bitArray.bitLength(d)&&q(new sjcl.exception.invalid("ocb iv must be 128 bits"));var g,h=sjcl.mode.ocb2.G,l=sjcl.bitArray,k=l.k,m=[0,0,0,0];d=h(a.encrypt(d));var n,p=[];c=c||[];e=e||64;for(g=0;g+4<b.length;g+=4)n=b.slice(g,g+4),m=k(m,n),p=p.concat(k(d,a.encrypt(k(d,n)))),d=h(d);n=b.slice(g);b=l.bitLength(n);g=a.encrypt(k(d,[0,0,0,b]));n=l.clamp(k(n.concat([0,0,0]),g),b);m=k(m,k(n.concat([0,0,0]),g));m=a.encrypt(k(m,k(d,h(d))));c.length&&
(m=k(m,f?c:sjcl.mode.ocb2.pmac(a,c)));return p.concat(l.concat(n,l.clamp(m,e)))},decrypt:function(a,b,d,c,e,f){128!==sjcl.bitArray.bitLength(d)&&q(new sjcl.exception.invalid("ocb iv must be 128 bits"));e=e||64;var g=sjcl.mode.ocb2.G,h=sjcl.bitArray,l=h.k,k=[0,0,0,0],m=g(a.encrypt(d)),n,p,t=sjcl.bitArray.bitLength(b)-e,r=[];c=c||[];for(d=0;d+4<t/32;d+=4)n=l(m,a.decrypt(l(m,b.slice(d,d+4)))),k=l(k,n),r=r.concat(n),m=g(m);p=t-32*d;n=a.encrypt(l(m,[0,0,0,p]));n=l(n,h.clamp(b.slice(d),p).concat([0,0,0]));
k=l(k,n);k=a.encrypt(l(k,l(m,g(m))));c.length&&(k=l(k,f?c:sjcl.mode.ocb2.pmac(a,c)));h.equal(h.clamp(k,e),h.bitSlice(b,t))||q(new sjcl.exception.corrupt("ocb: tag doesn't match"));return r.concat(h.clamp(n,p))},pmac:function(a,b){var d,c=sjcl.mode.ocb2.G,e=sjcl.bitArray,f=e.k,g=[0,0,0,0],h=a.encrypt([0,0,0,0]),h=f(h,c(c(h)));for(d=0;d+4<b.length;d+=4)h=c(h),g=f(g,a.encrypt(f(h,b.slice(d,d+4))));d=b.slice(d);128>e.bitLength(d)&&(h=f(h,c(h)),d=e.concat(d,[-2147483648,0,0,0]));g=f(g,d);return a.encrypt(f(c(f(h,
c(h))),g))},G:function(a){return[a[0]<<1^a[1]>>>31,a[1]<<1^a[2]>>>31,a[2]<<1^a[3]>>>31,a[3]<<1^135*(a[0]>>>31)]}};
sjcl.mode.gcm={name:"gcm",encrypt:function(a,b,d,c,e){var f=b.slice(0);b=sjcl.bitArray;c=c||[];a=sjcl.mode.gcm.n(u,a,f,c,d,e||128);return b.concat(a.data,a.tag)},decrypt:function(a,b,d,c,e){var f=b.slice(0),g=sjcl.bitArray,h=g.bitLength(f);e=e||128;c=c||[];e<=h?(b=g.bitSlice(f,h-e),f=g.bitSlice(f,0,h-e)):(b=f,f=[]);a=sjcl.mode.gcm.n(w,a,f,c,d,e);g.equal(a.tag,b)||q(new sjcl.exception.corrupt("gcm: tag doesn't match"));return a.data},U:function(a,b){var d,c,e,f,g,h=sjcl.bitArray.k;e=[0,0,0,0];f=b.slice(0);
for(d=0;128>d;d++){(c=0!==(a[Math.floor(d/32)]&1<<31-d%32))&&(e=h(e,f));g=0!==(f[3]&1);for(c=3;0<c;c--)f[c]=f[c]>>>1|(f[c-1]&1)<<31;f[0]>>>=1;g&&(f[0]^=-0x1f000000)}return e},f:function(a,b,d){var c,e=d.length;b=b.slice(0);for(c=0;c<e;c+=4)b[0]^=0xffffffff&d[c],b[1]^=0xffffffff&d[c+1],b[2]^=0xffffffff&d[c+2],b[3]^=0xffffffff&d[c+3],b=sjcl.mode.gcm.U(b,a);return b},n:function(a,b,d,c,e,f){var g,h,l,k,m,n,p,t,r=sjcl.bitArray;n=d.length;p=r.bitLength(d);t=r.bitLength(c);h=r.bitLength(e);g=b.encrypt([0,
0,0,0]);96===h?(e=e.slice(0),e=r.concat(e,[1])):(e=sjcl.mode.gcm.f(g,[0,0,0,0],e),e=sjcl.mode.gcm.f(g,e,[0,0,Math.floor(h/0x100000000),h&0xffffffff]));h=sjcl.mode.gcm.f(g,[0,0,0,0],c);m=e.slice(0);c=h.slice(0);a||(c=sjcl.mode.gcm.f(g,h,d));for(k=0;k<n;k+=4)m[3]++,l=b.encrypt(m),d[k]^=l[0],d[k+1]^=l[1],d[k+2]^=l[2],d[k+3]^=l[3];d=r.clamp(d,p);a&&(c=sjcl.mode.gcm.f(g,h,d));a=[Math.floor(t/0x100000000),t&0xffffffff,Math.floor(p/0x100000000),p&0xffffffff];c=sjcl.mode.gcm.f(g,c,a);l=b.encrypt(e);c[0]^=l[0];
c[1]^=l[1];c[2]^=l[2];c[3]^=l[3];return{tag:r.bitSlice(c,0,f),data:d}}};sjcl.misc.hmac=function(a,b){this.L=b=b||sjcl.hash.sha256;var d=[[],[]],c,e=b.prototype.blockSize/32;this.o=[new b,new b];a.length>e&&(a=b.hash(a));for(c=0;c<e;c++)d[0][c]=a[c]^909522486,d[1][c]=a[c]^1549556828;this.o[0].update(d[0]);this.o[1].update(d[1])};sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a){a=(new this.L(this.o[0])).update(a).finalize();return(new this.L(this.o[1])).update(a).finalize()};
sjcl.misc.pbkdf2=function(a,b,d,c,e){d=d||1E3;(0>c||0>d)&&q(sjcl.exception.invalid("invalid params to pbkdf2"));"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));e=e||sjcl.misc.hmac;a=new e(a);var f,g,h,l,k=[],m=sjcl.bitArray;for(l=1;32*k.length<(c||1);l++){e=f=a.encrypt(m.concat(b,[l]));for(g=1;g<d;g++){f=a.encrypt(f);for(h=0;h<f.length;h++)e[h]^=f[h]}k=k.concat(e)}c&&(k=m.clamp(k,c));return k};
sjcl.prng=function(a){this.b=[new sjcl.hash.sha256];this.h=[0];this.F=0;this.t={};this.C=0;this.J={};this.N=this.c=this.i=this.T=0;this.a=[0,0,0,0,0,0,0,0];this.e=[0,0,0,0];this.A=s;this.B=a;this.p=w;this.z={progress:{},seeded:{}};this.l=this.S=0;this.u=1;this.w=2;this.Q=0x10000;this.H=[0,48,64,96,128,192,0x100,384,512,768,1024];this.R=3E4;this.P=80};
sjcl.prng.prototype={randomWords:function(a,b){var d=[],c;c=this.isReady(b);var e;c===this.l&&q(new sjcl.exception.notReady("generator isn't seeded"));if(c&this.w){c=!(c&this.u);e=[];var f=0,g;this.N=e[0]=(new Date).valueOf()+this.R;for(g=0;16>g;g++)e.push(0x100000000*Math.random()|0);for(g=0;g<this.b.length&&!(e=e.concat(this.b[g].finalize()),f+=this.h[g],this.h[g]=0,!c&&this.F&1<<g);g++);this.F>=1<<this.b.length&&(this.b.push(new sjcl.hash.sha256),this.h.push(0));this.c-=f;f>this.i&&(this.i=f);this.F++;
this.a=sjcl.hash.sha256.hash(this.a.concat(e));this.A=new sjcl.cipher.aes(this.a);for(c=0;4>c&&!(this.e[c]=this.e[c]+1|0,this.e[c]);c++);}for(c=0;c<a;c+=4)0===(c+1)%this.Q&&B(this),e=C(this),d.push(e[0],e[1],e[2],e[3]);B(this);return d.slice(0,a)},setDefaultParanoia:function(a){this.B=a},addEntropy:function(a,b,d){d=d||"user";var c,e,f=(new Date).valueOf(),g=this.t[d],h=this.isReady(),l=0;c=this.J[d];c===s&&(c=this.J[d]=this.T++);g===s&&(g=this.t[d]=0);this.t[d]=(this.t[d]+1)%this.b.length;switch(typeof a){case "number":b===
s&&(b=1);this.b[g].update([c,this.C++,1,b,f,1,a|0]);break;case "object":d=Object.prototype.toString.call(a);if("[object Uint32Array]"===d){e=[];for(d=0;d<a.length;d++)e.push(a[d]);a=e}else{"[object Array]"!==d&&(l=1);for(d=0;d<a.length&&!l;d++)"number"!=typeof a[d]&&(l=1)}if(!l){if(b===s)for(d=b=0;d<a.length;d++)for(e=a[d];0<e;)b++,e>>>=1;this.b[g].update([c,this.C++,2,b,f,a.length].concat(a))}break;case "string":b===s&&(b=a.length);this.b[g].update([c,this.C++,3,b,f,a.length]);this.b[g].update(a);
break;default:l=1}l&&q(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string"));this.h[g]+=b;this.c+=b;h===this.l&&(this.isReady()!==this.l&&D("seeded",Math.max(this.i,this.c)),D("progress",this.getProgress()))},isReady:function(a){a=this.H[a!==s?a:this.B];return this.i&&this.i>=a?this.h[0]>this.P&&(new Date).valueOf()>this.N?this.w|this.u:this.u:this.c>=a?this.w|this.l:this.l},getProgress:function(a){a=this.H[a?a:this.B];return this.i>=a?1:this.c>a?1:this.c/
a},startCollectors:function(){this.p||(window.addEventListener?(window.addEventListener("load",this.r,w),window.addEventListener("mousemove",this.s,w)):document.attachEvent?(document.attachEvent("onload",this.r),document.attachEvent("onmousemove",this.s)):q(new sjcl.exception.bug("can't attach event")),this.p=u)},stopCollectors:function(){this.p&&(window.removeEventListener?(window.removeEventListener("load",this.r,w),window.removeEventListener("mousemove",this.s,w)):window.detachEvent&&(window.detachEvent("onload",
this.r),window.detachEvent("onmousemove",this.s)),this.p=w)},addEventListener:function(a,b){this.z[a][this.S++]=b},removeEventListener:function(a,b){var d,c,e=this.z[a],f=[];for(c in e)e.hasOwnProperty(c)&&e[c]===b&&f.push(c);for(d=0;d<f.length;d++)c=f[d],delete e[c]},s:function(a){sjcl.random.addEntropy([a.x||a.clientX||a.offsetX||0,a.y||a.clientY||a.offsetY||0],2,"mouse")},r:function(){sjcl.random.addEntropy((new Date).valueOf(),2,"loadtime")}};
function D(a,b){var d,c=sjcl.random.z[a],e=[];for(d in c)c.hasOwnProperty(d)&&e.push(c[d]);for(d=0;d<e.length;d++)e[d](b)}function B(a){a.a=C(a).concat(C(a));a.A=new sjcl.cipher.aes(a.a)}function C(a){for(var b=0;4>b&&!(a.e[b]=a.e[b]+1|0,a.e[b]);b++);return a.A.encrypt(a.e)}sjcl.random=new sjcl.prng(6);try{var E=new Uint32Array(32);crypto.getRandomValues(E);sjcl.random.addEntropy(E,1024,"crypto['getRandomValues']")}catch(F){}
sjcl.json={defaults:{v:1,iter:1E3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},encrypt:function(a,b,d,c){d=d||{};c=c||{};var e=sjcl.json,f=e.d({iv:sjcl.random.randomWords(4,0)},e.defaults),g;e.d(f,d);d=f.adata;"string"===typeof f.salt&&(f.salt=sjcl.codec.base64.toBits(f.salt));"string"===typeof f.iv&&(f.iv=sjcl.codec.base64.toBits(f.iv));(!sjcl.mode[f.mode]||!sjcl.cipher[f.cipher]||"string"===typeof a&&100>=f.iter||64!==f.ts&&96!==f.ts&&128!==f.ts||128!==f.ks&&192!==f.ks&&0x100!==f.ks||2>f.iv.length||
4<f.iv.length)&&q(new sjcl.exception.invalid("json encrypt: invalid parameters"));"string"===typeof a?(g=sjcl.misc.cachedPbkdf2(a,f),a=g.key.slice(0,f.ks/32),f.salt=g.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.publicKey&&(g=a.kem(),f.kemtag=g.tag,a=g.key.slice(0,f.ks/32));"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));"string"===typeof d&&(d=sjcl.codec.utf8String.toBits(d));g=new sjcl.cipher[f.cipher](a);e.d(c,f);c.key=a;f.ct=sjcl.mode[f.mode].encrypt(g,b,f.iv,d,f.ts);return e.encode(f)},
decrypt:function(a,b,d,c){d=d||{};c=c||{};var e=sjcl.json;b=e.d(e.d(e.d({},e.defaults),e.decode(b)),d,u);var f;d=b.adata;"string"===typeof b.salt&&(b.salt=sjcl.codec.base64.toBits(b.salt));"string"===typeof b.iv&&(b.iv=sjcl.codec.base64.toBits(b.iv));(!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||"string"===typeof a&&100>=b.iter||64!==b.ts&&96!==b.ts&&128!==b.ts||128!==b.ks&&192!==b.ks&&0x100!==b.ks||!b.iv||2>b.iv.length||4<b.iv.length)&&q(new sjcl.exception.invalid("json decrypt: invalid parameters"));
"string"===typeof a?(f=sjcl.misc.cachedPbkdf2(a,b),a=f.key.slice(0,b.ks/32),b.salt=f.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.secretKey&&(a=a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0,b.ks/32));"string"===typeof d&&(d=sjcl.codec.utf8String.toBits(d));f=new sjcl.cipher[b.cipher](a);d=sjcl.mode[b.mode].decrypt(f,b.ct,b.iv,d,b.ts);e.d(c,b);c.key=a;return sjcl.codec.utf8String.fromBits(d)},encode:function(a){var b,d="{",c="";for(b in a)if(a.hasOwnProperty(b))switch(b.match(/^[a-z0-9]+$/i)||
q(new sjcl.exception.invalid("json encode: invalid property name")),d+=c+'"'+b+'":',c=",",typeof a[b]){case "number":case "boolean":d+=a[b];break;case "string":d+='"'+escape(a[b])+'"';break;case "object":d+='"'+sjcl.codec.base64.fromBits(a[b],0)+'"';break;default:q(new sjcl.exception.bug("json encode: unsupported type"))}return d+"}"},decode:function(a){a=a.replace(/\s/g,"");a.match(/^\{.*\}$/)||q(new sjcl.exception.invalid("json decode: this isn't json!"));a=a.replace(/^\{|\}$/g,"").split(/,/);var b=
{},d,c;for(d=0;d<a.length;d++)(c=a[d].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i))||q(new sjcl.exception.invalid("json decode: this isn't json!")),b[c[2]]=c[3]?parseInt(c[3],10):c[2].match(/^(ct|salt|iv)$/)?sjcl.codec.base64.toBits(c[4]):unescape(c[4]);return b},d:function(a,b,d){a===s&&(a={});if(b===s)return a;for(var c in b)b.hasOwnProperty(c)&&(d&&(a[c]!==s&&a[c]!==b[c])&&q(new sjcl.exception.invalid("required parameter overridden")),a[c]=b[c]);return a},X:function(a,
b){var d={},c;for(c in a)a.hasOwnProperty(c)&&a[c]!==b[c]&&(d[c]=a[c]);return d},W:function(a,b){var d={},c;for(c=0;c<b.length;c++)a[b[c]]!==s&&(d[b[c]]=a[b[c]]);return d}};sjcl.encrypt=sjcl.json.encrypt;sjcl.decrypt=sjcl.json.decrypt;sjcl.misc.V={};
sjcl.misc.cachedPbkdf2=function(a,b){var d=sjcl.misc.V,c;b=b||{};c=b.iter||1E3;d=d[a]=d[a]||{};c=d[c]=d[c]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)};d=b.salt===s?c.firstSalt:b.salt;c[d]=c[d]||sjcl.misc.pbkdf2(a,d,b.iter);return{key:c[d].slice(0),salt:d.slice(0)}};

define("crypt/sjcl", function(){});

/** @fileOverview better CBC implementation designed to be fast
 *
 * @author Marco
 */


/*********************\
|*      START        *|

You need to supply an IV and a key to use the crypt functions
Everything as an object to make things simple

settings = {
buffer : ArrayBuffer
key : 4 word key
iv : 4 word iv
}

\*********************/

sjcl.mode.betterCBC= {



    encryptChunk: function(settings){
        var key = settings.key
        , buffer = settings.buffer
        , iv = settings.iv

        , aes = new sjcl.cipher.aes(key)

        , data = new Int32Array(buffer)
        , outputStruct = new OutputStruct(data.length)
        , temp = new TempChainingStruct();

        temp.setSubArray(iv);

        //Use the encryption algorithm 4 bytes at a time
        for (var i=0; i<data.length; i+=4){

            var inputDataForEncryption = data.subarray(i,i+4);

            this.xorArray(temp.tempArray,inputDataForEncryption, temp.tempArray)

            var encryptedArray = temp.setSubArray(aes.encrypt(temp.tempArray)); 

            outputStruct.setSubArray(encryptedArray, i)
        }

        return outputStruct.output;
    },

    decryptChunk: function(settings){
        var key = settings.key
        , buffer = settings.buffer
        , iv = settings.iv

        , aes = new sjcl.cipher.aes(key)

        , data = new Int32Array(buffer)
        , outputStruct = new OutputStruct(data.length)
        , temp = new TempChainingStruct();

        temp.setSubArray(iv)

        //Use the encryption algorithm 4 bytes at a time
        for (var i=0; i<data.length; i+=4){

            var inputDataForDecryption = data.subarray(i,i+4)
            , decryptedArray = aes.decrypt(inputDataForDecryption); 

            this.xorArray(temp.tempArray,decryptedArray, temp.tempArray)

            outputStruct.setSubArray(temp.tempArray, i)

            //key the key for future use
            temp.setSubArray(inputDataForDecryption);
        }

        return outputStruct.output;
    },


    //xor's two arrays and outputs it into array3: array1 ^ array2  => array3
    xorArray:function(array1, array2, array3){
        for (var i=0;i<array1.length && i<array2.length;i++){
            array3[i]=array1[i]^array2[i]
        }
        return array3;

    }

}

/*
 *  Datastructure for the data in and data out
 *  Using only one buffer to speed up processing
 *  
 *  Uses and Int32 Array viewer so each item in the array is 4 bytes 
 */
var DataStruct = function(buffer){
    this.buffer = buffer;
    var halfLength = buffer.byteLength/2;
    var halfIntCount = halfLength/4; //each item in the array is 4 bytes
    this.dataIn = new Int32Array(buffer,0, halfIntCount)
    this.dataOut = new Int32Array(buffer,halfLength, halfIntCount)
}

/*
 *  Data structure for the output array
 */
var OutputStruct = function(length){
    var byteSize = length*4;
    var buf = new ArrayBuffer(byteSize);
    this.output = new Int32Array(buf) //Start at byte 16 since temp already got the first 4 bytes
}

OutputStruct.prototype.setSubArray = function(array, startIndex){
    for (var j=0;j<array.length;j++){
        this.output[startIndex+j] = array[j];
    }
    return array;
}

/*
 * Data structure for a very commonly used temp array
 * Used a lot in the chaining methods so it needs to be fast
 */

var TempChainingStruct = function(){
    this.tempArray = new Int32Array(4);
}

TempChainingStruct.prototype.setSubArray = function(array){
    for (var j=0;j<4;j++){
        this.tempArray[j] = array[j];
    }
    //for chaining commands together
    return array;
}
;
define("crypt/betterCBC", ["crypt/sjcl"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.sjcl;
    };
}(this)));

// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
  if(a != null)
    if("number" == typeof a) this.fromNumber(a,b,c);
    else if(b == null && "string" != typeof a) this.fromString(a,256);
    else this.fromString(a,b);
}

// return new, unset BigInteger
function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) { return BI_RM.charAt(n); }
function intAt(s,i) {
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0) this[0] = x;
  else if(x < -1) this[0] = x+DV;
  else this.t = 0;
}

// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
function bnpFromString(s,b) {
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 256) k = 8; // byte array
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else { this.fromRadix(s,b); return; }
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if(sh == 0)
      this[this.t++] = x;
    else if(sh+k > this.DB) {
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
      this[this.t++] = (x>>(this.DB-sh));
    }
    else
      this[this.t-1] |= x<<sh;
    sh += k;
    if(sh >= this.DB) sh -= this.DB;
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    this.s = -1;
    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
  }
  this.clamp();
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
  if(this.s < 0) return "-"+this.negate().toString(b);
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else return this.toRadix(b);
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
  var p = this.DB-(i*this.DB)%k;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (this[i]&((1<<p)-1))<<(k-p);
        d |= this[--i]>>(p+=this.DB-k);
      }
      else {
        d = (this[i]>>(p-=k))&km;
        if(p <= 0) { p += this.DB; --i; }
      }
      if(d > 0) m = true;
      if(m) r += int2char(d);
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s-a.s;
  if(r != 0) return r;
  var i = this.t;
  r = i-a.t;
  if(r != 0) return (this.s<0)?-r:r;
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if(this.t <= 0) return 0;
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
  var i;
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
  for(i = this.t-1; i >= 0; --i) {
    r[i+ds+1] = (this[i]>>cbs)|c;
    c = (this[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = this.t+ds+1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
  r.s = this.s;
  var ds = Math.floor(n/this.DB);
  if(ds >= this.t) { r.t = 0; return; }
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = this[ds]>>bs;
  for(var i = ds+1; i < this.t; ++i) {
    r[i-ds-1] |= (this[i]&bm)<<cbs;
    r[i-ds] = this[i]>>bs;
  }
  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
  r.t = this.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]-a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c -= a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1) r[i++] = this.DV+c;
  else if(c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
  r.s = 0;
  r.clamp();
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
  var pm = m.abs();
  if(pm.t <= 0) return;
  var pt = this.abs();
  if(pt.t < pm.t) {
    if(q != null) q.fromInt(0);
    if(r != null) this.copyTo(r);
    return;
  }
  if(r == null) r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) return;
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y);	// "negative" y so we can replace sub with am later
  while(y.t < ys) y[y.t++] = 0;
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd) r.subTo(t,r);
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms) BigInteger.ZERO.subTo(q,q);
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
  if(ts < 0) BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m,null,x); }
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if(this.t < 1) return 0;
  var x = this[0];
  if((x&1) == 0) return 0;
  var y = x&3;		// y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while(x.t <= this.mt2)	// pad x so am has enough room later
    x[x.t++] = 0;
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
    else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
  var z;
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
  return this.exp(e,z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

define("crypt/rsa/jsbn", function(){});

var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad="=";

function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for(i = 0; i+3 <= h.length; i+=3) {
    c = parseInt(h.substring(i,i+3),16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if(i+1 == h.length) {
    c = parseInt(h.substring(i,i+1),16);
    ret += b64map.charAt(c << 2);
  }
  else if(i+2 == h.length) {
    c = parseInt(h.substring(i,i+2),16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while((ret.length & 3) > 0) ret += b64pad;
  return ret;
}

// convert a base64 string to hex
function b64tohex(s) {
  var ret = ""
  var i;
  var k = 0; // b64 state, 0-3
  var slop;
  for(i = 0; i < s.length; ++i) {
    if(s.charAt(i) == b64pad) break;
    v = b64map.indexOf(s.charAt(i));
    if(v < 0) continue;
    if(k == 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    }
    else if(k == 1) {
      ret += int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    }
    else if(k == 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    }
    else {
      ret += int2char((slop << 2) | (v >> 4));
      ret += int2char(v & 0xf);
      k = 0;
    }
  }
  if(k == 1)
    ret += int2char(slop << 2);
  return ret;
}

// convert a base64 string to a byte/number array
function b64toBA(s) {
  //piggyback on b64tohex for now, optimize later
  var h = b64tohex(s);
  var i;
  var a = new Array();
  for(i = 0; 2*i < h.length; ++i) {
    a[i] = parseInt(h.substring(2*i,2*i+2),16);
  }
  return a;
}
;
define("crypt/rsa/base64", function(){});

// prng4.js - uses Arcfour as a PRNG

function Arcfour() {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
}

// Initialize arcfour context from key, an array of ints, each from [0..255]
function ARC4init(key) {
  var i, j, t;
  for(i = 0; i < 256; ++i)
    this.S[i] = i;
  j = 0;
  for(i = 0; i < 256; ++i) {
    j = (j + this.S[i] + key[i % key.length]) & 255;
    t = this.S[i];
    this.S[i] = this.S[j];
    this.S[j] = t;
  }
  this.i = 0;
  this.j = 0;
}

function ARC4next() {
  var t;
  this.i = (this.i + 1) & 255;
  this.j = (this.j + this.S[this.i]) & 255;
  t = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = t;
  return this.S[(t + this.S[this.i]) & 255];
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

// Plug in your RNG constructor here
function prng_newstate() {
  return new Arcfour();
}

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;

define("crypt/rsa/prng4", function(){});

// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

var rng_state;
var rng_pool;
var rng_pptr;

// Mix in a 32-bit integer into the pool
function rng_seed_int(x) {
  rng_pool[rng_pptr++] ^= x & 255;
  rng_pool[rng_pptr++] ^= (x >> 8) & 255;
  rng_pool[rng_pptr++] ^= (x >> 16) & 255;
  rng_pool[rng_pptr++] ^= (x >> 24) & 255;
  if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;
}

// Mix in the current time (w/milliseconds) into the pool
function rng_seed_time() {
  rng_seed_int(new Date().getTime());
}

// Initialize the pool with junk if needed.
if(rng_pool == null) {
  rng_pool = new Array();
  rng_pptr = 0;
  var t;
  if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
    // Extract entropy (256 bits) from NS4 RNG if available
    var z = window.crypto.random(32);
    for(t = 0; t < z.length; ++t)
      rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
  }  
  while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
    t = Math.floor(65536 * Math.random());
    rng_pool[rng_pptr++] = t >>> 8;
    rng_pool[rng_pptr++] = t & 255;
  }
  rng_pptr = 0;
  rng_seed_time();
  //rng_seed_int(window.screenX);
  //rng_seed_int(window.screenY);
}

function rng_get_byte() {
  if(rng_state == null) {
    rng_seed_time();
    rng_state = prng_newstate();
    rng_state.init(rng_pool);
    for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0;
    //rng_pool = null;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}

function rng_get_bytes(ba) {
  var i;
  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
}

function SecureRandom() {}

SecureRandom.prototype.nextBytes = rng_get_bytes;

define("crypt/rsa/rng", ["crypt/rsa/prng4"], function(){});

// Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Extended JavaScript BN functions, required for RSA private ops.

// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix

// (public)
function bnClone() { var r = nbi(); this.copyTo(r); return r; }

// (public) return value as integer
function bnIntValue() {
  if(this.s < 0) {
    if(this.t == 1) return this[0]-this.DV;
    else if(this.t == 0) return -1;
  }
  else if(this.t == 1) return this[0];
  else if(this.t == 0) return 0;
  // assumes 16 < DB < 32
  return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
}

// (public) return value as byte
function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }

// (public) return value as short (assumes DB>=16)
function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }

// (protected) return x s.t. r^x < DV
function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

// (public) 0 if this == 0, 1 if this > 0
function bnSigNum() {
  if(this.s < 0) return -1;
  else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
  else return 1;
}

// (protected) convert to radix string
function bnpToRadix(b) {
  if(b == null) b = 10;
  if(this.signum() == 0 || b < 2 || b > 36) return "0";
  var cs = this.chunkSize(b);
  var a = Math.pow(b,cs);
  var d = nbv(a), y = nbi(), z = nbi(), r = "";
  this.divRemTo(d,y,z);
  while(y.signum() > 0) {
    r = (a+z.intValue()).toString(b).substr(1) + r;
    y.divRemTo(d,y,z);
  }
  return z.intValue().toString(b) + r;
}

// (protected) convert from radix string
function bnpFromRadix(s,b) {
  this.fromInt(0);
  if(b == null) b = 10;
  var cs = this.chunkSize(b);
  var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
  for(var i = 0; i < s.length; ++i) {
    var x = intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
      continue;
    }
    w = b*w+x;
    if(++j >= cs) {
      this.dMultiply(d);
      this.dAddOffset(w,0);
      j = 0;
      w = 0;
    }
  }
  if(j > 0) {
    this.dMultiply(Math.pow(b,j));
    this.dAddOffset(w,0);
  }
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) alternate constructor
function bnpFromNumber(a,b,c) {
  if("number" == typeof b) {
    // new BigInteger(int,int,RNG)
    if(a < 2) this.fromInt(1);
    else {
      this.fromNumber(a,c);
      if(!this.testBit(a-1))	// force MSB set
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
      if(this.isEven()) this.dAddOffset(1,0); // force odd
      while(!this.isProbablePrime(b)) {
        this.dAddOffset(2,0);
        if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);
      }
    }
  }
  else {
    // new BigInteger(int,RNG)
    var x = new Array(), t = a&7;
    x.length = (a>>3)+1;
    b.nextBytes(x);
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
    this.fromString(x,256);
  }
}

// (public) convert to bigendian byte array
function bnToByteArray() {
  var i = this.t, r = new Array();
  r[0] = this.s;
  var p = this.DB-(i*this.DB)%8, d, k = 0;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)
      r[k++] = d|(this.s<<(this.DB-p));
    while(i >= 0) {
      if(p < 8) {
        d = (this[i]&((1<<p)-1))<<(8-p);
        d |= this[--i]>>(p+=this.DB-8);
      }
      else {
        d = (this[i]>>(p-=8))&0xff;
        if(p <= 0) { p += this.DB; --i; }
      }
      if((d&0x80) != 0) d |= -256;
      if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;
      if(k > 0 || d != this.s) r[k++] = d;
    }
  }
  return r;
}

function bnEquals(a) { return(this.compareTo(a)==0); }
function bnMin(a) { return(this.compareTo(a)<0)?this:a; }
function bnMax(a) { return(this.compareTo(a)>0)?this:a; }

// (protected) r = this op a (bitwise)
function bnpBitwiseTo(a,op,r) {
  var i, f, m = Math.min(a.t,this.t);
  for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
  if(a.t < this.t) {
    f = a.s&this.DM;
    for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
    r.t = this.t;
  }
  else {
    f = this.s&this.DM;
    for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
    r.t = a.t;
  }
  r.s = op(this.s,a.s);
  r.clamp();
}

// (public) this & a
function op_and(x,y) { return x&y; }
function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }

// (public) this | a
function op_or(x,y) { return x|y; }
function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }

// (public) this ^ a
function op_xor(x,y) { return x^y; }
function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }

// (public) this & ~a
function op_andnot(x,y) { return x&~y; }
function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }

// (public) ~this
function bnNot() {
  var r = nbi();
  for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];
  r.t = this.t;
  r.s = ~this.s;
  return r;
}

// (public) this << n
function bnShiftLeft(n) {
  var r = nbi();
  if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
  return r;
}

// (public) this >> n
function bnShiftRight(n) {
  var r = nbi();
  if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
  return r;
}

// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if(x == 0) return -1;
  var r = 0;
  if((x&0xffff) == 0) { x >>= 16; r += 16; }
  if((x&0xff) == 0) { x >>= 8; r += 8; }
  if((x&0xf) == 0) { x >>= 4; r += 4; }
  if((x&3) == 0) { x >>= 2; r += 2; }
  if((x&1) == 0) ++r;
  return r;
}

// (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit() {
  for(var i = 0; i < this.t; ++i)
    if(this[i] != 0) return i*this.DB+lbit(this[i]);
  if(this.s < 0) return this.t*this.DB;
  return -1;
}

// return number of 1 bits in x
function cbit(x) {
  var r = 0;
  while(x != 0) { x &= x-1; ++r; }
  return r;
}

// (public) return number of set bits
function bnBitCount() {
  var r = 0, x = this.s&this.DM;
  for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);
  return r;
}

// (public) true iff nth bit is set
function bnTestBit(n) {
  var j = Math.floor(n/this.DB);
  if(j >= this.t) return(this.s!=0);
  return((this[j]&(1<<(n%this.DB)))!=0);
}

// (protected) this op (1<<n)
function bnpChangeBit(n,op) {
  var r = BigInteger.ONE.shiftLeft(n);
  this.bitwiseTo(r,op,r);
  return r;
}

// (public) this | (1<<n)
function bnSetBit(n) { return this.changeBit(n,op_or); }

// (public) this & ~(1<<n)
function bnClearBit(n) { return this.changeBit(n,op_andnot); }

// (public) this ^ (1<<n)
function bnFlipBit(n) { return this.changeBit(n,op_xor); }

// (protected) r = this + a
function bnpAddTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]+a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c += a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c += a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += a.s;
  }
  r.s = (c<0)?-1:0;
  if(c > 0) r[i++] = c;
  else if(c < -1) r[i++] = this.DV+c;
  r.t = i;
  r.clamp();
}

// (public) this + a
function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }

// (public) this - a
function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }

// (public) this * a
function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }

// (public) this^2
function bnSquare() { var r = nbi(); this.squareTo(r); return r; }

// (public) this / a
function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }

// (public) this % a
function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }

// (public) [this/a,this%a]
function bnDivideAndRemainder(a) {
  var q = nbi(), r = nbi();
  this.divRemTo(a,q,r);
  return new Array(q,r);
}

// (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n) {
  this[this.t] = this.am(0,n-1,this,0,0,this.t);
  ++this.t;
  this.clamp();
}

// (protected) this += n << w words, this >= 0
function bnpDAddOffset(n,w) {
  if(n == 0) return;
  while(this.t <= w) this[this.t++] = 0;
  this[w] += n;
  while(this[w] >= this.DV) {
    this[w] -= this.DV;
    if(++w >= this.t) this[this.t++] = 0;
    ++this[w];
  }
}

// A "null" reducer
function NullExp() {}
function nNop(x) { return x; }
function nMulTo(x,y,r) { x.multiplyTo(y,r); }
function nSqrTo(x,r) { x.squareTo(r); }

NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;

// (public) this^e
function bnPow(e) { return this.exp(e,new NullExp()); }

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a,n,r) {
  var i = Math.min(this.t+a.t,n);
  r.s = 0; // assumes a,this >= 0
  r.t = i;
  while(i > 0) r[--i] = 0;
  var j;
  for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
  for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
  r.clamp();
}

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a,n,r) {
  --n;
  var i = r.t = this.t+a.t-n;
  r.s = 0; // assumes a,this >= 0
  while(--i >= 0) r[i] = 0;
  for(i = Math.max(n-this.t,0); i < a.t; ++i)
    r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
  r.clamp();
  r.drShiftTo(1,r);
}

// Barrett modular reduction
function Barrett(m) {
  // setup Barrett
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
  this.mu = this.r2.divide(m);
  this.m = m;
}

function barrettConvert(x) {
  if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
  else if(x.compareTo(this.m) < 0) return x;
  else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
}

function barrettRevert(x) { return x; }

// x = x mod m (HAC 14.42)
function barrettReduce(x) {
  x.drShiftTo(this.m.t-1,this.r2);
  if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }
  this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
  this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
  while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);
  x.subTo(this.r2,x);
  while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = x^2 mod m; x != r
function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = x*y mod m; x,y != r
function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;

// (public) this^e % m (HAC 14.85)
function bnModPow(e,m) {
  var i = e.bitLength(), k, r = nbv(1), z;
  if(i <= 0) return r;
  else if(i < 18) k = 1;
  else if(i < 48) k = 3;
  else if(i < 144) k = 4;
  else if(i < 768) k = 5;
  else k = 6;
  if(i < 8)
    z = new Classic(m);
  else if(m.isEven())
    z = new Barrett(m);
  else
    z = new Montgomery(m);

  // precomputation
  var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
  g[1] = z.convert(this);
  if(k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1],g2);
    while(n <= km) {
      g[n] = nbi();
      z.mulTo(g2,g[n-2],g[n]);
      n += 2;
    }
  }

  var j = e.t-1, w, is1 = true, r2 = nbi(), t;
  i = nbits(e[j])-1;
  while(j >= 0) {
    if(i >= k1) w = (e[j]>>(i-k1))&km;
    else {
      w = (e[j]&((1<<(i+1))-1))<<(k1-i);
      if(j > 0) w |= e[j-1]>>(this.DB+i-k1);
    }

    n = k;
    while((w&1) == 0) { w >>= 1; --n; }
    if((i -= n) < 0) { i += this.DB; --j; }
    if(is1) {	// ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);
      is1 = false;
    }
    else {
      while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
      if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
      z.mulTo(r2,g[w],r);
    }

    while(j >= 0 && (e[j]&(1<<i)) == 0) {
      z.sqrTo(r,r2); t = r; r = r2; r2 = t;
      if(--i < 0) { i = this.DB-1; --j; }
    }
  }
  return z.revert(r);
}

// (public) gcd(this,a) (HAC 14.54)
function bnGCD(a) {
  var x = (this.s<0)?this.negate():this.clone();
  var y = (a.s<0)?a.negate():a.clone();
  if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
  var i = x.getLowestSetBit(), g = y.getLowestSetBit();
  if(g < 0) return x;
  if(i < g) g = i;
  if(g > 0) {
    x.rShiftTo(g,x);
    y.rShiftTo(g,y);
  }
  while(x.signum() > 0) {
    if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
    if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
    if(x.compareTo(y) >= 0) {
      x.subTo(y,x);
      x.rShiftTo(1,x);
    }
    else {
      y.subTo(x,y);
      y.rShiftTo(1,y);
    }
  }
  if(g > 0) y.lShiftTo(g,y);
  return y;
}

// (protected) this % n, n < 2^26
function bnpModInt(n) {
  if(n <= 0) return 0;
  var d = this.DV%n, r = (this.s<0)?n-1:0;
  if(this.t > 0)
    if(d == 0) r = this[0]%n;
    else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
  return r;
}

// (public) 1/this % m (HAC 14.61)
function bnModInverse(m) {
  var ac = m.isEven();
  if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
  var u = m.clone(), v = this.clone();
  var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
  while(u.signum() != 0) {
    while(u.isEven()) {
      u.rShiftTo(1,u);
      if(ac) {
        if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
        a.rShiftTo(1,a);
      }
      else if(!b.isEven()) b.subTo(m,b);
      b.rShiftTo(1,b);
    }
    while(v.isEven()) {
      v.rShiftTo(1,v);
      if(ac) {
        if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
        c.rShiftTo(1,c);
      }
      else if(!d.isEven()) d.subTo(m,d);
      d.rShiftTo(1,d);
    }
    if(u.compareTo(v) >= 0) {
      u.subTo(v,u);
      if(ac) a.subTo(c,a);
      b.subTo(d,b);
    }
    else {
      v.subTo(u,v);
      if(ac) c.subTo(a,c);
      d.subTo(b,d);
    }
  }
  if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
  if(d.compareTo(m) >= 0) return d.subtract(m);
  if(d.signum() < 0) d.addTo(m,d); else return d;
  if(d.signum() < 0) return d.add(m); else return d;
}

var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];
var lplim = (1<<26)/lowprimes[lowprimes.length-1];

// (public) test primality with certainty >= 1-.5^t
function bnIsProbablePrime(t) {
  var i, x = this.abs();
  if(x.t == 1 && x[0] <= lowprimes[lowprimes.length-1]) {
    for(i = 0; i < lowprimes.length; ++i)
      if(x[0] == lowprimes[i]) return true;
    return false;
  }
  if(x.isEven()) return false;
  i = 1;
  while(i < lowprimes.length) {
    var m = lowprimes[i], j = i+1;
    while(j < lowprimes.length && m < lplim) m *= lowprimes[j++];
    m = x.modInt(m);
    while(i < j) if(m%lowprimes[i++] == 0) return false;
  }
  return x.millerRabin(t);
}

// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
function bnpMillerRabin(t) {
  var n1 = this.subtract(BigInteger.ONE);
  var k = n1.getLowestSetBit();
  if(k <= 0) return false;
  var r = n1.shiftRight(k);
  t = (t+1)>>1;
  if(t > lowprimes.length) t = lowprimes.length;
  var a = nbi();
  for(var i = 0; i < t; ++i) {
    //Pick bases at random, instead of starting at 2
    a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);
    var y = a.modPow(r,this);
    if(y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
      var j = 1;
      while(j++ < k && y.compareTo(n1) != 0) {
        y = y.modPowInt(2,this);
        if(y.compareTo(BigInteger.ONE) == 0) return false;
      }
      if(y.compareTo(n1) != 0) return false;
    }
  }
  return true;
}

// protected
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;

// public
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

// JSBN-specific extension
BigInteger.prototype.square = bnSquare;

// BigInteger interfaces not implemented in jsbn:

// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)
;
define("crypt/rsa/jsbn2", ["crypt/rsa/jsbn","crypt/rsa/base64","crypt/rsa/rng"], function(){});

// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object
function parseBigInt(str,r) {
  return new BigInteger(str,r);
}

function linebrk(s,n) {
  var ret = "";
  var i = 0;
  while(i + n < s.length) {
    ret += s.substring(i,i+n) + "\n";
    i += n;
  }
  return ret + s.substring(i,s.length);
}

function byte2Hex(b) {
  if(b < 0x10)
    return "0" + b.toString(16);
  else
    return b.toString(16);
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
  if(n < s.length + 11) { // TODO: fix for utf-8
    alert("Message too long for RSA");
    return null;
  }
  var ba = new Array();
  var i = s.length - 1;
  while(i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    if(c < 128) { // encode using utf-8
      ba[--n] = c;
    }
    else if((c > 127) && (c < 2048)) {
      ba[--n] = (c & 63) | 128;
      ba[--n] = (c >> 6) | 192;
    }
    else {
      ba[--n] = (c & 63) | 128;
      ba[--n] = ((c >> 6) & 63) | 128;
      ba[--n] = (c >> 12) | 224;
    }
  }
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = new Array();
  while(n > 2) { // random non-zero pad
    x[0] = 0;
    while(x[0] == 0) rng.nextBytes(x);
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

// "empty" RSA key constructor
function RSAKey() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N,E) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
  }
  else
    alert("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
  return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
  if(m == null) return null;
  var c = this.doPublic(m);
  if(c == null) return null;
  var h = c.toString(16);
  if((h.length & 1) == 0) return h; else return "0" + h;
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

define("crypt/rsa/rsa", function(){});

// Depends on rsa.js and jsbn2.js

// Version 1.1: support utf-8 decoding in pkcs1unpad2

// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
function pkcs1unpad2(d,n) {
  var b = d.toByteArray();
  var i = 0;
  while(i < b.length && b[i] == 0) ++i;
  if(b.length-i != n-1 || b[i] != 2)
    return null;
  ++i;
  while(b[i] != 0)
    if(++i >= b.length) return null;
  var ret = "";
  while(++i < b.length) {
    var c = b[i] & 255;
    if(c < 128) { // utf-8 decode
      ret += String.fromCharCode(c);
    }
    else if((c > 191) && (c < 224)) {
      ret += String.fromCharCode(((c & 31) << 6) | (b[i+1] & 63));
      ++i;
    }
    else {
      ret += String.fromCharCode(((c & 15) << 12) | ((b[i+1] & 63) << 6) | (b[i+2] & 63));
      i += 2;
    }
  }
  return ret;
}

// Set the private key fields N, e, and d from hex strings
function RSASetPrivate(N,E,D) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
    this.d = parseBigInt(D,16);
  }
  else
    alert("Invalid RSA private key");
}

// Set the private key fields N, e, d and CRT params from hex strings
function RSASetPrivateEx(N,E,D,P,Q,DP,DQ,C) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
    this.d = parseBigInt(D,16);
    this.p = parseBigInt(P,16);
    this.q = parseBigInt(Q,16);
    this.dmp1 = parseBigInt(DP,16);
    this.dmq1 = parseBigInt(DQ,16);
    this.coeff = parseBigInt(C,16);
  }
  else
    alert("Invalid RSA private key");
}

// Generate a new random private key B bits long, using public expt E
function RSAGenerate(B,E) {
  var rng = new SecureRandom();
  var qs = B>>1;
  this.e = parseInt(E,16);
  var ee = new BigInteger(E,16);
  for(;;) {
    for(;;) {
      this.p = new BigInteger(B-qs,1,rng);
      if(this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) break;
    }
    for(;;) {
      this.q = new BigInteger(qs,1,rng);
      if(this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) break;
    }
    if(this.p.compareTo(this.q) <= 0) {
      var t = this.p;
      this.p = this.q;
      this.q = t;
    }
    var p1 = this.p.subtract(BigInteger.ONE);
    var q1 = this.q.subtract(BigInteger.ONE);
    var phi = p1.multiply(q1);
    if(phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
      this.n = this.p.multiply(this.q);
      this.d = ee.modInverse(phi);
      this.dmp1 = this.d.mod(p1);
      this.dmq1 = this.d.mod(q1);
      this.coeff = this.q.modInverse(this.p);
      break;
    }
  }
}

// Perform raw private operation on "x": return x^d (mod n)
function RSADoPrivate(x) {
  if(this.p == null || this.q == null)
    return x.modPow(this.d, this.n);

  // TODO: re-calculate any missing CRT params
  var xp = x.mod(this.p).modPow(this.dmp1, this.p);
  var xq = x.mod(this.q).modPow(this.dmq1, this.q);

  while(xp.compareTo(xq) < 0)
    xp = xp.add(this.p);
  return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
}

// Return the PKCS#1 RSA decryption of "ctext".
// "ctext" is an even-length hex string and the output is a plain string.
function RSADecrypt(ctext) {
  var c = parseBigInt(ctext, 16);
  var m = this.doPrivate(c);
  if(m == null) return null;
  return pkcs1unpad2(m, (this.n.bitLength()+7)>>3);
}

// Return the PKCS#1 RSA decryption of "ctext".
// "ctext" is a Base64-encoded string and the output is a plain string.
//function RSAB64Decrypt(ctext) {
//  var h = b64tohex(ctext);
//  if(h) return this.decrypt(h); else return null;
//}

// protected
RSAKey.prototype.doPrivate = RSADoPrivate;

// public
RSAKey.prototype.setPrivate = RSASetPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
RSAKey.prototype.decrypt = RSADecrypt;
//RSAKey.prototype.b64_decrypt = RSAB64Decrypt;

define("crypt/rsa/rsa2", ["crypt/rsa/jsbn2","crypt/rsa/rsa"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.RSAKey;
    };
}(this)));

!function(a){if("function"==typeof bootstrap)bootstrap("promise",a);else if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define('core/q',a);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeQ=a}else Q=a()}(function(){function a(a){var b=Function.call;return function(){return b.apply(a,arguments)}}function b(a){return a===Object(a)}function c(a){return"[object StopIteration]"===sb(a)||a instanceof hb}function d(a,b){if(eb&&b.stack&&"object"==typeof a&&null!==a&&a.stack&&-1===a.stack.indexOf(ub)){for(var c=[],d=b;d;d=d.source)d.stack&&c.unshift(d.stack);c.unshift(a.stack);var f=c.join("\n"+ub+"\n");a.stack=e(f)}}function e(a){for(var b=a.split("\n"),c=[],d=0;d<b.length;++d){var e=b[d];h(e)||f(e)||!e||c.push(e)}return c.join("\n")}function f(a){return-1!==a.indexOf("(module.js:")||-1!==a.indexOf("(node.js:")}function g(a){var b=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if(b)return[b[1],Number(b[2])];var c=/at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if(c)return[c[1],Number(c[2])];var d=/.*@(.+):(\d+)$/.exec(a);return d?[d[1],Number(d[2])]:void 0}function h(a){var b=g(a);if(!b)return!1;var c=b[0],d=b[1];return c===gb&&d>=ib&&Ab>=d}function i(){if(eb)try{throw new Error}catch(a){var b=a.stack.split("\n"),c=b[0].indexOf("@")>0?b[1]:b[2],d=g(c);if(!d)return;return gb=d[0],d[1]}}function j(a,b,c){return function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(b+" is deprecated, use "+c+" instead.",new Error("").stack),a.apply(a,arguments)}}function k(a){return B(a)}function l(){function a(a){b=a,f.source=a,mb(c,function(b,c){kb(function(){a.promiseDispatch.apply(a,c)})},void 0),c=void 0,d=void 0}var b,c=[],d=[],e=pb(l.prototype),f=pb(n.prototype);if(f.promiseDispatch=function(a,e,f){var g=lb(arguments);c?(c.push(g),"when"===e&&f[1]&&d.push(f[1])):kb(function(){b.promiseDispatch.apply(b,g)})},f.valueOf=j(function(){if(c)return f;var a=o(b);return p(a)&&(b=a),a},"valueOf","inspect"),f.inspect=function(){return b?b.inspect():{state:"pending"}},k.longStackSupport&&eb)try{throw new Error}catch(g){f.stack=g.stack.substring(g.stack.indexOf("\n")+1)}return e.promise=f,e.resolve=function(c){b||a(B(c))},e.fulfill=function(c){b||a(A(c))},e.reject=function(c){b||a(z(c))},e.notify=function(a){b||mb(d,function(b,c){kb(function(){c(a)})},void 0)},e}function m(a){if("function"!=typeof a)throw new TypeError("resolver must be a function.");var b=l();return O(a,b.resolve,b.reject,b.notify).fail(b.reject),b.promise}function n(a,b,c){void 0===b&&(b=function(a){return z(new Error("Promise does not support operation: "+a))}),void 0===c&&(c=function(){return{state:"unknown"}});var d=pb(n.prototype);if(d.promiseDispatch=function(c,e,f){var g;try{g=a[e]?a[e].apply(d,f):b.call(d,e,f)}catch(h){g=z(h)}c&&c(g)},d.inspect=c,c){var e=c();"rejected"===e.state&&(d.exception=e.reason),d.valueOf=j(function(){var a=c();return"pending"===a.state||"rejected"===a.state?d:a.value})}return d}function o(a){if(p(a)){var b=a.inspect();if("fulfilled"===b.state)return b.value}return a}function p(a){return b(a)&&"function"==typeof a.promiseDispatch&&"function"==typeof a.inspect}function q(a){return b(a)&&"function"==typeof a.then}function r(a){return p(a)&&"pending"===a.inspect().state}function s(a){return!p(a)||"fulfilled"===a.inspect().state}function t(a){return p(a)&&"rejected"===a.inspect().state}function u(){xb||"undefined"==typeof window||window.Touch||!window.console||console.warn("[Q] Unhandled rejection reasons (should be empty):",vb),xb=!0}function v(){for(var a=0;a<vb.length;a++){var b=vb[a];b&&"undefined"!=typeof b.stack?console.warn("Unhandled rejection reason:",b.stack):console.warn("Unhandled rejection reason (no stack):",b)}}function w(){vb.length=0,wb.length=0,xb=!1,yb||(yb=!0,"undefined"!=typeof process&&process.on&&process.on("exit",v))}function x(a,b){yb&&(wb.push(a),vb.push(b),u())}function y(a){if(yb){var b=nb(wb,a);-1!==b&&(wb.splice(b,1),vb.splice(b,1))}}function z(a){var b=n({when:function(b){return b&&y(this),b?b(a):this}},function(){return this},function(){return{state:"rejected",reason:a}});return x(b,a),b}function A(a){return n({when:function(){return a},get:function(b){return a[b]},set:function(b,c){a[b]=c},"delete":function(b){delete a[b]},post:function(b,c){return null===b||void 0===b?a.apply(void 0,c):a[b].apply(a,c)},apply:function(b,c){return a.apply(b,c)},keys:function(){return rb(a)}},void 0,function(){return{state:"fulfilled",value:a}})}function B(a){return p(a)?a:q(a)?C(a):A(a)}function C(a){var b=l();return kb(function(){try{a.then(b.resolve,b.reject,b.notify)}catch(c){b.reject(c)}}),b.promise}function D(a){return n({isDef:function(){}},function(b,c){return K(a,b,c)},function(){return B(a).inspect()})}function E(a,b,c,d){return k(a).then(b,c,d)}function F(a,b,c){return E(a,function(a){return Q(a).then(function(a){return b.apply(void 0,a)},c)},c)}function G(a){return function(){function b(a,b){var g;if(tb){try{g=d[a](b)}catch(h){return z(h)}return g.done?g.value:E(g.value,e,f)}try{g=d[a](b)}catch(h){return c(h)?h.value:z(h)}return E(g,e,f)}var d=a.apply(this,arguments),e=b.bind(b,"send"),f=b.bind(b,"throw");return e()}}function H(a){k.done(k.async(a)())}function I(a){throw new hb(a)}function J(a){return function(){return F([this,Q(arguments)],function(b,c){return a.apply(b,c)})}}function K(a,b,c){var d=l();return kb(function(){B(a).promiseDispatch(d.resolve,b,c)}),d.promise}function L(a){return function(b){var c=lb(arguments,1);return K(b,a,c)}}function M(a,b){var c=lb(arguments,2);return zb(a,b,c)}function N(a,b){return K(a,"apply",[void 0,b])}function O(a){var b=lb(arguments,1);return N(a,b)}function P(a){var b=lb(arguments,1);return function(){var c=b.concat(lb(arguments));return K(a,"apply",[this,c])}}function Q(a){return E(a,function(a){var b=0,c=l();return mb(a,function(d,e,f){var g;p(e)&&"fulfilled"===(g=e.inspect()).state?a[f]=g.value:(++b,E(e,function(d){a[f]=d,0===--b&&c.resolve(a)},c.reject))},void 0),0===b&&c.resolve(a),c.promise})}function R(a){return E(a,function(a){return a=ob(a,B),E(Q(ob(a,function(a){return E(a,jb,jb)})),function(){return a})})}function S(a){return E(a,function(a){return Q(ob(a,function(b,c){return E(b,function(b){return a[c]={state:"fulfilled",value:b},a[c]},function(b){return a[c]={state:"rejected",reason:b},a[c]})})).thenResolve(a)})}function T(a,b){return E(a,void 0,b)}function U(a,b){return E(a,void 0,void 0,b)}function V(a,b){return E(a,function(a){return E(b(),function(){return a})},function(a){return E(b(),function(){return z(a)})})}function W(a,b,c,e){var f=function(b){kb(function(){if(d(b,a),!k.onerror)throw b;k.onerror(b)})},g=b||c||e?E(a,b,c,e):a;"object"==typeof process&&process&&process.domain&&(f=process.domain.bind(f)),T(g,f)}function X(a,b,c){var d=l(),e=setTimeout(function(){d.reject(new Error(c||"Timed out after "+b+" ms"))},b);return E(a,function(a){clearTimeout(e),d.resolve(a)},function(a){clearTimeout(e),d.reject(a)},d.notify),d.promise}function Y(a,b){void 0===b&&(b=a,a=void 0);var c=l();return E(a,void 0,void 0,c.notify),setTimeout(function(){c.resolve(a)},b),c.promise}function Z(a,b){var c=lb(b),d=l();return c.push(d.makeNodeResolver()),N(a,c).fail(d.reject),d.promise}function $(a){var b=lb(arguments,1),c=l();return b.push(c.makeNodeResolver()),N(a,b).fail(c.reject),c.promise}function _(a){var b=lb(arguments,1);return function(){var c=b.concat(lb(arguments)),d=l();return c.push(d.makeNodeResolver()),N(a,c).fail(d.reject),d.promise}}function ab(a,b){var c=lb(arguments,2);return function(){function d(){return a.apply(b,arguments)}var e=c.concat(lb(arguments)),f=l();return e.push(f.makeNodeResolver()),N(d,e).fail(f.reject),f.promise}}function bb(a,b,c){var d=lb(c||[]),e=l();return d.push(e.makeNodeResolver()),zb(a,b,d).fail(e.reject),e.promise}function cb(a,b){var c=lb(arguments,2),d=l();return c.push(d.makeNodeResolver()),zb(a,b,c).fail(d.reject),d.promise}function db(a,b){return b?(a.then(function(a){kb(function(){b(null,a)})},function(a){kb(function(){b(a)})}),void 0):a}var eb=!1;try{throw new Error}catch(fb){eb=!!fb.stack}var gb,hb,ib=i(),jb=function(){},kb=function(){function a(){for(;b.next;){b=b.next;var c=b.task;b.task=void 0;var e=b.domain;e&&(b.domain=void 0,e.enter());try{c()}catch(g){if(f)throw e&&e.exit(),setTimeout(a,0),e&&e.enter(),g;setTimeout(function(){throw g},0)}e&&e.exit()}d=!1}var b={task:void 0,next:null},c=b,d=!1,e=void 0,f=!1;if(kb=function(a){c=c.next={task:a,domain:f&&process.domain,next:null},d||(d=!0,e())},"undefined"!=typeof process&&process.nextTick)f=!0,e=function(){process.nextTick(a)};else if("function"==typeof setImmediate)e="undefined"!=typeof window?setImmediate.bind(window,a):function(){setImmediate(a)};else if("undefined"!=typeof MessageChannel){var g=new MessageChannel;g.port1.onmessage=a,e=function(){g.port2.postMessage(0)}}else e=function(){setTimeout(a,0)};return kb}(),lb=a(Array.prototype.slice),mb=a(Array.prototype.reduce||function(a,b){var c=0,d=this.length;if(1===arguments.length)for(;;){if(c in this){b=this[c++];break}if(++c>=d)throw new TypeError}for(;d>c;c++)c in this&&(b=a(b,this[c],c));return b}),nb=a(Array.prototype.indexOf||function(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1}),ob=a(Array.prototype.map||function(a,b){var c=this,d=[];return mb(c,function(e,f,g){d.push(a.call(b,f,g,c))},void 0),d}),pb=Object.create||function(a){function b(){}return b.prototype=a,new b},qb=a(Object.prototype.hasOwnProperty),rb=Object.keys||function(a){var b=[];for(var c in a)qb(a,c)&&b.push(c);return b},sb=a(Object.prototype.toString);hb="undefined"!=typeof ReturnValue?ReturnValue:function(a){this.value=a};var tb;try{new Function("(function* (){ yield 1; })"),tb=!0}catch(fb){tb=!1}var ub="From previous event:";k.nextTick=kb,k.longStackSupport=!1,k.defer=l,l.prototype.makeNodeResolver=function(){var a=this;return function(b,c){b?a.reject(b):arguments.length>2?a.resolve(lb(arguments,1)):a.resolve(c)}},k.promise=m,k.makePromise=n,n.prototype.then=function(a,b,c){function e(b){try{return"function"==typeof a?a(b):b}catch(c){return z(c)}}function f(a){if("function"==typeof b){d(a,h);try{return b(a)}catch(c){return z(c)}}return z(a)}function g(a){return"function"==typeof c?c(a):a}var h=this,i=l(),j=!1;return kb(function(){h.promiseDispatch(function(a){j||(j=!0,i.resolve(e(a)))},"when",[function(a){j||(j=!0,i.resolve(f(a)))}])}),h.promiseDispatch(void 0,"when",[void 0,function(a){var b,c=!1;try{b=g(a)}catch(d){if(c=!0,!k.onerror)throw d;k.onerror(d)}c||i.notify(b)}]),i.promise},n.prototype.thenResolve=function(a){return E(this,function(){return a})},n.prototype.thenReject=function(a){return E(this,function(){throw a})},mb(["isFulfilled","isRejected","isPending","dispatch","when","spread","get","set","del","delete","post","send","mapply","invoke","mcall","keys","fapply","fcall","fbind","all","allResolved","timeout","delay","catch","finally","fail","fin","progress","done","nfcall","nfapply","nfbind","denodeify","nbind","npost","nsend","nmapply","ninvoke","nmcall","nodeify"],function(a,b){n.prototype[b]=function(){return k[b].apply(k,[this].concat(lb(arguments)))}},void 0),n.prototype.toSource=function(){return this.toString()},n.prototype.toString=function(){return"[object Promise]"},k.nearer=o,k.isPromise=p,k.isPromiseAlike=q,k.isPending=r,k.isFulfilled=s,k.isRejected=t;var vb=[],wb=[],xb=!1,yb=!0;k.resetUnhandledRejections=w,k.getUnhandledReasons=function(){return vb.slice()},k.stopUnhandledRejectionTracking=function(){w(),"undefined"!=typeof process&&process.on&&process.removeListener("exit",v),yb=!1},w(),k.reject=z,k.fulfill=A,k.resolve=B,k.master=D,k.when=E,k.spread=F,k.async=G,k.spawn=H,k["return"]=I,k.promised=J,k.dispatch=K,k.dispatcher=L,k.get=L("get"),k.set=L("set"),k["delete"]=k.del=L("delete");var zb=k.post=L("post");k.mapply=zb,k.send=M,k.invoke=M,k.mcall=M,k.fapply=N,k["try"]=O,k.fcall=O,k.fbind=P,k.keys=L("keys"),k.all=Q,k.allResolved=j(R,"allResolved","allSettled"),k.allSettled=S,k["catch"]=k.fail=T,k.progress=U,k["finally"]=k.fin=V,k.done=W,k.timeout=X,k.delay=Y,k.nfapply=Z,k.nfcall=$,k.nfbind=_,k.denodeify=k.nfbind,k.nbind=ab,k.npost=bb,k.nmapply=bb,k.nsend=cb,k.ninvoke=k.nsend,k.nmcall=k.nsend,k.nodeify=db;var Ab=i();return k});
// Define the api end points to be used throughout the code
define('apiEndPoints',{
    updateUserBlob :   "/api/updateUserBlob"
  , createUser     :   "/api/createUser"
  , getUserBlobs   :   "/api/getUserBlobs"
  , getFileKeys    :   "/api/getFileKeys"
  , uploadFile     :   "/api/uploadFile"
  , anonUploadFile :   "/api/anonUploadFile"
  , removeFile     :   "/api/removeFiles"
  , multipass      :   "/api/getMultipass"
})
;
//define the multipass layer for api calls
define('tools/Multipass',["core/q", "apiEndPoints"], function(Q, apiEndPoints){
  var multipassTimeout = 30*60*1e3 // 30 Minutes

  var Multipass  = function(){
        if ( arguments.callee._singletonInstance ){
            return arguments.callee._singletonInstance
        }
        arguments.callee._singletonInstance = this;

        return 
    };

  //all services return a promise
  Multipass.prototype = {
    // Check if the multipass is valid, if it isn't get a new multipass. This will always return a promise
    checkMultipass : function(data){
      data = data || {}

      var defer = Q.defer()

      if ( _.isUndefined(this.multipassCache) || +(new Date()) > this.multipassCacheTimeout + multipassTimeout ){
        var xhr = new XMLHttpRequest()
        ,   xhrDefer = Q.defer()

        xhr.open("POST", apiEndPoints.multipass, true);
        xhr.onload = function(e) {
          if (this.status == 200) {
            xhrDefer.resolve(JSON.parse(xhr.responseText))
          }
        }
        xhr.send()

        xhrDefer.promise.then(_.bind(this.saveMultipass, this, data))
                        .then(function(multipass){defer.resolve(multipass)})
      }else{
        data.multipass = this.multipassCache
        defer.resolve(JSON.stringify(data))
      }

      return defer.promise
    },

    saveMultipass : function(formData, multipassData){
      var defer = Q.defer()
      , multipass = multipassData.return

      if (multipassData.error) {
        console.error("Error in getting multipass",data)
      }

      this.multipassCache = multipass
      this.multipassCacheTimeout = +(new Date())

      formData.multipass = multipass

      defer.resolve(JSON.stringify(formData))

      return defer.promise
    }

  }
  
  return Multipass 
})
;
//define for requirejs
define('tools/uploader',["tools/Multipass"], function(Multipass){
  var multipass = new Multipass()

  //helper tool to upload files 
  var Uploader = function() {
  };

  Uploader.prototype = {

      // Extra options will be thrown into the X-Extra-Data header
      send : function(location, arraybuffer, fileName, progressListener, callback, extraOptions) {
          if (progressListener) progressListener({event:"Uploading", progress:0});

          var xhr = new XMLHttpRequest();

          xhr.open("POST", location, true);
          xhr.responseType = 'text';
          xhr.onload = function(e) {
              if (this.status == 200) {
                  if (progressListener) progressListener({event:"Uploading", progress:100});
                  callback(xhr.responseText);
              }
          };

          var send = this.send
          , that = this;
          xhr.onerror = function(e) {
              console.error("there was an error",e)
              send.apply(that,[location, arraybuffer, fileName, progressListener, callback])
          }

          //setup the progressListener
          xhr.onprogress = function(e){
              if (e.lengthComputable){
                  var progress = (e.loaded / e.total) * 100;
                  if (progressListener) progressListener({event:"Uploading", progress:progress});
              }
          }

          

          // finally send the request as binary data (really an arraybuffer)
          multipass.checkMultipass()
            .then(function(multipassData){
              // Put in the extra data!!!
              extraOptions.multipass = JSON.parse(multipassData).multipass
              xhr.setRequestHeader("X-Extra-Data", JSON.stringify(extraOptions))
              xhr.send(arraybuffer)
            })
      },

  };

  return Uploader
});

//Auto-generated config made in the Makefile. make config
define('config',{
debug : false
, webworkers : true
})
;
//helper tool to download
//define for requirejs
define('tools/downloader',["config", "apiEndPoints", "tools/Multipass"],function(config, api, Multipass){
  var multipass = new Multipass()

  var nemo = "http://"+config.NEMO_LOCATION+":"+config.NEMO_PORT
  var Downloader = function() {
  };

  Downloader.prototype = {
      getFileKeys: function(linknames, callback){
          var request = {filenames:linknames}

          var xhr = new XMLHttpRequest();
          xhr.open('POST', api.getFileKeys, true);
          xhr.responseType = 'text';
          xhr.onload = function(e) {
            if (this.status == 200) {
              console.log(this.response);
              try {
                  var fileKeys = JSON.parse(this.response).return
                  var fileKeysObj = {}
                  // save the key and ts for each file
                  fileKeys.forEach(function(fileKey){ fileKeysObj[fileKey.filename] = {key:fileKey.key, ts: fileKey.ts}  })
              }catch(err){
                  //I really shouldn't have to this so often, so call stack should be fine
                  console.error('There was an error',err)
                  Downloader.prototype.getFileKeys(linknames, callback);
                  return;
              }
              if (typeof callback != 'undefined') callback(fileKeysObj)
            }
          };

          var data = request

          multipass.checkMultipass(data)
                   .then(_.bind(xhr.send, xhr));
      },

      downloadFile: function(linkname, keyObj, progressListener, callback){
          if (progressListener) progressListener({event:"Downloading", progress:0});

          var url = "/download/<%=filename%>/<%=ts%>/<%=key%>" 
          , key = keyObj.key
          , ts = keyObj.ts

          url = _.template(url, {filename:linkname, key:key, ts:ts})

          var request = {command:"downloadFile",filename:linkname,key:key,"meta":{"http":true}}

          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, true)

          xhr.responseType = 'arraybuffer'
          xhr.setRequestHeader('Content-Type','text/plain')

          xhr.onload = function(e) {
            if (this.status == 200) {
              //console.log(this.response);
              if (callback) callback(this.response)
              if (progressListener) progressListener({event:"Downloading", progress:100});
            }
          };

          var downloadFile = this.downloadFile
          , that = this
          xhr.onerror = function(e){
              console.error("there was an error",e)
              downloadFile.apply(that,[linkname, key, progressListener, callback])
          }
          xhr.onprogress = function(e){
              if (e.lengthComputable){
                  var progress = (e.loaded / e.total) * 100;
                  if (progressListener) progressListener({event:"Downloading", progress:progress});
              }
          }
  
          xhr.send();
          
      },

      //a helper function
      getKeyAndDownload: function(linkname, callback){
          this.getFileKeys([linkname], _.bind(function(fileKeyObj){
              var key = _.values(fileKeyObj)[0]
              this.downloadFile(linkname,key, null, callback)
          },this))
      }
  }

  return Downloader
})
;
/**
 * 
 * Simple wrapper for Chrome's Filesystem api
 * 
 * The name should be the original filename not the linkname (aka the random long string) ( e.g. bitchesLoveBitcoins.txt )
 *
 */





var FileSystemHandler = {

    defaultErrHandler: function(e){
        var msg = '';

        switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
          case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
          case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
          case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
          case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
          default:
            msg = 'Unknown Error';
            break;
        };
        console.error('Error: ' + msg);
    },


    /**
     * Creates a new file if it doesn't exist. Deletes it, and creates an empty file if it does exist
     * Doesn't do any writing
     *  params:
     *  { successCallback: fn()
     *    errorCallback: fn()
     *    name: 'coolFileBro.txt'
     *    fileSystem: //the filesystem reference
     *  }
     */
    createFile: function(options){
        var fileSystem = options.fileSystem
        , name = options.name;
        
        options.errorCallback = options.errorCallback || this.defaultErrHandler

        fileSystem.getFileSystem(function(fs){
            fs.root.getFile(name, {create:true, exclusive:true}, options.successCallback, 
                //Error Function, the file might already exist, so we need to delete it
                //
                function(error){
                    //check to make sure the error is that is already exists
                    if (error.code === FileError.PATH_EXISTS_ERR || error.code === FileError.INVALID_MODIFICATION_ERR){
                        fs.root.getFile(name, {create:false}, function(fileEntry){
                            //lets remove the existing file
                            fileEntry.remove(function(){
                                //now that the file is removed lets create it
                                fs.root.getFile(name, {create:true}, options.successCallback, options.errorCallback);
                            })
                        }, options.errorCallback)
                    }else{
                      console.error("There was something wrong with the filesystem",error)
                    }
                }
           )
        })
    },

    /**
     * Helper method for writing to a file and appending 
     *  params:
     *  { successCallback: fn()
     *    errorCallback: fn()
     *    name: 'coolFileBro.txt'
     *    fs: //the filesystem reference
     *    data: an array buffer
     *    type: the type of the original file
     *    start: //byte postion to start writing
     *  }
     *
     *
     */
    appendToFile: function(options){
        var fileSystem = options.fileSystem
        , name = options.name;

        options.errorCallback = options.errorCallback || this.defaultErrHandler

        fileSystem.getFileSystem(function(fs){
            fs.root.getFile(name, {create:false}, function(fileEntry){
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.seek(options.start)
                    //console.log('starting at', options.start)
                    var blob = new Blob([options.data], {type: options.type})

                    fileWriter.write(blob)
                    
                    //execute callback when done writing file
                    fileWriter.onwriteend = options.successCallback

                }, options.errorCallback)
            }, options.errorCallback)
        }, options.errorCallback, options.size)
    },

    readFile: function(fileName, size){
        var errorHandler = this.defaultErrHandler;
        var onInitFs = function (fs) {

            fs.root.getFile(fileName, {}, function(fileEntry) {

                // Get a File object representing the file,
                // then use FileReader to read its contents.
                fileEntry.file(function(file) {
                    var reader = new FileReader();

                    reader.onloadend = function(e) {
                     console.log("File contents:")
                     console.log(this.result)
                    };

                    reader.readAsText(file);
                }, errorHandler);

            }, errorHandler);

        }

        window.requestFileSystem(window.TEMPORARY, size, onInitFs, this.defaultErrHandler);
    },

}
    
//define for requirejs
define('tools/FileSystemHandler',[],function(){return FileSystemHandler});

//returns a filesystem singleton, this is for chrome's filesystem api, not to be confused with the user's filesystem
define('models/FileSystem',[],function(){ 
    //precent webworkers from crashing because they try to access the filesystem
    if (typeof(window) === "undefined"){
      return {}
    }

    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem



    FileSystem = function(){
        if ( arguments.callee._singletonInstance ){
            return arguments.callee._singletonInstance
        }
        arguments.callee._singletonInstance = this;
    };

    FileSystem.prototype = {

        size:0,

        fileSystemLoaded: false,
        
        defaultErrCallback: function(e){
            var msg = '';

            switch (e.code) {
              case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                break;
              case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                break;
              case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
              case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
              case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
              default:
                msg = 'Unknown Error';
                break;
            };

            console.error('Error: ' + msg);
        },

        //This should only be called once, with the requested filesystem being cached under this.fs
        initializeFileSystem: function(requestedSizeInBytes, callback, errCallback){
            var that = this
            errCallback = errCallback || this.defaultErrCallback
            this['size']=requestedSizeInBytes

            //First lets ask for space, please!
            navigator.webkitTemporaryStorage.requestQuota(requestedSizeInBytes*10,
              function(grantedBytes){
                //We got the space, nice! now we ask for the filesystem, with a pretty please
                requestFileSystem(TEMPORARY, requestedSizeInBytes*10, 
                function(fs){ 
                  //we got the fs, now let's cache that sucker
                  that.fileSystemLoaded = true
                  that.fs = fs
                  if (typeof(callback) !== "undefined") callback(fs)
                }, 
                errCallback )
              },
              errCallback)
        },

        requestMoreSpace:function(spaceInBytes, callback, errCallback){
            var newSize = this['size'] + spaceInBytes;
            errCallback = errCallback || this.defaultErrCallback
            this.initializeFileSystem(newSize, callback, errCallback)
        },

        getFileSystem: function(callback, errCallback, size){
            size = size || this.size
            //console.log('this size is gonna be', size)
            errCallback = errCallback || this.defaultErrCallback
            if (this.fileSystemLoaded){
              callback(this.fs)
            }else{
              this.initializeFileSystem(size, callback, errCallback)
            }
        },

    }

    return FileSystem;

});

//Define the  model that will deal with RSA stuff
define('models/RSA',[],function(){ 
    return Backbone.Model.extend({

    defaults: {
      version : 1.0 //version for the RSA
      , e_rsa: "1337" //this is actually hex for 4919
      , bits_rsa: 512
      , iterations_hash: 1337
      , bytes_hash: 16
      , fs : {name:"root", type:"folder", value:{}}
      , sane: true //simple check to see if a blob has been decrypted
    }

    , generateRSA: function(){
      var rsa = new RSAKey()
      rsa.generate(this.get('bits_rsa'), this.get('e_rsa'))
      this.set('rsa',rsa)
    }

    , getRSAObject : function(){
      //store RSA values in base64 likaboss
      return {
        "pub_key": hex2b64(this.get('rsa').n.toString(16))
      , "private_key" : hex2b64(this.get('rsa').d.toString(16))
      , "rsa_e" : hex2b64(this.get('rsa').e.toString(16))
      }
    }

    , setRSAObject : function(RSAObject){
      var rsa = new RSAKey()
      //keys for the N, E, D components of the rsa
      var NEDkeys = [RSAObject.pub_key, RSAObject.rsa_e, RSAObject.private_key]
      //transform the keys to hex from b64
      NEDkeys = _.map(NEDkeys, b64tohex)

      //set the value to the rsa
      rsa.setPrivate.apply(rsa, NEDkeys)
      this.set('rsa',rsa)
      return this;
    }

    //signing using the private key, so that it can be verified with the public key
    , signMessage: function(messageString){
      //first lets hash the message
      var hash = sjcl.hash.sha256.hash(messageString)
      , rsa = this.get('rsa')
      hash = sjcl.codec.base64.fromBits(hash) //convert to b64

      //Sign the hash
      //We sign the hash by encrypting the hash with the private key, so it will later be decrypted with a public key to compare
      //the computed hash with the given, signed hash
      //Place the padding
      padded_hash = pkcs1pad2(hash, (rsa.n.bitLength()+7)>>3)
      //Encrypt the hash using the private key
      signed_hash = padded_hash.modPow(rsa.d, rsa.n)
      
      //b64 encode
      var sig = hex2b64(signed_hash.toString(16))

      return sig
    }


  })
})
;
define('tools/sha1Hash',[],function(){
  var zeroPad = function(howManyZeros){
    return _.reduce(_.range(howManyZeros),function(m){return '0'+m},'')
  }

  sha1Hash =  function(arraybuffer){
      var byteLength = arraybuffer.byteLength

      // The total byte length must be congruent to 56 mod 64
       
      //Increment the byteLength because we are apending the bits 1000 0000 
      ++byteLength

      // Figure out how many bytes of zero we need
      var padding = (64 + (56 - byteLength%64))%64

      var originalMessageLength = arraybuffer.byteLength
      , originalMessageLengthHex = originalMessageLength.toString('16')
      , originalMessageLengthHex = originalMessageLengthHex.length == 16 ? originalMessageLengthHex : zeroPad(16-originalMessageLengthHex.length)+originalMessageLengthHex
      //lets fake shift everything left 4bits
      , hi_length_bits = '0x'+originalMessageLengthHex.substring(1,9)
      , lo_length_bits = '0x'+originalMessageLengthHex.substring(9)+"0"


      var messageLength = new Uint32Array(2)

      messageLength[0]=parseInt(hi_length_bits)
      messageLength[1]=parseInt(lo_length_bits)

      //bring it back with a one right bit shift
      
      //first lets do the bottom part
      messageLength[1]>>=1
      messageLength[1] = messageLength[1] | ((messageLength[0] & 0x1)<<31) // carry over the lsb of the high bits
      // now we can do the hi bits
      messageLength[0]>>=1


      var message = new Uint8Array(arraybuffer)

      var paddedBuffer = new ArrayBuffer(byteLength+padding+messageLength.byteLength)

      //represent the padded message as 32 bit numbers, we are still sharing the data from the origin padded message
      var paddedMessage32bit = new Uint32Array(paddedBuffer)
      ,   paddedMessage8bit = new Uint8Array(paddedBuffer)

      if (message.length == 0){
        paddedMessage8bit[3]=0x80
      }

      //copy the original message part
      for (var index=0;index<message.length;index+=4){
        //since the 8 bit bytes translate to the 32bit array as little endian we need to copy it so (e.g. 8bit [0x1,0x2,0x3,0x4] == 32bit [0x04030201]
        var i = 0
        , max = 4
        if (message.length < 4+index) max=message.length%4;

        //copy the bytes downward
        while( i < max){
          paddedMessage8bit[(3-i) + index] = message[i+index]
          i++
        }

        //we are done here
        if (i+index === message.length){
          // If the message didn't end early we need to put it on the next 32bit chunk at the very front which happens to be i+3 bytes since the order mentioned above
          if (i === 4){
            paddedMessage8bit[3+i + index]=0x80
          }else{
            // if it did end early we can just tak it on
            paddedMessage8bit[(3-i) + index]=0x80
          }
        }
      }


      //The rest are will automatically be zeros so we don't need to explicitly create the padding

      //set the end message bytes
      paddedMessage32bit[paddedMessage32bit.length-1] = messageLength[1]
      paddedMessage32bit[paddedMessage32bit.length-2] = messageLength[0]


      var leftRotate32BitWordNtimes = function(word, times){
          return (word<<times) | (word>>>32-times)
      }

      var h = new Uint32Array([0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0])

      var hashTerms = new Uint32Array(7)  //a, b, c, d, e, f, temp
      , K = new Uint32Array([0x5A827999,0x6ED9EBA1,0x8F1BBCDC,0xCA62C1D6])


      //Create the array for the words
      var words = new Uint32Array(80)

      //get the range of chunks, at 16 step intervals because 32bits*16=512bits which is the chunksize we need
      var chunkLocation = 0
      while(chunkLocation<paddedMessage32bit.length){

          //This is what the chunk would look like
          var chunk = paddedMessage32bit.subarray(chunkLocation,chunkLocation+16)
          chunkLocation+=16;

          for(var i=0;i<16;i++){
              words[i] = chunk[i]
          }

          //Create the rest of the words
          for(var wordIndex=16;wordIndex<80;wordIndex++){
              words[wordIndex] = leftRotate32BitWordNtimes(
                  words[wordIndex-3] ^ words[wordIndex-8] ^ words[wordIndex - 14] ^ words[wordIndex - 16] // xor all the words!
              , 1)
          }



          hashTerms[0] = h[0]
          hashTerms[1] = h[1]
          hashTerms[2] = h[2]
          hashTerms[3] = h[3]
          hashTerms[4] = h[4]

          //BIT TWIDDILING
          //Main Loop

          for(var i=0;i<80;i++){
              if (i < 20){
                  hashTerms[5] = (hashTerms[1] & hashTerms[2]) ^ ((~ hashTerms[1]) & hashTerms[3])
              } else if ( i < 40 ) {
                  hashTerms[5] = hashTerms[1] ^ hashTerms[2] ^ hashTerms[3]
              } else if ( i < 60 ) {
                  hashTerms[5] = (hashTerms[1] & hashTerms[2]) ^ (hashTerms[1] & hashTerms[3]) ^ (hashTerms[2] & hashTerms[3]) 
              } else if ( i < 80 ) {
                  hashTerms[5] = hashTerms[1] ^ hashTerms[2] ^ hashTerms[3]
              }

              hashTerms[6] = leftRotate32BitWordNtimes(hashTerms[0],5) + hashTerms[5] + hashTerms[4] + K[Math.floor(i/20)] + words[i]

              hashTerms[4] = hashTerms[3]
              hashTerms[3] = hashTerms[2]
              hashTerms[2] = leftRotate32BitWordNtimes(hashTerms[1],30)
              hashTerms[1] = hashTerms[0]
              hashTerms[0] = hashTerms[6]


          }



          h[0] += hashTerms[0]
          h[1] += hashTerms[1]
          h[2] += hashTerms[2]
          h[3] += hashTerms[3]
          h[4] += hashTerms[4]
      }

      var digest = _.reduce(h, function(memo, num){
        var hex = num.toString(16)
        return memo+(hex.length == 8 ? hex : zeroPad(8-hex.length) + hex)
      }, '')
      return digest


  }

  //Slightly faster implementation (1/1000 of a second on my machine)
  function sha1_array(input) {
        input = new Uint8Array(input)
        var H = new Uint32Array([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]),
            m = [],
            l = input.length * 8,
            w = [];
      
        for (var i = 0, b = 0, end = l / 8; i < end; i++, b += 8) {
          m[b >>> 5] |= input[i] << (24 - b % 32);
        }
      
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >>> 9) << 4) + 15] = l;
      
        for (var i = 0, end = m.length; i < end; i += 16) {
          var a = H[0],
              b = H[1],
              c = H[2],
              d = H[3],
              e = H[4];
      
          for (var j = 0; j < 80; j++) {
            if (j < 16) {
              w[j] = m[i + j];
            } else {
              var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
              w[j] = (n << 1) | (n >>> 31);
            }
      
            var t = ((H[0] << 5) | (H[0] >>> 27)) + H[4] + (w[j] >>> 0) + (
            j < 20 ? (H[1] & H[2] | ~H[1] & H[3]) + 0x5a827999 : j < 40 ? (H[1] ^ H[2] ^ H[3]) + 0x6ed9eba1 : j < 60 ? (H[1] & H[2] | H[1] & H[3] | H[2] & H[3]) - 0x70e44324 : (H[1] ^ H[2] ^ H[3]) - 0x359d3e2a);
      
            H[4] = H[3];
            H[3] = H[2];
            H[2] = (H[1] << 30) | (H[1] >>> 2);
            H[1] = H[0];
            H[0] = t;
          }
      
          H[0] += a;
          H[1] += b;
          H[2] += c;
          H[3] += d;
          H[4] += e;
        }
      

        var result = new Uint8Array(H.buffer);
        return _.reduce(_.range(0,20,4), function(digest,part){
          return digest + _.reduce(_.range(0,4).reverse(), function(hexTotal,index){
            var hex = result[part+index].toString(16)
            hex = hex.length == 2 ? hex : zeroPad(2-hex.length) + hex
            return hexTotal+hex
          },'')
        }, '')
      }


  var inputs = [
    (new Uint8Array(1000)).buffer
    , (new Uint8Array(1000))
  ]

  _.forEach(inputs[1], function(b, i){if (i%2==0){ inputs[1][i] = 0x13 } else { inputs[1][i] = 0x37 } })
  inputs[1] = inputs[1].buffer


  var hashBenchmark = function(func,input){
    var startTime = new Date()
    , i=1e4

    while(i != 0){
      i--;
      func(input)
    }
    var endTime = new Date()  

    console.log("It took",(endTime-startTime)/1e3, "seconds")
  }

  benchmarkEverything = function(){
    console.log('my thing')
    hashBenchmark(sha1Hash, inputs[0])
    console.log('other')
    hashBenchmark(sha1_array, inputs[0])
    console.log('my thing')
    hashBenchmark(sha1Hash, inputs[1])
    console.log('other')
    hashBenchmark(sha1_array, inputs[1])
  }

  var errors = []
  testEverything = function(){
    _.forEach(_.range(500), function(){
      var input = new Uint8Array(_.range(_.random(4000)));
      _.forEach(input, function(num, index){
        input[index] = _.random(4096)
      })

      if (sha1_array(input.buffer) === sha1Hash(input.buffer)){
      }else{
        errors.push(input)
        console.log('Error: Functions didnt match output')
      }
    })
    if (errors.length === 0) { console.log("Nice! no errors!") }
  }

  return sha1Hash

})

;
//Define the chunk model
define('models/Chunk',['tools/uploader','tools/downloader','tools/FileSystemHandler', 'models/FileSystem', 'models/RSA', 'apiEndPoints', 'tools/sha1Hash'],function(Uploader, Downloader, FileSystemHandler, FileSystem, RSAModel, api, sha1Hash){ 
    if (typeof(console) === "undefined") {
      //in case we are in a web worker
      console = {
        log : function(){}
        , error : function(){}
        , warn : function(){}
      }
    }

    return Backbone.Model.extend({

        defaults: {
            //This chunk uses the 1.0 version of enryption, future chunks may have different versions
           encryptionVersion: "1.0",

           chunkSize: 4194304,  //Specify how big the chunk should be. ******  THIS HAS TO BE DIVISBLE BY 16 ****** (the reason so that we only need pad the last chunk)
           //chunksize is 4MB
           
           //required params to be passed in
           /*
            * This is needed so that the chunks can upload their own data
            * but in order to do that they need to sign for it, and then the server needs to verify the signature with their username+stored public_key
           username: "anon",
           RSAObject : {"pub_key":...} 
           */
        },


        //gets the buffer from the file model, along with a start, and end position, and if padding is required
        getBuffer: function(fileModel, start, end, padding, callback){
            fileModel.getArrayBufferChunk(start, end, _.bind(function(buffer){

                if (padding){
                    var leftover = (end - start)%(16)
                    var paddedSize  = (16 - leftover) + (end - start)
                    var copierDest = new Uint8Array(paddedSize)
                    var copierSource = new Uint8Array(buffer)
                    _.each(copierSource, function(byte, index){ copierDest[index] = byte })
                    buffer = copierDest.buffer;
                }

                //save the buffer
                this.set('buffer',buffer)
                callback(buffer)

            },this))
        },

        //save the buffer info so we know how get the correct chunk when we really need it.
        saveBufferInfo: function(fileModel, start, end, padding){
            this.set('bufferInfo',[fileModel, start, end, padding])
        },

        getBufferFromState: function(callback){
            //call getBuffer with the bufferInfo  as args
            this.getBuffer.apply(this,this.get('bufferInfo').concat(callback))
        },

        initialize:  function(options){

            //create the RSA model if we have the necessary info
            if (this.has('RSAObject')){
              var rsa = new RSAModel()
              rsa.setRSAObject(this.get('RSAObject'))
              this.set('rsa',rsa)
            }

            //generate initial set of keys, this doesn't take long but it's nice to know we have them
            this.generateKey()
        },


        // Generate the initial keys
        generateKey: function(){
            if ( !this.has('iv') || !this.has('key')){
                this.set('iv',sjcl.random.randomWords(2));
                this.set('key',sjcl.random.randomWords(8));
            }
        },

        /*
         * Encodes the key along with the iv
         * The first for items in the array are the iv
         *
         * The reason it looks async is that this method is also used by the webworker so it needs to appear async on both implementations
         */
        encodeIVKey: function(callback){
            var ivKey = sjcl.codec.base64url.fromBits(this.get('iv').concat(this.get('key')))
            if (callback) callback(ivKey)
            return ivKey
        },

        /* Sets the internal iv and returns the decoded key
         * The first 2 items belong to the iv
         * The last 8 is the key
         */
        decodeIVKey: function(encodedKey){
            var ivKey = sjcl.codec.base64url.toBits(encodedKey);

            this.set('iv',ivKey.slice(0,2))
            this.set('key' , ivKey.slice(2))

            return ivKey.slice(2);
        },

        encryptChunk:function(){
            if (this.has('progressListener')) this.get('progressListener')({event:'Encrypting',progress:0})
            
            var prf = new sjcl.cipher.aes(this.get('key'))

            var e = sjcl.arrayBuffer.ccm.encrypt( 
              prf,
              this.get('buffer'),
              this.get('iv')
            )

            this.set('buffer', e.ciphertext_buffer)
            this.set('tag',e.tag)

            this.set('encrypted', true)

            if (this.has('progressListener')) this.get('progressListener')({event:'Encrypting',progress:100})

        },

        encryptStr: function(str){
            //authenticated encryption
            var e = sjcl.encrypt(this.get('key'), str)
            return e
        },

        decryptStr: function(str){
            var d = sjcl.decrypt(this.get('key'), str)
            return d
        },

        decryptChunk:function(){
            if (this.has('progressListener')) this.get('progressListener')({event:'Decrypting',progress:0})
              
            var prf = new sjcl.cipher.aes(this.get('key'))

            var d = sjcl.arrayBuffer.ccm.decrypt( 
              prf,
              this.get('buffer'),
              this.get('iv'),
              this.get('tag')
            )

            this.set('buffer', d)

            if (this.has('progressListener')) this.get('progressListener')({event:'Decrypting',progress:100})

            return d

        },

        serializeChunk: function(buffer){
            //Converts the array buffer into a string, where each char is = to two bytes
            string = ''
            stringBuffer = new Uint16Array(buffer)
            for (var i = 0; i < stringBuffer.length; i++) {
                string += String.fromCharCode( stringBuffer[i] )
            };
            return string
        },

        deserializeChunk: function(str){
            var buf = new ArrayBuffer(str.length*2)
            var bufView = new Uint16Array(buf)

            for (var i = 0; i < str.length; i++) {
                bufView[i] = str.charCodeAt(i)
            };

            this.set('buffer',buf)
            return buf;
        },

        //The callback will contain the linkName
        upload: function(callback){

            // We need to check to see if we even have the buffer that we need to upload
            // If we don't have it we need to get it and comeback to this funciton
            if ( !this.has('buffer')){
                this.getBufferFromState(_.bind(this.upload,this,callback))
                return
            }




            var location = api.uploadFile
            var linkName = Math.random().toString(36).substring(2);
            var chunkData = this.serializeChunk(this.get('buffer'))

            var uploader = new Uploader();

            //check if we have already encrypted the chunk
            if (!this.get("encrypted")){
              this.encryptChunk();
            }

            //this is going to be a signed user upload as opposed to an anonymous upload
            //The username is required for chunks that are signed so the server can verify the sig
            //As well as the hash of the chunk
            //As well as the Signed hash of the chunk 
            if (this.has('rsa') ) {
              var rsa = this.get('rsa')
              , username = this.get('username')
              , hash = sha1Hash(this.get('buffer'))
              , sig = rsa.signMessage(hash)

              uploader.send(location, this.get('buffer'), linkName, this.get('progressListener'), function(response){
                  result = JSON.parse(response)
                  callback(result.return)
              }, {
                username : username
                , hash : hash 
                , signature: sig
              })
            }else{
              var hash = sha1Hash(this.get('buffer'))
              uploader.send(api.anonUploadFile, this.get('buffer'), linkName, this.get('progressListener'), function(response){
                  result = JSON.parse(response)
                  callback(result.return)
              }, {
                username : username
                , hash : hash 
                , signature: sig
              })
            }
        },

        //callback will return the binary data 
        download: function(callback){
            if ( !this.has('linkName') || !this.has('linkKeyObj') )
            {
                console.error('link name or link key is not set');
            }

            Downloader.prototype.downloadFile(
                this.get('linkName'),
                this.get('linkKeyObj'), 
                this.get('progressListener'), 
                _.bind(function(arraybuffer){
                    this.set('buffer',arraybuffer)
                    //we are also going to decrypt here to save another worker message
                    this.decryptChunk()
                    //passing the data back just to test
                    if (callback) callback(this.get('buffer'))
                },this)
            )
        },

        writeToFile: function(fileSystem, manifest, callback, errCallback){
            var buffer = this.get('buffer')
            var chunkCount = _.keys(manifest.chunks).length -1 //zero indexed
            //if this is the last chunk only write the amount needed to the file
            if ( this.get('chunkInfo').part == chunkCount){
                var lastChunkSize =  manifest.size - (chunkCount*this.get('chunkSize'))

                buffer = buffer.slice(0, lastChunkSize)
            }


            //specify where in the file this chunk starts
            var start = this.get('chunkInfo').part*this.get('chunkSize')

            var fileSystem = new FileSystem()
            FileSystemHandler.appendToFile(
                { 
                  successCallback: callback
                  , errorCallback: errCallback
                  , name: manifest.name
                  , fileSystem: fileSystem
                  , data: buffer
                  , type: manifest.type
                  , size: manifest.size
                  , start: start
                }
            )

        },

        readData: function(){
            var stringBufferView = new Uint8Array(this.get('buffer'))
            var data = String.fromCharCode.apply(this,stringBufferView)

            return data;
        },

        hexDump: function(){
            var stringBufferView = new Uint16Array(this.get('buffer'))
            var string = ''

            for (var i = 0; i < stringBufferView.length; i+=1) {
                if (i%16 == 0) string += ('\n'+(i).toString(16)+'\t')
                string += ( stringBufferView[i].toString(16) + ' ')
            }
            console.log(string.toUpperCase())

        },

        attachProgressListener: function(callback){
            this.set('progressListener',callback)
        },

    })
})

;
define('models/Manifest',["models/Chunk","tools/downloader"],function(Chunk, Downloader){ 
    var debug = true;

    return Backbone.Model.extend({

        defaults: {
            chunkKeyCache : {}
            , lastChunkKeyTimestamp : 0
            , chunkKeyTimeout: 30e3 //timeout in ms
            , maxKeysPerRequest: 20
            , encryptionVersion: "1.0" //This will map to encryption methods, and eventually a different chunks file will support different encryption versions.
            , tagLength: 16
            // Older chunks will re encrypt to new format if necessary.
            // 
        /** These are what the manifest object would look like
           name: coolFileBro.txt
           type: 'text/plain'
           encryptionVersion: "1.0"
           size: 1e6 //1 MB
           linkName: 'jeJDxkie'
           chunks: {
             2:{
               linkName : 'ejxiiEx',
               IVkey : 'AEcjdejcde',
               part: 2
             }
           ...
           }
        */

        },

        getChunkLinks : function(){
            var chunks = this.get('chunks')
            , length = _.keys(chunks).length
            , chunkLinks = _.map( _.range(length), function(index){ return chunks[index].linkName })
            return chunkLinks
        },

        setChunkLinkName: function(chunkIndex, linkName, chunk, callback){
            var chunks = this.get('chunks');
            chunks[chunkIndex].linkName = linkName
            chunks[chunkIndex].tag = chunk.get('tag')
            this.set('chunks',chunks)

            if (callback) callback();
        },

        setChunks: function(chunks, callback){
            var manifestChunks = {}
            //After all the async calls to get the chunk's IVkeys have been executed, lets save the chunks in the manifest
            var saveChunks = _.after(chunks.length, _.bind(function(){
                this.set('chunks',manifestChunks);
                callback();
            },this))
            for (var i = 0; i < chunks.length; i++) {
                chunks[i].encodeIVKey(_.bind(
                    function(i,ivKey){
                        var chunk = {
                            linkName : ''
                            , IVKey: ivKey
                            , part: i
                        }
                        manifestChunks[i]= chunk
                        saveChunks()
                },this,i))
            };
            //this.set('chunks',manifestChunks)
        },

        saveTag: function(tag, buffer){
            //this will create a new buffer with the tag prepended
            var dataView = new DataView(new ArrayBuffer(buffer.byteLength+this.get('tagLength'))),
                srcData  = new DataView(buffer)
                tagLength = this.get('tagLength')

            //copy the tag data
            dataView.setUint32(0,  tag[0])
            dataView.setUint32(4,  tag[1])
            dataView.setUint32(8,  tag[2])
            dataView.setUint32(12, tag[3])

            for (var i = 0;i<srcData.byteLength;i++){
              dataView.setUint8(i+tagLength, srcData.getUint8(i))
            }

            return dataView.buffer
        },

        //retruns an array of 2 items, the first being the tag, the second is the new tagless buffer
        popTag: function(buffer){
            var tag = [],
                taglessBuffer = buffer.slice(this.get("tagLength")),
                dataView = new DataView(buffer)

            tag[0] = dataView.getUint32(0)
            tag[1] = dataView.getUint32(4)
            tag[2] = dataView.getUint32(8)
            tag[3] = dataView.getUint32(12)

            return [tag, taglessBuffer]

        },

        //The Callback will be supplied with an object containing linkName and IVKey
        uploadManifest: function(callback){
            var buffer = this.manifestToBuffer()
            , usernameAndRSA = {}
            if (this.has('userBlob')){
              usernameAndRSA = _.pick(this.get('userBlob'), ["username", "RSAObject"]) 
            }

            manifestChunk = new Chunk(_.defaults({buffer:buffer}, usernameAndRSA))
            if(debug){
                manifestChunk.hexDump()
            }
            var IVKey = manifestChunk.encodeIVKey()
            this.set('IVKey', IVKey)
            var t=this;
            manifestChunk.encryptChunk()
            var buffer = manifestChunk.get('buffer')
                taggedBuffer = this.saveTag(manifestChunk.get('tag'), buffer)

            manifestChunk.set('buffer',taggedBuffer)
            manifestChunk.upload(
                function(linkName){
                    callback({
                        linkName: linkName,
                        IVKey: IVKey
                    })
                    if (debug){
                        console.log('uploaded')
                        console.log(window.location.origin+('#download/'+linkName+'/'+IVKey))
                    }
                }
            );
        },

        downloadManifest: function(linkName, passcode, callback){
            Downloader.prototype.getKeyAndDownload(linkName, _.bind(function(buffer){
                var tagInfo = this.popTag(buffer),
                    taglessBuffer = tagInfo[1],
                    tag = tagInfo[0],
                    manifestChunk = new Chunk({buffer:taglessBuffer})

                manifestChunk.set('tag',tag)

                manifestChunk.decodeIVKey(passcode)
                if(debug){
                    console.log('downloaded, dumping hex')
                    manifestChunk.hexDump()
                }

                try{
                    manifestChunk.decryptChunk()
                }catch(err){
                    console.log('decryption failed')
                    return;
                }

                try{
                    this.bufferToManifest(manifestChunk.get('buffer'));
                }catch(error){
                    console.error("Couldn't parse the manifest");
                    return
                }

                if (callback) callback(this)

            },this))
        },

        fetchChunkKeys: function(startingIndex, callback){
            var endIndex = _.min([_.keys(this.get('chunks')).length, this.get('maxKeysPerRequest')+startingIndex])
            , indices = _.range(startingIndex, endIndex)
            , chunks = this.get('chunks')
            , chunkLinkNames = _.map(indices, function(index){
                return chunks[index].linkName
            }, this)

            Downloader.prototype.getFileKeys(chunkLinkNames, _.bind(function(chunkKeys){
                this.set('chunkKeyCache',chunkKeys)
                this.set('lastChunkKeyTimestamp',+(new Date()))

                callback(chunkKeys[chunks[startingIndex].linkName])
            },this))

        },

        // This will transperantly handle fetching the chunk keys from the server
        // It will make a request and remember the request time
        // If a chunkKey is requested withouth being in the cached array, another request will be made
        fetchChunkKey: function(chunkIndex, callback){
            //check the timeout
            if ( this.get('chunkKeyTimeout') < ( +(new Date()) - this.get('lastChunkKeyTimestamp') ) ){
                this.fetchChunkKeys(chunkIndex, callback)
                return
            }

            var chunkLinkName = this.get('chunks')[chunkIndex].linkName

            if ( _.isUndefined(this.get('chunkKeyCache')[chunkLinkName]) ){
                this.fetchChunkKeys(chunkIndex, callback)
                return
            }else{
                callback(this.get('chunkKeyCache')[chunkLinkName])
                return
            }
        },


        manifestToBuffer: function(){
            var manifestData = JSON.stringify(this.toJSON())

            //padding for encryption
            
            //it has to be divisible by 4 and 32 to be prorperly decrypted/encrypted
            var dataLength = manifestData.length*2
            var paddedLength = dataLength + ( (16) - dataLength%(16) )

            var buffer = new ArrayBuffer(paddedLength)
            var stringBuffer = new Uint16Array(buffer)

            //copy the tag over
            
            for (charIndex=0; charIndex<paddedLength; charIndex++){
                if (charIndex >= manifestData.length){
                    stringBuffer[charIndex] = 32 // 32 is the space character
                }else{
                    stringBuffer[charIndex] = manifestData.charCodeAt(charIndex);
                }
            }


            return buffer
        },

        bufferToManifest: function(buffer){
            var stringBufferView = new Uint16Array(buffer)
            var manifestJSON = String.fromCharCode.apply(this,stringBufferView)

            console.log(manifestJSON);
            this.set( JSON.parse(manifestJSON) ) 

        },

        initialize:  function(){
        },
    })
})

;
//Chunk Worker Interface
define('models/ChunkWorkerInterface',['models/Chunk'],function(Chunk){ 
    return Chunk.extend({
        defaults:{
            workerScript: "js/ChunkWorker.js"
        },

        initialize: function(){
            this.generateKey()
        },

        /*
         * Encodes the key along with the iv
         * The first for items in the array are the iv
         */
        encodeIVKey: function(callback){
            var ivKey = sjcl.codec.base64url.fromBits(this.get('iv').concat(this.get('key')))
            if (callback) callback(ivKey)
            return ivKey
        },


        //setup a new worker
        createWorker: function(callback){
            this.worker = new Worker(this.get('workerScript'))
            this.setupPostMessage(this.worker)
            this.worker.onmessage = _.bind(this.callbackHandler,this)
            //we cannot just create the worker and send it messages,
            //we need to wait until it is finished spawning
            var workerMessageOnComplete = "readyToRock" //this is what the worker will send when it's ready to start doing stuff


            //setup the callback handler
            this.bindSuccess(workerMessageOnComplete, _.bind(this.initializeChunk, this, callback))
        },

        initializeChunk : function(callback){
            var command = "initializeChunk"

            this.worker.postMessage({
                command : command
                , entropy : sjcl.random.randomWords(8)
                , chunkOpts: {
                    iv:this.get('iv')
                    , key:this.get('key')
                    , username : this.get('username')
                    , RSAObject : this.get('RSAObject')
                }

            })

            //setup the callback handler
            this.bindSuccess(command, callback)
            this.reallyAttachProgressListener()
        },


        setupPostMessage: function(worker) {
            var postMessageFunc = worker.webkitPostMessage || worker.postMessage; //try to use webkitPostMessage
            //check to see if browser supports transferable buffers in messages
            var SUPPORTS_TRANSFERS = false;
            try {
                var testAB = new ArrayBuffer(1);
                worker.postMessage({buffer: testAB}, [testAB]);
                if (!testAB.byteLength) { //if there is no byteLength then it was transferred
                    SUPPORTS_TRANSFERS = true;
                }
            } catch(e) {
            }
            if (SUPPORTS_TRANSFERS) {
                worker.postMessage = postMessageFunc;
            } else {
                worker.postMessage = function(obj) { //ignore the array on the end
                    postMessageFunc(obj);
                };
            }
        },

        //have the ability to call this only when really necessary. Be lazy ;)
        setBuffer: function(callback, hasBuffer){
            if (_.isUndefined(this.worker)){
                //we don't have a worker yet, lets make one
                this.createWorker(_.bind(this.setBuffer, this, callback, hasBuffer))
                return
            }

            if ( !hasBuffer ){
                this.getBufferFromState(_.bind(this.setBuffer, this, callback, true))
                return
            }

            this.placedBuffer = true;
            var command = "setBuffer"
            , buffer = this.get("buffer")
            this.worker.postMessage({
                command: command,
                arrayBuffer: buffer
            }, [buffer]);

            this.unset('buffer')
            this.bindSuccess(command, callback);
        },

        //save the buffer info so we know how get the correct chunk when we really need it.
        saveBufferInfo: function(fileModel, start, end, padding){
            this.set('bufferInfo',[fileModel, start, end, padding])
        },

        bindSuccess: function(command, callback) {
            //Only want this to happen once
            this.on(command + ':success', _.once(function(event) {
                callback(event.data.result);
            }));
        },

        continousBindSuccess: function(command, callback) {
            //Only want this to happen once
            this.on(command + ':success', function(event) {
                callback(event.data.result);
            });
        },

        bindError: function(command, callback) {
            this.on(command + ':error', _.once(callback));
        },

        encryptChunk: function(callback) {
            //Check to see if the worker has a copy of the buffer, if not, give it one
            if (!this.placedBuffer){
                this.setBuffer(_.bind(this.encryptChunk, this, callback), false) //this is set to false to let the function figure out where the buffer is
                return 
            }


            var command = "encryptChunk";
            this.worker.postMessage({
                command: command
            });

            this.bindSuccess(command, callback);
            
        },

        decryptChunk: function(callback) {
            var command = "decryptChunk";
            this.worker.postMessage({
                command: command
            });
            //it will get an event.data as the parameter
            
            this.bindSuccess(command, callback);
        },

        /*
        encodeIVKey: function(callback) {
            var command = "encodeIVKey";
            this.worker.postMessage({
                command: command
            });

            this.bindSuccess(command, callback);
        },
        */

        upload: function(callback) {
            //Check to see if the worker has a copy of the buffer, if not, give it one
            if (!this.placedBuffer){
                this.setBuffer( _.bind(this.upload, this, callback), false)
                return 
            }

            var command = "upload";

            this.worker.postMessage({
                command: command
            });

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command, _.bind(function(chunkInfo){
              //save the tag
              this.set('tag',chunkInfo.tag)

              callback(chunkInfo.linkName)
            },this));

            //If we wanted to account for an error we could do
            this.bindError(command, function(result) {
                console.error('There was an error with the worker: ', result);
            });

        },

        download: function(args, callback){
            if (_.isUndefined(this.worker)){
                //we don't have a worker yet, lets make one
                this.createWorker(_.bind(this.download, this, args, callback))
                return
            }

            var command = "download"

            this.worker.postMessage({
                command: command,
                linkName: args.linkName,
                linkKeyObj: args.linkKeyObj,
                IVKey: args.IVKey,
                tag : args.tag
            });

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command, _.bind(function(decryptedBuffer) {
                this.set('buffer', decryptedBuffer);
                callback(decryptedBuffer);
            },this));

            //If we wanted to account for an error we could do
            this.bindError(command, function(result) {
                console.error('There was an error with the worker: ', result);
            });
        },

        writeToFile: function(fileSystem, manifestObj, callback) {
            var command = 'writeToFile';

            this.worker.postMessage({
                command: command,
                manifest: manifestObj,
                fileSystem: fileSystem,
                chunkInfo: this.get('chunkInfo')
            });

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command, callback);

            //If we wanted to account for an error we could do
            this.bindError(command, function(result) {
                console.error('There was an error with the worker', result);
            });
        },

        readData: function() {
            var stringBufferView = new Uint8Array(this.get('buffer'));
            return String.fromCharCode.apply(this,stringBufferView);
        },


        callbackHandler: function(event) {
            if (event.data.command) {
                this.trigger(event.data.command+':'+event.data.status, event);
                console.log('triggered',(event.data.command + ':' + event.data.status));
                console.log('From worker', event.data);
            } else {
                console.log('From worker', event.data);
            }
        },

        terminate: function() {
            if (this.worker) {
                this.worker.terminate();
            }
        },

        //setup a callback to be called when the progress changes
        attachProgressListener: function(callback){
            this.set('progressListener',callback)
        },

        //this will use the saved callback for the progress listener to attach it to the worker chunk 
        reallyAttachProgressListener: function(){
            var command = "attachProgressListener"

            this.worker.postMessage({
                command: command
            });

            //We listen in for the event that will be triggered when the worker is done
            this.continousBindSuccess(command,this.get("progressListener"))

            //If we wanted to account for an error we could do
            this.bindError(command, function(result) {
                console.error('There was an error with the worker in the progress listener', result);
            });
        }
        
    });
});

//returns the file model
define('models/File',['models/Chunk','models/Manifest','models/ChunkWorkerInterface', 'models/FileSystem', 'tools/FileSystemHandler', 'config'],function(Chunk, Manifest, ChunkWorkerInterface, FileSystem, FileSystemHandler, config){ 
    return Backbone.Model.extend({

        defaults:{
            /**
             * Stuff that will be instatiated on creation
             *
             * file: File obj
             * reader: FileReader obj
             *
            */

           webworkers: config.webworkers ? true : false
           , maxWorkers: 3
        },

        chrome : navigator.userAgent.indexOf("Chrome") > 0,
        firefox : navigator.userAgent.indexOf("Firefox") > 0,
        webkit : navigator.userAgent.indexOf("AppleWebKit") > 0,

        fileSystem: new FileSystem(),

        initialize: function(){
            //Unfortunately somethings have vendor prefixes so we'll get that sorted right here and now
            File.prototype.slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice

            var user = this.get('user')
            if (_.isUndefined(user)){
              
            }else{
              var userBlob = user.get('userBlob').getBlob()
              this.set('userBlob',userBlob)
            }


            var manifestOptions = {userBlob:userBlob}
            if (this.has('file')){
                manifestOptions = _.defaults(manifestOptions,_.pick( this.get('file'), 'name', 'type', 'size' )) 
            }
            this.manifest = new Manifest( manifestOptions )
        },

        //splits the file into several chunks of size specified by the argument ( in bytes )
        //returns an array of objects in the form of 
        // chunk = [
        //   { start: 0, end: 1024 }
        //   { start: 1025, end: 2048 }
        //   ...
        //]
        split: function(callback) {
            var file = this.get('file')
            , chunkSize = Chunk.prototype.defaults.chunkSize
            , chunkCount = Math.ceil(file.size/chunkSize)
            //see if we need padding
            //32 is becasue the encryption works on a 32 bit array
            //we add one more chunk for padding sake
            //if ( (file.size%chunkSize)%32 != 0 )  chunkCount++;
            

            if (this.has('chunks')) return callback(this.get('chunks'));

            var counter = 0
            , chunks = []
            , padding


            var splitNext = function(){
                if ( counter < file.size ){
                    padding = false
                    
                    var start = counter;
                    counter += chunkSize;
                    var end = counter < file.size ? counter : file.size;

                    //It has to fit within 32*4 because 32 bits is the int size used in data encryption and 4 because AES operates on a blocksize of 16bytes 
                    //(32*4) == 16Bytes
                    if ( (end - start)%(16) != 0){
                        leftover = (end - start)%(16)
                        paddedSize  = (16 - leftover) + (end-start)
                        


                        console.log('padding is necessary')

                        padding = true;
                        //end -= leftover;

                    }


                    var usernameAndRSA = {}
                    if ( this.has("userBlob") ) {
                      usernameAndRSA = _.pick(this.get('userBlob'), ["username", "RSAObject"]) 
                    }

                    if( this.get('webworkers') ){
                        var chunk = new ChunkWorkerInterface(usernameAndRSA)
                    }else{
                        //create the new chunk without a buffer, we'll just give it the necessary info for the buffer, it will only copy the buffer when necessary
                        var chunk = new Chunk(usernameAndRSA)
                    }
                    chunk.saveBufferInfo(this, start, end, padding)
                    chunks.push(chunk)

                    //start splitting the next chunk
                    splitNext.apply(this);

                }else{
                    this.set('chunks', chunks);
                    this.manifest.setChunks(chunks, function(){
                        if (callback) callback(chunks)
                    })
                }
                return;

            }

            splitNext.apply(this);
            return;

        },

        attachProgressListenerToChunks: function(){
            var chunks = this.get('chunks');
            var numberOfUpdateEventsPerChunk = 2 //represents the events that will be updated for each chunk, this is weighted evenly
            //There is the upload event and the encrypting event. That's 2
            var numberOfChunks = chunks.length  //the chunks that are going to be part of the whole progress
            var chunkProgress = {}
            var that = this

            var progressListener = function(chunkNo){
                //We are going to keep track of each individual chunks progress 
                var currentChunkProgress = chunkProgress[chunkNo] = {Uploading:0}
                

                //in order to scale the individual progress events for the whole shebang 
                return function(progressObj){

                    //update the progress of the affected chunk
                    currentChunkProgress[progressObj.event]=progressObj.progress
                    console.log(progressObj.event,progressObj.progress)

                    //create an array of total progresses for each chunk
                    var totalChunkProgress = _.map(chunkProgress, function(singleChunkProgressObj){
                        return _.reduce(singleChunkProgressObj, function(memo, eventProgress){ return memo + eventProgress })
                    })

                    //sum the total progresses from each chunk to a total progress
                    totalChunkProgress = _.reduce(totalChunkProgress, function(memo, singleChunkProgress){ return singleChunkProgress + memo})

                    //scale the progress appropriately for the chunks
                    totalChunkProgress = totalChunkProgress/(numberOfChunks*numberOfUpdateEventsPerChunk)
                    console.log('total progress:',totalChunkProgress)
                    that.trigger("file:progress",totalChunkProgress)
                }
            }

            //attach the progress listener to each chunk
            _.each(chunks, function(chunk, chunkNo){
                chunk.attachProgressListener(progressListener(chunkNo));
            })
        },

        //Returns the linkName for the manifest and the key
        upload: function(callback){
            //check to see if we have made chunks for this file or not
            if (!this.has('chunks')){
                return this.split(_.bind(this.upload,this,callback));
            }
            var chunks = this.get('chunks');
            var file = this.get('file');
            var chunkSize = Chunk.prototype.defaults.chunkSize
            var chunkCount = Math.ceil(file.size/chunkSize)

            this.attachProgressListenerToChunks();


            uploadManifest = _.after(chunks.length, _.bind(this.manifest.uploadManifest, this.manifest, callback) )

            // The chunks array will act as a queue, and we will spawn
            // maxWorkers number of workers to read from the queue
           
            _.each(_.range(this.get('maxWorkers')), _.bind(function(){this.recursivelyUploadChunks(chunks)},this))
        },

        recursivelyUploadChunks: function(chunks){
          //stopping condition
          if (!chunks.length) return;

          var chunk = chunks.pop()
          chunk.upload(_.bind(function(index,linkName){
            if(this.get('webworkers')){
                chunk.terminate(); //destroy the current chunk web worker, to save resources
            }

            //save the response from the server
            this.manifest.setChunkLinkName(index, linkName, chunk, function(){
              //async way of knowing when all the chunks have been uploaded, we go on to upload the chunks
              uploadManifest()

            })

            //now we recursively upload the chunks, given there are still chunks to process
            if (chunks.length) this.recursivelyUploadChunks(chunks)
          }, this, chunks.length))
        },

        download: function(linkName, passcode, callback){

            this.manifest.downloadManifest(linkName, passcode, _.bind(function(manifest){
                console.log('we got the manifest!');
                //send an event for the file name
                this.trigger("file:name",manifest.get("name"))

                this.manifest = manifest
                this.createChunksFromManifest()
                this.attachProgressListenerToChunks();
                this.downloadChunks(callback)
            },this))
        },

        loadManifest: function(linkName, passcode, callback){
            this.manifest.downloadManifest(linkName, passcode, callback)
        },

        createChunksFromManifest: function(){
            var chunks = _.clone(this.manifest.get('chunks'))
            , usernameAndRSA = {}
            , that = this

            if (this.has('userBlob')){
              _.pick(this.get('userBlob'), ["username", "RSAObject"]) 
            }
            //convert the chunks obj into an array 
            chunks = _.values(chunks)
            //Sort the array 
            chunks = _.sortBy(chunks, function(chunk){ return chunk.part } )

            //create the chunk workers
            if (this.get('webworkers')){
                chunks = _.map(chunks, function(chunk){ return (new ChunkWorkerInterface(_.defaults({chunkInfo:chunk}, usernameAndRSA))) } )
            }else{
                chunks = _.map(chunks, function(chunk){ return (new Chunk(_.defaults({chunkInfo:chunk}, usernameAndRSA) ) ) } )
            }

            this.set('chunks',chunks)

            //now the chunk workers are ready for some downloading action

        },

        //Speciy which chunk you want. if unspecified will default to all
        downloadChunks: function(callback){
            var chunks = this.get('chunks')
            , size = this.manifest.get('size')

            var successCallback = _.bind(function(){

                //callback after all the chunks have been written
                var asyncCallback = _.after(chunks.length, callback)

                //reverse the chunks to use it as a stack
                var chunksStack = chunks.reverse()
                var writePositionObj = { writePosition:0, downloadedChunks:{}, numberOfChunks:chunks.length }

                //spawn the number of maxWorkers
                _.map(_.range(this.get('maxWorkers')), _.bind(this.recursivelyDownloadChunks, this, chunksStack, writePositionObj))

                //spawn a single writing worker, single because it needs to be sequential
                this.recursivelyWriteChunks(writePositionObj, callback)
            },this)

            if ( this.chrome ) {
              //get more space for the new file
              this.fileSystem.requestMoreSpace(size, _.bind(function(fs){
                  //create the file and delete it if it already exists
                  FileSystemHandler.createFile({
                      successCallback: successCallback
                      , name: this.manifest.get('name')
                      , fileSystem: this.fileSystem
                  })
              }, this))
            }else if (this.firefox){ 
              //for firefox we need to use indexed db
              //There is an optimization here that involves caching whether we already requested permissions to save >50MB of data
              //But that's for a later date
              console.log("asking for indexedDB")
              var dbName = "cryptic"

              //we have to request permissions to save big files, but after that we need to make the DB where the file is going to live for realz
              var afterPermissions = _.bind(function(){
                var request = window.indexedDB.open(dbName,1)
                this.dbName = dbName

                request.onerror = function(event){
                  console.error("There was an error in the indexedDB request",request.errorCode)
                }

                request.onupgradeneeded = function(event){
                  console.log("indexedDB is requesting upgrade")
                  request.result.createObjectStore(dbName)
                }

                //safe a reference to the db, and call the successCallback
                request.onsuccess = _.bind(function(event){
                  this.db = request.result

                  //First delete any old data by clearing the object store, then call the successCallback
                  this.db.transaction(dbName, "readwrite").objectStore(dbName).clear().onsuccess = successCallback
                },this)
              },this)

              var request = window.indexedDB.open(dbName,1)
              request.onerror = function(event){
                console.error("There was an error in the indexedDB request",request.errorCode)
              }

              request.onupgradeneeded = function(event){
                console.log("indexedDB is requesting upgrade")
                request.result.createObjectStore(dbName)
              }

              request.onsuccess = function(event){
                console.log("Success for the request!", request.result)
                var db = request.result

                var transaction = db.transaction(dbName, "readwrite")

                transaction.onerror = function(e){
                  console.error("There was an error with the transaction",e)
                }

                transaction.oncomplete = function(e){
                  console.log("Transaction completed succesfully!")
                  //delete the indexedDB temp thing we made to ask permissions for >50MB
                  db.close() 
                  indexedDB.deleteDatabase(db)
                  afterPermissions()
                }

                //lets ask for the permissions of getting over 50MB at once so we don't have to ask again later
                transaction.objectStore(dbName).put(new Blob([new ArrayBuffer(51*1024*1024)]), 'temp')
              }

            }


        },

        recursivelyDownloadChunks : function(chunks, writePositionObj){

            //nothing left to process
            if (chunks.length == 0){
                return;
            }

            //peek at the chunk before we decide we want it
            var chunk = chunks[chunks.length-1]
            , chunkIndex = chunk.get('chunkInfo').part

            // Prevent from downloading too far ahead.
            // If this worker is too ahead we don't want the chunk just yet
            if ( chunkIndex > this.get('maxWorkers') + writePositionObj.writePosition ){
                setTimeout(_.bind(arguments.callee,this,chunks, writePositionObj), 500) //wait half a second to try again
                return
            }

            var chunkNo = chunks.length
            console.log('chunk:',chunkIndex,'downloading')


            //we want the chunk, so lets pop it off the stack
            chunk = chunks.pop()

            //get the key and then download the file
            this.manifest.fetchChunkKey(chunk.get('chunkInfo').part, _.bind(function(linkKeyObj){

                if ( this.get('webworkers') ){
                    console.log('USING WEBWORKERS')
                    //If there are web workers do this
                    chunk.download({
                        linkName: chunk.get('chunkInfo')['linkName']
                        , linkKeyObj: linkKeyObj
                        , IVKey: chunk.get('chunkInfo')['IVKey']
                        , tag : chunk.get('chunkInfo')['tag']
                    }, _.bind(function(decryptedBuffer){
                        console.log('chunk:',chunkIndex,'downloaded')
                        //Here we put it on the map to be written by the main thread
                        writePositionObj.downloadedChunks[chunkIndex]=chunk

                        // Using a dirty hack to place the recursive call at the top of Javascript's call stack  
                        // We want to place it at the top because it gives the writer a chance to catch up
                        _.defer(_.bind(this.recursivelyDownloadChunks, this, chunks, writePositionObj))

                    },this))
                }else{
                    //not using webworkers
                    //We need to break it up into multiple steps (something the webworker does to save messages)
                    var args = {
                        linkName: chunk.get('chunkInfo')['linkName']
                        , linkKeyObj: linkKeyObj
                        , IVKey: chunk.get('chunkInfo')['IVKey']
                        , tag : chunk.get('chunkInfo')['tag']
                    }
                    chunk.set({'linkName':args.linkName, 'linkKeyObj':args.linkKeyObj, 'tag':args.tag})
                    chunk.decodeIVKey(args.IVKey)
                    chunk.download(_.bind(function(decryptedBuffer){
                        //Here we put it on the map to be written by the main thread
                        writePositionObj.downloadedChunks[chunkIndex]=chunk

                        // Using a dirty hack to place the recursive call at the top of Javascript's call stack  
                        // We want to place it at the top because it gives the writer a chance to catch up
                        _.defer(_.bind(this.recursivelyDownloadChunks, this, chunks, writePositionObj))
                    },this) )
                }

            },this))
        },

        recursivelyWriteChunks : function(writePositionObj, writeCompleteCallback){
            // So we are going to read from the writePositionObj and treat it as a pointer
            // it's a sort of queue that of processed chunks from the download worker
            // We have to write the chunks sequentially, but we don't have to download the chunks one by one
            // So we have maxWorkers downloading and staying with writePosition+maxWorkers chunks
            var writePosition = writePositionObj.writePosition
            , downloadedChunks = writePositionObj.downloadedChunks

            //lets check to see if we have already written everything.
            if ( writePosition >= writePositionObj.numberOfChunks ){
                writeCompleteCallback()
                return
            }


            // if the current write position chunk is undefined, that means we haven't downloaded it yet
            // Let's wait a bit for the download workers to do their work
            if ( !downloadedChunks[writePosition] ){
                setTimeout(_.bind(arguments.callee, this, writePositionObj, writeCompleteCallback), 500)
                return
            }

            //So we have a chunk that is ready to be written
            var chunk = downloadedChunks[writePosition]
            console.log('chunk:',writePosition,'writing')
            console.log('chunk:',chunk.get('chunkInfo').part,'writing')

            var successCallback = _.bind(function(){
                console.log('chunk:',writePosition,'written')
                console.log('chunk:',chunk.get('chunkInfo').part,'writing')
                writePositionObj.writePosition++; //Increment the writePositionObj

                if (this.get('webworkers')){
                    chunk.terminate()
                }

                // Make the recursive call
                // Using a dirty hack to place the recursive call at the top of Javascript's call stack  
                _.defer(_.bind(this.recursivelyWriteChunks, this, writePositionObj, writeCompleteCallback))
            },this)

            if ( this.chrome ) {
              this.appendToFile(chunk, successCallback)
            } else if ( this.firefox ) {
              this.addToIndexedDB(chunk, writePosition, successCallback)
            }
        },

        addToIndexedDB : function(chunk, writePosition, successCallback){
          var transaction = this.db.transaction(this.dbName,'readwrite')
          , that = this
          ,  chunkCount = _.keys(this.manifest.get('chunks')).length - 1 //zero indexed
          , chunkSize = Chunk.prototype.defaults.chunkSize
          , buffer = chunk.get('buffer')

          //if this is the last chunk only write the amount needed to the file
          if ( chunk.get('chunkInfo').part == chunkCount){
              var lastChunkSize =  this.manifest.get('size') - (chunkCount*chunkSize)

              buffer = buffer.slice(0, lastChunkSize)
          }

          transaction.oncomplete = function(){
            console.log("placed chunk at:",writePosition)
            successCallback()
          }

          transaction.onerror = function(){
            console.error("There was an error in trying to save a chunk:", writePosition, "Retrying now")
            that.addToIndexedDB(chunk, writePosition, successCallback)
            return
          }

          transaction.objectStore(this.dbName).put(new Blob([buffer]), "chunk:"+writePosition)
        },

        appendToFile: function(chunk, callback){
          var chunkCount = _.keys(this.manifest.get('chunks')).length - 1 //zero indexed
          , chunkSize = Chunk.prototype.defaults.chunkSize
          , buffer = chunk.get('buffer')

          //if this is the last chunk only write the amount needed to the file
          if ( chunk.get('chunkInfo').part == chunkCount){
              var lastChunkSize =  this.manifest.get('size') - (chunkCount*chunkSize)

              buffer = buffer.slice(0, lastChunkSize)
          }


          //specify where in the file this chunk starts
          var start = chunk.get('chunkInfo').part*chunkSize


          var errCallback = function(e){console.error('Error in saving file:',e)}

          FileSystemHandler.appendToFile(
              { 
                successCallback: _.bind(function(){
                    callback()
                },this)
                , errorCallback: errCallback
                , name: this.manifest.get('name')
                , fileSystem: this.fileSystem
                , data: buffer
                , type: this.manifest.get('type')
                , size: this.manifest.get('size')
                , start: start
              }
          )
        },



        //mainly for testing, ouputs text
        readFile: function(callback){
            this.getFileEntry(function(fileEntry){
                fileEntry.file(function(file){
                    var reader = new FileReader();
                    reader.onloadend = function(e){
                        callback(this.result)
                    }
                    reader.readAsText(file)
                })
            })
        },

        getFileEntry: function(callback){
            var name = this.manifest.get('name')
            if (this.chrome){
              this.fileSystem.getFileSystem(function(fs){
                  fs.root.getFile(name, {}, callback)
              })
            } else if (this.firefox){
              var transaction = this.db.transaction(this.dbName).objectStore(this.dbName).mozGetAll()
              t = transaction


              transaction.onsuccess = function(event){
                var chunks = event.target.result
                , file = new Blob(chunks)
                , url = URL.createObjectURL(file)
                //emulate a FileEntry Obj
                var fileEntry = {
                  fullPath : "/",
                  name: name,
                  toURL : function(){ return url }
                }
                callback(fileEntry)
              }

              transaction.onerror = function(event){
                console.error("There was an error in getting the chunks",e)

              }
            }
        },

        getArrayBufferChunk:function(start, end, callback){

            var reader = new FileReader();
            var file = this.get('file');

            reader.onloadend = _.bind(function(event){
                //check if we are done reading the file
                if (event.target.readyState == FileReader.DONE){
                    callback(event.target.result) //call the callback with the binary data
                }

            }, this)

            //get the right chunk
            var blob = file.slice(start, end);

            //lets start reading
            reader.readAsArrayBuffer(blob)
        },

        destroy:function(){
            this.trigger('destroy')
            if (this.get('webworkers')){
                _.each(this.get('chunks'), function(chunk){ chunk.terminate() })
            }
        },
    })
});







var jade = (function(exports){
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(obj);
      }
    }
    return arr;
  } 
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj){
  var buf = []
    , terse = obj.terse;
  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;
  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];
      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else {
        buf.push(key + '="' + exports.escape(val) + '"');
      }
    }
  }
  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * `str` of jade, `filename`, and `lineno`.
 *
 * @param {Error} err
 * @param {String} str
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, str, filename, lineno){
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context); 

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno 
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

  return exports;

})({});





define('jade',{
        version: '0.0.1',
    load: function (name, parentRequire, load, config) {
                    
    }
});
define('jade!templates/ProgressBars', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ "class": ('progressBars') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('barTitle') }, {}));
buf.push('><p>');
var __val__ = title 
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div><div');
buf.push(attrs({ "class": ('bars') }, {}));
buf.push('></div></div>');
}
return buf.join("");
}});

define('jade!templates/ProgressBar', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<p');
buf.push(attrs({ "class": ('barText') }, {}));
buf.push('> </p><a');
buf.push(attrs({ 'href':("#download/jadsf/adfasd"), 'target':("_blank"), "class": ('barText') + ' ' + ('barLink') }, {"href":true,"target":true}));
buf.push('>someLink</a><p');
buf.push(attrs({ "class": ('delete') }, {}));
buf.push('>✕</p><div');
buf.push(attrs({ 'style':("width:0%;"), "class": ('innerBar') + ' ' + ('loading') }, {"style":true}));
buf.push('></div>');
}
return buf.join("");
}});

//returns the file view
define('views/Progress',["jade!templates/ProgressBar"], function(ProgressTemplate){ 
    return Backbone.View.extend({
        className: "outerBar clouds",

        render: function(){
          //render a blank slate, change the text, percentages, and link through the functions below
          this.$el.html(ProgressTemplate({}))
        },

        percentage: function(percentage){
          return this.$el.find(".innerBar").css("width",percentage)
        },
        text : function(text){
          return this.$el.find("p.barText").text(text)
        },
        link: function(link, text, downloadable){
          downloadable = _.isUndefined(downloadable) ? false : true

          this.$el.find(".barLink")
                  .attr("href",link)
                  .text(text)
                  .show()

          if (downloadable){
            this.$el.find(".barLink")
                    .attr("download",text)
          }
        },

        clickLink : function(){
          this.$el.find(".barLink")[0].click()
        },

        markLoading: function(){
          this.$el.find(".innerBar")
            .removeClass("success")
            .addClass("loading")
          this.$el.find(".delete").show()
        },

        markSuccess: function(){
          this.$el.find(".innerBar")
            .removeClass("loading")
            .addClass("success")
          this.text("")
          this.$el.find(".delete").hide()
        },

    })
});

//This is really just a container for floating progress bars, with a nice function that wil insert progress bars into itself
define('views/ProgressBars',["jade!templates/ProgressBars", "views/Progress"], function(ProgressTemplates, ProgressBarView){ 
  return Backbone.View.extend({

    id : "progressBarsContainer",
    className : "floatingContainer",
  
    render:function(){
      this.$el.html(ProgressTemplates({title: this.options.title}))
    },

    setTitle: function(title){
      this.$el.find(".barTitle p").text(title)
    },

    //pass in an array of bar elements and they will be placed appropriately
    insertProgressBars: function(bars){
      var barContainer = this.$el.find(".bars")
      
      _.each(bars, function(bar){
        barContainer.append(bar)
      })
    }

  })
})
;
define('jade!templates/FileUpload', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('vault') }, {}));
buf.push('><div');
buf.push(attrs({ 'id':('upload'), "class": ('inner-border') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('vaultText') }, {}));
buf.push('>Drop a file in</p><div');
buf.push(attrs({ "class": ('separator') }, {}));
buf.push('><p>or</p></div><div');
buf.push(attrs({ 'id':('filePickerBtn'), "class": ('btn') + ' ' + ('btn-inverse') + ' ' + ('btn-block') }, {}));
buf.push('><p>Pick a file</p></div><input');
buf.push(attrs({ 'id':('filePicker'), 'type':("file"), 'style':("display:none"), 'onchange':("test(this.files)") }, {"type":true,"style":true,"onchange":true}));
buf.push('/></div></div>');
}
return buf.join("");
}});

//tools to convert obtuse bytelength to readable formate such as 123455 -> 123 KB
define('tools/humanReadableByteLength',{

    calcHumanReadableSize: function(bytes){
        var sizeMap = {
            3 : "KB"
            , 6 : "MB"
            , 9 : "GB"
            , 12: "TB"
            , 15: "PB"
        }

        var placeCount = bytes.toString().length
        , humanReadableSizes = _.filter(sizeMap, function(name, key){ return placeCount > key })

        if (humanReadableSizes.length > 0) return _.last(humanReadableSizes)
        else return "Bytes"
    },

    //only return the top 3 numbers of the bytes so 123456 would just be 123
    truncateBytes: function(bytes){
        var byteLength = bytes.toString().length

        if (byteLength <= 3){
            return bytes.toString().substr(0,3)
        }else{
            return this.truncateBytes( parseInt(bytes.toString().substr(0,byteLength-3)))
        }
    },

    prettyFormat: function(bytes){
        var sizeUnit = this.calcHumanReadableSize(bytes)
        , truncatedBytes = this.truncateBytes(bytes)

        return truncatedBytes + " " + sizeUnit

    }
})
;
//returns the file view
define(
    'views/File',["core/q", "models/File","views/ProgressBars", "jade!templates/FileUpload", "tools/humanReadableByteLength"]
    , function(Q, FileModel, ProgressBarsView, fileUploadTemplate, hrByteLength){ 
    return Backbone.View.extend({

        id : "uploadBoxContainer",
        className : "floatingContainer",

        initialize: function(){

            this.fileList = []

            //because the progress bars are rendered inside here, lets keep a promise when the user begins to upload a file
            //this is so that we can easily know when a user begins uploading
            
            this.uploadDeffered = Q.defer()

            // do the same thing as above but for download
            this.downloadDeffered = Q.defer()

            this.template = fileUploadTemplate

        },

        template: fileUploadTemplate,

        render: function(){
            this.$el.html(this.template());

            //lets make the handleFilePicker a global reference so that the filepicker can call it on its onchange attribute
            _fileView_handleFilePicker = _.bind(this.handleFilePicker, this)
            this.$el.find('#filePicker').attr("onchange", "_fileView_handleFilePicker(this.files)")

            return this.$el;
        },

        //might want to change this to get rid of jquery completely
        events: {
            "change #file-input" : "loadFile",
            "click #uploadFiles" : "uploadFiles",
            "click #uploadAnother" : "render",
            "click #removeFiles" : "removeFiles",
            "click #cancelUpload" : "removeFiles",

            "change #topCheckbox":"changeAllCheckboxes",
            "change .open input" : "addFilesThroughInput",

            "drop #upload": "handleFileDrop",
            "dragenter #upload": "handleDragEnter",
            "dragleave #upload": "handleDragLeave",
            "dragover #upload": "handleDragOver",
            "click #filePickerBtn" : "openFilePicker",

        },

        handleFilePicker: function(files){
          this.uploadFiles(files)
        },

        openFilePicker:function(){
          console.log("opening file picker")
          this.$el.find("#filePicker")[0].click()
        },

        cancelUpload: function(){
            if (this.fileModels){
                _.each(this.fileModel, function(fileModel){ fileModel.destroy() })
            }
        },

        changeAllCheckboxes: function(){
            var rows = this.$el.find('.file-table > .files > .row')
            , checkState = this.$el.find('#topCheckbox').prop('checked')

            _.each(rows, function(row){$(row).find('input').prop('checked',checkState)})
        },

        removeFiles: function(){
            var rows = this.$el.find('.file-table > .files > .row')

            this.fileList = _.reject(this.fileList, function(file, index){
                //check the rows see which are marked for deletion
                return rows.eq(index).find('input').prop('checked')
            })

            this.showFilesToBeUploaded(this.fileList)
        },

        addFilesThroughInput: function(evt){
            var files = evt.target.files
            this.processFiles(files);
        },

        processFiles: function(files){

            //concat the files, we need to use map in order to convert fileList into array
            this.fileList = this.fileList.concat(_.map(files, function(f){return f}))

            this.showFilesToBeUploaded(this.fileList)
        },

        handleFileDrop: function(evt){
            console.log("drag dropped")
            evt.stopPropagation();
            evt.preventDefault();
            $(evt.target).parent().removeClass("dragEnter");


            var files = (evt.dataTransfer || evt.originalEvent.dataTransfer).files
            this.uploadFiles(files)

        },

        showFilesToBeUploaded: function(files){

            //render the file rows
            files = _.map(files, function(file){ 
                file.humanReadableSize=hrByteLength.prettyFormat(file.size)
                if (file.name.length > 20){
                    file.shortName = file.name.substr(0,20)+'...'
                } else { 
                    file.shortName = file.name 
                }

                return file 
            })
            
            this.$el.find('.file-table > .files').html(uploadingFileRowsTemplate({files:files}))


            
            if (!this.animated){
                this.$el.find(".upload").animate({ "height" : 150 }, 300);
                this.$el.find(".upload-message").animate( { "top" : 90 }, 300);
                this.$el.find(".upload-status").animate( { "height" : 150 }, 300);
                this.$el.find(".upload-panel").animate( { "left" : 20 }, 300);
                this.$el.find(".upload-add-files").animate( { "left" : $(".page").width() - $(".open").width() - 20 }, 300);
                this.$el.find(".file-table").slideDown(300);
            }

            this.animated=true
        },

        handleDragOver: function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            //evt.dataTransfer.dropEffect = 'copy'; //show it is a copy 
        },

        handleDragEnter: function(e){
            console.log("dragenter");
            // It references the p elem instead of the inner border elem we want
            $(e.target).parent().addClass("dragEnter");
        },

        handleDragLeave: function(e){
            console.log("dragleave");
            // It references the p elem instead of the inner border elem we want
            $(e.target).parent().removeClass("dragEnter");
        },


        //read the file from the input
        loadFile: function(event){
            var fileObj = this.fileInput.files[0];
            this.model = new FileModel({file: fileObj, user:this.options.user});
            model = this.model;
        },

        uploadFiles: function(files){
            files = _.map(files, _.bind(function(file){ return (new FileModel({file:file, user:this.options.user}))},this))

            //broadcast that we are starting to upload
            this.trigger("file:start:upload")

            //remember the filemodels so we can destroy them if we want to cancel the upload
            this.fileModels = files
            this.trigger("file:list", files)

            this.uploadFilesRecursively(files, 0)
        },

        uploadFilesRecursively: function(files, fileIndex){
            if (files.length == 0){
                this.trigger("file:uploaded:all")
                return 
                //Finished uploading 
            }

            this.uploadFile(files[0], fileIndex, _.bind(this.uploadFilesRecursively, this, _.rest(files), fileIndex+1))
        },

        uploadFile: function(fileModel, fileIndex, callback){

            var origin = window.location.protocol + "//" + window.location.host

            //listen to the progress of the file, and pass it up with the fileIndex attached
            this.listenTo(fileModel,'file:progress',function(progress){ this.trigger("file:progress",fileIndex, progress) })

            fileModel.upload(_.bind(function(linkData){
                console.log('an alert would have happened here','#download/'+linkData.linkName+'/'+linkData.IVKey)
                fileModel.destroy()
                var downloadLink = origin+'/#download/'+linkData.linkName+'/'+linkData.IVKey

                console.log('download link',downloadLink)
                //trigger the file uploaded event
                this.trigger("file:uploaded",fileIndex, 
                             {link:linkData.linkName+'/'+linkData.IVKey
                             , filename:fileModel.get('file').name
                             , size: fileModel.get('file').size
                             , type: fileModel.get('file').type})

                callback()
            },this))
        },

        downloadFile: function(linkName, passcode, callback){

            /*var progressBarsView = new ProgressBarsView({el:barsContainer, bars:{title:"Downloading...", items:[{text:"", percent:"0%"}]}}) //create a new view for all the bars
            progressBarsView.render()
            progressView = progressBarsView.getIndividualProgressViews()[0] //only care about the first one since we are only downloading one thing

            this.downloadProgressView = progressView

            this.downloadDeffered.resolve(progressView)
            */

            this.model = new FileModel({user:this.options.user})

            this.trigger("file:start:download")

            this.listenTo(this.model,'file:progress',function(progress){ this.trigger("file:progress",0, progress) })
            this.listenTo(this.model,'file:name',_.bind(function(name){this.trigger("file:name",name)},this))

            this.model.download(linkName, passcode, _.bind(function(){this.trigger("file:downloaded");callback()},this))
        },


        createDownloadLink: function(){
            this.model.getFileEntry(_.bind(function(fileEntry){
                this.trigger("file:url",{url:fileEntry.toURL(), name: fileEntry.name})
                //var filename = this.downloadProgressView.text()
                //this.downloadProgressView.link(fileEntry.toURL(), "Save "+filename)
                //clear the old text
                //this.downloadProgressView.text("")
            },this))

        },

    })
});

//defines what the Home route will do
define('routes/Home',["views/File", "views/ProgressBars", "views/Progress"], function(FileView, ProgressBars, ProgressBar){ 
  // Return a function that takes in three pieces of state: 
  // the viewport: So it can draw things on the screen
  // the topBar: So it can change the indicator of the top bar
  return function(viewport, topBar){
    return function(){
      console.log('starting home')
      var home = this.home
      //var barsContainer = home.$el.find("#barsContainer")[0]
      , viewport = this.viewport
      , barsContainer = new ProgressBars({title: "Uploading"})
      barsContainer.render()

      this.topBar.select('upload')

      var fileView = new FileView();
      fileView.render()

      // All the progress bars are going to be in this array soon enough
      progressBars = []

      //Create the list of files
      fileView.on("file:list",function(files){
        //update the title of the bars container
        barsContainer.setTitle("Uploading")

        //create a new progress bar for each file, and store it in an array
        progressBars = _.map(files, function(fileModel){
          var progressBar = new ProgressBar()
          progressBar.render()
          progressBar.text(fileModel.get("file").name)
          return progressBar
        })

        barsContainer.insertProgressBars(_.map(progressBars, function(view){return view.el}))
      })

      //update the progress of each file
      fileView.on("file:progress", function(fileIndex,percentage){
        console.log("progress:",percentage,"for file:",fileIndex)
        progressBars[fileIndex].percentage(percentage+"%")
      })

      fileView.on("file:uploaded", function(fileIndex, fileObj){
        var origin = window.location.protocol + "//" + window.location.host
        var downloadLink = origin+'/#download/'+fileObj.link
        var progressBar = progressBars[fileIndex]

        progressBar.link( downloadLink, fileObj.filename )
        progressBar.markSuccess()
      })

      fileView.on("file:uploaded:all", function(){
        barsContainer.setTitle("Done!")
      })

      viewport
        .exeunt()
        .introduce(fileView, 1)
        .introduce(barsContainer, 1)
        .moveToPage(1)
        .placeCenter(fileView.el, 1)
        .hide(barsContainer.el)
        .placeCenter(barsContainer.el,1)

      //this promise will be resolved when the user uploads a file
      fileView.on("file:start:upload",function(){
        viewport.show(barsContainer.el)
                .delay(0.5e3) //delay the animation by a bit so the user sees the upload bar is coming "from" the vault
                .placeLeftOfCenter(fileView.el, 1)
                .placeRightOfCenter(barsContainer.el, 1)
      })
    }
  }
})
;
define('jade!templates/user/User', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
}
return buf.join("");
}});

//Define the User's filesystem
//This won't harbor any state, ever.
define('models/user/FS',[],function(){ 
  var FS = {
    ls: function(fs, loc){
      //we return a list of files from a folder
      return _.values(FS.getFile(fs, loc).value)
    },

    //Returns a path with extra forward slashes removed
    cleanPath: function(path){
      return "/"+FS.splitPath(path).join("/")
    },

    //escapes any forwards slashes, or other bad characters
    cleanFilename: function(filename){
      return filename.replace(/\//g,"\\/")
    },

    splitPath : function(path){
      var splitBy = "/"
      , unlessPrecededBy = "\\"
      , pathArray = []
      , indexInString = 0

      while (path.length && indexInString < path.length) {
        var char = path.charAt(indexInString)
        var prevChar = ""
        if (indexInString > 0) prevChar = path.charAt(indexInString-1);

        if ( char === splitBy && prevChar !== unlessPrecededBy ) {
          pathArray.push(path.substr(0,indexInString))
          path = path.substr(indexInString+1)
          indexInString = 0
        }else{
          indexInString++
        }

      }

      return _.without(pathArray.concat([path]),"")

    },

    // Given a fs and location, return an array of all the files inside
    getFile: function(fs, loc){
        var locationArray = FS.splitPath(loc)
        , file = fs

        _.each(locationArray, function(location){
          //navigate inside folders 
          file = file.value[location]
        })

        return file
    },

    addFile: function(fs, loc, fileObj){

      var contents = fileObj
      , filename = fileObj.filename

      //clean the filename
      filename = FS.cleanFilename(filename)
      fileObj.filename = filename

      contents = _.defaults(contents, {
          created: +(new Date()), modified: +( new Date() ), type: "file", location: loc, size:"Unknown", value: contents.link})

      var folder = FS.getFile(fs, loc)
      , currentFolder = folder.value //the value of the folder is the object that contains all the other files

      if (_.isUndefined(currentFolder[filename]) ){
          currentFolder[filename]=contents
      }else{
        
        //increment through filenames if the file already exists
        (function(filename, copyNumber){
          if( _.isUndefined(currentFolder[filename+' ('+copyNumber+')']) ){
            contents.filename = filename + ' ('+copyNumber+')'
            currentFolder[filename + ' ('+copyNumber+')']=contents
          }else{
            //we need to increment the number
            arguments.callee(filename, ++copyNumber)
            return
          }
        })(filename, 1)
      }

      return fs
    },

    deleteFolder : function(fs, loc, filename){
        return FS.removeFile(fs, loc, filename, true)
    },
    
    removeFile: function(fs, loc, filename){
      fs = _.clone(fs)
      var folder = FS.getFile(fs, loc)
      , currentFolder = folder.value //the value of the folder is the object that contains all the other files
      , file = folder.value[filename]

      //remove the file from the folder
      currentFolder = _.omit(currentFolder, filename)

      folder.value = currentFolder

      return fs
    },

    getParentFsLocation: function(fsLocation){
          var parentFsLocation = this.splitPath(fsLocation)
          parentFsLocation.pop()//get rid of the current folder in the fsLocation
          parentFsLocation = '/' +parentFsLocation.join('/') // recreate the original path

          return parentFsLocation
    },
    
  }

  return FS
})
;
//Define the User Blob model
define('models/user/UserBlob',["apiEndPoints", "models/File", "models/RSA", "models/user/FS", "tools/Multipass"],function(api, File, RSAModel, userFS, Multipass){ 
  var multipass = new Multipass()
  return Backbone.Model.extend({
    initialize: function(){
      this.set('rsa', new RSAModel())
      this.set("timestamp", +(new Date()))
    }

    , generateRSA: function(){
      this.get("rsa").generateRSA()
    }

    , isIVKeySet: function(){
      return (this.chunk.has('iv') && this.chunk.has('key'))
    }

    , getBlob: function(){
        this.set("timestamp",+(new Date()))
      
        var userBlob = _.pick(this.toJSON(),["fs", "version", "id", "username", "timestamp"])

        if (_.isUndefined(userBlob.fs)) { 
          this.resetFS();
          userBlob.fs = this.get("fs")
        }

        //return a serialized json version of the RSA info
        userBlob["RSAObject"] = this.get("rsa").getRSAObject()
        
        return userBlob
    }

    , checkUserBlobCompat : function(userBlob){
      if (!userBlob.RSAObject) userBlob.RSAObject = _.pick(userBlob, ["pub_key" , "private_key" , "rsa_e" ])
      return userBlob
    }

    , setBlob: function(userBlob){
        this.set(userBlob)
        this.checkUserBlobCompat(userBlob)

        //save the RSA info
        this.get('rsa').setRSAObject(userBlob.RSAObject)
    }

    //Merge multiple userBlobs into one, prevents a user from accidently overwriting his data
    , consolidateBlobs: function(userBlobs){
      //for now I'm just going to get the userblob with the latest timestamp
      return _.max(userBlobs, function(userBlob){return userBlob.timestamp})
    }

    // Simple shortcut, we are just gonna use the excellent work in the sjcl library
    // Returns an JSON string with ciphertext and some info to decrypt (iv, salt)
    , encryptBlob: function(password, userBlob){
      if (password){
        userBlob = JSON.stringify(userBlob)
        //We use the sjcl encrypt defined in convience.js of the sjcl library. it does pbkdf2 hashing on the password and chooses a random salt, everything we would have done! so thanks sjcl! 
        return sjcl.encrypt(password, userBlob)
      }else{
          this.errorHandler({error:"password not set yet"})
          return
      }
    }

    , decryptBlob: function(password, encryptedUserBlob){
      if (password){
        var userBlob = sjcl.decrypt(password, encryptedUserBlob)
        return userBlob = JSON.parse(userBlob)
      }else{
          this.errorHandler({error:"password not set yet"})
          return
      }
    }

    , fetchBlob: function(username, callback){
      //TODO Connect this to a backend service like riak
      userblob = localStorage[username]
      if (_.isUndefined(userblob)){
        this.errorHandler({error:"User does not exist"})
        return
      }
    }

    , errorHandler: function(errorObj){
      console.error(errorObj)
      alert("Error: "+errorObj.error)
    }

    , addFile: userFS.addFile

    , deleteFolder : userFS.deleteFolder

    //calls the userFS removeFile as well as remove the file from the server, which requires user info, so that stays here.
    , removeFile: function(fs, loc, filename){
      var folder = this.getFile(fs, loc)
      , file = folder.value[filename]

      userFS.removeFile(fs, loc, filename)

      this.removeFileFromServer(file.value)

      return fs
    }

    , removeFileFromServer: function(link){
        var linkName = link.split('/')[0]
        , passcode = link.split('/')[1]
        , file = new File()

        file.loadManifest(linkName, passcode, _.bind(function(manifest){
            var links = manifest.getChunkLinks()

            //include the manifest file
            links = links.concat(linkName)

            var sig = this.signMessage(JSON.stringify(links))
            ,   data = { username: this.get('username') , filenames : links , signature : sig}

            multipass.checkMultipass(data)
                     .then(_.bind($.post, $, api.removeFile))
        }, this))


    }

    , getParentFsLocation: userFS.getParentFsLocation

    // Given a fs and location, return an array of all the files inside
    , getFile: userFS.getFile

    , ls: userFS.ls
    
    , signMessage: function(messageString){
      //redirect to the rsa model's implementation
      return this.get('rsa').signMessage(messageString)
    }

    , hashArrayBuffer: function(arrayBuffer){
      var arrayBufferView = new Uint8Array(arrayBuffer)
      //need to convert the array buffer View into an actual array so we can hash it
      var actualArray = _.map(arrayBufferView, function(item){return item})
      
      return sjcl.codec.base64.fromBits(
        sjcl.hash.sha256.hash(actualArray)
      )
    }

    , saveBlob: function(){

      var userBlob = this.getBlob()
      , username = this.get('username')
      , password = this.get('password')
      , id = userBlob.id
      , encryptedBlob = this.encryptBlob(password, userBlob)
      , signature = this.signMessage(encryptedBlob)
      , data = { username:username , id: id , newBlob : encryptedBlob , signature : signature}

      
      multipass.checkMultipass(data)
               .then(_.bind($.post, $, api.updateUserBlob))
               .then(_.bind(this.saveBlobCallback, this))
    }

    , saveBlobCallback: function(){
    }

    , resetFS: function(){
      this.set('fs',{name:"root",type:"folder", value:{}})
      this.saveBlob()
    }

    , calcSpaceUsed: function(){
      if (!this.has("fs")){
        return 0
      }
      var fs = this.get('fs')

      var recursiveReduceSum = function(memo, fileObj){
        if (fileObj.type == "folder"){
         return memo +  _.reduce(_.values(fileObj.value), recursiveReduceSum, 0)
        // it is a file
        }else{
          return memo + fileObj.size

        }
      }

      return _.reduce(_.values(fs.value), recursiveReduceSum, 0)

    }

  })
}) 

;
//Define the User Blob model
define('models/user/User',['apiEndPoints', 'models/user/UserBlob', 'tools/Multipass'],function(api, UserBlob, Multipass){ 
    var multipass = new Multipass()

    return Backbone.Model.extend({
        defaults: {
            userBlob : new UserBlob()
            , fsLocation : '/' // keep track of where the user is currently looking
            , loggedIn : false
            , inOptions: false
            , username : ""
            , totalSpace : 10e6 // That's 10 MB
        }

      , initialize : function(){
          //debugging
          //this.login("abc", "123",'')
      }

      , createSecretKey : function(){
          var base32 = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","2","3","4","5","6","7"]
          return _.map(sjcl.random.randomWords(16), function(randomNum){ return base32[Math.abs(randomNum)%32] } ).join('');
      }


      , register: function(username, password, testerToken, use2step){
          var userBlob = this.get('userBlob')
          , secretKey = use2step ? this.createSecretKey() : undefined //set the secret to nothing if we arent using it
  

          //tell anyone who cares that the secret key was made 
          this.trigger('secretKeyCreated', secretKey);

          userBlob = new UserBlob(
              {username:username
               , password: password
          })
          userBlob.generateRSA()
          userBlob.resetFS()
  
          var userBlobJSON = userBlob.getBlob()
          , publickey_n = userBlobJSON.RSAObject.pub_key
          , publickey_e = userBlobJSON.RSAObject.rsa_e
          , encryptedBlob = userBlob.encryptBlob(password, userBlobJSON)
          , data = 
                  { username:username
                  , testerToken: testerToken
                  , publickey_n: publickey_n
                  , publickey_e: publickey_e
                  , secret_key : secretKey
                  , blob : encryptedBlob}
  
          multipass.checkMultipass(data)
                   .then(_.bind($.post,$, api.createUser))
                   .then(_.bind(this.registerCallback, this, username, password))
      }
  
      , registerCallback : function(username, password, result){
        if (result.return === "success"){
          this.trigger('register:success')
          this.login(username, password)
        }else{
          this.trigger('register:error',result.return.error)
        }
      }
  
  
      , login: function(username, password, auth_attempt){
          this.set('username',username)
          var userBlob = new UserBlob({username:username, password:password})
          this.set('userBlob', userBlob)
          var loginReq = {username:username}
          if (!_.isUndefined(auth_attempt) && auth_attempt.length !== 0){
              loginReq["auth_attempt"]=auth_attempt
          } 

          multipass.checkMultipass(loginReq)
                  .then(_.bind($.post, $, api.getUserBlobs))
                  .then(_.bind(this.loginCallback, this))
      }
  
      , loginCallback: function(response){
          if (_.has(response.return,"error")){
            this.trigger('login:error',response.return.error)
            return
          }
           
          var userBlob = this.get('userBlob')
          , password = userBlob.get('password')
  
          var userBlobs = response.return.blobs

          try {
            userBlobs = _.map(userBlobs, _.bind(userBlob.decryptBlob,this, password))
          }catch (e){
            //The decryption failed, so they most likely used a wrong password
            console.error(e, ". Probably a Wrong Password")
            this.trigger('login:error', "wrong password")
            return
          }
  
          var userBlobFromServer = userBlob.consolidateBlobs(userBlobs)
  
          //save the id
          userBlobFromServer.id = response.return.id

          userBlob.setBlob(userBlobFromServer)
  
          this.set('loggedIn', true)
          this.trigger('loggedIn')
          this.trigger('login:success')
      }

      , changePassword: function(oldPassword, newPassword){
          if ( oldPassword == this.userBlob.get('password') ){

          }
      }


      //interface for showing off the files located at the current directory, or a single file if we are at the directory of a single file
      , getFile : function(){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , fsLocation = this.get("fsLocation")

          return userBlob.getFile(fs, fsLocation)
      }

      // similar to the ls -la filename
      , lsla : function(filename){
        var userBlob = this.get('userBlob')
        , fs = userBlob.get("fs")
        , fsLocation = this.get("fsLocation")+"/"+filename

        return userBlob.getFile(fs, fsLocation)
      }


      , ls : function(){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , fsLocation = this.get("fsLocation")

          return userBlob.ls(fs, fsLocation)
      }

      //like the unix cd, change directory into a folder
      , cd : function(filename){
        var file = this.lsla(filename)
        if (file.type !== "folder"){
          console.error("Trying to cd into a file!")
          return false
        }

        var fsLocation = this.get("fsLocation")
        this.set("fsLocation", fsLocation+"/"+filename)
        return true
      }

      , addFolder : function(folderName){
          this.addFile({filename:folderName, type:"folder", value:{}})
      }

      , addFile : function(fileObj){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , fsLocation = this.get('fsLocation')
          fs = _.clone(fs) //get a copy so we don't modify the original

          fs = userBlob.addFile(fs, fsLocation, fileObj)
          userBlob.set('fs',fs)

          userBlob.saveBlob()

          //this.trigger('change:fs')
      }

      , deleteFolder: function(fsLocation, filename){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , parentFolder = userBlob.getFile(fs, fsLocation)
          , folder = parentFolder.value[filename]
          , childFiles = _.values(folder.values)

          //check to see if it is the root 
          if (folder.name && folder.name == "root") {
              console.error("You tried to delete the root, directory. I'm not gonna do that")
              alert("Woah there buddy, looks like you almost deleted your root directory. Don't worry I saved you.")
              return
          }


          //remove all the files inside the folder
          _.each(childFiles, function(fileObj){ this.removeFile(fsLocation, fileObj.filename) }, this)

          fs = userBlob.deleteFolder(fs, fsLocation, folder.filename)
          userBlob.set('fs',fs)
          userBlob.saveBlob()

          this.set('fsLocation', fsLocation)

          //let listeners know that the fs has changed
          this.trigger('change:fs')
           
      }

      , removeFile : function(fsLocation, filename){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , parentFolder = userBlob.getFile(fs, fsLocation)
          , file = parentFolder.value[filename]

          //use the deleteFolder directive if the file is a fodler
          if (file.type == "folder"){
              return this.deleteFolder(fsLocation, filename)
          }

          fs = _.clone(fs) //get a copy so we don't modify the original

          fs = userBlob.removeFile(fs, fsLocation, filename)
          userBlob.set('fs',fs)
          userBlob.saveBlob()


          //let listeners know that the fs has changed
          this.trigger('change:fs')
      }

      , calcSpaceUsed : function(){
            return this.get('userBlob').calcSpaceUsed()
      }

  })
})
;
define('jade!templates/user/Userlogin', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('loginBox') }, {}));
buf.push('>');
if ( loggedIn )
{
buf.push('<div');
buf.push(attrs({ "class": ('usernameContainer') }, {}));
buf.push('><span>signed in as </span><div');
buf.push(attrs({ 'id':('username') }, {}));
buf.push('>');
var __val__ = username
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><button');
buf.push(attrs({ 'id':('userOptionsButton') }, {}));
buf.push('>Options</button></div>');
}
else
{
buf.push('<h1>Login</h1><div');
buf.push(attrs({ 'id':('usernameInput'), "class": ('inputField') }, {}));
buf.push('><input');
buf.push(attrs({ 'type':("text"), 'placeholder':("username") }, {"type":true,"placeholder":true}));
buf.push('/></div><div');
buf.push(attrs({ 'id':('passwordInput'), "class": ('inputField') }, {}));
buf.push('> <input');
buf.push(attrs({ 'type':("password"), 'placeholder':("password") }, {"type":true,"placeholder":true}));
buf.push('/></div><!-- <div');
buf.push(attrs({ 'id':('twoStepAuthInput') }, {}));
buf.push('>Enter 2 step authentication code:<input');
buf.push(attrs({ 'type':("text") }, {"type":true}));
buf.push('/></div>--><a');
buf.push(attrs({ 'id':('loginBtn'), 'href':("#login"), "class": ('btn') + ' ' + ('btn-block') + ' ' + ('btn-primary') + ' ' + ('btn-large') }, {"href":true}));
buf.push('>Login</a>');
}
buf.push('</div>');
}
return buf.join("");
}});

//returns the Userlogin view, responsible for the look of the user login
define('views/user/Userlogin',["jade!templates/user/Userlogin"], function(Logintemplate, UserBlob){ 
    return Backbone.View.extend({
        template: Logintemplate,

        id : "userLoginContainer",
        className : "floatingContainer",

        // The idea here is to setup this view and then forget about. We modify the state of the user using the user model
        // All views should change and be reactive to the changes of the userModel
        // This forces us to have simple interfaces for the models to the views
        initialize: function(){
            //react to a change in the login status of the user
            this.listenTo(this.model, 'change:login', this.render)
            this.listenTo(this.model, 'login:success', this.render)
            this.listenTo(this.model, 'login:error', this.render)

            this.render()
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        },

        events: {
            "click #loginBtn": "login"
            , "click #userOptionsButton": "showUserOptions"
        }, 

        showUserOptions: function(){
            this.model.set('inOptions', true)
        },

        login: function(){
            var username = this.$el.find('#usernameInput > input').val()
            , password = this.$el.find('#passwordInput > input').val()
            , auth_attempt = this.$el.find('#twoStepAuthInput > input').val()
  

            this.model.login(username, password, auth_attempt)
        },

        loginSucess: function(){
        },

        loginError: function(error){
        }

    })
});

define('jade!templates/user/UserFiles', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('filePath') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('span') + ' ' + ('noMargin') }, {}));
buf.push('><a');
buf.push(attrs({ 'href':("#user/fs//"), "class": ('breadcrumb') }, {"href":true}));
buf.push('>Home </a></div><div');
buf.push(attrs({ "class": ('span') + ' ' + ('filePart') }, {}));
buf.push('><p>/ </p></div>');
// iterate fsParts
;(function(){
  if ('number' == typeof fsParts.length) {
    for (var $index = 0, $$l = fsParts.length; $index < $$l; $index++) {
      var fsPart = fsParts[$index];

buf.push('<div');
buf.push(attrs({ "class": ('span') + ' ' + ('filePart') }, {}));
buf.push('><a');
buf.push(attrs({ 'href':("#"), 'filename':("" + (fsPart) + ""), "class": ('breadcrumb') + ' ' + ('fsPart') }, {"href":true,"filename":true}));
buf.push('>');
var __val__ = fsPart.replace(/\\\//g,"/")
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></div><div');
buf.push(attrs({ "class": ('span') + ' ' + ('filePart') }, {}));
buf.push('><p>/ </p></div>');
    }
  } else {
    for (var $index in fsParts) {
      if (fsParts.hasOwnProperty($index)){      var fsPart = fsParts[$index];

buf.push('<div');
buf.push(attrs({ "class": ('span') + ' ' + ('filePart') }, {}));
buf.push('><a');
buf.push(attrs({ 'href':("#"), 'filename':("" + (fsPart) + ""), "class": ('breadcrumb') + ' ' + ('fsPart') }, {"href":true,"filename":true}));
buf.push('>');
var __val__ = fsPart.replace(/\\\//g,"/")
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></div><div');
buf.push(attrs({ "class": ('span') + ' ' + ('filePart') }, {}));
buf.push('><p>/ </p></div>');
      }

   }
  }
}).call(this);

buf.push('</div><div');
buf.push(attrs({ 'id':('deleteButton') }, {}));
buf.push('></div><div');
buf.push(attrs({ "class": ('files') }, {}));
buf.push('> <div');
buf.push(attrs({ 'id':('createFolder'), "class": ('outerBar') + ' ' + ('turqouiseBtn') }, {}));
buf.push('><p');
buf.push(attrs({ 'id':('createFolderBtn'), "class": ('barText') + ' ' + ('fileBarText') + ' ' + ('pointer') }, {}));
buf.push('>Create Folder</p></div><div');
buf.push(attrs({ 'id':('folderNameSub'), "class": ('subItems') }, {}));
buf.push('><div');
buf.push(attrs({ 'id':('folderNameInput'), "class": ('outerBar') }, {}));
buf.push('><input');
buf.push(attrs({ 'type':("text"), 'placeholder':("Folder Name") }, {"type":true,"placeholder":true}));
buf.push('/></div></div>');
if ( !inRoot)
{
buf.push('<div');
buf.push(attrs({ 'id':('deleteFolder'), "class": ('deleteBtn') + ' ' + ('outerBar') + ' ' + ('pointer') + ' ' + ('alizarinBtn') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('barText') + ' ' + ('fileBarText') }, {}));
buf.push('>Delete This Folder</p></div>');
}
buf.push('<div');
buf.push(attrs({ 'id':('filesSeparator'), "class": ('outerBar') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('filesLabelContainer') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('barText') + ' ' + ('filesLabel') }, {}));
buf.push('>Files</p></div></div>');
// iterate files
;(function(){
  if ('number' == typeof files.length) {
    for (var $index = 0, $$l = files.length; $index < $$l; $index++) {
      var file = files[$index];

buf.push('<div');
buf.push(attrs({ "class": ('file') + ' ' + ('outerBar') + ' ' + ('asphaltBtn') }, {}));
buf.push('>');
if ( file.type === "folder")
{
buf.push('<i');
buf.push(attrs({ "class": ('icon-folder-open') + ' ' + ('fileIcon') }, {}));
buf.push('></i>');
}
else if ( file.type.indexOf("image") !== -1 )
{
buf.push('<i');
buf.push(attrs({ "class": ('icon-picture') + ' ' + ('fileIcon') }, {}));
buf.push('></i>');
}
else if ( file.type.indexOf("audio") !== -1 )
{
buf.push('<i');
buf.push(attrs({ "class": ('icon-music') + ' ' + ('fileIcon') }, {}));
buf.push('></i>');
}
else
{
buf.push('<i');
buf.push(attrs({ "class": ('icon-file') + ' ' + ('fileIcon') }, {}));
buf.push('></i>');
}
buf.push('<p');
buf.push(attrs({ 'path':("" + (fsLocation) + "" + (file.filename) + ""), 'filename':("" + (file.filename) + ""), "class": ('fileBarText') + ' ' + ('barText') }, {"path":true,"filename":true}));
buf.push('>');
var __val__ = file.filename.replace(/\\\//g,"/")
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div>');
    }
  } else {
    for (var $index in files) {
      if (files.hasOwnProperty($index)){      var file = files[$index];

buf.push('<div');
buf.push(attrs({ "class": ('file') + ' ' + ('outerBar') + ' ' + ('asphaltBtn') }, {}));
buf.push('>');
if ( file.type === "folder")
{
buf.push('<i');
buf.push(attrs({ "class": ('icon-folder-open') + ' ' + ('fileIcon') }, {}));
buf.push('></i>');
}
else if ( file.type.indexOf("image") !== -1 )
{
buf.push('<i');
buf.push(attrs({ "class": ('icon-picture') + ' ' + ('fileIcon') }, {}));
buf.push('></i>');
}
else if ( file.type.indexOf("audio") !== -1 )
{
buf.push('<i');
buf.push(attrs({ "class": ('icon-music') + ' ' + ('fileIcon') }, {}));
buf.push('></i>');
}
else
{
buf.push('<i');
buf.push(attrs({ "class": ('icon-file') + ' ' + ('fileIcon') }, {}));
buf.push('></i>');
}
buf.push('<p');
buf.push(attrs({ 'path':("" + (fsLocation) + "" + (file.filename) + ""), 'filename':("" + (file.filename) + ""), "class": ('fileBarText') + ' ' + ('barText') }, {"path":true,"filename":true}));
buf.push('>');
var __val__ = file.filename.replace(/\\\//g,"/")
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div>');
      }

   }
  }
}).call(this);

buf.push('<div');
buf.push(attrs({ 'id':('barsContainer'), "class": ('file') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('bars') }, {}));
buf.push('></div></div></div>');
}
return buf.join("");
}});

//returns the Userfiles view, responsible for the look of the fs
define('views/user/UserFiles',["jade!templates/user/UserFiles", "models/user/FS" ], function(filesTemplate, userFS){ 
    return Backbone.View.extend({

        id : "userFilesContainer",
        className : "floatingContainer",

        template: filesTemplate,

        initialize: function(){
            //react to the changes in the fsLocation
            this.listenTo(this.model,'change:fsLocation',this.updateView)
            this.listenTo(this.model,'change:loggedIn',this.updateView)
            this.listenTo(this.model,'change:inOptions',this.updateView)
            //check if the fs has changed
            this.listenTo(this.model,'change:fs',this.updateView)
        },

        updateView: function(){
            //make sure we only draw the view if the user is logged In
            if (this.model.get('loggedIn') == false) return
            if (this.model.get('inOptions') == true) return
            if (_.isUndefined(this.model.getFile())) return

            //this should return a list of files in the current fsLocation
            var file = this.model.getFile()

            if (file.name === "root" && file.type === "folder"){
                this.showFiles("/")
            }else if (file.type === "folder"){
                this.showFiles(file.location+"/"+file.filename)
            }else{
                this.showFileInfo()
            }
        },

        render: function(args) {
            var files = args.files
            this.$el.html(this.template(args));
        },

        events : {
            "click #newFolder":"showNewFolder"
            , "click #createFolderBtn": "toggleFolderInput"
            , "change #folderNameInput": "createNewFolder"
            , "click #deleteFolder":"deleteFolder"
            , "click .file":"openFile"
            , "click #filePath .fsPart" : "handleBreadcrumb"
        },

        handleBreadcrumb : function(e){
          var index = this.$el.find("#filePath .fsPart").index(e.target)
          , fsParts = userFS.splitPath(this.model.get('fsLocation'))
          fsParts.splice(index+1)

          this.model.set("fsLocation","/"+fsParts.join("/"))
          e.preventDefault()
        },

        toggleFolderInput: function(){
            this.$el.find("#folderNameSub").toggleClass("open")
        },

        openFile : function(e){
          var filename = $(e.target).attr("filename")

          //check if this is a file or a folder
          fileObj = this.model.lsla(filename)

          if (fileObj.type === "folder"){
            //someone will deal with this, they need to change the fsLocation of the model and this view should automatically update
            this.trigger("fs:folder:open", fileObj.filename)
          }else{
            //tell someone to focus on this file!
            this.trigger("fs:file:open", fileObj)
          }

          this.$el.find(".file").removeClass("selectedFile")
          $(e.target).parent().addClass('selectedFile')

            
        },

        deleteFolder : function(){
            //TODO show warning
            
            
            var parentFsLocation = this.model.get('userBlob').getParentFsLocation(this.model.get('fsLocation'))
            , folder = this.model.getFile()


            this.model.deleteFolder(parentFsLocation, folder.filename)

            //this.model.set('fsLocation',this.file.location)
        },

        showNewFolder : function(){
            this.$el.find('#folderNameInput').show()
        },

        createNewFolder : function(evt){
            var folderName = evt.target.value

            this.model.addFolder(folderName)

            evt.target.value = ""
            this.toggleFolderInput()

            this.updateView()

        },



        showFiles: function(loc){
            loc = loc ||  "/"

            var files = this.model.ls()
            , inRoot = false
            , fsParts = userFS.splitPath(loc)
            , fsLocation = userFS.cleanPath(loc)

            if (fsLocation === "/"){
              inRoot = true
            }

            this.render({files:files, folder: this.model.getFile(), fsLocation:fsLocation, inRoot: inRoot, fsParts: fsParts})
            return files
        },


        //File location should be in the form of /coolPics/me.jpg or /coolPics
        showFileInfo: function(){
            var file = this.model.getFile()
            , fsLocation = this.model.get('fsLocation')

            if (file && file.type != "folder"){
                //var singleFileInfo = new SingleFileInfo({el:this.el, model:this.model})
                //singleFileInfo.render({file:file, fileLocation:fsLocation})
            }
        },

    })
})
;
define('jade!templates/user/UserSpaceInfo', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('userSpace') }, {}));
buf.push('><div');
buf.push(attrs({ 'id':('spaceInfo') }, {}));
buf.push('><span>You\'ve used  </span><span');
buf.push(attrs({ 'id':('usedSpace') }, {}));
buf.push('>');
var __val__ = usedSpace
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><span> out of  </span><span');
buf.push(attrs({ 'id':('totalSpace') }, {}));
buf.push('>');
var __val__ = totalSpace
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span></div><div');
buf.push(attrs({ 'id':('spacePercent') }, {}));
buf.push('>');
var __val__ = percentUsed
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div>');
}
return buf.join("");
}});

//returns the User View, this contains the fs and is the parent to the userLogin
define('views/user/UserSpaceInfo',["jade!templates/user/UserSpaceInfo", "tools/humanReadableByteLength"], function(userSpaceTemplate, hrByteLength){ 
    return Backbone.View.extend({
        id : "userSpaceContainer"
        , className : "floatingContainer"

        , template : userSpaceTemplate

        , initialize : function(){
            this.listenTo(this.model, 'change:fs', this.render)
            this.listenTo(this.model, 'change:loggedIn', this.render)
        }

        , render: function(){
            var totalSpace = this.model.get('totalSpace')
            , usedSpace = this.model.calcSpaceUsed()
            , percentUsed = parseInt(10000*usedSpace/totalSpace)/100+"%"

            totalSpace = hrByteLength.prettyFormat(totalSpace)
            usedSpace = hrByteLength.prettyFormat(usedSpace)

            this.$el.html(this.template({totalSpace: totalSpace, usedSpace: usedSpace, percentUsed: percentUsed}))
        }
    })
})
;
define('jade!templates/user/UserOptions', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h2>Settings</h2><div');
buf.push(attrs({ 'id':('changePassword'), "class": ('option') }, {}));
buf.push('><div');
buf.push(attrs({ 'id':('changePasswordForm') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('controlGroup') }, {}));
buf.push('><input');
buf.push(attrs({ 'id':('oldPass'), 'type':("password"), 'placeholder':("Original Password") }, {"type":true,"placeholder":true}));
buf.push('/></div><div');
buf.push(attrs({ "class": ('controlGroup') }, {}));
buf.push('><input');
buf.push(attrs({ 'type':("password"), 'placeholder':("New Password"), "class": ('newPass') }, {"type":true,"placeholder":true}));
buf.push('/></div><div');
buf.push(attrs({ "class": ('controlGroup') }, {}));
buf.push('><input');
buf.push(attrs({ 'type':("password"), 'placeholder':("New Password"), "class": ('newPass') }, {"type":true,"placeholder":true}));
buf.push('/></div><div');
buf.push(attrs({ "class": ('controlGroup') }, {}));
buf.push('><a');
buf.push(attrs({ "class": ('btn') + ' ' + ('btn-primary') + ' ' + ('btn-large') + ' ' + ('btn-block') + ' ' + ('changePassword') }, {}));
buf.push('>Change Password</a></div></div></div><div');
buf.push(attrs({ 'id':('deleteAccount'), "class": ('option') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('controlGroup') }, {}));
buf.push('><a');
buf.push(attrs({ "class": ('btn') + ' ' + ('btn-danger') + ' ' + ('btn-large') + ' ' + ('btn-block') + ' ' + ('changePassword') }, {}));
buf.push('>Delete Account</a></div></div>');
}
return buf.join("");
}});

//returns the User View, this contains the fs and is the parent to the userLogin
define('views/user/UserOptions',["jade!templates/user/UserOptions"], function(userOptionsTemplate){ 
    return Backbone.View.extend({
        id : "userOptionsContainer"
        , className : "floatingContainer"

        , template : userOptionsTemplate

        , initialize : function(){
            this.listenTo(this.model, 'change:inOptions', this.render)
        }

        , render: function(){
            this.$el.html(this.template({}))
        }

        , events : {
            "click .changePassword" : "changePassword"
        }

        , verifyPasswordConsitency: function(){
            passwords = this.$el.find(".newPass").map(function(i,e){return e.value})
            return passwords[0] === passwords[1]
        }

        , changePassword : function(){
            var newPassword = this.$el.find('.newPass').val()
            , oldPassword = this.$el.find('#oldPass').val()
            , userBlob = this.model.get('userBlob')

            console.log('changing password')

            if ( oldPassword == userBlob.get('password') ){
                //we change the password
                userBlob.set('password', newPassword)
                this.model.set('userBlob', userBlob)

                userBlob.saveBlob()
                this.showSuccess("Password Changed")
            }else{
              this.showError("Wrong original password")
            }
        }

        , showSuccess : function(){
        }

        , showError : function(){
        }
    })
})
;
define('jade!templates/user/SingleFileInfo', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('fileInfo') }, {}));
buf.push('> <div');
buf.push(attrs({ "class": ('filename') }, {}));
buf.push('> <p>');
var __val__ = file.filename
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div><div');
buf.push(attrs({ "class": ('boxes') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('filesize') + ' ' + ('outerBar') + ' ' + ('asbestos') }, {}));
buf.push('> <p');
buf.push(attrs({ "class": ('barText') }, {}));
buf.push('>Size: ' + escape((interp = size) == null ? '' : interp) + '  ' + escape((interp = sizeUnit) == null ? '' : interp) + '</p></div><div');
buf.push(attrs({ "class": ('filetype') + ' ' + ('outerBar') + ' ' + ('asbestos') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('barText') }, {}));
buf.push('>Type: ' + escape((interp = file.type) == null ? '' : interp) + '</p></div><!--<div');
buf.push(attrs({ "class": ('downloadLink') }, {}));
buf.push('>Link:<span><input');
buf.push(attrs({ 'type':("text"), 'value':("" + (downloadLink) + "") }, {"type":true,"value":true}));
buf.push('/></span></div>--><div');
buf.push(attrs({ "class": ('downloadBtn') + ' ' + ('outerBar') + ' ' + ('emeraldBtn') + ' ' + ('pointer') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('barText') }, {}));
buf.push('>Download </p></div><div');
buf.push(attrs({ 'id':('sharing') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('shareBtn') + ' ' + ('outerBar') + ' ' + ('peter-riverBtn') + ' ' + ('pointer') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('barText') }, {}));
buf.push('>Share</p></div><div');
buf.push(attrs({ "class": ('subItems') }, {}));
buf.push('><div');
buf.push(attrs({ 'id':('normalLink'), "class": ('outerBar') + ' ' + ('peter-riverBtn') + ' ' + ('pointer') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('barText') }, {}));
buf.push('>Normal Link</p></div><div');
buf.push(attrs({ "class": ('outerBar') + ' ' + ('peter-riverBtn') + ' ' + ('pointer') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('barText') }, {}));
buf.push('>Time Limited Link</p></div><div');
buf.push(attrs({ "class": ('outerBar') + ' ' + ('peter-riverBtn') + ' ' + ('pointer') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('barText') }, {}));
buf.push('>One Time Only Link</p></div></div></div><div');
buf.push(attrs({ "class": ('deleteBtn') + ' ' + ('outerBar') + ' ' + ('alizarinBtn') + ' ' + ('pointer') }, {}));
buf.push('><p');
buf.push(attrs({ "class": ('barText') }, {}));
buf.push('>Delete</p></div></div></div>');
}
return buf.join("");
}});

//returns the single file info view, responsible for the look of the info of a file, gives you options to download the file, delete the file, or move the file
define('views/user/SingleFileInfo',["jade!templates/user/SingleFileInfo", "tools/humanReadableByteLength"], function(fileTemplate, hrByteLength){ 
    var api = {
    }

    return Backbone.View.extend({
        template: fileTemplate,

        id : "SingleFileInfoContainer",
        className : "floatingContainer",

        initialize: function(){
        },

        render: function(args) {
            this.file = args.file

            var bytes = args.file.size
            , sizeUnit = hrByteLength.calcHumanReadableSize(bytes)
            , size = hrByteLength.truncateBytes(bytes)
            , origin = window.location.protocol + "//" + window.location.host
            , downloadLink = origin+'/#download/'+this.file.link

            this.downloadLink = downloadLink

            this.$el.html(this.template({file:args.file, size:size, sizeUnit:sizeUnit, downloadLink:downloadLink}));

        },

        events: {
            "click .downloadBtn": "downloadFile"
            , "click .deleteBtn": "deleteFile"
            , "click .shareBtn" : "toggleShareOptions"
            , "click #normalLink":"createNormalLink"
        },

        downloadFile : function(){
            window.open(this.downloadLink)
        },

        deleteFile : function(){
            var fsLocation = this.model.get('fsLocation')
            , userBlob = this.model.get('userBlob')
            , parentLocation = userBlob.getParentFsLocation(fsLocation)
            this.model.removeFile(this.file.location, this.file.filename)
            this.model.set('fsLocation', parentLocation)
        },

        toggleShareOptions : function(){
            this.$el.find("#sharing .subItems").toggleClass("open")
        },

        createNormalLink : function(){
            //we already created the link
            if ( this.$el.find("#normalLink input").length > 0) return

            this.$el.find("#normalLink p").hide()
            this.$el.find("#normalLink").append($("<input type=text onclick='this.select()'>"))
            this.$el.find("#normalLink input").val(this.downloadLink)

        },



    })
})
;
//returns the User View, this contains the fs and is the parent to the userLogin
define('views/user/User',["jade!templates/user/User", "models/user/User", "views/user/Userlogin", "views/user/UserFiles", "views/user/UserSpaceInfo", "views/user/UserOptions","views/user/SingleFileInfo"], function(userTemplate, User, UserLoginView, UserFileView, UserSpaceInfo, UserOptions, SingleFileInfo){ 
    return Backbone.View.extend({
        template: userTemplate,

        errorHandler: function(errorObj){
            console.error(errorObj.error)
        },

        initialize: function(){

            //set up subordinate views
            //userFileView
            this.userFileView = new UserFileView({model: this.model})
            this.userLoginView = new UserLoginView({model: this.model})
            this.userSpace = new UserSpaceInfo({model: this.model})
            this.userOptions = new UserOptions({model:this.model})
            this.singleFileInfo = new SingleFileInfo({model:this.model})

            this.setupListeners()

            this.setupPassThroughEvents()
        },

        remove: function(){
            //destroy all bound events
            this.userLoginView.off()
            this.userFileView.off()
            this.singleFileInfo.off()
            this.off()

            this.userLoginView.remove()
            this.userFileView.remove()
            this.singleFileInfo.remove()
            this.remove()
        },


        setupListeners: function(){
            this.on('error', this.errorHandler)

            this.listenTo(this.userFileView, "fs:folder:open", function(filename){this.model.cd(filename)})
        },

        //Sometimes we want to pass up an event from a child view to whoever is listening to this view
        setupPassThroughEvents: function(){
          this.listenTo(this.userFileView, "fs:file:open", _.bind(this.trigger, this, "fs:file:open"))
        },


        render: function() {
        },

        //call this function when the file has been uploaded succefully
        fileUploaded : function(fileIndex, fileObj){
            console.log('Saving',fileObj.name,'to userblob at', fileObj.location)

            this.model.addFile(fileObj)
        },

    })
});

//defines what the user route will do
define(
 'routes/User',["views/File", "views/user/User","views/Progress"], function(FileView, UserView, ProgressBar){ 
  // Return a function that takes in three pieces of state: 
  // the viewport: So it can draw things on the screen
  // the user model: So it can print the user's files
  // the router: So it can navigate to the login page if there is no user, and we can change the route when we go to a folderj
  // the topBar: So it can change the indicator of the top bar
  return function(viewport, topBar, userModel, router){
    return function(){
      if (!userModel.get("loggedIn")){
        router.navigate("/login",{trigger:true})
        return
      }

      console.log('starting user home')

      topBar.select('files')

      userView = new UserView({model:userModel})

      var fileView = new FileView({user:userModel});
      fileView.render()

      var progressBars = []

      userView.listenTo(fileView, 'file:uploaded', userView.fileUploaded)
      userView.render()

      userView.listenTo(fileView,"file:list", function(files){
        progressBars = _.map(files, function(fileModel){
          var progressBar = new ProgressBar()
          progressBar.render()
          progressBar.text(fileModel.get("file").name)
          return progressBar
        })

        _.each(progressBars, function(bar){
          userView.userFileView.$el.find(".bars").append(bar.el)
        })

      })

      //update the progress of each file
      userView.listenTo(fileView,"file:progress", function(fileIndex,percentage){
        console.log("progress:",percentage,"for file:",fileIndex)
        progressBars[fileIndex].percentage(percentage+"%")
      })

      userView.listenTo(fileView, "file:uploaded", function(fileIndex, fileObj){
        var origin = window.location.protocol + "//" + window.location.host
        var downloadLink = origin+'/#download/'+fileObj.link
        var progressBar = progressBars[fileIndex]

        progressBar.link( downloadLink, fileObj.filename )
        progressBar.markSuccess()
      })

      userView.listenTo(fileView, "file:uploaded:all", function(){
        userModel.trigger("change:fs")
      })

      //declare this variable, we'll define it in a bit
      var hideSingleFileAndShowUpload

      userView.listenTo(userView.userFileView, "fs:file:open", function(fileObj){
        userView.singleFileInfo.render({file:fileObj})
        viewport
                .show(userView.singleFileInfo.el, true)
                .placeRightOfCenter(userView.singleFileInfo.el, 1)
                .placeRightOffScreen(fileView.el,1)
                .placeButtonRight(1,"Upload", ["emeraldBtn"])
                .then(hideSingleFileAndShowUpload)
      })

      hideSingleFileAndShowUpload = function(){
        viewport.placeRightUpOffScreen(userView.singleFileInfo.el, 1)
                .placeRightOfCenter(fileView.el, 1)
                .hideButtonRight()
      }



      //change the url according to the fsLocation on the model
      userView.listenTo(userModel, 'change:fsLocation', function(model){
          router.navigate('/user/fs/'+model.get('fsLocation').substr(1))
      })

      //the user is already logged in we can activate the view
      userModel.set("fsLocation","/")
      userView.userFileView.showFiles("/")
      viewport.exeunt()
        .introduce(userView.userFileView, 1)
        .introduce(userView.singleFileInfo, 1)
        .introduce(fileView, 1)
        .moveToPage(1)
        .hide(userView.singleFileInfo.el, true)
        .placeRightUpOffScreen(userView.singleFileInfo.el, 1)
        .placeLeftOfCenter(userView.userFileView.el, 1)
        .placeRightOfCenter(fileView.el, 1)

    }
  }
})
      
;
define('routes/Fs',[ "views/user/UserOptions" ], function(About){
  return function(userModel, router){
    return function(fileLocation){
      if (!userModel.get("loggedIn")){
        router.navigate("/login",{trigger:true})
        return
      }

      if (fileLocation === null || _.isUndefined(fileLocation)) fileLocation = ""

      userModel.set('fsLocation', "/"+fileLocation)
    }
  }
})

;
define('routes/Settings',[ "views/user/UserOptions" ], function(UserOptions){
  return function(viewport, topBar, userModel, router){
    return function(){
      //check if logged in
      if (!userModel.get("loggedIn")){
        router.navigate("/login",{trigger:true})
        return
      }

      console.log("Entering settings")

      topBar.select('settings')

      var userSettings = new UserOptions({model:userModel})
      userSettings.render()

      viewport.exeunt()
              .moveToPage(2)
              .introduce(userSettings, 2)
              .placeCenter(userSettings.el, 2)
    }
  }
})

;
define('jade!templates/About', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h1>About</h1><div');
buf.push(attrs({ 'id':('aboutSeparator') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('aboutText') }, {}));
buf.push('><p>We are a small company with a simple goal: Make security and privacy easy.</p></div>');
}
return buf.join("");
}});

//returns the Userlogin view, responsible for the look of the user login
define('views/About',["jade!templates/About"], function(template, UserBlob){ 
    return Backbone.View.extend({
        id : "aboutContainer",
        className : "floatingContainer",

        render: function() {
            this.$el.html(template());
        },
    })
});

define('routes/About',[ "views/About" ], function(About){
  return function(viewport, topBar){
    return function(){
      console.log('Entering About')
      var about = new About()
      about.render()
      topBar.select('about')

      viewport
      .exeunt()
      .introduce(about,0)
      .moveToPage(0)
      .placeCenter(about.el, 0)
    }
  }
})

;
define(
 'routes/Login',["views/user/Userlogin"], function(UserLoginView){ 
  return function(viewport, topBar, userModel, router){
    return function(){
      var userLogin = new UserLoginView({model : userModel})

      topBar.select('login')

      //naviate to the user's files on successful login
      userLogin.listenToOnce(userModel,"login:success", _.bind(router.navigate, router, "/user", {trigger:true}))
      viewport.exeunt()
              .introduce(userLogin,3)
              .moveToPage(3)
              .placeCenter(userLogin.el, 3)
    }
  }
})
;
define('jade!templates/user/UserRegister', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('loginBox') }, {}));
buf.push('>');
if ( loggedIn)
{
buf.push('<div');
buf.push(attrs({ "class": ('usernameContainer') }, {}));
buf.push('><span>signed in as </span><div');
buf.push(attrs({ 'id':('username') }, {}));
buf.push('>');
var __val__ = username
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><button');
buf.push(attrs({ 'id':('userOptionsButton') }, {}));
buf.push('>Options</button></div>');
}
else if ( registered)
{
buf.push('<div');
buf.push(attrs({ "class": ('successMessage') }, {}));
buf.push('><p>Congrats! you now have a cryptic account!</p></div>');
}
else
{
buf.push('<h1>Register</h1><div');
buf.push(attrs({ 'id':('usernameInput'), "class": ('inputField') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('control-group') }, {}));
buf.push('><input');
buf.push(attrs({ 'type':("text"), 'placeholder':("username") }, {"type":true,"placeholder":true}));
buf.push('/></div><p');
buf.push(attrs({ "class": ('message') }, {}));
buf.push('> </p></div><div');
buf.push(attrs({ 'id':('passwordInput') }, {}));
buf.push('> <div');
buf.push(attrs({ "class": ('control-group') }, {}));
buf.push('> <input');
buf.push(attrs({ 'type':("password"), 'placeholder':("password") }, {"type":true,"placeholder":true}));
buf.push('/></div><p');
buf.push(attrs({ "class": ('message') }, {}));
buf.push('></p></div><div');
buf.push(attrs({ 'id':('testerToken'), "class": ('inputField') }, {}));
buf.push('><div');
buf.push(attrs({ "class": ('control-group') }, {}));
buf.push('><input');
buf.push(attrs({ 'type':("text"), 'placeholder':("Test Token") }, {"type":true,"placeholder":true}));
buf.push('/></div><p');
buf.push(attrs({ "class": ('message') }, {}));
buf.push('></p></div><!-- <div');
buf.push(attrs({ 'id':('twoStepAuthInput') }, {}));
buf.push('>Enter 2 step authentication code:<input');
buf.push(attrs({ 'type':("text") }, {"type":true}));
buf.push('/></div>--><div');
buf.push(attrs({ "class": ('control-group') }, {}));
buf.push('><a');
buf.push(attrs({ 'id':('registerBtn'), 'href':("#register"), "class": ('btn') + ' ' + ('btn-block') + ' ' + ('btn-primary') + ' ' + ('btn-large') }, {"href":true}));
buf.push('>Register</a></div>');
}
buf.push('</div>');
}
return buf.join("");
}});

//returns the Userlogin view, responsible for the look of the user login
define('views/user/UserRegister',["jade!templates/user/UserRegister"], function(Logintemplate, UserBlob){ 
    return Backbone.View.extend({
        template: Logintemplate,

        id : "userRegisterContainer",
        className : "floatingContainer",

        // The idea here is to setup this view and then forget about. We modify the state of the user using the user model
        // All views should change and be reactive to the changes of the userModel
        // This forces us to have simple interfaces for the models to the views
        initialize: function(){
            //react to a change in the login status of the user
            this.listenTo(this.model, 'change:loggedIn', this.render)

            //react to a user's registration
            this.listenTo(this.model, 'register:success', this.renderSuccess)
            this.listenTo(this.model, 'register:error', this.registerError)

            this.render()
        },

        render: function() {
            this.$el.html(this.template(_.defaults({"registered":false},this.model.toJSON())));
        },

        renderSuccess : function(){
            console.log("Registered successfully!")
            this.$el.html(this.template(_.defaults({"registered":true},this.model.toJSON())));
        },

        registerError: function(error){
          if (error == "username taken") {
            $("#usernameInput .control-group").addClass("error")
            $("#usernameInput .message").addClass("errorMessage")
            $("#usernameInput .message").text("Username Taken")
          }else if (error === "invalid tester token"){
            $("#testerToken .control-group").addClass("error")
            $("#testerToken .message").addClass("errorMessage")
            $("#testerToken .message").text("Invalid Token")
          }

        },

        events: {
            "click #registerBtn": "register"
        }, 

        register: function(){
            var username = this.$el.find('#usernameInput input').val()
            ,  password = this.$el.find('#passwordInput input').val()
            ,  use2step = this.$el.find('#use2StepAuth input').is(':checked')
            ,  testerToken = this.$el.find("#testerToken input").val()


            this.model.once('secretKeyCreated', function(secretKey){
                if (!use2step) return;
                console.log('secret is:', secretKey);
                var qrURL = 'https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/'+username+'@cryptic.io%3Fsecret%3D'+secretKey;
                alert("Open this link in another tab to view to code you need to scan with the Google Authenticator app: "+qrURL)
            },this.model)

            this.model.register(username, password, testerToken, use2step)
        },
    })
});

define('routes/Register',[ "views/user/UserRegister" ], function(UserRegisterView){
  return function(viewport, topBar, userModel){
    return function(){
      var userRegister = new UserRegisterView({model : this.userModel})

      topBar.select('register')

      userRegister.listenToOnce(userModel,"login:success", _.bind(router.navigate, router, "/user", {trigger:true}))

      viewport.exeunt()
              .introduce(userRegister,2)
              .moveToPage(2)
              .placeCenter(userRegister.el,2)
    }
  }
})
;
define('routes/Download',["views/ProgressBars", "views/Progress", "views/File"], function(ProgressBars, ProgressBar, FileView){
  return function(viewport){
    return function(linkNameAndPasscode){
      //reference the barsContainer div
      var barsContainer = new ProgressBars({title: "Downloading"})
      progressBar = new ProgressBar()
      fileView = new FileView();

      barsContainer.render()
      progressBar.render()

      barsContainer.insertProgressBars([progressBar.el])

      var linkName = linkNameAndPasscode.split('/')[0]
      var passcode = linkNameAndPasscode.split('/')[1]




      //this will be called when the file begins to download
      fileView.on("file:start:download",function(){
        viewport.exeunt()
                .introduce(barsContainer,0)
                .placeCenter(barsContainer.el,0)
                .moveToPage(0)
      })

      fileView.on("file:name", function(name){
        progressBar.text(name)
      })

      fileView.on("file:progress", function(fileIndex,progress){
        progressBar.percentage(progress+"%")
      })

      fileView.on("file:url", function(urlObj){
        progressBar.link(urlObj.url, urlObj.name, true)
        progressBar.markSuccess()
        progressBar.clickLink()
        barsContainer.setTitle("Done!")
      })


      fileView.downloadFile(linkName, passcode, function(){
          console.log('woohoo downloaded the file!');
          fileView.createDownloadLink();
      });
    }
  }
})
;
define('jade!templates/Home', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('page0'), "class": ('page') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('page1'), "class": ('page') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('page2'), "class": ('page') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('page3'), "class": ('page') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('page5'), "class": ('page') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('page6'), "class": ('page') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('page7'), "class": ('page') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('page8'), "class": ('page') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('page9'), "class": ('page') }, {}));
buf.push('></div><div');
buf.push(attrs({ 'id':('leftBtn'), "class": ('sideBtn') }, {}));
buf.push('><p>abc 1234</p></div><div');
buf.push(attrs({ 'id':('rightBtn'), "class": ('sideBtn') }, {}));
buf.push('><p>abc 1234</p></div><div');
buf.push(attrs({ 'id':('leftDownBtn'), "class": ('sideBtn') }, {}));
buf.push('><p>abc 1234</p></div><div');
buf.push(attrs({ 'id':('rightDownBtn'), "class": ('sideBtn') }, {}));
buf.push('><p>abc 1234</p></div>');
}
return buf.join("");
}});

//returns the home view
define('views/Home',["jade!templates/Home"], function(homeTemplate){ 
    return Backbone.View.extend({
        template: homeTemplate,

        initialize: function(){
          console.log("Starting entropy collector")
          sjcl.random.startCollectors()
        },

        render: function() {
            this.$el.html(this.template());
        },
    })
});

(function(definition){if(typeof exports==="object"){module.exports=definition();}else if(typeof define==="function"&&define.amd){define('core/mori',definition);}else{mori=definition();}})(function(){return function(){
function e(a){throw a;}var ba=void 0,h=!0,k=null,l=!1;function ca(){return function(a){return a}}function m(a){return function(){return this[a]}}function p(a){return function(){return a}}var q,da=this;
function r(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"string"==typeof a}var fa="closure_uid_"+Math.floor(2147483648*Math.random()).toString(36),ha=0;function s(a,b){var c=a.split("."),d=da;!(c[0]in d)&&d.execScript&&d.execScript("var "+c[0]);for(var f;c.length&&(f=c.shift());)!c.length&&b!==ba?d[f]=b:d=d[f]?d[f]:d[f]={}};function ia(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c),b%=4294967296;return b};var ja=Array.prototype;function ka(a,b){return a>b?1:a<b?-1:0};function la(a,b){var c=Array.prototype.slice.call(arguments),d=c.shift();"undefined"==typeof d&&e(Error("[goog.string.format] Template required"));return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g,function(a,b,d,j,n,u,A,L){if("%"==u)return"%";var M=c.shift();"undefined"==typeof M&&e(Error("[goog.string.format] Not enough arguments"));arguments[0]=M;return la.oa[u].apply(k,arguments)})}la.oa={};
la.oa.s=function(a,b,c){return isNaN(c)||""==c||a.length>=c?a:a=-1<b.indexOf("-",0)?a+Array(c-a.length+1).join(" "):Array(c-a.length+1).join(" ")+a};
la.oa.f=function(a,b,c,d,f){d=a.toString();isNaN(f)||""==f||(d=a.toFixed(f));var g;g=0>a?"-":0<=b.indexOf("+")?"+":0<=b.indexOf(" ")?" ":"";0<=a&&(d=g+d);if(isNaN(c)||d.length>=c)return d;d=isNaN(f)?Math.abs(a).toString():Math.abs(a).toFixed(f);a=c-d.length-g.length;return d=0<=b.indexOf("-",0)?g+d+Array(a+1).join(" "):g+Array(a+1).join(0<=b.indexOf("0",0)?"0":" ")+d};la.oa.d=function(a,b,c,d,f,g,i,j){return la.oa.f(parseInt(a,10),b,c,d,0,g,i,j)};la.oa.i=la.oa.d;la.oa.u=la.oa.d;function ma(a,b){a!=k&&this.append.apply(this,arguments)}ma.prototype.Ja="";ma.prototype.append=function(a,b,c){this.Ja+=a;if(b!=k)for(var d=1;d<arguments.length;d++)this.Ja+=arguments[d];return this};ma.prototype.toString=m("Ja");var oa;s("cljs.core.set_print_fn_BANG_",ca());function pa(){return qa(["\ufdd0:flush-on-newline",h,"\ufdd0:readably",h,"\ufdd0:meta",l,"\ufdd0:dup",l],h)}function t(a){return a!=k&&a!==l}function ra(a){return t(a)?l:h}function sa(a){var b=ea(a);return b?"\ufdd0"!==a.charAt(0):b}function v(a,b){return a[r(b==k?k:b)]?h:a._?h:l}function w(a,b){var c=b==k?k:b.constructor,c=t(t(c)?c.ab:c)?c.xb:r(b);return Error(["No protocol method ",a," defined for type ",c,": ",b].join(""))}
function ta(a){return Array.prototype.slice.call(arguments)}var ua,xa=k;function ya(a){return xa.a(k,a)}function za(a,b){return x.c?x.c(function(a,b){a.push(b);return a},[],b):x.call(k,function(a,b){a.push(b);return a},[],b)}xa=function(a,b){switch(arguments.length){case 1:return ya.call(this,a);case 2:return za.call(this,0,b)}e(Error("Invalid arity: "+arguments.length))};xa.b=ya;xa.a=za;ua=xa;var Aa={},Ba={};
function Ca(a){if(a?a.J:a)return a.J(a);var b;var c=Ca[r(a==k?k:a)];c?b=c:(c=Ca._)?b=c:e(w("ICounted.-count",a));return b.call(k,a)}function Da(a){if(a?a.K:a)return a.K(a);var b;var c=Da[r(a==k?k:a)];c?b=c:(c=Da._)?b=c:e(w("IEmptyableCollection.-empty",a));return b.call(k,a)}var Ea={};function Fa(a,b){if(a?a.H:a)return a.H(a,b);var c;var d=Fa[r(a==k?k:a)];d?c=d:(d=Fa._)?c=d:e(w("ICollection.-conj",a));return c.call(k,a,b)}var Ga={},y,Ha=k;
function Ia(a,b){if(a?a.M:a)return a.M(a,b);var c;var d=y[r(a==k?k:a)];d?c=d:(d=y._)?c=d:e(w("IIndexed.-nth",a));return c.call(k,a,b)}function Ja(a,b,c){if(a?a.P:a)return a.P(a,b,c);var d;var f=y[r(a==k?k:a)];f?d=f:(f=y._)?d=f:e(w("IIndexed.-nth",a));return d.call(k,a,b,c)}Ha=function(a,b,c){switch(arguments.length){case 2:return Ia.call(this,a,b);case 3:return Ja.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};Ha.a=Ia;Ha.c=Ja;y=Ha;var Ka={};
function La(a){if(a?a.Q:a)return a.Q(a);var b;var c=La[r(a==k?k:a)];c?b=c:(c=La._)?b=c:e(w("ISeq.-first",a));return b.call(k,a)}function Ma(a){if(a?a.S:a)return a.S(a);var b;var c=Ma[r(a==k?k:a)];c?b=c:(c=Ma._)?b=c:e(w("ISeq.-rest",a));return b.call(k,a)}var Oa={},Pa={},Qa,Ra=k;function Sa(a,b){if(a?a.N:a)return a.N(a,b);var c;var d=Qa[r(a==k?k:a)];d?c=d:(d=Qa._)?c=d:e(w("ILookup.-lookup",a));return c.call(k,a,b)}
function Ta(a,b,c){if(a?a.A:a)return a.A(a,b,c);var d;var f=Qa[r(a==k?k:a)];f?d=f:(f=Qa._)?d=f:e(w("ILookup.-lookup",a));return d.call(k,a,b,c)}Ra=function(a,b,c){switch(arguments.length){case 2:return Sa.call(this,a,b);case 3:return Ta.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};Ra.a=Sa;Ra.c=Ta;Qa=Ra;var Ua={};function Va(a,b){if(a?a.Wa:a)return a.Wa(a,b);var c;var d=Va[r(a==k?k:a)];d?c=d:(d=Va._)?c=d:e(w("IAssociative.-contains-key?",a));return c.call(k,a,b)}
function Wa(a,b,c){if(a?a.Y:a)return a.Y(a,b,c);var d;var f=Wa[r(a==k?k:a)];f?d=f:(f=Wa._)?d=f:e(w("IAssociative.-assoc",a));return d.call(k,a,b,c)}var Xa={};function Ya(a,b){if(a?a.Za:a)return a.Za(a,b);var c;var d=Ya[r(a==k?k:a)];d?c=d:(d=Ya._)?c=d:e(w("IMap.-dissoc",a));return c.call(k,a,b)}var Za={};function $a(a){if(a?a.Ma:a)return a.Ma(a);var b;var c=$a[r(a==k?k:a)];c?b=c:(c=$a._)?b=c:e(w("IMapEntry.-key",a));return b.call(k,a)}
function ab(a){if(a?a.Na:a)return a.Na(a);var b;var c=ab[r(a==k?k:a)];c?b=c:(c=ab._)?b=c:e(w("IMapEntry.-val",a));return b.call(k,a)}var bb={};function cb(a,b){if(a?a.ub:a)return a.ub(a,b);var c;var d=cb[r(a==k?k:a)];d?c=d:(d=cb._)?c=d:e(w("ISet.-disjoin",a));return c.call(k,a,b)}function db(a){if(a?a.va:a)return a.va(a);var b;var c=db[r(a==k?k:a)];c?b=c:(c=db._)?b=c:e(w("IStack.-peek",a));return b.call(k,a)}
function eb(a){if(a?a.wa:a)return a.wa(a);var b;var c=eb[r(a==k?k:a)];c?b=c:(c=eb._)?b=c:e(w("IStack.-pop",a));return b.call(k,a)}var fb={};function gb(a,b,c){if(a?a.Pa:a)return a.Pa(a,b,c);var d;var f=gb[r(a==k?k:a)];f?d=f:(f=gb._)?d=f:e(w("IVector.-assoc-n",a));return d.call(k,a,b,c)}function hb(a){if(a?a.fb:a)return a.fb(a);var b;var c=hb[r(a==k?k:a)];c?b=c:(c=hb._)?b=c:e(w("IDeref.-deref",a));return b.call(k,a)}var ib={};
function jb(a){if(a?a.D:a)return a.D(a);var b;var c=jb[r(a==k?k:a)];c?b=c:(c=jb._)?b=c:e(w("IMeta.-meta",a));return b.call(k,a)}var kb={};function lb(a,b){if(a?a.G:a)return a.G(a,b);var c;var d=lb[r(a==k?k:a)];d?c=d:(d=lb._)?c=d:e(w("IWithMeta.-with-meta",a));return c.call(k,a,b)}var mb={},nb,ob=k;function pb(a,b){if(a?a.aa:a)return a.aa(a,b);var c;var d=nb[r(a==k?k:a)];d?c=d:(d=nb._)?c=d:e(w("IReduce.-reduce",a));return c.call(k,a,b)}
function qb(a,b,c){if(a?a.Z:a)return a.Z(a,b,c);var d;var f=nb[r(a==k?k:a)];f?d=f:(f=nb._)?d=f:e(w("IReduce.-reduce",a));return d.call(k,a,b,c)}ob=function(a,b,c){switch(arguments.length){case 2:return pb.call(this,a,b);case 3:return qb.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};ob.a=pb;ob.c=qb;nb=ob;function rb(a,b,c){if(a?a.La:a)return a.La(a,b,c);var d;var f=rb[r(a==k?k:a)];f?d=f:(f=rb._)?d=f:e(w("IKVReduce.-kv-reduce",a));return d.call(k,a,b,c)}
function sb(a,b){if(a?a.B:a)return a.B(a,b);var c;var d=sb[r(a==k?k:a)];d?c=d:(d=sb._)?c=d:e(w("IEquiv.-equiv",a));return c.call(k,a,b)}function tb(a){if(a?a.I:a)return a.I(a);var b;var c=tb[r(a==k?k:a)];c?b=c:(c=tb._)?b=c:e(w("IHash.-hash",a));return b.call(k,a)}function ub(a){if(a?a.F:a)return a.F(a);var b;var c=ub[r(a==k?k:a)];c?b=c:(c=ub._)?b=c:e(w("ISeqable.-seq",a));return b.call(k,a)}var vb={},wb={};
function xb(a){if(a?a.Oa:a)return a.Oa(a);var b;var c=xb[r(a==k?k:a)];c?b=c:(c=xb._)?b=c:e(w("IReversible.-rseq",a));return b.call(k,a)}function z(a,b){if(a?a.Nb:a)return a.Nb(0,b);var c;var d=z[r(a==k?k:a)];d?c=d:(d=z._)?c=d:e(w("IWriter.-write",a));return c.call(k,a,b)}function yb(a){if(a?a.Xb:a)return k;var b;var c=yb[r(a==k?k:a)];c?b=c:(c=yb._)?b=c:e(w("IWriter.-flush",a));return b.call(k,a)}var zb={};
function Ab(a,b,c){if(a?a.C:a)return a.C(a,b,c);var d;var f=Ab[r(a==k?k:a)];f?d=f:(f=Ab._)?d=f:e(w("IPrintWithWriter.-pr-writer",a));return d.call(k,a,b,c)}function Bb(a,b,c){if(a?a.Mb:a)return a.Mb(a,b,c);var d;var f=Bb[r(a==k?k:a)];f?d=f:(f=Bb._)?d=f:e(w("IWatchable.-notify-watches",a));return d.call(k,a,b,c)}function Cb(a){if(a?a.Ka:a)return a.Ka(a);var b;var c=Cb[r(a==k?k:a)];c?b=c:(c=Cb._)?b=c:e(w("IEditableCollection.-as-transient",a));return b.call(k,a)}
function Db(a,b){if(a?a.xa:a)return a.xa(a,b);var c;var d=Db[r(a==k?k:a)];d?c=d:(d=Db._)?c=d:e(w("ITransientCollection.-conj!",a));return c.call(k,a,b)}function Eb(a){if(a?a.Fa:a)return a.Fa(a);var b;var c=Eb[r(a==k?k:a)];c?b=c:(c=Eb._)?b=c:e(w("ITransientCollection.-persistent!",a));return b.call(k,a)}function Fb(a,b,c){if(a?a.Ea:a)return a.Ea(a,b,c);var d;var f=Fb[r(a==k?k:a)];f?d=f:(f=Fb._)?d=f:e(w("ITransientAssociative.-assoc!",a));return d.call(k,a,b,c)}
function Gb(a,b){if(a?a.vb:a)return a.vb(a,b);var c;var d=Gb[r(a==k?k:a)];d?c=d:(d=Gb._)?c=d:e(w("ITransientMap.-dissoc!",a));return c.call(k,a,b)}function Hb(a){if(a?a.Lb:a)return a.Lb(a);var b;var c=Hb[r(a==k?k:a)];c?b=c:(c=Hb._)?b=c:e(w("ITransientVector.-pop!",a));return b.call(k,a)}function Ib(a,b){if(a?a.Kb:a)return a.Kb(a,b);var c;var d=Ib[r(a==k?k:a)];d?c=d:(d=Ib._)?c=d:e(w("ITransientSet.-disjoin!",a));return c.call(k,a,b)}
function Jb(a){if(a?a.Fb:a)return a.Fb();var b;var c=Jb[r(a==k?k:a)];c?b=c:(c=Jb._)?b=c:e(w("IChunk.-drop-first",a));return b.call(k,a)}function Kb(a){if(a?a.eb:a)return a.eb(a);var b;var c=Kb[r(a==k?k:a)];c?b=c:(c=Kb._)?b=c:e(w("IChunkedSeq.-chunked-first",a));return b.call(k,a)}function Lb(a){if(a?a.Xa:a)return a.Xa(a);var b;var c=Lb[r(a==k?k:a)];c?b=c:(c=Lb._)?b=c:e(w("IChunkedSeq.-chunked-rest",a));return b.call(k,a)}function Mb(a){this.cc=a;this.t=0;this.k=1073741824}
Mb.prototype.Nb=function(a,b){return this.cc.append(b)};Mb.prototype.Xb=p(k);function Nb(a){var b=new ma,c=new Mb(b);a.C(a,c,pa());yb(c);return""+B(b)}function Ob(a,b,c,d,f){this.Ia=a;this.name=b;this.Ba=c;this.Ua=d;this.V=f;this.k=2154168321;this.t=4096}Ob.prototype.C=function(a,b){return z(b,this.Ba)};
Ob.prototype.I=function(){-1===this.Ua&&(this.Ua=Pb.a?Pb.a(C.b?C.b(this.Ia):C.call(k,this.Ia),C.b?C.b(this.name):C.call(k,this.name)):Pb.call(k,C.b?C.b(this.Ia):C.call(k,this.Ia),C.b?C.b(this.name):C.call(k,this.name)));return this.Ua};Ob.prototype.G=function(a,b){return new Ob(this.Ia,this.name,this.Ba,this.Ua,b)};Ob.prototype.D=m("V");var Qb=k,Qb=function(a,b,c){switch(arguments.length){case 2:return Qa.c(b,this,k);case 3:return Qa.c(b,this,c)}e(Error("Invalid arity: "+arguments.length))};
Ob.prototype.call=Qb;Ob.prototype.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};Ob.prototype.B=function(a,b){return b instanceof Ob?this.Ba===b.Ba:l};Ob.prototype.toString=m("Ba");function D(a){if(a==k)return k;var b;if(b=a)b=(b=a.k&8388608)?b:a.nc;if(b)return a.F(a);if(a instanceof Array||sa(a))return 0===a.length?k:new Rb(a,0);if(v(Pa,a))return ub(a);e(Error([B(a),B("is not ISeqable")].join("")))}
function E(a){if(a==k)return k;var b;if(b=a)b=(b=a.k&64)?b:a.tb;if(b)return a.Q(a);a=D(a);return a==k?k:La(a)}function F(a){if(a!=k){var b;if(b=a)b=(b=a.k&64)?b:a.tb;if(b)return a.S(a);a=D(a);return a!=k?Ma(a):G}return G}function H(a){if(a==k)a=k;else{var b;if(b=a)b=(b=a.k&128)?b:a.$a;a=b?a.W(a):D(F(a))}return a}var Sb,Tb=k;function Ub(a,b){var c=a===b;return c?c:sb(a,b)}function Vb(a,b,c){for(;;)if(t(Tb.a(a,b)))if(H(c))a=b,b=E(c),c=H(c);else return Tb.a(b,E(c));else return l}
function Wb(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return Vb.call(this,a,b,d)}Wb.m=2;Wb.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return Vb(b,c,a)};Wb.g=Vb;Tb=function(a,b,c){switch(arguments.length){case 1:return h;case 2:return Ub.call(this,a,b);default:return Wb.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};Tb.m=2;Tb.j=Wb.j;Tb.b=p(h);Tb.a=Ub;Tb.g=Wb.g;Sb=Tb;tb["null"]=p(0);Oa["null"]=h;rb["null"]=function(a,b,c){return c};
bb["null"]=h;cb["null"]=p(k);Ba["null"]=h;Ca["null"]=p(0);db["null"]=p(k);eb["null"]=p(k);sb["null"]=function(a,b){return b==k};kb["null"]=h;lb["null"]=p(k);ib["null"]=h;jb["null"]=p(k);Da["null"]=p(k);Xa["null"]=h;Ya["null"]=p(k);Date.prototype.B=function(a,b){var c=b instanceof Date;return c?a.toString()===b.toString():c};tb.number=function(a){return Math.floor(a)%2147483647};sb.number=function(a,b){return a===b};tb["boolean"]=function(a){return a===h?1:0};ib["function"]=h;jb["function"]=p(k);
Aa["function"]=h;tb._=function(a){return a[fa]||(a[fa]=++ha)};function Xb(a){this.n=a;this.t=0;this.k=32768}Xb.prototype.fb=m("n");function Yb(a){return a instanceof Xb}var Zb,$b=k;function ac(a,b){var c=Ca(a);if(0===c)return b.q?b.q():b.call(k);for(var d=y.a(a,0),f=1;;)if(f<c){d=b.a?b.a(d,y.a(a,f)):b.call(k,d,y.a(a,f));if(Yb(d))return J.b?J.b(d):J.call(k,d);f+=1}else return d}
function bc(a,b,c){for(var d=Ca(a),f=0;;)if(f<d){c=b.a?b.a(c,y.a(a,f)):b.call(k,c,y.a(a,f));if(Yb(c))return J.b?J.b(c):J.call(k,c);f+=1}else return c}function cc(a,b,c,d){for(var f=Ca(a);;)if(d<f){c=b.a?b.a(c,y.a(a,d)):b.call(k,c,y.a(a,d));if(Yb(c))return J.b?J.b(c):J.call(k,c);d+=1}else return c}$b=function(a,b,c,d){switch(arguments.length){case 2:return ac.call(this,a,b);case 3:return bc.call(this,a,b,c);case 4:return cc.call(this,a,b,c,d)}e(Error("Invalid arity: "+arguments.length))};$b.a=ac;
$b.c=bc;$b.p=cc;Zb=$b;var dc,ec=k;function fc(a,b){var c=a.length;if(0===a.length)return b.q?b.q():b.call(k);for(var d=a[0],f=1;;)if(f<c){d=b.a?b.a(d,a[f]):b.call(k,d,a[f]);if(Yb(d))return J.b?J.b(d):J.call(k,d);f+=1}else return d}function gc(a,b,c){for(var d=a.length,f=0;;)if(f<d){c=b.a?b.a(c,a[f]):b.call(k,c,a[f]);if(Yb(c))return J.b?J.b(c):J.call(k,c);f+=1}else return c}
function hc(a,b,c,d){for(var f=a.length;;)if(d<f){c=b.a?b.a(c,a[d]):b.call(k,c,a[d]);if(Yb(c))return J.b?J.b(c):J.call(k,c);d+=1}else return c}ec=function(a,b,c,d){switch(arguments.length){case 2:return fc.call(this,a,b);case 3:return gc.call(this,a,b,c);case 4:return hc.call(this,a,b,c,d)}e(Error("Invalid arity: "+arguments.length))};ec.a=fc;ec.c=gc;ec.p=hc;dc=ec;function ic(a){if(a)var b=a.k&2,a=(b?b:a.jc)?h:a.k?l:v(Ba,a);else a=v(Ba,a);return a}
function jc(a){if(a)var b=a.k&16,a=(b?b:a.Jb)?h:a.k?l:v(Ga,a);else a=v(Ga,a);return a}function Rb(a,b){this.e=a;this.r=b;this.t=0;this.k=166199550}q=Rb.prototype;q.I=function(a){return kc.b?kc.b(a):kc.call(k,a)};q.W=function(){return this.r+1<this.e.length?new Rb(this.e,this.r+1):k};q.H=function(a,b){return K.a?K.a(b,a):K.call(k,b,a)};q.Oa=function(a){var b=a.J(a);return 0<b?new lc(a,b-1,k):G};q.toString=function(){return Nb(this)};q.aa=function(a,b){return dc.p(this.e,b,this.e[this.r],this.r+1)};
q.Z=function(a,b,c){return dc.p(this.e,b,c,this.r)};q.F=ca();q.J=function(){return this.e.length-this.r};q.Q=function(){return this.e[this.r]};q.S=function(){return this.r+1<this.e.length?new Rb(this.e,this.r+1):mc.q?mc.q():mc.call(k)};q.B=function(a,b){return nc.a?nc.a(a,b):nc.call(k,a,b)};q.M=function(a,b){var c=b+this.r;return c<this.e.length?this.e[c]:k};q.P=function(a,b,c){a=b+this.r;return a<this.e.length?this.e[a]:c};q.K=function(){return G};var oc,pc=k;function qc(a){return pc.a(a,0)}
function rc(a,b){return b<a.length?new Rb(a,b):k}pc=function(a,b){switch(arguments.length){case 1:return qc.call(this,a);case 2:return rc.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};pc.b=qc;pc.a=rc;oc=pc;var I,sc=k;function tc(a){return oc.a(a,0)}function uc(a,b){return oc.a(a,b)}sc=function(a,b){switch(arguments.length){case 1:return tc.call(this,a);case 2:return uc.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};sc.b=tc;sc.a=uc;I=sc;mb.array=h;
nb.array=function(a,b){return dc.a(a,b)};nb.array=function(a,b,c){return dc.c(a,b,c)};Ba.array=h;Ca.array=function(a){return a.length};function lc(a,b,c){this.cb=a;this.r=b;this.l=c;this.t=0;this.k=31850574}q=lc.prototype;q.I=function(a){return kc.b?kc.b(a):kc.call(k,a)};q.H=function(a,b){return K.a?K.a(b,a):K.call(k,b,a)};q.toString=function(){return Nb(this)};q.F=ca();q.J=function(){return this.r+1};q.Q=function(){return y.a(this.cb,this.r)};
q.S=function(){return 0<this.r?new lc(this.cb,this.r-1,k):G};q.B=function(a,b){return nc.a?nc.a(a,b):nc.call(k,a,b)};q.G=function(a,b){return new lc(this.cb,this.r,b)};q.D=m("l");q.K=function(){return N.a?N.a(G,this.l):N.call(k,G,this.l)};function vc(a){for(;;){var b=H(a);if(b!=k)a=b;else return E(a)}}sb._=function(a,b){return a===b};var wc,xc=k;function yc(a,b){return a!=k?Fa(a,b):mc.b?mc.b(b):mc.call(k,b)}function zc(a,b,c){for(;;)if(t(c))a=xc.a(a,b),b=E(c),c=H(c);else return xc.a(a,b)}
function Ac(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return zc.call(this,a,b,d)}Ac.m=2;Ac.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return zc(b,c,a)};Ac.g=zc;xc=function(a,b,c){switch(arguments.length){case 2:return yc.call(this,a,b);default:return Ac.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};xc.m=2;xc.j=Ac.j;xc.a=yc;xc.g=Ac.g;wc=xc;
function O(a){if(ic(a))a=Ca(a);else a:{for(var a=D(a),b=0;;){if(ic(a)){a=b+Ca(a);break a}a=H(a);b+=1}a=ba}return a}var Bc,Cc=k;function Dc(a,b){for(;;){a==k&&e(Error("Index out of bounds"));if(0===b){if(D(a))return E(a);e(Error("Index out of bounds"))}if(jc(a))return y.a(a,b);if(D(a))var c=H(a),d=b-1,a=c,b=d;else e(Error("Index out of bounds"))}}function Ec(a,b,c){for(;;){if(a==k)return c;if(0===b)return D(a)?E(a):c;if(jc(a))return y.c(a,b,c);if(D(a))a=H(a),b-=1;else return c}}
Cc=function(a,b,c){switch(arguments.length){case 2:return Dc.call(this,a,b);case 3:return Ec.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};Cc.a=Dc;Cc.c=Ec;Bc=Cc;var P,Fc=k;function Gc(a,b){var c;if(a==k)c=k;else{if(c=a)c=(c=a.k&16)?c:a.Jb;c=c?a.M(a,Math.floor(b)):a instanceof Array?b<a.length?a[b]:k:sa(a)?b<a.length?a[b]:k:Bc.a(a,Math.floor(b))}return c}
function Hc(a,b,c){if(a!=k){var d;if(d=a)d=(d=a.k&16)?d:a.Jb;a=d?a.P(a,Math.floor(b),c):a instanceof Array?b<a.length?a[b]:c:sa(a)?b<a.length?a[b]:c:Bc.c(a,Math.floor(b),c)}else a=c;return a}Fc=function(a,b,c){switch(arguments.length){case 2:return Gc.call(this,a,b);case 3:return Hc.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};Fc.a=Gc;Fc.c=Hc;P=Fc;var Q,Ic=k;
function Jc(a,b){var c;if(a==k)c=k;else{if(c=a)c=(c=a.k&256)?c:a.Ya;c=c?a.N(a,b):a instanceof Array?b<a.length?a[b]:k:sa(a)?b<a.length?a[b]:k:v(Pa,a)?Qa.a(a,b):k}return c}function Kc(a,b,c){if(a!=k){var d;if(d=a)d=(d=a.k&256)?d:a.Ya;a=d?a.A(a,b,c):a instanceof Array?b<a.length?a[b]:c:sa(a)?b<a.length?a[b]:c:v(Pa,a)?Qa.c(a,b,c):c}else a=c;return a}Ic=function(a,b,c){switch(arguments.length){case 2:return Jc.call(this,a,b);case 3:return Kc.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};
Ic.a=Jc;Ic.c=Kc;Q=Ic;var R,Lc=k;function Mc(a,b,c){return a!=k?Wa(a,b,c):Nc.a?Nc.a(b,c):Nc.call(k,b,c)}function Oc(a,b,c,d){for(;;)if(a=Lc.c(a,b,c),t(d))b=E(d),c=E(H(d)),d=H(H(d));else return a}function Pc(a,b,c,d){var f=k;3<arguments.length&&(f=I(Array.prototype.slice.call(arguments,3),0));return Oc.call(this,a,b,c,f)}Pc.m=3;Pc.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=F(a);return Oc(b,c,d,a)};Pc.g=Oc;
Lc=function(a,b,c,d){switch(arguments.length){case 3:return Mc.call(this,a,b,c);default:return Pc.g(a,b,c,I(arguments,3))}e(Error("Invalid arity: "+arguments.length))};Lc.m=3;Lc.j=Pc.j;Lc.c=Mc;Lc.g=Pc.g;R=Lc;var Qc,Rc=k;function Sc(a,b,c){for(;;)if(a=Rc.a(a,b),t(c))b=E(c),c=H(c);else return a}function Tc(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return Sc.call(this,a,b,d)}Tc.m=2;Tc.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return Sc(b,c,a)};Tc.g=Sc;
Rc=function(a,b,c){switch(arguments.length){case 1:return a;case 2:return Ya(a,b);default:return Tc.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};Rc.m=2;Rc.j=Tc.j;Rc.b=ca();Rc.a=function(a,b){return Ya(a,b)};Rc.g=Tc.g;Qc=Rc;function Uc(a){var b="function"==r(a);return b?b:a?t(t(k)?k:a.Pb)?h:a.yb?l:v(Aa,a):v(Aa,a)}
var N=function Vc(b,c){var d;if(d=Uc(b))d=b?((d=b.k&262144)?d:b.rc)||(b.k?0:v(kb,b)):v(kb,b),d=!d;if(d){if(ba===oa){oa={};oa=function(b,c,d,f){this.l=b;this.zb=c;this.fc=d;this.Zb=f;this.t=0;this.k=393217};oa.ab=h;oa.xb="cljs.core/t3624";oa.wb=function(b,c){return z(c,"cljs.core/t3624")};var f=function(b,c){return S.a?S.a(b.zb,c):S.call(k,b.zb,c)};d=function(b,c){var b=this,d=k;1<arguments.length&&(d=I(Array.prototype.slice.call(arguments,1),0));return f.call(this,b,d)};d.m=1;d.j=function(b){var c=
E(b),b=F(b);return f(c,b)};d.g=f;oa.prototype.call=d;oa.prototype.apply=function(b,c){b=this;return b.call.apply(b,[b].concat(c.slice()))};oa.prototype.Pb=h;oa.prototype.D=m("Zb");oa.prototype.G=function(b,c){return new oa(this.l,this.zb,this.fc,c)}}d=new oa(c,b,Vc,k);d=Vc(d,c)}else d=lb(b,c);return d};function Wc(a){var b;b=a?((b=a.k&131072)?b:a.Ub)||(a.k?0:v(ib,a)):v(ib,a);return b?jb(a):k}var Xc,Yc=k;function Zc(a,b,c){for(;;)if(a=Yc.a(a,b),t(c))b=E(c),c=H(c);else return a}
function $c(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return Zc.call(this,a,b,d)}$c.m=2;$c.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return Zc(b,c,a)};$c.g=Zc;Yc=function(a,b,c){switch(arguments.length){case 1:return a;case 2:return cb(a,b);default:return $c.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};Yc.m=2;Yc.j=$c.j;Yc.b=ca();Yc.a=function(a,b){return cb(a,b)};Yc.g=$c.g;Xc=Yc;var ad={},bd=0,C,cd=k;
function dd(a){return cd.a(a,h)}function ed(a,b){var c;((c=ea(a))?b:c)?(255<bd&&(ad={},bd=0),c=ad[a],"number"!==typeof c&&(c=ia(a),ad[a]=c,bd+=1)):c=tb(a);return c}cd=function(a,b){switch(arguments.length){case 1:return dd.call(this,a);case 2:return ed.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};cd.b=dd;cd.a=ed;C=cd;function fd(a){var b=a==k;return b?b:ra(D(a))}function gd(a){if(a==k)a=l;else if(a)var b=a.k&8,a=(b?b:a.ic)?h:a.k?l:v(Ea,a);else a=v(Ea,a);return a}
function hd(a){if(a==k)a=l;else if(a)var b=a.k&4096,a=(b?b:a.pc)?h:a.k?l:v(bb,a);else a=v(bb,a);return a}function id(a){if(a)var b=a.k&16777216,a=(b?b:a.oc)?h:a.k?l:v(vb,a);else a=v(vb,a);return a}function jd(a){if(a==k)a=l;else if(a)var b=a.k&1024,a=(b?b:a.lc)?h:a.k?l:v(Xa,a);else a=v(Xa,a);return a}function kd(a){if(a)var b=a.k&16384,a=(b?b:a.qc)?h:a.k?l:v(fb,a);else a=v(fb,a);return a}function ld(a){var b=a instanceof md;return b?b:a instanceof nd}
function od(a,b,c,d,f){for(;0!==f;)c[d]=a[b],d+=1,f-=1,b+=1}var pd={};function qd(a){if(a==k)a=l;else if(a)var b=a.k&64,a=(b?b:a.tb)?h:a.k?l:v(Ka,a);else a=v(Ka,a);return a}function rd(a){var b=ea(a);return b?"\ufdd0"===a.charAt(0):b}function sd(a,b){return Q.c(a,b,pd)===pd?l:h}
function td(a,b){if(a===b)return 0;if(a==k)return-1;if(b==k)return 1;if((a==k?k:a.constructor)===(b==k?k:b.constructor)){var c;if(c=a)c=(c=a.t&2048)?c:a.Hb;return c?a.Ib(a,b):ka(a,b)}e(Error("compare on non-nil objects of different types"))}var ud,vd=k;function wd(a,b){var c=O(a),d=O(b);return c<d?-1:c>d?1:vd.p(a,b,c,0)}function xd(a,b,c,d){for(;;){var f=td(P.a(a,d),P.a(b,d)),g=0===f;if(g?d+1<c:g)d+=1;else return f}}
vd=function(a,b,c,d){switch(arguments.length){case 2:return wd.call(this,a,b);case 4:return xd.call(this,a,b,c,d)}e(Error("Invalid arity: "+arguments.length))};vd.a=wd;vd.p=xd;ud=vd;function yd(a){return Sb.a(a,td)?td:function(b,c){var d=a.a?a.a(b,c):a.call(k,b,c);return"number"===typeof d?d:t(d)?-1:t(a.a?a.a(c,b):a.call(k,c,b))?1:0}}var zd,Ad=k;function Bd(a){return Ad.a(td,a)}
function Cd(a,b){if(D(b)){for(var c=Dd.b?Dd.b(b):Dd.call(k,b),d=yd(a),f=0;f<c.length;f++)c[f]={index:f,value:c[f]};var g=d||ka;ja.sort.call(c,function(a,b){return g(a.value,b.value)||a.index-b.index}||ka);for(f=0;f<c.length;f++)c[f]=c[f].value;return D(c)}return G}Ad=function(a,b){switch(arguments.length){case 1:return Bd.call(this,a);case 2:return Cd.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};Ad.b=Bd;Ad.a=Cd;zd=Ad;var Ed,Fd=k;function Hd(a,b){return Fd.c(a,td,b)}
function Id(a,b,c){return zd.a(function(c,f){return yd(b).call(k,a.b?a.b(c):a.call(k,c),a.b?a.b(f):a.call(k,f))},c)}Fd=function(a,b,c){switch(arguments.length){case 2:return Hd.call(this,a,b);case 3:return Id.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};Fd.a=Hd;Fd.c=Id;Ed=Fd;var Jd,Kd=k;function Ld(a,b){var c=D(b);return c?x.c?x.c(a,E(c),H(c)):x.call(k,a,E(c),H(c)):a.q?a.q():a.call(k)}
function Md(a,b,c){for(c=D(c);;)if(c){b=a.a?a.a(b,E(c)):a.call(k,b,E(c));if(Yb(b))return J.b?J.b(b):J.call(k,b);c=H(c)}else return b}Kd=function(a,b,c){switch(arguments.length){case 2:return Ld.call(this,a,b);case 3:return Md.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};Kd.a=Ld;Kd.c=Md;Jd=Kd;var x,Nd=k;function Od(a,b){var c;if(c=b)c=(c=b.k&524288)?c:b.Wb;return c?b.aa(b,a):b instanceof Array?dc.a(b,a):sa(b)?dc.a(b,a):v(mb,b)?nb.a(b,a):Jd.a(a,b)}
function Pd(a,b,c){var d;if(d=c)d=(d=c.k&524288)?d:c.Wb;return d?c.Z(c,a,b):c instanceof Array?dc.c(c,a,b):sa(c)?dc.c(c,a,b):v(mb,c)?nb.c(c,a,b):Jd.c(a,b,c)}Nd=function(a,b,c){switch(arguments.length){case 2:return Od.call(this,a,b);case 3:return Pd.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};Nd.a=Od;Nd.c=Pd;x=Nd;function Qd(a){return a-1}
function Rd(a){return 0<=(a-a%2)/2?Math.floor.b?Math.floor.b((a-a%2)/2):Math.floor.call(k,(a-a%2)/2):Math.ceil.b?Math.ceil.b((a-a%2)/2):Math.ceil.call(k,(a-a%2)/2)}function Sd(a){a-=a>>1&1431655765;a=(a&858993459)+(a>>2&858993459);return 16843009*(a+(a>>4)&252645135)>>24}function Td(a){for(var b=1,a=D(a);;){var c=a;if(t(c?0<b:c))b-=1,a=H(a);else return a}}var Ud,Vd=k;function Wd(a){return a==k?"":a.toString()}
function Xd(a,b){return function(a,b){for(;;)if(t(b))var f=a.append(Vd.b(E(b))),g=H(b),a=f,b=g;else return Vd.b(a)}.call(k,new ma(Vd.b(a)),b)}function Yd(a,b){var c=k;1<arguments.length&&(c=I(Array.prototype.slice.call(arguments,1),0));return Xd.call(this,a,c)}Yd.m=1;Yd.j=function(a){var b=E(a),a=F(a);return Xd(b,a)};Yd.g=Xd;Vd=function(a,b){switch(arguments.length){case 0:return"";case 1:return Wd.call(this,a);default:return Yd.g(a,I(arguments,1))}e(Error("Invalid arity: "+arguments.length))};
Vd.m=1;Vd.j=Yd.j;Vd.q=p("");Vd.b=Wd;Vd.g=Yd.g;Ud=Vd;var B,Zd=k;function $d(a){return rd(a)?Ud.g(":",I([a.substring(2,a.length)],0)):a==k?"":a.toString()}function ae(a,b){return function(a,b){for(;;)if(t(b))var f=a.append(Zd.b(E(b))),g=H(b),a=f,b=g;else return Ud.b(a)}.call(k,new ma(Zd.b(a)),b)}function be(a,b){var c=k;1<arguments.length&&(c=I(Array.prototype.slice.call(arguments,1),0));return ae.call(this,a,c)}be.m=1;be.j=function(a){var b=E(a),a=F(a);return ae(b,a)};be.g=ae;
Zd=function(a,b){switch(arguments.length){case 0:return"";case 1:return $d.call(this,a);default:return be.g(a,I(arguments,1))}e(Error("Invalid arity: "+arguments.length))};Zd.m=1;Zd.j=be.j;Zd.q=p("");Zd.b=$d;Zd.g=be.g;B=Zd;var ce,de=k,de=function(a,b,c){switch(arguments.length){case 2:return a.substring(b);case 3:return a.substring(b,c)}e(Error("Invalid arity: "+arguments.length))};de.a=function(a,b){return a.substring(b)};de.c=function(a,b,c){return a.substring(b,c)};ce=de;var ee,fe=k;
function ge(a){return rd(a)?a:a instanceof Ob?Ud.g("\ufdd0",I([":",he.b?he.b(a):he.call(k,a)],0)):Ud.g("\ufdd0",I([":",a],0))}function ie(a,b){return fe.b(Ud.g(a,I(["/",b],0)))}fe=function(a,b){switch(arguments.length){case 1:return ge.call(this,a);case 2:return ie.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};fe.b=ge;fe.a=ie;ee=fe;
function nc(a,b){var c;if(id(b))a:{c=D(a);for(var d=D(b);;){if(c==k){c=d==k;break a}if(d!=k&&Sb.a(E(c),E(d)))c=H(c),d=H(d);else{c=l;break a}}c=ba}else c=k;return t(c)?h:l}function Pb(a,b){return a^b+2654435769+(a<<6)+(a>>2)}function kc(a){return x.c(function(a,c){return Pb(a,C.a(c,l))},C.a(E(a),l),H(a))}function je(a){for(var b=0,a=D(a);;)if(a)var c=E(a),b=(b+(C.b(ke.b?ke.b(c):ke.call(k,c))^C.b(le.b?le.b(c):le.call(k,c))))%4503599627370496,a=H(a);else return b}
function me(a){for(var b=0,a=D(a);;)if(a)var c=E(a),b=(b+C.b(c))%4503599627370496,a=H(a);else return b}function ne(a,b,c,d,f){this.l=a;this.Ha=b;this.pa=c;this.count=d;this.o=f;this.t=0;this.k=65937646}q=ne.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};q.W=function(){return 1===this.count?k:this.pa};q.H=function(a,b){return new ne(this.l,b,a,this.count+1,k)};q.toString=function(){return Nb(this)};q.aa=function(a,b){return Jd.a(b,a)};q.Z=function(a,b,c){return Jd.c(b,c,a)};
q.F=ca();q.J=m("count");q.va=m("Ha");q.wa=function(a){return a.S(a)};q.Q=m("Ha");q.S=function(){return 1===this.count?G:this.pa};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new ne(b,this.Ha,this.pa,this.count,this.o)};q.D=m("l");q.K=function(){return G};function oe(a){this.l=a;this.t=0;this.k=65413326}q=oe.prototype;q.I=p(0);q.W=p(k);q.H=function(a,b){return new ne(this.l,b,k,1,k)};q.toString=function(){return Nb(this)};q.F=p(k);q.J=p(0);q.va=p(k);q.wa=function(){e(Error("Can't pop empty list"))};
q.Q=p(k);q.S=function(){return G};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new oe(b)};q.D=m("l");q.K=ca();var G=new oe(k);function pe(a){var b;b=a?((b=a.k&134217728)?b:a.mc)||(a.k?0:v(wb,a)):v(wb,a);return b?xb(a):x.c(wc,G,a)}var mc;function qe(a){var b;if(a instanceof Rb)b=a.e;else a:{for(b=[];;)if(a!=k)b.push(a.Q(a)),a=a.W(a);else break a;b=ba}for(var a=b.length,c=G;;)if(0<a)var d=a-1,c=c.H(c,b[a-1]),a=d;else return c}
function re(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return qe.call(this,b)}re.m=0;re.j=function(a){a=D(a);return qe(a)};re.g=qe;mc=re;function se(a,b,c,d){this.l=a;this.Ha=b;this.pa=c;this.o=d;this.t=0;this.k=65405164}q=se.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};q.W=function(){return this.pa==k?k:ub(this.pa)};q.H=function(a,b){return new se(k,b,a,this.o)};q.toString=function(){return Nb(this)};q.F=ca();q.Q=m("Ha");
q.S=function(){return this.pa==k?G:this.pa};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new se(b,this.Ha,this.pa,this.o)};q.D=m("l");q.K=function(){return N(G,this.l)};function K(a,b){var c=b==k;if(!c&&(c=b))c=(c=b.k&64)?c:b.tb;return c?new se(k,a,b,k):new se(k,a,D(b),k)}Ba.string=h;Ca.string=function(a){return a.length};tb.string=function(a){return ia(a)};function te(a){this.Ob=a;this.t=0;this.k=1}
var ue=k,ue=function(a,b,c){switch(arguments.length){case 2:var d=a,d=this;if(b==k)d=k;else{var f;f=b?((f=b.k&256)?f:b.Ya)||(b.k?0:v(Pa,b)):v(Pa,b);d=f?Qa.c(b,d.Ob,k):k}return d;case 3:return d=a,d=this,b==k?d=c:(f=b?((f=b.k&256)?f:b.Ya)||(b.k?0:v(Pa,b)):v(Pa,b),d=f?Qa.c(b,d.Ob,c):k),d}e(Error("Invalid arity: "+arguments.length))};te.prototype.call=ue;te.prototype.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};
var ve=k,ve=function(a,b,c){switch(arguments.length){case 2:return Q.a(b,this.toString());case 3:return Q.c(b,this.toString(),c)}e(Error("Invalid arity: "+arguments.length))};String.prototype.call=ve;String.prototype.apply=function(a,b){return a.call.apply(a,[a].concat(b.slice()))};String.prototype.apply=function(a,b){return 2>b.length?Q.a(b[0],a):Q.c(b[0],a,b[1])};function we(a){var b=a.x;if(a.Ab)return b;a.x=b.q?b.q():b.call(k);a.Ab=h;return a.x}
function T(a,b,c,d){this.l=a;this.Ab=b;this.x=c;this.o=d;this.t=0;this.k=31850700}q=T.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};q.W=function(a){return ub(a.S(a))};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.F=function(a){return D(we(a))};q.Q=function(a){return E(we(a))};q.S=function(a){return F(we(a))};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new T(b,this.Ab,this.x,this.o)};q.D=m("l");q.K=function(){return N(G,this.l)};
function xe(a,b){this.bb=a;this.end=b;this.t=0;this.k=2}xe.prototype.J=m("end");xe.prototype.add=function(a){this.bb[this.end]=a;return this.end+=1};xe.prototype.la=function(){var a=new ye(this.bb,0,this.end);this.bb=k;return a};function ye(a,b,c){this.e=a;this.R=b;this.end=c;this.t=0;this.k=524306}q=ye.prototype;q.aa=function(a,b){return dc.p(this.e,b,this.e[this.R],this.R+1)};q.Z=function(a,b,c){return dc.p(this.e,b,c,this.R)};
q.Fb=function(){this.R===this.end&&e(Error("-drop-first of empty chunk"));return new ye(this.e,this.R+1,this.end)};q.M=function(a,b){return this.e[this.R+b]};q.P=function(a,b,c){return((a=0<=b)?b<this.end-this.R:a)?this.e[this.R+b]:c};q.J=function(){return this.end-this.R};var ze,Ae=k;function Be(a){return new ye(a,0,a.length)}function Ce(a,b){return new ye(a,b,a.length)}function De(a,b,c){return new ye(a,b,c)}
Ae=function(a,b,c){switch(arguments.length){case 1:return Be.call(this,a);case 2:return Ce.call(this,a,b);case 3:return De.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};Ae.b=Be;Ae.a=Ce;Ae.c=De;ze=Ae;function md(a,b,c,d){this.la=a;this.ua=b;this.l=c;this.o=d;this.k=31850604;this.t=1536}q=md.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.F=ca();q.Q=function(){return y.a(this.la,0)};
q.S=function(){return 1<Ca(this.la)?new md(Jb(this.la),this.ua,this.l,k):this.ua==k?G:this.ua};q.Gb=function(){return this.ua==k?k:this.ua};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new md(this.la,this.ua,b,this.o)};q.D=m("l");q.K=function(){return N(G,this.l)};q.eb=m("la");q.Xa=function(){return this.ua==k?G:this.ua};function Ee(a,b){return 0===Ca(a)?b:new md(a,b,k,k)}function Dd(a){for(var b=[];;)if(D(a))b.push(E(a)),a=H(a);else return b}
function Fe(a,b){if(ic(a))return O(a);for(var c=a,d=b,f=0;;){var g;g=(g=0<d)?D(c):g;if(t(g))c=H(c),d-=1,f+=1;else return f}}var He=function Ge(b){return b==k?k:H(b)==k?D(E(b)):K(E(b),Ge(H(b)))},Ie,Je=k;function Ke(){return new T(k,l,p(k),k)}function Le(a){return new T(k,l,function(){return a},k)}function Me(a,b){return new T(k,l,function(){var c=D(a);return c?ld(c)?Ee(Kb(c),Je.a(Lb(c),b)):K(E(c),Je.a(F(c),b)):b},k)}
function Ne(a,b,c){return function f(a,b){return new T(k,l,function(){var c=D(a);return c?ld(c)?Ee(Kb(c),f(Lb(c),b)):K(E(c),f(F(c),b)):t(b)?f(E(b),H(b)):k},k)}(Je.a(a,b),c)}function Oe(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return Ne.call(this,a,b,d)}Oe.m=2;Oe.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return Ne(b,c,a)};Oe.g=Ne;
Je=function(a,b,c){switch(arguments.length){case 0:return Ke.call(this);case 1:return Le.call(this,a);case 2:return Me.call(this,a,b);default:return Oe.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};Je.m=2;Je.j=Oe.j;Je.q=Ke;Je.b=Le;Je.a=Me;Je.g=Oe.g;Ie=Je;var Pe,Qe=k;function Re(a,b,c){return K(a,K(b,c))}function Se(a,b,c,d){return K(a,K(b,K(c,d)))}function Te(a,b,c,d,f){return K(a,K(b,K(c,K(d,He(f)))))}
function Ue(a,b,c,d,f){var g=k;4<arguments.length&&(g=I(Array.prototype.slice.call(arguments,4),0));return Te.call(this,a,b,c,d,g)}Ue.m=4;Ue.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=H(a),f=E(a),a=F(a);return Te(b,c,d,f,a)};Ue.g=Te;Qe=function(a,b,c,d,f){switch(arguments.length){case 1:return D(a);case 2:return K(a,b);case 3:return Re.call(this,a,b,c);case 4:return Se.call(this,a,b,c,d);default:return Ue.g(a,b,c,d,I(arguments,4))}e(Error("Invalid arity: "+arguments.length))};Qe.m=4;
Qe.j=Ue.j;Qe.b=function(a){return D(a)};Qe.a=function(a,b){return K(a,b)};Qe.c=Re;Qe.p=Se;Qe.g=Ue.g;Pe=Qe;function Ve(a){return Eb(a)}function We(a,b,c){return Fb(a,b,c)}
function Xe(a,b,c){var d=D(c);if(0===b)return a.q?a.q():a.call(k);var c=La(d),f=Ma(d);if(1===b)return a.b?a.b(c):a.b?a.b(c):a.call(k,c);var d=La(f),g=Ma(f);if(2===b)return a.a?a.a(c,d):a.a?a.a(c,d):a.call(k,c,d);var f=La(g),i=Ma(g);if(3===b)return a.c?a.c(c,d,f):a.c?a.c(c,d,f):a.call(k,c,d,f);var g=La(i),j=Ma(i);if(4===b)return a.p?a.p(c,d,f,g):a.p?a.p(c,d,f,g):a.call(k,c,d,f,g);i=La(j);j=Ma(j);if(5===b)return a.z?a.z(c,d,f,g,i):a.z?a.z(c,d,f,g,i):a.call(k,c,d,f,g,i);var a=La(j),n=Ma(j);if(6===b)return a.ea?
a.ea(c,d,f,g,i,a):a.ea?a.ea(c,d,f,g,i,a):a.call(k,c,d,f,g,i,a);var j=La(n),u=Ma(n);if(7===b)return a.Da?a.Da(c,d,f,g,i,a,j):a.Da?a.Da(c,d,f,g,i,a,j):a.call(k,c,d,f,g,i,a,j);var n=La(u),A=Ma(u);if(8===b)return a.rb?a.rb(c,d,f,g,i,a,j,n):a.rb?a.rb(c,d,f,g,i,a,j,n):a.call(k,c,d,f,g,i,a,j,n);var u=La(A),L=Ma(A);if(9===b)return a.sb?a.sb(c,d,f,g,i,a,j,n,u):a.sb?a.sb(c,d,f,g,i,a,j,n,u):a.call(k,c,d,f,g,i,a,j,n,u);var A=La(L),M=Ma(L);if(10===b)return a.gb?a.gb(c,d,f,g,i,a,j,n,u,A):a.gb?a.gb(c,d,f,g,i,a,
j,n,u,A):a.call(k,c,d,f,g,i,a,j,n,u,A);var L=La(M),W=Ma(M);if(11===b)return a.hb?a.hb(c,d,f,g,i,a,j,n,u,A,L):a.hb?a.hb(c,d,f,g,i,a,j,n,u,A,L):a.call(k,c,d,f,g,i,a,j,n,u,A,L);var M=La(W),aa=Ma(W);if(12===b)return a.ib?a.ib(c,d,f,g,i,a,j,n,u,A,L,M):a.ib?a.ib(c,d,f,g,i,a,j,n,u,A,L,M):a.call(k,c,d,f,g,i,a,j,n,u,A,L,M);var W=La(aa),ga=Ma(aa);if(13===b)return a.jb?a.jb(c,d,f,g,i,a,j,n,u,A,L,M,W):a.jb?a.jb(c,d,f,g,i,a,j,n,u,A,L,M,W):a.call(k,c,d,f,g,i,a,j,n,u,A,L,M,W);var aa=La(ga),na=Ma(ga);if(14===b)return a.kb?
a.kb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa):a.kb?a.kb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa):a.call(k,c,d,f,g,i,a,j,n,u,A,L,M,W,aa);var ga=La(na),va=Ma(na);if(15===b)return a.lb?a.lb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga):a.lb?a.lb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga):a.call(k,c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga);var na=La(va),Na=Ma(va);if(16===b)return a.mb?a.mb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na):a.mb?a.mb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na):a.call(k,c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na);var va=La(Na),wa=Ma(Na);if(17===b)return a.nb?
a.nb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va):a.nb?a.nb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va):a.call(k,c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va);var Na=La(wa),Gd=Ma(wa);if(18===b)return a.ob?a.ob(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va,Na):a.ob?a.ob(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va,Na):a.call(k,c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va,Na);wa=La(Gd);Gd=Ma(Gd);if(19===b)return a.pb?a.pb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va,Na,wa):a.pb?a.pb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va,Na,wa):a.call(k,c,d,f,g,
i,a,j,n,u,A,L,M,W,aa,ga,na,va,Na,wa);var Pf=La(Gd);Ma(Gd);if(20===b)return a.qb?a.qb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va,Na,wa,Pf):a.qb?a.qb(c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va,Na,wa,Pf):a.call(k,c,d,f,g,i,a,j,n,u,A,L,M,W,aa,ga,na,va,Na,wa,Pf);e(Error("Only up to 20 arguments supported on functions"))}var S,Ye=k;function Ze(a,b){var c=a.m;if(a.j){var d=Fe(b,c+1);return d<=c?Xe(a,d,b):a.j(b)}return a.apply(a,Dd(b))}
function $e(a,b,c){b=Pe.a(b,c);c=a.m;if(a.j){var d=Fe(b,c+1);return d<=c?Xe(a,d,b):a.j(b)}return a.apply(a,Dd(b))}function af(a,b,c,d){b=Pe.c(b,c,d);c=a.m;return a.j?(d=Fe(b,c+1),d<=c?Xe(a,d,b):a.j(b)):a.apply(a,Dd(b))}function bf(a,b,c,d,f){b=Pe.p(b,c,d,f);c=a.m;return a.j?(d=Fe(b,c+1),d<=c?Xe(a,d,b):a.j(b)):a.apply(a,Dd(b))}function cf(a,b,c,d,f,g){b=K(b,K(c,K(d,K(f,He(g)))));c=a.m;return a.j?(d=Fe(b,c+1),d<=c?Xe(a,d,b):a.j(b)):a.apply(a,Dd(b))}
function df(a,b,c,d,f,g){var i=k;5<arguments.length&&(i=I(Array.prototype.slice.call(arguments,5),0));return cf.call(this,a,b,c,d,f,i)}df.m=5;df.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=H(a),f=E(a),a=H(a),g=E(a),a=F(a);return cf(b,c,d,f,g,a)};df.g=cf;
Ye=function(a,b,c,d,f,g){switch(arguments.length){case 2:return Ze.call(this,a,b);case 3:return $e.call(this,a,b,c);case 4:return af.call(this,a,b,c,d);case 5:return bf.call(this,a,b,c,d,f);default:return df.g(a,b,c,d,f,I(arguments,5))}e(Error("Invalid arity: "+arguments.length))};Ye.m=5;Ye.j=df.j;Ye.a=Ze;Ye.c=$e;Ye.p=af;Ye.z=bf;Ye.g=df.g;S=Ye;function ef(a,b){for(;;){if(D(b)==k)return h;if(t(a.b?a.b(E(b)):a.call(k,E(b))))var c=a,d=H(b),a=c,b=d;else return l}}function ff(a){return a}
function gf(a){function b(a,b,d){var j=k;2<arguments.length&&(j=I(Array.prototype.slice.call(arguments,2),0));return c.call(this,a,b,j)}function c(b,c,d){return ra(S.p(a,b,c,d))}var d=k;b.m=2;b.j=function(a){var b=E(a),a=H(a),d=E(a),a=F(a);return c(b,d,a)};b.g=c;d=function(c,d,i){switch(arguments.length){case 0:return ra(a.q?a.q():a.call(k));case 1:return ra(a.b?a.b(c):a.call(k,c));case 2:return ra(a.a?a.a(c,d):a.call(k,c,d));default:return b.g(c,d,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};
d.m=2;d.j=b.j;return d}var hf,jf=k;
function kf(a,b){function c(a,b,c,f){var u=k;3<arguments.length&&(u=I(Array.prototype.slice.call(arguments,3),0));return d.call(this,a,b,c,u)}function d(c,d,f,n){return a.b?a.b(S.z(b,c,d,f,n)):a.call(k,S.z(b,c,d,f,n))}var f=k;c.m=3;c.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),f=E(a),a=F(a);return d(b,c,f,a)};c.g=d;f=function(d,f,j,n){switch(arguments.length){case 0:return a.b?a.b(b.q?b.q():b.call(k)):a.call(k,b.q?b.q():b.call(k));case 1:return a.b?a.b(b.b?b.b(d):b.call(k,d)):a.call(k,b.b?b.b(d):
b.call(k,d));case 2:return a.b?a.b(b.a?b.a(d,f):b.call(k,d,f)):a.call(k,b.a?b.a(d,f):b.call(k,d,f));case 3:return a.b?a.b(b.c?b.c(d,f,j):b.call(k,d,f,j)):a.call(k,b.c?b.c(d,f,j):b.call(k,d,f,j));default:return c.g(d,f,j,I(arguments,3))}e(Error("Invalid arity: "+arguments.length))};f.m=3;f.j=c.j;return f}
function lf(a,b,c){function d(a,b,c,d){var g=k;3<arguments.length&&(g=I(Array.prototype.slice.call(arguments,3),0));return f.call(this,a,b,c,g)}function f(d,f,g,u){return a.b?a.b(b.b?b.b(S.z(c,d,f,g,u)):b.call(k,S.z(c,d,f,g,u))):a.call(k,b.b?b.b(S.z(c,d,f,g,u)):b.call(k,S.z(c,d,f,g,u)))}var g=k;d.m=3;d.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=F(a);return f(b,c,d,a)};d.g=f;g=function(f,g,n,u){switch(arguments.length){case 0:return a.b?a.b(b.b?b.b(c.q?c.q():c.call(k)):b.call(k,c.q?c.q():
c.call(k))):a.call(k,b.b?b.b(c.q?c.q():c.call(k)):b.call(k,c.q?c.q():c.call(k)));case 1:return a.b?a.b(b.b?b.b(c.b?c.b(f):c.call(k,f)):b.call(k,c.b?c.b(f):c.call(k,f))):a.call(k,b.b?b.b(c.b?c.b(f):c.call(k,f)):b.call(k,c.b?c.b(f):c.call(k,f)));case 2:return a.b?a.b(b.b?b.b(c.a?c.a(f,g):c.call(k,f,g)):b.call(k,c.a?c.a(f,g):c.call(k,f,g))):a.call(k,b.b?b.b(c.a?c.a(f,g):c.call(k,f,g)):b.call(k,c.a?c.a(f,g):c.call(k,f,g)));case 3:return a.b?a.b(b.b?b.b(c.c?c.c(f,g,n):c.call(k,f,g,n)):b.call(k,c.c?c.c(f,
g,n):c.call(k,f,g,n))):a.call(k,b.b?b.b(c.c?c.c(f,g,n):c.call(k,f,g,n)):b.call(k,c.c?c.c(f,g,n):c.call(k,f,g,n)));default:return d.g(f,g,n,I(arguments,3))}e(Error("Invalid arity: "+arguments.length))};g.m=3;g.j=d.j;return g}
function mf(a,b,c,d){function f(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return g.call(this,b)}function g(a){for(var a=S.a(E(i),a),b=H(i);;)if(b)a=E(b).call(k,a),b=H(b);else return a}var i=pe(Pe.p(a,b,c,d));f.m=0;f.j=function(a){a=D(a);return g(a)};f.g=g;return f}function nf(a,b,c,d){var f=k;3<arguments.length&&(f=I(Array.prototype.slice.call(arguments,3),0));return mf.call(this,a,b,c,f)}nf.m=3;
nf.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=F(a);return mf(b,c,d,a)};nf.g=mf;jf=function(a,b,c,d){switch(arguments.length){case 0:return ff;case 1:return a;case 2:return kf.call(this,a,b);case 3:return lf.call(this,a,b,c);default:return nf.g(a,b,c,I(arguments,3))}e(Error("Invalid arity: "+arguments.length))};jf.m=3;jf.j=nf.j;jf.q=function(){return ff};jf.b=ca();jf.a=kf;jf.c=lf;jf.g=nf.g;hf=jf;var of,pf=k;
function qf(a,b){function c(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return d.call(this,b)}function d(c){return S.c(a,b,c)}c.m=0;c.j=function(a){a=D(a);return d(a)};c.g=d;return c}function rf(a,b,c){function d(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return f.call(this,b)}function f(d){return S.p(a,b,c,d)}d.m=0;d.j=function(a){a=D(a);return f(a)};d.g=f;return d}
function sf(a,b,c,d){function f(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return g.call(this,b)}function g(f){return S.z(a,b,c,d,f)}f.m=0;f.j=function(a){a=D(a);return g(a)};f.g=g;return f}function tf(a,b,c,d,f){function g(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return i.call(this,b)}function i(g){return S.z(a,b,c,d,Ie.a(f,g))}g.m=0;g.j=function(a){a=D(a);return i(a)};g.g=i;return g}
function uf(a,b,c,d,f){var g=k;4<arguments.length&&(g=I(Array.prototype.slice.call(arguments,4),0));return tf.call(this,a,b,c,d,g)}uf.m=4;uf.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=H(a),f=E(a),a=F(a);return tf(b,c,d,f,a)};uf.g=tf;pf=function(a,b,c,d,f){switch(arguments.length){case 2:return qf.call(this,a,b);case 3:return rf.call(this,a,b,c);case 4:return sf.call(this,a,b,c,d);default:return uf.g(a,b,c,d,I(arguments,4))}e(Error("Invalid arity: "+arguments.length))};pf.m=4;pf.j=uf.j;
pf.a=qf;pf.c=rf;pf.p=sf;pf.g=uf.g;of=pf;var vf,wf=k;
function xf(a,b){function c(a,b,c,f){var u=k;3<arguments.length&&(u=I(Array.prototype.slice.call(arguments,3),0));return d.call(this,a,b,c,u)}function d(c,d,f,n){return S.z(a,c==k?b:c,d,f,n)}var f=k;c.m=3;c.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),f=E(a),a=F(a);return d(b,c,f,a)};c.g=d;f=function(d,f,j,n){switch(arguments.length){case 1:return a.b?a.b(d==k?b:d):a.call(k,d==k?b:d);case 2:return a.a?a.a(d==k?b:d,f):a.call(k,d==k?b:d,f);case 3:return a.c?a.c(d==k?b:d,f,j):a.call(k,d==k?b:d,f,j);
default:return c.g(d,f,j,I(arguments,3))}e(Error("Invalid arity: "+arguments.length))};f.m=3;f.j=c.j;return f}
function yf(a,b,c){function d(a,b,c,d){var g=k;3<arguments.length&&(g=I(Array.prototype.slice.call(arguments,3),0));return f.call(this,a,b,c,g)}function f(d,f,g,u){return S.z(a,d==k?b:d,f==k?c:f,g,u)}var g=k;d.m=3;d.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=F(a);return f(b,c,d,a)};d.g=f;g=function(f,g,n,u){switch(arguments.length){case 2:return a.a?a.a(f==k?b:f,g==k?c:g):a.call(k,f==k?b:f,g==k?c:g);case 3:return a.c?a.c(f==k?b:f,g==k?c:g,n):a.call(k,f==k?b:f,g==k?c:g,n);default:return d.g(f,
g,n,I(arguments,3))}e(Error("Invalid arity: "+arguments.length))};g.m=3;g.j=d.j;return g}
function zf(a,b,c,d){function f(a,b,c,d){var f=k;3<arguments.length&&(f=I(Array.prototype.slice.call(arguments,3),0));return g.call(this,a,b,c,f)}function g(f,g,i,A){return S.z(a,f==k?b:f,g==k?c:g,i==k?d:i,A)}var i=k;f.m=3;f.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=F(a);return g(b,c,d,a)};f.g=g;i=function(g,i,u,A){switch(arguments.length){case 2:return a.a?a.a(g==k?b:g,i==k?c:i):a.call(k,g==k?b:g,i==k?c:i);case 3:return a.c?a.c(g==k?b:g,i==k?c:i,u==k?d:u):a.call(k,g==k?b:g,i==k?c:i,
u==k?d:u);default:return f.g(g,i,u,I(arguments,3))}e(Error("Invalid arity: "+arguments.length))};i.m=3;i.j=f.j;return i}wf=function(a,b,c,d){switch(arguments.length){case 2:return xf.call(this,a,b);case 3:return yf.call(this,a,b,c);case 4:return zf.call(this,a,b,c,d)}e(Error("Invalid arity: "+arguments.length))};wf.a=xf;wf.c=yf;wf.p=zf;vf=wf;var U,Af=k;
function Bf(a,b){return new T(k,l,function(){var c=D(b);if(c){if(ld(c)){for(var d=Kb(c),f=O(d),g=new xe(Array(f),0),i=0;;)if(i<f){var j=a.b?a.b(y.a(d,i)):a.call(k,y.a(d,i));g.add(j);i+=1}else break;return Ee(g.la(),Af.a(a,Lb(c)))}return K(a.b?a.b(E(c)):a.call(k,E(c)),Af.a(a,F(c)))}return k},k)}function Cf(a,b,c){return new T(k,l,function(){var d=D(b),f=D(c);return(d?f:d)?K(a.a?a.a(E(d),E(f)):a.call(k,E(d),E(f)),Af.c(a,F(d),F(f))):k},k)}
function Df(a,b,c,d){return new T(k,l,function(){var f=D(b),g=D(c),i=D(d);return(f?g?i:g:f)?K(a.c?a.c(E(f),E(g),E(i)):a.call(k,E(f),E(g),E(i)),Af.p(a,F(f),F(g),F(i))):k},k)}function Ef(a,b,c,d,f){return Af.a(function(b){return S.a(a,b)},function i(a){return new T(k,l,function(){var b=Af.a(D,a);return ef(ff,b)?K(Af.a(E,b),i(Af.a(F,b))):k},k)}(wc.g(f,d,I([c,b],0))))}function Ff(a,b,c,d,f){var g=k;4<arguments.length&&(g=I(Array.prototype.slice.call(arguments,4),0));return Ef.call(this,a,b,c,d,g)}
Ff.m=4;Ff.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=H(a),f=E(a),a=F(a);return Ef(b,c,d,f,a)};Ff.g=Ef;Af=function(a,b,c,d,f){switch(arguments.length){case 2:return Bf.call(this,a,b);case 3:return Cf.call(this,a,b,c);case 4:return Df.call(this,a,b,c,d);default:return Ff.g(a,b,c,d,I(arguments,4))}e(Error("Invalid arity: "+arguments.length))};Af.m=4;Af.j=Ff.j;Af.a=Bf;Af.c=Cf;Af.p=Df;Af.g=Ff.g;U=Af;
var Hf=function Gf(b,c){return new T(k,l,function(){if(0<b){var d=D(c);return d?K(E(d),Gf(b-1,F(d))):k}return k},k)};function If(a,b){return new T(k,l,function(){var c;a:{c=a;for(var d=b;;){var d=D(d),f=0<c;if(t(f?d:f))c-=1,d=F(d);else{c=d;break a}}c=ba}return c},k)}var Jf,Kf=k;function Lf(a){return new T(k,l,function(){return K(a,Kf.b(a))},k)}function Mf(a,b){return Hf(a,Kf.b(b))}
Kf=function(a,b){switch(arguments.length){case 1:return Lf.call(this,a);case 2:return Mf.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};Kf.b=Lf;Kf.a=Mf;Jf=Kf;var Nf,Of=k;function Qf(a){return new T(k,l,function(){return K(a.q?a.q():a.call(k),Of.b(a))},k)}function Rf(a,b){return Hf(a,Of.b(b))}Of=function(a,b){switch(arguments.length){case 1:return Qf.call(this,a);case 2:return Rf.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};Of.b=Qf;Of.a=Rf;Nf=Of;var Sf,Tf=k;
function Uf(a,b){return new T(k,l,function(){var c=D(a),d=D(b);return(c?d:c)?K(E(c),K(E(d),Tf.a(F(c),F(d)))):k},k)}function Vf(a,b,c){return new T(k,l,function(){var d=U.a(D,wc.g(c,b,I([a],0)));return ef(ff,d)?Ie.a(U.a(E,d),S.a(Tf,U.a(F,d))):k},k)}function Wf(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return Vf.call(this,a,b,d)}Wf.m=2;Wf.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return Vf(b,c,a)};Wf.g=Vf;
Tf=function(a,b,c){switch(arguments.length){case 2:return Uf.call(this,a,b);default:return Wf.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};Tf.m=2;Tf.j=Wf.j;Tf.a=Uf;Tf.g=Wf.g;Sf=Tf;function Xf(a){return function c(a,f){return new T(k,l,function(){var g=D(a);return g?K(E(g),c(F(g),f)):D(f)?c(E(f),F(f)):k},k)}(k,a)}var Yf,Zf=k;function $f(a,b){return Xf(U.a(a,b))}function ag(a,b,c){return Xf(S.p(U,a,b,c))}
function bg(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return ag.call(this,a,b,d)}bg.m=2;bg.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return ag(b,c,a)};bg.g=ag;Zf=function(a,b,c){switch(arguments.length){case 2:return $f.call(this,a,b);default:return bg.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};Zf.m=2;Zf.j=bg.j;Zf.a=$f;Zf.g=bg.g;Yf=Zf;
var dg=function cg(b,c){return new T(k,l,function(){var d=D(c);if(d){if(ld(d)){for(var f=Kb(d),g=O(f),i=new xe(Array(g),0),j=0;;)if(j<g){if(t(b.b?b.b(y.a(f,j)):b.call(k,y.a(f,j)))){var n=y.a(f,j);i.add(n)}j+=1}else break;return Ee(i.la(),cg(b,Lb(d)))}f=E(d);d=F(d);return t(b.b?b.b(f):b.call(k,f))?K(f,cg(b,d)):cg(b,d)}return k},k)};function eg(a,b){return dg(gf(a),b)}function fg(a,b){var c;if(a!=k){if(c=a)c=(c=a.t&4)?c:a.kc;c=c?Ve(x.c(Db,Cb(a),b)):x.c(Fa,a,b)}else c=x.c(wc,G,b);return c}
var gg,hg=k;function ig(a,b){return hg.c(a,a,b)}function jg(a,b,c){return new T(k,l,function(){var d=D(c);if(d){var f=Hf(a,d);return a===O(f)?K(f,hg.c(a,b,If(b,d))):k}return k},k)}function kg(a,b,c,d){return new T(k,l,function(){var f=D(d);if(f){var g=Hf(a,f);return a===O(g)?K(g,hg.p(a,b,c,If(b,f))):mc.g(I([Hf(a,Ie.a(g,c))],0))}return k},k)}
hg=function(a,b,c,d){switch(arguments.length){case 2:return ig.call(this,a,b);case 3:return jg.call(this,a,b,c);case 4:return kg.call(this,a,b,c,d)}e(Error("Invalid arity: "+arguments.length))};hg.a=ig;hg.c=jg;hg.p=kg;gg=hg;var lg,mg=k;function ng(a,b){return mg.c(a,b,k)}function og(a,b,c){for(var d=pd,b=D(b);;)if(b){var f=a,g=ba;g=f?((g=f.k&256)?g:f.Ya)?h:f.k?l:v(Pa,f):v(Pa,f);if(g){a=Q.c(a,E(b),d);if(d===a)return c;b=H(b)}else return c}else return a}
mg=function(a,b,c){switch(arguments.length){case 2:return ng.call(this,a,b);case 3:return og.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};mg.a=ng;mg.c=og;lg=mg;var pg,qg=k;function rg(a,b,c){var d=P.c(b,0,k),b=Td(b);return t(b)?R.c(a,d,qg.c(Q.a(a,d),b,c)):R.c(a,d,c.b?c.b(Q.a(a,d)):c.call(k,Q.a(a,d)))}function sg(a,b,c,d){var f=P.c(b,0,k),b=Td(b);return t(b)?R.c(a,f,qg.p(Q.a(a,f),b,c,d)):R.c(a,f,c.a?c.a(Q.a(a,f),d):c.call(k,Q.a(a,f),d))}
function tg(a,b,c,d,f){var g=P.c(b,0,k),b=Td(b);return t(b)?R.c(a,g,qg.z(Q.a(a,g),b,c,d,f)):R.c(a,g,c.c?c.c(Q.a(a,g),d,f):c.call(k,Q.a(a,g),d,f))}function ug(a,b,c,d,f,g){var i=P.c(b,0,k),b=Td(b);return t(b)?R.c(a,i,qg.ea(Q.a(a,i),b,c,d,f,g)):R.c(a,i,c.p?c.p(Q.a(a,i),d,f,g):c.call(k,Q.a(a,i),d,f,g))}function vg(a,b,c,d,f,g,i){var j=P.c(b,0,k),b=Td(b);return t(b)?R.c(a,j,S.g(qg,Q.a(a,j),b,c,d,I([f,g,i],0))):R.c(a,j,S.g(c,Q.a(a,j),d,f,g,I([i],0)))}
function wg(a,b,c,d,f,g,i){var j=k;6<arguments.length&&(j=I(Array.prototype.slice.call(arguments,6),0));return vg.call(this,a,b,c,d,f,g,j)}wg.m=6;wg.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=H(a),f=E(a),a=H(a),g=E(a),a=H(a),i=E(a),a=F(a);return vg(b,c,d,f,g,i,a)};wg.g=vg;
qg=function(a,b,c,d,f,g,i){switch(arguments.length){case 3:return rg.call(this,a,b,c);case 4:return sg.call(this,a,b,c,d);case 5:return tg.call(this,a,b,c,d,f);case 6:return ug.call(this,a,b,c,d,f,g);default:return wg.g(a,b,c,d,f,g,I(arguments,6))}e(Error("Invalid arity: "+arguments.length))};qg.m=6;qg.j=wg.j;qg.c=rg;qg.p=sg;qg.z=tg;qg.ea=ug;qg.g=wg.g;pg=qg;function xg(a,b){this.v=a;this.e=b}function yg(a){return new xg(a.v,a.e.slice())}function zg(a){a=a.h;return 32>a?0:a-1>>>5<<5}
function Ag(a,b,c){for(;;){if(0===b)return c;var d=new xg(a,Array(32));d.e[0]=c;c=d;b-=5}}var Cg=function Bg(b,c,d,f){var g=yg(d),i=b.h-1>>>c&31;5===c?g.e[i]=f:(d=d.e[i],b=d!=k?Bg(b,c-5,d,f):Ag(k,c-5,f),g.e[i]=b);return g};function Dg(a,b){e(Error([B("No item "),B(a),B(" in vector of length "),B(b)].join("")))}function Eg(a,b){var c=0<=b;if(c?b<a.h:c){if(b>=zg(a))return a.U;for(var c=a.root,d=a.shift;;)if(0<d)var f=d-5,c=c.e[b>>>d&31],d=f;else return c.e}else return Dg(b,a.h)}
var Gg=function Fg(b,c,d,f,g){var i=yg(d);if(0===c)i.e[f&31]=g;else{var j=f>>>c&31,b=Fg(b,c-5,d.e[j],f,g);i.e[j]=b}return i},Ig=function Hg(b,c,d){var f=b.h-2>>>c&31;if(5<c){b=Hg(b,c-5,d.e[f]);if((c=b==k)?0===f:c)return k;d=yg(d);d.e[f]=b;return d}if(0===f)return k;d=yg(d);d.e[f]=k;return d};function Jg(a,b,c,d,f,g){this.l=a;this.h=b;this.shift=c;this.root=d;this.U=f;this.o=g;this.t=4;this.k=167668511}q=Jg.prototype;
q.Ka=function(){return new Kg(this.h,this.shift,Lg.b?Lg.b(this.root):Lg.call(k,this.root),Mg.b?Mg.b(this.U):Mg.call(k,this.U))};q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};q.N=function(a,b){return a.P(a,b,k)};q.A=function(a,b,c){return a.P(a,b,c)};
q.Y=function(a,b,c){var d=0<=b;if(d?b<this.h:d)return zg(a)<=b?(a=this.U.slice(),a[b&31]=c,new Jg(this.l,this.h,this.shift,this.root,a,k)):new Jg(this.l,this.h,this.shift,Gg(a,this.shift,this.root,b,c),this.U,k);if(b===this.h)return a.H(a,c);e(Error([B("Index "),B(b),B(" out of bounds  [0,"),B(this.h),B("]")].join("")))};var Ng=k,Ng=function(a,b,c){switch(arguments.length){case 2:return this.M(this,b);case 3:return this.P(this,b,c)}e(Error("Invalid arity: "+arguments.length))};q=Jg.prototype;
q.call=Ng;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};q.La=function(a,b,c){for(var c=[0,c],d=0;;)if(d<this.h){var f=Eg(a,d),g=f.length;a:{for(var i=0,j=c[1];;)if(i<g){j=b.c?b.c(j,i+d,f[i]):b.call(k,j,i+d,f[i]);if(Yb(j)){f=j;break a}i+=1}else{c[0]=g;f=c[1]=j;break a}f=ba}if(Yb(f))return J.b?J.b(f):J.call(k,f);d+=c[0]}else return c[1]};
q.H=function(a,b){if(32>this.h-zg(a)){var c=this.U.slice();c.push(b);return new Jg(this.l,this.h+1,this.shift,this.root,c,k)}var d=this.h>>>5>1<<this.shift,c=d?this.shift+5:this.shift;if(d){d=new xg(k,Array(32));d.e[0]=this.root;var f=Ag(k,this.shift,new xg(k,this.U));d.e[1]=f}else d=Cg(a,this.shift,this.root,new xg(k,this.U));return new Jg(this.l,this.h+1,c,d,[b],k)};q.Oa=function(a){return 0<this.h?new lc(a,this.h-1,k):G};q.Ma=function(a){return a.M(a,0)};q.Na=function(a){return a.M(a,1)};
q.toString=function(){return Nb(this)};q.aa=function(a,b){return Zb.a(a,b)};q.Z=function(a,b,c){return Zb.c(a,b,c)};q.F=function(a){return 0===this.h?k:32>this.h?I.b(this.U):Og.c?Og.c(a,0,0):Og.call(k,a,0,0)};q.J=m("h");q.va=function(a){return 0<this.h?a.M(a,this.h-1):k};
q.wa=function(a){0===this.h&&e(Error("Can't pop empty vector"));if(1===this.h)return lb(Pg,this.l);if(1<this.h-zg(a))return new Jg(this.l,this.h-1,this.shift,this.root,this.U.slice(0,-1),k);var b=Eg(a,this.h-2),a=Ig(a,this.shift,this.root),a=a==k?Qg:a,c=this.h-1,d=5<this.shift;return(d?a.e[1]==k:d)?new Jg(this.l,c,this.shift-5,a.e[0],b,k):new Jg(this.l,c,this.shift,a,b,k)};q.Pa=function(a,b,c){return a.Y(a,b,c)};q.B=function(a,b){return nc(a,b)};
q.G=function(a,b){return new Jg(b,this.h,this.shift,this.root,this.U,this.o)};q.D=m("l");q.M=function(a,b){return Eg(a,b)[b&31]};q.P=function(a,b,c){var d=0<=b;return(d?b<this.h:d)?a.M(a,b):c};q.K=function(){return N(Pg,this.l)};var Qg=new xg(k,Array(32)),Pg=new Jg(k,0,5,Qg,[],0);function V(a){var b=a.length;if(32>b)return new Jg(k,b,5,Qg,a,k);for(var c=a.slice(0,32),d=32,f=Cb(new Jg(k,32,5,Qg,c,k));;)if(d<b)c=d+1,f=Db(f,a[d]),d=c;else return Eb(f)}function Rg(a){return Eb(x.c(Db,Cb(Pg),a))}
function Sg(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return Rg(b)}Sg.m=0;Sg.j=function(a){a=D(a);return Rg(a)};Sg.g=function(a){return Rg(a)};function nd(a,b,c,d,f,g){this.ca=a;this.ba=b;this.r=c;this.R=d;this.l=f;this.o=g;this.k=31719660;this.t=1536}q=nd.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};
q.W=function(a){return this.R+1<this.ba.length?(a=Og.p?Og.p(this.ca,this.ba,this.r,this.R+1):Og.call(k,this.ca,this.ba,this.r,this.R+1),a==k?k:a):a.Gb(a)};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.F=ca();q.Q=function(){return this.ba[this.R]};q.S=function(a){return this.R+1<this.ba.length?(a=Og.p?Og.p(this.ca,this.ba,this.r,this.R+1):Og.call(k,this.ca,this.ba,this.r,this.R+1),a==k?G:a):a.Xa(a)};
q.Gb=function(){var a=this.ba.length,a=this.r+a<Ca(this.ca)?Og.c?Og.c(this.ca,this.r+a,0):Og.call(k,this.ca,this.r+a,0):k;return a==k?k:a};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return Og.z?Og.z(this.ca,this.ba,this.r,this.R,b):Og.call(k,this.ca,this.ba,this.r,this.R,b)};q.K=function(){return N(Pg,this.l)};q.eb=function(){return ze.a(this.ba,this.R)};
q.Xa=function(){var a=this.ba.length,a=this.r+a<Ca(this.ca)?Og.c?Og.c(this.ca,this.r+a,0):Og.call(k,this.ca,this.r+a,0):k;return a==k?G:a};var Og,Tg=k;function Ug(a,b,c){return new nd(a,Eg(a,b),b,c,k,k)}function Vg(a,b,c,d){return new nd(a,b,c,d,k,k)}function Wg(a,b,c,d,f){return new nd(a,b,c,d,f,k)}Tg=function(a,b,c,d,f){switch(arguments.length){case 3:return Ug.call(this,a,b,c);case 4:return Vg.call(this,a,b,c,d);case 5:return Wg.call(this,a,b,c,d,f)}e(Error("Invalid arity: "+arguments.length))};
Tg.c=Ug;Tg.p=Vg;Tg.z=Wg;Og=Tg;function Xg(a,b,c,d,f){this.l=a;this.$=b;this.start=c;this.end=d;this.o=f;this.t=0;this.k=32400159}Xg.prototype.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};Xg.prototype.N=function(a,b){return a.P(a,b,k)};Xg.prototype.A=function(a,b,c){return a.P(a,b,c)};Xg.prototype.Y=function(a,b,c){a=this.start+b;return Yg.z?Yg.z(this.l,R.c(this.$,a,c),this.start,this.end>a+1?this.end:a+1,k):Yg.call(k,this.l,R.c(this.$,a,c),this.start,this.end>a+1?this.end:a+1,k)};
var Zg=k,Zg=function(a,b,c){switch(arguments.length){case 2:return this.M(this,b);case 3:return this.P(this,b,c)}e(Error("Invalid arity: "+arguments.length))};q=Xg.prototype;q.call=Zg;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};q.H=function(a,b){return Yg.z?Yg.z(this.l,gb(this.$,this.end,b),this.start,this.end+1,k):Yg.call(k,this.l,gb(this.$,this.end,b),this.start,this.end+1,k)};q.toString=function(){return Nb(this)};q.aa=function(a,b){return Zb.a(a,b)};
q.Z=function(a,b,c){return Zb.c(a,b,c)};q.F=function(){var a=this;return function c(d){return d===a.end?k:K(y.a(a.$,d),new T(k,l,function(){return c(d+1)},k))}(a.start)};q.J=function(){return this.end-this.start};q.va=function(){return y.a(this.$,this.end-1)};q.wa=function(){this.start===this.end&&e(Error("Can't pop empty vector"));return Yg.z?Yg.z(this.l,this.$,this.start,this.end-1,k):Yg.call(k,this.l,this.$,this.start,this.end-1,k)};q.Pa=function(a,b,c){return a.Y(a,b,c)};
q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return Yg.z?Yg.z(b,this.$,this.start,this.end,this.o):Yg.call(k,b,this.$,this.start,this.end,this.o)};q.D=m("l");q.M=function(a,b){var c=0>b;return(c?c:this.end<=this.start+b)?Dg(b,this.end-this.start):y.a(this.$,this.start+b)};q.P=function(a,b,c){return((a=0>b)?a:this.end<=this.start+b)?c:y.c(this.$,this.start+b,c)};q.K=function(){return N(Pg,this.l)};
function Yg(a,b,c,d,f){for(;;)if(b instanceof Xg)var g=b.start+c,i=b.start+d,b=b.$,c=g,d=i;else{var j=O(b);(function(){var a=0>c;return a||(a=0>d)?a:(a=c>j)?a:d>j})()&&e(Error("Index out of bounds"));return new Xg(a,b,c,d,f)}}var $g,ah=k;function bh(a,b){return ah.c(a,b,O(a))}function ch(a,b,c){return Yg(k,a,b,c,k)}ah=function(a,b,c){switch(arguments.length){case 2:return bh.call(this,a,b);case 3:return ch.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};ah.a=bh;ah.c=ch;$g=ah;
function dh(a,b){return a===b.v?b:new xg(a,b.e.slice())}function Lg(a){return new xg({},a.e.slice())}function Mg(a){var b=Array(32);od(a,0,b,0,a.length);return b}var fh=function eh(b,c,d,f){var d=dh(b.root.v,d),g=b.h-1>>>c&31;if(5===c)b=f;else var i=d.e[g],b=i!=k?eh(b,c-5,i,f):Ag(b.root.v,c-5,f);d.e[g]=b;return d},hh=function gh(b,c,d){var d=dh(b.root.v,d),f=b.h-2>>>c&31;if(5<c){b=gh(b,c-5,d.e[f]);if((c=b==k)?0===f:c)return k;d.e[f]=b;return d}if(0===f)return k;d.e[f]=k;return d};
function Kg(a,b,c,d){this.h=a;this.shift=b;this.root=c;this.U=d;this.k=275;this.t=88}var ih=k,ih=function(a,b,c){switch(arguments.length){case 2:return this.N(this,b);case 3:return this.A(this,b,c)}e(Error("Invalid arity: "+arguments.length))};q=Kg.prototype;q.call=ih;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};q.N=function(a,b){return a.P(a,b,k)};q.A=function(a,b,c){return a.P(a,b,c)};q.M=function(a,b){if(this.root.v)return Eg(a,b)[b&31];e(Error("nth after persistent!"))};
q.P=function(a,b,c){var d=0<=b;return(d?b<this.h:d)?a.M(a,b):c};q.J=function(){if(this.root.v)return this.h;e(Error("count after persistent!"))};
q.Lb=function(a){if(this.root.v){0===this.h&&e(Error("Can't pop empty vector"));if(1===this.h)this.h=0;else if(0<(this.h-1&31))this.h-=1;else{var b;a:{b=this.h-2;var c=0<=b;if(c?b<a.h:c){if(b>=zg(a)){b=a.U;break a}for(var d=c=a.root,f=a.shift;;)if(0<f)d=dh(c.v,d.e[b>>>f&31]),f-=5;else{b=d.e;break a}}else e(Error([B("No item "),B(b),B(" in transient vector of length "),B(a.h)].join("")));b=ba}c=hh(a,this.shift,this.root);c=c!=k?c:new xg(this.root.v,Array(32));((d=5<this.shift)?c.e[1]==k:d)?(this.root=
dh(this.root.v,c.e[0]),this.shift-=5):this.root=c;this.h-=1;this.U=b}return a}e(Error("pop! after persistent!"))};q.Ea=function(a,b,c){var d;a:{if(a.root.v){var f=0<=b;if(f?b<a.h:f){zg(a)<=b?a.U[b&31]=c:(d=function i(d,f){var u=dh(a.root.v,f);if(0===d)u.e[b&31]=c;else{var A=b>>>d&31,L=i(d-5,u.e[A]);u.e[A]=L}return u}.call(k,a.shift,a.root),a.root=d);d=a;break a}if(b===a.h){d=a.xa(a,c);break a}e(Error([B("Index "),B(b),B(" out of bounds for TransientVector of length"),B(a.h)].join("")))}e(Error("assoc! after persistent!"))}return d};
q.xa=function(a,b){if(this.root.v){if(32>this.h-zg(a))this.U[this.h&31]=b;else{var c=new xg(this.root.v,this.U),d=Array(32);d[0]=b;this.U=d;if(this.h>>>5>1<<this.shift){var d=Array(32),f=this.shift+5;d[0]=this.root;d[1]=Ag(this.root.v,this.shift,c);this.root=new xg(this.root.v,d);this.shift=f}else this.root=fh(a,this.shift,this.root,c)}this.h+=1;return a}e(Error("conj! after persistent!"))};
q.Fa=function(a){if(this.root.v){this.root.v=k;var a=this.h-zg(a),b=Array(a);od(this.U,0,b,0,a);return new Jg(k,this.h,this.shift,this.root,b,k)}e(Error("persistent! called twice"))};function jh(){this.t=0;this.k=2097152}jh.prototype.B=p(l);var kh=new jh;function lh(a,b){var c=jd(b)?O(a)===O(b)?ef(ff,U.a(function(a){return Sb.a(Q.c(b,E(a),kh),E(H(a)))},a)):k:k;return t(c)?h:l}
function mh(a,b){var c=a.e,d=ea(b);if(d?d:"number"===typeof b)a:{for(var d=c.length,f=0;;){if(d<=f){c=-1;break a}if(b===c[f]){c=f;break a}f+=2}c=ba}else if(b instanceof Ob)a:{for(var d=c.length,f=b.Ba,g=0;;){if(d<=g){c=-1;break a}var i=c[g],j=i instanceof Ob;if(j?f===i.Ba:j){c=g;break a}g+=2}c=ba}else if(b==k)a:{d=c.length;for(f=0;;){if(d<=f){c=-1;break a}if(c[f]==k){c=f;break a}f+=2}c=ba}else a:{d=c.length;for(f=0;;){if(d<=f){c=-1;break a}if(Sb.a(b,c[f])){c=f;break a}f+=2}c=ba}return c}
function nh(a,b,c){this.e=a;this.r=b;this.V=c;this.t=0;this.k=31850702}q=nh.prototype;q.I=function(a){return kc(a)};q.W=function(){return this.r<this.e.length-2?new nh(this.e,this.r+2,this.V):k};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.F=ca();q.J=function(){return(this.e.length-this.r)/2};q.Q=function(){return V([this.e[this.r],this.e[this.r+1]])};q.S=function(){return this.r<this.e.length-2?new nh(this.e,this.r+2,this.V):G};q.B=function(a,b){return nc(a,b)};
q.G=function(a,b){return new nh(this.e,this.r,b)};q.D=m("V");q.K=function(){return N(G,this.V)};function oh(a,b,c,d){this.l=a;this.h=b;this.e=c;this.o=d;this.t=4;this.k=16123663}q=oh.prototype;q.Ka=function(){return new ph({},this.e.length,this.e.slice())};q.I=function(a){var b=this.o;return b!=k?b:this.o=a=je(a)};q.N=function(a,b){return a.A(a,b,k)};q.A=function(a,b,c){a=mh(a,b);return-1===a?c:this.e[a+1]};
q.Y=function(a,b,c){var d=mh(a,b);if(-1===d){if(this.h<qh){for(var d=a.e,a=d.length,f=Array(a+2),g=0;;)if(g<a)f[g]=d[g],g+=1;else break;f[a]=b;f[a+1]=c;return new oh(this.l,this.h+1,f,k)}return lb(Wa(fg(rh,a),b,c),this.l)}if(c===this.e[d+1])return a;b=this.e.slice();b[d+1]=c;return new oh(this.l,this.h,b,k)};q.Wa=function(a,b){return-1!==mh(a,b)};var sh=k,sh=function(a,b,c){switch(arguments.length){case 2:return this.N(this,b);case 3:return this.A(this,b,c)}e(Error("Invalid arity: "+arguments.length))};
q=oh.prototype;q.call=sh;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};q.La=function(a,b,c){for(var a=this.e.length,d=0;;)if(d<a){c=b.c?b.c(c,this.e[d],this.e[d+1]):b.call(k,c,this.e[d],this.e[d+1]);if(Yb(c))return J.b?J.b(c):J.call(k,c);d+=2}else return c};q.H=function(a,b){return kd(b)?a.Y(a,y.a(b,0),y.a(b,1)):x.c(Fa,a,b)};q.toString=function(){return Nb(this)};q.F=function(){return 0<=this.e.length-2?new nh(this.e,0,k):k};q.J=m("h");q.B=function(a,b){return lh(a,b)};
q.G=function(a,b){return new oh(b,this.h,this.e,this.o)};q.D=m("l");q.K=function(){return lb(th,this.l)};q.Za=function(a,b){if(0<=mh(a,b)){var c=this.e.length,d=c-2;if(0===d)return a.K(a);for(var d=Array(d),f=0,g=0;;){if(f>=c)return new oh(this.l,this.h-1,d,k);Sb.a(b,this.e[f])||(d[g]=this.e[f],d[g+1]=this.e[f+1],g+=2);f+=2}}else return a};var th=new oh(k,0,[],k),qh=8;function qa(a,b){var c=b?a:a.slice();return new oh(k,c.length/2,c,k)}
function ph(a,b,c){this.ya=a;this.ia=b;this.e=c;this.t=56;this.k=258}q=ph.prototype;q.vb=function(a,b){if(t(this.ya)){var c=mh(a,b);0<=c&&(this.e[c]=this.e[this.ia-2],this.e[c+1]=this.e[this.ia-1],c=this.e,c.pop(),c.pop(),this.ia-=2);return a}e(Error("dissoc! after persistent!"))};
q.Ea=function(a,b,c){if(t(this.ya)){var d=mh(a,b);if(-1===d)return this.ia+2<=2*qh?(this.ia+=2,this.e.push(b),this.e.push(c),a):We(uh.a?uh.a(this.ia,this.e):uh.call(k,this.ia,this.e),b,c);c!==this.e[d+1]&&(this.e[d+1]=c);return a}e(Error("assoc! after persistent!"))};
q.xa=function(a,b){if(t(this.ya)){var c;c=b?((c=b.k&2048)?c:b.Tb)||(b.k?0:v(Za,b)):v(Za,b);if(c)return a.Ea(a,ke.b?ke.b(b):ke.call(k,b),le.b?le.b(b):le.call(k,b));c=D(b);for(var d=a;;){var f=E(c);if(t(f))c=H(c),d=d.Ea(d,ke.b?ke.b(f):ke.call(k,f),le.b?le.b(f):le.call(k,f));else return d}}else e(Error("conj! after persistent!"))};q.Fa=function(){if(t(this.ya))return this.ya=l,new oh(k,Rd(this.ia),this.e,k);e(Error("persistent! called twice"))};q.N=function(a,b){return a.A(a,b,k)};
q.A=function(a,b,c){if(t(this.ya))return a=mh(a,b),-1===a?c:this.e[a+1];e(Error("lookup after persistent!"))};q.J=function(){if(t(this.ya))return Rd(this.ia);e(Error("count after persistent!"))};function uh(a,b){for(var c=Cb(rh),d=0;;)if(d<a)c=Fb(c,b[d],b[d+1]),d+=2;else return c}function vh(){this.n=l}function wh(a,b){return ea(a)?a===b:Sb.a(a,b)}var xh,yh=k;function zh(a,b,c){a=a.slice();a[b]=c;return a}function Ah(a,b,c,d,f){a=a.slice();a[b]=c;a[d]=f;return a}
yh=function(a,b,c,d,f){switch(arguments.length){case 3:return zh.call(this,a,b,c);case 5:return Ah.call(this,a,b,c,d,f)}e(Error("Invalid arity: "+arguments.length))};yh.c=zh;yh.z=Ah;xh=yh;function Bh(a,b){var c=Array(a.length-2);od(a,0,c,0,2*b);od(a,2*(b+1),c,2*b,c.length-2*b);return c}var Ch,Dh=k;function Eh(a,b,c,d){a=a.sa(b);a.e[c]=d;return a}function Fh(a,b,c,d,f,g){a=a.sa(b);a.e[c]=d;a.e[f]=g;return a}
Dh=function(a,b,c,d,f,g){switch(arguments.length){case 4:return Eh.call(this,a,b,c,d);case 6:return Fh.call(this,a,b,c,d,f,g)}e(Error("Invalid arity: "+arguments.length))};Dh.p=Eh;Dh.ea=Fh;Ch=Dh;function Gh(a,b,c){for(var d=a.length,f=0;;)if(f<d){var g=a[f];g!=k?c=b.c?b.c(c,g,a[f+1]):b.call(k,c,g,a[f+1]):(g=a[f+1],c=g!=k?g.Aa(b,c):c);if(Yb(c))return J.b?J.b(c):J.call(k,c);f+=2}else return c}function Hh(a,b,c){this.v=a;this.w=b;this.e=c}
function Ih(a,b,c,d){if(a.w===c)return k;var a=a.sa(b),b=a.e,f=b.length;a.w^=c;od(b,2*(d+1),b,2*d,f-2*(d+1));b[f-2]=k;b[f-1]=k;return a}q=Hh.prototype;
q.ha=function(a,b,c,d,f,g){var i=1<<(c>>>b&31),j=Sd(this.w&i-1);if(0===(this.w&i)){var n=Sd(this.w);if(2*n<this.e.length){a=this.sa(a);b=a.e;g.n=h;a:{c=2*(n-j);g=2*j+(c-1);for(n=2*(j+1)+(c-1);;){if(0===c)break a;b[n]=b[g];n-=1;c-=1;g-=1}}b[2*j]=d;b[2*j+1]=f;a.w|=i;return a}if(16<=n){j=Array(32);j[c>>>b&31]=Jh.ha(a,b+5,c,d,f,g);for(f=d=0;;)if(32>d)0!==(this.w>>>d&1)&&(j[d]=this.e[f]!=k?Jh.ha(a,b+5,C.b(this.e[f]),this.e[f],this.e[f+1],g):this.e[f+1],f+=2),d+=1;else break;return new Kh(a,n+1,j)}b=Array(2*
(n+4));od(this.e,0,b,0,2*j);b[2*j]=d;b[2*j+1]=f;od(this.e,2*j,b,2*(j+1),2*(n-j));g.n=h;a=this.sa(a);a.e=b;a.w|=i;return a}n=this.e[2*j];i=this.e[2*j+1];if(n==k)return n=i.ha(a,b+5,c,d,f,g),n===i?this:Ch.p(this,a,2*j+1,n);if(wh(d,n))return f===i?this:Ch.p(this,a,2*j+1,f);g.n=h;return Ch.ea(this,a,2*j,k,2*j+1,Lh.Da?Lh.Da(a,b+5,n,i,c,d,f):Lh.call(k,a,b+5,n,i,c,d,f))};q.Qa=function(){return Mh.b?Mh.b(this.e):Mh.call(k,this.e)};
q.Sa=function(a,b,c,d,f){var g=1<<(c>>>b&31);if(0===(this.w&g))return this;var i=Sd(this.w&g-1),j=this.e[2*i],n=this.e[2*i+1];return j==k?(b=n.Sa(a,b+5,c,d,f),b===n?this:b!=k?Ch.p(this,a,2*i+1,b):this.w===g?k:Ih(this,a,g,i)):wh(d,j)?(f[0]=h,Ih(this,a,g,i)):this};q.sa=function(a){if(a===this.v)return this;var b=Sd(this.w),c=Array(0>b?4:2*(b+1));od(this.e,0,c,0,2*b);return new Hh(a,this.w,c)};q.Aa=function(a,b){return Gh(this.e,a,b)};
q.Ra=function(a,b,c){var d=1<<(b>>>a&31);if(0===(this.w&d))return this;var f=Sd(this.w&d-1),g=this.e[2*f],i=this.e[2*f+1];return g==k?(a=i.Ra(a+5,b,c),a===i?this:a!=k?new Hh(k,this.w,xh.c(this.e,2*f+1,a)):this.w===d?k:new Hh(k,this.w^d,Bh(this.e,f))):wh(c,g)?new Hh(k,this.w^d,Bh(this.e,f)):this};
q.ga=function(a,b,c,d,f){var g=1<<(b>>>a&31),i=Sd(this.w&g-1);if(0===(this.w&g)){var j=Sd(this.w);if(16<=j){i=Array(32);i[b>>>a&31]=Jh.ga(a+5,b,c,d,f);for(d=c=0;;)if(32>c)0!==(this.w>>>c&1)&&(i[c]=this.e[d]!=k?Jh.ga(a+5,C.b(this.e[d]),this.e[d],this.e[d+1],f):this.e[d+1],d+=2),c+=1;else break;return new Kh(k,j+1,i)}a=Array(2*(j+1));od(this.e,0,a,0,2*i);a[2*i]=c;a[2*i+1]=d;od(this.e,2*i,a,2*(i+1),2*(j-i));f.n=h;return new Hh(k,this.w|g,a)}j=this.e[2*i];g=this.e[2*i+1];if(j==k)return j=g.ga(a+5,b,c,
d,f),j===g?this:new Hh(k,this.w,xh.c(this.e,2*i+1,j));if(wh(c,j))return d===g?this:new Hh(k,this.w,xh.c(this.e,2*i+1,d));f.n=h;return new Hh(k,this.w,xh.z(this.e,2*i,k,2*i+1,Lh.ea?Lh.ea(a+5,j,g,b,c,d):Lh.call(k,a+5,j,g,b,c,d)))};q.ta=function(a,b,c,d){var f=1<<(b>>>a&31);if(0===(this.w&f))return d;var g=Sd(this.w&f-1),f=this.e[2*g],g=this.e[2*g+1];return f==k?g.ta(a+5,b,c,d):wh(c,f)?g:d};var Jh=new Hh(k,0,[]);
function Nh(a,b,c){for(var d=a.e,a=2*(a.h-1),f=Array(a),g=0,i=1,j=0;;)if(g<a){var n=g!==c;if(n?d[g]!=k:n)f[i]=d[g],i+=2,j|=1<<g;g+=1}else return new Hh(b,j,f)}function Kh(a,b,c){this.v=a;this.h=b;this.e=c}q=Kh.prototype;q.ha=function(a,b,c,d,f,g){var i=c>>>b&31,j=this.e[i];if(j==k)return a=Ch.p(this,a,i,Jh.ha(a,b+5,c,d,f,g)),a.h+=1,a;b=j.ha(a,b+5,c,d,f,g);return b===j?this:Ch.p(this,a,i,b)};q.Qa=function(){return Oh.b?Oh.b(this.e):Oh.call(k,this.e)};
q.Sa=function(a,b,c,d,f){var g=c>>>b&31,i=this.e[g];if(i==k)return this;b=i.Sa(a,b+5,c,d,f);if(b===i)return this;if(b==k){if(8>=this.h)return Nh(this,a,g);a=Ch.p(this,a,g,b);a.h-=1;return a}return Ch.p(this,a,g,b)};q.sa=function(a){return a===this.v?this:new Kh(a,this.h,this.e.slice())};q.Aa=function(a,b){for(var c=this.e.length,d=0,f=b;;)if(d<c){var g=this.e[d];if(g!=k&&(f=g.Aa(a,f),Yb(f)))return J.b?J.b(f):J.call(k,f);d+=1}else return f};
q.Ra=function(a,b,c){var d=b>>>a&31,f=this.e[d];return f!=k?(a=f.Ra(a+5,b,c),a===f?this:a==k?8>=this.h?Nh(this,k,d):new Kh(k,this.h-1,xh.c(this.e,d,a)):new Kh(k,this.h,xh.c(this.e,d,a))):this};q.ga=function(a,b,c,d,f){var g=b>>>a&31,i=this.e[g];if(i==k)return new Kh(k,this.h+1,xh.c(this.e,g,Jh.ga(a+5,b,c,d,f)));a=i.ga(a+5,b,c,d,f);return a===i?this:new Kh(k,this.h,xh.c(this.e,g,a))};q.ta=function(a,b,c,d){var f=this.e[b>>>a&31];return f!=k?f.ta(a+5,b,c,d):d};
function Ph(a,b,c){for(var b=2*b,d=0;;)if(d<b){if(wh(c,a[d]))return d;d+=2}else return-1}function Qh(a,b,c,d){this.v=a;this.na=b;this.h=c;this.e=d}q=Qh.prototype;
q.ha=function(a,b,c,d,f,g){if(c===this.na){b=Ph(this.e,this.h,d);if(-1===b){if(this.e.length>2*this.h)return a=Ch.ea(this,a,2*this.h,d,2*this.h+1,f),g.n=h,a.h+=1,a;c=this.e.length;b=Array(c+2);od(this.e,0,b,0,c);b[c]=d;b[c+1]=f;g.n=h;g=this.h+1;a===this.v?(this.e=b,this.h=g,a=this):a=new Qh(this.v,this.na,g,b);return a}return this.e[b+1]===f?this:Ch.p(this,a,b+1,f)}return(new Hh(a,1<<(this.na>>>b&31),[k,this,k,k])).ha(a,b,c,d,f,g)};q.Qa=function(){return Mh.b?Mh.b(this.e):Mh.call(k,this.e)};
q.Sa=function(a,b,c,d,f){b=Ph(this.e,this.h,d);if(-1===b)return this;f[0]=h;if(1===this.h)return k;a=this.sa(a);f=a.e;f[b]=f[2*this.h-2];f[b+1]=f[2*this.h-1];f[2*this.h-1]=k;f[2*this.h-2]=k;a.h-=1;return a};q.sa=function(a){if(a===this.v)return this;var b=Array(2*(this.h+1));od(this.e,0,b,0,2*this.h);return new Qh(a,this.na,this.h,b)};q.Aa=function(a,b){return Gh(this.e,a,b)};q.Ra=function(a,b,c){a=Ph(this.e,this.h,c);return-1===a?this:1===this.h?k:new Qh(k,this.na,this.h-1,Bh(this.e,Rd(a)))};
q.ga=function(a,b,c,d,f){return b===this.na?(a=Ph(this.e,this.h,c),-1===a?(a=this.e.length,b=Array(a+2),od(this.e,0,b,0,a),b[a]=c,b[a+1]=d,f.n=h,new Qh(k,this.na,this.h+1,b)):Sb.a(this.e[a],d)?this:new Qh(k,this.na,this.h,xh.c(this.e,a+1,d))):(new Hh(k,1<<(this.na>>>a&31),[k,this])).ga(a,b,c,d,f)};q.ta=function(a,b,c,d){a=Ph(this.e,this.h,c);return 0>a?d:wh(c,this.e[a])?this.e[a+1]:d};var Lh,Rh=k;
function Sh(a,b,c,d,f,g){var i=C.b(b);if(i===d)return new Qh(k,i,2,[b,c,f,g]);var j=new vh;return Jh.ga(a,i,b,c,j).ga(a,d,f,g,j)}function Th(a,b,c,d,f,g,i){var j=C.b(c);if(j===f)return new Qh(k,j,2,[c,d,g,i]);var n=new vh;return Jh.ha(a,b,j,c,d,n).ha(a,b,f,g,i,n)}Rh=function(a,b,c,d,f,g,i){switch(arguments.length){case 6:return Sh.call(this,a,b,c,d,f,g);case 7:return Th.call(this,a,b,c,d,f,g,i)}e(Error("Invalid arity: "+arguments.length))};Rh.ea=Sh;Rh.Da=Th;Lh=Rh;
function Uh(a,b,c,d,f){this.l=a;this.ja=b;this.r=c;this.ka=d;this.o=f;this.t=0;this.k=31850572}q=Uh.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.F=ca();q.Q=function(){return this.ka==k?V([this.ja[this.r],this.ja[this.r+1]]):E(this.ka)};q.S=function(){return this.ka==k?Mh.c?Mh.c(this.ja,this.r+2,k):Mh.call(k,this.ja,this.r+2,k):Mh.c?Mh.c(this.ja,this.r,H(this.ka)):Mh.call(k,this.ja,this.r,H(this.ka))};
q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new Uh(b,this.ja,this.r,this.ka,this.o)};q.D=m("l");q.K=function(){return N(G,this.l)};var Mh,Vh=k;function Wh(a){return Vh.c(a,0,k)}function Xh(a,b,c){if(c==k)for(c=a.length;;)if(b<c){if(a[b]!=k)return new Uh(k,a,b,k,k);var d=a[b+1];if(t(d)&&(d=d.Qa(),t(d)))return new Uh(k,a,b+2,d,k);b+=2}else return k;else return new Uh(k,a,b,c,k)}
Vh=function(a,b,c){switch(arguments.length){case 1:return Wh.call(this,a);case 3:return Xh.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};Vh.b=Wh;Vh.c=Xh;Mh=Vh;function Yh(a,b,c,d,f){this.l=a;this.ja=b;this.r=c;this.ka=d;this.o=f;this.t=0;this.k=31850572}q=Yh.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.F=ca();q.Q=function(){return E(this.ka)};
q.S=function(){return Oh.p?Oh.p(k,this.ja,this.r,H(this.ka)):Oh.call(k,k,this.ja,this.r,H(this.ka))};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new Yh(b,this.ja,this.r,this.ka,this.o)};q.D=m("l");q.K=function(){return N(G,this.l)};var Oh,Zh=k;function $h(a){return Zh.p(k,a,0,k)}function ai(a,b,c,d){if(d==k)for(d=b.length;;)if(c<d){var f=b[c];if(t(f)&&(f=f.Qa(),t(f)))return new Yh(a,b,c+1,f,k);c+=1}else return k;else return new Yh(a,b,c,d,k)}
Zh=function(a,b,c,d){switch(arguments.length){case 1:return $h.call(this,a);case 4:return ai.call(this,a,b,c,d)}e(Error("Invalid arity: "+arguments.length))};Zh.b=$h;Zh.p=ai;Oh=Zh;function bi(a,b,c,d,f,g){this.l=a;this.h=b;this.root=c;this.T=d;this.X=f;this.o=g;this.t=4;this.k=16123663}q=bi.prototype;q.Ka=function(){return new ci({},this.root,this.h,this.T,this.X)};q.I=function(a){var b=this.o;return b!=k?b:this.o=a=je(a)};q.N=function(a,b){return a.A(a,b,k)};
q.A=function(a,b,c){return b==k?this.T?this.X:c:this.root==k?c:this.root.ta(0,C.b(b),b,c)};q.Y=function(a,b,c){if(b==k){var d=this.T;return(d?c===this.X:d)?a:new bi(this.l,this.T?this.h:this.h+1,this.root,h,c,k)}d=new vh;c=(this.root==k?Jh:this.root).ga(0,C.b(b),b,c,d);return c===this.root?a:new bi(this.l,d.n?this.h+1:this.h,c,this.T,this.X,k)};q.Wa=function(a,b){return b==k?this.T:this.root==k?l:this.root.ta(0,C.b(b),b,pd)!==pd};
var di=k,di=function(a,b,c){switch(arguments.length){case 2:return this.N(this,b);case 3:return this.A(this,b,c)}e(Error("Invalid arity: "+arguments.length))};q=bi.prototype;q.call=di;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};q.La=function(a,b,c){a=this.T?b.c?b.c(c,k,this.X):b.call(k,c,k,this.X):c;return Yb(a)?J.b?J.b(a):J.call(k,a):this.root!=k?this.root.Aa(b,a):a};q.H=function(a,b){return kd(b)?a.Y(a,y.a(b,0),y.a(b,1)):x.c(Fa,a,b)};q.toString=function(){return Nb(this)};
q.F=function(){if(0<this.h){var a=this.root!=k?this.root.Qa():k;return this.T?K(V([k,this.X]),a):a}return k};q.J=m("h");q.B=function(a,b){return lh(a,b)};q.G=function(a,b){return new bi(b,this.h,this.root,this.T,this.X,this.o)};q.D=m("l");q.K=function(){return lb(rh,this.l)};q.Za=function(a,b){if(b==k)return this.T?new bi(this.l,this.h-1,this.root,l,k,k):a;if(this.root==k)return a;var c=this.root.Ra(0,C.b(b),b);return c===this.root?a:new bi(this.l,this.h-1,c,this.T,this.X,k)};
var rh=new bi(k,0,k,l,k,0);function ci(a,b,c,d,f){this.v=a;this.root=b;this.count=c;this.T=d;this.X=f;this.t=56;this.k=258}q=ci.prototype;q.vb=function(a,b){if(a.v)if(b==k)a.T&&(a.T=l,a.X=k,a.count-=1);else{if(a.root!=k){var c=new vh,d=a.root.Sa(a.v,0,C.b(b),b,c);d!==a.root&&(a.root=d);t(c[0])&&(a.count-=1)}}else e(Error("dissoc! after persistent!"));return a};q.Ea=function(a,b,c){return ei(a,b,c)};
q.xa=function(a,b){var c;a:{if(a.v){c=b?((c=b.k&2048)?c:b.Tb)||(b.k?0:v(Za,b)):v(Za,b);if(c){c=ei(a,ke.b?ke.b(b):ke.call(k,b),le.b?le.b(b):le.call(k,b));break a}c=D(b);for(var d=a;;){var f=E(c);if(t(f))c=H(c),d=ei(d,ke.b?ke.b(f):ke.call(k,f),le.b?le.b(f):le.call(k,f));else{c=d;break a}}}else e(Error("conj! after persistent"));c=ba}return c};q.Fa=function(a){var b;a.v?(a.v=k,b=new bi(k,a.count,a.root,a.T,a.X,k)):e(Error("persistent! called twice"));return b};
q.N=function(a,b){return b==k?this.T?this.X:k:this.root==k?k:this.root.ta(0,C.b(b),b)};q.A=function(a,b,c){return b==k?this.T?this.X:c:this.root==k?c:this.root.ta(0,C.b(b),b,c)};q.J=function(){if(this.v)return this.count;e(Error("count after persistent!"))};function ei(a,b,c){if(a.v){if(b==k)a.X!==c&&(a.X=c),a.T||(a.count+=1,a.T=h);else{var d=new vh,b=(a.root==k?Jh:a.root).ha(a.v,0,C.b(b),b,c,d);b!==a.root&&(a.root=b);d.n&&(a.count+=1)}return a}e(Error("assoc! after persistent!"))}
function fi(a,b,c){for(var d=b;;)if(a!=k)b=c?a.left:a.right,d=wc.a(d,a),a=b;else return d}function gi(a,b,c,d,f){this.l=a;this.stack=b;this.Va=c;this.h=d;this.o=f;this.t=0;this.k=31850574}q=gi.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.F=ca();q.J=function(a){return 0>this.h?O(H(a))+1:this.h};q.Q=function(){return db(this.stack)};
q.S=function(){var a=E(this.stack),a=fi(this.Va?a.right:a.left,H(this.stack),this.Va);return a!=k?new gi(k,a,this.Va,this.h-1,k):G};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new gi(b,this.stack,this.Va,this.h,this.o)};q.D=m("l");q.K=function(){return N(G,this.l)};
function hi(a,b,c,d){return c instanceof X?c.left instanceof X?new X(c.key,c.n,c.left.ma(),new Y(a,b,c.right,d,k),k):c.right instanceof X?new X(c.right.key,c.right.n,new Y(c.key,c.n,c.left,c.right.left,k),new Y(a,b,c.right.right,d,k),k):new Y(a,b,c,d,k):new Y(a,b,c,d,k)}
function ii(a,b,c,d){return d instanceof X?d.right instanceof X?new X(d.key,d.n,new Y(a,b,c,d.left,k),d.right.ma(),k):d.left instanceof X?new X(d.left.key,d.left.n,new Y(a,b,c,d.left.left,k),new Y(d.key,d.n,d.left.right,d.right,k),k):new Y(a,b,c,d,k):new Y(a,b,c,d,k)}
function ji(a,b,c,d){if(c instanceof X)return new X(a,b,c.ma(),d,k);if(d instanceof Y)return ii(a,b,c,d.Ta());var f=d instanceof X;if(f?d.left instanceof Y:f)return new X(d.left.key,d.left.n,new Y(a,b,c,d.left.left,k),ii(d.key,d.n,d.left.right,d.right.Ta()),k);e(Error("red-black tree invariant violation"))}
var li=function ki(b,c,d){d=b.left!=k?ki(b.left,c,d):d;if(Yb(d))return J.b?J.b(d):J.call(k,d);d=c.c?c.c(d,b.key,b.n):c.call(k,d,b.key,b.n);if(Yb(d))return J.b?J.b(d):J.call(k,d);b=b.right!=k?ki(b.right,c,d):d;return Yb(b)?J.b?J.b(b):J.call(k,b):b};function Y(a,b,c,d,f){this.key=a;this.n=b;this.left=c;this.right=d;this.o=f;this.t=0;this.k=32402207}Y.prototype.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};Y.prototype.N=function(a,b){return a.P(a,b,k)};
Y.prototype.A=function(a,b,c){return a.P(a,b,c)};Y.prototype.Y=function(a,b,c){return R.c(V([this.key,this.n]),b,c)};var mi=k,mi=function(a,b,c){switch(arguments.length){case 2:return this.N(this,b);case 3:return this.A(this,b,c)}e(Error("Invalid arity: "+arguments.length))};q=Y.prototype;q.call=mi;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};q.H=function(a,b){return V([this.key,this.n,b])};q.Ma=m("key");q.Na=m("n");q.Cb=function(a){return a.Eb(this)};
q.Ta=function(){return new X(this.key,this.n,this.left,this.right,k)};q.replace=function(a,b,c,d){return new Y(a,b,c,d,k)};q.Aa=function(a,b){return li(this,a,b)};q.Bb=function(a){return a.Db(this)};q.Db=function(a){return new Y(a.key,a.n,this,a.right,k)};q.Eb=function(a){return new Y(a.key,a.n,a.left,this,k)};q.ma=function(){return this};q.aa=function(a,b){return Zb.a(a,b)};q.Z=function(a,b,c){return Zb.c(a,b,c)};q.F=function(){return mc.g(I([this.key,this.n],0))};q.J=p(2);q.va=m("n");q.wa=function(){return V([this.key])};
q.Pa=function(a,b,c){return gb(V([this.key,this.n]),b,c)};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return N(V([this.key,this.n]),b)};q.D=p(k);q.M=function(a,b){return 0===b?this.key:1===b?this.n:k};q.P=function(a,b,c){return 0===b?this.key:1===b?this.n:c};q.K=function(){return Pg};function X(a,b,c,d,f){this.key=a;this.n=b;this.left=c;this.right=d;this.o=f;this.t=0;this.k=32402207}X.prototype.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};
X.prototype.N=function(a,b){return a.P(a,b,k)};X.prototype.A=function(a,b,c){return a.P(a,b,c)};X.prototype.Y=function(a,b,c){return R.c(V([this.key,this.n]),b,c)};var ni=k,ni=function(a,b,c){switch(arguments.length){case 2:return this.N(this,b);case 3:return this.A(this,b,c)}e(Error("Invalid arity: "+arguments.length))};q=X.prototype;q.call=ni;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};q.H=function(a,b){return V([this.key,this.n,b])};q.Ma=m("key");q.Na=m("n");
q.Cb=function(a){return new X(this.key,this.n,this.left,a,k)};q.Ta=function(){e(Error("red-black tree invariant violation"))};q.replace=function(a,b,c,d){return new X(a,b,c,d,k)};q.Aa=function(a,b){return li(this,a,b)};q.Bb=function(a){return new X(this.key,this.n,a,this.right,k)};
q.Db=function(a){return this.left instanceof X?new X(this.key,this.n,this.left.ma(),new Y(a.key,a.n,this.right,a.right,k),k):this.right instanceof X?new X(this.right.key,this.right.n,new Y(this.key,this.n,this.left,this.right.left,k),new Y(a.key,a.n,this.right.right,a.right,k),k):new Y(a.key,a.n,this,a.right,k)};
q.Eb=function(a){return this.right instanceof X?new X(this.key,this.n,new Y(a.key,a.n,a.left,this.left,k),this.right.ma(),k):this.left instanceof X?new X(this.left.key,this.left.n,new Y(a.key,a.n,a.left,this.left.left,k),new Y(this.key,this.n,this.left.right,this.right,k),k):new Y(a.key,a.n,a.left,this,k)};q.ma=function(){return new Y(this.key,this.n,this.left,this.right,k)};q.aa=function(a,b){return Zb.a(a,b)};q.Z=function(a,b,c){return Zb.c(a,b,c)};
q.F=function(){return mc.g(I([this.key,this.n],0))};q.J=p(2);q.va=m("n");q.wa=function(){return V([this.key])};q.Pa=function(a,b,c){return gb(V([this.key,this.n]),b,c)};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return N(V([this.key,this.n]),b)};q.D=p(k);q.M=function(a,b){return 0===b?this.key:1===b?this.n:k};q.P=function(a,b,c){return 0===b?this.key:1===b?this.n:c};q.K=function(){return Pg};
var pi=function oi(b,c,d,f,g){if(c==k)return new X(d,f,k,k,k);var i=b.a?b.a(d,c.key):b.call(k,d,c.key);if(0===i)return g[0]=c,k;if(0>i)return b=oi(b,c.left,d,f,g),b!=k?c.Bb(b):k;b=oi(b,c.right,d,f,g);return b!=k?c.Cb(b):k},ri=function qi(b,c){if(b==k)return c;if(c==k)return b;if(b instanceof X){if(c instanceof X){var d=qi(b.right,c.left);return d instanceof X?new X(d.key,d.n,new X(b.key,b.n,b.left,d.left,k),new X(c.key,c.n,d.right,c.right,k),k):new X(b.key,b.n,b.left,new X(c.key,c.n,d,c.right,k),
k)}return new X(b.key,b.n,b.left,qi(b.right,c),k)}if(c instanceof X)return new X(c.key,c.n,qi(b,c.left),c.right,k);d=qi(b.right,c.left);return d instanceof X?new X(d.key,d.n,new Y(b.key,b.n,b.left,d.left,k),new Y(c.key,c.n,d.right,c.right,k),k):ji(b.key,b.n,b.left,new Y(c.key,c.n,d,c.right,k))},ti=function si(b,c,d,f){if(c!=k){var g=b.a?b.a(d,c.key):b.call(k,d,c.key);if(0===g)return f[0]=c,ri(c.left,c.right);if(0>g){var b=si(b,c.left,d,f),i=b!=k;return(i?i:f[0]!=k)?c.left instanceof Y?ji(c.key,c.n,
b,c.right):new X(c.key,c.n,b,c.right,k):k}b=si(b,c.right,d,f);((d=b!=k)?d:f[0]!=k)?c.right instanceof Y?(f=c.key,d=c.n,c=c.left,b instanceof X?i=new X(f,d,c,b.ma(),k):c instanceof Y?i=hi(f,d,c.Ta(),b):((g=c instanceof X)?c.right instanceof Y:g)?i=new X(c.right.key,c.right.n,hi(c.key,c.n,c.left.Ta(),c.right.left),new Y(f,d,c.right.right,b,k),k):e(Error("red-black tree invariant violation"))):i=new X(c.key,c.n,c.left,b,k):i=k;return i}return k},vi=function ui(b,c,d,f){var g=c.key,i=b.a?b.a(d,g):b.call(k,
d,g);return 0===i?c.replace(g,f,c.left,c.right):0>i?c.replace(g,c.n,ui(b,c.left,d,f),c.right):c.replace(g,c.n,c.left,ui(b,c.right,d,f))};function wi(a,b,c,d,f){this.fa=a;this.ra=b;this.h=c;this.l=d;this.o=f;this.t=0;this.k=418776847}q=wi.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=je(a)};q.N=function(a,b){return a.A(a,b,k)};q.A=function(a,b,c){a=xi(a,b);return a!=k?a.n:c};
q.Y=function(a,b,c){var d=[k],f=pi(this.fa,this.ra,b,c,d);return f==k?(d=P.a(d,0),Sb.a(c,d.n)?a:new wi(this.fa,vi(this.fa,this.ra,b,c),this.h,this.l,k)):new wi(this.fa,f.ma(),this.h+1,this.l,k)};q.Wa=function(a,b){return xi(a,b)!=k};var yi=k,yi=function(a,b,c){switch(arguments.length){case 2:return this.N(this,b);case 3:return this.A(this,b,c)}e(Error("Invalid arity: "+arguments.length))};q=wi.prototype;q.call=yi;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};
q.La=function(a,b,c){return this.ra!=k?li(this.ra,b,c):c};q.H=function(a,b){return kd(b)?a.Y(a,y.a(b,0),y.a(b,1)):x.c(Fa,a,b)};q.Oa=function(){return 0<this.h?new gi(k,fi(this.ra,k,l),l,this.h,k):k};function xi(a,b){for(var c=a.ra;;)if(c!=k){var d=a.fa.a?a.fa.a(b,c.key):a.fa.call(k,b,c.key);if(0===d)return c;c=0>d?c.left:c.right}else return k}q.F=function(){return 0<this.h?new gi(k,fi(this.ra,k,h),h,this.h,k):k};q.J=m("h");q.B=function(a,b){return lh(a,b)};
q.G=function(a,b){return new wi(this.fa,this.ra,this.h,b,this.o)};q.D=m("l");q.K=function(){return N(zi,this.l)};q.Za=function(a,b){var c=[k],d=ti(this.fa,this.ra,b,c);return d==k?P.a(c,0)==k?a:new wi(this.fa,k,0,this.l,k):new wi(this.fa,d.ma(),this.h-1,this.l,k)};var zi=new wi(td,k,0,k,0),Nc;function Ai(a){for(var a=D(a),b=Cb(rh);;)if(a)var c=H(H(a)),b=We(b,E(a),E(H(a))),a=c;else return Eb(b)}
function Bi(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return Ai.call(this,b)}Bi.m=0;Bi.j=function(a){a=D(a);return Ai(a)};Bi.g=Ai;Nc=Bi;function Ci(a){return new oh(k,Rd(O(a)),S.a(ta,a),k)}function Di(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return Ci.call(this,b)}Di.m=0;Di.j=function(a){a=D(a);return Ci(a)};Di.g=Ci;function Ei(a,b){this.O=a;this.V=b;this.t=0;this.k=31850700}q=Ei.prototype;q.I=function(a){return kc(a)};
q.W=function(){var a=this.O;if(a)var b=a.k&128,a=(b?b:a.$a)||(a.k?0:v(Oa,a));else a=v(Oa,a);a=a?this.O.W(this.O):H(this.O);return a==k?k:new Ei(a,this.V)};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.F=ca();q.Q=function(){var a=this.O.Q(this.O);return a.Ma(a)};q.S=function(){var a=this.O;if(a)var b=a.k&128,a=(b?b:a.$a)||(a.k?0:v(Oa,a));else a=v(Oa,a);a=a?this.O.W(this.O):H(this.O);return a!=k?new Ei(a,this.V):G};q.B=function(a,b){return nc(a,b)};
q.G=function(a,b){return new Ei(this.O,b)};q.D=m("V");q.K=function(){return N(G,this.V)};function Fi(a){return(a=D(a))?new Ei(a,k):k}function ke(a){return $a(a)}function Gi(a,b){this.O=a;this.V=b;this.t=0;this.k=31850700}q=Gi.prototype;q.I=function(a){return kc(a)};q.W=function(){var a=this.O;if(a)var b=a.k&128,a=(b?b:a.$a)||(a.k?0:v(Oa,a));else a=v(Oa,a);a=a?this.O.W(this.O):H(this.O);return a==k?k:new Gi(a,this.V)};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.F=ca();
q.Q=function(){var a=this.O.Q(this.O);return a.Na(a)};q.S=function(){var a=this.O;if(a)var b=a.k&128,a=(b?b:a.$a)||(a.k?0:v(Oa,a));else a=v(Oa,a);a=a?this.O.W(this.O):H(this.O);return a!=k?new Gi(a,this.V):G};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new Gi(this.O,b)};q.D=m("V");q.K=function(){return N(G,this.V)};function le(a){return ab(a)}function Hi(a,b,c){this.l=a;this.za=b;this.o=c;this.t=4;this.k=15077647}Hi.prototype.Ka=function(){return new Ii(Cb(this.za))};
Hi.prototype.I=function(a){var b=this.o;return b!=k?b:this.o=a=me(a)};Hi.prototype.N=function(a,b){return a.A(a,b,k)};Hi.prototype.A=function(a,b,c){return t(Va(this.za,b))?b:c};var Ji=k,Ji=function(a,b,c){switch(arguments.length){case 2:return this.N(this,b);case 3:return this.A(this,b,c)}e(Error("Invalid arity: "+arguments.length))};q=Hi.prototype;q.call=Ji;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};q.H=function(a,b){return new Hi(this.l,R.c(this.za,b,k),k)};
q.toString=function(){return Nb(this)};q.F=function(){return Fi(this.za)};q.ub=function(a,b){return new Hi(this.l,Ya(this.za,b),k)};q.J=function(){return Ca(this.za)};q.B=function(a,b){var c=hd(b);return c?(c=O(a)===O(b))?ef(function(b){return sd(a,b)},b):c:c};q.G=function(a,b){return new Hi(b,this.za,this.o)};q.D=m("l");q.K=function(){return N(Ki,this.l)};var Ki=new Hi(k,th,0);
function Li(a,b){var c=a.length;if(c/2<=qh)return c=b?a:a.slice(),new Hi(k,qa.a?qa.a(c,h):qa.call(k,c,h),k);for(var d=0,f=Cb(Ki);;)if(d<c)var g=d+2,f=Db(f,a[d]),d=g;else return Eb(f)}function Ii(a){this.qa=a;this.k=259;this.t=136}var Mi=k,Mi=function(a,b,c){switch(arguments.length){case 2:return Qa.c(this.qa,b,pd)===pd?k:b;case 3:return Qa.c(this.qa,b,pd)===pd?c:b}e(Error("Invalid arity: "+arguments.length))};q=Ii.prototype;q.call=Mi;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};
q.N=function(a,b){return a.A(a,b,k)};q.A=function(a,b,c){return Qa.c(this.qa,b,pd)===pd?c:b};q.J=function(){return O(this.qa)};q.Kb=function(a,b){this.qa=Gb(this.qa,b);return a};q.xa=function(a,b){this.qa=Fb(this.qa,b,k);return a};q.Fa=function(){return new Hi(k,Eb(this.qa),k)};function Ni(a,b,c){this.l=a;this.Ca=b;this.o=c;this.t=0;this.k=417730831}Ni.prototype.I=function(a){var b=this.o;return b!=k?b:this.o=a=me(a)};Ni.prototype.N=function(a,b){return a.A(a,b,k)};
Ni.prototype.A=function(a,b,c){a=xi(this.Ca,b);return a!=k?a.key:c};var Oi=k,Oi=function(a,b,c){switch(arguments.length){case 2:return this.N(this,b);case 3:return this.A(this,b,c)}e(Error("Invalid arity: "+arguments.length))};q=Ni.prototype;q.call=Oi;q.apply=function(a,b){a=this;return a.call.apply(a,[a].concat(b.slice()))};q.H=function(a,b){return new Ni(this.l,R.c(this.Ca,b,k),k)};q.Oa=function(){return U.a(ke,xb(this.Ca))};q.toString=function(){return Nb(this)};q.F=function(){return Fi(this.Ca)};
q.ub=function(a,b){return new Ni(this.l,Qc.a(this.Ca,b),k)};q.J=function(){return O(this.Ca)};q.B=function(a,b){var c=hd(b);return c?(c=O(a)===O(b))?ef(function(b){return sd(a,b)},b):c:c};q.G=function(a,b){return new Ni(b,this.Ca,this.o)};q.D=m("l");q.K=function(){return N(Pi,this.l)};var Pi=new Ni(k,zi,0),Qi,Ri=k;
function Si(a){var b=a instanceof Rb;if(b?a.e.length<qh:b)for(var a=a.e,b=a.length,c=Array(2*b),d=0;;)if(d<b){var f=2*d;c[f]=a[d];c[f+1]=k;d+=1}else return Li.a?Li.a(c,h):Li.call(k,c,h);else for(c=Cb(Ki);;)if(a!=k)b=a.W(a),c=c.xa(c,a.Q(a)),a=b;else return c.Fa(c)}function Ti(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return Si.call(this,b)}Ti.m=0;Ti.j=function(a){a=D(a);return Si(a)};Ti.g=Si;
Ri=function(a){switch(arguments.length){case 0:return Ki;default:return Ti.g(I(arguments,0))}e(Error("Invalid arity: "+arguments.length))};Ri.m=0;Ri.j=Ti.j;Ri.q=function(){return Ki};Ri.g=Ti.g;Qi=Ri;function Ui(a){return x.c(Fa,Pi,a)}function Vi(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return Ui.call(this,b)}Vi.m=0;Vi.j=function(a){a=D(a);return Ui(a)};Vi.g=Ui;function Wi(a){for(var b=Pg;;)if(H(a))b=wc.a(b,E(a)),a=H(a);else return D(b)}
function he(a){var b;if(b=a)b=(b=a.t&4096)?b:a.Vb;if(b)return a.name;if(sa(a))return a;if(rd(a))return b=a.lastIndexOf("/",a.length-2),0>b?ce.a(a,2):ce.a(a,b+1);e(Error([B("Doesn't support name: "),B(a)].join("")))}function Xi(a){var b;if(b=a)b=(b=a.t&4096)?b:a.Vb;if(b)return a.Ia;if(rd(a))return b=a.lastIndexOf("/",a.length-2),-1<b?ce.c(a,2,b):k;e(Error([B("Doesn't support namespace: "),B(a)].join("")))}var Yi,Zi=k;function $i(a,b,c){return(a.b?a.b(b):a.call(k,b))>(a.b?a.b(c):a.call(k,c))?b:c}
function aj(a,b,c,d){return x.c(function(b,c){return Zi.c(a,b,c)},Zi.c(a,b,c),d)}function bj(a,b,c,d){var f=k;3<arguments.length&&(f=I(Array.prototype.slice.call(arguments,3),0));return aj.call(this,a,b,c,f)}bj.m=3;bj.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=F(a);return aj(b,c,d,a)};bj.g=aj;Zi=function(a,b,c,d){switch(arguments.length){case 2:return b;case 3:return $i.call(this,a,b,c);default:return bj.g(a,b,c,I(arguments,3))}e(Error("Invalid arity: "+arguments.length))};Zi.m=3;
Zi.j=bj.j;Zi.a=function(a,b){return b};Zi.c=$i;Zi.g=bj.g;Yi=Zi;var dj=function cj(b,c){return new T(k,l,function(){var d=D(c);return d?t(b.b?b.b(E(d)):b.call(k,E(d)))?K(E(d),cj(b,F(d))):k:k},k)};function ej(a,b,c,d,f){this.l=a;this.start=b;this.end=c;this.step=d;this.o=f;this.t=0;this.k=32375006}q=ej.prototype;q.I=function(a){var b=this.o;return b!=k?b:this.o=a=kc(a)};
q.W=function(){return 0<this.step?this.start+this.step<this.end?new ej(this.l,this.start+this.step,this.end,this.step,k):k:this.start+this.step>this.end?new ej(this.l,this.start+this.step,this.end,this.step,k):k};q.H=function(a,b){return K(b,a)};q.toString=function(){return Nb(this)};q.aa=function(a,b){return Zb.a(a,b)};q.Z=function(a,b,c){return Zb.c(a,b,c)};q.F=function(a){return 0<this.step?this.start<this.end?a:k:this.start>this.end?a:k};
q.J=function(a){return ra(a.F(a))?0:Math.ceil((this.end-this.start)/this.step)};q.Q=m("start");q.S=function(a){return a.F(a)!=k?new ej(this.l,this.start+this.step,this.end,this.step,k):G};q.B=function(a,b){return nc(a,b)};q.G=function(a,b){return new ej(b,this.start,this.end,this.step,this.o)};q.D=m("l");q.M=function(a,b){if(b<a.J(a))return this.start+b*this.step;var c=this.start>this.end;if(c?0===this.step:c)return this.start;e(Error("Index out of bounds"))};
q.P=function(a,b,c){c=b<a.J(a)?this.start+b*this.step:((a=this.start>this.end)?0===this.step:a)?this.start:c;return c};q.K=function(){return N(G,this.l)};var fj,gj=k;function hj(){return gj.c(0,Number.MAX_VALUE,1)}function ij(a){return gj.c(0,a,1)}function jj(a,b){return gj.c(a,b,1)}function kj(a,b,c){return new ej(k,a,b,c,k)}
gj=function(a,b,c){switch(arguments.length){case 0:return hj.call(this);case 1:return ij.call(this,a);case 2:return jj.call(this,a,b);case 3:return kj.call(this,a,b,c)}e(Error("Invalid arity: "+arguments.length))};gj.q=hj;gj.b=ij;gj.a=jj;gj.c=kj;fj=gj;var lj,mj=k;function nj(a){for(;;)if(D(a))a=H(a);else return k}function oj(a,b){for(;;){var c=D(b);if(t(c?0<a:c))var c=a-1,d=H(b),a=c,b=d;else return k}}
mj=function(a,b){switch(arguments.length){case 1:return nj.call(this,a);case 2:return oj.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};mj.b=nj;mj.a=oj;lj=mj;var pj,qj=k;function rj(a){lj.b(a);return a}function sj(a,b){lj.a(a,b);return b}qj=function(a,b){switch(arguments.length){case 1:return rj.call(this,a);case 2:return sj.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};qj.b=rj;qj.a=sj;pj=qj;
function Z(a,b,c,d,f,g,i){z(a,c);D(i)&&(b.c?b.c(E(i),a,g):b.call(k,E(i),a,g));for(var c=D(H(i)),i=k,j=0,n=0;;)if(n<j){var u=i.M(i,n);z(a,d);b.c?b.c(u,a,g):b.call(k,u,a,g);n+=1}else if(c=D(c))i=c,ld(i)?(c=Kb(i),n=Lb(i),i=c,j=O(c),c=n):(c=E(i),z(a,d),b.c?b.c(c,a,g):b.call(k,c,a,g),c=H(i),i=k,j=0),n=0;else break;return z(a,f)}
function tj(a,b){for(var c=D(b),d=k,f=0,g=0;;)if(g<f){var i=d.M(d,g);z(a,i);g+=1}else if(c=D(c))d=c,ld(d)?(c=Kb(d),f=Lb(d),d=c,i=O(c),c=f,f=i):(i=E(d),z(a,i),c=H(d),d=k,f=0),g=0;else return k}function uj(a,b){var c=k;1<arguments.length&&(c=I(Array.prototype.slice.call(arguments,1),0));return tj.call(this,a,c)}uj.m=1;uj.j=function(a){var b=E(a),a=F(a);return tj(b,a)};uj.g=tj;
var vj={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},$=function wj(b,c,d){if(b==k)return z(c,"nil");if(ba===b)return z(c,"#<undefined>");var f;f=Q.a(d,"\ufdd0:meta");t(f)&&(f=b?((f=b.k&131072)?f:b.Ub)?h:b.k?l:v(ib,b):v(ib,b),f=t(f)?Wc(b):f);t(f)&&(z(c,"^"),wj(Wc(b),c,d),z(c," "));if(b==k)return z(c,"nil");if(b.ab)return b.wb(b,c,d);if(f=b)f=(f=b.k&2147483648)?f:b.L;if(f)return b.C(b,c,d);if((f=(b==k?k:b.constructor)===Boolean)?f:"number"===typeof b)return z(c,""+B(b));
if(b instanceof Array)return Z(c,wj,"#<Array [",", ","]>",d,b);if(ea(b))return rd(b)?(z(c,":"),d=Xi(b),t(d)&&uj.g(c,I([""+B(d),"/"],0)),z(c,he(b))):b instanceof Ob?(d=Xi(b),t(d)&&uj.g(c,I([""+B(d),"/"],0)),z(c,he(b))):t((new te("\ufdd0:readably")).call(k,d))?z(c,[B('"'),B(b.replace(RegExp('[\\\\"\b\f\n\r\t]',"g"),function(b){return vj[b]})),B('"')].join("")):z(c,b);if(Uc(b))return uj.g(c,I(["#<",""+B(b),">"],0));if(b instanceof Date)return d=function(b,c){for(var d=""+B(b);;)if(O(d)<c)d=[B("0"),B(d)].join("");
else return d},uj.g(c,I(['#inst "',""+B(b.getUTCFullYear()),"-",d(b.getUTCMonth()+1,2),"-",d(b.getUTCDate(),2),"T",d(b.getUTCHours(),2),":",d(b.getUTCMinutes(),2),":",d(b.getUTCSeconds(),2),".",d(b.getUTCMilliseconds(),3),"-",'00:00"'],0));t(b instanceof RegExp)?b=uj.g(c,I(['#"',b.source,'"'],0)):(f=b?((f=b.k&2147483648)?f:b.L)||(b.k?0:v(zb,b)):v(zb,b),b=f?Ab(b,c,d):uj.g(c,I(["#<",""+B(b),">"],0)));return b};
function xj(a){var b=pa();if(fd(a))b="";else{var c=B,d=new ma,f=new Mb(d);a:{$(E(a),f,b);for(var a=D(H(a)),g=k,i=0,j=0;;)if(j<i){var n=g.M(g,j);z(f," ");$(n,f,b);j+=1}else if(a=D(a))g=a,ld(g)?(a=Kb(g),i=Lb(g),g=a,n=O(a),a=i,i=n):(n=E(g),z(f," "),$(n,f,b),a=H(g),g=k,i=0),j=0;else break a}yb(f);b=""+c(d)}return b}function yj(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return xj(b)}yj.m=0;yj.j=function(a){a=D(a);return xj(a)};yj.g=function(a){return xj(a)};
Ei.prototype.L=h;Ei.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};Rb.prototype.L=h;Rb.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};Xg.prototype.L=h;Xg.prototype.C=function(a,b,c){return Z(b,$,"["," ","]",c,a)};md.prototype.L=h;md.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};wi.prototype.L=h;wi.prototype.C=function(a,b,c){return Z(b,function(a){return Z(b,$,""," ","",c,a)},"{",", ","}",c,a)};oh.prototype.L=h;
oh.prototype.C=function(a,b,c){return Z(b,function(a){return Z(b,$,""," ","",c,a)},"{",", ","}",c,a)};T.prototype.L=h;T.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};lc.prototype.L=h;lc.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};Ni.prototype.L=h;Ni.prototype.C=function(a,b,c){return Z(b,$,"#{"," ","}",c,a)};Uh.prototype.L=h;Uh.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};X.prototype.L=h;X.prototype.C=function(a,b,c){return Z(b,$,"["," ","]",c,a)};
nd.prototype.L=h;nd.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};bi.prototype.L=h;bi.prototype.C=function(a,b,c){return Z(b,function(a){return Z(b,$,""," ","",c,a)},"{",", ","}",c,a)};Hi.prototype.L=h;Hi.prototype.C=function(a,b,c){return Z(b,$,"#{"," ","}",c,a)};Jg.prototype.L=h;Jg.prototype.C=function(a,b,c){return Z(b,$,"["," ","]",c,a)};ne.prototype.L=h;ne.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};nh.prototype.L=h;
nh.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};oe.prototype.L=h;oe.prototype.C=function(a,b){return z(b,"()")};Y.prototype.L=h;Y.prototype.C=function(a,b,c){return Z(b,$,"["," ","]",c,a)};se.prototype.L=h;se.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};ej.prototype.L=h;ej.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};Yh.prototype.L=h;Yh.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};Gi.prototype.L=h;
Gi.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};gi.prototype.L=h;gi.prototype.C=function(a,b,c){return Z(b,$,"("," ",")",c,a)};Jg.prototype.Hb=h;Jg.prototype.Ib=function(a,b){return ud.a(a,b)};Xg.prototype.Hb=h;Xg.prototype.Ib=function(a,b){return ud.a(a,b)};function zj(a,b,c,d){this.state=a;this.l=b;this.dc=c;this.ec=d;this.k=2153938944;this.t=2}q=zj.prototype;q.I=function(a){return a[fa]||(a[fa]=++ha)};
q.Mb=function(a,b,c){for(var d=D(this.ec),f=k,g=0,i=0;;)if(i<g){var j=f.M(f,i),n=P.c(j,0,k),j=P.c(j,1,k);j.p?j.p(n,a,b,c):j.call(k,n,a,b,c);i+=1}else if(d=D(d))ld(d)?(f=Kb(d),d=Lb(d),n=f,g=O(f),f=n):(f=E(d),n=P.c(f,0,k),j=P.c(f,1,k),j.p?j.p(n,a,b,c):j.call(k,n,a,b,c),d=H(d),f=k,g=0),i=0;else return k};q.C=function(a,b,c){z(b,"#<Atom: ");$(this.state,b,c);return z(b,">")};q.D=m("l");q.fb=m("state");q.B=function(a,b){return a===b};var Aj,Bj=k;function Cj(a){return new zj(a,k,k,k)}
function Dj(a,b){var c=qd(b)?S.a(Nc,b):b,d=Q.a(c,"\ufdd0:validator"),c=Q.a(c,"\ufdd0:meta");return new zj(a,c,d,k)}function Ej(a,b){var c=k;1<arguments.length&&(c=I(Array.prototype.slice.call(arguments,1),0));return Dj.call(this,a,c)}Ej.m=1;Ej.j=function(a){var b=E(a),a=F(a);return Dj(b,a)};Ej.g=Dj;Bj=function(a,b){switch(arguments.length){case 1:return Cj.call(this,a);default:return Ej.g(a,I(arguments,1))}e(Error("Invalid arity: "+arguments.length))};Bj.m=1;Bj.j=Ej.j;Bj.b=Cj;Bj.g=Ej.g;Aj=Bj;
function Fj(a,b){var c=a.dc;t(c)&&!t(c.b?c.b(b):c.call(k,b))&&e(Error([B("Assert failed: "),B("Validator rejected reference state"),B("\n"),B(yj.g(I([mc(new Ob(k,"validate","validate",1233162959,k),new Ob(k,"new-value","new-value",972165309,k))],0)))].join("")));c=a.state;a.state=b;Bb(a,c,b);return b}var Gj,Hj=k;function Ij(a,b){return Fj(a,b.b?b.b(a.state):b.call(k,a.state))}function Jj(a,b,c){return Fj(a,b.a?b.a(a.state,c):b.call(k,a.state,c))}
function Kj(a,b,c,d){return Fj(a,b.c?b.c(a.state,c,d):b.call(k,a.state,c,d))}function Lj(a,b,c,d,f){return Fj(a,b.p?b.p(a.state,c,d,f):b.call(k,a.state,c,d,f))}function Mj(a,b,c,d,f,g){return Fj(a,S.g(b,a.state,c,d,f,I([g],0)))}function Nj(a,b,c,d,f,g){var i=k;5<arguments.length&&(i=I(Array.prototype.slice.call(arguments,5),0));return Mj.call(this,a,b,c,d,f,i)}Nj.m=5;Nj.j=function(a){var b=E(a),a=H(a),c=E(a),a=H(a),d=E(a),a=H(a),f=E(a),a=H(a),g=E(a),a=F(a);return Mj(b,c,d,f,g,a)};Nj.g=Mj;
Hj=function(a,b,c,d,f,g){switch(arguments.length){case 2:return Ij.call(this,a,b);case 3:return Jj.call(this,a,b,c);case 4:return Kj.call(this,a,b,c,d);case 5:return Lj.call(this,a,b,c,d,f);default:return Nj.g(a,b,c,d,f,I(arguments,5))}e(Error("Invalid arity: "+arguments.length))};Hj.m=5;Hj.j=Nj.j;Hj.a=Ij;Hj.c=Jj;Hj.p=Kj;Hj.z=Lj;Hj.g=Nj.g;Gj=Hj;function J(a){return hb(a)}var Oj={};
function Pj(a){if(a?a.Sb:a)return a.Sb(a);var b;var c=Pj[r(a==k?k:a)];c?b=c:(c=Pj._)?b=c:e(w("IEncodeJS.-clj->js",a));return b.call(k,a)}function Qj(a){return(a?t(t(k)?k:a.Rb)||(a.yb?0:v(Oj,a)):v(Oj,a))?Pj(a):function(){var b=sa(a);return b||(b="number"===typeof a)?b:(b=rd(a))?b:a instanceof Ob}()?Rj.b?Rj.b(a):Rj.call(k,a):yj.g(I([a],0))}
var Rj=function Sj(b){if(b==k)return k;if(b?t(t(k)?k:b.Rb)||(b.yb?0:v(Oj,b)):v(Oj,b))return Pj(b);if(rd(b))return he(b);if(b instanceof Ob)return""+B(b);if(jd(b)){for(var c={},b=D(b),d=k,f=0,g=0;;)if(g<f){var i=d.M(d,g),j=P.c(i,0,k),i=P.c(i,1,k);c[Qj(j)]=Sj(i);g+=1}else if(b=D(b))ld(b)?(f=Kb(b),b=Lb(b),d=f,f=O(f)):(f=E(b),d=P.c(f,0,k),f=P.c(f,1,k),c[Qj(d)]=Sj(f),b=H(b),d=k,f=0),g=0;else break;return c}return gd(b)?S.a(ta,U.a(Sj,b)):b},Tj={};
function Uj(a,b){if(a?a.Qb:a)return a.Qb(a,b);var c;var d=Uj[r(a==k?k:a)];d?c=d:(d=Uj._)?c=d:e(w("IEncodeClojure.-js->clj",a));return c.call(k,a,b)}var Vj,Wj=k;function Xj(a){return Wj.g(a,I([qa(["\ufdd0:keywordize-keys",l],h)],0))}
function Yj(a,b){if(Tj?t(t(k)?k:Tj.sc)||(Tj.yb?0:v(a,Tj)):v(a,Tj))return Uj(a,S.a(Di,b));if(D(b)){var c=qd(b)?S.a(Nc,b):b,c=Q.a(c,"\ufdd0:keywordize-keys"),d=t(c)?ee:B;return function g(a){var b;if(qd(a))b=pj.b(U.a(g,a));else if(gd(a))b=fg(Da(a),U.a(g,a));else if(a instanceof Array)b=Rg(U.a(g,a));else if((a==k?k:a.constructor)===Object){b=th;var c=[],u=function(a,b){return c.push(b)},A;for(A in a)u.call(ba,0,A);b=fg(b,function M(b){return new T(k,l,function(){for(;;){var c=D(b);if(c){if(ld(c)){var j=
Kb(c),n=O(j),u=new xe(Array(n),0);a:{for(var A=0;;)if(A<n){var wa=y.a(j,A),wa=V([d.b?d.b(wa):d.call(k,wa),g(a[wa])]);u.add(wa);A+=1}else{j=h;break a}j=ba}return j?Ee(u.la(),M(Lb(c))):Ee(u.la(),k)}u=E(c);return K(V([d.b?d.b(u):d.call(k,u),g(a[u])]),M(F(c)))}return k}},k)}(c))}else b=a;return b}(a)}return k}function Zj(a,b){var c=k;1<arguments.length&&(c=I(Array.prototype.slice.call(arguments,1),0));return Yj.call(this,a,c)}Zj.m=1;Zj.j=function(a){var b=E(a),a=F(a);return Yj(b,a)};Zj.g=Yj;
Wj=function(a,b){switch(arguments.length){case 1:return Xj.call(this,a);default:return Zj.g(a,I(arguments,1))}e(Error("Invalid arity: "+arguments.length))};Wj.m=1;Wj.j=Zj.j;Wj.b=Xj;Wj.g=Zj.g;Vj=Wj;var $j,ak,ck=function bk(b,c){ba===$j&&($j={},$j=function(b,c,g,i){this.da=b;this.Ga=c;this.bc=g;this.$b=i;this.t=0;this.k=917504},$j.ab=h,$j.xb="clojure.core.reducers/t4448",$j.wb=function(b,c){return z(c,"clojure.core.reducers/t4448")},$j.prototype.aa=function(b,c){return b.Z(b,c,c.q?c.q():c.call(k))},$j.prototype.Z=function(b,c,g){return nb.c(this.Ga,this.da.b?this.da.b(c):this.da.call(k,c),g)},$j.prototype.D=m("$b"),$j.prototype.G=function(b,c){return new $j(this.da,this.Ga,this.bc,c)});return new $j(c,
b,bk,k)},ek=function dk(b,c){ba===ak&&(ak={},ak=function(b,c,g,i){this.da=b;this.Ga=c;this.Yb=g;this.ac=i;this.t=0;this.k=917504},ak.ab=h,ak.xb="clojure.core.reducers/t4454",ak.wb=function(b,c){return z(c,"clojure.core.reducers/t4454")},ak.prototype.aa=function(b,c){return nb.c(this.Ga,this.da.b?this.da.b(c):this.da.call(k,c),c.q?c.q():c.call(k))},ak.prototype.Z=function(b,c,g){return nb.c(this.Ga,this.da.b?this.da.b(c):this.da.call(k,c),g)},ak.prototype.D=m("ac"),ak.prototype.G=function(b,c){return new ak(this.da,
this.Ga,this.Yb,c)});return new ak(c,b,dk,k)},fk,gk=k;function hk(a){return function(b){return gk.a(a,b)}}function ik(a,b){return ek(b,function(b){var d=k;return d=function(d,g,i){switch(arguments.length){case 0:return b.q?b.q():b.call(k);case 2:return b.a?b.a(d,a.b?a.b(g):a.call(k,g)):b.call(k,d,a.b?a.b(g):a.call(k,g));case 3:return b.a?b.a(d,a.a?a.a(g,i):a.call(k,g,i)):b.call(k,d,a.a?a.a(g,i):a.call(k,g,i))}e(Error("Invalid arity: "+arguments.length))}})}
gk=function(a,b){switch(arguments.length){case 1:return hk.call(this,a);case 2:return ik.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};gk.b=hk;gk.a=ik;fk=gk;var jk,kk=k;function lk(a){return function(b){return kk.a(a,b)}}
function mk(a,b){return ek(b,function(b){var d=k;return d=function(d,g,i){switch(arguments.length){case 0:return b.q?b.q():b.call(k);case 2:return t(a.b?a.b(g):a.call(k,g))?b.a?b.a(d,g):b.call(k,d,g):d;case 3:return t(a.a?a.a(g,i):a.call(k,g,i))?b.c?b.c(d,g,i):b.call(k,d,g,i):d}e(Error("Invalid arity: "+arguments.length))}})}kk=function(a,b){switch(arguments.length){case 1:return lk.call(this,a);case 2:return mk.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};kk.b=lk;kk.a=mk;jk=kk;
var nk,ok=k;function pk(){return function(a){return ok.b(a)}}function qk(a){return ek(a,function(a){var c=k;return c=function(c,f){switch(arguments.length){case 0:return a.q?a.q():a.call(k);case 2:return id(f)?nb.c(ok.b(f),a,c):a.a?a.a(c,f):a.call(k,c,f)}e(Error("Invalid arity: "+arguments.length))}})}ok=function(a){switch(arguments.length){case 0:return pk.call(this);case 1:return qk.call(this,a)}e(Error("Invalid arity: "+arguments.length))};ok.q=pk;ok.b=qk;nk=ok;var rk,sk=k;
function tk(a){return function(b){return sk.a(a,b)}}function uk(a,b){return jk.a(gf(a),b)}sk=function(a,b){switch(arguments.length){case 1:return tk.call(this,a);case 2:return uk.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};sk.b=tk;sk.a=uk;rk=sk;var vk,wk=k;function xk(a){return function(b){return wk.a(a,b)}}
function yk(a,b){return ck(b,function(b){var d=k;return d=function(d,g,i){switch(arguments.length){case 0:return b.q?b.q():b.call(k);case 2:return t(a.b?a.b(g):a.call(k,g))?b.a?b.a(d,g):b.call(k,d,g):new Xb(d);case 3:return t(a.a?a.a(g,i):a.call(k,g,i))?b.c?b.c(d,g,i):b.call(k,d,g,i):new Xb(d)}e(Error("Invalid arity: "+arguments.length))}})}wk=function(a,b){switch(arguments.length){case 1:return xk.call(this,a);case 2:return yk.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};wk.b=xk;
wk.a=yk;vk=wk;var zk,Ak=k;function Bk(a){return function(b){return Ak.a(a,b)}}function Ck(a,b){return ck(b,function(b){var d=Aj.b(a),f=k;return f=function(a,f,j){switch(arguments.length){case 0:return b.q?b.q():b.call(k);case 2:return Gj.a(d,Qd),0>hb(d)?new Xb(a):b.a?b.a(a,f):b.call(k,a,f);case 3:return Gj.a(d,Qd),0>hb(d)?new Xb(a):b.c?b.c(a,f,j):b.call(k,a,f,j)}e(Error("Invalid arity: "+arguments.length))}})}
Ak=function(a,b){switch(arguments.length){case 1:return Bk.call(this,a);case 2:return Ck.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};Ak.b=Bk;Ak.a=Ck;zk=Ak;var Dk,Ek=k;function Fk(a){return function(b){return Ek.a(a,b)}}
function Gk(a,b){return ck(b,function(b){var d=Aj.b(a),f=k;return f=function(a,f,j){switch(arguments.length){case 0:return b.q?b.q():b.call(k);case 2:return Gj.a(d,Qd),0>hb(d)?b.a?b.a(a,f):b.call(k,a,f):a;case 3:return Gj.a(d,Qd),0>hb(d)?b.c?b.c(a,f,j):b.call(k,a,f,j):a}e(Error("Invalid arity: "+arguments.length))}})}Ek=function(a,b){switch(arguments.length){case 1:return Fk.call(this,a);case 2:return Gk.call(this,a,b)}e(Error("Invalid arity: "+arguments.length))};Ek.b=Fk;Ek.a=Gk;Dk=Ek;function Hk(a,b){var c=S.c(Yi,a,b);return K(c,eg(function(a){return c===a},b))}var Ik,Jk=k;function Kk(a,b){return O(a)<O(b)?x.c(wc,b,a):x.c(wc,a,b)}function Lk(a,b,c){a=Hk(O,wc.g(c,b,I([a],0)));return x.c(fg,E(a),F(a))}function Mk(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return Lk.call(this,a,b,d)}Mk.m=2;Mk.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return Lk(b,c,a)};Mk.g=Lk;
Jk=function(a,b,c){switch(arguments.length){case 0:return Ki;case 1:return a;case 2:return Kk.call(this,a,b);default:return Mk.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};Jk.m=2;Jk.j=Mk.j;Jk.q=function(){return Ki};Jk.b=ca();Jk.a=Kk;Jk.g=Mk.g;Ik=Jk;var Nk,Ok=k;function Pk(a,b){for(;;)if(O(b)<O(a))var c=a,a=b,b=c;else return x.c(function(a,b){return function(a,c){return sd(b,c)?a:Xc.a(a,c)}}(a,b),a,a)}
function Qk(a,b,c){a=Hk(function(a){return-O(a)},wc.g(c,b,I([a],0)));return x.c(Ok,E(a),F(a))}function Rk(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return Qk.call(this,a,b,d)}Rk.m=2;Rk.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return Qk(b,c,a)};Rk.g=Qk;Ok=function(a,b,c){switch(arguments.length){case 1:return a;case 2:return Pk.call(this,a,b);default:return Rk.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};Ok.m=2;Ok.j=Rk.j;Ok.b=ca();
Ok.a=Pk;Ok.g=Rk.g;Nk=Ok;var Sk,Tk=k;function Uk(a,b){return O(a)<O(b)?x.c(function(a,d){return sd(b,d)?Xc.a(a,d):a},a,a):x.c(Xc,a,b)}function Vk(a,b,c){return x.c(Tk,a,wc.a(c,b))}function Wk(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return Vk.call(this,a,b,d)}Wk.m=2;Wk.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return Vk(b,c,a)};Wk.g=Vk;
Tk=function(a,b,c){switch(arguments.length){case 1:return a;case 2:return Uk.call(this,a,b);default:return Wk.g(a,b,I(arguments,2))}e(Error("Invalid arity: "+arguments.length))};Tk.m=2;Tk.j=Wk.j;Tk.b=ca();Tk.a=Uk;Tk.g=Wk.g;Sk=Tk;s("mori.count",O);s("mori.empty",function(a){return Da(a)});s("mori.first",E);s("mori.rest",F);s("mori.seq",D);s("mori.conj",wc);var Xk=K;s("mori.cons",Xk);s("mori.find",function(a,b){var c;if(c=a!=k)c=a?((c=a.k&512)?c:a.hc)?h:a.k?l:v(Ua,a):v(Ua,a),c=c?sd(a,b):c;return c?V([b,Q.a(a,b)]):k});s("mori.nth",P);s("mori.last",vc);s("mori.assoc",R);s("mori.dissoc",Qc);s("mori.get_in",lg);s("mori.update_in",pg);
s("mori.assoc_in",function Yk(b,c,d){var f=P.c(c,0,k),c=Td(c);return t(c)?R.c(b,f,Yk(Q.a(b,f),c,d)):R.c(b,f,d)});s("mori.fnil",vf);s("mori.disj",Xc);s("mori.pop",function(a){return eb(a)});s("mori.peek",function(a){return db(a)});s("mori.hash",C);s("mori.get",Q);s("mori.has_key",sd);s("mori.is_empty",fd);s("mori.reverse",pe);s("mori.take",Hf);s("mori.drop",If);s("mori.partition",gg);
s("mori.partition_by",function Zk(b,c){return new T(k,l,function(){var d=D(c);if(d){var f=E(d),g=b.b?b.b(f):b.call(k,f),f=K(f,dj(function(c){return Sb.a(g,b.b?b.b(c):b.call(k,c))},H(d)));return K(f,Zk(b,D(If(O(f),d))))}return k},k)});s("mori.iterate",function $k(b,c){return K(c,new T(k,l,function(){return $k(b,b.b?b.b(c):b.call(k,c))},k))});s("mori.into",fg);s("mori.subvec",$g);s("mori.interpose",function(a,b){return If(1,Sf.a(Jf.b(a),b))});s("mori.interleave",Sf);s("mori.concat",Ie);
s("mori.flatten",function(a){return dg(function(a){return!id(a)},F(function c(a){return new T(k,l,function(){return K(a,t(id.b?id.b(a):id.call(k,a))?Yf.a(c,D.b?D.b(a):D.call(k,a)):k)},k)}(a)))});s("mori.keys",Fi);s("mori.vals",function(a){return(a=D(a))?new Gi(a,k):k});s("mori.prim_seq",oc);s("mori.map",U);s("mori.mapcat",Yf);var al=x;s("mori.reduce",al);s("mori.reduce_kv",function(a,b,c){return rb(c,a,b)});s("mori.filter",dg);s("mori.remove",eg);
s("mori.some",function(a,b){for(;;)if(D(b)){var c=a.b?a.b(E(b)):a.call(k,E(b));if(t(c))return c;var c=a,d=H(b),a=c,b=d}else return k});s("mori.every",ef);s("mori.equals",Sb);s("mori.range",fj);s("mori.repeat",Jf);s("mori.repeatedly",Nf);s("mori.sort",zd);s("mori.sort_by",Ed);s("mori.into_array",ua);s("mori.rmap",fk);s("mori.rfilter",jk);s("mori.rremove",rk);s("mori.rtake",zk);s("mori.rtake_while",vk);s("mori.rdrop",Dk);s("mori.rflatten",nk);s("mori.list",mc);s("mori.vector",Sg);
s("mori.array_map",Di);s("mori.hash_map",Nc);s("mori.zipmap",function(a,b){for(var c=Cb(th),d=D(a),f=D(b);;){var g=d;if(g?f:g)c=We(c,E(d),E(f)),d=H(d),f=H(f);else return Eb(c)}});s("mori.set",function(a){return S.a(Qi,a)});s("mori.sorted_set",Vi);s("mori.union",Ik);s("mori.intersection",Nk);s("mori.difference",Sk);s("mori.is_subset",function(a,b){var c=O(a)<=O(b);return c?ef(function(a){return sd(b,a)},a):c});
s("mori.is_superset",function(a,b){var c=O(a)>=O(b);return c?ef(function(b){return sd(a,b)},b):c});s("mori.partial",of);s("mori.comp",hf);function bl(a){return al.a?al.a(function(a,c){return c.b?c.b(a):c.call(k,a)},a):al.call(k,function(a,c){return c.b?c.b(a):c.call(k,a)},a)}function cl(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return bl.call(this,b)}cl.m=0;cl.j=function(a){a=D(a);return bl(a)};cl.g=bl;s("mori.pipeline",cl);
function dl(a,b){return function(c){return S.a(a,Xk.a?Xk.a(c,b):Xk.call(k,c,b))}}function el(a,b){var c=k;1<arguments.length&&(c=I(Array.prototype.slice.call(arguments,1),0));return dl.call(this,a,c)}el.m=1;el.j=function(a){var b=E(a),a=F(a);return dl(b,a)};el.g=dl;s("mori.curry",el);
function fl(a){function b(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return c.call(this,b)}function c(b){return ua.b?ua.b(U.a?U.a(function(a){return S.a(a,b)},a):U.call(k,function(a){return S.a(a,b)},a)):ua.call(k,U.a?U.a(function(a){return S.a(a,b)},a):U.call(k,function(a){return S.a(a,b)},a))}b.m=0;b.j=function(a){a=D(a);return c(a)};b.g=c;return b}
function gl(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return fl.call(this,b)}gl.m=0;gl.j=function(a){a=D(a);return fl(a)};gl.g=fl;s("mori.juxt",gl);function hl(a){return function(b){return ua.b?ua.b(U.c?U.c(function(a,b){return a.b?a.b(b):a.call(k,b)},a,b):U.call(k,function(a,b){return a.b?a.b(b):a.call(k,b)},a,b)):ua.call(k,U.c?U.c(function(a,b){return a.b?a.b(b):a.call(k,b)},a,b):U.call(k,function(a,b){return a.b?a.b(b):a.call(k,b)},a,b))}}
function il(a){var b=k;0<arguments.length&&(b=I(Array.prototype.slice.call(arguments,0),0));return hl.call(this,b)}il.m=0;il.j=function(a){a=D(a);return hl(a)};il.g=hl;s("mori.knit",il);s("mori.sum",function(a,b){return a+b});s("mori.inc",function(a){return a+1});s("mori.dec",function(a){return a-1});s("mori.is_even",function(a){return 0===(a%2+2)%2});s("mori.is_odd",function(a){return 1===(a%2+2)%2});
s("mori.each",function(a,b){for(var c=D(a),d=k,f=0,g=0;;)if(g<f){var i=d.M(d,g);b.b?b.b(i):b.call(k,i);g+=1}else if(c=D(c))d=c,ld(d)?(c=Kb(d),f=Lb(d),d=c,i=O(c),c=f,f=i):(i=E(d),b.b?b.b(i):b.call(k,i),c=H(d),d=k,f=0),g=0;else return k});s("mori.identity",ff);s("mori.constantly",function(a){function b(b){0<arguments.length&&I(Array.prototype.slice.call(arguments,0),0);return a}b.m=0;b.j=function(b){D(b);return a};b.g=function(){return a};return b});s("mori.clj_to_js",Rj);s("mori.js_to_clj",Vj);
T.prototype.inspect=function(){return this.toString()};Rb.prototype.inspect=function(){return this.toString()};lc.prototype.inspect=function(){return this.toString()};gi.prototype.inspect=function(){return this.toString()};Uh.prototype.inspect=function(){return this.toString()};Yh.prototype.inspect=function(){return this.toString()};ne.prototype.inspect=function(){return this.toString()};se.prototype.inspect=function(){return this.toString()};oe.prototype.inspect=function(){return this.toString()};
Jg.prototype.inspect=function(){return this.toString()};md.prototype.inspect=function(){return this.toString()};nd.prototype.inspect=function(){return this.toString()};Xg.prototype.inspect=function(){return this.toString()};Y.prototype.inspect=function(){return this.toString()};X.prototype.inspect=function(){return this.toString()};oh.prototype.inspect=function(){return this.toString()};bi.prototype.inspect=function(){return this.toString()};wi.prototype.inspect=function(){return this.toString()};
Hi.prototype.inspect=function(){return this.toString()};Ni.prototype.inspect=function(){return this.toString()};ej.prototype.inspect=function(){return this.toString()};function jl(a,b,c,d){return N(V([d,k]),qa(["\ufdd0:zip/make-node",c,"\ufdd0:zip/children",b,"\ufdd0:zip/branch?",a],h))}function kl(a){return a.b?a.b(0):a.call(k,0)}function ll(a){return(new te("\ufdd0:zip/branch?")).call(k,Wc(a)).call(k,kl(a))}function ml(a){if(t(ll(a)))return(new te("\ufdd0:zip/children")).call(k,Wc(a)).call(k,kl(a));e("called children on a leaf node")}function nl(a,b,c){return(new te("\ufdd0:zip/make-node")).call(k,Wc(a)).call(k,b,c)}
function ol(a){if(t(ll(a))){var b=P.c(a,0,k),c=P.c(a,1,k),d=ml(a),f=P.c(d,0,k),g=Td(d);return t(d)?N(V([f,qa(["\ufdd0:l",Pg,"\ufdd0:pnodes",t(c)?wc.a((new te("\ufdd0:pnodes")).call(k,c),b):V([b]),"\ufdd0:ppath",c,"\ufdd0:r",g],h)]),Wc(a)):k}return k}
function pl(a){var b=P.c(a,0,k),c=P.c(a,1,k),d=qd(c)?S.a(Nc,c):c,c=Q.a(d,"\ufdd0:l"),f=Q.a(d,"\ufdd0:ppath"),g=Q.a(d,"\ufdd0:pnodes"),i=Q.a(d,"\ufdd0:r"),d=Q.a(d,"\ufdd0:changed?");return t(g)?(g=db(g),N(t(d)?V([nl(a,g,Ie.a(c,K(b,i))),t(f)?R.c(f,"\ufdd0:changed?",h):f]):V([g,f]),Wc(a))):k}
function ql(a){var b=P.c(a,0,k),c=P.c(a,1,k),c=qd(c)?S.a(Nc,c):c,d=Q.a(c,"\ufdd0:l"),f=Q.a(c,"\ufdd0:r"),g=P.c(f,0,k),i=Td(f);return t(t(c)?f:c)?N(V([g,R.g(c,"\ufdd0:l",wc.a(d,b),I(["\ufdd0:r",i],0))]),Wc(a)):k}function rl(a){var b=P.c(a,0,k),c=P.c(a,1,k),c=qd(c)?S.a(Nc,c):c,d=Q.a(c,"\ufdd0:l"),f=Q.a(c,"\ufdd0:r");return t(t(c)?f:c)?N(V([vc(f),R.g(c,"\ufdd0:l",S.p(wc,d,b,Wi(f)),I(["\ufdd0:r",k],0))]),Wc(a)):a}
function sl(a){var b=P.c(a,0,k),c=P.c(a,1,k),c=qd(c)?S.a(Nc,c):c,d=Q.a(c,"\ufdd0:l"),f=Q.a(c,"\ufdd0:r");return t(t(c)?D(d):c)?N(V([db(d),R.g(c,"\ufdd0:l",eb(d),I(["\ufdd0:r",K(b,f)],0))]),Wc(a)):k}function tl(a,b){P.c(a,0,k);var c=P.c(a,1,k);return N(V([b,R.c(c,"\ufdd0:changed?",h)]),Wc(a))}function ul(a,b,c){return tl(a,S.c(b,kl(a),c))}function vl(a,b,c){var d=k;2<arguments.length&&(d=I(Array.prototype.slice.call(arguments,2),0));return ul.call(this,a,b,d)}vl.m=2;
vl.j=function(a){var b=E(a),a=H(a),c=E(a),a=F(a);return ul(b,c,a)};vl.g=ul;s("mori.zip.zipper",jl);s("mori.zip.seq_zip",function(a){return jl(qd,ff,function(a,c){return N(c,Wc(a))},a)});s("mori.zip.vector_zip",function(a){return jl(kd,D,function(a,c){return N(Rg(c),Wc(a))},a)});s("mori.zip.node",kl);s("mori.zip.is_branch",{}.gc);s("mori.zip.children",ml);s("mori.zip.make_node",nl);s("mori.zip.path",function(a){return(new te("\ufdd0:pnodes")).call(k,a.b?a.b(1):a.call(k,1))});s("mori.zip.lefts",function(a){return D((new te("\ufdd0:l")).call(k,a.b?a.b(1):a.call(k,1)))});
s("mori.zip.rights",function(a){return(new te("\ufdd0:r")).call(k,a.b?a.b(1):a.call(k,1))});s("mori.zip.down",ol);s("mori.zip.up",pl);s("mori.zip.root",function(a){for(;;){if(Sb.a("\ufdd0:end",a.b?a.b(1):a.call(k,1)))return kl(a);var b=pl(a);if(t(b))a=b;else return kl(a)}});s("mori.zip.right",ql);s("mori.zip.rightmost",rl);s("mori.zip.left",sl);
s("mori.zip.leftmost",function(a){var b=P.c(a,0,k),c=P.c(a,1,k),c=qd(c)?S.a(Nc,c):c,d=Q.a(c,"\ufdd0:l"),f=Q.a(c,"\ufdd0:r");return t(t(c)?D(d):c)?N(V([E(d),R.g(c,"\ufdd0:l",Pg,I(["\ufdd0:r",Ie.g(F(d),V([b]),I([f],0))],0))]),Wc(a)):a});s("mori.zip.insert_left",function(a,b){var c=P.c(a,0,k),d=P.c(a,1,k),d=qd(d)?S.a(Nc,d):d,f=Q.a(d,"\ufdd0:l");d==k&&e("Insert at top");return N(V([c,R.g(d,"\ufdd0:l",wc.a(f,b),I(["\ufdd0:changed?",h],0))]),Wc(a))});
s("mori.zip.insert_right",function(a,b){var c=P.c(a,0,k),d=P.c(a,1,k),d=qd(d)?S.a(Nc,d):d,f=Q.a(d,"\ufdd0:r");d==k&&e("Insert at top");return N(V([c,R.g(d,"\ufdd0:r",K(b,f),I(["\ufdd0:changed?",h],0))]),Wc(a))});s("mori.zip.replace",tl);s("mori.zip.edit",vl);s("mori.zip.insert_child",function(a,b){return tl(a,nl(a,kl(a),K(b,ml(a))))});s("mori.zip.append_child",function(a,b){return tl(a,nl(a,kl(a),Ie.a(ml(a),V([b]))))});
s("mori.zip.next",function(a){if(Sb.a("\ufdd0:end",a.b?a.b(1):a.call(k,1)))return a;var b;b=ll(a);b=t(b)?ol(a):b;if(t(b))return b;b=ql(a);if(t(b))return b;for(;;)if(t(pl(a))){b=ql(pl(a));if(t(b))return b;a=pl(a)}else return V([kl(a),"\ufdd0:end"])});s("mori.zip.prev",function(a){var b=sl(a);if(t(b))for(a=b;;)if(b=ll(a),b=t(b)?ol(a):b,t(b))a=rl(b);else return a;else return pl(a)});s("mori.zip.is_end",function(a){return Sb.a("\ufdd0:end",a.b?a.b(1):a.call(k,1))});
s("mori.zip.remove",function(a){P.c(a,0,k);var b=P.c(a,1,k),b=qd(b)?S.a(Nc,b):b,c=Q.a(b,"\ufdd0:l"),d=Q.a(b,"\ufdd0:ppath"),f=Q.a(b,"\ufdd0:pnodes"),g=Q.a(b,"\ufdd0:r");b==k&&e("Remove at top");if(0<O(c))for(a=N(V([db(c),R.g(b,"\ufdd0:l",eb(c),I(["\ufdd0:changed?",h],0))]),Wc(a));;)if(b=ll(a),b=t(b)?ol(a):b,t(b))a=rl(b);else return a;else return N(V([nl(a,db(f),g),t(d)?R.c(d,"\ufdd0:changed?",h):d]),Wc(a))});s("mori.mutable.thaw",function(a){return Cb(a)});s("mori.mutable.freeze",Ve);s("mori.mutable.conj",function(a,b){return Db(a,b)});s("mori.mutable.assoc",We);s("mori.mutable.dissoc",function(a,b){return Gb(a,b)});s("mori.mutable.pop",function(a){return Hb(a)});s("mori.mutable.disj",function(a,b){return Ib(a,b)});;return this.mori;}.call({});});

//functions to handle placing elements in the viewable viewport, also listens for screen resizes to move the elements accordingly
//pass in the viewport as the el
//most functions return this so you can chain function calls, if it doesn't return this it should return a promise of something (e.g. button click)
define('views/ViewportHandler',["core/q", "core/mori"], function(Q, mori){ 
  m = mori
  return Backbone.View.extend({

    offsetFromCenter: 60

    , delayToRemove: 500 //delay in ms before removing an element, so it doesn't go away without while we are looking at it
    
    , bottomMargin: 50

    , topPageMargin: 0 //will be set in the initialize function

    //fuck yeah, clojure datastructures, now we are talking
    , activeViews : mori.set()

    , elements : mori.set()

    , onDelay : false

    , delayedFns : []

    , initialize : function(){
      this.topPageMargin = parseInt( this.$el.css('margin-top') )
      //vector of vectors containing the element and the position function to run (e.g. [[$("#vault"), _.bind(this.placeCenter,this)]...])

      window.onresize = _.debounce(_.bind(function(){ this.rebuildElements()},this), 300)

      // todo: implement variadic pages
      //The size of the viewport can vary depending on how many pages we want
      //this.options.pages 
      
    }

    //keep track of views that are introduced into the viewport
    //if the element hasn't been placed on the page here is where we place it
    //this function and exeunt are the only ones allowed to use views
    , introduce : function(view, index){

      //check delay, if we are in a delay, lets put it on the queue of things to run after the delay
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.introduce,this, view, index))
        return this
      }

      this.activeViews =  mori.conj(this.activeViews, view)

      if (!document.contains(view.el)){
          this.$el.find("#page"+index).append(view.el)
      }

      return this;
    }
    
    , introduceEl : function(el, index){
      if (document.contains(el)){
          $(el).remove()
      }

      this.$el.find("#page"+index).append(el)

      return this;
    }

    //exeunt, as in the stage direction meaning to get off stage
    //This function should be called with a specifc view to get rid of that view, or if not called with a specific view, it will destroy all activeViews
    //can also be called with an array to get rid of a set of views
    , exeunt : function(view){
      //check delay, if we are in a delay, lets put it on the queue of things to run after the delay
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.exeunt,this,view))
        return this
      }

      var itemsToRemove 
      , that = this
      //they passed in an array
      if (_.isArray(view)){
        itemsToRemove = view
      }else if (_.isUndefined(view)){ //they passed in nothing, so get rid of everything
        itemsToRemove = mori.into_array(this.activeViews)
        //go an hide all the buttons too
        this.hideAllButtons()
      } else {
        itemsToRemove = [view]
      }

      //because they are a set we can just disjoin the activeViews set from the existings views
      this.activeViews = mori.disj.apply(null, [this.activeViews].concat(itemsToRemove))

      mori.pipeline(
        mori.vector.apply(null,itemsToRemove),
        mori.curry(mori.each,function(view){
          //remove the element from the list keeping track of elements
          that.elements = that.removeElement(that.elements, view.el)
          //wait a bit for the item to fall off screen
          _.delay(_.bind(view.remove,view), that.delayToRemove) 
        }))

      return this;

    }

    , moveToPage: function(index){
      //check delay, if we are in a delay, lets put it on the queue of things to run after the delay
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.moveToPage,this,element,left, top))
        return this
      }

      this.$el.css('left',index*-100+"%")
      return this
    }

    , rebuildElements : function(){
      return mori.each(this.elements, function(elInfo){ elInfo[1]()})
    }

    , removeElement: function(elements, element){
      return mori.remove(function(e){return e[0]===element}, elements)
    }

    //Track the elements and their placing functions
    , trackElement: function(element, placementFunction){
      //check if jquery obj
      if (_.isArray(element) ) element=element[0]

      this.elements = this.removeElement(this.elements, element);
      this.elements = mori.conj(this.elements, [element, placementFunction])
    }

    // function that will cause everything after it to delay
    // works by having a queue, and a flag
    // the placeElement function checks for the flag this.onDelay and will append the function to run to the queue
    // this then calls the queue after the delay
    // if you add more functions and want delay to work with them, make sure you check for the flag and place the function on the queue
    , delay : function(milliseconds){
      // set the flag to true
      this.onDelay = true
      _.delay(_.bind(function(){
        //change the flag
        this.onDelay = false
        // run each delayed fn
        _.each(this.delayedFns, function(fn){ fn() })
      },this), milliseconds)

      return this;
    }

    , placeElement : function(element, left, top){

      //check delay, if we are in a delay, lets put it on the queue of things to run after the delay
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.placeElement,this,element,left, top))
        return this
      }


      $(element).css("left", left)
      $(element).css("top", top)
    }

    //show and hide for chaining convienence
    , show: function(element, useOpacity){
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.show,this,element, useOpacity))
        return this
      }

      if (useOpacity){
        $(element).css('opacity',1)
      }else{
        $(element).show()
      }
      return this
    }

    , hide: function(element, useOpacity){
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.hide,this,element, useOpacity))
        return this
      }

      if (useOpacity){
        $(element).css('opacity',0)
      }else{
        $(element).hide()
      }
      return this
    }

    , toggleAnimate : function(element){
      $(element).toggleClass('noAnimate')
      return this
    }

    // when using position:relative you need to calculate the starting position of the element with reference to previous elements
    // call this function with the previous element since it's recursive. (i.e. this.findOffsetPosition(element.prev())
    , findOffsetPosition : function($element, totalWidth){
      if(_.isUndefined(totalWidth)){
        totalWidth = 0
      }
      
      //at the end of the previous element chain
      if ( $element.width() === null ){
        return totalWidth;
      }

      if ( $element.css('position') !== "absolute" && $element.css('display').indexOf('inline') !== -1){
        totalWidth += $element.width()
      }

      return this.findOffsetPosition($element.prev(), totalWidth)
    }


    //rebuilding is a variable that tells the function to not track the element since we are using the tracked elements.
    , placeCenter: function(element,index, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element,_.bind(this.placeCenter, this, element, index, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing = (pageWidth/2) - (elementWidth/2) - this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, "auto")

      return this;
    }

    , placeLeftOfCenter: function(element, index, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element,_.bind(this.placeLeftOfCenter, this, element, index, true))
      }


      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing = pageWidth/2 - elementWidth - this.offsetFromCenter - this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, 0)

      return this;
    }

    , placeRightOfCenter: function(element, index, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element,_.bind(this.placeRightOfCenter, this, element, index, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing = pageWidth/2 + this.offsetFromCenter - this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, 0)

      return this;
    }

  
    //placing items offscreen (outside the viewport) can create a button to bring the item back, so these next functions will support placing a button as well as an array of classes to add to an elem
    
    , placeLeftOffScreen: function(element, notCompletelyHidden, rebuilding ){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeLeftOffScreen, this, element, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , placing 
      , btnElement = $("#leftBtn")

      if (notCompletelyHidden){
        placing = 20 - elementWidth;
      }else{
        placing = 0 - elementWidth;
      }

      placing -= this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, "auto")

      return this;
    }

    , placeRightOffScreen: function(element, index, notCompletelyHidden, rebuilding ){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeRightOffScreen, this, element, index, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing 
      , btnElement = $("#leftBtn")


      if (notCompletelyHidden){
        placing = pageWidth - 20;
      }else{
        placing = pageWidth;
      }
      placing -= this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, "auto")

      return this;
    }

    , placeRightUpOffScreen: function(element, index, notCompletelyHidden, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeRightUpOffScreen, this, element, index, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing = pageWidth/2 + this.offsetFromCenter - this.findOffsetPosition($(element).prev())
      , elementHeight = $(element).height()
      , yPlacing = 0 - elementHeight - this.topPageMargin

      this.placeElement(element, placing, yPlacing)

      return this;

    }

    , placeRightDownOffScreen: function(element, notCompletelyHidden, rebuilding ){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeRightDownOffScreen, this, element, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , pageHeight = this.$el.height()
      , elementHeight = $(element).height()
      , btnElement = $("#leftBtn")
      , placing = pageWidth/2 + this.offsetFromCenter
      , yPlacing



      if (notCompletelyHidden){
        yPlacing = pageHeight - 80;
      }else{
        yPlacing = pageHeight;
      }

      this.placeElement(element, placing, yPlacing)

      return this;
    }

    , placeLeftDownOffScreen: function(element, notCompletelyHidden, rebuilding ){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeLeftDownOffScreen, this, element, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , pageHeight = this.$el.height()
      , elementHeight = $(element).height()
      , btnElement = $("#leftBtn")
      , placing = pageWidth/2 - elementWidth - this.offsetFromCenter
      , yPlacing



      if (notCompletelyHidden){
        yPlacing = pageHeight - 80;
      }else{
        yPlacing = pageHeight;
      }

      this.placeElement(element, placing, yPlacing)

      return this;
    }

    , placeButtonLeft: function( pageIndex,text, classes, withMargin, rebuilding){
      return this.placeButton($("#leftBtn")[0], pageIndex, text, ["sideBtn"].concat(classes), withMargin, "left", rebuilding)
    }

    , placeButtonRight: function( pageIndex,text, classes, rebuilding){
      return this.placeButton($("#rightBtn")[0], pageIndex, text, ["sideBtn"].concat(classes), "right", rebuilding)
    }

    , placeButtonRightDown: function( pageIndex,text, classes, rebuilding){
      return this.placeButton($("#rightDownBtn")[0], pageIndex, text, ["sideBtn", "rightDownBtn"].concat(classes), "rightDown", rebuilding)
    }

    , placeButtonLeftDown: function( pageIndex,text, classes, rebuilding){
      return this.placeButton($("#leftDownBtn")[0], pageIndex, text, ["sideBtn", "leftDownBtn"].concat(classes), "leftDown", rebuilding)
    }

    , placeButton: function(element, pageIndex, text, classes,  side, rebuilding){
      //We should add the classes before determining the width
      $(element).addClass(classes.join(" "))
      $(element).show();

      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeButton, this, element, pageIndex, text, classes, side, true))
      }

      var defer = Q.defer()

      //use css('width'... instead of .width() because the element may be rotated
      var elementWidth = $(element).width()
      , elementHeight = $(element).height()
      , pageWidth = this.$el.find("#page"+pageIndex).width()
      , pageHeight = this.$el.height()
      , placing 
      , yPlacing = 120
      , yMargin = 40


      switch(side){
        case "left":
          placing = 0 - elementWidth;
          break;
        case "right":
          placing = pageWidth - 2*elementHeight;
          break;
        case "leftDown":
          placing = pageWidth/2 - 2*elementWidth - this.offsetFromCenter
          yPlacing = pageHeight - elementHeight*2 - yMargin; 
          break;
        case "rightDown":
          placing = pageWidth/2 + this.offsetFromCenter;
          yPlacing = pageHeight - elementHeight*2 - yMargin; 
          break;
      }


      $(element).children("p").text(text)

      //need to redo this later 10 is the assumption that there are 10 pages so 100/10 = 10% perpage
      $(element).css("left","calc("+pageIndex*10+"% + "+placing+"px)");
      $(element).css("top",yPlacing);

      if(_.isUndefined(rebuilding)){
        //only want to set this if we aren't rebuilding the positions
        element.onclick = function(){defer.resolve()}
      }

      return defer.promise;
    }

    , hideAllButtons: function(){
      this.hideButtonLeft()
      this.hideButtonRight()
      this.hideButtonRightDown()
      this.hideButtonLeftDown()
    }
    
    , hideButtonLeft: function(rebuilding){
      var btnElement = $("#leftBtn")

      this.hideButton(btnElement, rebuilding)

      return this;
    }

    , hideButtonRight: function(rebuilding){
      var btnElement = $("#rightBtn")

      this.hideButton(btnElement, rebuilding)

      return this;
    }

    , hideButtonLeftDown: function(rebuilding){
      var btnElement = $("#leftDownBtn")

      this.hideButton(btnElement, rebuilding)

      return this;
    }

    , hideButtonRightDown: function(rebuilding){
      var btnElement = $("#rightDownBtn")

      this.hideButton(btnElement, rebuilding)

      return this;
    }

    , hideButton: function(element, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element[0], _.bind(this.hideButton, this, element, true))
      }

      element.removeClass()
      element.hide()

      return this;
    }

  })
})
;
define('jade!templates/TopBar', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ "class": ('topBox') + ' ' + ('carrotBtn') + ' ' + ('span') }, {}));
buf.push('><p>');
var __val__ = categories[0]
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><div');
buf.push(attrs({ "class": ('selectedBar') + ' ' + ('carrotSelected') }, {}));
buf.push('></div></div><div');
buf.push(attrs({ "class": ('topBox') + ' ' + ('emeraldBtn') + ' ' + ('span') }, {}));
buf.push('><p>');
var __val__ = categories[1]
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><div');
buf.push(attrs({ "class": ('selectedBar') + ' ' + ('emeraldSelected') }, {}));
buf.push('></div></div><div');
buf.push(attrs({ "class": ('topBox') + ' ' + ('asphaltBtn') + ' ' + ('span') }, {}));
buf.push('><p>');
var __val__ = categories[2]
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><div');
buf.push(attrs({ "class": ('selectedBar') + ' ' + ('asphaltSelected') }, {}));
buf.push('></div></div><div');
buf.push(attrs({ "class": ('topBox') + ' ' + ('peter-riverBtn') + ' ' + ('span') }, {}));
buf.push('><p>');
var __val__ = categories[3]
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><div');
buf.push(attrs({ "class": ('selectedBar') + ' ' + ('riverSelected') }, {}));
buf.push('></div></div>');
}
return buf.join("");
}});

//This handles the categories that appear on the right of the header bar
//
// When a user clicks one of the buttons on the top right (lets call them categories)
//
// this module will fire an event to let anyone who cares know that they clicked that category
// it will also move the position indicator to indicate which category the user is on
//
// the position indicator is simply a slightly highlighted box under the box
//
define('views/TopBarCategories',["jade!templates/TopBar"], function(template){
  return Backbone.View.extend({

    //store the index of the buttons
    loggedOutLayout: {
      "about":0,
      "upload":1,
      "register":2,
      "login":3
    },

    loggedInLayout: {
      "about":0,
      "files":1,
      "settings":2,
      "logout":3
    },

    // Keep track of a mapping between names that are used internally (here) and names that are rendered to the DOM
    prettyNames: {
      "about":"About",
      "upload":"Upload",
      "register":"Register",
      "login":"Login",
      "files":"Files",
      "settings":"Settings",
      "logout":"Logout"
    },

    initialize: function(){
      this.layout=this.loggedOutLayout
    },

    render: function(){
      var categories = _.chain(this.layout)
                        .keys()
                        .map(function(n){return this.prettyNames[n]},this).value()
      this.$el.html(template({categories:categories}))

      //hide all the selected bars to the left off screen
      _.each($('#topBar').find('.selectedBar'), function(e, i){$(e).css("left",-150*(i+1))})
    },

    changeToLoggedIn : function(){
      this.layout = this.loggedInLayout;
      this.render()
    },

    changeToLoggedOut : function(){
      this.layout = this.loggedOutLayout;
      this.render()
    },
    
    events : {
      "click .topBox" : "handleCategoryClick"
    },

    moveSelectedBar : function(index){
      //cool moving animation
      _.each($('#topBar').find('.selectedBar'), function(e, i){$(e).css("left",-150*(i-index))})
    },

    //these next functions are convience so that the outside doesn't have to know what index something is
    select : function(category){ this.moveSelectedBar(this.layout[category]) },

    handleCategoryClick : function(e){
      var $topBox = $(e.target).closest(".topBox")
      , index = this.$el.find('.topBox').index($topBox)

      this.moveSelectedBar(index)
      this.trigger(_.invert(this.layout)[index]+":click")


    }

  })
})
;
//Defines what url goes where
//The actual actions are within other files in this directory
//(e.g. user route is defined under routes/User.js)

define(
 'routes/Router',["routes/Home", "routes/User", "routes/Fs", "routes/Settings", "routes/About", "routes/Login", "routes/Register", "routes/Download", 
  "views/Home", "views/ViewportHandler", "views/TopBarCategories", "models/user/User", "config"], 
 function(HomeRoute, UserRoute, Fs, Settings, About, Login, Register, Download, 
   HomeView, ViewportHandler, TopBar, User, config){ 
    return Backbone.Router.extend({

        createRoutes: function(viewport, topBar, userModel, router){
          var routes = {
              "home" : "home"
            , "user/fs/*fileLocation" : "fs"
            , "user/fs" : "fs"
            , "user/fs/" : "fs"
            , "user" : "user"
            , "settings" : "settings"
            , "about" : "about"
            , "login" : "login"
            , "register" : "register"
            , "test" : "test"
            , "download/*linkNameAndPasscode" : "download"
          }

          //wire the routes 
          //We are doing this in this function instead of the usual approach, there is a reason: 
          //If we do it here we can simply create the route function by doing {home: HomeRoute(viewport)}. That returns a function with the viewport closed over 
          //if we wanted to do the samething in the usual way, we would have to do:
          //home : function(){ HomeRoute(this.viewport) }
          //Which is a bit more tedious, and we have to keep a reference to anything we want to pass in under the this object we can get messy
          var routeActions = {
            "home"     : HomeRoute(viewport, topBar),
            "user"     : UserRoute(viewport, topBar, userModel, router),
            "fs"       : Fs(userModel, router),
            "settings" : Settings(viewport, topBar, userModel, router),
            "about"    : About(viewport, topBar),
            "login"    : Login(viewport, topBar, userModel, router),
            "register" : Register(viewport, topBar, userModel),
            "download" : Download(viewport)
          }


          //wire it up so the route calls will work
          _.each(routes, function(name, path){
            router.route(path, name, routeActions[name])
          })


        },

        initialize: function(){
          //here we will create the HomeView which is the main container where everything else will live
          this.home = new HomeView({el:$('#mainContainer')})
          this.home.render()

          //we may also initialize the viewport handler. This will provide functions to modify the placing of elements
          var viewport = new ViewportHandler({el:$("#mainContainer")})
          this.viewport = viewport

          var userModel = new User()
          this.userModel = userModel
          user = userModel

          var topBar = new TopBar({el:$("#topBar")})
          this.topBar = topBar
          this.topBar.render()

          this.resetListener(this.userModel, this.topBar)

          //defined in js/config.js 
          if (config.debug){
            userModel.login("a","a")
          }

          this.createRoutes(viewport, topBar, userModel, this)


        },

        recreateUser : function(){
          console.log("recreating user")
          this.stopListeningToUser(this.userModel)
          this.userModel.off()
          this.userModel.clear()
          this.userModel = new User()

          this.resetListener(this.userModel, this.topBar)

          this.createRoutes(this.viewport, this.topBar, this.userModel, this)

          this.navigate("/login", {trigger:true})


          //safest way to really logout, but it takes time :(
          //location.reload()
        },

        resetListener: function(user, topBar){
          this.stopListening()
          topBar.stopListening()
          user.stopListening()
          this.registerTopBar(topBar)
          this.registerUser(user)
          this.registerUserAndTopBar(topBar, user)
        },

        registerUser: function(user){
          this.listenTo(user, "destroy", this.recreateUser)
        },

        registerTopBar: function(topBar){
          this.listenTo(topBar, "login:click", _.bind(this.navigate, this,    "/login", {trigger:true}))
          this.listenTo(topBar, "register:click", _.bind(this.navigate, this, "/register", {trigger:true}))
          this.listenTo(topBar, "upload:click", _.bind(this.navigate, this,   "/home", {trigger:true}))
          this.listenTo(topBar, "about:click", _.bind(this.navigate, this,    "/about", {trigger:true}))

          this.listenTo(topBar, "files:click", _.bind(this.navigate, this, "/user", {trigger:true}))

          this.listenTo(topBar, "settings:click", _.bind(this.navigate, this, "/settings", {trigger:true}))
        },

        //just to keep track of things that need the user and the topbar
        registerUserAndTopBar: function(topBar, user){
          topBar.listenTo(user, "login:success", topBar.changeToLoggedIn)
          topBar.listenTo(user, "destroy", topBar.changeToLoggedOut)
          //have the usermodel know when we logout, and destroy the model 
          user.listenTo(topBar, "logout:click", user.destroy)
        },

        //remove anything listening to the user so we don't end up with zombie models calling the shots
        stopListeningToUser: function( user){
          this.topBar.stopListening(user)
          this.stopListening(user)
          this.userModel.stopListening()
        },
    })
})

;
less = { env: 'development' };
/**
 *  Dependencies:
 *
 */


requirejs({
    //lets set up a jade template loader
    paths: { 
        jade: './require-jade/jade'
      , jquery : "core/jquery-2.0.3.min"
    },
    shim: {
      'core/backbone' : {
        deps : ['core/underscore', 'jquery'],
        exports : 'Backbone'
      },
      'crypt/betterCBC' : {
        deps:  ['crypt/sjcl'],
        exports : 'sjcl'
      },
      'crypt/rsa/rng' : {
        deps : ["crypt/rsa/prng4"]
                
      },
      'crypt/rsa/jsbn2' : {
        deps : ["crypt/rsa/jsbn",
                "crypt/rsa/base64" , 
                "crypt/rsa/rng"]     
      },
      'crypt/rsa/rsa2' : {
        deps:  ["crypt/rsa/jsbn2", "crypt/rsa/rsa"], 
        exports : 'RSAKey'
      }
  }
},
/* We have two nested requires so that we can be sure backbone and sjcl have been loaded
 * prior to entering the rest of the functions.
 * The reason "routes/Router is duplicated is so r.js optimizer sees it
 */
[ "require" , "core/backbone" , "crypt/sjcl" , "crypt/betterCBC" , "crypt/rsa/rsa2", "routes/Router" ],
function(require, Backbone){
    require( 
        ['routes/Router'],
        function(Router) {
            router = new Router();
            var givenPage = Backbone.history.start()
            if (!givenPage){
                router.navigate('home',{trigger:true})
            }
        })
})

;
define("main", function(){});

//# sourceMappingURL=main.js.map