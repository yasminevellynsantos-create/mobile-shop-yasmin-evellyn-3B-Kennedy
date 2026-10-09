/* ============================================================
   KAP — Camada de dados (LocalStorage)
   Toda leitura/escrita de objetos passa por aqui.
   ============================================================ */

const KAP = (() => {
  const KEY = 'kap_objetos';

  function gerarCodigo() {
    const n = Math.floor(1000 + Math.random() * 9000);
    return `KAP-${n}`;
  }

  function listar() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function salvar(lista) {
    localStorage.setItem(KEY, JSON.stringify(lista));
  }

  function adicionar(obj) {
    const lista = listar();
    obj.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    obj.codigo = gerarCodigo();
    obj.criadoEm = new Date().toISOString();
    lista.unshift(obj);
    salvar(lista);
    return obj;
  }

  function buscar(id) {
    return listar().find(o => o.id === id);
  }

  function atualizar(id, dados) {
    const lista = listar();
    const i = lista.findIndex(o => o.id === id);
    if (i === -1) return null;
    lista[i] = { ...lista[i], ...dados };
    salvar(lista);
    return lista[i];
  }

  function remover(id) {
    const lista = listar().filter(o => o.id !== id);
    salvar(lista);
  }

  function filtrar({ texto = '', categoria = '', status = '' } = {}) {
    const t = texto.trim().toLowerCase();
    return listar().filter(o => {
      const okTexto = !t ||
        o.titulo.toLowerCase().includes(t) ||
        o.descricao.toLowerCase().includes(t) ||
        o.local.toLowerCase().includes(t);
      const okCat = !categoria || o.categoria === categoria;
      const okStatus = !status || o.status === status;
      return okTexto && okCat && okStatus;
    });
  }

  function seed() {
    if (listar().length > 0) return;
    const exemplos = [
      {
        titulo: 'Mochila azul Nike',
        categoria: 'Material Escolar',
        status: 'encontrado',
        descricao: 'Mochila azul escura com listra branca. Contém cadernos e um estojo preto.',
        local: 'Pátio — perto da quadra',
        data: '2025-03-12',
        contato: 'Secretaria',
        turma: 'Secretaria',
        foto: null
      },
      {
        titulo: 'Celular Samsung preto',
        categoria: 'Eletrônicos',
        status: 'encontrado',
        descricao: 'Celular com capa preta e película trincada no canto superior.',
        local: 'Sala 12',
        data: '2025-03-14',
        contato: 'Prof. Marcos',
        turma: 'Sala 12',
        foto: null
      },
      {
        titulo: 'Chaveiro com chave de casa',
        categoria: 'Chaves',
        status: 'perdido',
        descricao: 'Chaveiro com pingente de coração vermelho e duas chaves.',
        local: 'Refeitório',
        data: '2025-03-15',
        contato: 'Ana Beatriz',
        turma: '2º Ano B',
        foto: null
      }
    ];
    exemplos.forEach(e => adicionar(e));
  }

  return { listar, adicionar, buscar, atualizar, remover, filtrar, seed };
})();

// Popula com exemplos na primeira visita
KAP.seed();