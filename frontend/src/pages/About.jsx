import { company, about, coreValues, certifications } from '../data/content'
import SectionHeading from '../components/SectionHeading'
import ValueCard from '../components/ValueCard'

export default function About() {
  return (
    <>
      {/* page header */}
    <section
  className="relative overflow-hidden"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=70')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40"></div>

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
    <p className="eyebrow text-yellow-400">About Us</p>

    <h1 className="mt-2 text-5xl font-bold leading-tight text-white sm:text-6xl">
      The Company Behind
      <br />
      the <span className="text-yellow-400">Structures</span>
    </h1>

    <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
      Finekot is committed to delivering precision-engineered steel
      fabrication and solar mounting solutions with a focus on quality,
      durability, and innovation for projects across India.
    </p>
  </div>
</section>
      {/* intro + facts */}
      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5 text-steel leading-relaxed text-[17px]">
          {about.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* datasheet card */}
        <aside className="bg-white border border-steel/20 p-6 h-fit">
          <p className="eyebrow-dark mb-4">Company Datasheet</p>
          <dl className="space-y-3 text-sm">
            {[
              ['Company', company.name],
              ['Established', company.established],
              ['Directors', company.directors.join(', ')],
              ['CIN', company.cin],
              ['Factory', company.factoryAddress],
              ['Email', company.email],
              ['Phone', company.phones.map((p) => `+91 ${p}`).join(' / ')],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-steel/15 pb-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-mist">{k}</dt>
                <dd className="text-ink mt-0.5 break-words">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* vision & mission */}
      <section className="bg-white border-y border-steel/15">
        <div className="mx-auto max-w-7xl px-6 py-16 grid gap-8 md:grid-cols-2">
          <div className="border-l-4 border-sun pl-6">
            <p className="eyebrow-dark">Our Vision</p>
            <p className="mt-3 font-display font-bold uppercase text-3xl text-ink leading-snug">
              {about.vision}
            </p>
          </div>
          <div className="border-l-4 border-panel pl-6">
            <p className="eyebrow-dark">Our Mission</p>
            <p className="mt-3 font-display font-bold uppercase text-3xl text-ink leading-snug">
              {about.mission}
            </p>
          </div>
        </div>
      </section>

      {/* core values */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="What Drives Us" title="Core Values" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((v, i) => (
            <ValueCard key={v.title} title={v.title} text={v.text} index={i} />
          ))}
        </div>
      </section>

      {/* certifications */}
      <section className="bg-ink grid-bg">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeading dark eyebrow="Compliance" title="Certifications & Recognition" />
          <div className="grid gap-px bg-steel/30 border border-steel/30 sm:grid-cols-3">
            {certifications.map((c) => (
              <div key={c} className="bg-ink p-6 flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F29E0D" strokeWidth="2" aria-hidden="true">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <p className="text-paper font-display uppercase tracking-wide text-lg">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
