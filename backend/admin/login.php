<?php
require_once __DIR__ . '/../includes/auth.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $u = trim($_POST['username'] ?? '');
    $p = $_POST['password'] ?? '';

    if (attemptAdminLogin($u, $p)) {
        header('Location: index.php');
        exit;
    }
    $error = 'Invalid username or password.';
}

if (isAdminLoggedIn()) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Login — Finekot</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #0B2343; font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  }
  .card {
    background: #fff; padding: 40px; border-radius: 16px; width: 100%; max-width: 360px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }
  h1 { font-size: 20px; margin: 0 0 24px; color: #0B2343; }
  label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: #374151; }
  input {
    width: 100%; padding: 10px 12px; margin-bottom: 16px; border: 1px solid #d1d5db;
    border-radius: 8px; font-size: 14px;
  }
  button {
    width: 100%; padding: 12px; background: #F59E0B; color: #fff; border: none;
    border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px;
  }
  button:hover { background: #d98608; }
  .error { background: #fee2e2; color: #b91c1c; padding: 10px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
</style>
</head>
<body>
  <form class="card" method="POST">
    <h1>Finekot Admin — Gallery Manager</h1>
    <?php if ($error): ?><div class="error"><?= htmlspecialchars($error) ?></div><?php endif; ?>
    <label>Username</label>
    <input type="text" name="username" required autofocus>
    <label>Password</label>
    <input type="password" name="password" required>
    <button type="submit">Log In</button>
  </form>
</body>
</html>
