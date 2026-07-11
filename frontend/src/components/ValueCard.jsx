export default function ValueCard({ title, text, index }) {
  return (
    <div className="bg-white border border-steel/15 p-6 hover:border-sun transition-colors">
      <p className="font-mono text-xs text-sunDark tracking-widest mb-2">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="font-display font-bold uppercase text-xl text-ink leading-snug">{title}</h3>
      <p className="mt-2 text-sm text-steel leading-relaxed">{text}</p>
    </div>
  )
}
