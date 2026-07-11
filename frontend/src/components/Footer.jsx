import { Link } from 'react-router-dom'
import { company, products } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-[#0B2343] text-mist">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link
            to="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <img
              src="/images/logo.png"
              alt="Finekot Industries"
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>
          <p className="text-sm leading-relaxed">{company.tagline}.</p>
          <p className="font-mono text-xs mt-4 text-steel">CIN: {company.cin}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Products</p>
          <ul className="space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to={`/products/${p.slug}`} className="hover:text-sun transition-colors">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-sun transition-colors">About Us</Link></li>
            <li><Link to="/industries" className="hover:text-sun transition-colors">Industries Served</Link></li>
            <li><Link to="/gallery" className="hover:text-sun transition-colors">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-sun transition-colors">Contact & Enquiry</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Contact</p>
          <ul className="space-y-3 text-sm">
            <li>{company.factoryAddress}</li>
            <li>
              <a href={`tel:+91${company.phones[0]}`} className="hover:text-sun">+91 {company.phones[0]}</a>
              {' / '}
              <a href={`tel:+91${company.phones[1]}`} className="hover:text-sun">+91 {company.phones[1]}</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-sun">{company.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-steel/30 px-6 py-4 text-center font-mono text-[11px] tracking-wider text-steel">
        © {new Date().getFullYear()} {company.name} · Est. {company.established} · All rights reserved
      </div>
    </footer>
  )
}
