import type { HTMLAttributes } from "react";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";

type TechBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  featured?: boolean;
};

export function TechBadge({
  children,
  className,
  featured = false,
  ...props
}: TechBadgeProps) {
  return (
    <Badge
      className={cn("gap-1.5", className)}
      variant={featured ? "accent" : "neutral"}
      {...props}
    >
      <Code2 aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.8} />
      <span>{children}</span>
    </Badge>
  );
}
