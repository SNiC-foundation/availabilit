import{s as S,n as V,c as W}from"../chunks/scheduler.xiAKmmds.js";import{S as q,i as z,e as d,s as k,t as w,c as h,a as E,g as M,b as T,d as D,f as C,h as m,j as F,k as a,l as j}from"../chunks/index.CJYbeTNo.js";import{s as A}from"../chunks/entry.Doc3yCGs.js";import{W as B}from"../chunks/WordMark.ByTvdq_C.js";import{b as G}from"../chunks/paths.IRPt966x.js";const J=()=>{const t=A;return{page:{subscribe:t.page.subscribe},navigating:{subscribe:t.navigating.subscribe},updated:t.updated}},K={subscribe(t){return J().page.subscribe(t)}};function N(t){let e,r,u='<h1 class="text-center">This page/action is sadly not available</h1> <h1>(anti-&#39;vo)</h1>',p,l,o,I="For the reason, see error context below:",$,i,x=t[0].status+"",v,y,f=t[0].error.message+"",g,H,c,L=`<h3>Click to return to the home page:</h3> <a href="${G}/"><img src="${B}" alt="" class="h-12 md:h-20"/></a>`;return{c(){e=d("div"),r=d("div"),r.innerHTML=u,p=k(),l=d("div"),o=d("h3"),o.textContent=I,$=k(),i=d("h3"),v=w(x),y=w(": "),g=w(f),H=k(),c=d("div"),c.innerHTML=L,this.h()},l(n){e=h(n,"DIV",{id:!0,class:!0});var s=E(e);r=h(s,"DIV",{class:!0,"data-svelte-h":!0}),M(r)!=="svelte-1w7nexb"&&(r.innerHTML=u),p=T(s),l=h(s,"DIV",{class:!0});var b=E(l);o=h(b,"H3",{class:!0,"data-svelte-h":!0}),M(o)!=="svelte-vfgyk9"&&(o.textContent=I),$=T(b),i=h(b,"H3",{});var _=E(i);v=D(_,x),y=D(_,": "),g=D(_,f),_.forEach(C),b.forEach(C),H=T(s),c=h(s,"DIV",{class:!0,"data-svelte-h":!0}),M(c)!=="svelte-vivzaa"&&(c.innerHTML=L),s.forEach(C),this.h()},h(){m(r,"class","flex flex-col items-center gap-4 md:gap-6 text-3xl md:text-5xl"),m(o,"class","text-center"),m(l,"class","flex flex-col items-center md:justify-center gap-2 text-2xl md:text-4xl"),m(c,"class","flex flex-col md:flex-row items-center gap-2 text-2xl md:text-4xl"),m(e,"id","error_page"),m(e,"class","bg-bottom-backdrop h-screen w-screen flex flex-col justify-evenly items-center text-white")},m(n,s){F(n,e,s),a(e,r),a(e,p),a(e,l),a(l,o),a(l,$),a(l,i),a(i,v),a(i,y),a(i,g),a(e,H),a(e,c)},p(n,[s]){s&1&&x!==(x=n[0].status+"")&&j(v,x),s&1&&f!==(f=n[0].error.message+"")&&j(g,f)},i:V,o:V,d(n){n&&C(e)}}}function O(t,e,r){let u;return W(t,K,p=>r(0,u=p)),[u]}let Y=class extends q{constructor(e){super(),z(this,e,O,N,S,{})}};export{Y as component};