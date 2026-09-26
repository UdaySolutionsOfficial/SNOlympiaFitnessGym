import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { useMagnetic } from '../../hooks/useMagnetic';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      magnetic = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const { ref: magneticRef, offset } = useMagnetic<HTMLButtonElement>({
      strength: 0.2,
      disabled: !magnetic || disabled,
    });

    // Merge internal magnetic ref with external ref
    const setRefs = (el: HTMLButtonElement | null) => {
      magneticRef.current = el;
      if (typeof forwardedRef === 'function') {
        forwardedRef(el);
      } else if (forwardedRef) {
        forwardedRef.current = el;
      }
    };

    const baseStyles = cn(
      'relative inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 select-none overflow-hidden rounded-md',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-volt',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none'
    );

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8 tracking-wider',
      md: 'text-xs md:text-sm px-5 py-2.5 gap-2 h-11 tracking-wider',
      lg: 'text-sm md:text-base px-7 py-3.5 gap-2.5 h-13 tracking-widest font-extrabold',
    };

    const variantStyles: Record<ButtonVariant, string> = {
      primary: cn(
        'bg-brand-volt text-white hover:bg-brand-volt-hover active:bg-brand-volt-active',
        'shadow-[0_0_20px_rgba(255,94,30,0.35)] hover:shadow-[0_0_30px_rgba(255,94,30,0.55)]',
        'active:scale-[0.98]'
      ),
      secondary: cn(
        'bg-brand-surface text-brand-text-primary border border-brand-border hover:border-brand-volt/50 hover:bg-brand-surface-hover',
        'hover:text-brand-volt active:scale-[0.98]'
      ),
      glass: cn(
        'bg-brand-surface/60 backdrop-blur-md text-brand-text-primary border border-white/10 hover:border-brand-volt/40 hover:bg-brand-surface/80',
        'active:scale-[0.98]'
      ),
      tertiary: cn(
        'bg-transparent text-brand-text-secondary hover:text-brand-volt p-0 h-auto font-medium hover:underline underline-offset-4',
        'active:scale-[0.98]'
      ),
    };

    const magneticTransform =
      magnetic && !disabled && (offset.x !== 0 || offset.y !== 0)
        ? { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }
        : undefined;

    return (
      <button
        ref={setRefs}
        style={magneticTransform}
        disabled={disabled}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0 items-center transition-transform duration-200 group-hover:translate-x-0.5">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
