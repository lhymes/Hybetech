/**
 * Animated Text Component
 *
 * Text with character-by-character or word-by-word animation.
 */

import { motion } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: 'chars' | 'words' | 'lines';
  delay?: number;
}

export default function AnimatedText({
  text,
  className = '',
  animation = 'words',
  delay = 0,
}: AnimatedTextProps) {
  const items = animation === 'chars'
    ? text.split('')
    : animation === 'words'
    ? text.split(' ')
    : [text];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animation === 'chars' ? 0.02 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`inline-block ${className}`}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block"
        >
          {item}
          {animation === 'words' && i < items.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
}
