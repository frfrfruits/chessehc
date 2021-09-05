(function(e){function t(t){for(var i,u,a=t[0],c=t[1],o=t[2],f=0,d=[];f<a.length;f++)u=a[f],Object.prototype.hasOwnProperty.call(s,u)&&s[u]&&d.push(s[u][0]),s[u]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);l&&l(t);while(d.length)d.shift()();return n.push.apply(n,o||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],i=!0,a=1;a<r.length;a++){var c=r[a];0!==s[c]&&(i=!1)}i&&(n.splice(t--,1),e=u(u.s=r[0]))}return e}var i={},s={app:0},n=[];function u(t){if(i[t])return i[t].exports;var r=i[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.m=e,u.c=i,u.d=function(e,t,r){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)u.d(r,i,function(t){return e[t]}.bind(null,i));return r},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/chessehc/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var o=0;o<a.length;o++)t(a[o]);var l=c;n.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},"682b":function(e,t,r){"use strict";r("b9f5")},b9f5:function(e,t,r){},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var i=r("7a23");function s(e,t,r,s,n,u){var a=Object(i["n"])("Chessehc");return Object(i["j"])(),Object(i["c"])(a)}Object(i["l"])("data-v-f9066bd8");var n={class:"chessehc"},u={class:"board"},a=["onClick"];function c(e,t,r,s,c,o){return Object(i["j"])(),Object(i["e"])("div",n,[(Object(i["j"])(!0),Object(i["e"])(i["a"],null,Object(i["m"])(e.reverseBoards,(function(t){return Object(i["j"])(),Object(i["e"])("div",{key:t.time},[Object(i["g"])(" t = "+Object(i["o"])(t.time)+" ",1),Object(i["f"])("div",u,[(Object(i["j"])(!0),Object(i["e"])(i["a"],null,Object(i["m"])(t.squares.value,(function(r,s){return Object(i["j"])(),Object(i["e"])("div",{key:s},[Object(i["f"])("div",{class:Object(i["i"])(["square",e.squareColor(r,s%t.squares.width,Math.floor(s/t.squares.width))]),onClick:function(i){return e.clickSquare(r,s%t.squares.width,Math.floor(s/t.squares.width),t.time)}},[r.piece?(Object(i["j"])(),Object(i["e"])("div",{key:0,class:Object(i["i"])(["piece",r.piece.styleClass()])},Object(i["o"])(r.piece.text()),3)):Object(i["d"])("",!0)],10,a)])})),128))])])})),128))])}Object(i["k"])();var o,l,f,d=r("ade3"),h=r("d4ec"),p=r("bee2"),v=r("b85c");r("d81d"),r("cb29"),r("c740"),r("7db0"),r("d28b"),r("d3b7"),r("3ca3"),r("ddb0"),r("a4d3"),r("e01a"),r("fb6a");function b(e){return e===f.forward?f.inverted:f.forward}function _(e,t,r){if(null!==e.selected_square){var i,s=Object(v["a"])(t.futureBoards(r));try{for(s.s();!(i=s.n()).done;){var n=i.value,u=n.squares.at(e.selected_square.x,e.selected_square.y);if(null===u.piece||u.piece.direction!==r||u.piece.tense!==l.future)break;u.piece=null}}catch(a){s.e(a)}finally{s.f()}}}function w(e,t,r,i,s){if(null!==e.selected_square){var n,u=Object(v["a"])(t.futureBoards(r));try{for(u.s();!(n=u.n()).done;){var a=n.value,c=a.squares.at(i,s);if(null!==c.piece&&(c.piece.direction!==r||c.piece.tense!==l.future))break;c.piece=e.selected_square.piece_ref.clone(),c.piece.tense=l.future}}catch(o){u.e(o)}finally{u.f()}}}function q(e,t,r,i){if(null!==e.selected_square){var s=e.selected_square.piece_ref.direction,n=e.boards.at(i),u=n.peekNext(s);void 0===u?e.boards.makeNew(s):(w(e,n,s,t,r),_(e,n,s));var a,c=Object(v["a"])(n.futureBoards(b(s)));try{for(c.s();!(a=c.n()).done;){var o=a.value,f=o.squares.at(e.selected_square.x,e.selected_square.y),d=f.piece.tense;if(f.piece.tense=l.past,d===l.present)break}}catch(h){c.e(h)}finally{c.f()}}}(function(e){e[e["me"]=0]="me",e[e["you"]=1]="you"})(o||(o={})),function(e){e[e["past"]=0]="past",e[e["present"]=1]="present",e[e["future"]=2]="future"}(l||(l={})),function(e){e[e["forward"]=0]="forward",e[e["inverted"]=1]="inverted"}(f||(f={}));var k=function(){function e(t,r,i){Object(h["a"])(this,e),this.owner=t,this.tense=r,this.direction=i}return Object(p["a"])(e,[{key:"text",value:function(){return this.owner==o.me?"▲":"▼"}},{key:"styleClass",value:function(){switch(this.tense){case l.past:return this.direction===f.forward?"piece-forward-past":"piece-inverted-past";case l.present:return this.direction===f.forward?"piece-forward-present":"piece-inverted-present";case l.future:return this.direction===f.forward?"piece-forward-future":"piece-inverted-future"}}},{key:"clone",value:function(){return new e(this.owner,this.tense,this.direction)}},{key:"makeFuture",value:function(){return this.tense===l.present?this.direction===f.forward?new e(this.owner,l.future,this.direction):null:new e(this.owner,this.tense,this.direction)}},{key:"makePast",value:function(){return this.tense===l.present?this.direction===f.forward?null:new e(this.owner,l.future,this.direction):new e(this.owner,this.tense,this.direction)}},{key:"invert",value:function(){return this.direction=this.direction===f.forward?f.inverted:f.forward,this}}]),e}(),j=function(){function e(t){Object(h["a"])(this,e),this.piece=t}return Object(p["a"])(e,[{key:"clone",value:function(){return new e(this.piece?this.piece.clone():null)}},{key:"makeFuture",value:function(){return new e(this.piece?this.piece.makeFuture():null)}},{key:"makePast",value:function(){return new e(this.piece?this.piece.makePast():null)}}]),e}(),y=function(){function e(t,r){Object(h["a"])(this,e),this.width=t,this.value=r}return Object(p["a"])(e,[{key:"at",value:function(e,t){return this.value[t*this.width+e]}},{key:"makeFuture",value:function(){return new e(this.width,this.value.map((function(e){return e.makeFuture()})))}},{key:"makePast",value:function(){return new e(this.width,this.value.map((function(e){return e.makePast()})))}}],[{key:"empty",value:function(t,r){return new e(t,Array(t*r).fill({}).map((function(e){return new j(null)})))}}]),e}(),m=function(){function e(t,r,i,s,n){Object(h["a"])(this,e),this.square_ref=t,this.piece_ref=r,this.x=i,this.y=s,this.t=n}return Object(p["a"])(e,[{key:"clone",value:function(){return new e(this.square_ref,this.piece_ref,this.x,this.y,this.t)}}]),e}(),O=function(){function e(t,r,i){Object(h["a"])(this,e),this.time=t,this.squares=r,this.boards_ref=i}return Object(p["a"])(e,[{key:"makeFuture",value:function(){return new e(this.time+1,this.squares.makeFuture(),this.boards_ref)}},{key:"makePast",value:function(){return new e(this.time-1,this.squares.makePast(),this.boards_ref)}},{key:"peekNext",value:function(e){return this.boards_ref.at(this.time+(e===f.forward?1:-1))}},{key:"peekPrevious",value:function(e){return this.boards_ref.at(this.time+(e===f.forward?-1:1))}},{key:"futureBoards",value:function(e){return this.boards_ref.futureBoards(this.time,e)}}]),e}(),x=function(){function e(t,r,i){Object(h["a"])(this,e),this.boards=t,this.index=t.value.findIndex((function(e){return e.time===r})),this.direction=i,this.boards_size=t.value.length}return Object(p["a"])(e,[{key:"next",value:function(){this.direction===f.forward?this.index++:this.index--;var e=this.boards,t=this.index,r=this.boards_size;return{value:e.value[t],done:this.direction===f.forward?t>=r:t<0}}}]),e}(),P=function(){function e(t){Object(h["a"])(this,e),this.value=t}return Object(p["a"])(e,[{key:"at",value:function(e){return this.value.find((function(t){return t.time===e}))}},{key:"makeNew",value:function(e){return e===f.forward?this.makeFuture():this.makePast()}},{key:"makeFuture",value:function(){this.value.push(this.value[this.value.length-1].makeFuture())}},{key:"makePast",value:function(){this.value.unshift(this.value[0].makePast())}},{key:"futureBoards",value:function(e,t){var r=this;return Object(d["a"])({},Symbol.iterator,(function(){return new x(r,e,t)}))}}]),e}(),g=Object(i["h"])({name:"Chessehc",data:function(){return{boards:new P([]),selected_square:null,will_invert:!1}},mounted:function(){var e=y.empty(8,8);this.boards.value=[new O(0,e,this.boards)];for(var t=0;t<16;++t)this.boards.value[0].squares.value[t].piece=new k(o.you,l.present,f.forward);for(var r=0;r<16;++r)this.boards.value[0].squares.value[48+r].piece=new k(o.me,l.present,f.forward);this.boards.makeFuture(),this.boards.makePast()},methods:{clickSquare:function(e,t,r,i){if(null!==this.selected_square)if(e!==this.selected_square.square_ref)this.selected_square.t===i&&(e.piece=this.selected_square.piece_ref,e.piece.tense=l.present,this.selected_square.square_ref.piece=null,q(this,t,r,i),this.will_invert&&(this.will_invert=!1),this.selected_square=null);else{if(this.will_invert){this.will_invert=!1,this.selected_square.t=i+(this.selected_square.piece_ref.direction===f.forward?-1:1);var s=this.boards.at(this.selected_square.t);this.selected_square.square_ref=s.squares.at(t,r),this.selected_square.piece_ref=this.selected_square.square_ref.piece,this.selected_square.piece_ref.invert(),w(this,s,this.selected_square.piece_ref.direction,t,r),this.boards.at(i).squares.at(t,r).piece=null}this.selected_square=null}else if(e.piece){if(e.piece.tense===l.past)return;if(this.selected_square=new m(e,e.piece,t,r,i),e.piece.tense===l.present){this.will_invert=!0;var n=this.selected_square.piece_ref.direction;_(this,this.boards.at(i),n),this.selected_square.piece_ref.invert(),this.selected_square.square_ref=this.boards.at(i).peekPrevious(n).squares.at(t,r),this.selected_square.square_ref.piece=this.selected_square.piece_ref.clone(),this.selected_square.square_ref.piece.tense=l.future,this.selected_square.piece_ref=this.selected_square.square_ref.piece,this.selected_square.t=i+(n===f.forward?-1:1)}}},squareColor:function(e,t,r){return null!==this.selected_square&&this.selected_square.square_ref===e?"square-moving":(t+r)%2==0?"square-black":"square-white"}},computed:{reverseBoards:function(){return this.boards.value.slice().reverse()}}});r("682b");g.render=c,g.__scopeId="data-v-f9066bd8";var F=g,C=Object(i["h"])({name:"App",components:{Chessehc:F}});C.render=s;var B=C;Object(i["b"])(B).mount("#app")}});
//# sourceMappingURL=app.c9c1039e.js.map