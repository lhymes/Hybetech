/**
 * Floating Elements Component
 *
 * Animated floating shapes for visual interest in hero sections.
 */

import { motion } from 'motion/react';

interface FloatingElementsProps {
  variant?: 'default' | 'minimal' | 'dense';
}

export default function FloatingElements({ variant = 'default' }: FloatingElementsProps) {
  const elements = variant === 'minimal' ? 3 : variant === 'dense' ? 8 : 5;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: elements }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent-500/10 blur-3xl"
          style={{
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-accent-500/20 to-violet-500/20 blur-3xl"
        style={{ right: '10%', top: '20%' }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cta-primary/20 to-accent-500/20 blur-3xl"
        style={{ left: '5%', bottom: '20%' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
