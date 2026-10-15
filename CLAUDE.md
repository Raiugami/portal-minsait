# Portal Minsait

Portal que reúne as ferramentas de IA criadas pelo Gabriel para o dia a dia da operação Minsait. Leia também o `README.md`.

## Regras do projeto

- Escreva toda a interface e a documentação em português do Brasil.
- Site 100% estático: sem login, sem servidor, sem back-end e sem chamadas a serviços externos. Qualquer processamento acontece só no navegador. Não adicione dados reais da equipe, PDFs ou exportações do Jira ao repositório.
- Stack: React + TypeScript + Vite, com Tailwind CSS 4, o mesmo do Gestão de horas (`../gestao-de-horas`). Não troque de stack nem adicione dependências sem necessidade.
- Identidade visual Minsait: vinho `#480e2a`, vinho escuro `#260717`, destaque `#ff0054`, fonte For Future Sans e logos em `public/brand`. Layout com barra lateral e cards. Reaproveite os tokens de `src/styles.css`.
- As ferramentas ficam registradas em `src/tools.ts`. Para criar uma nova, basta adicionar um item à lista `tools` (e, se for usar um ícone novo, registrá-lo em `src/icons.ts`). Card, menu lateral e busca são gerados a partir do registro.
- A Gestão de horas (`https://raiugami.github.io/gestao-de-horas`) é a primeira ferramenta. Este repositório não altera nem copia o código dela.

## Publicação

**Não publique, não crie repositório no GitHub e não faça push sem o usuário pedir ou autorizar na conversa atual.** Concluir o build local não significa publicado. O build usa caminhos relativos (`base: './'`), então a pasta `dist` funciona em qualquer subcaminho (ex.: GitHub Pages).

## Validar mudanças

```bash
npm test
npm run build   # confere os tipos e gera dist/
npm run dev     # servidor local em http://localhost:5173
```
