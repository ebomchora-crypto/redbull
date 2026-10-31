import { Music2, Sparkles, Trophy } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const PILLARS = [
  {
    key: 'esportes',
    icon: Trophy,
    title: 'Esportes',
    copy: 'Do ar ao asfalto, do gelo à água. Onde o limite humano é só o começo.',
    from: 'from-rb-navy',
    to: 'to-rb-black',
  },
  {
    key: 'musica',
    icon: Music2,
    title: 'Música',
    copy: 'Palcos, batidas e cenas que movem multidões — e criam as próximas.',
    from: 'from-rb-red-dark',
    to: 'to-rb-black',
  },
  {
    key: 'cultura',
    icon: Sparkles,
    title: 'Cultura',
    copy: 'Arte, ideias e movimentos que redesenham o que vem a seguir.',
    from: 'from-rb-navy-light',
    to: 'to-rb-black',
  },
] as const

export default function Explore() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section id="explore" ref={sectionRef} className="relative bg-rb-black py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div data-reveal className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-rb-red">
          Seção 04 — Explore
        </div>
        <h2 data-reveal className="max-w-3xl text-4xl font-bold leading-[0.95] text-white sm:text-6xl">
          TRÊS MUNDOS. UMA ENERGIA.
        </h2>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PILLARS.map(({ key, icon: Icon, title, copy, from, to }, i) => (
            <article
              data-reveal
              data-reveal-delay={i * 0.12}
              key={key}
              className={`group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${from} ${to} p-8 ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-2 sm:min-h-[480px]`}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, rgba(227,27,53,0.35), transparent 60%)',
                }}
                aria-hidden="true"
              />

              <Icon
                className="absolute right-6 top-6 h-10 w-10 text-white/15 transition-colors duration-500 group-hover:text-rb-red/60"
                aria-hidden="true"
              />

              <span className="relative text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                0{i + 1}
              </span>
              <h3 className="relative mt-3 text-3xl font-bold uppercase text-white sm:text-4xl">
                {title}
              </h3>
              <p className="relative mt-4 max-w-xs text-sm leading-relaxed text-white/70">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
