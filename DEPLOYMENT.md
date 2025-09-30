# Deployment Guide - Legali Web App

## Netlify Deployment

Aplikasi Legali sudah dikonfigurasi untuk deployment ke Netlify dengan static site generation.

### Prerequisites

- Node.js 18+
- npm atau yarn
- Akun Netlify

### Build Commands

```bash
# Install dependencies
npm install

# Build untuk production
npm run build

# Preview build lokal
npm run preview
```

### Netlify Configuration

File `netlify.toml` sudah dikonfigurasi dengan:

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18
- **Redirect Rules**: SPA routing support
- **Security Headers**: XSS protection, content type options, dll.
- **Cache Headers**: Static assets caching

### Deployment Steps

#### Option 1: Git-based Deployment (Recommended)

1. Push code ke GitHub repository
2. Login ke Netlify dashboard
3. Klik "New site from Git"
4. Pilih repository dan branch
5. Netlify akan otomatis detect konfigurasi dari `netlify.toml`

#### Option 2: Manual Deployment

1. Jalankan `npm run build`
2. Zip folder `dist`
3. Drag & drop ke Netlify dashboard

#### Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### Environment Variables

Jika diperlukan, tambahkan environment variables di Netlify dashboard:

- `NODE_ENV=production`
- `EXPO_PUBLIC_API_URL` (jika ada)
- Environment variables lainnya sesuai kebutuhan

### Custom Domain

1. Di Netlify dashboard, go to Site settings > Domain management
2. Add custom domain
3. Configure DNS records sesuai instruksi Netlify

### Performance Optimization

- Static assets sudah di-cache dengan `max-age=31536000`
- Service worker di-cache dengan `must-revalidate`
- Gzip compression otomatis di Netlify
- CDN global untuk performa optimal

### Troubleshooting

#### Build Errors
- Pastikan Node.js version 18+
- Clear cache: `npm run build -- --clear`
- Check dependencies: `npm install`

#### Routing Issues
- Pastikan `netlify.toml` redirect rules sudah benar
- Check `app.json` web configuration

#### Performance Issues
- Check bundle size di build output
- Optimize images di `assets/images/`
- Enable Netlify's image optimization

### Monitoring

- Netlify Analytics untuk traffic monitoring
- Build logs di Netlify dashboard
- Error tracking (jika menggunakan service seperti Sentry)

### Security

- HTTPS otomatis di Netlify
- Security headers sudah dikonfigurasi
- Content Security Policy (CSP) bisa ditambahkan jika diperlukan

---

**Note**: Aplikasi ini menggunakan Expo Router dengan static rendering, sehingga semua routes akan di-generate sebagai static HTML files untuk performa optimal.
