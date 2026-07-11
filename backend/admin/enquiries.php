<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../db.php';
requireAdminLogin();

$pdo = getDb();
$flash = '';
$flashType = 'success';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    try {
        if ($action === 'delete_enquiry') {
            $id = (int)($_POST['id'] ?? 0);
            $stmt = $pdo->prepare("SELECT attachment_path FROM contact_submissions WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $row = $stmt->fetch();
            if ($row) {
                if (!empty($row['attachment_path'])) {
                    $path = ENQUIRY_UPLOAD_DIR . basename($row['attachment_path']);
                    if (is_file($path)) @unlink($path);
                }
                $pdo->prepare("DELETE FROM contact_submissions WHERE id = :id")->execute(['id' => $id]);
                $flash = 'Enquiry deleted.';
            }
        }
    } catch (Throwable $e) {
        $flash = $e->getMessage();
        $flashType = 'error';
    }
    $_SESSION['flash'] = $flash;
    $_SESSION['flashType'] = $flashType;
    header('Location: enquiries.php');
    exit;
}

if (!empty($_SESSION['flash'])) {
    $flash = $_SESSION['flash'];
    $flashType = $_SESSION['flashType'] ?? 'success';
    unset($_SESSION['flash'], $_SESSION['flashType']);
}

$enquiries = $pdo->query(
    "SELECT * FROM contact_submissions ORDER BY created_at DESC"
)->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Enquiries — Finekot Admin</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; }
  body { margin:0; font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#f4f6f9; color:#0B2343; }
  header { background:#0B2343; color:#fff; padding:18px 28px; display:flex; justify-content:space-between; align-items:center; }
  header h1 { font-size:18px; margin:0; }
  nav a { color:#F59E0B; text-decoration:none; font-size:13px; font-weight:600; margin-left:18px; }
  nav a.active { color:#fff; text-decoration:underline; }
  .wrap { max-width: 1200px; margin: 30px auto; padding: 0 20px; }
  .flash { padding:12px 16px; border-radius:8px; margin-bottom:20px; font-size:14px; }
  .flash.success { background:#dcfce7; color:#166534; }
  .flash.error { background:#fee2e2; color:#b91c1c; }
  .panel { background:#fff; border-radius:14px; padding:22px; box-shadow:0 4px 20px rgba(0,0,0,0.05); overflow-x:auto; }
  table { width:100%; border-collapse: collapse; font-size:13px; }
  th, td { text-align:left; padding:10px 12px; border-bottom:1px solid #e5e7eb; vertical-align: top; }
  th { color:#6b7280; font-size:11px; text-transform:uppercase; letter-spacing:.05em; }
  .req { max-width: 260px; white-space: pre-wrap; }
  .btn {
    background:#F59E0B; color:#fff; border:none; padding:8px 14px; border-radius:8px;
    font-weight:600; cursor:pointer; font-size:12px; white-space:nowrap; text-decoration:none; display:inline-block;
  }
  .btn:hover { background:#d98608; }
  .btn.danger { background:#dc2626; }
  .btn.danger:hover { background:#b91c1c; }
  .btn.ghost { background:#eef2ff; color:#374151; }
  .muted { color:#9ca3af; }
  .empty { color:#9ca3af; font-size:13px; padding:20px 0; text-align:center; }
</style>
</head>
<body>

<header>
  <h1>Finekot — Admin Panel</h1>
  <nav>
    <a href="index.php">Gallery</a>
    <a href="products.php">Products</a>
    <a href="enquiries.php" class="active">Enquiries</a>
    <a href="logout.php">Log Out</a>
  </nav>
</header>

<div class="wrap">

  <?php if ($flash): ?>
    <div class="flash <?= $flashType ?>"><?= htmlspecialchars($flash) ?></div>
  <?php endif; ?>

  <div class="panel">
    <?php if (empty($enquiries)): ?>
      <p class="empty">No enquiries received yet.</p>
    <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Company / City</th>
            <th>Product</th>
            <th>Requirement</th>
            <th>Attachment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($enquiries as $row): ?>
            <tr>
              <td><?= htmlspecialchars(date('d M Y, h:i A', strtotime($row['created_at']))) ?></td>
              <td><?= htmlspecialchars($row['name']) ?></td>
              <td>
                <?= htmlspecialchars($row['phone']) ?><br>
                <span class="muted"><?= htmlspecialchars($row['email']) ?></span>
              </td>
              <td>
                <?= htmlspecialchars($row['company_name'] ?: '-') ?><br>
                <span class="muted"><?= htmlspecialchars($row['city'] ?: '-') ?></span>
              </td>
              <td><?= htmlspecialchars($row['product'] ?: '-') ?></td>
              <td class="req"><?= htmlspecialchars($row['requirement']) ?></td>
              <td>
                <?php if (!empty($row['attachment_path'])): ?>
                  <a class="btn ghost" href="<?= ENQUIRY_UPLOAD_URL_BASE . rawurlencode(basename($row['attachment_path'])) ?>" target="_blank" rel="noopener">
                    View / Download
                  </a>
                <?php else: ?>
                  <span class="muted">None</span>
                <?php endif; ?>
              </td>
              <td>
                <form method="POST" onsubmit="return confirm('Delete this enquiry?');">
                  <input type="hidden" name="action" value="delete_enquiry">
                  <input type="hidden" name="id" value="<?= $row['id'] ?>">
                  <button class="btn danger" type="submit">Delete</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </div>

</div>
</body>
</html>