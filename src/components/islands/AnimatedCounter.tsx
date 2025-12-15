/**
 * Animated Counter Component
 *
 * Counts up to a target number when scrolled into view.
 */

import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  label,
  duration = 2,
}: AnimatedCounterProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Extract numeric value and suffix (e.g., "50+" -> 50, "+")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const targetNumber = numericMatch?.[1] ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch?.[2] ?? value;
  const isNumeric = numericMatch !== null;

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView || !isNumeric) {
      return;
    }

    const controls = animate(count, targetNumber, {
      duration,
      ease: 'easeOut',
    });

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, targetNumber, isNumeric, count, rounded, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center"
    >
      <div className="text-5xl font-bold text-gradient">
        {isNumeric ? displayValue : value}
        {isNumeric && suffix}
      </div>
      <p className="mt-2 text-sm text-primary-400">{label}</p>
    </motion.div>
  );
}
