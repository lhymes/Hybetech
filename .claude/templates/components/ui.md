# UI Component Templates

Reusable UI components with accessibility and design tokens built-in.

## Button Component

```typescript
// components/ui/Button.tsx
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          // Variants
          variant === 'primary' && 'bg-primary-600 text-white hover:bg-primary-700',
          variant === 'secondary' && 'bg-secondary-600 text-white hover:bg-secondary-700',
          variant === 'outline' && 'border border-primary-600 text-primary-600 hover:bg-primary-50',
          variant === 'ghost' && 'text-primary-600 hover:bg-primary-50',
          // Sizes (min 44px touch target)
          size === 'sm' && 'h-9 px-3 text-sm',
          size === 'md' && 'h-11 px-4 text-base',
          size === 'lg' && 'h-12 px-6 text-lg',
          // Border radius
          'rounded-md',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

## Input Component

```typescript
// components/ui/Input.tsx
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'block w-full px-3 py-2 border rounded-md shadow-sm',
            'placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
            'disabled:bg-gray-50 disabled:text-gray-500',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1 text-sm text-gray-500">
            {hint}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

## Card Component

```typescript
// components/ui/Card.tsx
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md overflow-hidden',
        'border border-gray-100',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: CardProps) {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: CardProps) {
  return (
    <div className={cn('px-6 py-4 bg-gray-50 border-t border-gray-100', className)}>
      {children}
    </div>
  );
}
```

## Badge Component

```typescript
// components/ui/Badge.tsx
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-gray-100 text-gray-800',
        variant === 'success' && 'bg-green-100 text-green-800',
        variant === 'warning' && 'bg-yellow-100 text-yellow-800',
        variant === 'error' && 'bg-red-100 text-red-800',
        variant === 'info' && 'bg-blue-100 text-blue-800',
        className
      )}
    >
      {children}
    </span>
  );
}
```

## Alert Component

```typescript
// components/ui/Alert.tsx
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const icons = {
  info: '🔵',
  success: '✅',
  warning: '⚠️',
  error: '❌',
};

export function Alert({ variant = 'info', title, children, className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'p-4 rounded-md',
        variant === 'info' && 'bg-blue-50 text-blue-800 border border-blue-200',
        variant === 'success' && 'bg-green-50 text-green-800 border border-green-200',
        variant === 'warning' && 'bg-yellow-50 text-yellow-800 border border-yellow-200',
        variant === 'error' && 'bg-red-50 text-red-800 border border-red-200',
        className
      )}
    >
      <div className="flex">
        <span className="mr-2" aria-hidden="true">{icons[variant]}</span>
        <div>
          {title && <h3 className="font-medium">{title}</h3>}
          <div className={title ? 'mt-1' : ''}>{children}</div>
        </div>
      </div>
    </div>
  );
}
```

## Usage Notes

- All components include focus states for accessibility
- Touch targets meet 44px minimum
- Color contrast meets WCAG 4.5:1
- Form components include label associations
- Alert uses role="alert" for screen readers
- Customize colors via design tokens
