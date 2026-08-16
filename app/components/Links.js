"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FaPlay, FaPause, FaVolumeUp, FaMusic } from "react-icons/fa"
import { HiArrowRight } from "react-icons/hi"
import { HiOutlineChat } from "react-icons/hi"
import { LuBotMessageSquare } from "react-icons/lu"
import { BiSolidDonateHeart } from "react-icons/bi"
import { IoLogoDiscord } from "react-icons/io5"

// Lyrics with timestamps (in seconds) - Accurate timing from provided timestamps
const lyricsWithTimestamps = [
    { time: 0, text: "..." },
    { time: 23, text: "Ku mencinta kau tak pernah tahu" },
    { time: 30, text: "Ku mendekat kau tak pernah sadar" },
    { time: 34, text: "Haruskah ku diam pendam semua rasa?" },
    { time: 41, text: "Biarkan ku sakit tanpa kau tahu" },
    { time: 49, text: "Ada saatnya ku lelah berjuang" },
    { time: 56, text: "Namun hati tetap mau kamu" },
    { time: 60, text: "Tolong kamu sadar ada ku di sini" },
    { time: 67, text: "Yang tak bisa menghilangkan bayanganmu" },
    { time: 73, text: "Jika harus sakit biarkan ku sakit" },
    { time: 80, text: "Jika harus nangis biarkan ku menangis" },
    { time: 86, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 93, text: "Biarkan ku jatuh sampai lebam" },
    { time: 99, text: "Jika harus memohon aku siap memohon" },
    { time: 106, text: "Namun ternyata hati kuat ada rapuhnya" },
    { time: 111, text: "Sampai di titik ini aku angkat tangan" },
    { time: 119, text: "Aku menyerah" },
    { time: 129, text: "Ada saatnya ku lelah berjuang" },
    { time: 136, text: "Namun hati tetap mau kamu" },
    { time: 140, text: "Tolong kamu sadar ada ku di sini" },
    { time: 148, text: "Yang tak bisa menghilangkan bayanganmu" },
    { time: 153, text: "Jika harus sakit biarkan ku sakit" },
    { time: 160, text: "Jika harus nangis biarkan ku menangis" },
    { time: 166, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 175, text: "Biarkan ku jatuh sampai lebam" },
    { time: 180, text: "Jika harus memohon aku siap memohon" },
    { time: 186, text: "Namun ternyata hati kuat ada rapuhnya" },
    { time: 192, text: "Sampai di titik ini aku angkat tangan" },
    { time: 200, text: "Aku Menyerah" },
    { time: 208, text: "Semua kulakukan agar kau datang ke hatiku" },
    { time: 214, text: "Namun sulit bila kamu tak ingin" },
    { time: 219, text: "Dan batas sabarku telah berakhir" },
    { time: 241, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 249, text: "Biarkan ku jatuh sampai lebam" },
    { time: 257, text: "Jika harus sakit biarkan ku sakit" },
    { time: 264, text: "Jika harus nangis biarkan ku menangis" },
    { time: 270, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 278, text: "Biarkan ku jatuh sampai lelah" },
    { time: 284, text: "Jika harus memohon aku siap memohon" },
    { time: 290, text: "Namun ternyata hati kuat ada rapuhnya" },
    { time: 296, text: "Sampai di titik ini angkat tangan" },
    { time: 304, text: "Aku..." },
    { time: 312, text: "..." },
    { time: 322, text: "Menyerah..." },
];

const links = [
    {
        title: "Glyphic",
        description: "My First Projects Bot Glyphic",
        url: "https://wa.me/6283875901265",
        icon: <LuBotMessageSquare className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "WhatsApp Channels",
        description: "Follow untuk seputar info/kode",
        url: "https://whatsapp.com/channel/0029VaSY7Lp8F2pCmQLKNn0g",
        icon: <HiOutlineChat className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "Discord Server",
        description: "Gabung untuk bertanya dan berdiskusi ",
        url: "https://discord.gg/vUrwqNAzBd",
        icon: <IoLogoDiscord className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "Donate",
        description: "Jajanin aku please...",
        url: "/donate",
        icon: <BiSolidDonateHeart className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "",
        isSpotify: true,
        songTitle: "Angkat Tangan",
        artist: "Asila Maisa",
        albumArt: "https://files.catbox.moe/tjkp83.jpg",
        url: "#",
        audioSrc: "https://files.catbox.moe/xmgy7h.mp3",
        lyrics: lyricsWithTimestamps
    },
]

const SpotifyPlayer = ({ link }) => {
    const audioRef = useRef(null)
    const audioContextRef = useRef(null)
    
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [audioEnabled, setAudioEnabled] = useState(true)
    const [error, setError] = useState(null)
    const [volume, setVolume] = useState(0.7)
    const [currentTime, setCurrentTime] = useState(0)
    const [currentLyric, setCurrentLyric] = useState("Langkah kecil hari ini akan membawa kamu ke kemenangan besar.")

    // Function to get current lyric based on time
    const getCurrentLyric = (time) => {
        if (!link.lyrics) return link.artist || "Motivational Quote"
        
        let currentLyricText = link.artist || "Motivational Quote"
        
        for (let i = 0; i < link.lyrics.length; i++) {
            if (time >= link.lyrics[i].time) {
                currentLyricText = link.lyrics[i].text
            } else {
                break
            }
        }
        
        return currentLyricText
    }

    // Update current time and lyrics
    useEffect(() => {
        if (!audioRef.current || !isPlaying) return

        const updateTime = () => {
            const audio = audioRef.current
            if (audio) {
                const time = audio.currentTime
                setCurrentTime(time)
                setCurrentLyric(getCurrentLyric(time))
            }
        }

        const interval = setInterval(updateTime, 100) // Update every 100ms for smooth lyric changes

        return () => clearInterval(interval)
    }, [isPlaying, link.lyrics])

    // Setup audio when enabled
    useEffect(() => {
        if (!audioEnabled || !audioRef.current) return

        const audio = audioRef.current
        
        // Audio event listeners
        const handleLoadStart = () => setIsLoading(true)
        const handleCanPlay = () => {
            setIsLoading(false)
            setError(null)
        }
        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)
        const handleEnded = () => {
            setIsPlaying(false)
            setCurrentLyric(link.artist || "Motivational Quote") // Reset to default
        }
        const handleError = (e) => {
            setError('Failed to load audio')
            setIsLoading(false)
            console.error('Audio error:', e)
        }
        const handleTimeUpdate = () => {
            const time = audio.currentTime
            setCurrentTime(time)
            setCurrentLyric(getCurrentLyric(time))
        }

        audio.addEventListener('loadstart', handleLoadStart)
        audio.addEventListener('canplay', handleCanPlay)
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)
        audio.addEventListener('ended', handleEnded)
        audio.addEventListener('error', handleError)
        audio.addEventListener('timeupdate', handleTimeUpdate)

        // Set volume
        audio.volume = volume

        // Auto play when audio is ready
        const autoPlay = async () => {
            try {
                await audio.play()
                setIsPlaying(true)
            } catch (err) {
                console.log('Auto play failed (browser policy):', err)
                setAudioEnabled(false)
            }
        }

        // Try auto play after a short delay
        const timer = setTimeout(autoPlay, 500)

        return () => {
            clearTimeout(timer)
            audio.removeEventListener('loadstart', handleLoadStart)
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
            audio.removeEventListener('ended', handleEnded)
            audio.removeEventListener('error', handleError)
            audio.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [audioEnabled, volume])

    const enableAudio = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        setAudioEnabled(true)
        
        setTimeout(async () => {
            try {
                if (audioRef.current) {
                    await audioRef.current.play()
                }
            } catch (err) {
                console.log('Initial play failed:', err)
            }
        }, 100)
    }

    const togglePlay = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (!audioEnabled) {
            return enableAudio(e)
        }

        if (!audioRef.current) return

        try {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume()
            }

            if (isPlaying) {
                audioRef.current.pause()
            } else {
                await audioRef.current.play()
            }
        } catch (err) {
            console.error('Toggle play error:', err)
            setError('Playbook failed')
        }
    }

    return (
        <div 
            className="flex items-center space-x-3 w-full relative cursor-pointer"
            onClick={togglePlay}
        >
            <div className="relative w-10 h-10 group">
                <img
                    src={link.albumArt}
                    alt="Album Art"
                    className="w-full h-full rounded-full object-cover"
                />
                
                {/* Control Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {!audioEnabled ? (
                        <FaVolumeUp className="text-white text-xs" />
                    ) : isLoading ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : isPlaying ? (
                        <FaPause className="text-white text-xs" />
                    ) : (
                        <FaPlay className="text-white text-xs ml-0.5" />
                    )}
                </div>
            </div>
            
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <FaMusic className="text-gray-400 text-sm" />
                    <span className="text-xs text-gray-400 font-medium">
                        {!audioEnabled ? 'Click to Play' : 
                         isLoading ? 'Loading...' : 
                         error ? 'Error' :
                         isPlaying ? 'Now Playing' : 'Paused'}
                    </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                    <em>{currentLyric}</em>
                </p>
            </div>
            
            {/* Sound waves animation */}
            {isPlaying && (
                <div className="flex items-center space-x-0.5">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="w-0.5 bg-gray-400 rounded-full animate-pulse"
                            style={{
                                height: `${Math.random() * 12 + 8}px`,
                                animationDelay: `${i * 0.15}s`,
                                animationDuration: '0.8s'
                            }}
                        ></div>
                    ))}
                </div>
            )}
            
            <audio 
                ref={audioRef} 
                src={link.audioSrc} 
                preload="auto"
                playsInline
                crossOrigin="anonymous"
            />
        </div>
    )
}

const Links = () => {
    return (
        <div className="w-full max-w-md mt-6 space-y-3">
            {links.map((link, index) => (
                <div key={index}>
                    {link.isSpotify ? (
                        <div className="flex items-center justify-between p-3 bg-black border border-gray-500 transition-all duration-300 group text-white rounded-lg hover:border-gray-400">
                            <SpotifyPlayer link={link} />
                        </div>
                    ) : (
                        <Link
                            href={link.url}
                            className="flex items-center justify-between p-3 bg-black border border-gray-500 transition-all duration-300 cursor-pointer group text-white rounded-lg hover:border-gray-400"
                        >
                            <div className="flex items-center space-x-3 w-full">
                                {typeof link.icon === "string" && link.icon.endsWith(".svg") ? (
                                    <img
                                        src={link.icon}
                                        alt={link.title}
                                        className="w-6 h-6"
                                        style={{ filter: "invert(1)" }}
                                    />
                                ) : (
                                    <span className="text-lg">{link.icon}</span>
                                )}
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium">
                                        {link.title}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        {link.description}
                                    </p>
                                </div>
                                <HiArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                            </div>
                        </Link>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Links
