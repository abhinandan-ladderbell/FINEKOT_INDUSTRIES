<?php
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . SITE_ORIGIN);
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

try {
    $pdo = getDb();

    $groups = $pdo->query(
        "SELECT id, name FROM gallery_groups ORDER BY sort_order ASC, id ASC"
    )->fetchAll();

    $itemsStmt = $pdo->prepare(
        "SELECT caption, image_path FROM gallery_items
         WHERE group_id = :gid
         ORDER BY sort_order ASC, id ASC"
    );

    $result = [];
    foreach ($groups as $group) {
        $itemsStmt->execute(['gid' => $group['id']]);
        $items = $itemsStmt->fetchAll();

        $result[] = [
            'group' => $group['name'],
            'items' => array_map(function ($row) {
                return [
                    'caption' => $row['caption'],
                    // full public URL to the image
                    'image'   => UPLOAD_URL_BASE . basename($row['image_path']),
                ];
            }, $items),
        ];
    }

    echo json_encode(['success' => true, 'gallery' => $result]);
} catch (Throwable $e) {
    error_log('gallery.php error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to load gallery']);
}
