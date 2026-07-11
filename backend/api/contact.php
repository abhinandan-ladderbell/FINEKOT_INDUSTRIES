<?php
/**
 * Finekot — Contact / Enquiry API
 * Receives the EnquiryForm submission (multipart/form-data), stores it in
 * contact_submissions, saves the optional attachment, and emails the team.
 */
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . SITE_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

function respond(bool $ok, string $message, int $code = 200): void
{
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $message]);
    exit;
}

try {
    // ---------- Read + validate fields ----------
    // These field names must match EnquiryForm.jsx exactly.
    $fullName    = trim($_POST['fullName'] ?? '');
    $companyName = trim($_POST['companyName'] ?? '');
    $mobile      = trim($_POST['mobile'] ?? '');
    $email       = trim($_POST['email'] ?? '');
    $city        = trim($_POST['city'] ?? '');
    $product     = trim($_POST['product'] ?? '');
    $details     = trim($_POST['details'] ?? '');

    if ($fullName === '')                              respond(false, 'Full name is required.', 422);
    if ($mobile === '')                                 respond(false, 'Mobile number is required.', 422);
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) respond(false, 'A valid email address is required.', 422);
    if ($details === '')                                respond(false, 'Please describe your requirement.', 422);

    // ---------- Handle optional attachment ----------
    $attachmentFilename = null; // stored in DB (just the filename, like gallery images)
    $attachmentPathForMail = null;
    $attachmentOriginalName = null;

    if (!empty($_FILES['file']['name'])) {
        $file = $_FILES['file'];

        if ($file['error'] !== UPLOAD_ERR_OK) {
            respond(false, 'Attachment upload failed (code ' . $file['error'] . ').', 422);
        }

        if ($file['size'] > MAX_UPLOAD_MB * 1024 * 1024) {
            respond(false, 'Attachment must be smaller than ' . MAX_UPLOAD_MB . 'MB.', 422);
        }

        $allowed = ['pdf', 'png', 'jpg', 'jpeg', 'dwg', 'dxf', 'xlsx', 'xls', 'doc', 'docx'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($ext, $allowed, true)) {
            respond(false, 'Unsupported file type. Allowed: ' . implode(', ', $allowed) . '.', 422);
        }

        if (!is_dir(ENQUIRY_UPLOAD_DIR)) {
            mkdir(ENQUIRY_UPLOAD_DIR, 0755, true);
        }

        $attachmentFilename = bin2hex(random_bytes(8)) . '.' . $ext;
        $dest = ENQUIRY_UPLOAD_DIR . $attachmentFilename;

        if (!move_uploaded_file($file['tmp_name'], $dest)) {
            respond(false, 'Could not save the uploaded attachment.', 500);
        }

        $attachmentPathForMail  = $dest;
        $attachmentOriginalName = $file['name'];
    }

    // ---------- Save to database ----------
    $pdo = getDb();
    $stmt = $pdo->prepare(
        "INSERT INTO contact_submissions
            (name, email, phone, company_name, city, product, requirement, attachment_path, ip_address)
         VALUES
            (:name, :email, :phone, :company_name, :city, :product, :requirement, :attachment_path, :ip)"
    );
    $stmt->execute([
        'name'            => $fullName,
        'email'           => $email,
        'phone'           => $mobile,
        'company_name'    => $companyName !== '' ? $companyName : null,
        'city'            => $city !== '' ? $city : null,
        'product'         => $product !== '' ? $product : null,
        'requirement'     => $details,
        'attachment_path' => $attachmentFilename,
        'ip'              => $_SERVER['REMOTE_ADDR'] ?? null,
    ]);

    // ---------- Send notification email (best-effort) ----------
    // If SMTP isn't configured correctly the enquiry is still saved in the
    // database and the admin can see it in the admin panel, so we never let
    // a mail failure turn a successful submission into an error response.
    try {
        require_once __DIR__ . '/../includes/SMTPMailer.php';

        $htmlBody = '<h2>New Enquiry — Finekot Website</h2>'
            . '<p><strong>Name:</strong> ' . htmlspecialchars($fullName) . '</p>'
            . '<p><strong>Company:</strong> ' . htmlspecialchars($companyName ?: '-') . '</p>'
            . '<p><strong>Mobile:</strong> ' . htmlspecialchars($mobile) . '</p>'
            . '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>'
            . '<p><strong>City:</strong> ' . htmlspecialchars($city ?: '-') . '</p>'
            . '<p><strong>Product:</strong> ' . htmlspecialchars($product ?: '-') . '</p>'
            . '<p><strong>Requirement:</strong><br>' . nl2br(htmlspecialchars($details)) . '</p>';

        $attachments = [];
        if ($attachmentPathForMail) {
            $attachments[] = [
                'path' => $attachmentPathForMail,
                'name' => $attachmentOriginalName,
                'mime' => mime_content_type($attachmentPathForMail) ?: 'application/octet-stream',
            ];
        }

        $mailer = new SMTPMailer(SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USERNAME, SMTP_PASSWORD);
        $mailer->send(
            SMTP_FROM_EMAIL,
            SMTP_FROM_NAME,
            CLIENT_TO_EMAIL,
            'New Enquiry from ' . $fullName,
            $htmlBody,
            $email,
            $attachments
        );

        if ($mailer->getErrors()) {
            error_log('contact.php mail warning: ' . implode(' | ', $mailer->getErrors()));
        }
    } catch (Throwable $mailErr) {
        error_log('contact.php mail exception: ' . $mailErr->getMessage());
    }

    respond(true, 'Thanks! Your enquiry has been sent — our team will get back to you shortly.');

} catch (Throwable $e) {
    error_log('contact.php error: ' . $e->getMessage());
    respond(false, 'Something went wrong on our end. Please try again shortly.', 500);
}