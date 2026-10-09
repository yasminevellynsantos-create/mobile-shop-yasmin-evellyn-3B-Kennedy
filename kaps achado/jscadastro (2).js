/* ============================================================
   KAP — Cadastro de objeto (com upload de foto via IndexedDB)
   ============================================================ */

const form = document.getElementById('formCadastro');
const fotoInput = document.getElementById('foto');
const preview = document.getElementById('preview');
const previewWrap = document.getElementById('previewWrap');

let arquivoFoto = null;
let urlPreview = null;

fotoInput.addEventListener('change', (e) => {
  const arquivo = e.target.files[0];
  if (!arquivo) return;

  if (arquivo.size > 5 * 1024 * 1024) {
    alert('A imagem é muito grande. Escolha uma com menos de 5MB.');
    fotoInput.value = '';
    return;
  }

  if (urlPreview) URL.revokeObjectURL(urlPreview);
  arquivoFoto = arquivo;
  urlPreview = URL.createObjectURL(arquivo);
  preview.src = urlPreview;
  previewWrap.style.display = 'block';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Salvando...';

  const dados = {
    titulo: document.getElementById('titulo').value.trim(),
    categoria: document.getElementById('categoria').value,
    status: document.getElementById('status').value,
    descricao: document.getElementById('descricao').value.trim(),
    local: document.getElementById('local').value.trim(),
    data: document.getElementById('data').value,
    contato: document.getElementById('contato').value.trim(),
    turma: document.getElementById('turma').value.trim()
  };

  try {
    const obj = await KAP.adicionar(dados, arquivoFoto);
    if (urlPreview) URL.revokeObjectURL(urlPreview);
    alert(`✅ Objeto cadastrado! Código: ${obj.codigo}\nVocê será redirecionado para a página de detalhes.`);
    window.location.href = `detalhes.html?id=${obj.id}`;
  } catch (err) {
    console.error(err);
    alert('Erro ao salvar. Tente novamente.');
    btn.disabled = false;
    btn.textContent = 'Cadastrar objeto';
  }
});