# Finekot Backend — Setup Guide

No Composer, no external libraries. Plain PHP + PDO + a raw-socket SMTP mailer.

## 1. Folder placement (Hostinger)

Upload the whole `backend/` folder to your hosting, e.g.:

```
public_html/backend/
```

So your API will live at:
- `https://finekotindustries.com/backend/api/gallery.php`
- `https://finekotindustries.com/backend/api/contact.php`
- `https://finekotindustries.com/backend/admin/login.php`

## 2. Database

1. Create a MySQL database + user in hPanel.
2. Import `schema.sql` (phpMyAdmin → Import, or `mysql -u user -p dbname < schema.sql`).
3. Edit the seeded group names in `schema.sql` / or just rename them later from the admin panel — they should roughly match your `gallery.js` groups (Manufacturing Facility, Production Process, etc.) but this isn't strict, you fully control them from the admin panel.

## 3. Fill in `config.php`

```php
DB_NAME, DB_USER, DB_PASS        -> from hPanel database screen
SMTP_HOST, SMTP_PORT, SMTP_SECURE,
SMTP_USERNAME, SMTP_PASSWORD     -> your mailbox credentials (e.g. Hostinger email or Gmail App Password)
CLIENT_TO_EMAIL                  -> where enquiry form submissions should be delivered
UPLOAD_URL_BASE                  -> public URL path to uploads/gallery/, e.g. '/backend/uploads/gallery/'
SITE_ORIGIN                      -> your live frontend domain, e.g. 'https://finekotindustries.com'
ADMIN_USERNAME / ADMIN_PASSWORD_HASH
```

To generate a new admin password hash, run this once locally:
```php
<?php echo password_hash('YourNewPassword123', PASSWORD_DEFAULT);
```
Paste the output into `ADMIN_PASSWORD_HASH` in config.php, then delete any plaintext password from the file.

### SMTP notes
- **Hostinger email**: host is usually `smtp.hostinger.com`, port `587`, secure `tls`.
- **Gmail**: host `smtp.gmail.com`, port `587`, secure `tls` — you MUST use a 16-character **App Password**, not your normal Gmail password (requires 2FA enabled on the Google account).
- Test it once by submitting the contact form after deployment — check `error_log` in hPanel if it fails, the exact SMTP rejection reason gets logged there.

## 4. Set folder permissions

```
chmod 755 backend/uploads/gallery
```
The `.htaccess` inside that folder already blocks any script execution — this is a safety layer in case someone uploads a disguised PHP file.

## 5. Admin panel

Visit: `https://finekotindustries.com/backend/admin/login.php`

Default login (CHANGE THIS FIRST):
- Username: `admin`
- Password: `ChangeThis@123`

From there you can add/delete groups and upload/delete gallery images — no code changes needed for routine gallery updates.

## 6. Wire up the React frontend

### Gallery — replace the static import

Instead of importing `gallery` from `../data/content`, fetch it:

```jsx
import { useEffect, useState } from "react";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("https://finekotindustries.com/backend/api/gallery.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setGallery(data.gallery);
      })
      .catch((err) => console.error("Gallery load failed:", err));
  }, []);

  // ...rest of component stays exactly the same, it already maps over `gallery`
}
```

### Contact form — point `EnquiryForm` at the API

Wherever `EnquiryForm` currently submits (fetch/axios call), point it to:

```
POST https://finekotindustries.com/backend/api/contact.php
Content-Type: application/json  (or normal form POST — both work)

{
  "name": "...",
  "email": "...",
  "phone": "...",
  "company": "...",
  "requirement": "..."
}
```

**Important:** `contact.php` currently expects these exact field names:
`name`, `email`, `phone`, `company` (optional), `requirement`.

If your `EnquiryForm.jsx` uses different field names (e.g. `message` instead of
`requirement`, or `fullName` instead of `name`), either:
- rename the fields in your form to match, **or**
- send me the actual `EnquiryForm.jsx` and I'll adjust `contact.php` to match exactly.

The response is always JSON: `{ "success": true/false, "message": "..." }` — show that
message in your form's success/error state.

## 7. Security checklist before going live

- [ ] Change `ADMIN_PASSWORD_HASH` to a real password
- [ ] Set `SITE_ORIGIN` to your exact domain (not `*`)
- [ ] Set `display_errors` stays `'0'` in production (already default in config.php)
- [ ] Confirm `uploads/gallery/.htaccess` uploaded correctly (test by trying to visit a `.php` file inside that folder — should be blocked)
- [ ] Delete `schema.sql` from the public server after import, or move it outside `public_html`
