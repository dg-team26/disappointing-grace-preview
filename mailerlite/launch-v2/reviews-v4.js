
(()=>{
const r=document.querySelector('.dg-hero-reviews');if(!r||r.dataset.ready)return;r.dataset.ready='1';
const cards=[...r.querySelectorAll('.dg-hero-reviews__slide')],dots=r.querySelector('.dg-hero-reviews__dots'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const buttons=[];let i=0,t,hover=false;const stop=()=>clearInterval(t);
function show(n){i=(n+cards.length)%cards.length;cards.forEach((c,k)=>{c.classList.toggle('dg-active',k===i);c.setAttribute('aria-hidden',String(k!==i))});buttons.forEach((b,k)=>b.setAttribute('aria-pressed',String(k===i)));buttons.forEach((b,k)=>{b.hidden=Math.min((k-i+cards.length)%cards.length,(i-k+cards.length)%cards.length)>2});for(let offset=-2;offset<=2;offset++){const k=(i+offset+cards.length)%cards.length;buttons[k].dataset.distance=String(Math.abs(offset));dots.appendChild(buttons[k])}dots.classList.remove('dg-dots-moving');void dots.offsetWidth;dots.classList.add('dg-dots-moving')}
function run(){stop();if(!reduced.matches&&!document.hidden&&!hover&&!r.contains(document.activeElement))t=setInterval(()=>show(i+1),3000)}
cards.forEach((c,k)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show reader highlight '+(k+1));b.addEventListener('click',()=>{show(k);run()});buttons.push(b);dots.appendChild(b)});
r.addEventListener('mouseenter',()=>{hover=true;stop()});r.addEventListener('mouseleave',()=>{hover=false;run()});r.addEventListener('focusin',stop);r.addEventListener('focusout',()=>setTimeout(run,0));document.addEventListener('visibilitychange',run);reduced.addEventListener('change',run);show(0);run();
})();


(()=>{
const r=document.getElementById('reviews');if(!r||r.dataset.swipe)return;r.dataset.swipe='1';
const cards=[...r.querySelectorAll('.dg-card')],g=r.querySelector('.dg-grid'),d=r.querySelector('.dg-dots'),m=matchMedia('(max-width:767px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const buttons=[];let i=0,t,start=null;const stop=()=>clearInterval(t);
const run=()=>{stop();if(!reduced.matches&&!document.hidden&&!start&&!r.contains(document.activeElement))t=setInterval(()=>show(i+1),3000)};
const show=n=>{i=(n+cards.length)%cards.length;cards.forEach((c,k)=>{c.classList.toggle('dg-active',k===i);c.setAttribute('aria-hidden',String(k!==i))});buttons.forEach((b,k)=>b.setAttribute('aria-pressed',String(k===i)));buttons.forEach((b,k)=>{b.hidden=Math.min((k-i+cards.length)%cards.length,(i-k+cards.length)%cards.length)>2});for(let offset=-2;offset<=2;offset++){const k=(i+offset+cards.length)%cards.length;buttons[k].dataset.distance=String(Math.abs(offset));d.appendChild(buttons[k])}d.classList.remove('dg-dots-moving');void d.offsetWidth;d.classList.add('dg-dots-moving')};
cards.forEach((c,k)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show review '+(k+1));b.addEventListener('click',()=>{show(k);run()});buttons.push(b);d.appendChild(b)});
r.classList.add('dg-ready');show(0);run();
g.addEventListener('click',()=>{if(!m.matches){show(i+1);run()}});
g.addEventListener('pointerdown',e=>{if(!m.matches||!e.isPrimary||(e.pointerType==='mouse'&&e.button!==0))return;start={x:e.clientX,y:e.clientY,id:e.pointerId};g.setPointerCapture?.(e.pointerId);stop()});
g.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const x=e.clientX-start.x,y=e.clientY-start.y;start=null;if(Math.abs(x)>40&&Math.abs(x)>Math.abs(y)*1.2)show(i+(x<0?1:-1));run()});
g.addEventListener('pointercancel',()=>{start=null;run()});
r.addEventListener('focusin',stop);r.addEventListener('focusout',()=>setTimeout(run,0));document.addEventListener('visibilitychange',run);m.addEventListener('change',()=>{start=null;show(i);run()});reduced.addEventListener('change',run);
})();
