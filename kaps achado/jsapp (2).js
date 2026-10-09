/* ============================================================
   KAP — Página inicial: busca, filtros e listagem
   ============================================================ */

const inputBusca = document.getElementById('busca');
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroStatus = document.getElementById('filtroStatus');
const listaObjetos = document.getElementById('listaObjetos');
const vazio = document.getElementById('vazio');
const resultadoInfo = document.getElementById('resultadoInfo');

function statusLabel(s) {
  return { perdido: 'Perdido', encontrado: 'Encontrado', devolvido: 'Devolvido' }[s] || s;
}

function formatarData(iso) {
  if (!iso) return '—';
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

async function criarCard(obj) {
  const a = document.createElement('a');
  a.className = 'card-objeto';
  a.href = `detalhes.html?id=${obj.id}`;

  let imgHTML = `<div class="sem-foto">📦</div>`;
  if (obj.temFoto) {
    const url = await KAP.urlFoto(obj.id);
    if (url) imgHTML = `<img src="${url}" alt="${escapeHtml(obj.titulo)}">`;
  }

  a.innerHTML = `
    ${imgHTML}
    <div class="card-body">
      <span class="badge badge-${obj.status}">${statusLabel(obj.status)}</span>
      <h3>${escapeHtml(obj.titulo)}</h3>
      <span class="meta">📍 ${escapeHtml(obj.local)}</span>
      <span class="meta">📅 ${formatarData(obj.data)}</span>
      <span class="meta">🏷️ ${escapeHtml(obj.categoria)}</span>
      <span class="meta">🔑 ${escapeHtml(obj.codigo)}</span>
    </div>
  `;
  return a;
}

async function renderizar() {
  const filtros = {
    texto: inputBusca.value,
    categoria: filtroCategoria.value,
    status: filtroStatus.value
  };
  const resultados = await KAP.filtrar(filtros);

  listaObjetos.innerHTML = '';

  for (const o of resultados) {
    const card = await criarCard(o);
    listaObjetos.appendChild(card);
  }

  vazio.style.display = resultados.length === 0 ? 'block' : 'none';
  resultadoInfo.textContent = resultados.length === 0
    ? ''
    : `${resultados.length} objeto(s) encontrado(s)`;
}

let debounceTimer;
inputBusca.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(renderizar, 200);
});
filtroCategoria.addEventListener('change', renderizar);
filtroStatus.addEventListener('change', renderizar);

/* Inicialização */
(async () => {
  await KAP.seed();
  await renderizar();
})();