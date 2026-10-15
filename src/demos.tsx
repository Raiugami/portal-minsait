import type { CSSProperties, ReactNode } from 'react';

/**
 * Demonstrações animadas das ferramentas (CSS + SVG, sem vídeo e sem dados reais).
 * Para dar uma demo a uma nova ferramenta, adicione uma entrada em `demos` com o mesmo `id` do registro.
 * As animações são desligadas por prefers-reduced-motion (ver styles.css) e o desenho estático continua legível.
 */

const WINE = '#480e2a';
const PINK = '#ff0054';
const OK = '#17684d';
const WARN = '#c77d0a';
const SOFT = '#e6dde2';
const PAPER = '#ffffff';

/** Atraso de entrada em segundos, lido pelas classes `a-*`. */
const d = (s: number): CSSProperties => ({ ['--d' as string]: `${s}s` });

function Palco({ children, rotulo }: { children: ReactNode; rotulo: string }) {
  return (
    <svg className="demo-svg" viewBox="0 0 300 110" role="presentation" aria-hidden focusable="false" data-demo={rotulo}>
      {children}
    </svg>
  );
}

function Check({ x, y, cor = OK, atraso }: { x: number; y: number; cor?: string; atraso: number }) {
  return (
    <polyline
      className="a-draw"
      style={d(atraso)}
      pathLength={1}
      points={`${x},${y} ${x + 3.5},${y + 3.5} ${x + 9},${y - 3}`}
      fill="none"
      stroke={cor}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** Gestão de horas: PDF + Jira entram, a conferência marca cada linha. */
function DemoHoras() {
  const linhas = [
    { y: 22, w: 54, h: 40, ok: true },
    { y: 44, w: 40, h: 56, ok: true },
    { y: 66, w: 62, h: 34, ok: false },
    { y: 88, w: 48, h: 48, ok: true },
  ];
  return (
    <Palco rotulo="horas">
      <g>
        <rect x={10} y={14} width={40} height={38} fill={PAPER} stroke={WINE} strokeWidth={1.5} />
        <rect x={16} y={21} width={18} height={4} fill={PINK} />
        <rect x={16} y={29} width={26} height={3} fill={SOFT} />
        <rect x={16} y={35} width={22} height={3} fill={SOFT} />
        <rect x={16} y={41} width={26} height={3} fill={SOFT} />
        <rect x={10} y={60} width={40} height={38} fill={PAPER} stroke={WINE} strokeWidth={1.5} />
        <rect x={16} y={67} width={14} height={4} fill={WINE} />
        <rect x={16} y={75} width={26} height={3} fill={SOFT} />
        <rect x={16} y={81} width={20} height={3} fill={SOFT} />
        <rect x={16} y={87} width={26} height={3} fill={SOFT} />
      </g>
      <circle className="a-flow" style={{ ...d(0), ['--dx' as string]: '62px' }} cx={56} cy={33} r={3.5} fill={PINK} />
      <circle className="a-flow" style={{ ...d(0.35), ['--dx' as string]: '62px' }} cx={56} cy={79} r={3.5} fill={WINE} />
      <rect x={122} y={10} width={168} height={92} fill={PAPER} stroke={SOFT} strokeWidth={1.5} />
      <rect x={122} y={10} width={168} height={4} fill={WINE} />
      {linhas.map((l, i) => (
        <g key={l.y} className="a-pop" style={d(1 + i * 0.5)}>
          <circle cx={136} cy={l.y + 7} r={4.5} fill={SOFT} />
          <rect x={146} y={l.y + 3} width={l.w} height={4} fill={WINE} opacity={0.75} />
          <rect x={146} y={l.y + 10} width={l.h} height={3} fill={SOFT} />
          {l.ok ? (
            <Check x={266} y={l.y + 8} atraso={1.4 + i * 0.5} />
          ) : (
            <g className="a-pop a-warn" style={d(1.4 + i * 0.5)}>
              <path d={`M270 ${l.y + 1} L277 ${l.y + 13} L263 ${l.y + 13} Z`} fill={WARN} />
              <rect x={269.2} y={l.y + 5} width={1.6} height={4} fill={PAPER} />
              <rect x={269.2} y={l.y + 10} width={1.6} height={1.6} fill={PAPER} />
            </g>
          )}
        </g>
      ))}
    </Palco>
  );
}

/** Planejamento de férias: barras no calendário, conflito de cobertura destacado. */
function DemoFerias() {
  const pessoas = [
    { y: 18, x: 54, w: 90, cor: WINE },
    { y: 40, x: 108, w: 108, cor: PINK },
    { y: 62, x: 198, w: 90, cor: WINE },
    { y: 84, x: 72, w: 72, cor: '#8f3a63' },
  ];
  return (
    <Palco rotulo="ferias">
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1={54 + i * 18} x2={54 + i * 18} y1={8} y2={104} stroke={SOFT} strokeWidth={1} />
      ))}
      {pessoas.map((p, i) => (
        <g key={p.y}>
          <circle cx={26} cy={p.y + 6} r={8} fill={SOFT} />
          <circle cx={26} cy={p.y + 3} r={3} fill={WINE} opacity={0.6} />
          <path d={`M19 ${p.y + 12} a7 5 0 0 1 14 0 z`} fill={WINE} opacity={0.6} />
          <rect className="a-grow" style={d(0.4 + i * 0.6)} x={p.x} y={p.y} width={p.w} height={13} fill={p.cor} />
        </g>
      ))}
      <rect className="a-conflito" x={108} y={12} width={36} height={47} fill={WARN} opacity={0.28} stroke={WARN} strokeDasharray="4 3" />
      <g className="a-pop" style={d(3)}>
        <circle cx={126} cy={36} r={8} fill={WARN} />
        <rect x={125.2} y={31} width={1.6} height={6} fill={PAPER} />
        <rect x={125.2} y={38.5} width={1.6} height={1.8} fill={PAPER} />
      </g>
      <g className="a-pop" style={d(3.8)}>
        <circle cx={272} cy={43} r={9} fill={OK} />
        <Check x={267.5} y={43.5} cor={PAPER} atraso={3.9} />
      </g>
    </Palco>
  );
}

/** Gerador de estimativas VIVO: itens somam num total que fica pronto. */
function DemoEstimativas() {
  const itens = [
    { y: 16, w: 70, cor: WINE },
    { y: 38, w: 48, cor: PINK },
    { y: 60, w: 84, cor: '#8f3a63' },
  ];
  return (
    <Palco rotulo="estimativas">
      {itens.map((it, i) => (
        <g key={it.y}>
          <rect x={14} y={it.y} width={28} height={5} fill={WINE} opacity={0.55} />
          <rect x={14} y={it.y + 9} width={96} height={9} fill={SOFT} />
          <rect className="a-grow" style={d(0.3 + i * 0.7)} x={14} y={it.y + 9} width={it.w} height={9} fill={it.cor} />
        </g>
      ))}
      <path className="a-pop" style={d(2.4)} d="M126 52 h24 m-7 -6 l7 6 l-7 6" fill="none" stroke={WINE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={162} y={14} width={126} height={80} fill={PAPER} stroke={SOFT} strokeWidth={1.5} />
      <rect x={162} y={14} width={126} height={4} fill={PINK} />
      <rect x={174} y={28} width={44} height={5} fill={WINE} opacity={0.75} />
      <rect x={174} y={40} width={104} height={14} fill={SOFT} />
      <rect className="a-grow" style={d(2.6)} x={174} y={40} width={36} height={14} fill={WINE} />
      <rect className="a-grow" style={d(3.0)} x={210} y={40} width={24} height={14} fill={PINK} />
      <rect className="a-grow" style={d(3.4)} x={234} y={40} width={42} height={14} fill="#8f3a63" />
      <rect x={174} y={62} width={70} height={3} fill={SOFT} />
      <g className="a-pop" style={d(4)}>
        <rect x={174} y={72} width={60} height={14} fill={OK} />
        <Check x={180} y={79.5} cor={PAPER} atraso={4.2} />
        <rect x={192} y={77} width={34} height={4} fill={PAPER} />
      </g>
    </Palco>
  );
}

/** Configuração SIGITM: trilhas marcadas uma a uma enquanto o assistente roda. */
function DemoSigitm() {
  const passos = [18, 42, 66, 90];
  return (
    <Palco rotulo="sigitm">
      {passos.map((y, i) => (
        <g key={y}>
          <circle cx={26} cy={y} r={9} fill="none" stroke={SOFT} strokeWidth={2} />
          <circle className="a-pop" style={d(0.8 + i * 1.1)} cx={26} cy={y} r={9} fill={OK} />
          <Check x={21.5} y={y + 0.5} cor={PAPER} atraso={0.9 + i * 1.1} />
          <rect x={44} y={y - 4} width={56 - i * 4} height={4} fill={WINE} opacity={0.7} />
          <rect x={44} y={y + 3} width={36} height={3} fill={SOFT} />
        </g>
      ))}
      <rect x={124} y={10} width={166} height={90} fill={WINE} />
      <circle cx={134} cy={19} r={2.5} fill={PINK} />
      <circle cx={142} cy={19} r={2.5} fill="#f3b5cb" opacity={0.7} />
      <circle cx={150} cy={19} r={2.5} fill="#f3b5cb" opacity={0.4} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={134} y={32 + i * 11} width={6} height={3} fill={PINK} />
          <rect className="a-grow" style={d(0.5 + i * 1.1)} x={144} y={32 + i * 11} width={[96, 72, 108, 60][i]} height={3} fill="#f3b5cb" opacity={0.85} />
        </g>
      ))}
      <rect x={134} y={86} width={146} height={5} fill="#ffffff22" />
      <rect className="a-grow a-lento" x={134} y={86} width={146} height={5} fill={PINK} />
    </Palco>
  );
}

const demos: Record<string, () => ReactNode> = {
  'gestao-de-horas': DemoHoras,
  'agendador-ferias': DemoFerias,
  'gerador-estimativas-vivo': DemoEstimativas,
  'configuracao-sigitm': DemoSigitm,
};

/** Ids das ferramentas que têm demonstração animada. */
export const idsComDemo = Object.keys(demos);

export function Demo({ id }: { id: string }) {
  const Componente = demos[id];
  if (!Componente) return null;
  return (
    <div className="demo" aria-hidden>
      <Componente />
    </div>
  );
}
