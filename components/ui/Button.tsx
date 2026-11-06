import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  download?: boolean;
  "aria-label"?: string;
};

export function LinkButton({ href, children, variant = "primary", className = "", external = false, download, ...props }: LinkButtonProps) {
  const classes = `btn btn-${variant} ${className}`;
  if (external || download) {
    return <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} download={download || undefined} {...props}>{children}</a>;
  }
  return <Link href={href} className={classes} {...props}>{children}</Link>;
}

export function ActionButton({
  children, variant = "primary", className = "", type = "button", ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: Variant }) {
  return <button type={type} {...props} className={`btn btn-${variant} ${className}`}>{children}</button>;
}
