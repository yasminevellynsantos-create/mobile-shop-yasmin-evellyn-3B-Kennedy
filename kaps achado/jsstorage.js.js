/* ============================================================
   KAP — Camada de dados (agora com IndexedDB)
   Toda leitura/escrita passa por aqui.
   ============================================================ */

const KAP = (() => {

  function gerarCodigo() {
    const n = Math.floor(1000 + Math.random() * 9000);
    return `KAP-${n}`;
  }

  function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  /* ---------- LISTAR / FILTRAR ---------- */

  async function listar() {
    const lista = await DB.listarObjetos();
    return lista.sort((a, b) => (b.criadoEm || '').localeCompare(a.criadoEm || ''));
  }

  async function buscar(id) {
    return DB.obterObjeto(id);
  }

  async function filtrar({ texto = '', categoria = '', status = '' } = {}) {
    const t = texto.trim().toLowerCase();
    const lista = await listar();
    return lista.filter(o => {
      const okTexto = !t ||
        (o.titulo || '').toLowerCase().includes(t) ||
        (o.descricao || '').toLowerCase().includes(t) ||
        (o.local || '').toLowerCase().includes(t) ||
        (o.codigo || '').toLowerCase().includes(t);
      const okCat = !categoria || o.categoria === categoria;
      const okStatus = !status || o.status === status;
      return okTexto && okCat && okStatus;
    });
  }

  /* ---------- ADICIONAR (com foto) ---------- */

  async function adicionar(dados, arquivoFoto = null) {
    const id = gerarId();
    const obj = {
      id,
      codigo: gerarCodigo(),
      criadoEm: new Date().toISOString(),
      temFoto: false,
      ...dados
    };

    if (arquivoFoto) {
      await DB.salvarImagem(id, arquivoFoto);
      obj.temFoto = true;
    }

    await DB.salvarObjeto(obj);
    return obj;
  }

  /* ---------- ATUALIZAR ---------- */

  async function atualizar(id, dados) {
    const obj = await DB.obterObjeto(id);
    if (!obj) return null;
    const novo = { ...obj, ...dados };
    await DB.salvarObjeto(novo);
    return novo;
  }

  /* ---------- REMOVER (objeto + imagem) ---------- */

  async function remover(id) {
    await DB.removerImagem(id);
    await DB.removerObjeto(id);
    return true;
  }

  /* Marca como devolvido (não apaga ainda — permite histórico) */
  async function marcarDevolvido(id) {
    return atualizar(id, { status: 'devolvido', devolvidoEm: new Date().toISOString() });
  }

  /* Remove definitivamente (usado após confirmação) */
  async function excluirDefinitivo(id) {
    return remover(id);
  }

  /* ---------- IMAGEM ---------- */

  async function urlFoto(id) {
    return DB.urlImagem(id);
  }

  /* ---------- SEED (exemplos iniciais) ---------- */

  async function seed() {
    const existentes = await listar();
    if (existentes.length > 0) return;

    const exemplos = [
      {
        titulo: 'Mochila azul Nike',
        categoria: 'Material Escolar',
        status: 'encontrado',
        descricao: 'Mochila azul escura com listra branca. Contém cadernos e um estojo preto.',
        local: 'Pátio — perto da quadra',
        data: '2025-03-12',
        contato: 'Secretaria',
        turma: 'Secretaria'
      },
      {
        titulo: 'Celular Samsung preto',
        categoria: 'Eletrônicos',
        status: 'encontrado',
        descricao: 'Celular com capa preta e película trincada no canto superior.',
        local: 'Sala 12',
        data: '2025-03-14',
        contato: 'Prof. Marcos',
        turma: 'Sala 12'
      },
      {
        titulo: 'Chaveiro com chave de casa',
        categoria: 'Chaves',
        status: 'perdido',
        descricao: 'Chaveiro com pingente de coração vermelho e duas chaves.',
        local: 'Refeitório',
        data: '2025-03-15',
        contato: 'Ana Beatriz',
        turma: '2º Ano B'
      }
    ];

    for (const e of exemplos) await adicionar(e);
  }

  return {
    listar, buscar, filtrar,
    adicionar, atualizar, remover,
    marcarDevolvido, excluirDefinitivo,
    urlFoto, seed
  };
})();