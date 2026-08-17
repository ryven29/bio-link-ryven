"use client"
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';

export default function DonatePage() {
  const [glitchText, setGlitchText] = useState('DONASI');
  const [showInfo, setShowInfo] = useState(false);
  const [redirectCount, setRedirectCount] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoStatus, setVideoStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Glitch title effect
  useEffect(() => {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    const originalText = 'DONASI';
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        const glitched = originalText
          .split('')
          .map(char => Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
          .join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 100);
    return () => clearInterval(glitchInterval);
  }, []);

  const handleRedirect = () => {
    let count = 3;
    setRedirectCount(count);
    const timer = setInterval(() => {
      count -= 1;
      setRedirectCount(count);
      if (count === 0) {
        clearInterval(timer);
        window.open('https://kitabisa.com', '_blank');
        setTimeout(() => setRedirectCount(null), 600);
      }
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff', position: 'relative', overflow: 'hidden' }} className="grid-bg">
      <Header />

      <main style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '24px',
        paddingTop: '90px',
        paddingBottom: '56px',
        gap: '0'
      }}>

        {/* ── TITLE ── */}
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 68px)',
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: '8px',
          background: 'linear-gradient(135deg, #fbbf24, #f97316, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-1px'
        }}>
          {glitchText}
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '13px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '36px'
        }}>
          Bersama kita bisa berbuat lebih
        </p>

        {/* ── VIDEO PLAYER ── */}
        <div style={{
          width: '100%',
          maxWidth: '480px',
          marginBottom: '32px',
          borderRadius: '20px',
          overflow: 'hidden',
          border: `1px solid ${videoStatus === 'error' ? 'rgba(239,68,68,0.5)' : 'rgba(14, 165, 233, 0.4)'}`,
          boxShadow: '0 0 40px rgba(14, 165, 233, 0.15), 0 20px 60px rgba(0,0,0,0.6)',
          position: 'relative',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020617'
        }}>
          {/* Glow top bar */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #0ea5e9, #a855f7, transparent)',
            zIndex: 4
          }} />

          {/* Loading state */}
          {videoStatus === 'loading' && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 3,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '12px'
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '3px solid rgba(14,165,233,0.2)',
                borderTopColor: '#0ea5e9',
                animation: 'spin 0.8s linear infinite'
              }} />
              <p style={{ color: '#475569', fontSize: '12px' }}>Memuat video...</p>
            </div>
          )}

          {/* Error state */}
          {videoStatus === 'error' && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 3,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '20px', textAlign: 'center'
            }}>
              <span style={{ fontSize: '32px' }}>⚠️</span>
              <p style={{ color: '#ef4444', fontSize: '13px', fontWeight: '600' }}>Video gagal dimuat</p>
              <p style={{ color: '#475569', fontSize: '11px' }}>
                Pastikan file ada di <code style={{ color: '#94a3b8' }}>public/kitabisa-ads.mp4</code><br />
                dan dev server sudah di-restart
              </p>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setVideoStatus('ready')}
            onError={() => setVideoStatus('error')}
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'cover',
              opacity: videoStatus === 'ready' ? 1 : 0,
              transition: 'opacity 0.4s ease'
            }}
          >
            <source src="/kitabisa-ads.mp4" type="video/mp4" />
          </video>

          {/* Scan-line overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
            pointerEvents: 'none',
            zIndex: 2
          }} />

          {/* Mute toggle button */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              zIndex: 3,
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(14,165,233,0.5)';
              e.currentTarget.style.borderColor = '#0ea5e9';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.55)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>

        {/* ── KITABISA CARD ── */}
        {!showInfo ? (
          /* ── Teaser button ── */
          <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => setShowInfo(true)}
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'linear-gradient(135deg, rgba(14,165,233,0.18), rgba(168,85,247,0.18))',
                border: '1px solid rgba(14, 165, 233, 0.55)',
                borderRadius: '16px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#0ea5e9';
                e.currentTarget.style.boxShadow = '0 0 32px rgba(14, 165, 233, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.55)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                background: 'linear-gradient(135deg, #0ea5e9, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
              }}>🤝</div>
              <div>
                <p style={{
                  fontWeight: '700', fontSize: '16px', marginBottom: '4px',
                  background: 'linear-gradient(to right, #0ea5e9, #a855f7)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>Donasi via Kitabisa.com</p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Tap untuk lihat pesan & info sebelum donasi →</p>
              </div>
            </button>
          </div>
        ) : (
          /* ── Full Info Card ── */
          <div style={{
            width: '100%',
            maxWidth: '480px',
            background: 'rgba(2, 6, 23, 0.92)',
            border: '1px solid rgba(14, 165, 233, 0.45)',
            borderRadius: '20px',
            overflow: 'hidden',
            animation: 'slideDown 0.35s ease'
          }}>

            {/* Card header */}
            <div style={{
              padding: '18px 22px',
              background: 'linear-gradient(135deg, rgba(14,165,233,0.18), rgba(168,85,247,0.18))',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <span style={{ fontSize: '22px' }}>💙</span>
              <p style={{
                fontWeight: '700', fontSize: '17px',
                background: 'linear-gradient(to right, #0ea5e9, #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>Pesan untuk Kamu</p>
            </div>

            {/* Personal message */}
            <div style={{ padding: '22px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{
                fontSize: '14px', lineHeight: '1.9', color: '#cbd5e1',
                fontStyle: 'italic', fontFamily: 'Georgia, serif'
              }}>
                "Terimakasih yang ingin donasi ke saya untuk pengembangan web dan bot ini.
                Namun alangkah baiknya kita donasinya ke{' '}
                <span style={{ color: '#38bdf8', fontWeight: '700', fontStyle: 'normal' }}>Kitabisa.com</span>
                {' '}— platform penggalangan dana terpercaya Indonesia yang sudah menyalurkan lebih dari{' '}
                <span style={{ color: '#fbbf24', fontWeight: '700', fontStyle: 'normal' }}>Rp500 miliar</span>
                {' '}kepada yang membutuhkan. Mari berbagi untuk sesama yang lebih memerlukan bantuan kita! 🙏"
              </p>
            </div>

            {/* Kitabisa stats */}
            <div style={{ padding: '20px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{
                fontSize: '10px', color: '#475569', letterSpacing: '3px',
                marginBottom: '16px', textTransform: 'uppercase'
              }}>ℹ️ Tentang Kitabisa.com</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { icon: '📅', label: 'Berdiri', value: '2013 — Jakarta' },
                  { icon: '💰', label: 'Total Donasi', value: '>Rp500 Miliar' },
                  { icon: '👥', label: 'Pengguna', value: '>7 Juta Orang' },
                  { icon: '🌍', label: 'Inisiatif', value: '170.000+ Sosial' },
                  { icon: '🏥', label: 'Mitra RS', value: '150+ Rumah Sakit' },
                  { icon: '📦', label: 'Donasi/Hari', value: '63.000 Disalurkan' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}>
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                    <p style={{ fontSize: '10px', color: '#475569', marginTop: '6px' }}>{item.label}</p>
                    <p style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: '600', marginTop: '2px' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Founders note */}
            <div style={{ padding: '16px 22px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.7' }}>
                Didirikan oleh <span style={{ color: '#94a3b8' }}>M. Alfatih Timur</span> &amp; <span style={{ color: '#94a3b8' }}>Vikra Ijas</span>.
                Dewan pembina termasuk Prof. Rhenald Kasali (Guru Besar FEB-UI) dan Aldi Haryopratomo (founding CEO GoPay).
                Beroperasi di <span style={{ color: '#94a3b8' }}>34 provinsi</span> Indonesia.
              </p>
            </div>

            {/* CTA buttons */}
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleRedirect}
                disabled={redirectCount !== null}
                style={{
                  width: '100%', padding: '15px',
                  background: redirectCount !== null
                    ? 'rgba(14, 165, 233, 0.25)'
                    : 'linear-gradient(135deg, #0ea5e9, #7c3aed)',
                  border: 'none', borderRadius: '12px',
                  color: '#fff', fontWeight: '700', fontSize: '15px',
                  cursor: redirectCount !== null ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease', letterSpacing: '0.5px'
                }}
                onMouseEnter={e => {
                  if (redirectCount === null) {
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(14, 165, 233, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {redirectCount !== null
                  ? `⏳ Menuju Kitabisa dalam ${redirectCount} detik...`
                  : '🤝 Donasi ke Kitabisa.com →'}
              </button>

              <button
                onClick={() => setShowInfo(false)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(100,116,139,0.4)',
                  borderRadius: '10px',
                  color: '#475569', fontSize: '12px',
                  padding: '10px', cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.borderColor = 'rgba(100,116,139,0.7)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#475569';
                  e.currentTarget.style.borderColor = 'rgba(100,116,139,0.4)';
                }}
              >
                ← Tutup
              </button>
            </div>
          </div>
        )}

      </main>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
