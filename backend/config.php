
<?php
/**
 * Finekot Backend — Central Config
 */

// ---------------- DATABASE ----------------
// define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
// define('DB_NAME', 'finekot_db');
// define('DB_USER', 'root');
// define('DB_PASS', '');
// define('DB_CHARSET', 'utf8mb4');

// ---------------- SMTP (Mailtrap testing) ----------------
// define('SMTP_HOST', 'sandbox.smtp.mailtrap.io');
// define('SMTP_PORT', 2525);
// define('SMTP_SECURE', 'tls');
// define('SMTP_USERNAME', '5b2df13f6520e9');
// define('SMTP_PASSWORD', 'f761f1ad7cad4b');
// define('SMTP_FROM_EMAIL', 'noreply@finekotindustries.com');
// define('SMTP_FROM_NAME', 'Finekot Industries Website');

// Mailtrap ignores this — sab uske apne inbox mein capture ho jata hai
// define('CLIENT_TO_EMAIL', 'gurpreetsingh.b1203@gmail.com');

// ---------------- ADMIN PANEL LOGIN ----------------
// define('ADMIN_USERNAME', 'admin');
// define('ADMIN_PASSWORD_HASH', password_hash('admin', PASSWORD_DEFAULT));

// ---------------- MISC ----------------
// define('UPLOAD_DIR', __DIR__ . '/uploads/gallery/');
// define('UPLOAD_URL_BASE', '/backend/uploads/gallery/');
// define('MAX_UPLOAD_MB', 5);
// define('SITE_ORIGIN', '*');

// date_default_timezone_set('Asia/Kolkata');

// Local testing ke liye ON rakho taaki errors screen pe dikhein
// ini_set('display_errors', '1');
// error_reporting(E_ALL);




/**
 * Finekot Backend — Central Config
 */

// ---------------- DATABASE ----------------
define('DB_HOST',  'localhost');
define('DB_NAME', 'u838008403_finekot');
define('DB_USER', 'u838008403_finekot_user');
define('DB_PASS', 'Finekot@123');
define('DB_CHARSET', 'utf8mb4');

// ---------------- SMTP (Mailtrap testing) ----------------
define('SMTP_HOST', 'sandbox.smtp.mailtrap.io');
define('SMTP_PORT', 2525);
define('SMTP_SECURE', 'tls');
define('SMTP_USERNAME', '5b2df13f6520e9');
define('SMTP_PASSWORD', 'f761f1ad7cad4b');
define('SMTP_FROM_EMAIL', 'noreply@finekotindustries.com');
define('SMTP_FROM_NAME', 'Finekot Industries Website');

// Mailtrap ignores this — sab uske apne inbox mein capture ho jata hai
define('CLIENT_TO_EMAIL', 'gurpreetsingh.b1203@gmail.com');

// ---------------- ADMIN PANEL LOGIN ----------------
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD_HASH', password_hash('admin', PASSWORD_DEFAULT));

// ---------------- MISC ----------------
// IMPORTANT: this must be an ABSOLUTE URL (with domain), not a relative path.
// The React frontend runs on a different origin (e.g. Vite on localhost:5173)
// than this backend (e.g. localhost/backend), so a relative path like
// '/backend/uploads/gallery/' resolves against the FRONTEND's origin in the
// browser and the images 404. Always include the scheme + host.
define('BACKEND_BASE_URL', getenv('BACKEND_BASE_URL') ?: 'https://finekotindustries.com/backend');
// Change BACKEND_BASE_URL above to 'https://finekotindustries.com/backend' on Hostinger.

define('UPLOAD_DIR', __DIR__ . '/uploads/gallery/');
define('UPLOAD_URL_BASE', BACKEND_BASE_URL . '/uploads/gallery/');

define('ENQUIRY_UPLOAD_DIR', __DIR__ . '/uploads/enquiries/');
define('ENQUIRY_UPLOAD_URL_BASE', BACKEND_BASE_URL . '/uploads/enquiries/');

define('MAX_UPLOAD_MB', 5);
define('SITE_ORIGIN', '*');

date_default_timezone_set('Asia/Kolkata');

// Local testing ke liye ON rakho taaki errors screen pe dikhein
ini_set('display_errors', '1');
error_reporting(E_ALL);