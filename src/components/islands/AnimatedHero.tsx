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
          <>
            {' '}
            {enableShine ? (
              highlightedText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  className="text-gradient"
                  style={{
                    display: 'inline',
                  }}
                  animate={{
                    filter: [
                      'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
                      'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.5))',
                      'drop-shadow(0 0 0px rgba(59, 130, 246, 0))',
                    ],
                  }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                    repeat: Infinity,
                    repeatDelay: 6,
                    delay: 2 + index * 0.03,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))
            ) : (
              <span className="text-gradient">{highlightedText}</span>
            )}
          </>
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
