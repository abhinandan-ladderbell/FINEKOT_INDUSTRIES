import { useParams, Link, Navigate } from 'react-router-dom'
import { products, company } from '../data/content'
import Img from '../components/Img'

function SpecList({ title, items }) {
  if (!items?.length) return null
  return (
    <div>
      <p className="eyebrow-dark mb-3">{title}</p>
      <ul>
        {items.map((f) => (
          <li key={f} className="spec-row">
            <span className="mt-1 h-2 w-2 shrink-0 bg-sun" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  if (!product) return <Navigate to="/products" replace />

  const idx = products.findIndex((p) => p.slug === slug)
  const next = products[(idx + 1) % products.length]

  return (
    <>
      {/* header */}
      <section className="bg-ink grid-bg">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="font-mono text-xs tracking-widest text-sun uppercase">
            <Link to="/products" className="hover:underline">Products</Link> / {product.code}
          </p>
          <h1 className="h-display text-4xl sm:text-6xl text-paper mt-2">{product.name}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 grid gap-10 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="eyebrow-dark mb-3">Overview</p>
          <p className="text-steel leading-relaxed text-[17px]">{product.overview}</p>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <SpecList title={product.slug === 'custom-fabrication' ? 'Fabrication Capabilities' : 'Features'} items={product.features} />
            <div className="space-y-10">
              <SpecList title={product.slug === 'custom-fabrication' ? 'Industries Served' : 'Applications'} items={product.applications} />
              <SpecList title="Benefits" items={product.benefits} />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <Img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover border border-steel/20"
          />
          <div className="bg-ink grid-bg p-6">
            <p className="eyebrow mb-2">Request a Quotation</p>
            <p className="text-mist text-sm leading-relaxed">
              Share site details, capacity and drawings — get a competitive quote for{' '}
              <span className="text-paper">{product.name}</span>.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Link to="/contact" className="btn-solid text-center">Send Enquiry</Link>
              <a href={`tel:+91${company.phones[0]}`} className="btn-line text-center">
                Call +91 {company.phones[0]}
              </a>
            </div>
          </div>
          <Link
            to={`/products/${next.slug}`}
            className="block border border-steel/20 bg-white p-5 hover:border-sun transition-colors"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-mist">Next Product · {next.code}</p>
            <p className="font-display font-bold uppercase text-xl text-ink mt-1">{next.name} →</p>
          </Link>
        </aside>
      </section>
    </>
  )
}
