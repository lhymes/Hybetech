/**
 * Animated Hero Component
 *
 * Full hero section with staggered entrance animations.
 * Features glow and shine effects on highlighted text.
 */

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface AnimatedHeroProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  description: string;
  children?: ReactNode;
  enableShine?: boolean;
}

export default function AnimatedHero({
  badge,
  title,
  highlightedText,
  description,
  children,
  enableShine = true,
}: AnimatedHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl"
    >
      {badge && (
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-accent-400"
          />
          <span className="text-sm font-medium text-accent-400">{badge}</span>
        </motion.div>
      )}

      <motion.h1
        variants={itemVariants}
        className="text-display font-heading font-bold text-primary-100 leading-tight text-balance"
      >
        {title}
        {highlightedText && (
          <span className="relative inline-block">
            <span
              className="text-gradient"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.2))',
              }}
            >
              {' '}{highlightedText}
            </span>
            {/* Shine overlay */}
            {enableShine && (
              <motion.span
                className="absolute inset-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
              >
                <motion.span
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 60%, transparent 100%)',
                    transform: 'skewX(-20deg)',
                  }}
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: 2,
                  }}
                />
              </motion.span>
            )}
          </span>
        )}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-6 text-body-lg text-primary-300 max-w-2xl"
      >
        {description}
      </motion.p>

      {children && (
        <motion.div variants={itemVariants} className="mt-10">
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
