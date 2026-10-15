/**
 * REGISTRO DAS FERRAMENTAS DO PORTAL
 *
 * Para adicionar uma ferramenta, inclua um objeto na lista `tools` abaixo.
 * Não é preciso mexer em mais nenhum arquivo: o card, o menu lateral e a busca
 * são gerados a partir daqui.
 */

export type ToolStatus = 'disponivel' | 'em-breve';

export type Tool = {
  /** Identificador único, em minúsculas e sem espaços (ex.: "gestao-de-horas"). */
  id: string;
  nome: string;
  /** Uma ou duas frases, em português, dizendo para que serve. */
  descricao: string;
  /** Endereço da ferramenta (HTTPS). */
  url: string;
  /** Nome de um ícone registrado em `src/icons.ts`. */
  icone: string;
  status: ToolStatus;
  /** Palavras que ajudam a encontrar a ferramenta na busca. */
  tags: string[];
};

export const tools: Tool[] = [
  {
    id: 'gestao-de-horas',
    nome: 'Gestão de horas',
    descricao:
      'Confere as dedicações mensais da equipe a partir dos PDFs de horas e das exportações do Jira, direto no navegador.',
    url: 'https://raiugami.github.io/gestao-de-horas',
    icone: 'Clock',
    status: 'disponivel',
    tags: ['horas', 'dedicação', 'jira', 'conferência', 'pdf'],
  },
];

/** Problemas de cadastro de uma lista de ferramentas (vazio = tudo certo). */
export function validarFerramentas(lista: Tool[]): string[] {
  const erros: string[] = [];
  const ids = new Set<string>();
  for (const t of lista) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.id)) erros.push(`${t.id}: id inválido`);
    if (ids.has(t.id)) erros.push(`${t.id}: id repetido`);
    ids.add(t.id);
    if (!t.nome.trim()) erros.push(`${t.id}: nome vazio`);
    if (!t.descricao.trim()) erros.push(`${t.id}: descrição vazia`);
    if (!/^https:\/\//.test(t.url)) erros.push(`${t.id}: url deve começar com https://`);
  }
  return erros;
}

/** Filtra por nome, descrição ou tags, ignorando acentos e maiúsculas. */
export function buscarFerramentas(lista: Tool[], termo: string): Tool[] {
  const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const q = norm(termo.trim());
  if (!q) return lista;
  return lista.filter((t) => norm([t.nome, t.descricao, ...t.tags].join(' ')).includes(q));
}
