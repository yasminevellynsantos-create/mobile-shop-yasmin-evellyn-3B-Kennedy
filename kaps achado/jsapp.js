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

function criarCard(obj) {
  const a = document.createElement('a');
  a.className = 'card-objeto';
  a.href = `detalhes.html?id=${obj.id}`;

  const imgHTML = obj.foto
    ? `<img src="${obj.foto}" alt="${obj.titulo}">`
    : `<div class="sem-foto">📦</div>`;

  a.innerHTML = `
    ${imgHTML}
    <div class="card-body">
      <span class="badge badge-${obj.status}">${statusLabel(obj.status)}</span>
      <h3>${escapeHtml(obj.titulo)}</h3>
      <span class="meta">📍 ${escapeHtml(obj.local)}</span>
      <span class="meta">📅 ${formatarData(obj.data)}</span>
      <span class="meta">🏷️ ${escapeHtml(obj.categoria)}</span>
    </div>
  `;
  return a;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function renderizar() {
  const filtros = {
    texto: inputBusca.value,
    categoria: filtroCategoria.value,
    status: filtroStatus.value
  };
  const resultados = KAP.filtrar(filtros);

  listaObjetos.innerHTML = '';
  resultados.forEach(o => listaObjetos.appendChild(criarCard(o)));

  vazio.style.display = resultados.length === 0 ? 'block' : 'none';
  resultadoInfo.textContent = resultados.length === 0
    ? ''
    : `${resultados.length} objeto(s) encontrado(s)`;
}

inputBusca.addEventListener('input', renderizar);
filtroCategoria.addEventListener('change', renderizar);
filtroStatus.addEventListener('change', renderizar);

renderizar();