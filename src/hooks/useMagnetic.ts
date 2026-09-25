import { useRef, useState, useCallback, useEffect } from 'react';

interface MagneticOptions {
  strength?: number;
  disabled?: boolean;
}

/**
 * Creates subtle magnetic attraction towards the cursor for premium CTAs.
 * Automatically disabled on touch screens.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 0.25,
  disabled = false,
}: MagneticOptions = {}) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (disabled || !ref.current || window.matchMedia('(pointer: coarse)').matches) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      setOffset({ x: deltaX, y: deltaY });
    },
    [strength, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, offset };
}
