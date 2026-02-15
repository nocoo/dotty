// Pure business logic for the Card Showcase page.
// No React dependency — fully testable with plain unit tests.
// Adapted for dotty's monochrome palette — no colorful card gradients.

import type { CreditCard } from "@/models/types";

export function computeUtilization(balance: number, limit: number): number {
  if (limit === 0) return 0;
  return Math.round((balance / limit) * 100);
}

export interface CardColorScheme {
  textMuted: string;
  textSecondary: string;
  textPrimary: string;
  chipHighContrast: boolean;
  overlayOpacity: { large: string; small: string };
}

/** Dotty monochrome: all cards use cool-gray tones, no warm colors. */
export function deriveColorScheme(network: CreditCard["network"]): CardColorScheme {
  const isBlack = network === "amex";
  return {
    textMuted: "text-muted-foreground",
    textSecondary: isBlack ? "text-foreground/80" : "text-foreground/70",
    textPrimary: "text-foreground",
    chipHighContrast: isBlack,
    overlayOpacity: {
      large: "bg-foreground/[0.04]",
      small: "bg-foreground/[0.02]",
    },
  };
}

export function formatBalance(balance: number, visible: boolean): string {
  return visible ? `$${balance.toLocaleString()}` : "\u2022\u2022\u2022\u2022\u2022\u2022";
}
