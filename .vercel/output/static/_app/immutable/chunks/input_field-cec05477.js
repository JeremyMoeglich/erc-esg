import{S as C,i as D,s as g,k as d,q as N,a as S,l as p,m as b,r as w,h,c as z,n,b as v,D as k,u as P,B as q,e as E,_ as R,E as A,a6 as y}from"./index-8132481b.js";function m(t){return t=t.toLowerCase(),t=t.replace(/[^a-z0-9]/g,"_"),t.replace(/_+/g,"_")}function U(t){let e,u,s,i;return{c(){e=d("input"),this.h()},l(l){e=p(l,"INPUT",{type:!0,autocomplete:!0,name:!0,title:!0,placeholder:!0,class:!0}),this.h()},h(){n(e,"type",t[1]),e.value=t[0],n(e,"autocomplete",t[5]),n(e,"name",u=m(t[3])),n(e,"title",t[4]),e.required=t[2],n(e,"placeholder",t[4]),n(e,"class","svelte-58rmm0")},m(l,a){v(l,e,a),t[9](e),s||(i=A(e,"input",t[10]),s=!0)},p(l,a){a&2&&n(e,"type",l[1]),a&1&&e.value!==l[0]&&(e.value=l[0]),a&32&&n(e,"autocomplete",l[5]),a&8&&u!==(u=m(l[3]))&&n(e,"name",u),a&16&&n(e,"title",l[4]),a&4&&(e.required=l[2]),a&16&&n(e,"placeholder",l[4])},d(l){l&&h(e),t[9](null),s=!1,i()}}}function V(t){let e,u,s,i,l;return{c(){e=d("textarea"),this.h()},l(a){e=p(a,"TEXTAREA",{id:!0,placeholder:!0,autocomplete:!0,name:!0,title:!0,class:!0}),b(e).forEach(h),this.h()},h(){n(e,"id",u=m(t[3])),n(e,"placeholder",t[4]),n(e,"autocomplete",t[5]),e.required=t[2],n(e,"name",s=m(t[3])),n(e,"title",t[4]),n(e,"class","svelte-58rmm0")},m(a,r){v(a,e,r),y(e,t[0]),i||(l=A(e,"input",t[8]),i=!0)},p(a,r){r&8&&u!==(u=m(a[3]))&&n(e,"id",u),r&16&&n(e,"placeholder",a[4]),r&32&&n(e,"autocomplete",a[5]),r&4&&(e.required=a[2]),r&8&&s!==(s=m(a[3]))&&n(e,"name",s),r&16&&n(e,"title",a[4]),r&1&&y(e,a[0])},d(a){a&&h(e),i=!1,l()}}}function I(t){let e;function u(l,a){return l[6]?V:U}let s=u(t),i=s(t);return{c(){i.c(),e=E()},l(l){i.l(l),e=E()},m(l,a){i.m(l,a),v(l,e,a)},p(l,a){s===(s=u(l))&&i?i.p(l,a):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},d(l){i.d(l),l&&h(e)}}}function X(t){let e,u,s,i,l,a=t[1],r=I(t);return{c(){e=d("div"),u=d("label"),s=N(t[3]),l=S(),r.c(),this.h()},l(_){e=p(_,"DIV",{class:!0});var o=b(e);u=p(o,"LABEL",{for:!0,class:!0});var c=b(u);s=w(c,t[3]),c.forEach(h),l=z(o),r.l(o),o.forEach(h),this.h()},h(){n(u,"for",i=m(t[3])),n(u,"class","svelte-58rmm0"),n(e,"class","svelte-58rmm0")},m(_,o){v(_,e,o),k(e,u),k(u,s),k(e,l),r.m(e,null)},p(_,[o]){o&8&&P(s,_[3]),o&8&&i!==(i=m(_[3]))&&n(u,"for",i),o&2&&g(a,a=_[1])?(r.d(1),r=I(_),r.c(),r.m(e,null)):r.p(_,o)},i:q,o:q,d(_){_&&h(e),r.d(_)}}}function F(t,e,u){let{type:s="text"}=e,{value:i=""}=e,{required:l=!1}=e,{text:a}=e,{placeholder:r=""}=e,{autocomplete:_}=e,{text_field:o=!1}=e,c;function L(){i=this.value,u(0,i)}function T(f){R[f?"unshift":"push"](()=>{c=f,u(7,c)})}const B=()=>{u(0,i=c.value)};return t.$$set=f=>{"type"in f&&u(1,s=f.type),"value"in f&&u(0,i=f.value),"required"in f&&u(2,l=f.required),"text"in f&&u(3,a=f.text),"placeholder"in f&&u(4,r=f.placeholder),"autocomplete"in f&&u(5,_=f.autocomplete),"text_field"in f&&u(6,o=f.text_field)},[i,s,l,a,r,_,o,c,L,T,B]}class H extends C{constructor(e){super(),D(this,e,F,X,g,{type:1,value:0,required:2,text:3,placeholder:4,autocomplete:5,text_field:6})}}export{H as I};
