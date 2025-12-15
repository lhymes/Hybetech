// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Site URL for sitemap and canonical URLs
  site: 'https://www.hybe.tech',

  // Output mode: static for Cloudflare Pages / AWS Lightsail
  output: 'static',

  // Integrations
  integrations: [
    // React for interactive islands (Motion animations)
    react(),

    // Tailwind CSS
    tailwind({
      // Use our custom config
      configFile: './tailwind.config.ts',
      // Don't inject base styles (we handle this in global.css)
      applyBaseStyles: false,
    }),

    // Sitemap generation
    sitemap({
      // Exclude draft pages
      filter: (page) => !page.includes('/draft/'),
      // Custom serializer for better control
      serialize(item) {
        // Set higher priority for main pages
        if (item.url === 'https://www.hybe.tech/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        if (item.url.includes('/services/')) {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }
        if (item.url.includes('/blog/') || item.url.includes('/case-studies/')) {
          return { ...item, priority: 0.7, changefreq: 'weekly' };
        }
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      },
    }),
  ],

  // Vite configuration
  vite: {
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'motion', 'lucide-react'],
    },
    // Build optimization
    build: {
      // Inline small assets
      assetsInlineLimit: 4096,
      // Chunk splitting strategy
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['motion'],
          },
        },
      },
    },
  },

  // Image optimization
  image: {
    // Use sharp for image processing
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // Prefetch disabled - can cause mobile link issues
  // prefetch: {
  //   prefetchAll: true,
  //   defaultStrategy: 'viewport',
  // },

  // Markdown configuration
  markdown: {
    // Enable syntax highlighting
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  // Server configuration for development
  server: {
    port: 4321,
    host: true,
  },

  // Disable dev toolbar (it won't appear in production anyway)
  devToolbar: {
    enabled: false,
  },
});
