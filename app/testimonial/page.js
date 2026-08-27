"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaStar, FaStarHalfAlt, FaShieldAlt, FaBolt, FaHeart } from "react-icons/fa"
import Header from "../components/Header"
import Footer from "../components/Footer"

// ─── Image Preview Modal ────────────────────────────────────────────────────
const ImagePreviewModal = ({ isOpen, src, alt, onClose }) => {
    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (e) => { if (e.key === "Escape") onClose() }
        document.addEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    if (!isOpen || !src) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pt-24"
                style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
                onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
                role="dialog"
                aria-modal="true"
            >
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative w-full max-w-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all hover:scale-110"
                        style={{ background: "linear-gradient(135deg,#facc15,#f97316)", color: "#000" }}
                        aria-label="Close"
                    >
                        ×
                    </button>

                    {/* Image */}
                    <div
                        className="rounded-2xl overflow-hidden shadow-2xl border"
                        style={{ borderColor: "rgba(250,204,21,0.3)" }}
                    >
                        <img
                            src={src}
                            alt={alt || "Preview"}
                            className="w-full object-contain"
                            style={{ maxHeight: "70vh" }}
                            draggable="false"
                        />
                        <div
                            className="px-4 py-3 text-center"
                            style={{ background: "rgba(15,15,15,0.95)" }}
                        >
                            <p className="font-semibold text-sm" style={{ color: "#facc15", fontFamily: "'Space Grotesk', sans-serif" }}>
                                {alt}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                                Tekan ESC atau klik luar untuk menutup
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

// ─── Star Renderer ──────────────────────────────────────────────────────────
const StarRating = ({ rating }) => {
    const full = Math.floor(rating)
    const half = rating % 1 !== 0
    const empty = 5 - Math.ceil(rating)
    return (
        <span className="flex items-center gap-0.5">
            {Array.from({ length: full }).map((_, i) => (
                <FaStar key={i} className="text-yellow-400" style={{ fontSize: "13px" }} />
            ))}
            {half && <FaStarHalfAlt className="text-yellow-400" style={{ fontSize: "13px" }} />}
            {Array.from({ length: empty }).map((_, i) => (
                <FaStar key={`e${i}`} className="text-gray-600" style={{ fontSize: "13px" }} />
            ))}
        </span>
    )
}

// ─── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ value, label, sub, icon: Icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="relative rounded-2xl overflow-hidden text-center p-6"
        style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
        }}
    >
        <div
            className="absolute inset-0 opacity-10"
            style={{ background: `radial-gradient(circle at 50% 0%, ${color}, transparent 70%)` }}
        />
        <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
            style={{ background: `${color}22`, border: `1px solid ${color}44` }}
        >
            <Icon style={{ color, fontSize: "20px" }} />
        </div>
        <div className="text-3xl font-bold mb-1" style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}>
            {value}
        </div>
        <div className="text-sm font-medium" style={{ color: "#e5e7eb" }}>{label}</div>
        {sub && <div className="text-xs mt-1" style={{ color: "#6b7280" }}>{sub}</div>}
    </motion.div>
)

// ─── Testimonial Card ───────────────────────────────────────────────────────
const TestimonialCard = ({ testimonial, index, onImageClick }) => {
    const [imgError, setImgError] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="flex flex-col rounded-2xl overflow-hidden group"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(250,204,21,0.25)"
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(250,204,21,0.08)"
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                e.currentTarget.style.boxShadow = "none"
            }}
        >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                {imgError ? (
                    <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                        <span style={{ fontSize: "40px" }}>🎮</span>
                        <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
                            {testimonial.productName}
                        </span>
                    </div>
                ) : (
                    <div
                        className="w-full h-full cursor-pointer"
                        onClick={() => onImageClick(testimonial.image, testimonial.productName)}
                    >
                        <img
                            src={testimonial.image}
                            alt={testimonial.productName}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={() => setImgError(true)}
                        />
                        {/* Hover overlay */}
                        <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "rgba(0,0,0,0.45)" }}
                        >
                            <div
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                                style={{ background: "rgba(255,255,255,0.9)", color: "#000" }}
                            >
                                🔍 Klik untuk Preview
                            </div>
                        </div>
                    </div>
                )}

                {/* Price badge */}
                <div
                    className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{
                        background: "rgba(0,0,0,0.75)",
                        border: "1px solid rgba(250,204,21,0.4)",
                        color: "#facc15",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {testimonial.price}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-semibold mb-2 text-sm leading-snug" style={{ color: "#f9fafb", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {testimonial.productName}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={testimonial.rating} />
                    <span className="text-xs" style={{ color: "#6b7280" }}>({testimonial.rating}.0)</span>
                </div>

                <p className="text-xs leading-relaxed flex-1 italic mb-4" style={{ color: "#9ca3af" }}>
                    "{testimonial.description}"
                </p>

                <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <div className="flex items-center gap-2">
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: "linear-gradient(135deg,#facc15,#f97316)", color: "#000" }}
                        >
                            {testimonial.customerName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-medium" style={{ color: "#facc15", fontFamily: "'Space Grotesk', sans-serif" }}>
                            {testimonial.customerName}
                        </span>
                    </div>
                    <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}
                    >
                        ✓ Verified
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
const TestimonialPage = () => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [currentImageSrc, setCurrentImageSrc] = useState("")
    const [currentImageAlt, setCurrentImageAlt] = useState("")

    // ── No Inspect Protection ──
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault()
            alert("inspect this page is not allowed :)\nRyven")
        }
        const handleKeyDown = (e) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
                (e.ctrlKey && e.key === "U")
            ) {
                e.preventDefault()
                alert("inspect this page is not allowed :)\nRyven")
            }
        }
        document.addEventListener("contextmenu", handleContextMenu)
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const handleImageClick = (src, alt) => {
        setCurrentImageSrc(src)
        setCurrentImageAlt(alt)
        setIsImageModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsImageModalOpen(false)
        setCurrentImageSrc("")
        setCurrentImageAlt("")
    }

    const testimonials = [
        { id: 1, image: "https://j.top4top.io/p_388199a4k1.jpg", productName: "Jasa Claim Nitro Trial", price: "Rp 5.000", rating: 5, description: "No Caption.", customerName: "Daztan" },
        { id: 2, image: "https://k.top4top.io/p_3881jipfn2.jpg", productName: "Jasa Claim Nitro Trial", price: "Rp 5.000", rating: 5, description: "No Caption.", customerName: "Senna" },
        { id: 3, image: "https://e.top4top.io/p_3506l56gw3.jpg", productName: "Joki Quest Discord", price: "Rp 5.000", rating: 5, description: "No Caption.", customerName: "Galih" },
        { id: 4, image: "https://f.top4top.io/p_3506vcfop4.jpg", productName: "Akun Telegram Old", price: "Rp 100.000", rating: 5, description: "No Caption.", customerName: "Fawaz" },
        { id: 5, image: "https://g.top4top.io/p_35067ihh65.jpg", productName: "Joki Quest Discord", price: "Rp 5.000", rating: 5, description: "No Caption.", customerName: "Vinzz" },
        { id: 6, image: "https://l.top4top.io/p_3881iqbj83.jpg", productName: "Xbox Gamepass 1 Month", price: "Rp 10.000", rating: 5, description: "No Caption.", customerName: "Gamero" },
        { id: 7, image: "https://i.top4top.io/p_350631men7.jpg", productName: "YT Premium 1 Month Invite", price: "Rp 2.000", rating: 5, description: "No Caption.", customerName: "Fawaz" },
        { id: 8, image: "https://c.top4top.io/p_3526prweb1.png", productName: "2x Akun Discord Old", price: "Rp 8.000", rating: 5, description: "No Caption.", customerName: "Marcel" },
        { id: 9, image: "https://g.top4top.io/p_3526w28if1.png", productName: "1x Akun Discord Old", price: "Rp 3.000", rating: 5, description: "No Caption.", customerName: "Furukawa Yudi" },
        { id: 10, image: "https://e.top4top.io/p_3526x1cl31.png", productName: "8x Akun Discord Old", price: "Rp 28.000", rating: 5, description: "No Caption.", customerName: "Furukawa Yudi" },
    ]

    const avgRating = Math.round((testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length) * 10) / 10
    const satisfaction = Math.round((testimonials.filter(t => t.rating >= 4).length / testimonials.length) * 100)

    return (
        <>
            {/* Google Font: Space Grotesk (same as main page) */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }
        
        .testi-hero-glow {
          background: radial-gradient(ellipse 80% 40% at 50% -10%, rgba(250,204,21,0.15), transparent);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .float-anim { animation: float 4s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gradient-text {
          background: linear-gradient(90deg, #facc15, #f97316, #ec4899, #facc15);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          font-family: 'Space Grotesk', sans-serif;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .contact-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.3); }
      `}</style>

            <div className="min-h-screen text-white" style={{ background: "#0a0a0a", fontFamily: "'Space Grotesk', sans-serif" }}>
                <Header />

                {/* Hero Section */}
                <section className="relative pt-28 pb-16 px-4 overflow-hidden testi-hero-glow">
                    {/* Decorative blobs */}
                    <div className="absolute top-16 left-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none"
                        style={{ background: "radial-gradient(circle, #facc15, transparent)" }} />
                    <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full opacity-5 blur-3xl pointer-events-none"
                        style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                            style={{
                                background: "rgba(250,204,21,0.1)",
                                border: "1px solid rgba(250,204,21,0.25)",
                                color: "#facc15",
                            }}
                        >
                            <FaStar style={{ fontSize: "11px" }} />
                            Testimoni &amp; Reputasi
                            <FaStar style={{ fontSize: "11px" }} />
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text leading-tight">
                            RYVEN STORE
                        </h1>
                    </motion.div>
                </section>

                {/* Stats */}
                <section className="px-4 pb-12 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard
                            value={`${testimonials.length}+`}
                            label="Testimoni Positif"
                            sub="Semua hasil nyata"
                            icon={FaHeart}
                            color="#f97316"
                            delay={0.1}
                        />
                        <StatCard
                            value={avgRating}
                            label="Rating Rata-rata"
                            sub="Dari skala 5.0"
                            icon={FaStar}
                            color="#facc15"
                            delay={0.2}
                        />
                        <StatCard
                            value={`${satisfaction}%`}
                            label="Kepuasan Pelanggan"
                            sub="Rating 4+ bintang"
                            icon={FaShieldAlt}
                            color="#4ade80"
                            delay={0.3}
                        />
                    </div>

                    {/* Live stats bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 px-5 py-3 rounded-xl text-center text-sm"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <span style={{ color: "#6b7280" }}>Kami tidak pernah meragukan pelanggan meskipun permintaan aneh-aneh </span>
                    </motion.div>
                </section>

                {/* Grid */}
                <section className="px-4 pb-16 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {testimonials.map((t, i) => (
                            <TestimonialCard
                                key={t.id}
                                testimonial={t}
                                index={i}
                                onImageClick={handleImageClick}
                            />
                        ))}
                    </motion.div>
                </section>

                {/* Contact Section */}
                <section className="px-4 pb-20 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="rounded-2xl p-8 text-center"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.2)" }}
                        >
                            <FaBolt style={{ color: "#facc15", fontSize: "22px" }} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Contact Us
                        </h3>
                        <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>
                            Produk lainnya silahkan hubungi kontak dibawah ini
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <a
                                href="https://wa.me/628991103457"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-btn"
                                style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)", color: "#4ade80" }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                WhatsApp
                            </a>

                            <a
                                href="https://discord.com/users/755606790166675518"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-btn"
                                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                                </svg>
                                Discord
                            </a>

                            <a
                                href="mailto:ryven2929@gmail.com"
                                className="contact-btn"
                                style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#60a5fa" }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.819L12 10.183l9.545-6.362h.819c.904 0 1.636.732 1.636 1.636z" />
                                </svg>
                                Email
                            </a>
                        </div>

                        <div
                            className="mt-5 px-4 py-3 rounded-xl text-xs"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            <p style={{ color: "#9ca3af" }}>
                                <span style={{ color: "#facc15", fontWeight: 600 }}>⏰ Jam Operasional:</span>{" "}
                                Setiap hari, Menyesuaikan Ketersediaan Waktu
                            </p>
                            <p className="mt-1" style={{ color: "#9ca3af" }}>
                                <span style={{ color: "#4ade80", fontWeight: 600 }}>⚡ Respon Cepat:</span>{" "}
                                Saat Waktu Luang
                            </p>
                        </div>
                    </motion.div>
                </section>

                <Footer />

                <ImagePreviewModal
                    isOpen={isImageModalOpen}
                    src={currentImageSrc}
                    alt={currentImageAlt}
                    onClose={handleCloseModal}
                />
            </div>
        </>
    )
}

export default TestimonialPage
