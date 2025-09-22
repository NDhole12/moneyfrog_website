# PHPloy Fix Guide

## Problem
PHPloy has a compatibility issue with newer versions of Flysystem library causing the error:
```
Fatal error: Undefined constant "League\Flysystem\Adapter\FTP_BINARY"
```

## Solutions

### Solution 1: Use Alternative Deployment Script (Recommended)

I've created a simple PHP deployment script (`deploy.php`) that works without dependencies:

```bash
# Deploy to staging
php deploy.php staging

# Deploy to production  
php deploy.php production
```

**Benefits:**
- No dependencies
- Simple and reliable
- Easy to customize
- Works on any PHP installation

### Solution 2: Fix PHPloy Installation

#### Option A: Downgrade to Compatible Version
```bash
# Remove current version
composer global remove banago/phploy

# Install older compatible version
composer global require banago/phploy:^3.0
```

#### Option B: Use PHPloy PHAR (Older Version)
```bash
# Download older working version
wget https://github.com/banago/PHPloy/releases/download/v3.0.15/phploy.phar
chmod +x phploy.phar

# Use it
./phploy.phar -s staging
```

### Solution 3: Alternative Tools

#### Git-FTP (Lightweight)
```bash
# Install git-ftp
# Windows (via Git Bash)
curl https://raw.githubusercontent.com/git-ftp/git-ftp/master/git-ftp > /bin/git-ftp
chmod 755 /bin/git-ftp

# Configure
git config git-ftp.url ftp://your-server.com/public_html/
git config git-ftp.user your-username
git config git-ftp.password your-password

# Deploy
git ftp push
```

#### LFTP (Advanced)
```bash
# Install LFTP (Windows via Chocolatey)
choco install lftp

# Create deployment script
lftp -c "
set ftp:list-options -a;
open ftp://username:password@server.com;
lcd /local/path;
cd /remote/path;
mirror --reverse --delete --verbose
"
```

## Recommended Approach

**Use the custom `deploy.php` script** I created because:

1. ✅ **No dependencies** - Pure PHP
2. ✅ **Simple configuration** - Edit variables at top
3. ✅ **Reliable** - No version conflicts
4. ✅ **Customizable** - Easy to modify
5. ✅ **Cross-platform** - Works on Windows/Mac/Linux

## Configuration

Edit `deploy.php` and update:

```php
$config = [
    'staging' => [
        'host' => 'your-actual-staging-server.com',
        'username' => 'your-actual-username',
        'password' => 'your-actual-password',
        'remote_path' => '/public_html/staging/',
        'port' => 21,
        'passive' => true
    ],
    'production' => [
        'host' => 'your-actual-production-server.com',
        'username' => 'your-actual-username', 
        'password' => 'your-actual-password',
        'remote_path' => '/public_html/',
        'port' => 21,
        'passive' => true
    ]
];
```

## Usage Examples

```bash
# Deploy to staging
php deploy.php staging

# Deploy to production
php deploy.php production

# Test FTP connection first
php -r "
$conn = ftp_connect('your-server.com', 21);
if (ftp_login($conn, 'username', 'password')) {
    echo 'FTP connection successful!';
} else {
    echo 'FTP connection failed!';
}
ftp_close($conn);
"
```

## Security Notes

1. **Never commit passwords** to version control
2. **Use environment variables** for sensitive data
3. **Test on staging** before production
4. **Create FTP users** with limited permissions
5. **Use SFTP** when possible (requires modification)

## Troubleshooting

### Connection Issues
- Verify FTP credentials
- Check firewall settings
- Test with FTP client (FileZilla)
- Ensure passive mode setting

### Permission Issues  
- Check FTP user permissions
- Verify remote path exists
- Ensure write permissions on server

### File Upload Issues
- Check file size limits
- Verify file permissions
- Test with smaller files first