/* ============================================================
   KAP — Detalhes + Ações (marcar devolvido / excluir)
   ============================================================ */

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const container = document.getElementById('detalhes');
const naoEncontrado = document.getElementById('naoEncontrado');

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function formatarData(iso) {
  if (!iso) return '—';
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

function statusLabel(s) {
  return { perdido: 'Perdido', encontrado: 'Encontrado', devolvido: 'Devolvido' }[s] || s;
}

async function renderizar() {
  if (!id) { mostrarNaoEncontrado(); return; }

  const obj = await KAP.buscar(id);
  if (!obj) { mostrarNaoEncontrado(); return; }

  let fotoHTML = '';
  if (obj.temFoto) {
    const url = await KAP.urlFoto(obj.id);
    if (url) fotoHTML = `<img class="foto-principal" src="${url}" alt="${escapeHtml(obj.titulo)}">`;
  }

  container.innerHTML = `
    ${fotoHTML}
    <span class="badge badge-${obj.status}">${statusLabel(obj.status)}</span>
    <h2>${escapeHtml(obj.titulo)}</h2>
    <div class="codigo">🔑 Código: <strong>${escapeHtml(obj.codigo)}</strong></div>

    <div class="detalhes-linha"><strong>Categoria</strong><span>${escapeHtml(obj.categoria)}</span></div>
    <div class="detalhes-linha"><strong>Descrição</strong><span>${escapeHtml(obj.descricao)}</span></div>
    <div class="detalhes-linha"><strong>Local</strong><span>${escapeHtml(obj.local)}</span></div>
    <div class="detalhes-linha"><strong>Data</strong><span>${formatarData(obj.data)}</span></div>
    <div class="detalhes-linha"><strong>Cadastrado por</strong><span>${escapeHtml(obj.contato)}</span></div>
    <div class="detalhes-linha"><strong>Turma/Setor</strong><span>${escapeHtml(obj.turma || '—')}</span></div>

    <div class="detalhes-acoes">
      ${obj.status !== 'devolvido'
        ? `<button class="btn btn-primary" id="btnDevolvido">✅ Marcar como devolvido</button>`
        : `<button class="btn btn-ghost" id="btnReverter">↩️ Reverter para "Encontrado"</button>`}
      <button class="btn btn-danger" id="btnExcluir">🗑️ Excluir registro</button>
      <a class="btn btn-ghost" href="retirada.html">📋 Como retirar</a>
    </div>
  `;

  /* --- Marcar como devolvido --- */
  const btnDevolvido = document.getElementById('btnDevolvido');
  if (btnDevolvido) {
    btnDevolvido.addEventListener('click', async () => {
      if (!confirm('Marcar este objeto como DEVOLVIDO ao dono?')) return;
      await KAP.marcarDevolvido(id);
      alert('✅ Objeto marcado como devolvido!');
      renderizar();
    });
  }

  /* --- Reverter --- */
  const btnReverter = document.getElementById('btnReverter');
  if (btnReverter) {
    btnReverter.addEventListener('click', async () => {
      await KAP.atualizar(id, { status: 'encontrado' });
      renderizar();
    });
  }

  /* --- Excluir (apaga também a foto do banco) --- */
  document.getElementById('btnExcluir').addEventListener('click', async () => {
    const confirmacao = prompt(
      `⚠️ EXCLUSÃO DEFINITIVA\n\n` +
      `Objeto: ${obj.titulo}\n` +
      `Código: ${obj.codigo}\n\n` +
      `Isso apagará o registro E a foto do banco de dados.\n` +
      `Digite EXCLUIR para confirmar:`
    );
    if (confirmacao !== 'EXCLUIR') {
      if (confirmacao !== null) alert('Exclusão cancelada.');
      return;
    }

    await KAP.excluirDefinitivo(id);
    alert('🗑️ Registro e imagem excluídos do banco de dados.');
    window.location.href = 'index.html';
  });
}

function mostrarNaoEncontrado() {
  container.style.display = 'none';
  naoEncontrado.style.display = 'block';
}

renderizar();