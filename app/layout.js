import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: {
    default: 'Luxury Jewels | Premium Jewellery Collections',
    template: '%s | Luxury Jewels'
  },
  description: 'Discover exclusive luxury jewellery collections crafted with precision and elegance. Fine jewellery, diamonds, and precious gems for every occasion.',
  keywords: ['luxury jewellery', 'diamond rings', 'gold necklaces', 'premium jewellery', 'fine jewellery', 'bridal collection'],
  authors: [{ name: 'Luxury Jewels' }],
  creator: 'Luxury Jewels',
  publisher: 'Luxury Jewels',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://luxuryjewels.com',
    title: 'Luxury Jewels | Premium Jewellery Collections',
    description: 'Discover exclusive luxury jewellery collections crafted with precision and elegance.',
    siteName: 'Luxury Jewels',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Luxury Jewels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Jewels | Premium Jewellery Collections',
    description: 'Discover exclusive luxury jewellery collections crafted with precision and elegance.',
    images: ['/twitter-image.png'],
    creator: '@luxuryjewels',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#212121' },
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#d4af37',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#d4af37" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-charcoal-900 antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
        {/* Loading Spinner for page transitions */}
        <div id="loading-spinner" className="fixed inset-0 bg-white z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full absolute top-0 animate-spin"></div>
          </div>
        </div>
        
        {/* Back to Top Button */}
        <button
          id="back-to-top"
          className="fixed bottom-8 right-8 w-12 h-12 bg-gold text-white rounded-none shadow-lg hover:bg-gold-dark transition-all duration-300 opacity-0 translate-y-10 z-40 flex items-center justify-center"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        
        {/* Script for interactive elements */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Back to top button functionality
              const backToTopButton = document.getElementById('back-to-top');
              const loadingSpinner = document.getElementById('loading-spinner');
              
              window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                  backToTopButton.classList.remove('opacity-0', 'translate-y-10');
                  backToTopButton.classList.add('opacity-100', 'translate-y-0');
                } else {
                  backToTopButton.classList.remove('opacity-100', 'translate-y-0');
                  backToTopButton.classList.add('opacity-0', 'translate-y-10');
                }
              });
              
              backToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              });
              
              // Loading state for page transitions
              const links = document.querySelectorAll('a[href^="/"]');
              links.forEach(link => {
                link.addEventListener('click', (e) => {
                  if (link.target === '_blank' || link.hasAttribute('download')) return;
                  
                  const href = link.getAttribute('href');
                  if (href && href.startsWith('/') && !href.startsWith('/#')) {
                    e.preventDefault();
                    loadingSpinner.classList.remove('opacity-0', 'pointer-events-none');
                    loadingSpinner.classList.add('opacity-100');
                    
                    setTimeout(() => {
                      window.location.href = href;
                    }, 300);
                  }
                });
              });
              
              // Hide loading spinner when page loads
              window.addEventListener('load', () => {
                setTimeout(() => {
                  loadingSpinner.classList.add('opacity-0', 'pointer-events-none');
                  loadingSpinner.classList.remove('opacity-100');
                }, 500);
              });
            `
          }}
        />
      </body>
    </html>
  );
}