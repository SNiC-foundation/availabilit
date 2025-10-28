function e(a,r=""){return typeof window>"u"?r:new URLSearchParams(window.location.search).get(a)||r}function s(a,r=0){const n=e(a),t=parseInt(n,10);return isNaN(t)?r:t}export{e as a,s as g};
