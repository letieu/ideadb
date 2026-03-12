import { ImageResponse } from 'next/og';
import { getIdeaBySlug } from '@/lib/data';

export const runtime = 'edge';

export const alt = 'Idea detail on ideaDB';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const idea = await getIdeaBySlug(slug);

    if (!idea) {
      return new ImageResponse(
        <div style={{ background: '#050810', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 60 }}>
          Idea Not Found
        </div>
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: '#050810',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '80px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(0, 229, 204, 0.1) 0%, rgba(5, 8, 16, 0) 70%)',
            borderRadius: '50%',
            display: 'flex',
          }} />

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 60, width: '100%' }}>
            <svg
              viewBox="0 0 100 100"
              width="60"
              height="60"
            >
              <circle cx="50" cy="40" r="32" fill="#00e5cc" />
              <path
                d="M52 18 L38 40 H50 L46 62 L62 36 H52 L52 18Z"
                fill="#050810"
                stroke="#050810"
                strokeWidth={2}
              />
              <rect x="40" y="80" width="20" height="6" rx="3" fill="#8892b0" />
              <path
                d="M85 15 L88 8 L91 15 L98 18 L91 21 L88 28 L85 21 L78 18 L85 15Z"
                fill="#ff4d4d"
              />
            </svg>
            <div style={{ 
              marginLeft: 20, 
              fontSize: 40, 
              fontWeight: 900, 
              color: 'white',
              letterSpacing: '0.05em',
              display: 'flex',
            }}>
              ideaDB
            </div>
            <div style={{
              marginLeft: 'auto',
              background: 'rgba(0, 229, 204, 0.1)',
              border: '1px solid rgba(0, 229, 204, 0.2)',
              padding: '8px 16px',
              borderRadius: '20px',
              color: '#00e5cc',
              fontSize: 18,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'flex',
            }}>
              IDEA
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
            <div style={{ 
              fontSize: 72, 
              fontWeight: 900, 
              color: 'white',
              lineHeight: 1.1,
              marginBottom: 30,
              letterSpacing: '-0.02em',
              display: 'flex',
            }}>
              {idea.title}
            </div>

            <div style={{ 
              fontSize: 32, 
              color: '#8892b0',
              fontWeight: 400,
              lineHeight: 1.5,
              marginBottom: 'auto',
              maxHeight: '150px',
              overflow: 'hidden',
              display: 'flex',
            }}>
              {idea.description.length > 200 
                ? idea.description.substring(0, 200).replace(/[#*_`]/g, '') + '...' 
                : idea.description.replace(/[#*_`]/g, '')}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {idea.categories && idea.categories.slice(0, 3).map((cat: any) => (
                  <div key={cat.slug} style={{
                    padding: '8px 20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#f0f4ff',
                    fontSize: 20,
                    fontWeight: 600,
                    marginRight: 20,
                    display: 'flex',
                  }}>
                    {cat.name}
                  </div>
                ))}
              </div>
              {idea.score > 0 && (
                <div style={{
                  marginLeft: 'auto',
                  color: '#8892b0',
                  fontSize: 24,
                  fontWeight: 500,
                  display: 'flex',
                }}>
                  {idea.score} Upvotes
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    return new ImageResponse(
      <div style={{ background: '#050810', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 40 }}>
        ideaDB - Idea Detail
      </div>
    );
  }
}
