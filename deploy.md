# PHPloy Deployment Guide

## Installation

### Option 1: Download PHPloy Binary
1. Download the latest PHPloy from: https://github.com/banago/PHPloy/releases
2. Place the `phploy.phar` file in your project root
3. Make it executable: `chmod +x phploy.phar`

### Option 2: Install via Composer (Recommended)
```bash
composer global require banago/phploy
```

### Option 3: Install via NPM
```bash
npm install -g phploy
```

## Configuration

1. **Edit `phploy.ini`** with your server details:
   - Replace `your-staging-server.com` with your staging server
   - Replace `your-production-server.com` with your production server
   - Update FTP/SFTP credentials
   - Adjust paths as needed

2. **Security Note**: 
   - Never commit `phploy.ini` with real credentials to version control
   - Consider using environment variables or a separate config file

## Usage

### Deploy to Staging
```bash
phploy -s staging
```

### Deploy to Production
```bash
phploy -s production
```

### First Time Deployment
```bash
phploy -s staging --sync
```

### Deploy Specific Files
```bash
phploy -s staging --sync assets/
```

### Rollback Deployment
```bash
phploy -s production --rollback
```

## Common Commands

- `phploy --list` - List all configured servers
- `phploy --version` - Show PHPloy version
- `phploy -s staging --dry-run` - Preview what will be deployed
- `phploy -s production --force` - Force deployment (ignore conflicts)

## File Structure

```
project/
├── phploy.ini          # Configuration file
├── .phploy             # Deployment log (auto-generated)
├── index2.html         # Your main file
├── assets/             # Assets folder
│   ├── js/
│   └── img/
└── deploy.md           # This guide
```

## Troubleshooting

### Connection Issues
- Check FTP/SFTP credentials
- Verify server hostname and port
- Test connection with FTP client first

### Permission Issues
- Ensure FTP user has write permissions
- Check file/folder permissions on server

### Large Files
- Consider excluding large files in `phploy.ini`
- Use `skip[]` directive for unnecessary files

## Security Best Practices

1. **Use SFTP instead of FTP** when possible
2. **Create separate FTP users** for deployment
3. **Limit FTP user permissions** to web directory only
4. **Use strong passwords** or SSH keys
5. **Keep credentials secure** - don't commit to Git

## Example Workflow

1. Make changes to your code
2. Commit changes to Git: `git add . && git commit -m "Update testimonials"`
3. Deploy to staging: `phploy -s staging`
4. Test on staging server
5. Deploy to production: `phploy -s production`

## Environment Variables (Optional)

You can use environment variables instead of hardcoding credentials:

```ini
[production]
scheme = ftp
host = ${FTP_HOST}
user = ${FTP_USER}
pass = ${FTP_PASS}
path = /public_html/
```

Then set environment variables:
```bash
export FTP_HOST=your-server.com
export FTP_USER=your-username
export FTP_PASS=your-password
```