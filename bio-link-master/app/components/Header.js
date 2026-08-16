"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Typing from "./Typing"

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const menuVariants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/testimonial", label: "Testimoni & Reputasi" }
    ]

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50">
            <nav className="p-3 bg-black border-b border-gray-800">
                <div className="container mx-auto flex justify-between items-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/"
                            className="text-lg font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                            <Typing/>
                        </Link>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-gray-700 transition-all">
                            <div className="flex flex-col gap-1.5 w-6">
                                <motion.span
                                    animate={{
                                        rotate: isOpen ? 45 : 0,
                                        y: isOpen ? 8 : 0
                                    }}
                                    className="block h-0.5 bg-white origin-center"/>
                                <motion.span
                                    animate={{
                                        opacity: isOpen ? 0 : 1
                                    }}
                                    className="block h-0.5 bg-white"/>
                                <motion.span
                                    animate={{
                                        rotate: isOpen ? -45 : 0,
                                        y: isOpen ? -8 : 0
                                    }}
                                    className="block h-0.5 bg-white origin-center"/>
                            </div>
                        </motion.button>
                    </div>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={menuVariants}
                            className="absolute top-full left-0 right-0 bg-black border-b border-gray-800">
                            <nav className="max-w-7xl mx-auto p-4">
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0 },
                                        animate: {
                                            opacity: 1,
                                            transition: { staggerChildren: 0.1 }
                                        }
                                    }}
                                    className="space-y-2">
                                    {navLinks.map(link => (
                                        <motion.div
                                            key={link.href}
                                            variants={{
                                                initial: { x: -20, opacity: 0 },
                                                animate: { x: 0, opacity: 1 }
                                            }}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-4 py-2 rounded-lg text-white hover:bg-gray-700 transition-all">
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    )
}

export default Header
