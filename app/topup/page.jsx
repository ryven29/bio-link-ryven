"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Shield, Clock, Users, Star, MessageCircle, Instagram, Send, Coins } from 'lucide-react';

const RyvenStore = () => {
  const [selectedGame, setSelectedGame] = useState('mobile-legends');

  const games = {
    'mobile-legends': {
      name: 'Mobile Legends',
      packages: [
        { diamonds: 86, price: 'Rp 20.000', bonus: '+8 Bonus' },
        { diamonds: 172, price: 'Rp 40.000', bonus: '+16 Bonus' },
        { diamonds: 257, price: 'Rp 60.000', bonus: '+25 Bonus' },
        { diamonds: 344, price: 'Rp 80.000', bonus: '+34 Bonus' },
        { diamonds: 429, price: 'Rp 100.000', bonus: '+43 Bonus' },
        { diamonds: 514, price: 'Rp 120.000', bonus: '+51 Bonus' },
        { diamonds: 706, price: 'Rp 160.000', bonus: '+71 Bonus' },
        { diamonds: 1412, price: 'Rp 320.000', bonus: '+141 Bonus' }
      ],
      currency: 'Diamonds'
    },
    'free-fire': {
      name: 'Free Fire',
      packages: [
        { diamonds: 70, price: 'Rp 10.000', bonus: '+7 Bonus' },
        { diamonds: 140, price: 'Rp 20.000', bonus: '+14 Bonus' },
        { diamonds: 355, price: 'Rp 50.000', bonus: '+35 Bonus' },
        { diamonds: 720, price: 'Rp 100.000', bonus: '+72 Bonus' },
        { diamonds: 1450, price: 'Rp 200.000', bonus: '+145 Bonus' },
        { diamonds: 2180, price: 'Rp 300.000', bonus: '+218 Bonus' },
        { diamonds: 3640, price: 'Rp 500.000', bonus: '+364 Bonus' },
        { diamonds: 7290, price: 'Rp 1.000.000', bonus: '+729 Bonus' }
      ],
      currency: 'Diamonds'
    },
    'pubg': {
      name: 'PUBG Mobile',
      packages: [
        { diamonds: 60, price: 'Rp 15.000', bonus: '+6 Bonus' },
        { diamonds: 325, price: 'Rp 75.000', bonus: '+32 Bonus' },
        { diamonds: 660, price: 'Rp 150.000', bonus: '+66 Bonus' },
        { diamonds: 1800, price: 'Rp 400.000', bonus: '+180 Bonus' },
        { diamonds: 3850, price: 'Rp 800.000', bonus: '+385 Bonus' },
        { diamonds: 8100, price: 'Rp 1.600.000', bonus: '+810 Bonus' }
      ],
      currency: 'UC'
    },
    'wuthering-waves': {
      name: 'Wuthering Waves',
      packages: [
        { diamonds: 60, price: 'Rp 15.000', bonus: '+6 Bonus' },
        { diamonds: 300, price: 'Rp 75.000', bonus: '+30 Bonus' },
        { diamonds: 980, price: 'Rp 250.000', bonus: '+98 Bonus' },
        { diamonds: 1980, price: 'Rp 500.000', bonus: '+198 Bonus' },
        { diamonds: 3280, price: 'Rp 800.000', bonus: '+328 Bonus' },
        { diamonds: 6480, price: 'Rp 1.600.000', bonus: '+648 Bonus' }
      ],
      currency: 'Lunite'
    }
  };

  const testimonials = [
    {
      name: 'Ahmad R.',
      rating: 5,
      comment: 'Proses cepat banget! Kurang dari 5 menit diamonds udah masuk. Recommended!',
      game: 'Mobile Legends'
    },
    {
      name: 'Sari W.',
      rating: 5,
      comment: 'Harga murah, pelayanan ramah, dan terpercaya. Udah langganan di sini.',
      game: 'Free Fire'
    },
    {
      name: 'Doni P.',
      rating: 5,
      comment: 'CS nya responsif banget, langsung diproses setelah pembayaran. Mantap!',
      game: 'PUBG Mobile'
    },
    {
      name: 'Lisa M.',
      rating: 5,
      comment: 'Top up Wuthering Waves disini selalu aman dan cepat. Terima kasih Ryven Store!',
      game: 'Wuthering Waves'
    }
  ];

  const whyChooseUs = [
    {
      icon: <Clock className="text-3xl text-blue-500" />,
      title: 'Proses Cepat',
      description: 'Top up diproses dalam waktu 1-5 menit setelah pembayaran berhasil'
    },
    {
      icon: <Shield className="text-3xl text-green-500" />,
      title: '100% Aman',
      description: 'Transaksi aman dengan sistem keamanan terpercaya dan terjamin'
    },
    {
      icon: <Coins className="text-3xl text-yellow-500" />,
      title: 'Harga Terbaik',
      description: 'Harga kompetitif dengan bonus menarik untuk setiap pembelian'
    },
    {
      icon: <Users className="text-3xl text-purple-500" />,
      title: 'CS 24/7',
      description: 'Customer service siap membantu Anda kapan saja selama 24 jam'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-black/20 backdrop-blur-lg border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <Gamepad2 className="text-3xl text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Ryven Store</h1>
            </motion.div>
<nav className="hidden md:flex space-x-6">
              <a href="#games" className="text-white font-semibold text-lg shadow-lg hover:text-cyan-300 hover:scale-105 transition-all duration-200">Games</a>
              <a href="#why-us" className="text-white font-semibold text-lg shadow-lg hover:text-cyan-300 hover:scale-105 transition-all duration-200">Mengapa Kami</a>
              <a href="#testimonials" className="text-white font-semibold text-lg shadow-lg hover:text-cyan-300 hover:scale-105 transition-all duration-200">Testimoni</a>
              <a href="#contact" className="text-white font-semibold text-lg shadow-lg hover:text-cyan-300 hover:scale-105 transition-all duration-200">Kontak</a>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="py-20 text-center"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Top Up Game
<span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-pink-300 to-purple-200 drop-shadow-md">
  Tercepat & Termurah
</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Dapatkan diamonds, UC, dan currency game favorit Anda dengan harga terbaik dan proses yang super cepat!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-2xl">
              Top Up Sekarang
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Games Section */}
      <section id="games" className="py-20">
        <div className="container mx-auto px-6">
          <motion.h3 
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Pilih Game Favorit Anda
          </motion.h3>
          
          {/* Game Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(games).map(([key, game]) => (
              <motion.button
                key={key}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedGame === key
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => setSelectedGame(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {game.name}
              </motion.button>
            ))}
          </div>

          {/* Game Packages */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            key={selectedGame}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {games[selectedGame].packages.map((pkg, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-cyan-400/50 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {pkg.diamonds}
                  </div>
                  <div className="text-white mb-2">
                    {games[selectedGame].currency}
                  </div>
                  <div className="text-green-400 text-sm mb-4">
                    {pkg.bonus}
                  </div>
                  <div className="text-2xl font-bold text-white mb-4">
                    {pkg.price}
                  </div>
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all transform group-hover:scale-105">
                    Beli Sekarang
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.h3 
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Mengapa Harus Pilih Ryven Store?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-cyan-400 mb-2">50,000+</div>
              <div className="text-white">Top Up Mobile Legends</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-purple-400 mb-2">30,000+</div>
              <div className="text-white">Top Up Free Fire</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-400 mb-2">25,000+</div>
              <div className="text-white">Top Up PUBG Mobile</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">15,000+</div>
              <div className="text-white">Top Up Wuthering Waves</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.h3 
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Testimoni Pelanggan
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 text-sm fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm">"{testimonial.comment}"</p>
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-cyan-400 text-sm">{testimonial.game}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <motion.h3 
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Hubungi Kami
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.a
              href="https://wa.me/628991103457"
              className="flex items-center space-x-3 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="text-xl" />
              <span>WhatsApp</span>
            </motion.a>
            <motion.a
              href="https://instagram.com/fikrinrirham"
              className="flex items-center space-x-3 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="text-xl" />
              <span>Instagram</span>
            </motion.a>
            <motion.a
              href="https://t.me/Ry_ven"
              className="flex items-center space-x-3 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="text-xl" />
              <span>Telegram</span>
            </motion.a>
          </div>
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300">
              Customer Service tersedia 24/7 untuk membantu Anda
            </p>
            <p className="text-cyan-400 font-semibold mt-2">
              Respon cepat dalam 1-2 menit!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Gamepad2 className="text-2xl text-cyan-400" />
            <h4 className="text-xl font-bold text-white">Ryven Store</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Platform top up game terpercaya dengan harga terbaik dan layanan 24/7
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 Ryven Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RyvenStore;
