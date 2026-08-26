"use client"

import React, { useState, useEffect, useRef } from "react"
import { FaInstagram, FaTiktok, FaGithub } from "react-icons/fa"
import { FaWhatsapp, FaDiscord } from "react-icons/fa"
import { RiVerifiedBadgeFill } from "react-icons/ri"

// ── Fire Particle ─────────────────────────────────────────────────────────────
class FireParticle {
    constructor(canvasW, canvasH) {
        this.reset(canvasW, canvasH)
    }
    reset(canvasW, canvasH) {
        this.x = Math.random() * canvasW
        this.y = canvasH + Math.random() * 10
        this.vx = (Math.random() - 0.5) * 1.2
        this.vy = -(Math.random() * 3 + 2)
        this.life = 1.0
        this.decay = Math.random() * 0.018 + 0.010
        this.size = Math.random() * 18 + 8
        this.canvasW = canvasW
        this.canvasH = canvasH
    }
    update() {
        this.x += this.vx + Math.sin(this.y * 0.04) * 0.6
        this.y += this.vy
        this.vy -= 0.04          // accelerate upward
        this.size *= 0.978       // shrink as it rises
        this.life -= this.decay
    }
    draw(ctx) {
        if (this.life <= 0) return
        // Color: white-yellow core → orange → red → transparent tip
        const t = 1 - this.life  // 0 = fresh (bottom), 1 = dying (top)
        let r, g, b
        if (t < 0.3) {
            // white-yellow core
            r = 255; g = Math.round(255 - t / 0.3 * 80); b = Math.round(200 - t / 0.3 * 200)
        } else if (t < 0.65) {
            // orange
            r = 255; g = Math.round(175 - (t - 0.3) / 0.35 * 120); b = 0
        } else {
            // deep red
            r = Math.round(255 - (t - 0.65) / 0.35 * 140); g = 0; b = 0
        }
        const alpha = this.life * 0.85
        const grad = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        )
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
        grad.addColorStop(0.4, `rgba(${r},${Math.round(g * 0.6)},0,${alpha * 0.7})`)
        grad.addColorStop(1, `rgba(${Math.round(r * 0.4)},0,0,0)`)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
    }
}

// ── Profile Component ─────────────────────────────────────────────────────────
const Profile = () => {
    const [imgSrc, setImgSrc] = useState("https://files.catbox.moe/tmobkc.png")
    const [isFire, setIsFire] = useState(false)
    const canvasRef = useRef(null)
    const animFrameRef = useRef(null)
    const particlesRef = useRef([])
    const fireTimerRef = useRef(null)
    const triggeredRef = useRef(false)

    // ── Fire canvas loop ──────────────────────────────────────────────────────
    const startFire = () => {
        setIsFire(true)
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        const W = canvas.width
        const H = canvas.height

        // Seed initial particles
        for (let i = 0; i < 80; i++) particlesRef.current.push(new FireParticle(W, H))

        let frame = 0
        const loop = () => {
            animFrameRef.current = requestAnimationFrame(loop)
            ctx.clearRect(0, 0, W, H)

            // Spawn new particles each frame
            frame++
            if (frame % 2 === 0) {
                for (let i = 0; i < 6; i++) particlesRef.current.push(new FireParticle(W, H))
            }

            // Draw & update
            particlesRef.current = particlesRef.current.filter(p => p.life > 0)
            for (const p of particlesRef.current) {
                p.update()
                p.draw(ctx)
            }
        }
        loop()

        // Auto-extinguish after 6 s
        fireTimerRef.current = setTimeout(() => {
            cancelAnimationFrame(animFrameRef.current)
            particlesRef.current = []
            const c = canvasRef.current
            if (c) c.getContext("2d").clearRect(0, 0, c.width, c.height)
            setIsFire(false)
        }, 6000)
    }

    // ── Audio time watcher ────────────────────────────────────────────────────
    useEffect(() => {
        const TARGET = 63 // 1 min 3 sec

        const poll = setInterval(() => {
            const audio = document.querySelector("audio")
            if (!audio) return
            const t = audio.currentTime
            if (t >= TARGET && t < TARGET + 4 && !triggeredRef.current) {
                triggeredRef.current = true
                startFire()
            }
            if (t < TARGET - 5) triggeredRef.current = false
        }, 250)

        return () => {
            clearInterval(poll)
            cancelAnimationFrame(animFrameRef.current)
            clearTimeout(fireTimerRef.current)
        }
    }, [])

    return (
        <>
            <style>{`
                @keyframes emberBorder {
                    0%   { border-color: #ff4500; box-shadow: 0 0 18px #ff450088, 0 0 40px #ff210044, inset 0 0 12px #ff21001a; }
                    25%  { border-color: #ff7b00; box-shadow: 0 0 28px #ff7b0099, 0 0 55px #ff450055, inset 0 0 16px #ff450022; }
                    50%  { border-color: #ffaa00; box-shadow: 0 0 22px #ffaa0088, 0 0 48px #ff7b0044, inset 0 0 14px #ff7b001a; }
                    75%  { border-color: #ff5500; box-shadow: 0 0 30px #ff550099, 0 0 60px #ff210055, inset 0 0 18px #ff210022; }
                    100% { border-color: #ff4500; box-shadow: 0 0 18px #ff450088, 0 0 40px #ff210044, inset 0 0 12px #ff21001a; }
                }
                @keyframes firePulse {
                    0%, 100% { transform: scale(1);    filter: brightness(1); }
                    50%       { transform: scale(1.06); filter: brightness(1.25) hue-rotate(10deg); }
                }
                @keyframes fireText {
                    0%   { color: #fff;   text-shadow: 0 0 8px #ff4500, 0 0 20px #ff7b00; }
                    33%  { color: #ffcc00; text-shadow: 0 0 12px #ffaa00, 0 0 28px #ff5500; }
                    66%  { color: #ff8800; text-shadow: 0 0 10px #ff4500, 0 0 24px #ff2100; }
                    100% { color: #fff;   text-shadow: 0 0 8px #ff4500, 0 0 20px #ff7b00; }
                }
                @keyframes iconFlicker {
                    0%, 100% { filter: drop-shadow(0 0 4px #ff4500); transform: scale(1); }
                    50%       { filter: drop-shadow(0 0 10px #ff8800); transform: scale(1.15); }
                }
                .fire-card {
                    animation: emberBorder 0.8s ease-in-out infinite;
                    border: 2px solid #ff4500;
                    background: radial-gradient(ellipse at bottom, #1a0800 0%, #0d0400 60%, #000 100%) !important;
                }
                .fire-img {
                    animation: firePulse 0.7s ease-in-out infinite;
                }
                .fire-name {
                    animation: fireText 0.9s ease-in-out infinite;
                }
                .fire-icon {
                    animation: iconFlicker 0.6s ease-in-out infinite;
                }
                .fire-tag {
                    background: linear-gradient(135deg, #ff4500cc, #ff8800cc) !important;
                    color: #fff !important;
                    border: 1px solid #ff6600 !important;
                    box-shadow: 0 0 10px #ff450066;
                    text-shadow: 0 0 6px #ff8800;
                }
            `}</style>

            <div
                className={`p-6 rounded-lg transition-all duration-500 shadow-lg relative overflow-hidden ${isFire ? "fire-card" : "bg-black border border-gray-500"
                    }`}
            >
                {/* Fire canvas — renders BEHIND content */}
                <canvas
                    ref={canvasRef}
                    width={480}
                    height={220}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        pointerEvents: "none",
                        mixBlendMode: "screen",
                        opacity: isFire ? 1 : 0,
                        transition: "opacity 0.4s",
                    }}
                />

                <div className="text-center" style={{ position: "relative", zIndex: 1 }}>
                    {/* Profile image */}
                    <div className="inline-block relative">
                        <img
                            src={imgSrc}
                            alt="Profile"
                            className={`w-20 h-20 rounded-full border-2 border-gray-500 bg-gray-600 transition-transform hover:scale-105 ${isFire ? "fire-img" : ""
                                }`}
                            onError={() => setImgSrc("https://files.catbox.moe/tmobkc.png")}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse" />
                    </div>

                    {/* Name */}
                    <h1
                        className={`text-lg font-bold mt-2 flex items-center justify-center ${isFire ? "fire-name" : ""
                            }`}
                    >
                        𝐅𝐢𝐤𝐫𝐢
                        <RiVerifiedBadgeFill
                            className={`inline ml-1 items-center text-sm ${isFire ? "text-orange-400" : "text-blue-500"
                                }`}
                        />
                    </h1>

                    <p className="text-gray-400 text-xs">Hi! Thanks for visiting my personal website.</p>

                    {/* Tags */}
                    <div className="flex justify-center gap-2 mt-3 flex-wrap">
                        {["#Coding", "#Gaming", "#Alone", "#Music"].map((tag) => (
                            <span
                                key={tag}
                                className={`bg-white/5 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition-all hover:scale-105 ring-1 ring-green-700 text-yellow-400 ${isFire ? "fire-tag" : ""
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Social icons */}
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
                                className={`text-zinc-400 hover:text-zinc-100 transition-colors ${isFire ? "fire-icon" : ""
                                    }`}
                                style={isFire ? { animationDelay: `${i * 0.1}s` } : {}}
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
