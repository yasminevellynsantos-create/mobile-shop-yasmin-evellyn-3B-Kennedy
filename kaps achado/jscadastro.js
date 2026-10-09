/* ============================================================
   KAP — Cadastro de objeto (com upload de foto)
   ============================================================ */

const form = document.getElementById('formCadastro');
const fotoInput = document.getElementById('foto');
const preview = document.getElementById('preview');
const previewWrap = document.getElementById('previewWrap');

let fotoBase64 = null;

fotoInput.addEventListener('change', (e) => {
  const arquivo = e.target.files[0];
  if (!arquivo) return;

  if (arquivo.size > 2 * 1024 * 1024) {
    alert('A imagem é muito grande. Escolha uma com menos de 2MB.');
    fotoInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (ev) => {
    fotoBase64 = ev.target.result;
    preview.src = fotoBase64;
    previewWrap.style.display = 'block';
  };
  reader.readAsDataURL(arquivo