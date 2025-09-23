<?php
/**
 * SFTP Deployment Script for Moneyfrog Website
 * Uses SSH2 extension for secure file transfer
 */

// Configuration
$config = [
    'staging' => [
        'host' => '68.178.155.150',
        'username' => 'saurabh@codesparkinfotech.com',
        'password' => ']YPZKu^G;2dM4uf6P}vCf=z;',
        'remote_path' => '/public_html/bolehnow.tlpl.in/',
        'port' => 22
    ],
    'production' => [
        'host' => '68.178.155.150',
        'username' => 'saurabh@codesparkinfotech.com',
        'password' => ']YPZKu^G;2dM4uf6P}vCf=z;',
        'remote_path' => '/public_html/bolehnow.tlpl.in/',
        'port' => 22
    ]
];

// Files to exclude from deployment
$exclude = [
    '.git',
    '.gitignore',
    'phploy.ini',
    '.phploy',
    'deploy.php',
    'deploy-sftp.php',
    'deploy.md',
    'fix-phploy.md',
    'composer.json',
    'composer.lock',
    'vendor',
    'node_modules',
    '.DS_Store',
    'Thumbs.db',
    '.env',
    '.vscode',
    '.kiro'
];

class SFTPDeploy {
    private $connection;
    private $sftp;
    private $config;
    
    public function __construct($serverConfig) {
        $this->config = $serverConfig;
    }
    
    public function connect() {
        // Check if SSH2 extension is available
        if (!extension_loaded('ssh2')) {
            throw new Exception("SSH2 extension is not installed. Please install php-ssh2 extension or use FTP deployment.");
        }
        
        echo "Connecting to {$this->config['host']}:{$this->config['port']}...\n";
        
        $this->connection = ssh2_connect($this->config['host'], $this->config['port']);
        
        if (!$this->connection) {
            throw new Exception("Could not connect to SFTP server");
        }
        
        if (!ssh2_auth_password($this->connection, $this->config['username'], $this->config['password'])) {
            throw new Exception("Could not authenticate with SFTP server");
        }
        
        $this->sftp = ssh2_sftp($this->connection);
        
        if (!$this->sftp) {
            throw new Exception("Could not initialize SFTP subsystem");
        }
        
        echo "Connected successfully!\n";
    }
    
    public function deploy($localPath = '.', $remotePath = null) {
        if ($remotePath === null) {
            $remotePath = $this->config['remote_path'];
        }
        
        echo "Starting deployment...\n";
        $this->uploadDirectory($localPath, $remotePath);
        echo "Deployment completed!\n";
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
            $remoteFile = $remoteDir . '/' . $file;
            
            if (is_dir($localFile)) {
                // Create remote directory if it doesn't exist
                if (!$this->remoteDirectoryExists($remoteFile)) {
                    echo "Creating directory: $remoteFile\n";
                    ssh2_sftp_mkdir($this->sftp, $remoteFile, 0755, true);
                }
                
                // Recursively upload directory contents
                $this->uploadDirectory($localFile, $remoteFile);
            } else {
                // Upload file
                echo "Uploading: $localFile -> $remoteFile\n";
                
                if (!ssh2_scp_send($this->connection, $localFile, $remoteFile, 0644)) {
                    echo "Failed to upload: $localFile\n";
                } else {
                    echo "Uploaded: $file\n";
                }
            }
        }
    }
    
    private function remoteDirectoryExists($dir) {
        $stat = ssh2_sftp_stat($this->sftp, $dir);
        return $stat !== false;
    }
    
    public function disconnect() {
        if ($this->connection) {
            echo "Disconnected from SFTP server.\n";
        }
    }
}

// Fallback FTP class for when SSH2 is not available
class FTPDeploy {
    private $connection;
    private $config;
    
    public function __construct($serverConfig) {
        $this->config = $serverConfig;
        // Convert port 22 to 21 for FTP fallback
        if ($this->config['port'] == 22) {
            $this->config['port'] = 21;
            echo "Note: Converting port 22 to 21 for FTP fallback\n";
        }
    }
    
    public function connect() {
        echo "Connecting to {$this->config['host']}:{$this->config['port']} via FTP...\n";
        
        $this->connection = ftp_connect($this->config['host'], $this->config['port']);
        
        if (!$this->connection) {
            throw new Exception("Could not connect to FTP server");
        }
        
        if (!ftp_login($this->connection, $this->config['username'], $this->config['password'])) {
            throw new Exception("Could not login to FTP server");
        }
        
        ftp_pasv($this->connection, true);
        echo "Connected successfully!\n";
    }
    
    public function deploy($localPath = '.', $remotePath = null) {
        if ($remotePath === null) {
            $remotePath = $this->config['remote_path'];
        }
        
        echo "Starting deployment...\n";
        $this->uploadDirectory($localPath, $remotePath);
        echo "Deployment completed!\n";
    }
    
    private function uploadDirectory($localDir, $remoteDir) {
        global $exclude;
        
        $files = scandir($localDir);
        
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') {
                continue;
            }
            
            if (in_array($file, $exclude)) {
                echo "Skipping: $file\n";
                continue;
            }
            
            $localFile = $localDir . '/' . $file;
            $remoteFile = $remoteDir . '/' . $file;
            
            if (is_dir($localFile)) {
                if (!$this->remoteDirectoryExists($remoteFile)) {
                    echo "Creating directory: $remoteFile\n";
                    ftp_mkdir($this->connection, $remoteFile);
                }
                $this->uploadDirectory($localFile, $remoteFile);
            } else {
                echo "Uploading: $localFile -> $remoteFile\n";
                if (!ftp_put($this->connection, $remoteFile, $localFile, FTP_BINARY)) {
                    echo "Failed to upload: $localFile\n";
                } else {
                    echo "Uploaded: $file\n";
                }
            }
        }
    }
    
    private function remoteDirectoryExists($dir) {
        $currentDir = ftp_pwd($this->connection);
        if (@ftp_chdir($this->connection, $dir)) {
            ftp_chdir($this->connection, $currentDir);
            return true;
        }
        return false;
    }
    
    public function disconnect() {
        if ($this->connection) {
            ftp_close($this->connection);
            echo "Disconnected from FTP server.\n";
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
        // Try SFTP first, fallback to FTP
        if (extension_loaded('ssh2')) {
            echo "Using SFTP (SSH2) connection...\n";
            $deploy = new SFTPDeploy($config[$server]);
        } else {
            echo "SSH2 extension not available, using FTP fallback...\n";
            $deploy = new FTPDeploy($config[$server]);
        }
        
        $deploy->connect();
        $deploy->deploy();
        $deploy->disconnect();
        
        echo "\n✅ Deployment to '$server' completed successfully!\n";
        
    } catch (Exception $e) {
        echo "\n❌ Deployment failed: " . $e->getMessage() . "\n";
        
        // If SFTP failed, suggest FTP fallback
        if (strpos($e->getMessage(), 'SSH2') !== false) {
            echo "\n💡 Tip: Try using FTP instead:\n";
            echo "   php deploy.php $server\n";
        }
        
        exit(1);
    }
} else {
    echo "This script should be run from command line.\n";
    echo "Usage: php deploy-sftp.php [staging|production]\n";
}
?>