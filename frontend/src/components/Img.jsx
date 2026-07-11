import { useState } from 'react'

/**
 * Image with graceful fallback — if a URL fails to load,
 * a steel-grey placeholder with the alt text is shown instead.
 * Replace gallery/product URLs in src/data/content.js with real photos.
 */
export default function Img({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-ink text-mist font-mono text-xs tracking-widest uppercase ${className}`}>
        {alt}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
