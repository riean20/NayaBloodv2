document.querySelector('.menu-toggle').addEventListener('click', function(){const nav=document.querySelector('.nav');const open=nav.classList.toggle('open');this.setAttribute('aria-expanded',String(open));this.setAttribute('aria-label',open?'Close navigation':'Open navigation')});document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('.nav').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false')}));

// Add accessible, keyboard-operable flip cards and show only the project-provided tier stats.
const tierStats={
  'tier-common':{tier:'COMMON',stake:'2500 NB/day',att:'20',hp:'1000'},
  'tier-rare':{tier:'RARE',stake:'3750 NB/day',att:'30',hp:'1200'},
  'tier-legendary':{tier:'LEGENDARY',stake:'5125 NB/day',att:'45',hp:'1400'},
  'tier-mythic':{tier:'MYTHIC',stake:'7700 NB/day',att:'60',hp:'1650'},
  'tier-devil':{tier:'DEVIL',stake:'11700 NB/day',att:'80',hp:'2000'}
};
document.querySelectorAll('.collection-card, .devil-card').forEach(card=>{
  const inner=document.createElement('div');
  inner.className='card-flip-inner';
  const front=document.createElement('div');
  front.className='card-flip-front';
  while(card.firstChild) front.appendChild(card.firstChild);
  inner.appendChild(front);
  const cardName=front.querySelector('h3')?.textContent?.trim() || front.querySelector('.art-caption')?.textContent?.replace(/^DEVIL\s*[·-]\s*/i,'').trim() || 'NayaBlood card';
  const stats=Object.entries(tierStats).find(([className])=>card.classList.contains(className))?.[1];
  const back=document.createElement('div');
  back.className='card-flip-back';
  back.setAttribute('aria-hidden','true');
  back.innerHTML='<span class="flip-back-mark" aria-hidden="true">✳</span><p class="eyebrow">PROJECT-PROVIDED CARD STATS</p><h3></h3><span class="flip-tier"></span><dl class="flip-stats"><div><dt>Stake</dt><dd class="stat-stake"></dd></div><div><dt>ATT</dt><dd class="stat-att"></dd></div><div><dt>HP</dt><dd class="stat-hp"></dd></div></dl><p class="flip-caveat">Project-provided figures, not verified on-chain.</p><span class="flip-instruction">Click or press Enter to return</span>';
  back.querySelector('h3').textContent=cardName;
  if(stats){
    back.querySelector('.flip-tier').textContent=stats.tier;
    back.querySelector('.stat-stake').textContent=stats.stake;
    back.querySelector('.stat-att').textContent=stats.att;
    back.querySelector('.stat-hp').textContent=stats.hp;
  }
  inner.appendChild(back);
  card.appendChild(inner);
  card.classList.add('card-flip');
  card.setAttribute('role','button');
  card.setAttribute('tabindex','0');
  card.setAttribute('aria-pressed','false');
  card.setAttribute('aria-label',`${cardName}${stats?`, ${stats.tier}`:''}. Show project-provided card stats.`);
  card.setAttribute('aria-keyshortcuts','Enter Space');
  const toggle=()=>{
    const flipped=card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed',String(flipped));
    card.setAttribute('aria-label',`${cardName}${stats?`, ${stats.tier}`:''}. ${flipped?'Project-provided card stats shown. Show artwork.':'Show project-provided card stats.'}`);
    back.setAttribute('aria-hidden',String(!flipped));
    front.setAttribute('aria-hidden',String(flipped));
  };
  card.addEventListener('click',event=>{
    if(event.target.closest('a,button,input,select,textarea')) return;
    toggle();
  });
  card.addEventListener('keydown',event=>{
    if(event.target!==card) return;
    if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}
  });
});
