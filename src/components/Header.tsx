import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Energia', href: '#energia' },
  { label: 'Produtos', href: '#produto' },
  { label: 'Descubra', href: '#explore' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? 'bg-rb-black/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.08)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#inicio" onClick={handleNavClick('#inicio')} aria-label="Red Bull — início" className="text-xl sm:text-2xl">
          <Logo />
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick(link.href)}
              className="text-sm font-semibold uppercase tracking-wider text-white/90 transition-colors hover:text-rb-red"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full p-2 text-white md:hidden"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`md:hidden ${menuOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden bg-rb-black/95 backdrop-blur-md transition-[max-height] duration-400 ease-in-out`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-8" aria-label="Navegação mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick(link.href)}
              className="border-b border-white/10 py-4 text-base font-semibold uppercase tracking-wider text-white/90 transition-colors hover:text-rb-red"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
