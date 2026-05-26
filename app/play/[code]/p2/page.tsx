'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

type IP = {
  id: number;
  title: string;
  type: string;
  decade: string | null;
};

const typeBadgeColors: Record<string, string> = {
  movie: 'bg-blue-600',
  tv: 'bg-purple-600',
  game: 'bg-orange-600',
  anime: 'bg-red-600',
  cartoon: 'bg-yellow-600',
  manga: 'bg-pink-600',
};

export default function P2SwipePage() {
  const params = useParams();
  const code = (params.code as string).toUpperCase();
  const router = useRouter();

  const [ips, setIps] = useState<IP[]>([]);
  const [current, setCurrent] = useState(0);
  const [selections, setSelections] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sessionValid, setSessionValid] = useState(true);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    async function loadData() {
      const sessionRes = await fetch(`/api/sessions/${code}`);
      if (!sessionRes.ok) {
        setSessionValid(false);
        setLoading(false);
        return;
      }
      const session = await sessionRes.json();

      // If already done, redirect
      if (session.p2Done) {
        router.replace(`/play/${code}/done`);
        return;
      }

      const ipsRes = await fetch('/api/ips');
      if (!ipsRes.ok) { setLoading(false); return; }
      const data = await ipsRes.json();
      setIps(data);
      setLoading(false);
    }
    loadData();
  }, [code, router]);

  const handleChoice = useCallback((known: boolean) => {
    const ip = ips[current];
    if (!ip) return;
    const newSels = { ...selections, [ip.id]: known };
    setSelections(newSels);
    if (current + 1 >= ips.length) {
      submitSelections(newSels);
    } else {
      setCurrent((c) => c + 1);
    }
  }, [current, ips, selections]);

  async function submitSelections(finalSelections: Record<number, boolean>) {
    setSubmitting(true);
    const selArray = Object.entries(finalSelections).map(([ipId, known]) => ({
      ipId: parseInt(ipId),
      known,
    }));

    try {
      await fetch(`/api/sessions/${code}/select`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: 2, selections: selArray }),
      });
      router.push(`/play/${code}/done`);
    } catch {
      setSubmitting(false);
    }
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      handleChoice(diff > 0);
    }
    touchStartX.current = null;
  }

  if (!sessionValid) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-5xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-white mb-2">Session Not Found</h1>
        <p className="text-gray-400 mb-6">That code doesn't exist.</p>
        <Link href="/" className="px-6 py-3 bg-[#a855f7] text-white rounded-xl font-semibold hover:bg-[#9333ea]">
          Go Home
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </main>
    );
  }

  const ip = ips[current];
  const progress = ips.length > 0 ? Math.round((current / ips.length) * 100) : 0;

  return (
    <main
      className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-between px-4 py-6 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Player 2</span>
          <span className="text-gray-400 text-sm font-mono">{current + 1} / {ips.length}</span>
        </div>
        <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#a855f7] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* IP Card */}
      {ip && (
        <div className="w-full max-w-sm flex-1 flex flex-col items-center justify-center py-8">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 w-full text-center shadow-xl border border-gray-800">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${typeBadgeColors[ip.type] || 'bg-gray-600'}`}>
                {ip.type.toUpperCase()}
              </span>
              {ip.decade && (
                <span className="ml-2 inline-block px-3 py-1 rounded-full text-xs font-semibold text-gray-300 bg-gray-800">
                  {ip.decade}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white leading-tight">{ip.title}</h2>
          </div>
          <p className="text-gray-600 text-sm mt-6">← Swipe or use buttons below →</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <button
          onClick={() => handleChoice(false)}
          disabled={submitting}
          className="py-5 bg-red-500/20 border-2 border-red-500 text-red-400 rounded-2xl text-lg font-semibold hover:bg-red-500/30 active:scale-95 transition-all disabled:opacity-50"
        >
          ❌ Never Seen It
        </button>
        <button
          onClick={() => handleChoice(true)}
          disabled={submitting}
          className="py-5 bg-green-500/20 border-2 border-green-500 text-green-400 rounded-2xl text-lg font-semibold hover:bg-green-500/30 active:scale-95 transition-all disabled:opacity-50"
        >
          ✅ I Know This!
        </button>
      </div>
    </main>
  );
}
