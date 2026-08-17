"use client"
import React, { useEffect, useRef } from "react"

export default function Typing() {
  const typedInstanceRef = useRef(null)

  useEffect(() => {
    const initTyped = () => {
      // Destroy instance sebelumnya jika ada
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy()
        typedInstanceRef.current = null
      }

      typedInstanceRef.current = new window.Typed(".typing", {
        strings: ["𝗥𝘆𝘃𝗲𝗻.", "𝗥𝘆𝘇𝗲𝗻."],
        typeSpeed: 20,
        backSpeed: 20,
        loop: true,
      })
    }

    if (window.Typed) {
      // Library sudah ada (misal kembali dari halaman lain), langsung init
      initTyped()
    } else {
      // Pertama kali load, inject script dulu
      const script = document.createElement("script")
      script.id = "typed-js-script"
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.10/typed.min.js"
      script.async = true
      script.onload = () => initTyped()
      document.body.appendChild(script)
    }

    // Cleanup: destroy instance saat unmount (navigasi keluar)
    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy()
        typedInstanceRef.current = null
      }
    }
  }, [])

  return <span className="typing"></span>
}
