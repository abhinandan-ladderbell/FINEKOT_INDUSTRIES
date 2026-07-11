import { useState } from 'react'
import { products, company } from '../data/content'

const initial = {
  fullName: '',
  companyName: '',
  mobile: '',
  email: '',
  city: '',
  product: '',
  details: '',
  file: null,
  website: '', // honeypot - stays empty, bots tend to fill every field
}

// Point this at your deployed backend
const ENQUIRY_API_URL = 'https://finekotindustries.com/backend/api/contact.php'

export default function EnquiryForm() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const update = (e) => {
    const { name, value, files } = e.target
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const fd = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== '') fd.append(key, value)
      })

      const res = await fetch(ENQUIRY_API_URL, {
        method: 'POST',
        body: fd,
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.message || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }

      setSent(true)
    } catch (err) {
      console.error('Enquiry submit failed:', err)
      setError('Could not reach the server. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="bg-white border border-sun p-8 text-center">
        <p className="font-display font-bold uppercase text-2xl text-ink">Enquiry Received</p>
        <p className="mt-2 text-steel">
          Thank you, {form.fullName || 'friend'}. Our team will contact you shortly on{' '}
          {form.mobile || 'your number'}. For urgent requirements call{' '}
          <a className="text-sunDark font-medium" href={`tel:+91${company.phones[0]}`}>
            +91 {company.phones[0]}
          </a>.
        </p>
        <button className="btn-line-dark mt-6" onClick={() => { setForm(initial); setSent(false) }}>
          Send Another Enquiry
        </button>
      </div>
    )
  }

  const field =
    'w-full border border-steel/25 bg-white px-4 py-3 text-sm focus:outline-none focus:border-sun'

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot - hidden from real users, bots fill it in */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={update}
        tabIndex="-1"
        autoComplete="off"
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
        aria-hidden="true"
      />

      {error && (
        <div className="sm:col-span-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <div>
        <label className="eyebrow-dark block mb-1.5" htmlFor="fullName">Full Name *</label>
        <input id="fullName" name="fullName" required value={form.fullName} onChange={update} className={field} placeholder="Your name" />
      </div>
      <div>
        <label className="eyebrow-dark block mb-1.5" htmlFor="companyName">Company Name</label>
        <input id="companyName" name="companyName" value={form.companyName} onChange={update} className={field} placeholder="Company / organisation" />
      </div>
      <div>
        <label className="eyebrow-dark block mb-1.5" htmlFor="mobile">Mobile Number *</label>
        <input id="mobile" name="mobile" required type="tel" pattern="[0-9+ -]{10,15}" value={form.mobile} onChange={update} className={field} placeholder="10-digit mobile" />
      </div>
      <div>
        <label className="eyebrow-dark block mb-1.5" htmlFor="email">Email Address *</label>
        <input id="email" name="email" required type="email" value={form.email} onChange={update} className={field} placeholder="you@example.com" />
      </div>
      <div>
        <label className="eyebrow-dark block mb-1.5" htmlFor="city">City / State</label>
        <input id="city" name="city" value={form.city} onChange={update} className={field} placeholder="e.g. Chh. Sambhajinagar, MH" />
      </div>
      <div>
        <label className="eyebrow-dark block mb-1.5" htmlFor="product">Product / Service Interested In</label>
        <select id="product" name="product" value={form.product} onChange={update} className={field}>
          <option value="">Select a product…</option>
          {products.map((p) => (
            <option key={p.slug} value={p.name}>{p.name}</option>
          ))}
          <option value="Other">Other / General Enquiry</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="eyebrow-dark block mb-1.5" htmlFor="details">Requirement Details *</label>
        <textarea id="details" name="details" required rows="4" value={form.details} onChange={update} className={field} placeholder="Site location, capacity (kW), quantity, timeline…" />
      </div>
      <div className="sm:col-span-2">
        <label className="eyebrow-dark block mb-1.5" htmlFor="file">Attachment (Drawing / Spec / Image / PDF)</label>
        <input id="file" name="file" type="file" onChange={update} accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf,.xlsx,.doc,.docx" className="w-full text-sm text-steel file:mr-4 file:border-0 file:bg-ink file:text-paper file:font-mono file:text-xs file:uppercase file:tracking-widest file:px-4 file:py-2.5 file:cursor-pointer" />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={submitting} className="btn-solid w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
          {submitting ? 'Sending…' : 'Submit Enquiry'}
        </button>
      </div>
    </form>
  )
}
