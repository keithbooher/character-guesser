'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

function SuggestForm() {
  const [open, setOpen] = useState(false);
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

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-gray-500 hover:text-gray-300 text-sm underline underline-offset-2 transition-colors"
      >
        Suggest a Movie, Show, or Game
      </button>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-5 text-left">
      {status === 'done' ? (
        <p className="text-green-400 text-sm text-center py-2">Thanks! We'll review it.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-400 text-xs mb-1">Title</label>
            <input
              type="text"
              placeholder="e.g. Breaking Bad"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#a855f7]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#a855f7]"
            >
              {VALID_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">Any notes? <span className="text-gray-600">(optional)</span></label>
            <textarea
              placeholder="Characters you'd expect, etc."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-[#0f0f0f] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#a855f7] resize-none"
            />
          </div>
          {status === 'error' && (
            <p className="text-red-400 text-xs">Something went wrong. Try again.</p>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-1 py-2 bg-[#a855f7]/20 border border-[#a855f7] text-[#a855f7] rounded-lg text-sm font-semibold hover:bg-[#a855f7]/30 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

type Character = {
  id: number;
  name: string;
  ip: { title: string };
};

type SessionData = {
  id: string;
  code: string;
  mode: string;
  p1Email: string | null;
  p2Email: string | null;
  p1CharacterId: number | null;
  p2CharacterId: number | null;
  p1Done: boolean;
  p2Done: boolean;
};

export default function DonePage() {
  const params = useParams();
  const code = (params.code as string).toUpperCase();

  const [session, setSession] = useState<SessionData | null>(null);
  const [p1Char, setP1Char] = useState<Character | null>(null);
  const [p2Char, setP2Char] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [p1Revealed, setP1Revealed] = useState(false);
  const [p2Revealed, setP2Revealed] = useState(false);
  const [notReady, setNotReady] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const res = await fetch(`/api/sessions/${code}`);
      if (!res.ok) { setLoading(false); return; }
      const data: SessionData = await res.json();
      setSession(data);

      if (!data.p1CharacterId || !data.p2CharacterId) {
        // Characters not assigned yet
        setNotReady(true);
        setLoading(false);
        return;
      }

      // Load characters
      const [c1Res, c2Res] = await Promise.all([
        fetch(`/api/characters/${data.p1CharacterId}`),
        fetch(`/api/characters/${data.p2CharacterId}`),
      ]);

      if (c1Res.ok && c2Res.ok) {
        const [c1, c2] = await Promise.all([c1Res.json(), c2Res.json()]);
        setP1Char(c1);
        setP2Char(c2);
      }

      setLoading(false);
    }
    loadSession();
  }, [code]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading results...</div>
      </main>
    );
  }

  if (notReady) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-5xl mb-4">⏳</div>
        <h1 className="text-2xl font-bold text-white mb-2">Waiting for both players...</h1>
        <p className="text-gray-400 mb-6">Characters will be assigned once both players finish swiping.</p>
        <Link href="/" className="text-[#a855f7] hover:underline">Go Home</Link>
      </main>
    );
  }

  const emailsProvided = session?.p1Email || session?.p2Email;

  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full text-center">
        <div className="text-5xl mb-3">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-2">Characters Assigned!</h1>

        {emailsProvided ? (
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-6 py-4 mb-8">
            <p className="text-gray-300 text-sm">
              {session?.p1Email && (
                <span>Sent {session.p1Email.split('@')[0]}'s character to their email</span>
              )}
              {session?.p1Email && session?.p2Email && <span> and </span>}
              {session?.p2Email && (
                <span>sent {session.p2Email.split('@')[0]}'s character to their email</span>
              )}
              . Check your inboxes!
            </p>
          </div>
        ) : (
          <p className="text-gray-400 mb-8 text-sm">
            Tap "Reveal" to see your partner's character — make sure they look away first!
          </p>
        )}

        <div className="space-y-4 mb-8">
          {/* Player 1 card */}
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6">
            <div className="text-gray-400 text-sm mb-3 font-medium">PLAYER 1's character (for P2 to see)</div>
            {p1Revealed || emailsProvided ? (
              <div>
                <div className="text-2xl font-bold text-white mb-1">{p2Char?.name}</div>
                <div className="text-gray-500 text-sm">from {p2Char?.ip.title}</div>
              </div>
            ) : (
              <button
                onClick={() => setP1Revealed(true)}
                className="w-full py-3 bg-[#a855f7]/20 border border-[#a855f7] text-[#a855f7] rounded-xl font-semibold hover:bg-[#a855f7]/30 transition-colors"
              >
                🫣 P1: Reveal Your Partner's Character
              </button>
            )}
          </div>

          {/* Player 2 card */}
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6">
            <div className="text-gray-400 text-sm mb-3 font-medium">PLAYER 2's character (for P1 to see)</div>
            {p2Revealed || emailsProvided ? (
              <div>
                <div className="text-2xl font-bold text-white mb-1">{p1Char?.name}</div>
                <div className="text-gray-500 text-sm">from {p1Char?.ip.title}</div>
              </div>
            ) : (
              <button
                onClick={() => setP2Revealed(true)}
                className="w-full py-3 bg-[#a855f7]/20 border border-[#a855f7] text-[#a855f7] rounded-xl font-semibold hover:bg-[#a855f7]/30 transition-colors"
              >
                🫣 P2: Reveal Your Partner's Character
              </button>
            )}
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-6 py-4 mb-8">
          <p className="text-gray-400 text-sm">
            Now write the characters on sticky notes and put them on each other's foreheads. Take turns asking yes/no questions to figure out who you are!
          </p>
        </div>

        <Link
          href="/new"
          className="inline-block px-8 py-4 bg-[#a855f7] text-white rounded-xl text-lg font-semibold hover:bg-[#9333ea] transition-colors"
        >
          Play Again
        </Link>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-xs mb-3">Didn't see something you know?</p>
          <SuggestForm />
        </div>
      </div>
    </main>
  );
}
