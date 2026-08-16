"use client"
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';



// Main Page Component
export default function CyberpunkDonatePage() {
  const [glitchText, setGlitchText] = useState('DONATE');
  const [copySuccess, setCopySuccess] = useState('');
  
  // Copy to clipboard function
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(''), 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };
  
  useEffect(() => {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    const originalText = 'DONATE';
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        const glitched = originalText
          .split('')
          .map(char => Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
          .join('');
        setGlitchText(glitched);
        
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 100);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  const mainStyle = {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden'
  };
  
  const contentStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    paddingTop: '96px'
  };
  
  const titleStyle = {
    fontSize: '60px',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
    marginBottom: '48px',
    background: 'linear-gradient(to right, #fbbf24, #f97316, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };
  
  const qrisContainerStyle = {
    position: 'relative',
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid rgba(107, 114, 128, 0.5)',
    borderRadius: '12px',
    transition: 'all 0.5s ease',
    cursor: 'pointer'
  };
  
  const paymentCardStyle = {
    position: 'relative',
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid rgba(107, 114, 128, 0.3)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };
  
  const footerStyle = {
    position: 'relative',
    marginTop: '48px',
    padding: '24px',
    border: '1px solid rgba(107, 114, 128, 0.5)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'all 0.5s ease'
  };
  
  return (
    <div style={mainStyle} className="grid-bg">
      <Header />
      <main style={contentStyle}>
          {/* Glitch Title */}
          <h1 style={titleStyle}>
            {glitchText}
          </h1>
          
          {/* QRIS Section */}
          <div 
            className="hover-scale hover-glow"
            style={qrisContainerStyle}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#00ffff';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(0, 255, 255, 0.5)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
              <img 
                src="https://files.catbox.moe/jzn65a.jpg" 
                alt="QRIS ALL PAYMENT" 
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  margin: '0 auto',
                  display: 'block',
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0, 255, 255, 0.2)'
                }}
              />
            </div>
            <p style={{
              marginTop: '16px',
              textAlign: 'center',
              color: '#00ffff',
              fontWeight: '600',
              letterSpacing: '2px',
              background: 'linear-gradient(to right, #00ffff, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              QRIS ALL PAYMENT
            </p>
          </div>
          
          {/* Payment Methods */}
          <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* DANA */}
            <div 
              style={{
                ...paymentCardStyle,
                border: '1px solid rgba(59, 130, 246, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.transform = 'scale(1.05) rotate(1deg)';
                e.target.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <img 
                    src="https://telegra.ph/file/c605b34f0d4f0127735b4.jpg" 
                    alt="Dana" 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #3b82f6, #00ffff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>DANA</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#d1d5db', fontFamily: 'monospace' }}>082159690832</p>
                    <button
                      onClick={() => copyToClipboard('082159690832', 'dana')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3b82f6',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                      </svg>
                    </button>
                    {copySuccess === 'dana' && (
                      <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold' }}>Copied!</span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>M. F**** N*** I****</p>
                </div>
                <div style={{ color: '#3b82f6', opacity: 0.5 }}>
                  <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* GOPAY */}
            <div 
              style={{
                ...paymentCardStyle,
                border: '1px solid rgba(34, 197, 94, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#22c55e';
                e.target.style.transform = 'scale(1.05) rotate(-1deg)';
                e.target.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <img 
                    src="https://files.catbox.moe/hrnxyn.webp" 
                    alt="Gopay" 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(34, 197, 94, 0.2)'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #22c55e, #10b981)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>GOPAY</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#d1d5db', fontFamily: 'monospace' }}>082159690832</p>
                    <button
                      onClick={() => copyToClipboard('082159690832', 'gopay')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#22c55e',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                      </svg>
                    </button>
                    {copySuccess === 'gopay' && (
                      <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold' }}>Copied!</span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>M. F**** N*** I****</p>
                </div>
                <div style={{ color: '#22c55e', opacity: 0.5 }}>
                  <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div 
            style={footerStyle}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#9333ea';
              e.target.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <p style={{
              fontSize: '18px',
              fontWeight: '600',
              background: 'linear-gradient(to right, #9333ea, #ec4899, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Thanks yang sudah Donasi!
            </p>
            <p style={{ color: '#00ffff', marginTop: '8px' }}>Semoga rezekinya dilancarkan</p>
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#9333ea',
                    borderRadius: '50%',
                    animation: `pulse ${2}s ease-in-out infinite ${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
      </main>
    </div>
  );
}
