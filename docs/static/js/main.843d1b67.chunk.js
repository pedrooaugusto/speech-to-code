(this["webpackJsonpspeech2code.webapp"]=this["webpackJsonpspeech2code.webapp"]||[]).push([[3],{6:function(e,n,t){"use strict";t.d(n,"a",(function(){return i}));var r=t(2);var a=[["en","en-US"],["pt","pt-BR"]];function i(){var e,n,t=window.location.pathname.split("/").filter((function(e){return""!==e}));"/speech-to-code".includes(t[0])&&t.splice(0,1),a.find((function(e){return Object(r.a)(e,1)[0]===t[0]}))||(t.splice(0,0,a[0][0]),n="");var i=a.find((function(e){return Object(r.a)(e,1)[0]===t[0]}))||a[0],c=t[1]||"index";return{lang:i[1],root:null!==(e=n)&&void 0!==e?e:i[0],route:c}}},8:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),i=t(5),c=t.n(i),o=t(6),l=t(0),u=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2)]).then(t.bind(null,14))})),s=a.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(5),t.e(2),t.e(6)]).then(t.bind(null,16))})),d=a.a.lazy((function(){return Promise.all([t.e(0),t.e(8)]).then(t.bind(null,17))})),p=a.a.lazy((function(){return Promise.all([t.e(0),t.e(9)]).then(t.bind(null,15))}));window.__HOME_PAGE__="/speech-to-code";var b=function(e){var n=Object(o.a)(),t=n.lang,r=n.route,i=null;return i="app"===r?u:"webapp"===r?s:"about"===r?d:"index"===r?p:f(h),Object(l.jsx)(a.a.Suspense,{fallback:Object(l.jsx)("h1",{children:"Wait"}),children:Object(l.jsx)(i,{lang:t})})},f=function(e){return a.a.lazy((function(){return Promise.resolve({default:e})}))},h=function(){return Object(l.jsxs)("h3",{children:["Error 404 - Cannot get ",window.location.pathname]})};c.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(b,{})}),document.getElementById("root"))}},[[8,4,7]]]);
//# sourceMappingURL=main.843d1b67.chunk.js.map