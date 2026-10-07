const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const db={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v??d}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};

/* ---------- Luqadaha / Languages ---------- */
const T={
so:{welcome:'Soo dhawoow',home_sub:'Waqtigaaga ka faa\'iidayso.',start:'BILAAW',stat_n:'Qorshayaal',stat_a:'Celcelis rate',stat_m:'Daqiiqo diiradda',news_t:'Ogaysiis',
news1:'ARDAY waxay kaa caawisaa inaad qorshayso, bilowdo oo dhamaystirto hawlahaaga.',news2:'Dhammaystir qorshahaaga 10/10 si aad u hesho dhiirigelin.',
plan_t:'Qorshe cusub',l_name:'Waxa aad qabanayso ama baranayso',l_plan:'Sida aad wax u qabanayso',l_time:'Waqtiga ku filan',u_min:'Daqiiqo',u_h:'Saac',
ph_name:'Tusaale: Xisaab, cutubka 3aad',ph_plan:'Tusaale: Waxaan ku qaban doonaa layliyo 10 su\'aalood',ph_ai:'Weydii su\'aal waxbarasho...',ph_pname:'Magacaaga',
run_for:'Waxaad hadda ku shaqeynaysaa',stop:'Dhammee',res_t:'Natiijada',again:'Qorshe cusub',err:'Buuxi magaca, qorshaha iyo waqtiga.',
r10:'10/10. Aad baad u fiicantahay! Ku soo noqo markale oo sii wad.',rlow:'Rate-kaagu waa {n}/10. Mar dambe diiradda ku hay, waxaad gaadhi kartaa 10/10.',rleft:'Waxaad app-ka ka baxday {c} jeer.',
nudge:'Ha dhicin! Qorshahaagu wuu sugayaa. Ku noqo oo dhamaystir.',ov_t:'Ku noqo diiradda',ov_btn:'Sii wad',
ai_t:'AI Support',ai_hi:'Waxaan ka jawaabaa su\'aalaha waxbarasho ee aan hubo. Haddii aanan hubin, waan sheegayaa.',
ai_na:'Ma hubo jawaabtan, sidaas darteed ma sheegayo wax khalad ah. Weydii qorshe, diiradda, hurdada, imtixaanka ama xusuusta.',
p_t:'Profile',save:'Keydi',lang_t:'Luqad',theme_t:'Mawduuc',dark:'Madow',light:'Iftiin',hist_t:'History',clear:'Tirtir',empty:'Weli wax ma jiraan.',sure:'Ma tirtirtaa History-ga oo dhan?'},
en:{welcome:'Welcome',home_sub:'Make the most of your time.',start:'START',stat_n:'Sessions',stat_a:'Avg rate',stat_m:'Focused minutes',news_t:'Announcements',
news1:'ARDAY helps you plan, start and finish your tasks.',news2:'Finish your plan with 10/10 to earn encouragement.',
plan_t:'New plan',l_name:'What you will do or learn',l_plan:'How you will do it',l_time:'Time available',u_min:'Minutes',u_h:'Hours',
ph_name:'Example: Math, chapter 3',ph_plan:'Example: I will solve 10 practice questions',ph_ai:'Ask a study question...',ph_pname:'Your name',
run_for:'You are now working on',stop:'Finish',res_t:'Result',again:'New plan',err:'Fill in the name, plan and time.',
r10:'10/10. Excellent work! Come back and keep going.',rlow:'Your rate is {n}/10. Next time stay focused and you can reach 10/10.',rleft:'You left the app {c} time(s).',
nudge:'Do not quit! Your plan is waiting. Come back and finish it.',ov_t:'Back to focus',ov_btn:'Continue',
ai_t:'AI Support',ai_hi:'I answer study questions I am sure about. If I am not sure, I will say so.',
ai_na:'I am not sure about this, so I will not guess. Ask about planning, focus, sleep, exams or memory.',
p_t:'Profile',save:'Save',lang_t:'Language',theme_t:'Theme',dark:'Dark',light:'Light',hist_t:'History',clear:'Clear',empty:'Nothing yet.',sure:'Clear all History?'}};
let lang=db.get('lang','so'),S=null,tick=null;
const t=k=>T[lang][k]||k;

/* ---------- Magaca animation ---------- */
$$('.brand').forEach(b=>{b.innerHTML=[...'ARDAY'].map((c,i)=>`<span style="animation-delay:${i*.12}s,${1+i*.12}s">${c}</span>`).join('')});
setTimeout(()=>{$('#splash').classList.add('hide');setTimeout(()=>$('#splash').remove(),600)},2200);

/* ---------- Dhex-socod ---------- */
function go(id){$$('.page').forEach(p=>p.classList.toggle('active',p.id===id));$$('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.go===id));scrollTo(0,0);if(id==='home')renderHome();if(id==='settings')renderHistory()}
$$('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));

function applyLang(){document.documentElement.lang=lang;$$('[data-i]').forEach(e=>e.textContent=t(e.dataset.i));$$('[data-p]').forEach(e=>e.placeholder=t(e.dataset.p));$$('[data-lang]').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));renderHome();renderHistory()}
$$('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;db.set('lang',lang);applyLang()});

function setTheme(m){document.documentElement.dataset.theme=m;db.set('theme',m);$$('[data-theme]').forEach(b=>{if(b.tagName==='BUTTON')b.classList.toggle('on',b.dataset.theme===m)})}
$$('button[data-theme]').forEach(b=>b.onclick=()=>setTheme(b.dataset.theme));

/* ---------- Home ---------- */
function renderHome(){const h=db.get('hist',[]),n=db.get('name','');
 $('#hello').textContent=t('welcome')+(n?', '+n:'');
 $('#st-n').textContent=h.length;
 $('#st-a').textContent=h.length?(h.reduce((a,x)=>a+x.rate,0)/h.length).toFixed(1):'-';
 $('#st-m').textContent=h.reduce((a,x)=>a+x.focus,0)}

/* ---------- Qorshe + timer ---------- */
const fmt=s=>{s=Math.ceil(s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),c=s%60,p=n=>String(n).padStart(2,'0');return (h?h+':':'')+p(m)+':'+p(c)};
$('#startBtn').onclick=()=>{
 const name=$('#fName').value.trim(),plan=$('#fPlan').value.trim(),v=+$('#fTime').value,u=$('#fUnit').value;
 if(!name||!plan||!(v>0)){$('#err').textContent=t('err');return}
 $('#err').textContent='';
 S={name,plan,total:v*(u==='h'?3600:60),focus:0,away:0,elapsed:0,last:Date.now(),left:0,vis:true,t0:0,done:false};
 $('#planForm').hidden=true;$('#result').hidden=true;$('#run').hidden=false;
 $('#runName').textContent=name;$('#runPlan').textContent=plan;
 clearInterval(tick);tick=setInterval(step,1000);step()};
function step(){if(!S||S.done)return;const n=Date.now(),d=(n-S.last)/1000;S.last=n;S.elapsed+=d;S.vis?S.focus+=d:S.away+=d;
 const rem=Math.max(0,S.total-S.elapsed);$('#clock').textContent=fmt(rem);
 $('#ring').style.strokeDashoffset=603.19*(1-Math.min(1,S.elapsed/S.total));
 if(rem<=0)finish()}
document.addEventListener('visibilitychange',()=>{if(!S||S.done)return;step();if(S.done)return;
 if(document.hidden){S.vis=false;S.t0=Date.now()}
 else{S.vis=true;if((Date.now()-S.t0)/1000>3){S.left++;$('#ovTxt').textContent=t('nudge');$('#ov').hidden=false}}});
$('#ovBtn').onclick=()=>$('#ov').hidden=true;
$('#stopBtn').onclick=finish;
function finish(){if(!S||S.done)return;S.done=true;clearInterval(tick);
 const f=Math.min(S.focus,S.total),rate=Math.min(10,Math.round(f/S.total*10));
 const h=db.get('hist',[]);h.unshift({name:S.name,planned:Math.round(S.total/60),focus:Math.round(f/60),rate,date:new Date().toISOString()});db.set('hist',h.slice(0,50));
 $('#run').hidden=true;$('#result').hidden=false;$('#ov').hidden=true;
 $('#rate').textContent=rate+'/10';
 $('#rdet').textContent=Math.round(f/60)+' / '+Math.round(S.total/60)+' min';
 $('#rmsg').textContent=rate===10?t('r10'):t('rlow').replace('{n}',rate)+(S.left?' '+t('rleft').replace('{c}',S.left):'');
 renderHome()}
$('#againBtn').onclick=()=>{S=null;$('#result').hidden=true;$('#planForm').hidden=false;$('#fName').value='';$('#fPlan').value='';$('#fTime').value=25;$('#ring').style.strokeDashoffset=603.19};

/* ---------- AI Support (xog la hubo iyo mid aan lahubin) ---------- */
const KB=[
{k:['pomodoro','focus','diirad','concentr','distract','xooga'],so:'Isticmaal habka Pomodoro: 25 daqiiqo oo diiradda saar, kadib 5 daqiiqo nasasho. Telefoonka meel kale dhig inta aad wax barato.',en:'Use the Pomodoro method: 25 minutes of focus, then a 5 minute break. Keep your phone away while studying.'},
{k:['hurdo','sleep'],so:'Dhalinyaradu badanaa waxay u baahan yihiin 8 ilaa 10 saacadood oo hurdo ah. Hurdo la\'aantu waxay hoos u dhigtaa xusuusta iyo diiradda.',en:'Teenagers usually need 8 to 10 hours of sleep. Lack of sleep lowers memory and focus.'},
{k:['imtixaan','exam','test'],so:'Dib u akhri in yar maalin walba, maaha habeenka ugu dambeeya. Isku day inaad su\'aalaha ka jawaabto adigoon buugga eegin.',en:'Review a little each day, not only the night before. Practice answering questions without looking at your book.'},
{k:['qorshe','plan','jadwal','schedule'],so:'Qorshe wanaagsan wuxuu leeyahay hawl cad, waqti go\'an iyo natiijo la cabbiri karo. Ka bilow 25 ilaa 45 daqiiqo.',en:'A good plan has one clear task, a fixed time and a result you can measure. Start with 25 to 45 minutes.'},
{k:['xusuus','xifdi','memor','remember'],so:'Naftaada tijaabi: isku day inaad wax xasuusato adigoon eegin, kadibna dib u celi maalmo kala duwan.',en:'Test yourself: try to recall without looking, then repeat on different days.'},
{k:['caajis','lazy','motivat','dhiirigel'],so:'Ka bilow 5 daqiiqo oo kaliya. Bilowgu waa qaybta ugu adag; kadib way fududaataa inaad sii wadato.',en:'Start with just 5 minutes. Starting is the hardest part; continuing gets easier.'}];
function addMsg(x,c){const d=document.createElement('div');d.className='msg '+c;d.textContent=x;$('#chat').append(d);$('#chat').scrollTop=1e9}
function ask(){const q=$('#aiQ').value.trim();if(!q)return;addMsg(q,'me');$('#aiQ').value='';
 const s=q.toLowerCase(),m=KB.find(e=>e.k.some(w=>s.includes(w)));setTimeout(()=>addMsg(m?m[lang]:t('ai_na'),'ai'),300)}
$('#aiBtn').onclick=ask;$('#aiQ').addEventListener('keydown',e=>{if(e.key==='Enter')ask()});

/* ---------- Settings ---------- */
$('#pSave').onclick=()=>{db.set('name',$('#pName').value.trim());renderHome();go('home')};
function renderHistory(){const h=db.get('hist',[]),l=$('#hist');l.innerHTML='';
 if(!h.length){const p=document.createElement('p');p.className='mut';p.textContent=t('empty');l.append(p);return}
 h.forEach(x=>{const d=document.createElement('div');d.className='hi';const a=document.createElement('div');
  const b=document.createElement('b');b.textContent=x.name;const s=document.createElement('small');s.textContent=x.focus+'/'+x.planned+' min, '+new Date(x.date).toLocaleDateString();
  a.append(b,s);const r=document.createElement('span');r.className='pill';r.textContent=x.rate+'/10';d.append(a,r);l.append(d)})}
$('#clr').onclick=()=>{if(confirm(t('sure'))){db.set('hist',[]);renderHistory();renderHome()}};

/* ---------- Bilow ---------- */
setTheme(db.get('theme','dark'));$('#pName').value=db.get('name','');applyLang();addMsg(t('ai_hi'),'ai');

