import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { company } from '../data/content'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/industries', label: 'Industries' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `font-display uppercase tracking-wider text-lg px-1 py-1 border-b-2 transition-colors ${isActive
      ? 'text-sun border-sun'
      : 'text-paper border-transparent hover:text-sun'
    }`

  return (
    <header className="sticky top-0 z-50 bg-[#0B2343] backdrop-blur border-b border-steel/10">
      {/* top strip */}
      <div className="hidden md:flex justify-end gap-6 px-6 py-1 font-semibold border-b bg-white border-steel/20 font-mono text-[11px] text-ink tracking-wider">
        <a href={`mailto:${company.email}`} className=" hover:text-sun">{company.email}</a>
        <a href={`tel:+91${company.phones[0]}`} className="hover:text-sun">+91-{company.phones[0]}</a>
        <a href={`tel:+91${company.phones[1]}`} className="hover:text-sun">+91-{company.phones[1]}</a>
      </div>

      <div className="flex items-center  justify-between px-4 sm:px-6 h-20">
        <Link
          to="/"
          className="flex items-center -my-2 mx-20"
          onClick={() => setOpen(false)}
        >
          <img
            src="/images/logo.png"
            alt="Finekot Industries"
            className="h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-solid !text-base !px-5 !py-2">
            Get a Quote
          </Link>
        </nav>

        {/* hamburger */}
        <button
          className="lg:hidden text-paper p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="lg:hidden flex flex-col border-t border-steel/30 bg-ink px-6 pb-6 pt-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 font-display uppercase tracking-wider text-xl border-b border-steel/20 ${isActive ? 'text-sun' : 'text-paper'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-solid mt-5 text-center rounded-xl">
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  )
}
