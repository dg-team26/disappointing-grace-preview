'use strict';
(async()=>{
const $=id=>document.getElementById(id),book=$('book'),loading=$('loading'),prev=$('prev'),next=$('next'),select=$('page'),status=$('status');
// Original flipbook pages 2, 3 and 17 are excluded (inside cover, title, Keep Going).
const pages=[{src:'cover.jpg',name:'Front cover'},...Array.from({length:16},(_,i)=>({src:`page-${String(i+1).padStart(2,'0')}.jpg`,name:i===15?'Back cover':`Sample page ${i+1}`})).filter((_,i)=>i!==0&&i!==14)];
pages.forEach((p,i)=>{const page=document.createElement('div');page.className='page';if(p.src){const img=document.createElement('img');img.src=p.src;img.alt=p.name;img.draggable=false;page.append(img)}else{page.classList.add('blank');const text=document.createElement('span');text.textContent='When Desperate Prayers Go Unanswered';page.append(text)}book.append(page);select.add(new Option(p.name,String(i)))});
prev.disabled=next.disabled=true;
try{
if(!window.St?.PageFlip)throw new Error('Reader unavailable');
await Promise.all([...book.querySelectorAll('img')].map(img=>img.decode()));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const flip=new St.PageFlip(book,{width:396,height:612,size:'stretch',minWidth:360,maxWidth:600,minHeight:150,maxHeight:930,autoSize:false,showCover:true,usePortrait:true,mobileScrollSupport:false,flippingTime:reduced?1:650,maxShadowOpacity:reduced?0:.28,showPageCorners:!reduced,swipeDistance:35});
function sync(){const i=flip.getCurrentPageIndex(),portrait=flip.getOrientation()==='portrait';select.value=String(i);status.textContent=i===0?'Front cover':i===pages.length-1?'Back cover':portrait?`${i+1} / ${pages.length}`:`${i+1}–${Math.min(i+2,pages.length)} / ${pages.length}`;prev.disabled=i===0;next.disabled=i>=pages.length-1||(!portrait&&i>=pages.length-2)}
flip.on('init',sync);flip.on('flip',sync);flip.on('changeOrientation',sync);flip.loadFromHTML(book.querySelectorAll('.page'));
// Keep the cover alone initially, but use the same flexible turn for every page.
for(let i=0;i<flip.getPageCount();i++)flip.getPage(i).setDensity('soft');
loading.hidden=true;sync();
prev.addEventListener('click',()=>flip.flipPrev());next.addEventListener('click',()=>flip.flipNext());select.addEventListener('change',()=>flip.flip(parseInt(select.value,10)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&parent!==window){parent.postMessage({type:'dg-preview-close'},'*');return}if(e.target.matches?.('select,input,textarea'))return;if(e.key==='ArrowRight'){e.preventDefault();flip.flipNext()}if(e.key==='ArrowLeft'){e.preventDefault();flip.flipPrev()}});
const screen=$('screen');if(!document.documentElement.requestFullscreen)screen.hidden=true;else screen.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{screen.textContent='Use browser full screen'}});document.addEventListener('fullscreenchange',()=>{screen.textContent=document.fullscreenElement?'Exit full screen':'Full screen';flip.update()});
}catch(error){loading.textContent='The page viewer could not open. Please use “Read the PDF” below.';select.disabled=true;$('screen').hidden=true;console.error(error)}
})();
