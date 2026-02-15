import { useEffect, useState } from "react";

/**
 * Loading page — square pixel spinner
 *
 * A ring of square blocks arranged along a square path.
 * 5 blocks light up in sequence (head brightest → tail dimmest),
 * sweeping clockwise. All other blocks stay at very low opacity.
 */

// Number of blocks per side (including corners)
const SIDE = 5;

// Build the ordered list of (row, col) positions clockwise
// starting from top-left, going right along top, then down right,
// then left along bottom, then up left.
function buildSquarePath(side: number): [number, number][] {
  const path: [number, number][] = [];
  // Top edge: left → right
  for (let c = 0; c < side; c++) path.push([0, c]);
  // Right edge: top+1 → bottom
  for (let r = 1; r < side; r++) path.push([r, side - 1]);
  // Bottom edge: right-1 → left
  for (let c = side - 2; c >= 0; c--) path.push([side - 1, c]);
  // Left edge: bottom-1 → top+1
  for (let r = side - 2; r >= 1; r--) path.push([r, 0]);
  return path;
}

const PATH = buildSquarePath(SIDE);
const TOTAL = PATH.length; // 16 blocks for 5×5 ring

// The 5 active blocks: head=1.0 opacity, then 0.7, 0.45, 0.25, 0.12
const TRAIL_LENGTH = 5;
const TRAIL_OPACITIES = [1, 0.7, 0.45, 0.25, 0.12];
const IDLE_OPACITY = 0.06;

// Animation interval in ms
const INTERVAL = 120;

export default function LoadingPage() {
  const [head, setHead] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHead((h) => (h + 1) % TOTAL);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Build a full grid opacity map (only perimeter cells are visible)
  // Interior cells are not rendered.
  const opacityMap = new Map<string, number>();
  for (let i = 0; i < TOTAL; i++) {
    opacityMap.set(PATH[i].join(","), IDLE_OPACITY);
  }
  // Set trail opacities
  for (let t = 0; t < TRAIL_LENGTH; t++) {
    const idx = (head - t + TOTAL) % TOTAL;
    opacityMap.set(PATH[idx].join(","), TRAIL_OPACITIES[t]);
  }

  const blockSize = 14;
  const gap = 3;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background gap-10">
      {/* Square spinner */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${SIDE}, ${blockSize}px)`,
          gap: `${gap}px`,
        }}
      >
        {Array.from({ length: SIDE * SIDE }, (_, i) => {
          const r = Math.floor(i / SIDE);
          const c = i % SIDE;
          const key = `${r},${c}`;
          const onPerimeter = opacityMap.has(key);

          if (!onPerimeter) {
            // Interior cell — empty space
            return (
              <div
                key={i}
                style={{ width: blockSize, height: blockSize }}
              />
            );
          }

          return (
            <div
              key={i}
              className="bg-foreground rounded-[1px] transition-opacity duration-100"
              style={{
                width: blockSize,
                height: blockSize,
                opacity: opacityMap.get(key),
              }}
            />
          );
        })}
      </div>

    </div>
  );
}
