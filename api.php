<?php
/**
 * REST API for Content Planner
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// Helper response
function jsonResponse($success, $data = null, $message = '') {
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

try {
    switch ($action) {
        // ----------------------------------------------------
        // 1. GET ALL POSTS (With filters)
        // ----------------------------------------------------
        case 'get_posts':
            $platform = $_GET['platform'] ?? '';
            $status   = $_GET['status'] ?? '';
            $pillar   = $_GET['pillar'] ?? '';
            $search   = trim($_GET['search'] ?? '');
            $month    = $_GET['month'] ?? ''; // Format YYYY-MM

            $sql = "SELECT * FROM posts WHERE 1=1";
            $params = [];

            if (!empty($platform) && $platform !== 'all') {
                $sql .= " AND platform = :platform";
                $params[':platform'] = $platform;
            }
            if (!empty($status) && $status !== 'all') {
                $sql .= " AND status = :status";
                $params[':status'] = $status;
            }
            if (!empty($pillar) && $pillar !== 'all') {
                $sql .= " AND pillar = :pillar";
                $params[':pillar'] = $pillar;
            }
            if (!empty($search)) {
                $sql .= " AND (title LIKE :search OR caption LIKE :search OR hashtags LIKE :search OR pic LIKE :search)";
                $params[':search'] = '%' . $search . '%';
            }
            if (!empty($month)) {
                $sql .= " AND strftime('%Y-%m', scheduled_at) = :month";
                $params[':month'] = $month;
            }

            $sql .= " ORDER BY scheduled_at ASC, id DESC";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $posts = $stmt->fetchAll();

            jsonResponse(true, $posts);
            break;

        // ----------------------------------------------------
        // 2. GET SINGLE POST
        // ----------------------------------------------------
        case 'get_post':
            $id = (int)($_GET['id'] ?? 0);
            $stmt = $pdo->prepare("SELECT * FROM posts WHERE id = ?");
            $stmt->execute([$id]);
            $post = $stmt->fetch();
            if ($post) {
                jsonResponse(true, $post);
            } else {
                jsonResponse(false, null, 'Konten tidak ditemukan');
            }
            break;

        // ----------------------------------------------------
        // 3. CREATE POST
        // ----------------------------------------------------
        case 'create_post':
            $title        = trim($_POST['title'] ?? '');
            $platform     = $_POST['platform'] ?? 'instagram';
            $format       = $_POST['format'] ?? 'reels';
            $pillar       = $_POST['pillar'] ?? 'edukasi';
            $status       = $_POST['status'] ?? 'ide';
            $scheduled_at = !empty($_POST['scheduled_at']) ? $_POST['scheduled_at'] : date('Y-m-d H:i:s');
            $hook         = trim($_POST['hook'] ?? '');
            $caption      = trim($_POST['caption'] ?? '');
            $cta          = trim($_POST['cta'] ?? '');
            $hashtags     = trim($_POST['hashtags'] ?? '');
            $pic          = trim($_POST['pic'] ?? '');
            $notes        = trim($_POST['notes'] ?? '');

            if (empty($title)) {
                jsonResponse(false, null, 'Judul / Topik konten wajib diisi');
            }

            // Handle file upload
            $media_path = null;
            if (isset($_FILES['media']) && $_FILES['media']['error'] === UPLOAD_ERR_OK) {
                $fileTmp  = $_FILES['media']['tmp_name'];
                $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $_FILES['media']['name']);
                $target   = __DIR__ . '/uploads/' . $fileName;
                if (move_uploaded_file($fileTmp, $target)) {
                    $media_path = 'uploads/' . $fileName;
                }
            }

            $stmt = $pdo->prepare("
                INSERT INTO posts (title, platform, format, pillar, status, scheduled_at, hook, caption, cta, hashtags, media_path, pic, notes)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$title, $platform, $format, $pillar, $status, $scheduled_at, $hook, $caption, $cta, $hashtags, $media_path, $pic, $notes]);

            $newId = $pdo->lastInsertId();
            jsonResponse(true, ['id' => $newId], 'Konten baru berhasil disimpan!');
            break;

        // ----------------------------------------------------
        // 4. UPDATE POST
        // ----------------------------------------------------
        case 'update_post':
            $id = (int)($_POST['id'] ?? 0);
            if (!$id) {
                jsonResponse(false, null, 'ID Konten tidak valid');
            }

            $title        = trim($_POST['title'] ?? '');
            $platform     = $_POST['platform'] ?? 'instagram';
            $format       = $_POST['format'] ?? 'reels';
            $pillar       = $_POST['pillar'] ?? 'edukasi';
            $status       = $_POST['status'] ?? 'ide';
            $scheduled_at = !empty($_POST['scheduled_at']) ? $_POST['scheduled_at'] : date('Y-m-d H:i:s');
            $hook         = trim($_POST['hook'] ?? '');
            $caption      = trim($_POST['caption'] ?? '');
            $cta          = trim($_POST['cta'] ?? '');
            $hashtags     = trim($_POST['hashtags'] ?? '');
            $pic          = trim($_POST['pic'] ?? '');
            $notes        = trim($_POST['notes'] ?? '');
            $likes        = (int)($_POST['likes'] ?? 0);
            $comments     = (int)($_POST['comments'] ?? 0);
            $shares       = (int)($_POST['shares'] ?? 0);
            $reach        = (int)($_POST['reach'] ?? 0);

            if (empty($title)) {
                jsonResponse(false, null, 'Judul / Topik konten wajib diisi');
            }

            // Existing post
            $currStmt = $pdo->prepare("SELECT media_path FROM posts WHERE id = ?");
            $currStmt->execute([$id]);
            $curr = $currStmt->fetch();
            $media_path = $curr ? $curr['media_path'] : null;

            // Handle new media upload
            if (isset($_FILES['media']) && $_FILES['media']['error'] === UPLOAD_ERR_OK) {
                $fileTmp  = $_FILES['media']['tmp_name'];
                $fileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $_FILES['media']['name']);
                $target   = __DIR__ . '/uploads/' . $fileName;
                if (move_uploaded_file($fileTmp, $target)) {
                    $media_path = 'uploads/' . $fileName;
                }
            } elseif (isset($_POST['remove_media']) && $_POST['remove_media'] == '1') {
                $media_path = null;
            }

            $stmt = $pdo->prepare("
                UPDATE posts SET
                    title = ?, platform = ?, format = ?, pillar = ?, status = ?,
                    scheduled_at = ?, hook = ?, caption = ?, cta = ?, hashtags = ?,
                    media_path = ?, pic = ?, notes = ?, likes = ?, comments = ?,
                    shares = ?, reach = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ");
            $stmt->execute([
                $title, $platform, $format, $pillar, $status,
                $scheduled_at, $hook, $caption, $cta, $hashtags,
                $media_path, $pic, $notes, $likes, $comments,
                $shares, $reach, $id
            ]);

            jsonResponse(true, ['id' => $id], 'Konten berhasil diperbarui!');
            break;

        // ----------------------------------------------------
        // 5. UPDATE STATUS (Kanban drag-and-drop)
        // ----------------------------------------------------
        case 'update_status':
            $input = json_decode(file_get_contents('php://input'), true);
            $id = (int)($input['id'] ?? $_POST['id'] ?? 0);
            $newStatus = trim($input['status'] ?? $_POST['status'] ?? '');

            $validStatuses = ['ide', 'scripting', 'produksi', 'review', 'terjadwal', 'published'];
            if (!$id || !in_array($newStatus, $validStatuses)) {
                jsonResponse(false, null, 'Data status tidak valid');
            }

            $stmt = $pdo->prepare("UPDATE posts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$newStatus, $id]);

            jsonResponse(true, ['id' => $id, 'status' => $newStatus], 'Status konten berhasil diubah!');
            break;

        // ----------------------------------------------------
        // 6. UPDATE SCHEDULE DATE (Calendar drag / drop)
        // ----------------------------------------------------
        case 'update_date':
            $input = json_decode(file_get_contents('php://input'), true);
            $id = (int)($input['id'] ?? $_POST['id'] ?? 0);
            $newDate = trim($input['scheduled_at'] ?? $_POST['scheduled_at'] ?? '');

            if (!$id || empty($newDate)) {
                jsonResponse(false, null, 'Jadwal tanggal tidak valid');
            }

            $stmt = $pdo->prepare("UPDATE posts SET scheduled_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$newDate, $id]);

            jsonResponse(true, ['id' => $id, 'scheduled_at' => $newDate], 'Jadwal berhasil dipindahkan!');
            break;

        // ----------------------------------------------------
        // 7. DELETE POST
        // ----------------------------------------------------
        case 'delete_post':
            $id = (int)($_POST['id'] ?? 0);
            if (!$id) {
                jsonResponse(false, null, 'ID Konten tidak valid');
            }

            $stmt = $pdo->prepare("DELETE FROM posts WHERE id = ?");
            $stmt->execute([$id]);

            jsonResponse(true, null, 'Konten berhasil dihapus');
            break;

        // ----------------------------------------------------
        // 8. DASHBOARD STATISTICS
        // ----------------------------------------------------
        case 'get_stats':
            // Total posts
            $total = $pdo->query("SELECT COUNT(*) FROM posts")->fetchColumn();
            
            // By status
            $byStatus = $pdo->query("
                SELECT status, COUNT(*) as count 
                FROM posts 
                GROUP BY status
            ")->fetchAll(PDO::FETCH_KEY_PAIR);

            // By platform
            $byPlatform = $pdo->query("
                SELECT platform, COUNT(*) as count 
                FROM posts 
                GROUP BY platform
            ")->fetchAll(PDO::FETCH_KEY_PAIR);

            // By pillar
            $byPillar = $pdo->query("
                SELECT pillar, COUNT(*) as count 
                FROM posts 
                GROUP BY pillar
            ")->fetchAll(PDO::FETCH_KEY_PAIR);

            // Total reach, likes, comments
            $metrics = $pdo->query("
                SELECT 
                    SUM(reach) as total_reach,
                    SUM(likes) as total_likes,
                    SUM(comments) as total_comments,
                    SUM(shares) as total_shares
                FROM posts WHERE status = 'published'
            ")->fetch();

            // Upcoming posts (next 7 days)
            $upcoming = $pdo->query("
                SELECT * FROM posts 
                WHERE scheduled_at >= date('now') 
                  AND status IN ('terjadwal', 'review', 'produksi')
                ORDER BY scheduled_at ASC 
                LIMIT 5
            ")->fetchAll();

            // Recent published posts
            $recentPublished = $pdo->query("
                SELECT * FROM posts 
                WHERE status = 'published'
                ORDER BY scheduled_at DESC 
                LIMIT 5
            ")->fetchAll();

            jsonResponse(true, [
                'total' => $total,
                'by_status' => $byStatus,
                'by_platform' => $byPlatform,
                'by_pillar' => $byPillar,
                'metrics' => $metrics,
                'upcoming' => $upcoming,
                'recent_published' => $recentPublished
            ]);
            break;

        // ----------------------------------------------------
        // 9. IDEAS BANK CRUD
        // ----------------------------------------------------
        case 'get_ideas':
            $stmt = $pdo->query("SELECT * FROM ideas ORDER BY id DESC");
            jsonResponse(true, $stmt->fetchAll());
            break;

        case 'create_idea':
            $title = trim($_POST['title'] ?? '');
            $platform = $_POST['platform'] ?? 'instagram';
            $pillar = $_POST['pillar'] ?? 'edukasi';
            $notes = trim($_POST['notes'] ?? '');

            if (empty($title)) {
                jsonResponse(false, null, 'Judul ide wajib diisi');
            }

            $stmt = $pdo->prepare("INSERT INTO ideas (title, platform, pillar, notes) VALUES (?, ?, ?, ?)");
            $stmt->execute([$title, $platform, $pillar, $notes]);
            jsonResponse(true, ['id' => $pdo->lastInsertId()], 'Ide berhasil ditambahkan!');
            break;

        case 'convert_idea_to_post':
            $ideaId = (int)($_POST['id'] ?? 0);
            $stmt = $pdo->prepare("SELECT * FROM ideas WHERE id = ?");
            $stmt->execute([$ideaId]);
            $idea = $stmt->fetch();

            if (!$idea) {
                jsonResponse(false, null, 'Ide tidak ditemukan');
            }

            $postStmt = $pdo->prepare("
                INSERT INTO posts (title, platform, format, pillar, status, scheduled_at, notes)
                VALUES (?, ?, 'reels', ?, 'ide', datetime('now', '+1 day'), ?)
            ");
            $postStmt->execute([$idea['title'], $idea['platform'], $idea['pillar'], $idea['notes']]);
            $postId = $pdo->lastInsertId();

            // Delete idea or mark as converted
            $delStmt = $pdo->prepare("DELETE FROM ideas WHERE id = ?");
            $delStmt->execute([$ideaId]);

            jsonResponse(true, ['postId' => $postId], 'Ide berhasil dikonversi menjadi draf konten!');
            break;

        case 'delete_idea':
            $id = (int)($_POST['id'] ?? 0);
            $stmt = $pdo->prepare("DELETE FROM ideas WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(true, null, 'Ide berhasil dihapus');
            break;

        // ----------------------------------------------------
        // 10. EXPORT TO CSV
        // ----------------------------------------------------
        case 'export_csv':
            header('Content-Type: text/csv; charset=utf-8');
            header('Content-Disposition: attachment; filename=content_planner_' . date('Y-m-d') . '.csv');
            
            $output = fopen('php://output', 'w');
            // Add UTF-8 BOM for Excel
            fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
            
            fputcsv($output, ['ID', 'Judul / Topik', 'Platform', 'Format', 'Pilar', 'Status', 'Jadwal Publikasi', 'Hook', 'Caption', 'CTA', 'Hashtags', 'PIC', 'Likes', 'Comments', 'Shares', 'Reach']);
            
            $stmt = $pdo->query("SELECT id, title, platform, format, pillar, status, scheduled_at, hook, caption, cta, hashtags, pic, likes, comments, shares, reach FROM posts ORDER BY scheduled_at ASC");
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                fputcsv($output, $row);
            }
            fclose($output);
            exit;

        default:
            jsonResponse(false, null, 'Aksi API tidak valid');
    }
} catch (Exception $e) {
    jsonResponse(false, null, 'Terjadi kesalahan server: ' . $e->getMessage());
}

