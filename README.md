# Repository-name-mobile-shop-base
Projeto base React + Vite - Programação Mobile
# Mobile Shop — React + Vite

Projeto base utilizado nas aulas de **Programação Mobile**.

Este repositório já contém a estrutura inicial do projeto React.

O objetivo é que cada aluno crie seu próprio repositório a partir deste modelo e desenvolva nele durante as aulas.

---

# 1. Criar seu próprio repositório

Na página deste repositório, clique em:

**Use this template**

Depois:

**Create a new repository**

Escolha um nome para o seu projeto.

Sugestão:

```text
mobile-shop-seu-nome
```

Exemplo:

```text
mobile-shop-joao-silva
```

Depois clique em:

**Create repository from template**

A partir desse momento você terá seu próprio repositório.

As alterações feitas nele não alteram o projeto-base do professor.

---

# 2. Abrir o Codespace

Dentro do seu novo repositório, clique em:

```text
Code
↓
Codespaces
↓
Create codespace on main
```

Aguarde alguns segundos.

O GitHub abrirá um ambiente semelhante ao VS Code diretamente no navegador.

---

# 3. Conferir onde você está

Antes de executar qualquer comando, abra o Terminal.

Digite:

```bash
pwd
```

Esse comando mostra a pasta atual.

Exemplo:

```text
/workspaces/mobile-shop-joao-silva
```

Depois execute:

```bash
ls
```

Esse comando mostra os arquivos e pastas existentes.

Você deverá encontrar arquivos semelhantes a:

```text
src
package.json
package-lock.json
vite.config.js
index.html
README.md
```

---

# 4. Importante: o React já está criado

Este projeto foi criado previamente com:

```bash
npm create vite@latest . -- --template react
```

Por isso, você **NÃO deverá executar esse comando novamente**.

Não use:

```bash
npm create vite@latest . -- --template react
```

O projeto React já existe dentro deste repositório.

---

# 5. Instalar as dependências

No terminal execute:

```bash
npm install
```

Esse comando instalará as dependências necessárias para executar o projeto.

Aguarde a conclusão.

---

# 6. Rodar o projeto

Depois execute:

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento.

Você verá uma mensagem semelhante a:

```text
VITE ready

Local: http://localhost:5173/
```

No Codespaces aparecerá a opção para abrir o projeto no navegador.

Clique em:

```text
Open in Browser
```

ou abra a porta indicada pelo Codespaces.

Se a página do projeto aparecer, está funcionando corretamente.

---

# 7. Estrutura principal do projeto

A estrutura será semelhante a:

```text
mobile-shop-seu-nome/
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductImage.jsx
│   │   ├── Cart.jsx
│   │   └── Footer.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

A ordem em que os arquivos aparecem no Explorer não altera o funcionamento do projeto.

---

# 8. Durante o desenvolvimento

Sempre que alterar um arquivo, salve utilizando:

```text
Ctrl + S
```

O Vite normalmente atualizará a página automaticamente.

Se o servidor tiver sido encerrado, execute novamente:

```bash
npm run dev
```

---

# 9. Salvar uma versão do projeto no Git

Antes de enviar alterações, confira o estado do projeto:

```bash
git status
```

Depois adicione os arquivos:

```bash
git add .
```

Crie um commit:

```bash
git commit -m "Descrição da alteração"
```

Exemplo:

```bash
git commit -m "Header e Hero finalizados"
```

Depois envie para o GitHub:

```bash
git push
```

Sequência completa:

```bash
git status
git add .
git commit -m "Alterações da aula"
git push
```

---

# 10. Entenda a diferença

## Ctrl + S

Salva o arquivo que você está editando.

```text
Ctrl + S
↓
Salva o arquivo
```

## git commit

Cria uma versão do projeto.

```text
git commit
↓
Cria um ponto no histórico
```

## git push

Envia os commits para o GitHub.

```text
git push
↓
Envia a versão para o repositório online
```

Resumindo:

```text
Ctrl + S
    ↓
Salvar arquivo

git add .
    ↓
Preparar alterações

git commit
    ↓
Registrar versão

git push
    ↓
Enviar para o GitHub
```

---

# 11. Ver o histórico de versões

Para visualizar os commits:

```bash
git log --oneline
```

Exemplo:

```text
a8f42c1 Carrinho funcionando
72bd991 CSS finalizado
31af820 Header e Hero prontos
18c29aa Projeto inicial
```

Cada linha representa uma versão salva do projeto.

---

# 12. Visitar uma versão anterior

Se quiser verificar como o projeto estava em um commit anterior:

```bash
git switch --detach CODIGO_DO_COMMIT
```

Exemplo:

```bash
git switch --detach 72bd991
```

Você poderá visualizar e testar aquela versão.

Para voltar à versão atual:

```bash
git switch main
```

---

# 13. Cuidado com este comando

Existe também:

```bash
git reset --hard CODIGO_DO_COMMIT
```

Esse comando pode alterar o projeto atual e apagar alterações que ainda não foram salvas em commits.

Não utilize sem orientação do professor.

Para apenas visualizar uma versão antiga, prefira:

```bash
git switch --detach CODIGO_DO_COMMIT
```

Depois volte com:

```bash
git switch main
```

---

# Comandos principais

| Comando | Função |
|---|---|
| `pwd` | Mostra em qual pasta você está |
| `ls` | Lista arquivos e pastas |
| `npm install` | Instala as dependências |
| `npm run dev` | Inicia o projeto |
| `git status` | Mostra alterações no projeto |
| `git add .` | Prepara os arquivos para o commit |
| `git commit -m "mensagem"` | Cria uma versão |
| `git push` | Envia os commits para o GitHub |
| `git log --oneline` | Mostra o histórico |
| `git switch main` | Volta para a branch principal |

---

# Fluxo da aula

```text
mobile-shop-base
        ↓
Use this template
        ↓
Criar seu próprio repositório
        ↓
Abrir Codespace
        ↓
pwd
        ↓
ls
        ↓
npm install
        ↓
npm run dev
        ↓
Desenvolver
        ↓
Ctrl + S
        ↓
git status
        ↓
git add .
        ↓
git commit
        ↓
git push
```

---

# Regra importante

Cada aluno deverá trabalhar em seu **próprio repositório**.

Não altere o repositório-base do professor.

Utilize o projeto-base apenas para criar seu projeto através de:

```text
Use this template
```

Depois disso, todo o desenvolvimento deverá acontecer no seu próprio repositório.

---

## Checklist antes de encerrar a aula

- Projeto abriu corretamente
- Alterações foram salvas
- `git status` foi conferido
- `git add .` foi executado
- Commit foi criado
- `git push` foi executado
- Alterações aparecem no seu repositório do GitHub

**Projeto salvo no GitHub = trabalho protegido e histórico registrado.**
