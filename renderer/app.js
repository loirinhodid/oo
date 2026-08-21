const games = [
  { id: 'demo-1', name: 'Seu jogo', genre: 'Ação / Aventura', description: 'Adicione seus próprios dados, capa, fundo e executável.', executable: '' },
  { id: 'demo-2', name: 'Novo título', genre: 'RPG', description: 'Cada jogo terá sua própria página e personalização.', executable: '' }
];

const list = document.querySelector('#games');
const search = document.querySelector('#search');

function render(query = '') {
  const value = query.trim().toLowerCase();
  list.innerHTML = games.filter(g => g.name.toLowerCase().includes(value) || g.genre.toLowerCase().includes(value)).map(g => `
    <article class="game" data-id="${g.id}">
      <div class="cover">${g.name}</div>
      <div class="game-body">
        <div class="game-title">${g.name}</div>
        <div class="game-genre">${g.genre}</div>
        <div class="game-actions">
          <button class="play" data-action="play">JOGAR</button>
          <button class="folder" data-action="folder" title="Abrir pasta">↗</button>
        </div>
      </div>
    </article>
  `).join('');
}

search.addEventListener('input', e => render(e.target.value));

document.addEventListener('click', async e => {
  const button = e.target.closest('[data-window]');
  if (button) return window.rover?.[button.dataset.window]?.();

  const action = e.target.closest('[data-action]');
  if (!action) return;
  const game = games.find(g => g.id === action.closest('.game')?.dataset.id);
  if (!game?.executable) return;
  if (action.dataset.action === 'play') await window.rover.launchGame(game.executable);
  if (action.dataset.action === 'folder') await window.rover.openGameFolder(game.executable);
});

render();
