(this["webpackJsonpspeech2code.webapp"]=this["webpackJsonpspeech2code.webapp"]||[]).push([[3],{6:function(e,n,t){"use strict";t.d(n,"a",(function(){return i}));var r=t(2);var c=[["en","en-US"],["pt","pt-BR"]];function i(){var e,n,t=window.location.pathname.split("/").filter((function(e){return""!==e}));"/speech-to-code".includes(t[0])&&t.splice(0,1),c.find((function(e){return Object(r.a)(e,1)[0]===t[0]}))||(t.splice(0,0,c[0][0]),n="");var i=c.find((function(e){return Object(r.a)(e,1)[0]===t[0]}))||c[0],o=t[1]||"index";return{lang:i[1],root:null!==(e=n)&&void 0!==e?e:i[0],route:o}}},8:function(e,n,t){"use strict";t.r(n);var r=t(1),c=t.n(r),i=t(5),o=t.n(i),a=t(6),u=t(0),l=c.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2)]).then(t.bind(null,14))})),s=c.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(5),t.e(2),t.e(6)]).then(t.bind(null,16))})),d=c.a.lazy((function(){return Promise.all([t.e(0),t.e(8)]).then(t.bind(null,15))}));window.__HOME_PAGE__="/speech-to-code";var p=function(e){var n=Object(a.a)(),t=n.lang,r=n.route,i=null;return i="app"===r?l:"webapp"===r?s:"about"===r?d:b("index"===r?h:f),Object(u.jsx)(c.a.Suspense,{fallback:Object(u.jsx)("h1",{children:"Wait"}),children:Object(u.jsx)(i,{lang:t})})},b=function(e){return c.a.lazy((function(){return Promise.resolve({default:e})}))},f=function(){return Object(u.jsxs)("h3",{children:["Error 404 - Cannot get ",window.location.pathname]})},h=function(){return Object(u.jsx)("h3",{children:"\ud83d\udea7 Under construction \ud83d\udea7 - Later!"})};o.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(p,{})}),document.getElementById("root"))}},[[8,4,7]]]);
//# sourceMappingURL=main.c11a8bb1.chunk.js.map