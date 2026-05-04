import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import EtherFlow from './EtherFlow';

const Hero = () => {
  return (
    <section
      id="home"
      style={{ background: '#08080f', minHeight: '100svh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Cinematic animated silk background */}
      <EtherFlow />

      {/* Content — sits above the animation */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 80px',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(155, 127, 212, 0.12)',
            border: '1px solid rgba(155, 127, 212, 0.3)',
            borderRadius: '100px',
            padding: '6px 18px',
            marginBottom: '40px',
            color: '#c0a0e0',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#9b7fd4', display: 'inline-block', boxShadow: '0 0 8px #9b7fd4' }} />
          Premium Digital Engineering Agency
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: 'clamp(52px, 9vw, 108px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: '0 0 32px 0',
            maxWidth: '900px',
            textTransform: 'uppercase',
          }}
        >
          Accelerating{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #9b7fd4 0%, #d4a0c8 40%, #60aede 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Digital
          </span>
          <br />
          Growth
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(200, 200, 220, 0.72)',
            maxWidth: '560px',
            lineHeight: 1.7,
            margin: '0 0 56px 0',
            fontWeight: 400,
          }}
        >
          ToolBite partners with forward-thinking brands to deliver
          transformative digital solutions, performance marketing, and
          high-impact design.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
        >
          <Link
            to="/templates"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 48px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #7c5cbf, #9b7fd4)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 0 40px rgba(155, 127, 212, 0.45), 0 0 80px rgba(155, 127, 212, 0.2)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 60px rgba(155, 127, 212, 0.65), 0 0 100px rgba(155, 127, 212, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(155, 127, 212, 0.45), 0 0 80px rgba(155, 127, 212, 0.2)';
            }}
          >
            Explore Our Work
          </Link>

          <Link
            to="/start-project"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(200, 200, 220, 0.75)',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(200, 200, 220, 0.3)',
              paddingBottom: '2px',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#c0a0e0';
              e.currentTarget.style.borderColor = '#c0a0e0';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(200, 200, 220, 0.75)';
              e.currentTarget.style.borderColor = 'rgba(200, 200, 220, 0.3)';
            }}
          >
            Book a Consultation
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '32px',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(155, 127, 212, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(155, 127, 212, 0.7)',
            backdropFilter: 'blur(8px)',
            background: 'rgba(155, 127, 212, 0.08)',
          }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
