import type {
  AnchorHTMLAttributes,
  ComponentPropsWithRef,
} from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleProps = {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonProps = ComponentPropsWithRef<"button"> & ButtonStyleProps;

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyleProps & {
    disabled?: boolean;
    href: string;
  };

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-action text-action-text hover:bg-action-hover active:bg-action-active",
  secondary:
    "border-border-strong bg-surface text-text-primary hover:border-border-emphasis hover:bg-surface-hover active:bg-surface-active",
  ghost:
    "border-transparent bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary active:bg-surface-active",
  icon:
    "border-transparent bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary active:bg-surface-active aria-checked:bg-surface-active aria-checked:text-accent-primary-soft aria-pressed:bg-surface-active aria-pressed:text-accent-primary-soft",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-11 min-w-11 px-[var(--space-sm)] text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-[var(--space-lg)] text-base",
};

function getButtonStyles({
  className,
  size = "md",
  variant = "primary",
}: ButtonStyleProps) {
  return cn(
    "inline-flex max-w-full items-center justify-center gap-[var(--space-xs)] rounded-[var(--radius-sm)] border text-center leading-tight font-semibold transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    variantStyles[variant],
    variant === "icon" ? "size-11 shrink-0" : sizeStyles[size],
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
      className={getButtonStyles({
        className: cn("enabled:cursor-pointer disabled:pointer-events-none disabled:opacity-50", className),
        size,
        variant,
      })}
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
}: ButtonLinkProps) {
  const styles = getButtonStyles({ className, size, variant });

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={props["aria-label"]}
        className={cn(styles, "pointer-events-none opacity-50")}
        role="link"
      >
        {children}
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
