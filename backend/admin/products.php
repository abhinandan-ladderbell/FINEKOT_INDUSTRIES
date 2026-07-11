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
        if ($action === 'add_product') {
            $name = trim($_POST['name'] ?? '');
            $sort = (int)($_POST['sort_order'] ?? 0);
            if ($name === '') throw new Exception('Product name is required.');

            $stmt = $pdo->prepare("INSERT INTO enquiry_products (name, sort_order) VALUES (:n, :s)");
            $stmt->execute(['n' => $name, 's' => $sort]);
            $flash = 'Product added.';

        } elseif ($action === 'delete_product') {
            $id = (int)($_POST['id'] ?? 0);
            $pdo->prepare("DELETE FROM enquiry_products WHERE id = :id")->execute(['id' => $id]);
            $flash = 'Product removed.';
        }
    } catch (Throwable $e) {
        // Duplicate name will hit the UNIQUE constraint
        $flash = str_contains($e->getMessage(), 'Duplicate') ? 'That product already exists.' : $e->getMessage();
        $flashType = 'error';
    }
    $_SESSION['flash'] = $flash;
    $_SESSION['flashType'] = $flashType;
    header('Location: products.php');
    exit;
}

if (!empty($_SESSION['flash'])) {
    $flash = $_SESSION['flash'];
    $flashType = $_SESSION['flashType'] ?? 'success';
    unset($_SESSION['flash'], $_SESSION['flashType']);
}

$products = $pdo->query("SELECT * FROM enquiry_products ORDER BY sort_order ASC, id ASC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Products — Finekot Admin</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; }
  body { margin:0; font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#f4f6f9; color:#0B2343; }
  header { background:#0B2343; color:#fff; padding:18px 28px; display:flex; justify-content:space-between; align-items:center; }
  header h1 { font-size:18px; margin:0; }
  nav a { color:#F59E0B; text-decoration:none; font-size:13px; font-weight:600; margin-left:18px; }
  nav a.active { color:#fff; text-decoration:underline; }
  .wrap { max-width: 800px; margin: 30px auto; padding: 0 20px; }
  .flash { padding:12px 16px; border-radius:8px; margin-bottom:20px; font-size:14px; }
  .flash.success { background:#dcfce7; color:#166534; }
  .flash.error { background:#fee2e2; color:#b91c1c; }
  .panel { background:#fff; border-radius:14px; padding:22px; margin-bottom:24px; box-shadow:0 4px 20px rgba(0,0,0,0.05); }
  .panel h2 { font-size:16px; margin:0 0 16px; }
  form.inline { display:flex; gap:10px; flex-wrap:wrap; align-items:flex-end; }
  label { display:block; font-size:12px; font-weight:600; color:#6b7280; margin-bottom:5px; }
  input { padding:9px 10px; border:1px solid #d1d5db; border-radius:8px; font-size:13px; width:100%; }
  .btn {
    background:#F59E0B; color:#fff; border:none; padding:10px 18px; border-radius:8px;
    font-weight:600; cursor:pointer; font-size:13px; white-space:nowrap;
  }
  .btn:hover { background:#d98608; }
  .btn.danger { background:#dc2626; }
  .btn.danger:hover { background:#b91c1c; }
  .btn.small { padding:6px 10px; font-size:12px; }
  table { width:100%; border-collapse: collapse; font-size:13px; }
  th, td { text-align:left; padding:10px 12px; border-bottom:1px solid #e5e7eb; }
  th { color:#6b7280; font-size:11px; text-transform:uppercase; letter-spacing:.05em; }
  .empty { color:#9ca3af; font-size:13px; padding:10px 0; }
  .hint { color:#9ca3af; font-size:12px; margin-top:10px; }
</style>
</head>
<body>

<header>
  <h1>Finekot — Admin Panel</h1>
  <nav>
    <a href="index.php">Gallery</a>
    <a href="products.php" class="active">Products</a>
    <a href="enquiries.php">Enquiries</a>
    <a href="logout.php">Log Out</a>
  </nav>
</header>

<div class="wrap">

  <?php if ($flash): ?>
    <div class="flash <?= $flashType ?>"><?= htmlspecialchars($flash) ?></div>
  <?php endif; ?>

  <div class="panel">
    <h2>Add Product / Service Option</h2>
    <form class="inline" method="POST">
      <input type="hidden" name="action" value="add_product">
      <div style="flex:2;">
        <label>Product / Service Name</label>
        <input type="text" name="name" placeholder="e.g. Solar Rooftop Structures" required>
      </div>
      <div style="width:120px;">
        <label>Sort Order</label>
        <input type="number" name="sort_order" value="0">
      </div>
      <button class="btn" type="submit">Add</button>
    </form>
    <p class="hint">This list feeds the "Product / Service Interested In" dropdown on the website's Contact form. Changes appear immediately.</p>
  </div>

  <div class="panel">
    <h2>Current Options (<?= count($products) ?>)</h2>
    <?php if (empty($products)): ?>
      <p class="empty">No product options yet — add one above. The dropdown will show only "Other / General Enquiry" until you do.</p>
    <?php else: ?>
      <table>
        <thead>
          <tr><th>Sort</th><th>Name</th><th></th></tr>
        </thead>
        <tbody>
          <?php foreach ($products as $p): ?>
            <tr>
              <td><?= (int)$p['sort_order'] ?></td>
              <td><?= htmlspecialchars($p['name']) ?></td>
              <td>
                <form method="POST" onsubmit="return confirm('Remove this product option?');">
                  <input type="hidden" name="action" value="delete_product">
                  <input type="hidden" name="id" value="<?= $p['id'] ?>">
                  <button class="btn danger small" type="submit">Remove</button>
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