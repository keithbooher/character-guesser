import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Character Guesser';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0f0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🎭</div>
        <div style={{ fontSize: 56, fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
          Character Guesser
        </div>
        <div style={{ fontSize: 28, color: '#a855f7', textAlign: 'center', maxWidth: 800, lineHeight: 1.4 }}>
          Find characters both players know for your headband game
        </div>
        <div style={{ fontSize: 20, color: '#666', marginTop: 32 }}>
          170+ movies, TV shows, anime &amp; games
        </div>
      </div>
    ),
    { ...size }
  );
}
