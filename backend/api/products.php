<?php
/**
 * Finekot — Enquiry Products API
 * Returns the list of product/service options shown in the Contact page
 * dropdown. Managed from admin/products.php.
 */
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . SITE_ORIGIN);

try {
    $pdo = getDb();
    $rows = $pdo->query(
        "SELECT name FROM enquiry_products ORDER BY sort_order ASC, id ASC"
    )->fetchAll();

    echo json_encode([
        'success'  => true,
        'products' => array_map(fn($r) => $r['name'], $rows),
    ]);
} catch (Throwable $e) {
    error_log('products.php error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not load products.']);
}