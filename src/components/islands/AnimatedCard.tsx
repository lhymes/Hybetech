/**
 * Animated Card Component
 *
 * Interactive card with hover animations and optional stagger effect.
 */

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  href?: string;
  className?: string;
}

export default function AnimatedCard({
  children,
  index = 0,
  href,
  className = '',
}: AnimatedCardProps) {
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className={`card card-hover ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{cardContent}</a>;
  }

  return cardContent;
}
