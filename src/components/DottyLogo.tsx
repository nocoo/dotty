/**
 * Dotty logo — three square blocks arranged to form the number "7".
 *
 *   [■][■]   ← horizontal bar (top-left + top-right)
 *      [■]   ← vertical stroke (bottom-right)
 *
 * Accepts standard SVG/HTML attributes including className for sizing.
 * Fills with `currentColor` so it inherits text color automatically.
 */
export function DottyLogo(props: React.SVGProps<SVGSVGElement>) {
  // 3×2 grid, each cell = 10×10, gap = 2
  // Column 0: x=0,  Column 1: x=12
  // Row 0:    y=0,  Row 1:    y=12
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      {/* Top-left block */}
      <rect x="1" y="1" width="10" height="10" rx="2" />
      {/* Top-right block */}
      <rect x="13" y="1" width="10" height="10" rx="2" />
      {/* Bottom-right block */}
      <rect x="13" y="13" width="10" height="10" rx="2" />
    </svg>
  );
}
