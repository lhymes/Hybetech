/**
 * Animated Card Component
 *
 * Interactive card with CSS hover effects and smooth entrance animation.
 * Uses CSS transitions to avoid hydration flash issues on mobile.
 */

import { useInView } from 'motion/react';
import { useRef, type ReactNode } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const cardContent = (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.4s ease-out ${index * 0.08}s, transform 0.4s ease-out ${index * 0.08}s`,
      }}
      className={`card group cursor-pointer transition-shadow duration-150 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-500/10 hover:border-accent-500/30 ${className}`}
    >
      {children}
    </div>
  );

  if (href) {
    return <a href={href} className="block">{cardContent}</a>;
  }

  return cardContent;
}
