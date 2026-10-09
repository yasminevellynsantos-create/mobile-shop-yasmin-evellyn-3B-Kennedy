/* ============================================================
   KAP — Banco de Dados IndexedDB
   Guarda objetos E imagens (Blobs) de forma persistente.
   ============================================================ */

const DB = (() => {
  const NOME = 'kap_db';
  const VERSAO = 1;
  const STORE_OBJETOS = 'objetos';
  const STORE_IMAGENS = 'imagens';

  let _db = null;

  function abrir() {
    return new Promise((resolve, reject) => {
      if (_db) return resolve(_db);

      const req = indexedDB.open(NOME, VERSAO);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;

        if (!db.objectStoreNames.contains(STORE_OBJETOS)) {
          const store = db.createObjectStore(STORE_OBJETOS, { keyPath: 'id' });
          store.createIndex('codigo', 'codigo', { unique: true });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('categoria', 'categoria', { unique: false });
          store.createIndex('criadoEm', 'criadoEm', { unique: false });
        }

        if (!db.objectStoreNames.contains(STORE_IMAGENS)) {
          db.createObjectStore(STORE_IMAGENS, { keyPath: 'id' });
        }
      };

      req.onsuccess = () => { _db = req.result; resolve(_db); };
      req.onerror = () => reject(req.error);
    });
  }

  function tx(store, modo = 'readonly') {
    return abrir().then(db => db.transaction(store, modo).objectStore(store));
  }

  /* ---------- OBJETOS ---------- */

  async function listarObjetos() {
    const store = await tx(STORE_OBJETOS);
    return new Promise((res, rej) => {
      const req = store.getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  }

  async function obterObjeto(id) {
    const store = await tx(STORE_OBJETOS);
    return new Promise((res, rej) => {
      const req = store.get(id);
      req.onsuccess = () => res(req.result || null);
      req.onerror = () => rej(req.error);
    });
  }

  async function salvarObjeto(obj) {
    const store = await tx(STORE_OBJETOS, 'readwrite');
    return new Promise((res, rej) => {
      const req = store.put(obj);
      req.onsuccess = () => res(obj);
      req.onerror = () => rej(req.error);
    });
  }

  async function removerObjeto(id) {
    const store = await tx(STORE_OBJETOS, 'readwrite');
    return new Promise((res, rej) => {
      const req = store.delete(id);
      req.onsuccess = () => res(true);
      req.onerror = () => rej(req.error);
    });
  }

  /* ---------- IMAGENS ---------- */

  async function salvarImagem(id, blob) {
    const store = await tx(STORE_IMAGENS, 'readwrite');
    return new Promise((res, rej) => {
      const req = store.put({ id, blob, criadoEm: new Date().toISOString() });
      req.onsuccess = () => res(true);
      req.onerror = () => rej(req.error);
    });
  }

  async function obterImagem(id) {
    const store = await tx(STORE_IMAGENS);
    return new Promise((res, rej) => {
      const req = store.get(id);
      req.onsuccess = () => res(req.result ? req.result.blob : null);
      req.onerror = () => rej(req.error);
    });
  }

  async function removerImagem(id) {
    const store = await tx(STORE_IMAGENS, 'readwrite');
    return new Promise((res, rej) => {
      const req = store.delete(id);
      req.onsuccess = () => res(true);
      req.onerror = () => rej(req.error);
    });
  }

  /* Cria URL temporária para exibir a imagem no <img src> */
  async function urlImagem(id) {
    const blob = await obterImagem(id);
    return blob ? URL.createObjectURL(blob) : null;
  }

  return {
    listarObjetos,
    obterObjeto,
    salvarObjeto,
    removerObjeto,
    salvarImagem,
    obterImagem,
    removerImagem,
    urlImagem
  };
})();