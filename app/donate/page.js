"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaHandHoldingHeart, FaGlobe, FaUsers, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ─── Kitabisa Stats Data ─────────────────────────────────────────────────────
const stats = [
  { icon: FaChartLine, label: 'Total Donasi', value: '>Rp500M', color: '#facc15' },
  { icon: FaUsers, label: 'Pengguna', value: '>7 Juta', color: '#f97316' },
  { icon: FaGlobe, label: '34 Provinsi', value: '170K+', color: '#4ade80' },
];

// ─── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="relative rounded-2xl overflow-hidden text-center p-6"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(10px)',
    }}
  >
    <div className="absolute inset-0 opacity-10"
      style={{ background: `radial-gradient(circle at 50% 0%, ${color}, transparent 70%)` }} />
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
      style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
      <Icon style={{ color, fontSize: '20px' }} />
    </div>
    <div className="text-3xl font-bold mb-1" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>
      {value}
    </div>
    <div className="text-sm font-medium" style={{ color: '#e5e7eb' }}>{label}</div>
  </motion.div>
);

// ─── Info Row ────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay }}
    className="flex items-center gap-4 py-3 px-4 rounded-xl"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
  >
    <span className="text-2xl">{icon}</span>
    <div className="flex-1 min-w-0">
      <p className="text-xs mb-0.5" style={{ color: '#6b7280' }}>{label}</p>
      <p className="text-sm font-semibold truncate" style={{ color: '#e5e7eb', fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
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
          background: radial-gradient(ellipse 80% 40% at 50% -10%, rgba(14,165,233,0.15), transparent);
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .gradient-text-donate {
          background: linear-gradient(90deg, #38bdf8, #818cf8, #ec4899, #38bdf8);
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
          border: 2px solid #0ea5e9;
          animation: pulse-ring 2s ease-out infinite;
        }

        .donate-btn-primary {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #0ea5e9, #7c3aed);
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
          box-shadow: 0 0 30px rgba(14,165,233,0.5);
          transform: translateY(-2px);
        }
        .donate-btn-primary:disabled {
          background: rgba(14,165,233,0.25);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .teaser-card {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, rgba(14,165,233,0.12), rgba(168,85,247,0.12));
          border: 1px solid rgba(14,165,233,0.4);
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          transition: left 0.5s ease;
        }
        .teaser-card:hover::before { left: 100%; }
        .teaser-card:hover {
          border-color: rgba(14,165,233,0.7);
          box-shadow: 0 0 32px rgba(14,165,233,0.25);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="min-h-screen text-white grid-bg" style={{ background: '#0a0a0a', fontFamily: "'Space Grotesk', sans-serif" }}>
        <Header />

        {/* ── Hero Section ── */}
        <section className="relative pt-28 pb-10 px-4 overflow-hidden donate-hero-glow">
          {/* Decorative blobs */}
          <div className="absolute top-16 left-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />
          <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full opacity-5 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />

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
              style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)', color: '#38bdf8' }}
            >
              <FaHeart style={{ fontSize: '11px' }} />
              Berbagi untuk Sesama
              <FaHeart style={{ fontSize: '11px' }} />
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-3 gradient-text-donate leading-tight">
              {glitchText}
            </h1>
            <p className="text-base md:text-lg mb-2" style={{ color: '#d1d5db' }}>
              Bersama kita bisa berbuat lebih
            </p>
            <p className="text-sm max-w-md mx-auto" style={{ color: '#6b7280' }}>
              Yuk salurkan donasi ke platform terpercaya yang sudah membantu jutaan orang di seluruh Indonesia.
            </p>
          </motion.div>
        </section>

        {/* ── Stat Cards ── */}
        <section className="px-4 pb-10 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} delay={0.1 + i * 0.1} />
            ))}
          </div>
        </section>

        {/* ── Main Content ── */}
        <section className="px-4 pb-20 max-w-2xl mx-auto">

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full mb-6 rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(14,165,233,0.35)',
              boxShadow: '0 0 40px rgba(14,165,233,0.12), 0 20px 60px rgba(0,0,0,0.6)',
              background: '#020617',
              position: 'relative',
            }}
          >
            {/* Glow top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, transparent, #0ea5e9, #a855f7, transparent)',
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

          {/* ── Teaser / Full Card ── */}
          <AnimatePresence mode="wait">
            {!showInfo ? (
              /* Teaser Button */
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
                        background: 'linear-gradient(135deg, #0ea5e9, #a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'
                      }}
                    >🤝</div>
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '700', fontSize: '16px', marginBottom: '4px',
                      background: 'linear-gradient(to right, #38bdf8, #a78bfa)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                    }}>
                      Donasi via Kitabisa.com
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>
                      Tap untuk lihat pesan & info sebelum donasi →
                    </p>
                  </div>
                </button>
              </motion.div>
            ) : (
              /* Full Info Card */
              <motion.div
                key="fullcard"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="w-full rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(2,6,23,0.95)',
                  border: '1px solid rgba(14,165,233,0.35)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Card Header */}
                <div style={{
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(168,85,247,0.15))',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.3)' }}>
                    <FaHandHoldingHeart style={{ color: '#38bdf8', fontSize: '18px' }} />
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '700', fontSize: '16px',
                      background: 'linear-gradient(to right, #38bdf8, #a78bfa)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                      Pesan untuk Kamu
                    </p>
                    <p style={{ fontSize: '11px', color: '#475569' }}>Dari Ryven, dengan sepenuh hati 💙</p>
                  </div>
                </div>

                {/* Personal Message */}
                <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{
                      fontSize: '14px', lineHeight: '1.9', color: '#cbd5e1',
                      fontStyle: 'italic', fontFamily: "'Georgia', serif"
                    }}>
                      "Namun, daripada berdonasi langsung kepada saya, alangkah baiknya jika dukungan tersebut disalurkan melalui{' '}
                      <span style={{ color: '#38bdf8', fontWeight: '700', fontStyle: 'normal', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Kitabisa.com
                      </span>
                      . Dengan begitu, donasi kalian tidak hanya menjadi bentuk dukungan untuk saya dan pengembangan{' '}
                      <span style={{ color: '#a78bfa', fontWeight: '700', fontStyle: 'normal', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Glyphic Bot
                      </span>
                      {' '}serta web ini, tetapi juga sekaligus membantu saudara-saudara kita yang lebih membutuhkan. 🙏"
                    </p>
                  </div>
                </div>

                {/* About Kitabisa */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
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
                <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.7' }}>
                    Dewan pembina termasuk{' '}
                    <span style={{ color: '#94a3b8' }}>Prof. Rhenald Kasali</span>
                    {' '}(Guru Besar FEB-UI) dan{' '}
                    <span style={{ color: '#94a3b8' }}>Aldi Haryopratomo</span>
                    {' '}(founding CEO GoPay). Beroperasi di <span style={{ color: '#94a3b8' }}>34 provinsi</span> Indonesia.
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
                      border: '1px solid rgba(100,116,139,0.35)',
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
                      e.currentTarget.style.borderColor = 'rgba(100,116,139,0.6)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.borderColor = 'rgba(100,116,139,0.35)';
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
