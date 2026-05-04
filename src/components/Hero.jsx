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

        {/* Main headline — pure white, ALL CAPS, matching mockup exactly */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: 'clamp(48px, 8.5vw, 104px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: '0 0 28px 0',
            maxWidth: '960px',
            textTransform: 'uppercase',
            textShadow: '0 2px 40px rgba(0,0,0,0.5)',
          }}
        >
          Accelerating Digital
          <br />
          Growth
        </motion.h1>

        {/* Subtitle — light grey, matching mockup */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            color: 'rgba(210, 210, 230, 0.65)',
            maxWidth: '520px',
            lineHeight: 1.75,
            margin: '0 0 52px 0',
            fontWeight: 400,
          }}
        >
          ToolBite partners with forward-thinking brands to deliver
          transformative digital solutions, performance marketing,
          and high-impact design.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
        >
          {/* Primary CTA — flat muted lavender pill, matching mockup exactly */}
          <Link
            to="/templates"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px 44px',
              borderRadius: '100px',
              background: 'rgba(120, 104, 184, 0.85)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(160, 140, 220, 0.4)',
              backdropFilter: 'blur(12px)',
              transition: 'background 0.25s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(140, 120, 210, 0.95)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(120, 104, 184, 0.85)';
              e.currentTarget.style.transform = 'scale(1)';
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
