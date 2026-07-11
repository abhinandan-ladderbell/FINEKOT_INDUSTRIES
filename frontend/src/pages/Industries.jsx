import { Link } from "react-router-dom";
import {
  Factory,
  Sun,
  Tractor,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { industries } from "../data/content";
import SectionHeading from "../components/SectionHeading";

const icons = [
  Sun,
  Tractor,
  Building2,
  Factory,
  Factory,
  Sun,
  Tractor,
  Building2,
];

export default function Industries() {
  return (
    <>
      {/* HERO */}
     <section
  className="relative overflow-hidden"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=70')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40"></div>

  {/* Content */}
  <div className="relative z-10 mx-auto flex h-[280px] sm:h-[320px] lg:h-[460px] max-w-7xl items-center px-6">
    <div>
      <span className="inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
        Industries Served
      </span>

      <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
        Steel Solutions
        <br />
        <span className="text-yellow-400">
          Across Every Industry
        </span>
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg">
        Finekot manufactures heavy-duty steel structures for solar,
        agriculture, industrial, infrastructure, and custom engineering
        projects throughout India.
      </p>

      <Link
        to="/contact"
        className="mt-8 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-7 py-3.5 font-semibold text-black shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl"
      >
        Request a Quote
        <ArrowRight size={18} />
      </Link>
    </div>
  </div>
</section>

      {/* INDUSTRIES */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Applications"
            title="Industries We Serve"
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {industries.map((item, index) => {
              const Icon = icons[index % icons.length];

              return (
                <div
                  key={item.name}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400 hover:shadow-2xl"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black transition duration-300 group-hover:rotate-6">
                      <Icon size={30} />
                    </div>

                    <span className="text-5xl font-black text-gray-100 transition group-hover:text-yellow-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-slate-900 transition group-hover:text-yellow-600">
                    {item.name}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    {item.text}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-semibold text-yellow-600">
                    <CheckCircle2 size={18} />
                    Trusted Solution
                  </div>

                
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#08111E] py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-yellow-500/20 bg-gradient-to-r from-[#101C2D] via-[#16243A] to-[#101C2D] px-10 py-20 text-center shadow-[0_25px_80px_rgba(0,0,0,.35)]">
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Custom Fabrication
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Can't Find Your Industry?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Every project has unique engineering requirements. Our experienced
            fabrication team designs and manufactures customized steel
            structures according to your drawings, load calculations and
            specifications.
          </p>

          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-yellow-500 px-10 py-4 font-semibold text-black transition hover:scale-105"
          >
            Discuss Your Requirement
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}