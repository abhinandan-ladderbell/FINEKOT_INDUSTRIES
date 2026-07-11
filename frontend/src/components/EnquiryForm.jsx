import { useState, useEffect } from 'react'

const initial = {
  fullName: '',
  companyName: '',
  mobile: '',
  email: '',
  city: '',
  product: '',
  details: '',
  file: null,
}

const ENQUIRY_API_URL = 'http://localhost/backend/api/contact.php'
// const ENQUIRY_API_URL = 'https://finekotindustries.com/backend/api/contact.php'

const PRODUCTS_API_URL = 'http://localhost/backend/api/products.php'
// const PRODUCTS_API_URL = 'https://finekotindustries.com/backend/api/products.php'

export default function EnquiryForm() {
  const [form, setForm] = useState(initial)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null) // { type: 'success' | 'error', message: string }
  const [fileKey, setFileKey] = useState(0) // used to force-clear the file input on reset
  const [products, setProducts] = useState([]) // fetched from admin-managed list

  // Load the product dropdown options from the backend (managed in admin/products.php)
  useEffect(() => {
    let cancelled = false
    fetch(PRODUCTS_API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.success) setProducts(data.products || [])
      })
      .catch(() => {
        // If the products API is unreachable, the dropdown just falls back
        // to showing only "Other / General Enquiry" below — form still works.
      })
    return () => { cancelled = true }
  }, [])

  // Auto-hide the popup after a few seconds
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(t)
  }, [toast])

  const update = (e) => {
    const { name, value, files } = e.target
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }))
  }

  const resetForm = () => {
    setForm(initial)
    setFileKey((k) => k + 1) // remounts the file input so its displayed filename clears too
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const fd = new FormData()
      fd.append('fullName', form.fullName)
      fd.append('companyName', form.companyName)
      fd.append('mobile', form.mobile)
      fd.append('email', form.email)
      fd.append('city', form.city)
      fd.append('product', form.product)
      fd.append('details', form.details)
      if (form.file) fd.append('file', form.file)

      const res = await fetch(ENQUIRY_API_URL, {
        method: 'POST',
        body: fd,
      })

      let data
      try {
        data = await res.json()
      } catch {
        throw new Error('Server returned an unexpected response. Please try again.')
      }

      if (!data.success) {
        setError(data.message || 'Something went wrong. Please check the form and try again.')
        setToast({ type: 'error', message: data.message || 'Enquiry could not be sent.' })
        return
      }

      setToast({ type: 'success', message: data.message || 'Enquiry sent successfully!' })
      resetForm()
    } catch (err) {
      const msg = err.message === 'Failed to fetch'
        ? 'Could not reach the server. Please check your connection and try again.'
        : err.message

      setError(msg)
      setToast({ type: 'error', message: msg })
    } finally {
      setSubmitting(false)
    }
  }

  const field =
    'w-full border border-steel/25 bg-white px-4 py-3 text-sm focus:outline-none focus:border-sun disabled:opacity-60 disabled:cursor-not-allowed'

  return (
    <div className="relative">

      {/* Toast / Popup */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 max-w-sm rounded-lg shadow-xl px-5 py-4 text-sm font-medium border
            ${toast.type === 'success'
              ? 'bg-green-50 border-green-300 text-green-800'
              : 'bg-red-50 border-red-300 text-red-800'}`}
          role="alert"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5">
              {toast.type === 'success' ? '✓' : '⚠'}
            </span>
            <div className="flex-1">
              {toast.message}
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-current opacity-60 hover:opacity-100 ml-2"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">

        {error && (
          <div className="sm:col-span-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="eyebrow-dark block mb-1.5" htmlFor="fullName">Full Name *</label>
          <input id="fullName" name="fullName" required disabled={submitting} value={form.fullName} onChange={update} className={field} placeholder="Your name" />
        </div>
        <div>
          <label className="eyebrow-dark block mb-1.5" htmlFor="companyName">Company Name</label>
          <input id="companyName" name="companyName" disabled={submitting} value={form.companyName} onChange={update} className={field} placeholder="Company / organisation" />
        </div>
        <div>
          <label className="eyebrow-dark block mb-1.5" htmlFor="mobile">Mobile Number *</label>
          <input id="mobile" name="mobile" required type="tel" pattern="[0-9+ -]{10,15}" disabled={submitting} value={form.mobile} onChange={update} className={field} placeholder="10-digit mobile" />
        </div>
        <div>
          <label className="eyebrow-dark block mb-1.5" htmlFor="email">Email Address *</label>
          <input id="email" name="email" required type="email" disabled={submitting} value={form.email} onChange={update} className={field} placeholder="you@example.com" />
        </div>
        <div>
          <label className="eyebrow-dark block mb-1.5" htmlFor="city">City / State</label>
          <input id="city" name="city" disabled={submitting} value={form.city} onChange={update} className={field} placeholder="e.g. Chh. Sambhajinagar, MH" />
        </div>
        <div>
          <label className="eyebrow-dark block mb-1.5" htmlFor="product">Product / Service Interested In</label>
          <select id="product" name="product" disabled={submitting} value={form.product} onChange={update} className={field}>
            <option value="">Select a product…</option>
            {products.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
            <option value="Other">Other / General Enquiry</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="eyebrow-dark block mb-1.5" htmlFor="details">Requirement Details *</label>
          <textarea id="details" name="details" required rows="4" disabled={submitting} value={form.details} onChange={update} className={field} placeholder="Site location, capacity (kW), quantity, timeline…" />
        </div>
        <div className="sm:col-span-2">
          <label className="eyebrow-dark block mb-1.5" htmlFor="file">Attachment (Drawing / Spec / Image / PDF)</label>
          <input
            key={fileKey}
            id="file"
            name="file"
            type="file"
            disabled={submitting}
            onChange={update}
            accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf,.xlsx,.doc,.docx"
            className="w-full text-sm text-steel file:mr-4 file:border-0 file:bg-ink file:text-paper file:font-mono file:text-xs file:uppercase file:tracking-widest file:px-4 file:py-2.5 file:cursor-pointer disabled:opacity-60"
          />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="btn-solid w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting && (
              <span
                className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
            )}
            {submitting ? 'Sending…' : 'Submit Enquiry'}
          </button>
        </div>
      </form>
    </div>
  )
}