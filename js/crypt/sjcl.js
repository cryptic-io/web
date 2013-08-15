"use strict";function q(a){throw a;}var s=void 0,u=!0,w=!1;var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
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
