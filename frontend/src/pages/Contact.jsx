import { company } from '../data/content'
import SectionHeading from '../components/SectionHeading'
import EnquiryForm from '../components/EnquiryForm'

export default function Contact() {
  return (
    <>
      <section className="bg-ink grid-bg">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="eyebrow">Contact & Enquiry</p>
          <h1 className="h-display text-5xl sm:text-6xl text-paper mt-2">
            Let's Build <span className="text-sun">Your Project</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-[380px_1fr]">
        {/* contact info */}
        <aside className="space-y-8">
          <div>
            <p className="eyebrow-dark mb-3">Factory Address</p>
            <p className="text-steel leading-relaxed">{company.factoryAddress}</p>
          </div>
          <div>
            <p className="eyebrow-dark mb-3">Phone</p>
            {company.phones.map((ph) => (
              <p key={ph}>
                <a href={`tel:+91${ph}`} className="text-ink font-medium hover:text-sunDark">
                  +91 {ph}
                </a>
              </p>
            ))}
          </div>
          <div>
            <p className="eyebrow-dark mb-3">Email</p>
            <a href={`mailto:${company.email}`} className="text-ink font-medium hover:text-sunDark break-all">
              {company.email}
            </a>
          </div>
          <div>
            <p className="eyebrow-dark mb-3">Registration</p>
            <p className="font-mono text-xs text-steel">CIN: {company.cin}</p>
          </div>

          {/* map embed — replace src with the exact plot pin when available */}
          <div className="border border-steel/20">
            <iframe
              title="Finekot Industries — Paithan MIDC"
              src="https://maps.google.com/maps?q=Paithan%20MIDC%2C%20Paithan%2C%20Chhatrapati%20Sambhajinagar&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-64"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>

        {/* form */}
        <div>
          <SectionHeading eyebrow="Enquiry Form" title="Tell Us Your Requirement" />
          <EnquiryForm />
        </div>
      </section>
    </>
  )
}
