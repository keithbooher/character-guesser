import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Character Guesser',
  description: 'The app that picks the perfect characters for your headband guessing game',
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
