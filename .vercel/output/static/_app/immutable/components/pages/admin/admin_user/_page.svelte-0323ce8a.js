import{S as le,i as ne,s as ie,L as C,M as O,N as R,m as w,h as m,n as L,O as F,b as V,D as d,P as ae,B as T,Q as G,R as K,q as M,r as z,u as S,k as y,a as D,w as U,l as B,c as I,x as j,y as Z,a6 as W,E as se,f as E,t as H,d as q,z as Y,T as re,g as J,a1 as oe}from"../../../../chunks/index-8132481b.js";import{B as fe}from"../../../../chunks/button-e8e119c3.js";import{u as ue}from"../../../../chunks/user_data-73545cb4.js";import{u as ce}from"../../../../chunks/datatypes-f51f27d5.js";import{m as N}from"../../../../chunks/index-1d5742ea.js";import{U as me}from"../../../../chunks/User-5b2ccb62.js";async function _e(r,e){const n=await fetch("/api/change_user_role",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r,role:e})});if(n.status!==200)throw new Error(await n.text())}async function de(){const r=await fetch("/api/get_admins"),{admins:e}=N.object({admins:N.array(ce.extend({role:N.literal("admin")}))}).parse(await r.json());return e}function X(r){let e,n;return{c(){e=O("title"),n=M(r[1])},l(t){e=R(t,"title",{});var i=w(e);n=z(i,r[1]),i.forEach(m)},m(t,i){V(t,e,i),d(e,n)},p(t,i){i&2&&S(n,t[1])},d(t){t&&m(e)}}}function he(r){let e,n,t=r[1]&&X(r),i=[{xmlns:"http://www.w3.org/2000/svg"},{viewBox:"0 0 32 32"},{fill:"currentColor"},{preserveAspectRatio:"xMidYMid meet"},{width:r[0]},{height:r[0]},r[2],r[3]],a={};for(let l=0;l<i.length;l+=1)a=C(a,i[l]);return{c(){e=O("svg"),t&&t.c(),n=O("path"),this.h()},l(l){e=R(l,"svg",{xmlns:!0,viewBox:!0,fill:!0,preserveAspectRatio:!0,width:!0,height:!0});var s=w(e);t&&t.l(s),n=R(s,"path",{d:!0}),w(n).forEach(m),s.forEach(m),this.h()},h(){L(n,"d","M24,14H22V8A6,6,0,0,0,10,8v6H8a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V16A2,2,0,0,0,24,14ZM12,8a4,4,0,0,1,8,0v6H12ZM24,28H8V16H24Z"),F(e,a)},m(l,s){V(l,e,s),t&&t.m(e,null),d(e,n)},p(l,[s]){l[1]?t?t.p(l,s):(t=X(l),t.c(),t.m(e,n)):t&&(t.d(1),t=null),F(e,a=ae(i,[{xmlns:"http://www.w3.org/2000/svg"},{viewBox:"0 0 32 32"},{fill:"currentColor"},{preserveAspectRatio:"xMidYMid meet"},s&1&&{width:l[0]},s&1&&{height:l[0]},s&4&&l[2],s&8&&l[3]]))},i:T,o:T,d(l){l&&m(e),t&&t.d()}}}function ge(r,e,n){let t,i;const a=["size","title"];let l=G(e,a),{size:s=16}=e,{title:o=void 0}=e;return r.$$set=c=>{n(5,e=C(C({},e),K(c))),n(3,l=G(e,a)),"size"in c&&n(0,s=c.size),"title"in c&&n(1,o=c.title)},r.$$.update=()=>{n(4,t=e["aria-label"]||e["aria-labelledby"]||o),n(2,i={"aria-hidden":t?void 0:!0,role:t?"img":void 0,focusable:Number(e.tabindex)===0?!0:void 0})},e=K(e),[s,o,i,l,t]}class pe extends le{constructor(e){super(),ne(this,e,ge,he,ie,{size:0,title:1})}}function x(r,e,n){const t=r.slice();return t[6]=e[n],t}function $(r){let e,n,t=r[0],i=[];for(let l=0;l<t.length;l+=1)i[l]=te(x(r,t,l));const a=l=>H(i[l],1,1,()=>{i[l]=null});return{c(){e=y("div");for(let l=0;l<i.length;l+=1)i[l].c()},l(l){e=B(l,"DIV",{});var s=w(e);for(let o=0;o<i.length;o+=1)i[o].l(s);s.forEach(m)},m(l,s){V(l,e,s);for(let o=0;o<i.length;o+=1)i[o].m(e,null);n=!0},p(l,s){if(s&5){t=l[0];let o;for(o=0;o<t.length;o+=1){const c=x(l,t,o);i[o]?(i[o].p(c,s),E(i[o],1)):(i[o]=te(c),i[o].c(),E(i[o],1),i[o].m(e,null))}for(J(),o=t.length;o<i.length;o+=1)a(o);q()}},i(l){if(!n){for(let s=0;s<t.length;s+=1)E(i[s]);n=!0}},o(l){i=i.filter(Boolean);for(let s=0;s<i.length;s+=1)H(i[s]);n=!1},d(l){l&&m(e),oe(i,l)}}}function ee(r){let e,n=r[6].tag+"",t,i;return{c(){e=M("- ("),t=M(n),i=M(")")},l(a){e=z(a,"- ("),t=z(a,n),i=z(a,")")},m(a,l){V(a,e,l),V(a,t,l),V(a,i,l)},p(a,l){l&1&&n!==(n=a[6].tag+"")&&S(t,n)},d(a){a&&m(e),a&&m(t),a&&m(i)}}}function ve(r){let e,n;return{c(){e=y("button"),n=M("Admin Entfernen"),this.h()},l(t){e=B(t,"BUTTON",{class:!0});var i=w(e);n=z(i,"Admin Entfernen"),i.forEach(m),this.h()},h(){L(e,"class","svelte-1nmk5gi")},m(t,i){V(t,e,i),d(e,n)},i:T,o:T,d(t){t&&m(e)}}}function be(r){let e,n,t,i;return t=new pe({}),{c(){e=y("div"),n=M("Locked "),U(t.$$.fragment),this.h()},l(a){e=B(a,"DIV",{class:!0});var l=w(e);n=z(l,"Locked "),j(t.$$.fragment,l),l.forEach(m),this.h()},h(){L(e,"class","locked")},m(a,l){V(a,e,l),d(e,n),Z(t,e,null),i=!0},i(a){i||(E(t.$$.fragment,a),i=!0)},o(a){H(t.$$.fragment,a),i=!1},d(a){a&&m(e),Y(t)}}}function te(r){let e,n,t,i,a=r[6].name+"",l,s,o,c,v,b,k,A;t=new me({});let _=r[6].tag&&ee(r);const P=[be,ve],u=[];function h(f,g){return g&1&&(c=null),c==null&&(c=!!f[2](f[6])),c?0:1}return v=h(r,-1),b=u[v]=P[v](r),{c(){e=y("div"),n=y("p"),U(t.$$.fragment),i=D(),l=M(a),s=D(),_&&_.c(),o=D(),b.c(),k=D(),this.h()},l(f){e=B(f,"DIV",{class:!0});var g=w(e);n=B(g,"P",{class:!0});var p=w(n);j(t.$$.fragment,p),i=I(p),l=z(p,a),s=I(p),_&&_.l(p),p.forEach(m),o=I(g),b.l(g),k=I(g),g.forEach(m),this.h()},h(){L(n,"class","svelte-1nmk5gi"),L(e,"class","user svelte-1nmk5gi")},m(f,g){V(f,e,g),d(e,n),Z(t,n,null),d(n,i),d(n,l),d(n,s),_&&_.m(n,null),d(e,o),u[v].m(e,null),d(e,k),A=!0},p(f,g){(!A||g&1)&&a!==(a=f[6].name+"")&&S(l,a),f[6].tag?_?_.p(f,g):(_=ee(f),_.c(),_.m(n,null)):_&&(_.d(1),_=null);let p=v;v=h(f,g),v!==p&&(J(),H(u[p],1,1,()=>{u[p]=null}),q(),b=u[v],b||(b=u[v]=P[v](f),b.c()),E(b,1),b.m(e,k))},i(f){A||(E(t.$$.fragment,f),E(b),A=!0)},o(f){H(t.$$.fragment,f),H(b),A=!1},d(f){f&&m(e),Y(t),_&&_.d(),u[v].d()}}}function ke(r){let e,n,t,i,a,l,s,o,c,v,b,k,A,_,P,u=r[0]&&$(r);return s=new fe({props:{text:"Add Admin",onclick:r[3]}}),{c(){e=y("div"),n=y("h2"),t=M("List of Admins"),i=D(),u&&u.c(),a=D(),l=y("div"),U(s.$$.fragment),o=D(),c=y("label"),v=M("Email:"),b=D(),k=y("input"),this.h()},l(h){e=B(h,"DIV",{});var f=w(e);n=B(f,"H2",{});var g=w(n);t=z(g,"List of Admins"),g.forEach(m),i=I(f),u&&u.l(f),a=I(f),l=B(f,"DIV",{class:!0});var p=w(l);j(s.$$.fragment,p),o=I(p),c=B(p,"LABEL",{for:!0});var Q=w(c);v=z(Q,"Email:"),Q.forEach(m),b=I(p),k=B(p,"INPUT",{type:!0,name:!0}),p.forEach(m),f.forEach(m),this.h()},h(){L(c,"for","email"),L(k,"type","email"),L(k,"name","email"),L(l,"class","add_admin svelte-1nmk5gi")},m(h,f){V(h,e,f),d(e,n),d(n,t),d(e,i),u&&u.m(e,null),d(e,a),d(e,l),Z(s,l,null),d(l,o),d(l,c),d(c,v),d(l,b),d(l,k),W(k,r[1]),A=!0,_||(P=se(k,"input",r[4]),_=!0)},p(h,[f]){h[0]?u?(u.p(h,f),f&1&&E(u,1)):(u=$(h),u.c(),E(u,1),u.m(e,a)):u&&(J(),H(u,1,1,()=>{u=null}),q());const g={};f&2&&(g.onclick=h[3]),s.$set(g),f&2&&k.value!==h[1]&&W(k,h[1])},i(h){A||(E(u),E(s.$$.fragment,h),A=!0)},o(h){H(u),H(s.$$.fragment,h),A=!1},d(h){h&&m(e),u&&u.d(),Y(s),_=!1,P()}}}function we(r,e,n){let t;re(r,ue,c=>n(5,t=c));let i;(async()=>n(0,i=await de()))();function a(c){return c.id==="cl3lwm64k000473wpz1alp5di"||c.id===(t==null?void 0:t.id)}let l;const s=async()=>{await _e(l,"admin")};function o(){l=this.value,n(1,l)}return[i,l,a,s,o]}class Me extends le{constructor(e){super(),ne(this,e,we,ke,ie,{})}}export{Me as default};
