import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://characterguesser.app'),
  title: {
    default: 'Character Guesser — Pick Characters for the Headband Game',
    template: '%s | Character Guesser',
  },
  description: 'The free app that finds characters both players know for the headband guessing game. Swipe through movies, TV shows, anime, and games — we pick the perfect mystery characters for each player.',
  keywords: ['headband game', 'guess the character', 'character guessing game', 'who am I game', 'forehead game', 'party game', 'anime characters', 'movie characters'],
  openGraph: {
    type: 'website',
    siteName: 'Character Guesser',
    title: 'Character Guesser — Pick Characters for the Headband Game',
    description: 'Swipe through 170+ IPs — movies, TV, anime, games — and get perfectly matched mystery characters for your headband game.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Character Guesser' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Character Guesser — Pick Characters for the Headband Game',
    description: 'Swipe through 170+ IPs and get perfectly matched mystery characters for your headband game.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <footer className="text-center py-4 border-t border-gray-800">
          <Link href="/suggest" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
            Suggest an IP
          </Link>
        </footer>
      </body>
    </html>
  );
}
