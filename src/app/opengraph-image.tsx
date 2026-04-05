import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ProposalCraft — AI-Powered Business Proposals for Freelancers'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080812',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '-60px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-60px',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Document icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))',
            border: '1px solid rgba(139,92,246,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
            fontSize: '32px',
          }}
        >
          📄
        </div>

        {/* Product name */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: '800',
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #7c3aed 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
            lineHeight: '1',
          }}
        >
          ProposalCraft
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: '400',
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '-0.3px',
            marginBottom: '40px',
          }}
        >
          AI-Powered Business Proposals for Freelancers
        </div>

        {/* Feature chips */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          {['⚡ AI-Generated', '📑 Pro Templates', '🚀 Close Deals Faster'].map((label) => (
            <div
              key={label}
              style={{
                padding: '8px 16px',
                borderRadius: '100px',
                border: '1px solid rgba(139,92,246,0.3)',
                background: 'rgba(139,92,246,0.1)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '15px',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Brand pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #818cf8, #7c3aed)',
            }}
          />
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px' }}>
            by EazyWebNC
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
