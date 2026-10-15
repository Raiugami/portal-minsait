import { ArrowUpRight, Home, Menu, Search, X } from 'lucide-react';
import { useMemo, useState, type PointerEvent } from 'react';
import { Demo } from './demos';
import { iconeDa } from './icons';
import { buscarFerramentas, tools, type Tool } from './tools';

function Card({ tool, ordem }: { tool: Tool; ordem: number }) {
  const Icone = iconeDa(tool.icone);
  const ativo = tool.status === 'disponivel';
  const corpo = (
    <>
      <div className="card-top">
        <span className="card-icon"><Icone size={22} aria-hidden /></span>
        <span className={`badge ${ativo ? 'ok' : 'soon'}`}>{ativo ? 'Disponível' : 'Em breve'}</span>
      </div>
      <h3>{tool.nome}</h3>
      <p>{tool.descricao}</p>
      <Demo id={tool.id} />
      {ativo && <span className="card-cta">Abrir ferramenta <ArrowUpRight size={16} aria-hidden /></span>}
    </>
  );
  /** Holofote que acompanha o ponteiro (só altera variáveis CSS; desligado com movimento reduzido). */
  const seguir = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return ativo ? (
    <a className="card" style={{ ['--i' as string]: ordem }} onPointerMove={seguir} href={tool.url} target="_blank" rel="noopener noreferrer">{corpo}</a>
  ) : (
    <div className="card card-off" style={{ ['--i' as string]: ordem }} aria-disabled="true">{corpo}</div>
  );
}

export function App() {
  const [busca, setBusca] = useState('');
  const [menu, setMenu] = useState(false);
  const lista = useMemo(() => buscarFerramentas(tools, busca), [busca]);

  return (
    <div className="shell">
      <aside className={`sidebar ${menu ? 'open' : ''}`}>
        <img className="side-logo" src="./brand/minsait-logo.svg" alt="Minsait" />
        <nav aria-label="Principal">
          <a className="nav-item active" href="#inicio" onClick={() => setMenu(false)}>
            <Home size={18} aria-hidden /> Início
          </a>
          <p className="nav-label">Ferramentas</p>
          {tools.map((t) => {
            const Icone = iconeDa(t.icone);
            return t.status === 'disponivel' ? (
              <a key={t.id} className="nav-item" href={t.url} target="_blank" rel="noopener noreferrer">
                <Icone size={18} aria-hidden /> {t.nome} <ArrowUpRight size={14} className="nav-ext" aria-hidden />
              </a>
            ) : (
              <span key={t.id} className="nav-item nav-off"><Icone size={18} aria-hidden /> {t.nome}</span>
            );
          })}
        </nav>
        <p className="side-foot">Processamento local no navegador. Nenhum dado sai do seu computador.</p>
      </aside>
      {menu && <button className="scrim" aria-label="Fechar menu" onClick={() => setMenu(false)} />}

      <div className="content">
        <header className="mobilebar">
          <button className="icon-btn" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenu(!menu)}>
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
          <img src="./brand/minsait-logo-dark.svg" alt="Minsait" height={16} />
        </header>
        <main id="inicio">
          <section className="hero">
            <svg className="hero-art" viewBox="0 0 220 160" aria-hidden focusable="false">
              <path className="hero-x hx1" d="M10 20 L90 70 L10 120" />
              <path className="hero-x hx2" d="M210 20 L130 70 L210 120" />
              <circle className="hero-dot hd1" cx="110" cy="30" r="4" />
              <circle className="hero-dot hd2" cx="60" cy="140" r="3" />
              <circle className="hero-dot hd3" cx="170" cy="130" r="5" />
            </svg>
            <p className="eyebrow">Operação Minsait</p>
            <h1>Portal de ferramentas</h1>
            <p className="hero-sub">Ferramentas de IA para facilitar o dia a dia da operação, reunidas num só lugar.</p>
          </section>

          <div className="section-head">
            <h2>Ferramentas</h2>
            <label className="search">
              <Search size={16} aria-hidden />
              <input
                type="search"
                placeholder="Buscar ferramenta"
                aria-label="Buscar ferramenta"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </label>
          </div>

          {lista.length ? (
            <div className="grid">{lista.map((t, i) => <Card key={t.id} tool={t} ordem={i} />)}</div>
          ) : (
            <p className="empty">Nenhuma ferramenta encontrada para “{busca}”.</p>
          )}
        </main>
      </div>
    </div>
  );
}
