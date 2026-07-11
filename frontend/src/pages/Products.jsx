import { products } from '../data/content'
import SectionHeading from '../components/SectionHeading'
import ProductCard from '../components/ProductCard'

export default function Products() {
  return (
    <>
       <section
  className="relative overflow-hidden"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1800&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
    <p className="eyebrow">Products</p>

    <h1 className="h-display mt-2 text-5xl sm:text-6xl text-white font-bold">
      Manufactured for
      <br />
      <span className="text-yellow-400">Strength & Service Life</span>
    </h1>

    <p className="mt-5 max-w-2xl text-gray-200 leading-relaxed">
      Five product lines, one standard of quality — Hot Dip Galvanized
      construction, in-house engineering, and inspection at every checkpoint.
    </p>
  </div>
</section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}
