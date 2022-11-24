import"./index-8132481b.js";import{w as a}from"./index-674a61bc.js";function p(t){const o=t-1;return o*o*o+1}function g(t,{delay:o=0,duration:e=400,easing:c=p,x:i=0,y:d=0,opacity:y=0}={}){const n=getComputedStyle(t),s=+n.opacity,u=n.transform==="none"?"":n.transform,f=s*(1-y);return{delay:o,duration:e,easing:c,css:(r,l)=>`
			transform: ${u} translate(${(1-r)*i}px, ${(1-r)*d}px);
			opacity: ${s-f*l}`}}const m=a(0),b=a({delay:0,duration:500}),$=a({delay:0,duration:500});m.subscribe(t=>{b.set({delay:t,duration:500-t}),$.set({delay:0,duration:500-t})});export{m as d,g as f,b as i,$ as o};
