'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewGamePage() {
  const router = useRouter();
  const [mode, setMode] = useState<'online' | 'local'>('online');
  const [p1Email, setP1Email] = useState('');
  const [p2Email, setP2Email] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, p1Email: p1Email || undefined, p2Email: p2Email || undefined }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create session');
        return;
      }

      router.push(`/play/${data.code}`);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Link href="/" className="text-gray-500 hover:text-white text-sm mb-6 block">
          ← Back
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Start a New Game</h1>
        <p className="text-gray-400 mb-8">Set up a session for two players</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Game Mode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('online')}
                className={`p-4 rounded-xl border-2 text-left transition-colors ${
                  mode === 'online'
                    ? 'border-[#a855f7] bg-[#a855f7]/10'
                    : 'border-gray-700 bg-[#1a1a1a] hover:border-gray-500'
                }`}
              >
                <div className="text-2xl mb-1">📱</div>
                <div className="font-semibold text-white">Online</div>
                <div className="text-xs text-gray-400 mt-1">Separate devices. Share a code with your partner.</div>
              </button>
              <button
                type="button"
                onClick={() => setMode('local')}
                className={`p-4 rounded-xl border-2 text-left transition-colors ${
                  mode === 'local'
                    ? 'border-[#a855f7] bg-[#a855f7]/10'
                    : 'border-gray-700 bg-[#1a1a1a] hover:border-gray-500'
                }`}
              >
                <div className="text-2xl mb-1">🤝</div>
                <div className="font-semibold text-white">Local</div>
                <div className="text-xs text-gray-400 mt-1">Same device. Pass phone between players.</div>
              </button>
            </div>
          </div>

          {/* Email fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Player 1 Email <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="email"
                value={p1Email}
                onChange={(e) => setP1Email(e.target.value)}
                placeholder="player1@example.com"
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#a855f7]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Player 2 Email <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="email"
                value={p2Email}
                onChange={(e) => setP2Email(e.target.value)}
                placeholder="player2@example.com"
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#a855f7]"
              />
            </div>
            <p className="text-xs text-gray-500">
              If provided, we'll email each player their partner's character so they know what to write on the forehead card.
            </p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#a855f7] text-white rounded-xl text-lg font-semibold hover:bg-[#9333ea] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Game →'}
          </button>
        </form>
      </div>
    </main>
  );
}
