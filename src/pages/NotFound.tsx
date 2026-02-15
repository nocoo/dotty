/**
 * 404 page — pixel-block numerals
 *
 * Each digit is a 5-wide × 7-tall grid of square blocks.
 * The three characters "4 0 4" are rendered as discrete pixel matrices
 * with a 2-column gap between them.
 */

// 5×7 pixel font bitmaps — 1 = filled, 0 = empty
// Each row is read left-to-right, rows top-to-bottom
const DIGIT_4 = [
  [1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0],
  [1, 0, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 0],
];

const DIGIT_0 = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
];

// Compose the full "404" bitmap: 5 + 2 + 5 + 2 + 5 = 19 columns wide, 7 rows
const BITMAP_404 = DIGIT_4.map((row, r) => [
  ...row,
  0, 0, // gap
  ...DIGIT_0[r],
  0, 0, // gap
  ...DIGIT_4[r],
]);

export default function NotFound() {
  const blockSize = "clamp(8px, 2.5vw, 20px)";
  const gap = "clamp(2px, 0.5vw, 4px)";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-8">
      {/* Pixel "404" */}
      <div
        className="grid select-none"
        style={{
          gridTemplateColumns: `repeat(19, ${blockSize})`,
          gap,
        }}
      >
        {BITMAP_404.flat().map((filled, i) => (
          <div
            key={i}
            className={
              filled
                ? "bg-foreground rounded-[1px]"
                : "bg-border/40 rounded-[1px]"
            }
            style={{
              width: blockSize,
              height: blockSize,
            }}
          />
        ))}
      </div>

      <a
        href="/"
        className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
      >
        Back to Homepage
      </a>
    </div>
  );
}
