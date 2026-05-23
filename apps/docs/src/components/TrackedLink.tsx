"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "../lib/analytics";

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  trackLabel: string;
}

/**
 * Drop-in replacement for Next.js <Link> that fires a `cta_click` event.
 * Use for primary CTAs (Get Started, Token Explorer, etc.).
 */
export function TrackedLink({
  trackLabel,
  href,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        trackEvent({
          name: "cta_click",
          label: trackLabel,
          href: href.toString(),
        });
        onClick?.(e);
      }}
      {...props}
    />
  );
}
