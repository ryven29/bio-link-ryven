"use client"

import React, { useState, useEffect, useRef } from "react"
import { FaInstagram, FaTiktok, FaGithub } from "react-icons/fa"
import { FaWhatsapp, FaDiscord } from "react-icons/fa"
import { RiVerifiedBadgeFill } from "react-icons/ri"

// ── Confetti particle helper ──────────────────────────────────────────────────
const COLORS = [
    "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff",
    "#c77dff", "#ff9f43", "#ff6eb4", "#00d2d3",
]

function createParticle(container) {
    const el = document.createElement("div")
    const size = Math.random() * 10 + 6
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const left = Math.random() * 100
    const duration = Math.random() * 1800 + 1200
    const delay = Math.random() * 600

    el.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size}px;
        background:${color};
        border-radius:${Math.random() > 0.5 ? "50%" : "3px"};
        left:${left}%;
        top:-${size}px;
        opacity:0;
        pointer-events:none;
        animation: confettiFall ${duration}ms ${delay}ms ease-in forwards;
        transform: rotate(${Math.random() * 360}deg);
        box-shadow: 0 0 6px ${color}88;
        z-index:9999;
    `
    container.appendChild(el)
    setTimeout(() => el.remove(), duration + delay + 100)
}

// ── Profile Component ─────────────────────────────────────────────────────────
const Profile = () => {
    const [imgSrc, setImgSrc] = useState("https://files.catbox.moe/tmobkc.png")
    const [isParty, setIsParty] = useState(false)
    const confettiRef = useRef(null)
    const partyTimerRef = useRef(null)
    const confettiIntervalRef = useRef(null)
    const triggeredRef = useRef(false)

    // Watch audio currentTime and fire at 1:03 (63 seconds)
    useEffect(() => {
        const TARGET = 63 // 1 minute 3 seconds

        const handleTimeUpdate = () => {
            const audio = document.querySelector("audio")
            if (!audio) return
            const t = audio.currentTime

            // Trigger once when song reaches 63s, reset if loop restarts
            if (t >= TARGET && t < TARGET + 3 && !triggeredRef.current) {
                triggeredRef.current = true
                startParty()
            }
            // Allow re-trigger on next loop
            if (t < TARGET - 5) {
                triggeredRef.current = false
            }
        }

        document.addEventListener("timeupdate", handleTimeUpdate, true)

        // Also poll via setInterval as fallback (audio events can be on shadow DOM)
        const poll = setInterval(() => {
            const audio = document.querySelector("audio")
            if (!audio) return
            const t = audio.currentTime
            if (t >= TARGET && t < TARGET + 3 && !triggeredRef.current) {
                triggeredRef.current = true
                startParty()
            }
            if (t < TARGET - 5) triggeredRef.current = false
        }, 250)

        return () => {
            document.removeEventListener("timeupdate", handleTimeUpdate, true)
            clearInterval(poll)
            clearTimeout(partyTimerRef.current)
            clearInterval(confettiIntervalRef.current)
        }
    }, [])

    const startParty = () => {
        setIsParty(true)

        // Burst confetti
        const container = confettiRef.current
        if (container) {
            // Initial burst
            for (let i = 0; i < 60; i++) createParticle(container)
            // Continuous shower
            confettiIntervalRef.current = setInterval(() => {
                for (let i = 0; i < 8; i++) createParticle(container)
            }, 120)
        }

        // Stop party after 6 seconds
        partyTimerRef.current = setTimeout(() => {
            setIsParty(false)
            clearInterval(confettiIntervalRef.current)
        }, 6000)
    }

    return (
        <>
            {/* Inject keyframes once */}
            <style>{`
                @keyframes confettiFall {
                    0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
                    100% { transform: translateY(340px) rotate(720deg); opacity: 0; }
                }
                @keyframes rainbowBorder {
                    0%   { border-color: #ff6b6b; box-shadow: 0 0 24px #ff6b6b88, 0 0 48px #ff6b6b44; }
                    16%  { border-color: #ffd93d; box-shadow: 0 0 24px #ffd93d88, 0 0 48px #ffd93d44; }
                    33%  { border-color: #6bcb77; box-shadow: 0 0 24px #6bcb7788, 0 0 48px #6bcb7744; }
                    50%  { border-color: #4d96ff; box-shadow: 0 0 24px #4d96ff88, 0 0 48px #4d96ff44; }
                    66%  { border-color: #c77dff; box-shadow: 0 0 24px #c77dff88, 0 0 48px #c77dff44; }
                    83%  { border-color: #ff9f43; box-shadow: 0 0 24px #ff9f4388, 0 0 48px #ff9f4344; }
                    100% { border-color: #ff6b6b; box-shadow: 0 0 24px #ff6b6b88, 0 0 48px #ff6b6b44; }
                }
                @keyframes profilePulse {
                    0%, 100% { transform: scale(1); }
                    50%       { transform: scale(1.08); }
                }
                @keyframes rainbowText {
                    0%   { color: #ff6b6b; text-shadow: 0 0 12px #ff6b6b; }
                    25%  { color: #ffd93d; text-shadow: 0 0 12px #ffd93d; }
                    50%  { color: #6bcb77; text-shadow: 0 0 12px #6bcb77; }
                    75%  { color: #4d96ff; text-shadow: 0 0 12px #4d96ff; }
                    100% { color: #ff6b6b; text-shadow: 0 0 12px #ff6b6b; }
                }
                @keyframes badgeParty {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    25%       { transform: scale(1.4) rotate(-15deg); }
                    75%       { transform: scale(1.4) rotate(15deg); }
                }
                @keyframes tagFloat {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50%       { transform: translateY(-5px) scale(1.08); }
                }
                @keyframes iconDance {
                    0%, 100% { transform: rotate(0deg) scale(1); }
                    25%       { transform: rotate(-12deg) scale(1.2); }
                    75%       { transform: rotate(12deg) scale(1.2); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .party-card {
                    animation: rainbowBorder 1s linear infinite;
                    border-width: 2px;
                    border-style: solid;
                }
                .party-profile-img {
                    animation: profilePulse 0.6s ease-in-out infinite;
                }
                .party-name {
                    animation: rainbowText 1s linear infinite;
                }
                .party-badge {
                    animation: badgeParty 0.5s ease-in-out infinite;
                    display: inline-block;
                }
                .party-tag {
                    animation: tagFloat 0.8s ease-in-out infinite;
                    background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c77dff, #ff6b6b) !important;
                    background-size: 200% auto !important;
                    animation: tagFloat 0.8s ease-in-out infinite, shimmer 2s linear infinite;
                    color: #fff !important;
                    text-shadow: 0 1px 4px rgba(0,0,0,0.5);
                    border: none !important;
                    box-shadow: 0 0 12px rgba(255,180,0,0.5);
                }
                .party-icon {
                    animation: iconDance 0.5s ease-in-out infinite;
                    display: inline-block;
                }
            `}</style>

            <div
                className={`p-6 rounded-lg transition-all duration-300 shadow-lg relative overflow-hidden ${isParty
                        ? "party-card bg-black"
                        : "bg-black border border-gray-500"
                    }`}
            >
                {/* Confetti container */}
                <div
                    ref={confettiRef}
                    style={{
                        position: "absolute",
                        top: 0, left: 0,
                        width: "100%", height: "100%",
                        pointerEvents: "none",
                        overflow: "hidden",
                    }}
                />

                {/* Party emoji banner */}
                {isParty && (
                    <div
                        style={{
                            position: "absolute",
                            top: 8, left: 0, right: 0,
                            textAlign: "center",
                            fontSize: "1.5rem",
                            animation: "profilePulse 0.5s ease-in-out infinite",
                            zIndex: 10,
                            pointerEvents: "none",
                        }}
                    >
                        🎉🎊✨🎶🔥✨🎊🎉
                    </div>
                )}

                <div className="text-center" style={{ position: "relative", zIndex: 1 }}>
                    <div className="inline-block relative">
                        <img
                            src={imgSrc}
                            alt="Profile"
                            className={`w-20 h-20 rounded-full border-2 border-gray-500 bg-gray-600 transition-transform hover:scale-105 ${isParty ? "party-profile-img" : ""
                                }`}
                            onError={() => setImgSrc("https://files.catbox.moe/tmobkc.png")}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
                    </div>

                    <h1
                        className={`text-lg font-bold mt-2 flex items-center justify-center ${isParty ? "party-name" : ""
                            }`}
                    >
                        𝐅𝐢𝐤𝐫𝐢
                        <span className={isParty ? "party-badge" : ""}>
                            <RiVerifiedBadgeFill className="inline text-blue-500 ml-1 items-center text-sm" />
                        </span>
                    </h1>

                    <p className="text-gray-400 text-xs">Hi! Thanks for visiting my personal website.</p>

                    <div className="flex justify-center gap-2 mt-3 flex-wrap">
                        {["#Coding", "#Gaming", "#Alone", "#Music"].map((tag, i) => (
                            <span
                                key={tag}
                                className={`bg-white/5 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition-all hover:scale-105 ring-1 ring-green-700 text-yellow-400 ${isParty ? "party-tag" : ""
                                    }`}
                                style={isParty ? { animationDelay: `${i * 0.15}s` } : {}}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-center gap-4 mt-4 text-xl text-gray-400">
                        {[
                            { href: "https://wa.me/628991103457", Icon: FaWhatsapp },
                            { href: "https://instagram.com/fikrinrirham", Icon: FaInstagram },
                            { href: "https://discord.com/users/755606790166675518", Icon: FaDiscord },
                            { href: "https://github.com/ryven29", Icon: FaGithub },
                            { href: "https://www.tiktok.com/@ry_venz", Icon: FaTiktok },
                        ].map(({ href, Icon }, i) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-zinc-400 hover:text-zinc-100 transition-colors ${isParty ? "party-icon" : ""
                                    }`}
                                style={isParty ? { animationDelay: `${i * 0.1}s` } : {}}
                            >
                                <Icon className="h-5 w-5 text-gray-200" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
