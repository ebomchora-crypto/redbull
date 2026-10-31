import { ArrowRight, Droplets, Feather, Timer } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const FEATURES = [
  { icon: Timer, label: 'Pronta para agir quando você precisa.' },
  { icon: Feather, label: 'Leve, prática, sempre à mão.' },
  { icon: Droplets, label: 'Gelada no primeiro gole, até o último.' },
]

export default function Product() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section
      id="produto"
      ref={sectionRef}
      className="relative overflow-hidden bg-rb-black py-28 sm:py-40"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] max-h-[700px] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rb-red/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-8">
        <div
          data-reveal
          className="order-2 mx-auto w-full max-w-sm lg:order-1"
          style={{
            maskImage: 'radial-gradient(ellipse 70% 75% at 50% 50%, black 55%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 75% at 50% 50%, black 55%, transparent 100%)',
          }}
        >
          <img
            src="/images/can-product.jpg"
            alt="Lata de Red Bull com gotas de condensação, em frente ao touro"
            className="w-full rounded-[2rem] object-cover shadow-[0_40px_120px_-20px_rgba(227,27,53,0.35)]"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="order-1 lg:order-2">
          <div data-reveal className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-rb-red">
            Seção 03 — O produto
          </div>
          <h2 data-reveal className="text-4xl font-bold leading-[0.95] text-white sm:text-6xl">
            A LATA QUE
            <br />
            DESPERTA A FERA.
          </h2>
          <p data-reveal className="mt-8 max-w-md text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
            Mesma fórmula que acompanha quem busca o próximo limite: no esporte, no
            trabalho, no estudo ou na estrada. Sempre à altura do momento.
          </p>

          <ul className="mt-10 space-y-5">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li data-reveal key={label} className="flex items-center gap-4 text-white/85">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <Icon className="h-4 w-4 text-rb-red" />
                </span>
                <span className="text-sm sm:text-base">{label}</span>
              </li>
            ))}
          </ul>

          <a
            data-reveal
            href="https://www.redbull.com"
            target="_blank"
            rel="noreferrer"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-rb-red px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-rb-red-dark hover:shadow-[0_8px_30px_-6px_rgba(227,27,53,0.6)] active:scale-[0.98]"
          >
            Descubra Red Bull
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
