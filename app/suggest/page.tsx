'use client';

import { useState } from 'react';
import Link from 'next/link';

const VALID_TYPES = [
  { value: 'movie', label: 'Movie' },
  { value: 'tv', label: 'TV Show' },
  { value: 'game', label: 'Video Game' },
  { value: 'anime', label: 'Anime' },
  { value: 'cartoon', label: 'Cartoon' },
  { value: 'manga', label: 'Manga' },
  { value: 'other', label: 'Other' },
];

export default function SuggestPage() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('movie');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), type, notes: notes.trim() || undefined }),
      });
      if (res.ok) {
        setStatus('done');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  function reset() {
    setTitle('');
    setType('movie');
    setNotes('');
    setStatus('idle');
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💡</div>
          <h1 className="text-3xl font-bold text-white mb-2">Suggest an IP</h1>
          <p className="text-gray-400 text-sm">
            Missing a show, movie, or game? Let us know and we'll add it.
          </p>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6">
          {status === 'done' ? (
            <div className="text-center py-4">
              <div className="text-3xl mb-3">✅</div>
              <p className="text-white font-semibold mb-1">Thanks for the suggestion!</p>
              <p className="text-gray-400 text-sm mb-6">We'll review it and add it if it's a good fit.</p>
              <button
                onClick={reset}
                className="text-[#a855f7] hover:underline text-sm"
              >
                Suggest another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Breaking Bad"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#a855f7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#a855f7]"
                >
                  {VALID_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">
                  Any notes? <span className="text-gray-600">(optional)</span>
                </label>
                <textarea
                  placeholder="Characters you'd expect, etc."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0f0f0f] border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-[#a855f7] resize-none"
                />
              </div>
              {status === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-[#a855f7] text-white rounded-xl font-semibold hover:bg-[#9333ea] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Submit Suggestion'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
