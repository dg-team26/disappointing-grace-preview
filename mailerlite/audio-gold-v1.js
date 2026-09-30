(()=>{
function init(){
document.querySelectorAll('.dg-audio').forEach(p=>{
if(p.dataset.ready)return;
p.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" aria-hidden=\"true\" style=\"position:absolute\"><defs><linearGradient id=\"dg-audio-gold\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop stop-color=\"#b88734\"/><stop offset=\".48\" stop-color=\"#e0b866\"/><stop offset=\"1\" stop-color=\"#c8963e\"/></linearGradient></defs></svg><div class=\"dg-audio__controls\" hidden><button class=\"dg-audio__play\" type=\"button\" aria-label=\"Play Chapter 1\" aria-pressed=\"false\"><span aria-hidden=\"true\">▶</span></button><span class=\"dg-audio__time\">0:00 / 9:43</span><input class=\"dg-audio__seek\" type=\"range\" min=\"0\" max=\"100\" step=\".1\" value=\"0\" aria-label=\"Audio position\" disabled><button class=\"dg-audio__mute\" type=\"button\" aria-label=\"Mute audio\" aria-pressed=\"false\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M3 9v6h4l5 4V5L7 9z\"/><path class=\"dg-audio__sound\" d=\"M15 8v8a5 5 0 0 0 0-8zm2-4v2a7 7 0 0 1 0 12v2a9 9 0 0 0 0-16z\"/><path class=\"dg-audio__silent\" hidden d=\"m16 8 2 2 2-2 1.4 1.4-2 2 2 2L20 15l-2-2-2 2-1.4-1.4 2-2-2-2z\"/></svg></button><button class=\"dg-audio__more\" type=\"button\" aria-label=\"Audio options\" aria-expanded=\"false\" aria-controls=\"dg-audio-options\"><span aria-hidden=\"true\">⋮</span></button></div><div class=\"dg-audio__options\" id=\"dg-audio-options\" hidden><button class=\"dg-audio__rate\" type=\"button\">Speed: 1×</button><a href=\"https://dg-team26.github.io/disappointing-grace-preview/chapter-1-audio.mp3\" target=\"_blank\" rel=\"noopener\">Open audio file ↗</a></div><p class=\"dg-audio__status\" role=\"status\" hidden></p>");
const a=p.querySelector('audio'),c=p.querySelector('.dg-audio__controls'),play=p.querySelector('.dg-audio__play'),icon=play.querySelector('span'),time=p.querySelector('.dg-audio__time'),seek=p.querySelector('.dg-audio__seek'),mute=p.querySelector('.dg-audio__mute'),more=p.querySelector('.dg-audio__more'),options=p.querySelector('.dg-audio__options'),rate=p.querySelector('.dg-audio__rate'),status=p.querySelector('.dg-audio__status');
p.dataset.ready='1';
const fmt=n=>{n=Math.max(0,Math.floor(n||0));return Math.floor(n/60)+':'+String(n%60).padStart(2,'0')};
function message(s){status.textContent=s;status.hidden=!s}
function sync(){
const duration=Number.isFinite(a.duration)&&a.duration>0?a.duration:0,current=a.currentTime||0;
time.textContent=fmt(current)+' / '+fmt(duration||583);
seek.disabled=!duration;
if(!dragging)seek.value=duration?Math.min(100,current/duration*100):0;
seek.style.setProperty('--dg-progress',seek.value+'%');
seek.setAttribute('aria-valuetext',fmt(duration*seek.value/100)+' of '+fmt(duration||583));
icon.textContent=a.paused?'▶':'Ⅱ';play.setAttribute('aria-label',a.paused?'Play Chapter 1':'Pause Chapter 1');play.setAttribute('aria-pressed',String(!a.paused));
mute.setAttribute('aria-label',a.muted?'Unmute audio':'Mute audio');mute.setAttribute('aria-pressed',String(a.muted));p.querySelector('.dg-audio__sound').hidden=a.muted;p.querySelector('.dg-audio__silent').hidden=!a.muted;
}
let dragging=false;
play.addEventListener('click',async()=>{
if(!a.paused){a.pause();return}
message('Loading audio…');
try{await a.play();message('')}catch(e){message('Unable to play. Please try again, or open the audio using the options button.')}
sync();
});
seek.addEventListener('input',()=>{dragging=true;seek.style.setProperty('--dg-progress',seek.value+'%');if(Number.isFinite(a.duration)&&a.duration>0){a.currentTime=a.duration*seek.value/100;time.textContent=fmt(a.currentTime)+' / '+fmt(a.duration);seek.setAttribute('aria-valuetext',fmt(a.currentTime)+' of '+fmt(a.duration))}});
seek.addEventListener('change',()=>{dragging=false;sync()});
seek.addEventListener('blur',()=>{dragging=false;sync()});
mute.addEventListener('click',()=>{a.muted=!a.muted;sync()});
function close(){options.hidden=true;more.setAttribute('aria-expanded','false')}
more.addEventListener('click',()=>{options.hidden=!options.hidden;more.setAttribute('aria-expanded',String(!options.hidden))});
rate.addEventListener('click',()=>{const rates=[1,1.25,1.5,2];a.playbackRate=rates[(rates.indexOf(a.playbackRate)+1)%rates.length];rate.textContent='Speed: '+a.playbackRate+'×'});
document.addEventListener('click',e=>{if(!p.contains(e.target))close()});
p.addEventListener('keydown',e=>{if(e.key==='Escape'&&!options.hidden){close();more.focus()}});
['timeupdate','durationchange','loadedmetadata','play','pause','ended','volumechange','seeked'].forEach(e=>a.addEventListener(e,sync));
a.addEventListener('waiting',()=>message('Loading audio…'));
a.addEventListener('playing',()=>message(''));
a.addEventListener('error',()=>message('Audio could not load. Open the audio using the options button, or try again.'));
sync();c.hidden=false;p.classList.add('dg-audio--ready');
});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();