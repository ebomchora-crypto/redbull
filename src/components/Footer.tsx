import Logo from './Logo'
import type { SVGProps } from 'react'

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10 9.3v5.4l5-2.7-5-2.7z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M15 8.5h2V5h-2.3C12.6 5 11 6.6 11 8.8V11H9v3.5h2V21h3.5v-6.5H17l.5-3.5h-3V9.2c0-.4.3-.7.5-.7z" />
    </svg>
  )
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21H3.5l7-8L2 3h6.2l4.4 5.8L18.9 3zm-1.1 16h1.2L7.3 5H6l11.8 14z" />
    </svg>
  )
}

const INSTITUTIONAL = [
  { label: 'Sobre a Red Bull', href: 'https://www.redbull.com/int-en/about-us' },
  { label: 'Carreiras', href: 'https://jobs.redbull.com' },
  { label: 'Imprensa', href: 'https://www.redbull.com/int-en/newsroom' },
  { label: 'Sustentabilidade', href: 'https://www.redbull.com' },
]

const LEGAL = [
  { label: 'Termos de uso', href: 'https://www.redbull.com/int-en/terms-conditions' },
  { label: 'Privacidade', href: 'https://www.redbull.com/int-en/privacy-policy' },
  { label: 'Cookies', href: 'https://www.redbull.com/int-en/cookie-policy' },
]

const CURRENT_YEAR = new Date().getFullYear()

const SOCIALS = [
  { label: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/redbull' },
  { label: 'YouTube', icon: YoutubeIcon, href: 'https://www.youtube.com/redbull' },
  { label: 'Facebook', icon: FacebookIcon, href: 'https://www.facebook.com/redbull' },
  { label: 'X (Twitter)', icon: XIcon, href: 'https://twitter.com/redbull' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-rb-black">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-2xl">
              <Logo />
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Gives You Wiiings. A energia que transforma movimento em possibilidades.
            </p>
          </div>

          <nav aria-label="Links institucionais">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              Institucional
            </h4>
            <ul className="space-y-3">
              {INSTITUTIONAL.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-rb-red"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links legais">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-rb-red"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
              Redes sociais
            </h4>
            <div className="flex gap-3">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-rb-red hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} Red Bull. Todos os direitos reservados.</p>
          <p>Energy Drink — consuma com moderação.</p>
        </div>
      </div>
    </footer>
  )
}
