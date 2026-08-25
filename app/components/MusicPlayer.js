"use client"

import { useEffect, useRef } from "react"

export default function MusicPlayer() {
    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        audio.volume = 0.4
        audio.loop = true

        const tryPlay = () => {
            audio.play().catch(() => {
                // Autoplay blocked — try again on first user interaction
                const unlock = () => {
                    audio.play().catch(() => { })
                    document.removeEventListener("click", unlock)
                    document.removeEventListener("touchstart", unlock)
                    document.removeEventListener("keydown", unlock)
                }
                document.addEventListener("click", unlock, { once: true })
                document.addEventListener("touchstart", unlock, { once: true })
                document.addEventListener("keydown", unlock, { once: true })
            })
        }

        tryPlay()
    }, [])

    return (
        <audio
            ref={audioRef}
            src="/Eisodus.mp3"
            preload="auto"
            style={{ display: "none" }}
        />
    )
}
