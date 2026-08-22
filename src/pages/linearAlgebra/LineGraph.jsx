import { useId } from "react";
import "./LineGraph.css";

const PAD = 34;

function toSvg(mathX, mathY, range, size) {
  const plot = size - PAD * 2;
  const x = PAD + ((mathX + range) / (2 * range)) * plot;
  const y = PAD + ((range - mathY) / (2 * range)) * plot;
  return [x, y];
}

/** Two endpoints of ax+by=c spanning the visible square; SVG clipPath crops the rest. */
function lineEndpoints(a, b, c, range) {
  if (Math.abs(b) > 1e-9) {
    const y1 = (c - a * -range) / b;
    const y2 = (c - a * range) / b;
    return [
      [-range, y1],
      [range, y2],
    ];
  }
  const x = c / a;
  return [
    [x, -range],
    [x, range],
  ];
}

function lineIntercepts(a, b, c) {
  const pts = [];
  if (Math.abs(a) > 1e-9) pts.push({ x: c / a, y: 0, kind: "x" });
  if (Math.abs(b) > 1e-9) pts.push({ x: 0, y: c / b, kind: "y" });
  return pts;
}

function fmt(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

/**
 * Small self-contained SVG line-graph for the Linear Equations guide.
 * lines: [{ a, b, c, color?, showIntercepts? }]  — equation ax+by=c
 * extraPoints: [{ x, y, color?, label? }] — e.g. an intersection point
 */
export function LineGraph({ lines = [], range = 8, size = 260, extraPoints = [], caption }) {
  const uid = useId();
  const plot = size - PAD * 2;
  const step = range <= 5 ? 1 : 2;
  const ticks = [];
  for (let t = -range; t <= range; t += step) ticks.push(t);
  const [originX, originY] = toSvg(0, 0, range, size);

  return (
    <figure className="le-graph">
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={caption || "Line graph"}>
        <clipPath id={`${uid}-clip`}>
          <rect x={PAD} y={PAD} width={plot} height={plot} />
        </clipPath>
        <rect x={PAD} y={PAD} width={plot} height={plot} className="le-graph-bg" />

        {ticks.map((t) => {
          const [gx] = toSvg(t, 0, range, size);
          const [, gy] = toSvg(0, t, range, size);
          return (
            <g key={`grid-${t}`} className="le-graph-grid">
              <line x1={gx} y1={PAD} x2={gx} y2={PAD + plot} />
              <line x1={PAD} y1={gy} x2={PAD + plot} y2={gy} />
            </g>
          );
        })}

        <line x1={PAD} y1={originY} x2={PAD + plot} y2={originY} className="le-graph-axis" />
        <line x1={originX} y1={PAD} x2={originX} y2={PAD + plot} className="le-graph-axis" />
        <text x={PAD + plot - 2} y={originY - 6} textAnchor="end" className="le-graph-axis-label">x</text>
        <text x={originX + 8} y={PAD + 10} className="le-graph-axis-label">y</text>

        <g clipPath={`url(#${uid}-clip)`}>
          {lines.map((ln, i) => {
            const [[x1, y1], [x2, y2]] = lineEndpoints(ln.a, ln.b, ln.c, range);
            const [sx1, sy1] = toSvg(x1, y1, range, size);
            const [sx2, sy2] = toSvg(x2, y2, range, size);
            return (
              <line
                key={i}
                x1={sx1}
                y1={sy1}
                x2={sx2}
                y2={sy2}
                stroke={ln.color || "var(--gold, #a0720a)"}
                strokeWidth={ln.dashed ? 4 : 2.5}
                strokeLinecap="round"
                strokeDasharray={ln.dashed ? "1 7" : undefined}
              />
            );
          })}
        </g>

        {lines
          .filter((ln) => ln.showIntercepts)
          .flatMap((ln, i) =>
            lineIntercepts(ln.a, ln.b, ln.c)
              .filter((p) => Math.abs(p.x) <= range && Math.abs(p.y) <= range)
              .map((p, j) => {
                const [sx, sy] = toSvg(p.x, p.y, range, size);
                return (
                  <g key={`int-${i}-${j}`}>
                    <circle cx={sx} cy={sy} r={4.5} fill={ln.color || "var(--gold, #a0720a)"} stroke="#fff" strokeWidth={1.5} />
                    <text
                      x={sx}
                      y={p.kind === "x" ? sy + 16 : sy - 8}
                      textAnchor="middle"
                      className="le-graph-pt-label"
                    >
                      ({fmt(p.x)}, {fmt(p.y)})
                    </text>
                  </g>
                );
              }),
          )}

        {extraPoints.map((p, i) => {
          const [sx, sy] = toSvg(p.x, p.y, range, size);
          return (
            <g key={`extra-${i}`}>
              <circle cx={sx} cy={sy} r={5.5} fill={p.color || "var(--navy, #1a3358)"} stroke="#fff" strokeWidth={1.5} />
              {p.label ? (
                <text x={sx} y={sy - 10} textAnchor="middle" className="le-graph-pt-label le-graph-pt-label--strong">
                  {p.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      {caption ? <figcaption className="le-graph-caption">{caption}</figcaption> : null}
    </figure>
  );
}

export default LineGraph;
