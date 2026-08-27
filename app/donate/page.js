"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaHandHoldingHeart, FaGlobe, FaUsers, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ─── Kitabisa Stats Data ─────────────────────────────────────────────────────
const stats = [
  { icon: '📈', label: 'Total Donasi', value: '>Rp500M', color: '#facc15' },   // yellow-400
  { icon: '👥', label: 'Pengguna', value: '>7 Juta', color: '#3b82f6' },   // blue-500
  { icon: '🌏', label: '34 Provinsi', value: '170K+', color: '#a78bfa' },   // purple-400
  { icon: '🏥', label: 'Mitra RS', value: '150+', color: '#facc15' },   // yellow-400
  { icon: '📦', label: 'Donasi/Hari', value: '63.000', color: '#3b82f6' },   // blue-500
  { icon: '📅', label: 'Berdiri', value: '2013', color: '#a78bfa' },   // purple-400
];

// ─── Info Row ────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
    className="flex items-center gap-4 py-3 px-4 rounded-xl"
    style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}
  >
    <span className="text-2xl">{icon}</span>
    <div className="flex-1 min-w-0">
      <p className="text-xs mb-0.5" style={{ color: '#64748b' }}>{label}</p>
      <p className="text-sm font-semibold truncate" style={{ color: '#e2e8f0', fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
    </div>
  </motion.div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function DonatePage() {
  const [showInfo, setShowInfo] = useState(false);
  const [redirectCount, setRedirectCount] = useState(null);
  const [glitchText, setGlitchText] = useState('DONASI');

  // Glitch title effect
  useEffect(() => {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const orig = 'DONASI';
    const id = setInterval(() => {
      if (Math.random() > 0.95) {
        const g = orig.split('').map(c => Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : c).join('');
        setGlitchText(g);
        setTimeout(() => setGlitchText(orig), 120);
      }
    }, 120);
    return () => clearInterval(id);
  }, []);

  // ── No Inspect Protection ──
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault()
      alert('inspect this page is not allowed :)\nRyven')
    }
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault()
        alert('inspect this page is not allowed :)\nRyven')
      }
    }
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, []);

  const handleRedirect = () => {
    let count = 3;
    setRedirectCount(count);
    const t = setInterval(() => {
      count -= 1;
      setRedirectCount(count);
      if (count === 0) {
        clearInterval(t);
        window.open('https://kitabisa.com', '_blank');
        setTimeout(() => setRedirectCount(null), 600);
      }
    }, 1000);
  };

  const infoRows = [
    { icon: '📅', label: 'Berdiri', value: '2013 — Jakarta' },
    { icon: '🏥', label: 'Mitra RS', value: '150+ Rumah Sakit' },
    { icon: '📦', label: 'Donasi/Hari', value: '63.000 Disalurkan' },
    { icon: '👤', label: 'Founder', value: 'M. Alfatih Timur & Vikra Ijas' },
  ];

  return (
    <>
      {/* Space Grotesk font + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }

        .donate-hero-glow {
          background: radial-gradient(ellipse 80% 40% at 50% -10%, rgba(59,130,246,0.12), transparent);
        }

        /* ── Shimmer title: blue → purple, sesuai tema loading bar ── */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .gradient-text-donate {
          background: linear-gradient(90deg, #3b82f6, #9333ea, #facc15, #3b82f6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-down { animation: slideDown 0.35s ease; }

        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .pulse-ring::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: pulse-ring 2s ease-out infinite;
        }

        /* ── Primary button: blue→purple gradient ── */
        .donate-btn-primary {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-weight: 700;
          font-size: 15px;
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .donate-btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.5s ease;
        }
        .donate-btn-primary:hover::before { left: 100%; }
        .donate-btn-primary:hover {
          box-shadow: 0 0 30px rgba(59,130,246,0.45);
          transform: translateY(-2px);
        }
        .donate-btn-primary:disabled {
          background: rgba(59,130,246,0.2);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* ── Teaser card ── */
        .teaser-card {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1));
          border: 1px solid rgba(59,130,246,0.35);
          border-radius: 18px;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          font-family: 'Space Grotesk', sans-serif;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .teaser-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transition: left 0.5s ease;
        }
        .teaser-card:hover::before { left: 100%; }
        .teaser-card:hover {
          border-color: rgba(59,130,246,0.6);
          box-shadow: 0 0 28px rgba(59,130,246,0.2);
          transform: translateY(-2px);
        }

        /* ── Marquee / Running Stats Ticker ── */
        .stats-ticker-wrapper {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 10px 0;
        }
        .stats-ticker-wrapper::before,
        .stats-ticker-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 60px;
          z-index: 2;
          pointer-events: none;
        }
        .stats-ticker-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #0f172a, transparent);
        }
        .stats-ticker-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #0f172a, transparent);
        }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .stats-ticker-track {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
        .stats-ticker-track:hover {
          animation-play-state: paused;
        }

        .stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          margin: 0 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(100,116,139,0.3);
          white-space: nowrap;
          backdrop-filter: blur(8px);
          transition: background 0.2s, border-color 0.2s;
          cursor: default;
        }
        .stat-pill:hover {
          background: rgba(59,130,246,0.08);
          border-color: rgba(59,130,246,0.3);
        }
        .stat-pill-icon { font-size: 15px; }
        .stat-pill-value {
          font-weight: 700;
          font-size: 13px;
          font-family: 'Space Grotesk', sans-serif;
        }
        .stat-pill-label {
          font-size: 11px;
          color: #64748b;
        }
        .stat-pill-divider {
          width: 1px;
          height: 14px;
          background: rgba(100,116,139,0.35);
          margin: 0 2px;
        }
      `}</style>

      <div className="min-h-screen text-white grid-bg" style={{ background: '#0f172a', fontFamily: "'Space Grotesk', sans-serif" }}>
        <Header />

        {/* ── Hero Section ── */}
        <section className="relative pt-28 pb-6 px-4 overflow-hidden donate-hero-glow">
          {/* Decorative blobs — blue & purple sesuai tema */}
          <div className="absolute top-16 left-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
          <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full opacity-5 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #9333ea, transparent)' }} />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.25)',
                color: '#93c5fd',   // blue-300
              }}
            >
              <FaHeart style={{ fontSize: '11px' }} />
              Berbagi untuk Sesama
              <FaHeart style={{ fontSize: '11px' }} />
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-3 gradient-text-donate leading-tight">
              {glitchText}
            </h1>
            <p className="text-base md:text-lg mb-2" style={{ color: '#cbd5e1' }}>
              Bersama kita bisa berbuat lebih
            </p>
            <p className="text-sm max-w-md mx-auto" style={{ color: '#64748b' }}>
              Yuk salurkan donasi ke platform terpercaya yang sudah membantu jutaan orang di seluruh Indonesia.
            </p>
          </motion.div>
        </section>

        {/* ── Main Content ── */}
        <section className="px-4 pb-20 max-w-2xl mx-auto">

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full mb-4 rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(59,130,246,0.3)',
              boxShadow: '0 0 40px rgba(59,130,246,0.1), 0 20px 60px rgba(0,0,0,0.5)',
              background: '#0f172a',
              position: 'relative',
            }}
          >
            {/* Glow top bar — blue→purple */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, transparent, #3b82f6, #9333ea, transparent)',
              zIndex: 4
            }} />
            {/* 16:9 YouTube embed */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', width: '100%', height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/UUe7hqH6C0c?autoplay=1&loop=1&playlist=UUe7hqH6C0c&mute=1&rel=0&modestbranding=1"
                title="Kitabisa – Mari Berdonasi"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
              />
            </div>
            {/* Scanline overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
              pointerEvents: 'none', zIndex: 3
            }} />
          </motion.div>

          {/* ── Running Stats Ticker ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="stats-ticker-wrapper mb-6"
          >
            <div className="stats-ticker-track">
              {[...stats, ...stats].map((s, i) => (
                <div key={i} className="stat-pill">
                  <span className="stat-pill-icon">{s.icon}</span>
                  <div className="stat-pill-divider" />
                  <span className="stat-pill-value" style={{ color: s.color }}>{s.value}</span>
                  <span className="stat-pill-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Teaser / Full Card ── */}
          <AnimatePresence mode="wait">
            {!showInfo ? (
              <motion.div
                key="teaser"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <button className="teaser-card" onClick={() => setShowInfo(true)}>
                  <div className="relative" style={{ flexShrink: 0 }}>
                    <div
                      className="pulse-ring"
                      style={{
                        width: '52px', height: '52px', borderRadius: '14px', position: 'relative',
                        background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                      }}
                    >🤝</div>
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '700', fontSize: '16px', marginBottom: '4px',
                      background: 'linear-gradient(to right, #93c5fd, #c4b5fd)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                    }}>
                      Donasi via Kitabisa.com
                    </p>
                    <p style={{ fontSize: '12px', color: '#475569' }}>
                      Tap untuk lihat pesan & info sebelum donasi →
                    </p>
                  </div>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="fullcard"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="w-full rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(15,23,42,0.97)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Card Header */}
                <div style={{
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(147,51,234,0.12))',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
                    <FaHandHoldingHeart style={{ color: '#93c5fd', fontSize: '18px' }} />
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '700', fontSize: '16px',
                      background: 'linear-gradient(to right, #93c5fd, #c4b5fd)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                      Pesan untuk Kamu
                    </p>
                    <p style={{ fontSize: '11px', color: '#475569' }}>Dari Ryven, dengan sepenuh hati 💙</p>
                  </div>
                </div>

                {/* Personal Message */}
                <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="rounded-xl p-4" style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.12)' }}>
                    <p style={{
                      fontSize: '14px', lineHeight: '1.9', color: '#cbd5e1',
                      fontStyle: 'italic', fontFamily: "'Georgia', serif"
                    }}>
                      "Halo! Jika kamu ingin berdonasi lebih — di luar premium bot atau sewa bot — mending salurkan lewat{' '}
                      <span style={{ color: '#93c5fd', fontWeight: '700', fontStyle: 'normal', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Kitabisa.com
                      </span>
                      {' '}aja. Donasimu akan jauh lebih berdampak karena turut membantu saudara-saudara kita yang lebih membutuhkan di seluruh Indonesia. Selain itu, donasi kamu juga membantu keberlangsungan pengembangan{' '}
                      <span style={{ color: '#facc15', fontWeight: '700', fontStyle: 'normal', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Glyphic Bot
                      </span>
                      {' '}dan web ini. Sekecil apapun, pasti berarti besar bagi mereka. Terima kasih! 🙏"
                    </p>
                  </div>
                </div>

                {/* About Kitabisa */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <FaShieldAlt style={{ color: '#4ade80', fontSize: '12px' }} />
                    <p style={{ fontSize: '11px', color: '#4ade80', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>
                      Tentang Kitabisa.com
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {infoRows.map((row, i) => (
                      <InfoRow key={i} {...row} delay={0.05 * i} />
                    ))}
                  </div>
                </div>

                {/* Founders note */}
                <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.7' }}>
                    Dewan pembina termasuk{' '}
                    <span style={{ color: '#94a3b8' }}>Prof. Rhenald Kasali</span>
                    {' '}(Guru Besar FEB-UI) dan{' '}
                    <span style={{ color: '#94a3b8' }}>Aldi Haryopratomo</span>
                    {' '}(founding CEO GoPay). Beroperasi di <span style={{ color: '#93c5fd' }}>34 provinsi</span> Indonesia.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={handleRedirect}
                    disabled={redirectCount !== null}
                    className="donate-btn-primary"
                  >
                    {redirectCount !== null
                      ? `⏳ Menuju Kitabisa dalam ${redirectCount} detik...`
                      : '🤝 Donasi ke Kitabisa.com →'}
                  </button>

                  <button
                    onClick={() => setShowInfo(false)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(100,116,139,0.3)',
                      borderRadius: '12px',
                      color: '#475569',
                      fontSize: '12px',
                      padding: '10px',
                      cursor: 'pointer',
                      fontFamily: "'Space Grotesk', sans-serif",
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.borderColor = 'rgba(100,116,139,0.55)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.borderColor = 'rgba(100,116,139,0.3)';
                    }}
                  >
                    ← Tutup
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <Footer />
      </div>
    </>
  );
}
