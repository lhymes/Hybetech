/**
 * ShineText Component
 *
 * Adds a glow and animated shine effect to text.
 * Can be used on headers and key text throughout the site.
 */

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface ShineTextProps {
  children: ReactNode;
  className?: string;
  /** Enable the glow effect */
  glow?: boolean;
  /** Enable the animated shine sweep */
  shine?: boolean;
  /** Delay before first shine animation (seconds) */
  shineDelay?: number;
  /** Time between shine animations (seconds) */
  shineInterval?: number;
  /** Duration of shine animation (seconds) */
  shineDuration?: number;
  /** Use gradient text styling */
  gradient?: boolean;
  /** Custom glow color (CSS filter value) */
  glowFilter?: string;
}

export default function ShineText({
  children,
  className = '',
  glow = true,
  shine = true,
  shineDelay = 2,
  shineInterval = 5,
  shineDuration = 1.5,
  gradient = true,
  glowFilter = 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.2))',
}: ShineTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className={gradient ? 'text-gradient' : ''}
        style={glow ? { filter: glowFilter } : undefined}
      >
        {children}
      </span>

      {/* Shine overlay */}
      {shine && (
        <motion.span
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <motion.span
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 60%, transparent 100%)',
              transform: 'skewX(-20deg)',
            }}
            initial={{ x: '-150%' }}
            animate={{ x: '150%' }}
            transition={{
              duration: shineDuration,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: shineInterval,
              delay: shineDelay,
            }}
          />
        </motion.span>
      )}
    </span>
  );
}
