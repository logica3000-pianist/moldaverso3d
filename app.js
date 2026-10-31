const storeUrl='https://lista.mercadolivre.com.br/_CustId_271940237_NoIndex_True?item_id=MLB7820973894&category_id=MLB1839&seller_id=271940237&client=recoview-selleritems&recos_listing=true';
const whatsapp=(text)=>'https://wa.me/5519986101844?text='+encodeURIComponent(text);
document.querySelectorAll('[data-store]').forEach(a=>a.href=storeUrl);
document.querySelector('#custom-whatsapp').href=whatsapp('Olá, Moldaverso! Gostaria de conversar sobre um boneco personalizado.');
document.querySelector('#footer-whatsapp').href=whatsapp('Olá, Moldaverso! Gostaria de saber mais sobre os bonecos.');
const products=[
{id:'michael-jackson',name:'Michael Jackson',category:'music',label:'Ícones da música',note:'Visual Billie Jean',description:'Chapéu preto, luva e um visual inesquecível. Uma referência inspirada na era Billie Jean.'},
{id:'taylor-swift',name:'Taylor Swift',category:'music',label:'Ícones da música',note:'Guitarra & brilho',description:'Cabelos ondulados, guitarra e detalhes brilhantes em um modelo inspirado no universo da cantora.'},
{id:'hagrid',name:'Rúbeo Hagrid',category:'magic',label:'Universo bruxo',note:'Guarda-chuva rosa',description:'A barba marcante, o casaco e o guarda-chuva rosa trazem os detalhes característicos de Hagrid.'},
{id:'luna-lovegood',name:'Luna Lovegood',category:'magic',label:'Universo bruxo',note:'Óculos coloridos',description:'Óculos coloridos e uma personalidade singular, reunidos em um modelo cheio de detalhes.'},
{id:'elton-john',name:'Elton John',category:'music',label:'Ícones da música',note:'Óculos de estrela',description:'Óculos em formato de estrela e um figurino que traduz a presença de palco de Elton John.'},
{id:'george-michael',name:'George Michael',category:'music',label:'Ícones da música',note:'Visual Faith',description:'Jaqueta, jeans e óculos escuros em uma referência ao estilo da era Faith.'},
{id:'dumbledore',name:'Alvo Dumbledore',category:'magic',label:'Universo bruxo',note:'Traje roxo & dourado',description:'Barba longa, óculos e um traje roxo com detalhes dourados compõem esta versão do personagem.'},
{id:'snape',name:'Severo Snape',category:'magic',label:'Universo bruxo',note:'Traje escuro & varinha',description:'O cabelo preto, o traje escuro e a varinha formam uma silhueta inconfundível.'},
{id:'draco-malfoy',name:'Draco Malfoy',category:'magic',label:'Universo bruxo',note:'Uniforme & varinha',description:'Cabelos claros e uniforme com detalhes em verde em um modelo inspirado em Draco Malfoy.'},
{id:'neville-longbottom',name:'Neville Longbottom',category:'magic',label:'Universo bruxo',note:'Espada & mandrágora',description:'Um modelo com os acessórios que remetem aos momentos de coragem de Neville.'},
{id:'rony-weasley',name:'Rony Weasley',category:'magic',label:'Universo bruxo',note:'Cabelos ruivos & varinha',description:'Cabelos ruivos, uniforme e varinha em uma referência a um dos amigos mais queridos do universo bruxo.'}
];
const grid=document.querySelector('#product-grid'),search=document.querySelector('#search'),dialog=document.querySelector('#product-dialog');
let filter='all',lastTrigger;
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function render(){
const term=normalize(search.value.trim());
const visible=products.filter(p=>(filter==='all'||p.category===filter)&&normalize(p.name+' '+p.label+' '+p.note).includes(term));
grid.innerHTML=visible.map(p=>`<article class="product-card"><button class="product-photo" data-id="${p.id}" aria-label="Ampliar modelo ${p.name}"><img src="assets/${p.id}.webp" alt="Modelo de referência de ${p.name} — ${p.note}" loading="lazy" width="800" height="1000"><span class="zoom"><svg aria-hidden="true"><use href="#zoom"/></svg></span></button><span class="category-label">${p.label}</span><h3>${p.name}</h3><div class="product-foot"><span>${p.note}</span><button class="model-detail" data-id="${p.id}" aria-label="Ver detalhes de ${p.name}">Ver modelo <svg aria-hidden="true"><use href="#arrow"/></svg></button></div></article>`).join('');
document.querySelector('#result-count').textContent=visible.length===1?'1 modelo para explorar':`${visible.length} modelos para explorar`;
document.querySelector('#empty-state').hidden=visible.length>0;
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(t=>{t.classList.toggle('active',t===b);t.setAttribute('aria-pressed',String(t===b));});render();}));
search.addEventListener('input',render);
document.querySelector('#reset').addEventListener('click',()=>{search.value='';document.querySelector('[data-filter="all"]').click();search.focus();});
function openProduct(id,trigger){const p=products.find(x=>x.id===id);if(!p)return;lastTrigger=trigger;document.querySelector('#dialog-title').textContent=p.name;document.querySelector('#dialog-category').textContent=p.label;document.querySelector('#dialog-description').textContent=p.description;const im=document.querySelector('#dialog-image');im.src=`assets/${p.id}.webp`;im.alt=`Modelo de referência de ${p.name}`;document.querySelector('#model-whatsapp').href=whatsapp(`Olá, Moldaverso! Vi o modelo ${p.name} no site e gostaria de consultar o preço e a disponibilidade.`);dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;}
grid.addEventListener('click',e=>{const trigger=e.target.closest('[data-id]');if(trigger)openProduct(trigger.dataset.id,trigger);});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastTrigger?.focus();});
const menu=document.querySelector('#mobile-menu'),toggle=document.querySelector('.menu-toggle');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');menu.hidden=open;});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}));
render();
