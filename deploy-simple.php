<?php
/**
 * Simple deployment using file_get_contents/file_put_contents
 * For when FTP extensions are not available
 */

echo "=== Moneyfrog Website Deployment ===\n\n";

// Check what we can deploy
$files = [
    'index2.html' => 'Main website file',
    'assets/js/index2.js' => 'JavaScript file',
    'assets/img/' => 'Images directory'
];

echo "Files ready for deployment:\n";
foreach ($files as $file => $description) {
    if (file_exists($file)) {
        echo "✓ $file - $description\n";
    } else {
        echo "✗ $file - Missing\n";
    }
}

echo "\n";
echo "Server Details:\n";
echo "Host: 68.178.155.150\n";
echo "Username: saurabh@codesparkinfotech.com\n";
echo "Remote Path: /public_html/bolehnow.tlpl.in/\n";
echo "\n";

echo "To deploy manually:\n";
echo "1. Use an FTP client like FileZilla\n";
echo "2. Connect to: 68.178.155.150\n";
echo "3. Upload all files to: /public_html/bolehnow.tlpl.in/\n";
echo "\n";

echo "Or enable FTP extension in WAMP:\n";
echo "1. Click WAMP icon → PHP → PHP Extensions → php_ftp\n";
echo "2. Restart WAMP\n";
echo "3. Run: php deploy.php staging\n";
echo "\n";

// Test cURL availability
if (function_exists('curl_init')) {
    echo "✓ cURL is available - you can use deploy-curl.php\n";
    echo "Run: php deploy-curl.php staging\n";
} else {
    echo "✗ cURL is not available\n";
}

// Test file operations
if (function_exists('file_get_contents')) {
    echo "✓ File operations available\n";
} else {
    echo "✗ File operations not available\n";
}

echo "\n";
?>