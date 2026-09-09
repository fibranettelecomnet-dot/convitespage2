const target = new Date('2026-10-10T18:30:00-03:00').getTime();
const $ = (id) => document.getElementById(id);

function pad(n){ return String(Math.max(0,n)).padStart(2,'0'); }
function updateTimer(){
  const diff = target - Date.now();
  if(diff <= 0){
    $('days').textContent='00'; $('hours').textContent='00'; $('minutes').textContent='00'; $('seconds').textContent='00';
    return;
  }
  const days=Math.floor(diff/86400000);
  const hours=Math.floor(diff%86400000/3600000);
  const minutes=Math.floor(diff%3600000/60000);
  const seconds=Math.floor(diff%60000/1000);
  $('days').textContent=pad(days); $('hours').textContent=pad(hours); $('minutes').textContent=pad(minutes); $('seconds').textContent=pad(seconds);
}
updateTimer(); setInterval(updateTimer,1000);

const observer = new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

const modal=$('giftModal');
$('giftBtn').addEventListener('click',()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';});
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
$('closeModal').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

// Pequeno efeito de brilho ao tocar na tela, sem prejudicar acessibilidade.
document.addEventListener('click',e=>{
  const dot=document.createElement('span'); dot.textContent='✦';
  dot.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;color:#efb4f2;pointer-events:none;z-index:30;font-size:18px;animation:clickSpark .7s ease forwards;`;
  document.body.appendChild(dot); setTimeout(()=>dot.remove(),700);
});
const style=document.createElement('style');style.textContent='@keyframes clickSpark{0%{opacity:1;transform:translate(-50%,-50%) scale(.6)}100%{opacity:0;transform:translate(-50%,-80px) scale(1.5)}}';document.head.appendChild(style);