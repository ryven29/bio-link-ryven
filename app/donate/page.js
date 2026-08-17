"use client"
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

export default function CyberpunkDonatePage() {
  const [glitchText, setGlitchText] = useState('DONATE');
  const [copySuccess, setCopySuccess] = useState('');
  const [showKitabisa, setShowKitabisa] = useState(false);
  const [redirectCount, setRedirectCount] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(''), 2000);
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  useEffect(() => {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    const originalText = 'DONATE';
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

  const handleKitabisaClick = () => {
    setShowKitabisa(true);
  };

  const handleRedirectNow = () => {
    let count = 3;
    setRedirectCount(count);
    const timer = setInterval(() => {
      count -= 1;
      setRedirectCount(count);
      if (count === 0) {
        clearInterval(timer);
        window.open('https://kitabisa.com', '_blank');
        setTimeout(() => setRedirectCount(null), 500);
      }
    }, 1000);
  };

  const mainStyle = {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden'
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    paddingTop: '96px',
    paddingBottom: '48px'
  };

  const titleStyle = {
    fontSize: '60px',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
    marginBottom: '16px',
    background: 'linear-gradient(to right, #fbbf24, #f97316, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const qrisContainerStyle = {
    position: 'relative',
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid rgba(107, 114, 128, 0.5)',
    borderRadius: '12px',
    transition: 'all 0.5s ease',
    cursor: 'pointer'
  };

  const paymentCardStyle = {
    position: 'relative',
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid rgba(107, 114, 128, 0.3)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const footerStyle = {
    position: 'relative',
    marginTop: '48px',
    padding: '24px',
    border: '1px solid rgba(107, 114, 128, 0.5)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'all 0.5s ease'
  };

  return (
    <div style={mainStyle} className="grid-bg">
      <Header />
      <main style={contentStyle}>
        {/* Glitch Title */}
        <h1 style={titleStyle}>{glitchText}</h1>

        {/* Subtitle */}
        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          marginBottom: '40px',
          fontSize: '14px',
          letterSpacing: '1px',
          maxWidth: '420px'
        }}>
          Pilih metode donasi langsung, atau donasikan ke sesama melalui Kitabisa.com 💙
        </p>

        {/* Kitabisa Banner */}
        {!showKitabisa ? (
          <div
            onClick={handleKitabisaClick}
            style={{
              width: '100%',
              maxWidth: '450px',
              marginBottom: '32px',
              padding: '20px 24px',
              background: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(168,85,247,0.15) 100%)',
              border: '1px solid rgba(14, 165, 233, 0.5)',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#0ea5e9';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0ea5e9, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '22px'
            }}>
              🤝
            </div>
            <div style={{ flex: 1 }}>
              <p style={{
                fontWeight: '700',
                fontSize: '15px',
                background: 'linear-gradient(to right, #0ea5e9, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '4px'
              }}>Donasi via Kitabisa.com</p>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Bantu sesama yang lebih membutuhkan →</p>
            </div>
          </div>
        ) : (
          /* Kitabisa Info Card */
          <div style={{
            width: '100%',
            maxWidth: '450px',
            marginBottom: '32px',
            background: 'rgba(0, 0, 0, 0.85)',
            border: '1px solid rgba(14, 165, 233, 0.5)',
            borderRadius: '16px',
            overflow: 'hidden',
            animation: 'fadeIn 0.4s ease'
          }}>
            {/* Card Header */}
            <div style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(168,85,247,0.2))',
              borderBottom: '1px solid rgba(14, 165, 233, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '20px' }}>💙</span>
              <p style={{
                fontWeight: '700',
                fontSize: '16px',
                background: 'linear-gradient(to right, #0ea5e9, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Tentang Kitabisa</p>
            </div>

            {/* Pesan personal */}
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#cbd5e1',
                fontStyle: 'italic'
              }}>
                "Terimakasih yang ingin donasi ke saya untuk pengembangan web dan bot ini. Namun alangkah baiknya kita donasinya ke{' '}
                <span style={{ color: '#0ea5e9', fontWeight: '600' }}>Kitabisa.com</span>{' '}
                — platform penggalangan dana terpercaya yang sudah menyalurkan lebih dari{' '}
                <span style={{ color: '#fbbf24', fontWeight: '600' }}>Rp500 miliar</span>{' '}
                kepada yang membutuhkan. Mari berbagi untuk sesama yang lebih memerlukan bantuan kita! 🙏"
              </p>
            </div>

            {/* Info Kitabisa dari Wikipedia */}
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{
                fontSize: '11px',
                color: '#6b7280',
                letterSpacing: '2px',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>ℹ️ Tentang Kitabisa</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: '🏢', label: 'Didirikan', value: '2013 — M. Alfatih Timur & Vikra Ijas, Jakarta' },
                  { icon: '💰', label: 'Total Donasi', value: 'Lebih dari Rp500 miliar (Sep 2022)' },
                  { icon: '👥', label: 'Pengguna', value: 'Lebih dari 7 juta pengguna aktif' },
                  { icon: '🌍', label: 'Jangkauan', value: '170.000+ inisiatif sosial, 34 provinsi' },
                  { icon: '🏥', label: 'Mitra', value: '150+ rumah sakit, 63.000 donasi/hari' },
                  { icon: '🕌', label: 'Layanan', value: 'Penggalangan dana medis, kemanusiaan, zakat' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <span style={{ fontSize: '11px', color: '#6b7280' }}>{item.label}: </span>
                      <span style={{ fontSize: '12px', color: '#d1d5db' }}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Redirect */}
            <div style={{ padding: '20px', display: 'flex', gap: '12px', flexDirection: 'column', alignItems: 'center' }}>
              <button
                onClick={handleRedirectNow}
                disabled={redirectCount !== null}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: redirectCount !== null
                    ? 'rgba(14, 165, 233, 0.3)'
                    : 'linear-gradient(135deg, #0ea5e9, #a855f7)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '15px',
                  cursor: redirectCount !== null ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '1px'
                }}
                onMouseEnter={e => {
                  if (redirectCount === null) {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(14, 165, 233, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {redirectCount !== null
                  ? `⏳ Menuju Kitabisa dalam ${redirectCount}...`
                  : '🤝 Donasi ke Kitabisa.com'}
              </button>
              <button
                onClick={() => setShowKitabisa(false)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(107, 114, 128, 0.4)',
                  borderRadius: '8px',
                  color: '#6b7280',
                  fontSize: '12px',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#d1d5db'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; }}
              >
                ← Kembali
              </button>
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{
          width: '100%',
          maxWidth: '450px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '28px'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(107,114,128,0.4)' }} />
          <span style={{ color: '#6b7280', fontSize: '12px', letterSpacing: '2px' }}>ATAU LANGSUNG KE SAYA</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(107,114,128,0.4)' }} />
        </div>

        {/* QRIS Section */}
        <div
          className="hover-scale hover-glow"
          style={qrisContainerStyle}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#00ffff';
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.5)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
            <img
              src="https://files.catbox.moe/jzn65a.jpg"
              alt="QRIS ALL PAYMENT"
              style={{
                width: '100%',
                maxWidth: '300px',
                margin: '0 auto',
                display: 'block',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 255, 255, 0.2)'
              }}
            />
          </div>
          <p style={{
            marginTop: '16px',
            textAlign: 'center',
            color: '#00ffff',
            fontWeight: '600',
            letterSpacing: '2px',
            background: 'linear-gradient(to right, #00ffff, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            QRIS ALL PAYMENT
          </p>
        </div>

        {/* Payment Methods */}
        <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* DANA */}
          <div
            style={{ ...paymentCardStyle, border: '1px solid rgba(59, 130, 246, 0.5)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.transform = 'scale(1.03) rotate(0.5deg)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src="https://telegra.ph/file/c605b34f0d4f0127735b4.jpg"
                alt="Dana"
                style={{ width: '56px', height: '56px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #3b82f6, #00ffff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>DANA</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#d1d5db', fontFamily: 'monospace' }}>082159690832</p>
                  <button
                    onClick={() => copyToClipboard('082159690832', 'dana')}
                    style={{
                      background: 'none', border: 'none', color: '#3b82f6',
                      cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'all 0.2s ease'
                    }}
                  >
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                    </svg>
                  </button>
                  {copySuccess === 'dana' && <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold' }}>Copied!</span>}
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>M. F**** N*** I****</p>
              </div>
            </div>
          </div>

          {/* GOPAY */}
          <div
            style={{ ...paymentCardStyle, border: '1px solid rgba(34, 197, 94, 0.5)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#22c55e';
              e.currentTarget.style.transform = 'scale(1.03) rotate(-0.5deg)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src="https://files.catbox.moe/hrnxyn.webp"
                alt="Gopay"
                style={{ width: '56px', height: '56px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(34, 197, 94, 0.2)' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #22c55e, #10b981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>GOPAY</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#d1d5db', fontFamily: 'monospace' }}>082159690832</p>
                  <button
                    onClick={() => copyToClipboard('082159690832', 'gopay')}
                    style={{
                      background: 'none', border: 'none', color: '#22c55e',
                      cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'all 0.2s ease'
                    }}
                  >
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                    </svg>
                  </button>
                  {copySuccess === 'gopay' && <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold' }}>Copied!</span>}
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>M. F**** N*** I****</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={footerStyle}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#9333ea';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.5)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <p style={{
            fontSize: '18px',
            fontWeight: '600',
            background: 'linear-gradient(to right, #9333ea, #ec4899, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Thanks yang sudah Donasi!
          </p>
          <p style={{ color: '#00ffff', marginTop: '8px' }}>Semoga rezekinya dilancarkan 🙏</p>
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                width: '8px', height: '8px',
                backgroundColor: '#9333ea',
                borderRadius: '50%',
                animation: `pulse 2s ease-in-out infinite ${i * 0.2}s`
              }} />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </main>
    </div>
  );
}
