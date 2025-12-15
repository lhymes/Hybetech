/**
 * Animated Card Component
 *
 * Interactive card with CSS hover effects and Motion entrance animation.
 * Uses CSS for hover to avoid sluggish JS-based hover detection.
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
      className={`card group cursor-pointer transition-all duration-150 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-500/10 hover:border-accent-500/30 ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <a href={href} className="block">{cardContent}</a>;
  }

  return cardContent;
}
