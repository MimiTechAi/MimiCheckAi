import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * Vite plugin to generate CSP nonces at build time and inject them into the HTML
 * This enables strict CSP policies without unsafe-inline
 */
export function cspNoncePlugin() {
  let nonce = '';

  return {
    name: 'csp-nonce-plugin',
    apply: 'build',
    
    configResolved() {
      // Generate a random nonce at build time
      nonce = crypto.randomBytes(16).toString('hex');
    },

    transformIndexHtml(html) {
      // Inject nonce into script tags and expose via window.__CSP_NONCE__
      let modified = html.replace(
        /(<script[^>]*)(>)/g,
        `$1 nonce="${nonce}"$2`
      );

      // Inject into style tags as well
      modified = modified.replace(
        /(<style[^>]*)(>)/g,
        `$1 nonce="${nonce}"$2`
      );

      return modified;
    },

    generateBundle(options, _bundle) {
      // Write nonce to a manifest file that can be read by deployment platforms
      const noncePath = path.join(options.dir || 'dist', '.csp-nonce');
      fs.writeFileSync(noncePath, nonce, 'utf-8');
    },
  };
}

// Export nonce generation utility for server-side use
export function generateCSPHeaders(_supabaseUrl, _stripeKey) {
  const nonce = crypto.randomBytes(16).toString('hex');
  
  // Build connect-src dynamically from environment variables
  const connectSrc = [
    "'self'",
    'https://*.supabase.co',
    'wss://*.supabase.co',
    'https://api.stripe.com',
    'https://api.anthropic.com',
    'https://api.openai.com',
  ];

  const cspHeader = {
    'Content-Security-Policy': [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' https://js.stripe.com https://cdn.anthropic.com`,
      `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      `connect-src ${connectSrc.join(' ')}`,
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
      'object-src none',
      'base-uri none',
    ].join('; '),
  };

  return { nonce, cspHeader };
}
