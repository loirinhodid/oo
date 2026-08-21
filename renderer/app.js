const games = [
  {id:'demo-1',name:'Aurora Protocol',genre:'Ação · RPG',developer:'Rover Studio',description:'Um exemplo de página individual. Aqui entram a descrição completa, mídia, capa e fundo personalizados de cada jogo.',executable:'',cover:'',background:'',level:1,xp:0},
  {id:'demo-2',name:'Neon District',genre:'Ação · Mundo Aberto',developer:'Independent',description:'Outro jogo de demonstração para testar a biblioteca, pesquisa e navegação individual.',executable:'',cover:'',background:'',level:2,xp:120}
];
const app=document.querySelector('#app');
let view='library';

const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function library(query=''){
 const q=query.toLowerCase();
 const filtered=games.filter(g=>(g.name+' '+g.genre+' '+g.developer).toLowerCase().includes(q));
 app.innerHTML=`<section class="hero"><div class="hero-copy"><p class="eyebrow">SUA BIBLIOTECA</p><h1>Seus jogos.<br><em>Do seu jeito.</em></h1><p class="muted">Um launcher pessoal para organizar e iniciar jogos que já estão instalados no computador.</p><div class="search"><span>⌕</span><input id="search" value="${escapeHtml(query)}" placeholder="Pesquisar jogos..."></div></div></section><section class="content"><div class="section-head"><div><p class="eyebrow">BIBLIOTECA</p><h2>Meus jogos</h2></div><button class="ghost" data-action="add">+ Adicionar jogo</button></div><div class="games">${filtered.map(card).join('')||'<div class="empty">Nenhum jogo encontrado.</div>'}</div></section>`;
 document.querySelector('#search').addEventListener('input',e=>library(e.target.value));
}
function card(g){return `<article class="game" data-id="${g.id}"><div class="cover" style="${g.cover?`background-image:url('${escapeHtml(g.cover)}');background-size:cover;background-position:center`:''}">${g.cover?'':escapeHtml(g.name)}</div><div class="game-body"><div class="game-title">${escapeHtml(g.name)}</div><div class="game-genre">${escapeHtml(g.genre)}</div><div class="game-actions"><button class="play" data-action="play">JOGAR</button><button class="folder" data-action="folder">↗</button></div></div></article>`}
function detail(id){const g=games.find(x=>x.id===id);if(!g)return library();app.innerHTML=`<section class="detail"><div class="detail-bg" style="${g.background?`background-image:linear-gradient(90deg,#080a0f 3%,rgba(8,10,15,.82) 43%,rgba(8,10,15,.35)),url('${escapeHtml(g.background)}');background-size:cover;background-position:center`:''}"></div><div class="detail-content"><button class="back" data-action="back">← Biblioteca</button><p class="eyebrow">${escapeHtml(g.developer)}</p><h1>${escapeHtml(g.name)}</h1><div class="meta">${escapeHtml(g.genre)} · Nível ${g.level} · ${g.xp} XP</div><p class="detail-desc">${escapeHtml(g.description)}</p><div class="detail-actions"><button class="primary" data-action="play">JOGAR</button><button class="secondary" data-action="folder">Abrir pasta</button><button class="secondary" data-action="customize">Personalizar</button></div></div></section>`}
function generic(title,text){app.innerHTML=`<section class="page"><p class="eyebrow">ROVER CLIENT</p><h1>${title}</h1><div class="panel"><h3>${title}</h3><p>${text}</p></div></section>`}
function render(){if(view==='library')library();else if(view==='friends')generic('Amigos','Adicione pessoas e acompanhe sua atividade. O sistema de ranking não faz parte do projeto.');else if(view==='social')generic('Social','Espaço para serviços pessoais, pesquisa e atalhos externos.');else generic('Personalizar','Configure aparência do launcher e preferências dos seus jogos.');}

document.addEventListener('click',async e=>{
 const w=e.target.closest('[data-window]');if(w)return window.rover?.[w.dataset.window]?.();
 const nav=e.target.closest('[data-view]');if(nav){view=nav.dataset.view;document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x===nav));render();return}
 const a=e.target.closest('[data-action]');if(!a)return;const action=a.dataset.action;const id=a.closest('[data-id]')?.dataset.id;const g=games.find(x=>x.id===id);
 if(action==='add'){generic('Adicionar jogo','A próxima etapa será criar o formulário para cadastrar nome, gênero, descrição, capa, background e selecionar o executável local.');return}
 if(action==='back'){render();return}
 if(action==='customize'){generic('Personalizar jogo','Aqui serão configurados capa, background, imagem/GIF/vídeo e demais dados individuais do jogo.');return}
 if(!g)return;
 if(action==='play'){if(g.executable)await window.rover.launchGame(g.executable);else alert('Este jogo ainda não possui um executável configurado.');}
 if(action==='folder'){if(g.executable)await window.rover.openGameFolder(g.executable);}
});

document.addEventListener('dblclick',e=>{const game=e.target.closest('.game');if(game)detail(game.dataset.id)});
render();
