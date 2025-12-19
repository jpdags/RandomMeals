import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function H1({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-4xl font-bold vintage-title", className)} {...props} />;
}

export function H2({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-3xl font-semibold vintage-title", className)} {...props} />;
}

export function Muted({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-muted-foreground", className)} {...props} />;
}

