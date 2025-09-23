<?php
/**
 * cURL-based FTP Deployment Script
 * Works without FTP extension
 */

// Configuration
$config = [
    'staging' => [
        'host' => '68.178.155.150',
        'username' => 'saurabh@codesparkinfotech.com',
        'password' => ']YPZKu^G;2dM4uf6P}vCf=z;',
        'remote_path' => '/public_html/bolehnow.tlpl.in/',
        'port' => 21
    ],
    'production' => [
        'host' => '68.178.155.150',
        'username' => 'saurabh@codesparkinfotech.com',
        'password' => ']YPZKu^G;2dM4uf6P}vCf=z;',
        'remote_path' => '/public_html/bolehnow.tlpl.in/',
        'port' => 21
    ]
];

// Files to exclude
$exclude = [
    '.git', '.gitignore', 'phploy.ini', '.phploy', 'deploy.php', 
    'deploy-curl.php', 'deploy-sftp.php', 'deploy.bat', 'deploy.md', 
    'fix-phploy.md', 'composer.json', 'composer.lock', 'vendor', 
    'node_modules', '.DS_Store', 'Thumbs.db', '.env', '.vscode', '.kiro'
];

class CurlFTPDeploy {
    private $config;
    
    public function __construct($serverConfig) {
        $this->config = $serverConfig;
    }
    
    public function deploy($localPath = '.') {
        echo "Starting cURL-based FTP deployment...\n";
        echo "Server: {$this->config['host']}:{$this->config['port']}\n";
        echo "Remote path: {$this->config['remote_path']}\n\n";
        
        $this->uploadDirectory($localPath, $this->config['remote_path']);
        echo "\nDeployment completed!\n";
    }
    
    private function uploadDirectory($localDir, $remoteDir) {
        global $exclude;
        
        $files = scandir($localDir);
        
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }
            
            // Skip excluded files/directories
            if (in_array($file, $exclude)) {
                echo "Skipping: $file\n";
                continue;
            }
            
            $localFile = $localDir . '/' . $file;
            $remoteFile = $remoteDir . $file;
            
            if (is_dir($localFile)) {
                // Recursively upload directory contents
                $this->uploadDirectory($localFile, $remoteFile . '/');
            } else {
                // Upload file using cURL
                $this->uploadFile($localFile, $remoteFile);
            }
        }
    }
    
    private function uploadFile($localFile, $remoteFile) {
        echo "Uploading: $localFile -> $remoteFile\n";
        
        $ftpUrl = "ftp://{$this->config['host']}:{$this->config['port']}" . $remoteFile;
        
        $ch = curl_init();
        $fp = fopen($localFile, 'r');
        
        if (!$fp) {
            echo "Error: Could not open local file: $localFile\n";
            return false;
        }
        
        curl_setopt($ch, CURLOPT_URL, $ftpUrl);
        curl_setopt($ch, CURLOPT_USERPWD, $this->config['username'] . ':' . $this->config['password']);
        curl_setopt($ch, CURLOPT_UPLOAD, 1);
        curl_setopt($ch, CURLOPT_INFILE, $fp);
        curl_setopt($ch, CURLOPT_INFILESIZE, filesize($localFile));
        curl_setopt($ch, CURLOPT_FTP_CREATE_MISSING_DIRS, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 300); // 5 minutes timeout
        
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        
        curl_close($ch);
        fclose($fp);
        
        if ($result === false || !empty($error)) {
            echo "Failed to upload $localFile: $error\n";
            return false;
        } else {
            echo "Uploaded: " . basename($localFile) . "\n";
            return true;
        }
    }
}

// Command line interface
if (php_sapi_name() === 'cli') {
    $server = isset($argv[1]) ? $argv[1] : 'staging';
    
    if (!isset($config[$server])) {
        echo "Error: Server '$server' not found in configuration.\n";
        echo "Available servers: " . implode(', ', array_keys($config)) . "\n";
        exit(1);
    }
    
    try {
        $deploy = new CurlFTPDeploy($config[$server]);
        $deploy->deploy();
        
        echo "\n✅ Deployment to '$server' completed successfully!\n";
        echo "Visit: http://bolehnow.tlpl.in to check your website\n";
        
    } catch (Exception $e) {
        echo "\n❌ Deployment failed: " . $e->getMessage() . "\n";
        exit(1);
    }
} else {
    echo "This script should be run from command line.\n";
    echo "Usage: php deploy-curl.php [staging|production]\n";
}
?>