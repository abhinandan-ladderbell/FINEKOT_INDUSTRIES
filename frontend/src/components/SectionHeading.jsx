export default function SectionHeading({ eyebrow, title, dark = false, className = '' }) {
  return (
    <div className={`mb-10 ${className}`}>
      <p className={dark ? 'eyebrow' : 'eyebrow-dark'}>{eyebrow}</p>
      <h2 className={`h-display text-4xl sm:text-5xl mt-2 ${dark ? 'text-paper' : 'text-ink'}`}>
        {title}
      </h2>
      <div className="mt-4 h-[3px] w-16 bg-sun" />
    </div>
  )
}
