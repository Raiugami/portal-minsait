# Portal Minsait

Portal estático com as ferramentas de IA para o dia a dia da operação Minsait. Sem login, sem servidor: tudo roda no navegador.

## Como abrir localmente

```bash
npm install
npm run dev        # desenvolvimento: http://localhost:5173
npm run build      # gera a pasta dist/
npm run preview    # serve o build: http://localhost:4173
```

Requer Node 22 ou superior.

## Como adicionar uma ferramenta

Edite `src/tools.ts` e inclua um item na lista `tools`:

```ts
{
  id: 'minha-ferramenta',
  nome: 'Minha ferramenta',
  descricao: 'Para que ela serve, em uma ou duas frases.',
  url: 'https://exemplo.github.io/minha-ferramenta',
  icone: 'Wrench',          // ícone registrado em src/icons.ts
  status: 'disponivel',     // ou 'em-breve'
  tags: ['palavras', 'de', 'busca'],
}
```

O card na página inicial, o item no menu lateral e a busca aparecem automaticamente. `npm test` valida o registro (id único, URL HTTPS etc.).
