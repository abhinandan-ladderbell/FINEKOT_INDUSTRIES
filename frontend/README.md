# Finekot Industries — Website (React + Vite + Tailwind)

Multipage corporate website for **Finekot Industries India Pvt. Ltd.**
Pages: Home · About · Products (5 detail pages) · Industries · Gallery · Contact (enquiry form + map).

## Run locally
```bash
npm install
npm run dev
```

## Build for deployment
```bash
npm run build
```
Upload the contents of `dist/` to `public_html/` on Hostinger.
`public/.htaccess` is included so React Router routes (e.g. /products/solar-rooftop-structures) work on refresh.

## Where to edit content
Everything (company info, products, industries, gallery, certifications) lives in ONE file:
```
src/data/content.js
```
Change text or image URLs there — no need to touch components.

## Images
Currently using Unsplash stock URLs as placeholders. Replace with real factory/project
photos: put files in `public/images/` and change URLs in `src/data/content.js` to
`/images/your-photo.jpg`. If any URL fails, a neutral placeholder is shown automatically
(see `src/components/Img.jsx`).

## Enquiry form
`src/components/EnquiryForm.jsx` is front-end only right now (shows success message).
Wire the `handleSubmit` function to your PHP mailer / backend API / WhatsApp API before go-live.
File attachment field is ready (accepts PDF, images, DWG/DXF, Office files).

## Pending client inputs (marked in content)
- GST number (if to be displayed)
- Website domain
- Head office + branch addresses, exact Google Maps pin
- Completed projects / portfolio section (add once client shares details)
- ISO / MSME certificate scans
- Real gallery photos
