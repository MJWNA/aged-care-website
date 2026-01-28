# 🏥 Aged Care Information Website

Professional aged care information and provider matching website built with **Astro** and **React**. Features lead generation, provider comparison tools, and comprehensive information about Australia's aged care system.

[![Live Preview](https://img.shields.io/badge/Live-Preview-blue)](https://agedcareinformation.com.au)
[![Astro](https://img.shields.io/badge/Astro-5.13.5-orange)](https://astro.build)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/MJWNA/aged-care-website.git
cd aged-care-website

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# Visit: http://localhost:3000
```

---

## 📦 What's Included

### **40+ React Components**
- ✅ Hero section with video background
- ✅ Interactive navigation with mobile menu
- ✅ Lead generation forms (with popup every 2 minutes)
- ✅ Provider comparison tool
- ✅ Testimonials carousel
- ✅ FAQ accordion
- ✅ Social proof indicators
- ✅ QR code generator
- ✅ Mobile sticky CTA
- ✅ And 30+ more components!

### **2 Main Pages**
- `/` - Main landing page
- `/qr-code` - QR code generator and download

### **Key Features**
- 📱 Fully responsive (mobile-first design)
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast loading (Astro SSG)
- 🔍 SEO optimized
- 📊 Analytics ready
- 🎯 Conversion optimized
- 🌐 WhatsApp integration
- 💬 Live chat ready

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Astro** | 5.13.5 | Static site generation |
| **React** | 19.1.1 | Interactive components |
| **TypeScript** | Latest | Type safety |
| **Tailwind CSS** | 4.1.11 | Styling |
| **shadcn/ui** | Latest | UI components |
| **Cloudflare Workers** | - | Deployment target |

---

## 📁 Project Structure

```
aged-care-website/
├── src/
│   ├── components/          # 40+ React components
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── LeadForm.tsx
│   │   ├── LeadFormPopup.tsx
│   │   ├── FAQ.tsx
│   │   └── ... (35+ more)
│   │
│   ├── pages/              # Astro pages
│   │   ├── index.astro     # Main landing page
│   │   └── qr-code.astro   # QR code page
│   │
│   ├── layouts/            # Page layouts
│   │   └── main.astro      # Main layout with SEO
│   │
│   ├── styles/             # Global styles
│   │   └── global.css
│   │
│   └── site-components/    # Webflow components
│       ├── Navigation.jsx
│       ├── Footer.jsx
│       └── DevLinkProvider.jsx
│
├── generated/              # Webflow-generated assets
│   ├── webflow.css
│   └── fonts.css
│
├── public/                 # Static assets
│   ├── _headers
│   └── _redirects
│
└── Configuration files
    ├── astro.config.mjs
    ├── tsconfig.json
    ├── package.json
    └── wrangler.jsonc
```

---

## 🎨 Design System

The website uses a custom color scheme optimized for aged care:

```css
--aged-primary: #4a7c9e;      /* Professional blue */
--aged-secondary: #2c3e50;    /* Dark slate */
--aged-accent: #f4b400;       /* Warm gold */
--aged-bg: #f7f9fb;           /* Light background */
--aged-text: #2d3748;         /* Dark text */
```

---

## 📱 Key Components

### **Navigation**
- Sticky header with logo
- Mobile hamburger menu
- Phone number: **1800 303 101**
- CTA button

### **Hero Section**
- Video background
- Clear value proposition
- Lead capture form
- Trust indicators

### **Lead Form Popup**
- Appears every 2 minutes
- Easy to close
- Collects: name, phone, email, message
- WhatsApp quick action

### **QR Code Generator**
- Links to: https://agedcareinformation.com.au
- Downloadable in multiple sizes
- Print-ready format

---

## 🚢 Deployment Options

### **Option 1: Cloudflare Pages (Recommended)**

```bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Build and deploy
npm run build
wrangler pages deploy dist
```

### **Option 2: Netlify**

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build
npm run build

# 3. Deploy
netlify deploy --prod
```

### **Option 3: Vercel**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod
```

---

## 🔧 Environment Variables

Create a `.env` file (not included in git for security):

```env
WEBFLOW_API_HOST=https://api.webflow.com
WEBFLOW_SITE_API_TOKEN=your_site_token_here
WEBFLOW_CMS_SITE_API_TOKEN=your_cms_token_here
```

⚠️ **Never commit `.env` to git!**

---

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+
- 🎯 **First Contentful Paint**: < 1s
- 📦 **Bundle Size**: ~500KB (excluding node_modules)
- 📱 **Mobile Optimized**: 30-40% less scrolling

---

## 🔍 SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Schema.org structured data (LocalBusiness, Service)
- ✅ Canonical URLs
- ✅ Sitemap ready
- ✅ Robots.txt friendly

---

## 📞 Contact Information

**Phone:** 1800 303 101  
**Website:** https://agedcareinformation.com.au  
**Service Area:** Australia-wide

---

## 🎯 Lead Generation

The website includes multiple conversion points:

1. **Hero Form** - Above the fold
2. **Popup Form** - Every 2 minutes
3. **Mobile CTA** - Sticky bottom bar
4. **WhatsApp Button** - Floating widget
5. **Footer Form** - End of page

---

## 🧪 Testing

```bash
# Run type checking
npm run astro check

# Preview production build
npm run preview

# Build for production
npm run build
```

---

## 📚 Documentation

Additional documentation files:

- `FEATURES_ADDED.md` - Complete feature list
- `QUICK_START.md` - Setup guide
- `PUSH_TO_GITHUB.md` - Git instructions
- `COMPETITIVE_ANALYSIS.md` - Market analysis
- `MARKETING_OPTIMIZATION_SUMMARY.md` - Marketing features

---

## 🤝 Contributing

This is a client project. For changes:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request

---

## 📜 License

Proprietary - © 2026 Aged Care Information

---

## 🆘 Need Help?

**For setup issues:**
- Check `QUICK_START.md`
- Ensure Node.js 18+ is installed
- Run `npm install` first

**For deployment issues:**
- Check `PUSH_TO_GITHUB.md`
- Verify environment variables
- Check build output

**For feature questions:**
- See `FEATURES_ADDED.md`
- Check component files in `src/components/`

---

## 🎉 Credits

Built with ❤️ using:
- [Astro](https://astro.build)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Webflow](https://webflow.com)

---

**Last Updated:** January 2026  
**Version:** 1.0.0
