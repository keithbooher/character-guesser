'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function JoinPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length !== 6) {
      setError('Code must be 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/sessions/${trimmed}`);
      if (!res.ok) {
        setError('Session not found. Check the code and try again.');
        return;
      }
      router.push(`/play/${trimmed}/p2`);
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

        <div className="text-4xl mb-4">🎯</div>
        <h1 className="text-3xl font-bold text-white mb-2">Join a Game</h1>
        <p className="text-gray-400 mb-8">Enter the 6-character code from your partner</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Game Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-4 text-white text-2xl text-center tracking-[0.3em] placeholder-gray-600 focus:outline-none focus:border-[#a855f7] font-mono uppercase"
              autoComplete="off"
              autoCapitalize="characters"
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || code.trim().length !== 6}
            className="w-full py-4 bg-[#a855f7] text-white rounded-xl text-lg font-semibold hover:bg-[#9333ea] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Joining...' : 'Join Game →'}
          </button>
        </form>
      </div>
    </main>
  );
}
