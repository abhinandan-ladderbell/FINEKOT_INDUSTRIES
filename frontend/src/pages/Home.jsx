import { Link } from 'react-router-dom'
import { company, about, whyChooseUs, products, strengths } from '../data/content'
import SectionHeading from '../components/SectionHeading'
import ProductCard from '../components/ProductCard'

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Wrench,
  Leaf,
  Zap,
} from "lucide-react";
export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=70",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
   <section className="relative overflow-hidden bg-[#f7f8fb]">

  
  {/* ============ MOBILE / TABLET LAYOUT (below lg) ============ */}
<div className="lg:hidden relative h-[60vh] overflow-hidden">

  {/* Background Image */}
  <img
    src={heroImages[currentImage]}
    alt="Solar Mounting Structures"
    className="absolute inset-0 h-full w-full object-cover scale-110 animate-[slowZoom_12s_ease-in-out_infinite]"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Content */}
  <div className="relative z-10 flex h-full flex-col justify-end items-center text-center px-6 sm:px-8 pb-12">

    {/* Badge */}
    <div className="hidden items-center gap-2 rounded-full bg-[#0B2343]/80 backdrop-blur-md px-5 py-2 shadow-lg">
      <ShieldCheck size={15} className="text-[#F59E0B]" />
      <span className="text-xs tracking-[0.25em] uppercase text-white font-semibold">
        EST. {company.established} • CHH. SAMBHAJINAGAR
      </span>
    </div>

    {/* Heading */}
    <h1 className="font-extrabold leading-[0.95] text-white">
      <span className="block text-[28px]">
        Solar Mounting
      </span>

      <span className="block mt-2 text-[38px] text-[#F59E0B]">
        Structures
      </span>

      <span className="block mt-2 text-[28px]">
        Built to Last.
      </span>
    </h1>

    <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E0B]" />

    {/* Buttons */}
    <div className="mt-8 flex flex-row justify-center gap-3 w-full">

      <Link
        to="/products"
        className="flex-1 max-w-[170px] rounded-full bg-[#F59E0B] py-3 text-center text-white font-semibold shadow-lg"
      >
        Explore Products →
      </Link>

      <Link
        to="/contact"
        className="flex-1 max-w-[170px] rounded-full border-2 border-white py-3 text-center font-semibold text-white hover:bg-[#F59E0B] hover:border-[#F59E0B] transition"
      >
        Get a Quote →
      </Link>

    </div>

  </div>
</div>
  {/* ============ DESKTOP LAYOUT (lg and above) — unchanged ============ */}
  <div className="hidden lg:block mx-auto max-w-[1600px]">
    <div className="grid lg:grid-cols-[38%_62%] items-stretch h-[620px] overflow-hidden">

      {/* LEFT */}
      <div className="relative z-30 flex flex-col justify-start h-full px-12 xl:px-8 py-[50px] text-left order-first">

        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0B2343]/80 backdrop-blur-md px-4 py-2 shadow-lg">
            <ShieldCheck size={15} className="text-[#F59E0B]" />
            <span className="text-xs tracking-[0.25em] uppercase text-white font-semibold">
              EST. {company.established} • CHH. SAMBHAJINAGAR
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-7 font-extrabold leading-[0.95]">
            <span className="block text-[#0B2343] text-[43px]">
              Solar Mounting
            </span>
            <span className="block mt-2 text-[#F59E0B] text-[62px]">
              Structures
            </span>
            <span className="block mt-2 text-[#0B2343] text-[62px]">
              Built to Last.
            </span>
          </h1>

          <div className="mt-6 h-1 w-16 rounded-full bg-[#F59E0B]" />

          <p className="mt-7 max-w-lg text-[14px] leading-8 text-gray-600">
            {company.tagline}. Manufacturer of solar mounting
            structures, agricultural pumping systems,
            fencing solutions and custom steel fabrication
            for residential, commercial, industrial
            and government projects across India.
          </p>

          <div className="mt-9 flex gap-4 justify-start">
            <Link
              to="/products"
              className="rounded-full bg-[#F59E0B] px-8 py-5 text-white font-semibold shadow-xl hover:shadow-2xl transition  text-[14px] hover:-translate-y-1"
            >
              Explore Products →
            </Link>

            <Link
              to="/contact"
              className="rounded-full border-2 border-[#F59E0B] px-8 py-4 font-semibold text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white transition"
            >
              Get a Quote →
            </Link>
          </div>

        </div>
      </div>

      {/* RIGHT */}
      <div className="relative order-last h-[760px] -mt-10 overflow-hidden">

        {/* Desktop White Shape */}
        <div
          className="absolute -left-1 top-0 h-full w-56 bg-[#f7f8fb] z-20"
          style={{
            clipPath: "polygon(0 0,100% 0,53% 50%,100% 100%,0 100%)",
            height: "101%",
          }}
        />

        {/* Hero Image */}
        <img
          src={heroImages[currentImage]}
          alt="Solar Mounting Structures"
          className="absolute inset-0 h-[101%] w-[101%] object-cover -bottom-1 -left-1 animate-[slowZoom_12s_ease-in-out_infinite]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2343]/10 via-transparent to-[#0B2343]/20" />

        {/* Floating Cards - Desktop Only */}
        <div className="absolute bottom-[110px] right-8 justify-end hidden xl:grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-xl flex gap-3 items-center">
            <ShieldCheck className="text-orange-500" />
            <div>
              <p className="font-bold text-[#0B2343]">High Quality</p>
              <p className="text-xs text-gray-500">Durable Materials</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xl flex gap-3 items-center">
            <Wrench className="text-blue-700" />
            <div>
              <p className="font-bold text-[#0B2343]">Precision Built</p>
              <p className="text-xs text-gray-500">Engineered to Last</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xl flex gap-3 items-center">
            <Leaf className="text-green-600" />
            <div>
              <p className="font-bold text-[#0B2343]">Eco Friendly</p>
              <p className="text-xs text-gray-500">Sustainable Future</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-xl flex gap-3 items-center">
            <Zap className="text-purple-600" />
            <div>
              <p className="font-bold text-[#0B2343]">Corrosion Resistant</p>
              <p className="text-xs text-gray-500">Long Service Life</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</section>
      {/* ── INTRO ────────────────────────────────────────── */}
      <section className="relative lg:mt-15 mt-5 z-30 bg-[#f7f8fb] overflow-hidden">

  <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <div className=" overflow-hidden rounded-2xl lg:rounded-[28px] bg-white shadow-xl lg:shadow-[0_20px_60px_rgba(0,0,0,0.10)]">

      <div className="grid lg:grid-cols-[42%_58%]">

        {/* LEFT */}

        <div className="relative bg-[#0B2343] overflow-hidden">

          {/* Background circles */}

          <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-[#F59E0B]/10" />

          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full border border-white/10" />

          <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-10 xl:px-12">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">

              <ShieldCheck
                size={14}
                className="text-[#F59E0B]"
              />

              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white font-semibold">

                About Finekot

              </span>

            </div>

            {/* Heading */}

            <h2 className="mt-5 font-black leading-tight text-white">

              <span className="block text-[30px] sm:text-[36px] lg:text-[34px]">
                Engineering
              </span>

              <span className="block text-[30px] sm:text-[36px] lg:text-[34px] text-[#F59E0B]">
                Structures
              </span>

              <span className="block text-[30px] sm:text-[36px] lg:text-[34px]">
                For Tomorrow
              </span>

            </h2>

            <div className="mt-5 h-1 w-14 rounded-full bg-[#F59E0B]" />

            {/* Paragraph */}

            <p className="mt-5 text-[15px] leading-7 text-white/80 lg:text-[14px] lg:leading-7">

              {about.intro[0]}

            </p>

            {/* Desktop second paragraph */}

            <p className="hidden lg:block mt-4 text-base leading-7 text-white/80 text-[14px]">

              {about.intro[2]}

            </p>
                        {/* Mobile Stats */}

            <div className="mt-7 grid grid-cols-2 gap-4 lg:hidden">

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">

                <h3 className="text-2xl font-bold text-[#F59E0B]">
                  05+
                </h3>

                <p className="mt-1 text-xs uppercase tracking-wider text-white/70">
                  Years Experience
                </p>

              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur">

                <h3 className="text-2xl font-bold text-[#F59E0B]">
                  PAN
                </h3>

                <p className="mt-1 text-xs uppercase tracking-wider text-white/70">
                  India Supply
                </p>

              </div>

            </div>

            {/* Desktop Stats */}

            <div className="hidden lg:grid mt-7 grid-cols-2 gap-4">

              <div>

                <h3 className="text-2xl font-black text-[#F59E0B]">
                  05+
                </h3>

                <p className="mt-1 text-sm text-white/70">
                  Years Experience
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-black text-[#F59E0B]">
                  PAN
                </h3>

                <p className="mt-1 text-sm text-white/70">
                  India Delivery
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-black text-[#F59E0B]">
                  1000+
                </h3>

                <p className="mt-1 text-sm text-white/70">
                  Structures Delivered
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-black text-[#F59E0B]">
                  HDG
                </h3>

                <p className="mt-1 text-sm text-white/70">
                  Premium Steel
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hidden lg:block  flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-10">

          <span className="inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#F59E0B]">
            Why Choose Finekot
          </span>

          <h3 className="mt-4 text-3xl sm:text-4xl lg:text-[34px] font-black leading-tight text-[#0B2343]">

            Structural Solutions
            <br />

            Built with
            <span className="text-[#F59E0B]">
              {" "}Engineering Precision
            </span>

          </h3>

          <div className="mt-5 h-1 w-16 rounded-full bg-[#F59E0B]" />

          <p className="mt-6 text-[15px] leading-7 text-gray-600 lg:text-[14px] lg:leading-7">

            {about.intro[0]}

          </p>

          <p className="hidden lg:block mt-4 text-[14px] leading-7 text-gray-600">

            {about.intro[2]}

          </p>
                    {/* Features */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="flex items-start gap-3 rounded-xl bg-[#f7f8fb] p-4 lg:p-3">

              <ShieldCheck
                size={22}
                className="mt-1 text-[#F59E0B]"
              />

              <div>

                <h4 className="font-semibold text-[#0B2343] lg:text-sm">
                  Premium Quality
                </h4>

                <p className="mt-1 text-sm lg:text-xs text-gray-500">
                  Manufactured using high-grade galvanized steel.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3 rounded-xl bg-[#f7f8fb] p-4 lg:p-3">

              <Wrench
                size={22}
                className="mt-1 text-[#F59E0B]"
              />

              <div>

                <h4 className="font-semibold text-[#0B2343] lg:text-sm">
                  Precision Engineering
                </h4>

                <p className="mt-1 text-sm lg:text-xs text-gray-500">
                  Designed for strength, accuracy and long service life.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3 rounded-xl bg-[#f7f8fb] p-4 lg:p-3">

              <Leaf
                size={22}
                className="mt-1 text-[#F59E0B]"
              />

              <div>

                <h4 className="font-semibold text-[#0B2343] lg:text-sm">
                  Sustainable Solutions
                </h4>

                <p className="mt-1 text-sm lg:text-xs text-gray-500">
                  Supporting India's clean energy future.
                </p>

              </div>

            </div>

            <div className="flex items-start gap-3 rounded-xl bg-[#f7f8fb] p-4 lg:p-3">

              <Zap
                size={22}
                className="mt-1 text-[#F59E0B]"
              />

              <div>

                <h4 className="font-semibold text-[#0B2343] lg:text-sm">
                  PAN India Supply
                </h4>

                <p className="mt-1 text-sm lg:text-xs text-gray-500">
                  Reliable delivery for projects across the country.
                </p>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex flex-col sm:flex-row gap-4">

            <Link
              to="/about"
              className="w-full sm:w-auto rounded-full bg-[#F59E0B] px-8 py-4 lg:px-6 lg:py-3 text-center font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl lg:text-sm"
            >
              Know More About Us
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto rounded-full border-2 border-[#F59E0B] px-8 py-4 lg:px-6 lg:py-3 text-center font-semibold text-[#F59E0B] transition hover:bg-[#F59E0B] hover:text-white lg:text-sm"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
      {/* ── PRODUCTS ─────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-white via-slate-50 to-white border-y border-steel/10 py-20 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-sun/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="relative mx-auto max-w-7xl px-6">

          <SectionHeading
            eyebrow="Our Products"
            title="What We Manufacture"
          />

          {/* Product Grid */}
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>

          {/* ======================= */}
          {/* Custom Fabrication Card */}
          {/* ======================= */}

         <Link
  to="/contact"
  className="group relative mt-16 block overflow-hidden rounded-2xl lg:rounded-[32px] bg-gradient-to-r from-[#0B1320] via-[#132238] to-[#1D3557] p-6 lg:p-14 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_70px_rgba(245,158,11,0.25)]"
>
  {/* Glow */}
  <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/20 blur-[100px] transition-all duration-500 group-hover:scale-125" />

  {/* Border */}
  <div className="absolute inset-0 rounded-2xl lg:rounded-[32px] border border-white/10 group-hover:border-amber-400/40 transition-all"></div>

  <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center">

    {/* Left */}
    <div>

      <span className="inline-flex items-center rounded-full bg-amber-400/15 px-4 py-1.5 lg:px-5 lg:py-2 text-[10px] lg:text-xs font-semibold uppercase tracking-[0.25em] lg:tracking-[0.35em] text-amber-400">
        Custom Fabrication
      </span>

      <h2 className="mt-4 lg:mt-6 text-2xl lg:text-[44px] font-bold text-white leading-tight">
        Need a Custom
        <span className="text-amber-400"> Steel Solution?</span>
      </h2>

      <p className="mt-3 lg:mt-6 max-w-3xl text-sm lg:text-lg leading-6 lg:leading-8 text-slate-300">
        Share your CAD drawing, dimensions, or project specifications.
        Our experienced engineering team will design and manufacture
        customized fabrication solutions exactly according to your
        project requirements.
      </p>

      <div className="mt-4 lg:mt-8 grid grid-cols-3 sm:grid-cols-3 gap-2 lg:gap-4">

        <div className="rounded-lg lg:rounded-xl border border-white/10 bg-white/5 backdrop-blur px-2 py-2 lg:px-5 lg:py-4">
          <p className="text-amber-400 text-sm lg:text-xl">✓</p>
          <p className="mt-1 lg:mt-2 text-white text-[11px] lg:text-base font-semibold leading-tight">
            Engineering Support
          </p>
        </div>

        <div className="rounded-lg lg:rounded-xl border border-white/10 bg-white/5 backdrop-blur px-2 py-2 lg:px-5 lg:py-4">
          <p className="text-amber-400 text-sm lg:text-xl">✓</p>
          <p className="mt-1 lg:mt-2 text-white text-[11px] lg:text-base font-semibold leading-tight">
            Fast Quotation
          </p>
        </div>

        <div className="rounded-lg lg:rounded-xl border border-white/10 bg-white/5 backdrop-blur px-2 py-2 lg:px-5 lg:py-4">
          <p className="text-amber-400 text-sm lg:text-xl">✓</p>
          <p className="mt-1 lg:mt-2 text-white text-[11px] lg:text-base font-semibold leading-tight">
            PAN India Delivery
          </p>
        </div>

      </div>

    </div>

    {/* Right */}

    <div className="flex flex-col items-center mt-5 lg:mt-0">

      <span className="w-full lg:w-auto text-center rounded-full bg-amber-400 px-6 py-3 lg:px-8 lg:py-4 text-sm lg:text-lg font-semibold text-[#0B1320] transition-all duration-300 group-hover:px-10">
        Send Enquiry →
      </span>

    </div>

  </div>
</Link>
        </div>
      </section>
      {/* ── WHY CHOOSE US ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-15 lg:py-20">
        <SectionHeading eyebrow="Why Finekot" title="Why Customers Choose Us" />
        <div className="grid gap-x-10 gap-y-1 md:grid-cols-2">
          {whyChooseUs.map((w) => (
            <div key={w.title} className="spec-row">
              <span className="mt-1 h-2 w-2 shrink-0 bg-sun" aria-hidden="true" />
              <p>
                <span className="font-semibold text-ink">{w.title}.</span> {w.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STRENGTHS (dark) ─────────────────────────────── */}
      <section className="bg-ink grid-bg">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading dark eyebrow="Key Differentiators" title="Company Strengths" />
          <div className="grid gap-px bg-steel/30 border border-steel/30 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => (
              <div key={s.title} className="bg-ink p-6">
                <p className="font-mono text-xs text-sun tracking-widest mb-2">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display font-bold uppercase text-lg text-paper leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="eyebrow-dark">Start Your Project</p>
        <h2 className="h-display text-4xl sm:text-5xl mt-2 text-ink">
          From Drawing Board to Dispatch — On Time.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-steel">
          Send us your site details, load requirements or fabrication drawings and get a
          competitive quotation from our engineering team.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link to="/contact" className="btn-solid  rounded-xl">Get a Quote</Link>
          <a href={`tel:+91${company.phones[0]}`} className="btn-line-dark  rounded-xl">Call +91 {company.phones[0]}</a>
        </div>
      </section>
    </>
  )
}
