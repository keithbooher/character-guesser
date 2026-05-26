'use client';

import { useEffect, useState } from 'react';

type Suggestion = {
  id: number;
  title: string;
  type: string;
  notes: string | null;
  submittedAt: string;
  reviewed: boolean;
};

const TYPE_COLORS: Record<string, string> = {
  movie: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  tv: 'bg-green-500/20 text-green-300 border-green-500/30',
  game: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  anime: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  cartoon: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  manga: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  other: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

const TYPE_LABELS: Record<string, string> = {
  movie: 'Movie',
  tv: 'TV Show',
  game: 'Video Game',
  anime: 'Anime',
  cartoon: 'Cartoon',
  manga: 'Manga',
  other: 'Other',
};

export default function SuggestionsReviewPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/suggestions');
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function markReviewed(id: number) {
    setMarkingId(id);
    try {
      const res = await fetch(`/api/suggestions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewed: true }),
      });
      if (res.ok) {
        setSuggestions(prev => prev.filter(s => s.id !== id));
      }
    } finally {
      setMarkingId(null);
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">IP Suggestions</h1>
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : (
            <p className="text-gray-500 text-sm">
              {suggestions.length > 0
                ? `${suggestions.length} pending suggestion${suggestions.length === 1 ? '' : 's'}`
                : 'No pending suggestions 🎉'}
            </p>
          )}
        </div>

        {!loading && suggestions.length > 0 && (
          <div className="space-y-3">
            {suggestions.map(s => (
              <div
                key={s.id}
                className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-white font-semibold">{s.title}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${TYPE_COLORS[s.type] ?? TYPE_COLORS.other}`}
                    >
                      {TYPE_LABELS[s.type] ?? s.type}
                    </span>
                  </div>
                  {s.notes && (
                    <p className="text-gray-400 text-sm mb-1">{s.notes}</p>
                  )}
                  <p className="text-gray-600 text-xs">{formatDate(s.submittedAt)}</p>
                </div>
                <button
                  onClick={() => markReviewed(s.id)}
                  disabled={markingId === s.id}
                  className="shrink-0 px-4 py-2 bg-[#a855f7]/20 border border-[#a855f7] text-[#a855f7] rounded-lg text-sm font-medium hover:bg-[#a855f7]/30 transition-colors disabled:opacity-50 mt-2 sm:mt-0"
                >
                  {markingId === s.id ? 'Marking...' : 'Mark Reviewed'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
