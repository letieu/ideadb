import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'ideaDB - Problems, Ideas & Products Database';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050810',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background Gradients */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(0, 229, 204, 0.15) 0%, rgba(5, 8, 16, 0) 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(255, 77, 77, 0.1) 0%, rgba(5, 8, 16, 0) 70%)',
          borderRadius: '50%',
        }} />

        {/* Content Container */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          zIndex: 10,
        }}>
          {/* Logo & Brand Row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
            <svg
              viewBox="0 0 100 100"
              width="140"
              height="140"
            >
              {/* The Bulb (Idea) - Solid Primary Circle */}
              <circle cx="50" cy="40" r="32" fill="#00e5cc" />

              {/* The Insight - Negative space Lightning Bolt */}
              <path
                d="M52 18 L38 40 H50 L46 62 L62 36 H52 L52 18Z"
                fill="#050810"
                stroke="#050810"
                strokeWidth="2"
              />

              {/* The Base (Database/Foundation) - Single Minimal Line */}
              <rect x="40" y="80" width="20" height="6" rx="3" fill="#8892b0" />

              {/* Accent Sparkle - Top Right (Coral) */}
              <path
                d="M85 15 L88 8 L91 15 L98 18 L91 21 L88 28 L85 21 L78 18 L85 15Z"
                fill="#ff4d4d"
              />
            </svg>
            <div style={{ 
              marginLeft: 30, 
              fontSize: 100, 
              fontWeight: 900, 
              color: 'white',
              letterSpacing: '0.05em',
            }}>
              ideaDB
            </div>
          </div>

          {/* Tagline */}
          <div style={{ 
            fontSize: 42, 
            color: '#8892b0',
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}>
            Discover real-world problems, explore innovative ideas, and find existing products.
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          display: 'flex',
          gap: 40,
          fontSize: 24,
          color: 'rgba(136, 146, 176, 0.5)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        }}>
          <span>Problems</span>
          <span style={{ color: 'rgba(136, 146, 176, 0.2)' }}>|</span>
          <span>Ideas</span>
          <span style={{ color: 'rgba(136, 146, 176, 0.2)' }}>|</span>
          <span>Products</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
