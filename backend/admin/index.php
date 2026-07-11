<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../db.php';
requireAdminLogin();

$pdo = getDb();
$flash = '';
$flashType = 'success';

// ---------- Handle actions ----------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    try {
        if ($action === 'add_group') {
            $name = trim($_POST['group_name'] ?? '');
            if ($name === '') throw new Exception('Group name is required.');
            $sort = (int)($_POST['sort_order'] ?? 0);
            $stmt = $pdo->prepare("INSERT INTO gallery_groups (name, sort_order) VALUES (:n, :s)");
            $stmt->execute(['n' => $name, 's' => $sort]);
            $flash = 'Group added.';

        } elseif ($action === 'delete_group') {
            $id = (int)($_POST['group_id'] ?? 0);
            // remove image files belonging to this group first
            $stmt = $pdo->prepare("SELECT image_path FROM gallery_items WHERE group_id = :id");
            $stmt->execute(['id' => $id]);
            foreach ($stmt->fetchAll() as $row) {
                $path = UPLOAD_DIR . basename($row['image_path']);
                if (is_file($path)) @unlink($path);
            }
            $pdo->prepare("DELETE FROM gallery_groups WHERE id = :id")->execute(['id' => $id]);
            $flash = 'Group and its images deleted.';

        } elseif ($action === 'add_item') {
            $groupId    = (int)($_POST['group_id'] ?? 0);
            $caption    = trim($_POST['caption'] ?? '');
            $sortOrder  = (int)($_POST['sort_order'] ?? 0);

            if ($groupId <= 0)      throw new Exception('Please choose a group.');
            if ($caption === '')    throw new Exception('Caption is required.');
            if (empty($_FILES['image']['name'])) throw new Exception('Please choose an image.');

            // ---- TEMP DEBUG - remove after fixing ----
            error_log('DEBUG gallery $_FILES: ' . print_r($_FILES, true));
            error_log('DEBUG gallery $_POST: ' . print_r($_POST, true));
            // -------------------------------------------

            $file = $_FILES['image'];
            if ($file['error'] !== UPLOAD_ERR_OK) throw new Exception('Upload failed (code ' . $file['error'] . ').');

            $allowed = ['jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp'];
            $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!array_key_exists($ext, $allowed)) throw new Exception('Only JPG, PNG or WEBP images are allowed.');

            if ($file['size'] > MAX_UPLOAD_MB * 1024 * 1024) {
                throw new Exception('Image must be smaller than ' . MAX_UPLOAD_MB . 'MB.');
            }

            // Verify it's actually an image (defense against renamed files)
            $imgInfo = @getimagesize($file['tmp_name']);
            if ($imgInfo === false) throw new Exception('File is not a valid image.');

            if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);

            $filename = bin2hex(random_bytes(8)) . '.' . $ext;
            $dest = UPLOAD_DIR . $filename;

            if (!move_uploaded_file($file['tmp_name'], $dest)) {
                throw new Exception('Could not save uploaded file.');
            }

            $stmt = $pdo->prepare(
                "INSERT INTO gallery_items (group_id, caption, image_path, sort_order) VALUES (:g, :c, :p, :s)"
            );
            $stmt->execute(['g' => $groupId, 'c' => $caption, 'p' => $filename, 's' => $sortOrder]);
            $flash = 'Image added to gallery.';

        } elseif ($action === 'delete_item') {
            $id = (int)($_POST['item_id'] ?? 0);
            $stmt = $pdo->prepare("SELECT image_path FROM gallery_items WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $row = $stmt->fetch();
            if ($row) {
                $path = UPLOAD_DIR . basename($row['image_path']);
                if (is_file($path)) @unlink($path);
                $pdo->prepare("DELETE FROM gallery_items WHERE id = :id")->execute(['id' => $id]);
                $flash = 'Image deleted.';
            }
        }
    } catch (Throwable $e) {
        $flash = $e->getMessage();
        $flashType = 'error';
    }

    // Redirect to avoid re-submitting the form on refresh (PRG pattern)
    $_SESSION['flash']     = $flash;
    $_SESSION['flashType'] = $flashType;
    header('Location: index.php');
    exit;
}

if (!empty($_SESSION['flash'])) {
    $flash     = $_SESSION['flash'];
    $flashType = $_SESSION['flashType'] ?? 'success';
    unset($_SESSION['flash'], $_SESSION['flashType']);
}

$groups = $pdo->query("SELECT * FROM gallery_groups ORDER BY sort_order ASC, id ASC")->fetchAll();

$itemsStmt = $pdo->prepare("SELECT * FROM gallery_items WHERE group_id = :gid ORDER BY sort_order ASC, id ASC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Gallery Manager — Finekot Admin</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; }
  body { margin:0; font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#f4f6f9; color:#0B2343; }
  header { background:#0B2343; color:#fff; padding:18px 28px; display:flex; justify-content:space-between; align-items:center; }
  header h1 { font-size:18px; margin:0; }
  header a { color:#F59E0B; text-decoration:none; font-size:13px; font-weight:600; }
  .wrap { max-width: 1100px; margin: 30px auto; padding: 0 20px; }
  .flash { padding:12px 16px; border-radius:8px; margin-bottom:20px; font-size:14px; }
  .flash.success { background:#dcfce7; color:#166534; }
  .flash.error { background:#fee2e2; color:#b91c1c; }
  .panel { background:#fff; border-radius:14px; padding:22px; margin-bottom:24px; box-shadow:0 4px 20px rgba(0,0,0,0.05); }
  .panel h2 { font-size:16px; margin:0 0 16px; }
  form.inline { display:flex; gap:10px; flex-wrap:wrap; align-items:flex-end; }
  label { display:block; font-size:12px; font-weight:600; color:#6b7280; margin-bottom:5px; }
  input, select, textarea {
    padding:9px 10px; border:1px solid #d1d5db; border-radius:8px; font-size:13px; width:100%;
  }
  .btn {
    background:#F59E0B; color:#fff; border:none; padding:10px 18px; border-radius:8px;
    font-weight:600; cursor:pointer; font-size:13px; white-space:nowrap;
  }
  .btn:hover { background:#d98608; }
  .btn.danger { background:#dc2626; }
  .btn.danger:hover { background:#b91c1c; }
  .btn.small { padding:6px 10px; font-size:12px; }
  .group-block { margin-bottom: 30px; }
  .group-title { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
  .group-title h3 { margin:0; font-size:15px; }
  .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:14px; }
  .item-card { border:1px solid #e5e7eb; border-radius:10px; overflow:hidden; background:#fafafa; }
  .item-card img { width:100%; height:120px; object-fit:cover; display:block; }
  .item-card .meta { padding:8px 10px; }
  .item-card .caption { font-size:12px; font-weight:600; margin-bottom:8px; }
  .empty { color:#9ca3af; font-size:13px; padding:10px 0; }
</style>
</head>
<body>

<header>
  <h1>Finekot — Admin Panel</h1>
  <nav>
    <a href="index.php" style="color:#fff;text-decoration:underline;">Gallery</a>
    <a href="products.php" style="margin-left:18px;">Products</a>
    <a href="enquiries.php" style="margin-left:18px;">Enquiries</a>
    <a href="logout.php" style="margin-left:18px;">Log Out</a>
  </nav>
</header>

<div class="wrap">

  <?php if ($flash): ?>
    <div class="flash <?= $flashType ?>"><?= htmlspecialchars($flash) ?></div>
  <?php endif; ?>

  <!-- Add new group -->
  <div class="panel">
    <h2>Add New Category / Group</h2>
    <form class="inline" method="POST">
      <input type="hidden" name="action" value="add_group">
      <div style="flex:2;">
        <label>Group Name</label>
        <input type="text" name="group_name" placeholder="e.g. Machinery & Infrastructure" required>
      </div>
      <div style="width:120px;">
        <label>Sort Order</label>
        <input type="number" name="sort_order" value="0">
      </div>
      <button class="btn" type="submit">Add Group</button>
    </form>
  </div>

  <!-- Add new image -->
  <div class="panel">
    <h2>Upload New Image</h2>
    <form class="inline" method="POST" enctype="multipart/form-data">
      <input type="hidden" name="action" value="add_item">
      <div style="width:200px;">
        <label>Group</label>
        <select name="group_id" required>
          <option value="">Select group</option>
          <?php foreach ($groups as $g): ?>
            <option value="<?= $g['id'] ?>"><?= htmlspecialchars($g['name']) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div style="flex:2;">
        <label>Caption</label>
        <input type="text" name="caption" placeholder="e.g. CNC Cutting Line" required>
      </div>
      <div style="width:100px;">
        <label>Sort Order</label>
        <input type="number" name="sort_order" value="0">
      </div>
      <div style="flex:1.5;">
        <label>Image (JPG/PNG/WEBP, max <?= MAX_UPLOAD_MB ?>MB)</label>
        <input type="file" name="image" accept=".jpg,.jpeg,.png,.webp" required>
      </div>
      <button class="btn" type="submit">Upload</button>
    </form>
  </div>

  <!-- Existing groups & images -->
  <?php foreach ($groups as $g): ?>
    <?php
      $itemsStmt->execute(['gid' => $g['id']]);
      $items = $itemsStmt->fetchAll();
    ?>
    <div class="panel group-block">
      <div class="group-title">
        <h3><?= htmlspecialchars($g['name']) ?> <span style="color:#9ca3af;font-weight:400;">(<?= count($items) ?> images)</span></h3>
        <form method="POST" onsubmit="return confirm('Delete this whole group and all its images?');">
          <input type="hidden" name="action" value="delete_group">
          <input type="hidden" name="group_id" value="<?= $g['id'] ?>">
          <button class="btn danger small" type="submit">Delete Group</button>
        </form>
      </div>

      <?php if (empty($items)): ?>
        <p class="empty">No images yet in this group.</p>
      <?php else: ?>
        <div class="grid">
          <?php foreach ($items as $item): ?>
            <div class="item-card">
              <img src="<?= UPLOAD_URL_BASE . basename($item['image_path']) ?>" alt="<?= htmlspecialchars($item['caption']) ?>">
              <div class="meta">
                <div class="caption"><?= htmlspecialchars($item['caption']) ?></div>
                <form method="POST" onsubmit="return confirm('Delete this image?');">
                  <input type="hidden" name="action" value="delete_item">
                  <input type="hidden" name="item_id" value="<?= $item['id'] ?>">
                  <button class="btn danger small" type="submit" style="width:100%;">Delete</button>
                </form>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  <?php endforeach; ?>

  <?php if (empty($groups)): ?>
    <p class="empty">No groups yet — add one above to get started.</p>
  <?php endif; ?>

</div>
</body>
</html>