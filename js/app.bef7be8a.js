(function(e){function t(t){for(var s,a,u=t[0],c=t[1],o=t[2],l=0,f=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&f.push(n[a][0]),n[a]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,o||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],s=!0,u=1;u<r.length;u++){var c=r[u];0!==n[c]&&(s=!1)}s&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var s={},n={app:0},i=[];function a(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=s,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(r,s,function(t){return e[t]}.bind(null,s));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/chessehc/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var o=0;o<u.length;o++)t(u[o]);var d=c;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},3247:function(e,t,r){"use strict";r("5aaa")},"5aaa":function(e,t,r){},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var s=r("7a23");function n(e,t,r,n,i,a){var u=Object(s["n"])("Chessehc");return Object(s["j"])(),Object(s["c"])(u)}Object(s["l"])("data-v-abda89c0");var i={class:"chessehc"},a={class:"board"},u=["onClick"];function c(e,t,r,n,c,o){return Object(s["j"])(),Object(s["e"])("div",i,[(Object(s["j"])(!0),Object(s["e"])(s["a"],null,Object(s["m"])(e.reverseBoards,(function(t){return Object(s["j"])(),Object(s["e"])("div",{key:t.time},[Object(s["g"])(" t = "+Object(s["o"])(t.time)+" ",1),Object(s["f"])("div",a,[(Object(s["j"])(!0),Object(s["e"])(s["a"],null,Object(s["m"])(t.squares.value,(function(r,n){return Object(s["j"])(),Object(s["e"])("div",{key:n},[Object(s["f"])("div",{class:Object(s["i"])(["square",e.squareColor(r,n%t.squares.width,Math.floor(n/t.squares.width))]),onClick:function(s){return e.clickSquare(r,n%t.squares.width,Math.floor(n/t.squares.width),t.time)}},[r.piece?(Object(s["j"])(),Object(s["e"])("div",{key:0,class:Object(s["i"])(["piece",r.piece.styleClass()])},Object(s["o"])(r.piece.text()),3)):Object(s["d"])("",!0)],10,u)])})),128))])])})),128))])}Object(s["k"])();var o,d,l,f=r("d4ec"),h=r("bee2");r("c740"),r("d81d"),r("cb29"),r("fb6a");function p(e,t,r,s){if(null!==e.selected_square){var n=e.boards.findIndex((function(e){return e.time===s})),i=e.boards[n],a=e.boards[n+1];if(void 0===a)e.boards.push(i.makeFuture());else{for(var u=e.boards.length,c=n+1;c<u;++c){var o=e.boards[c].squares.at(e.selected_square.x,e.selected_square.y),f=e.boards[c].squares.at(t,r);if(null!==f.piece&&(f.piece.direction!==l.forward||f.piece.tense!==d.future))break;f.piece=o.piece}for(var h=n+1;h<u;++h){var p=e.boards[h].squares.at(e.selected_square.x,e.selected_square.y);if(null===p.piece||p.piece.direction!==l.forward||p.piece.tense!==d.future)break;p.piece=null}}for(var b=n-1;b>=0;--b){var v=e.boards[b].squares.at(e.selected_square.x,e.selected_square.y),w=v.piece.tense;if(v.piece.tense=d.past,w===d.present)break}}}function b(e,t,r,s){if(null!==e.selected_square){var n=e.boards.findIndex((function(e){return e.time===s})),i=e.boards[n],a=e.boards[n-1];if(void 0===a)e.boards.unshift(i.makePast()),n+=1;else{for(var u=n-1;u>=0;--u){var c=e.boards[u].squares.at(e.selected_square.x,e.selected_square.y),o=e.boards[u].squares.at(t,r);if(null!==o.piece&&(o.piece.direction!==l.inverted||o.piece.tense!==d.future))break;o.piece=c.piece}for(var f=n-1;f>=0;--f){var h=e.boards[f].squares.at(e.selected_square.x,e.selected_square.y);if(null===h.piece||h.piece.direction!==l.inverted||h.piece.tense!==d.future)break;h.piece=null}}for(var p=e.boards.length,b=n+1;b<p;++b){var v=e.boards[b].squares.at(e.selected_square.x,e.selected_square.y),w=v.piece.tense;if(v.piece.tense=d.past,w===d.present)break}}}(function(e){e[e["me"]=0]="me",e[e["you"]=1]="you"})(o||(o={})),function(e){e[e["past"]=0]="past",e[e["present"]=1]="present",e[e["future"]=2]="future"}(d||(d={})),function(e){e[e["forward"]=0]="forward",e[e["inverted"]=1]="inverted"}(l||(l={}));var v=function(){function e(t,r,s){Object(f["a"])(this,e),this.owner=t,this.tense=r,this.direction=s}return Object(h["a"])(e,[{key:"text",value:function(){return this.owner==o.me?"▲":"▼"}},{key:"styleClass",value:function(){switch(this.tense){case d.past:return this.direction===l.forward?"piece-forward-past":"piece-inverted-past";case d.present:return this.direction===l.forward?"piece-forward-present":"piece-inverted-present";case d.future:return this.direction===l.forward?"piece-forward-future":"piece-inverted-future"}}},{key:"clone",value:function(){return new e(this.owner,this.tense,this.direction)}},{key:"makeFuture",value:function(){return this.tense===d.present?this.direction===l.forward?new e(this.owner,d.future,this.direction):null:new e(this.owner,this.tense,this.direction)}},{key:"makePast",value:function(){return this.tense===d.present?this.direction===l.forward?null:new e(this.owner,d.future,this.direction):new e(this.owner,this.tense,this.direction)}},{key:"invert",value:function(){this.direction=this.direction===l.forward?l.inverted:l.forward}}]),e}(),w=function(){function e(t){Object(f["a"])(this,e),this.piece=t}return Object(h["a"])(e,[{key:"clone",value:function(){return new e(this.piece?this.piece.clone():null)}},{key:"makeFuture",value:function(){return new e(this.piece?this.piece.makeFuture():null)}},{key:"makePast",value:function(){return new e(this.piece?this.piece.makePast():null)}}]),e}(),q=function(){function e(t,r){Object(f["a"])(this,e),this.width=t,this.value=r}return Object(h["a"])(e,[{key:"at",value:function(e,t){return this.value[t*this.width+e]}},{key:"makeFuture",value:function(){return new e(this.width,this.value.map((function(e){return e.makeFuture()})))}},{key:"makePast",value:function(){return new e(this.width,this.value.map((function(e){return e.makePast()})))}}],[{key:"empty",value:function(t,r){return new e(t,Array(t*r).fill({}).map((function(e){return new w(null)})))}}]),e}(),j=function(){function e(t,r,s,n,i){Object(f["a"])(this,e),this.square_ref=t,this.piece_ref=r,this.x=s,this.y=n,this.t=i}return Object(h["a"])(e,[{key:"clone",value:function(){return new e(this.square_ref,this.piece_ref,this.x,this.y,this.t)}}]),e}(),k=function(){function e(t,r){Object(f["a"])(this,e),this.time=t,this.squares=r}return Object(h["a"])(e,[{key:"makeFuture",value:function(){return new e(this.time+1,this.squares.makeFuture())}},{key:"makePast",value:function(){return new e(this.time-1,this.squares.makePast())}}]),e}(),y=Object(s["h"])({name:"Chessehc",data:function(){return{boards:[],selected_square:null}},mounted:function(){var e=q.empty(8,8);this.boards=[new k(0,e)];for(var t=0;t<16;++t)this.boards[0].squares.value[t].piece=new v(o.you,d.present,l.forward);for(var r=0;r<16;++r)this.boards[0].squares.value[48+r].piece=new v(o.me,d.present,l.forward);this.boards[0].squares.value[62].piece.direction=l.inverted,this.boards[0].squares.value[63].piece.direction=l.inverted,this.boards.push(this.boards[0].makeFuture()),this.boards.unshift(this.boards[0].makePast())},methods:{clickSquare:function(e,t,r,s){if(null!==this.selected_square)if(e!==this.selected_square.square_ref){if(this.selected_square.t===s){e.piece=this.selected_square.piece_ref,e.piece.tense=d.present,this.selected_square.square_ref.piece=null;var n=this.selected_square.piece_ref.direction;n===l.forward?p(this,t,r,s):b(this,t,r,s),this.selected_square=null}}else this.selected_square=null;else e.piece&&e.piece.tense===d.future&&(this.selected_square=new j(e,e.piece,t,r,s))},squareColor:function(e,t,r){return null!==this.selected_square&&this.selected_square.square_ref===e?"square-moving":(t+r)%2==0?"square-black":"square-white"}},computed:{reverseBoards:function(){return this.boards.slice().reverse()}}});r("3247");y.render=c,y.__scopeId="data-v-abda89c0";var m=y,O=Object(s["h"])({name:"App",components:{Chessehc:m}});O.render=n;var _=O;Object(s["b"])(_).mount("#app")}});
//# sourceMappingURL=app.bef7be8a.js.map