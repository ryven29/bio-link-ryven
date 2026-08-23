"use client"
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function GlyphicPage() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };
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

    return (
        <>
            {/* Space Grotesk font + keyframes */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }

        .glyphic-hero-glow {
          background: radial-gradient(ellipse 80% 40% at 50% -10%, rgba(168,85,247,0.15), transparent);
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .gradient-text-glyphic {
          background: linear-gradient(90deg, #a855f7, #ec4899, #3b82f6, #a855f7);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

            <div className="min-h-screen text-white grid-bg flex flex-col" style={{ background: '#0a0a0a', fontFamily: "'Space Grotesk', sans-serif" }}>
                <Header />

                {/* ── Main Content ── */}
                <main className="flex-grow flex flex-col items-center justify-center relative pt-28 pb-20 px-4 overflow-hidden glyphic-hero-glow">
                    {/* Decorative blobs */}
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-3xl mx-auto w-full z-10"
                    >
                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text-glyphic leading-tight">
                            GLYPHIC
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold mb-10"
                            style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', color: '#d8b4fe' }}
                        >
                            <span className="relative flex h-3 w-3 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                            </span>
                            COMING SOON
                        </motion.div>

                        {/* Video Player */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="w-full rounded-2xl overflow-hidden mx-auto max-w-4xl"
                            style={{
                                border: '1px solid rgba(168,85,247,0.35)',
                                boxShadow: '0 0 40px rgba(168,85,247,0.15), 0 20px 60px rgba(0,0,0,0.6)',
                                background: '#020617',
                                position: 'relative',
                            }}
                        >
                            {/* Glow top bar */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                background: 'linear-gradient(90deg, transparent, #a855f7, #3b82f6, transparent)',
                                zIndex: 4
                            }} />

                            <div style={{ position: 'relative', paddingBottom: '56.25%', width: '100%', height: 0 }}>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    style={{ border: 'none', display: 'block' }}
                                >
                                    <source src="/Intro_Glyphic.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Mute/Unmute Button */}
                                <button
                                    onClick={toggleMute}
                                    className="absolute bottom-4 right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/10 transition-all duration-300 group"
                                >
                                    {isMuted ? (
                                        <FaVolumeMute className="text-white/80 group-hover:text-white text-xl" />
                                    ) : (
                                        <FaVolumeUp className="text-white/80 group-hover:text-white text-xl" />
                                    )}
                                </button>
                            </div>

                            {/* Scanline overlay */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                                pointerEvents: 'none', zIndex: 3
                            }} />
                        </motion.div>

                        {/* Description Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-12 text-left p-8 rounded-2xl"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-4" style={{ color: '#d8b4fe' }}>
                                Apa itu Glyphic?
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Glyphic adalah sebuah Bot Whatsapp yang bisa membantu kamu seperti menemukan informasi, Download Video/Audio dari semua sosmed, Games, Group Security, dan lain sebagainya
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Info lebih lanjut?, Tunggu bot hadir kembali.
                            </p>
                        </motion.div>
                    </motion.div>
                </main>

                <Footer />
            </div>
        </>
    );
}
