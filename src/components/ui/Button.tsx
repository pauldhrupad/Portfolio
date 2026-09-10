import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleProps = {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps;

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyleProps & {
    disabled?: boolean;
    href: string;
  };

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-accent-primary bg-accent-primary text-white hover:border-accent-primary-hover hover:bg-accent-primary-hover active:bg-accent-primary-active",
  secondary:
    "border-border-strong bg-surface text-text-primary hover:border-border-emphasis hover:bg-surface-hover active:bg-surface-active",
  ghost:
    "border-transparent bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary active:bg-surface-active",
  icon:
    "border-border bg-surface text-text-secondary hover:border-border-emphasis hover:bg-surface-hover hover:text-text-primary active:bg-surface-active",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-base",
};

function getButtonStyles({
  className,
  size = "md",
  variant = "primary",
}: ButtonStyleProps) {
  return cn(
    "tactile-button inline-flex max-w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] border text-center font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
    variantStyles[variant],
    variant === "icon" ? "size-12 p-0" : sizeStyles[size],
    className,
  );
}

export function Button({
  className,
  size,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonStyles({ className, size, variant })}
      type={type}
      {...props}
    />
  );
}

export function ButtonLink({
  children,
  className,
  disabled = false,
  href,
  rel,
  size,
  target,
  variant,
  ...props
}: ButtonLinkProps): ReactElement {
  const styles = getButtonStyles({ className, size, variant });

  if (disabled) {
    return (
      <span aria-disabled="true" className={cn(styles, "cursor-not-allowed opacity-40")} role="link">
        {children as ReactNode}
      </span>
    );
  }

  return (
    <a
      className={styles}
      href={href}
      rel={target === "_blank" ? (rel ?? "noreferrer") : rel}
      target={target}
      {...props}
    >
      {children}
    </a>
  );
}
