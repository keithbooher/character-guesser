import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Character Guesser',
  description: 'The app that picks the perfect characters for your headband guessing game',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white min-h-screen">{children}</body>
    </html>
  );
}
