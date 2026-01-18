# Ametyst Landing Page - MVP

A minimal, high-converting landing page for Ametyst built with Next.js 15, TypeScript, and Tailwind CSS.

## Overview

This is an MVP landing page designed to validate market interest with minimal technical complexity. It features:

- **Hero Section** with email collection form
- **Footer** with social links and contact information
- **Responsive Design** optimized for mobile and desktop
- **Fast Performance** with optimized images and static generation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
landing-page/
├── app/
│   ├── layout.tsx       # Root layout with metadata and fonts
│   ├── page.tsx         # Main landing page (Hero + Footer)
│   └── globals.css      # Tailwind CSS and global styles
├── components/
│   ├── Hero.tsx         # Hero section with email form
│   └── Footer.tsx       # Footer component
├── public/
│   ├── logo.png         # Main Ametyst logo
│   └── favicon.png      # Favicon
├── package.json
├── tailwind.config.ts   # Tailwind configuration with brand colors
└── tsconfig.json
```

## Brand Colors

- **Primary**: `#490282` (Deep Purple)
- **Secondary**: `#d6daff` (Lavender)
- **Background**: `#f8f8ff` (Off-white)

## Features

### Email Collection Form

- Client-side email validation
- Success message on submission
- No backend required for MVP
- Email logged to console (can be integrated with backend later)

### Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Tested on iPhone, Android, and desktop browsers

### SEO Optimized

- Proper meta tags for search engines
- OpenGraph tags for social sharing
- Twitter card metadata
- Favicon and Apple touch icons

## Deployment to Vercel

### Quick Deploy

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Visit [vercel.com](https://vercel.com) and sign in

3. Click "New Project" and import your repository

4. Vercel will auto-detect Next.js and configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. Click "Deploy"

### Custom Domain Setup

1. Go to your project settings on Vercel

2. Navigate to "Domains"

3. Add your custom domain: `ametyst.xyz`

4. Follow Vercel's instructions to update your DNS settings

5. Vercel will automatically provision SSL certificates

### Environment Variables (Optional)

If you add email collection backend later, add environment variables in Vercel:

1. Go to Project Settings → Environment Variables
2. Add your API keys or webhook URLs
3. Redeploy for changes to take effect

## Post-MVP Enhancements

The following features can be added after validating the MVP:

- [ ] "How It Works" video section
- [ ] Email marketing automation (Mailchimp, ConvertKit)
- [ ] Analytics tracking (Google Analytics, Plausible)
- [ ] A/B testing for copy variations
- [ ] Backend API for email storage
- [ ] Cookie consent banner (GDPR compliance)

## Testing Checklist

### Functional Tests
- [x] Email form accepts valid email addresses
- [x] Email form rejects invalid formats
- [x] Submit button shows success message
- [x] Social links open correct URLs
- [x] Email/phone links work correctly

### Responsive Tests
- [x] Mobile layout works (375px - 768px)
- [x] Desktop layout works (1280px+)
- [x] Typography scales properly
- [x] Images display correctly

### Performance Tests
- [x] Page builds successfully
- [x] No TypeScript errors
- [x] Images optimized (< 100KB combined)
- [x] Static generation working

## Support

For questions or issues:
- **Email**: patrick.pinta@ametyst.xyz
- **Phone**: +39 3466676803
- **X (Twitter)**: [@ametyst_xyz](https://x.com/ametyst_xyz)
- **LinkedIn**: [ametyst-xyz](https://www.linkedin.com/company/ametyst-xyz/)

## License

© 2026 Ametyst. All rights reserved.
