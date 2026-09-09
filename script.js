const target = new Date('2026-10-10T18:30:00-03:00').getTime();
const $ = (id) => document.getElementById(id);

function pad(n){ return String(Math.max(0,n)).padStart(2,'0'); }
function updateTimer(){
  const diff = target - Date.now();
  if(diff <= 0){
    ['days','hours','minutes','seconds'].forEach(id => { if($(id)) $(id).textContent='00'; });
    return;
  }
  const days=Math.floor(diff/86400000);
  const hours=Math.floor(diff%86400000/3600000);
  const minutes=Math.floor(diff%3600000/60000);
  const seconds=Math.floor(diff%60000/1000);
  if($('days')) $('days').textContent=pad(days);
  if($('hours')) $('hours').textContent=pad(hours);
  if($('minutes')) $('minutes').textContent=pad(minutes);
  if($('seconds')) $('seconds').textContent=pad(seconds);
}
updateTimer();
setInterval(updateTimer,1000);

const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('visible');
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:'smooth'});
}));

// Abertura cinematográfica do convite.
const opening = document.getElementById('opening');
const envelope = document.getElementById('openInvite');
const openTriggers = document.querySelectorAll('#openInvite,[data-open-invite]');
let inviteOpened = false;

function openInvitation(){
  if(inviteOpened || !opening) return;
  inviteOpened = true;
  envelope?.classList.add('opening');
  opening.classList.add('opened');
  document.body.classList.add('invitation-opened');
  setTimeout(()=>{
    opening.remove();
    window.scrollTo({top:0,behavior:'instant'});
    document.querySelector('.hero')?.classList.add('visible');
  },1200);
}

openTriggers.forEach(trigger=>trigger.addEventListener('click',openInvitation));

// Também permite abrir pressionando Enter/Espaço quando a abertura estiver em foco.
document.addEventListener('keydown',event=>{
  if(!inviteOpened && (event.key==='Enter' || event.key===' ')){
    event.preventDefault();
    openInvitation();
  }
});

// Brilho delicado ao tocar/clicar, inspirado nos pontos de luz da arte.
document.addEventListener('click',e=>{
  if(e.target.closest('a,button')) return;
  const dot=document.createElement('span');
  dot.textContent='✦';
  dot.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;color:#efb4f2;pointer-events:none;z-index:30;font-size:17px;animation:clickSpark .75s ease forwards;`;
  document.body.appendChild(dot);
  setTimeout(()=>dot.remove(),750);
});

const style=document.createElement('style');
style.textContent='@keyframes clickSpark{0%{opacity:1;transform:translate(-50%,-50%) scale(.5)}100%{opacity:0;transform:translate(-50%,-65px) scale(1.6)}}';
document.head.appendChild(style);