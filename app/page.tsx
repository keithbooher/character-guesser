import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Character Guesser',
  description: 'Pick characters for the headband guessing game. Swipe through movies, TV, anime, and games to find characters both players know.',
  url: 'https://characterguesser.app',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Hero */}
        <div className="mb-8">
          <div className="text-6xl mb-4">🎭</div>
          <h1 className="text-5xl font-bold text-white mb-4">Character Guesser</h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            The app that picks the perfect characters for your next headband game — based on what you both actually know.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/new"
            className="px-8 py-4 bg-[#a855f7] text-white rounded-xl text-lg font-semibold hover:bg-[#9333ea] transition-colors"
          >
            Start New Game
          </Link>
          <Link
            href="/join"
            className="px-8 py-4 bg-[#1a1a1a] text-white rounded-xl text-lg font-semibold border border-gray-700 hover:bg-[#222] transition-colors"
          >
            Join a Game
          </Link>
        </div>

        {/* How it works */}
        <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-white">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="font-semibold text-white mb-2">Rate what you know</h3>
              <p className="text-gray-400 text-sm">
                Both players swipe through movies, shows, games, and anime — marking which ones they know
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-white mb-2">Find shared favorites</h3>
              <p className="text-gray-400 text-sm">
                We find the IPs you both know so characters are recognizable to everyone
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎭</div>
              <h3 className="font-semibold text-white mb-2">Get mystery characters</h3>
              <p className="text-gray-400 text-sm">
                Each player gets a secret character — you know your partner's, they know yours!
              </p>
            </div>
          </div>
        </div>

        {/* Ad placeholder */}
        <div id="ad-bottom" style={{ minHeight: '90px' }} className="bg-[#1a1a1a] rounded-xl flex items-center justify-center text-gray-600 text-sm">
          Advertisement
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
