"use client"

import React from "react"
import Link from "next/link"
import { HiArrowRight } from "react-icons/hi"
import { HiOutlineChat } from "react-icons/hi"
import { LuBotMessageSquare } from "react-icons/lu"
import { BiSolidDonateHeart } from "react-icons/bi"
import { IoLogoDiscord } from "react-icons/io5"

const links = [
    {
        title: "Glyphic",
        description: "The Bot currently inactive.",
        url: "/glyphic",
        icon: <LuBotMessageSquare className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "WhatsApp Channels",
        description: "Coming Soon!",
        url: "/404",
        icon: <HiOutlineChat className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "Discord Server",
        description: "Coming Soon!",
        url: "/404",
        icon: <IoLogoDiscord className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "Donate",
        description: "Support us Development.",
        url: "/donate",
        icon: <BiSolidDonateHeart className="w-6 h-6 text-gray-200" />,
    },
]

const Links = () => {
    return (
        <div className="w-full max-w-md mt-6 space-y-3">
            {links.map((link, index) => (
                <Link
                    key={index}
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
            ))}
        </div>
    )
}

export default Links
