/**
 * FrostedImage - Image with frosted overlay that fades on scroll
 *
 * Creates a frosted glass effect over the image that fades away
 * when the image comes into view.
 */

import { motion, useInView } from 'motion/react';
import { useRef, type ReactNode } from 'react';

interface FrostedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  children?: ReactNode;
}

export default function FrostedImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  loading = 'lazy',
  children,
}: FrostedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`relative overflow-hidden ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
      />

      {/* Persistent overlay (gradient, etc.) */}
      {children}

      {/* Frosted overlay that fades */}
      <motion.div
        className="absolute inset-0 bg-primary-900/60 backdrop-blur-md"
        initial={{ opacity: 1 }}
        animate={{ opacity: isInView ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
