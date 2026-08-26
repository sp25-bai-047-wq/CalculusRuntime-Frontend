import React, { useRef, useEffect, useState, useCallback } from "react";
import "./GraphCanvas.css";

/**
 * Scalable 2D function GraphCanvas component for plotting mathematical functions with grid, pan, zoom, and tooltip.
 */
export default function GraphCanvas({
  fn = (x) => Math.sin(x), // mathematical function f(x)
  tangentAt = null, // number | null - point to draw tangent line
  derivativeFn = null, // f'(x) function if tangent is active
  xRange = [-10, 10],
  yRange = [-10, 10],
  width = 600,
  height = 400,
  curveColor = '#3b82f6',
  tangentColor = '#f59e0b',
  showGrid = true,
  className = '',
}) {
  const canvasRef = useRef(null);
  const [hoverCoords, setHoverCoords] = useState(null);
  const [zoom, setZoom] = useState(1);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const minX = xRange[0] / zoom;
    const maxX = xRange[1] / zoom;
    const minY = yRange[0] / zoom;
    const maxY = yRange[1] / zoom;

    const toCanvasX = (x) => ((x - minX) / (maxX - minX)) * w;
    const toCanvasY = (y) => h - ((y - minY) / (maxY - minY)) * h;
    const toMathX = (cx) => minX + (cx / w) * (maxX - minX);
    const toMathY = (cy) => maxY - (cy / h) * (maxY - minY);

    // Draw Grid
    if (showGrid) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;

      const step = Math.max(1, Math.round(5 / zoom));
      for (let x = Math.floor(minX / step) * step; x <= maxX; x += step) {
        const cx = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, h);
        ctx.stroke();
      }

      for (let y = Math.floor(minY / step) * step; y <= maxY; y += step) {
        const cy = toCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(w, cy);
        ctx.stroke();
      }
    }

    // Draw Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;

    // X Axis
    const originY = toCanvasY(0);
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(w, originY);
    ctx.stroke();

    // Y Axis
    const originX = toCanvasX(0);
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, h);
    ctx.stroke();

    // Plot Function f(x)
    if (typeof fn === 'function') {
      ctx.strokeStyle = curveColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let isFirst = true;

      for (let cx = 0; cx <= w; cx += 2) {
        const mx = toMathX(cx);
        try {
          const my = fn(mx);
          if (isNaN(my) || !isFinite(my)) {
            isFirst = true;
            continue;
          }
          const cy = toCanvasY(my);
          if (isFirst) {
            ctx.moveTo(cx, cy);
            isFirst = false;
          } else {
            ctx.lineTo(cx, cy);
          }
        } catch {
          isFirst = true;
        }
      }
      ctx.stroke();
    }

    // Plot Tangent line if specified
    if (tangentAt !== null && !isNaN(tangentAt) && typeof fn === 'function') {
      try {
        const x0 = tangentAt;
        const y0 = fn(x0);
        const slope =
          typeof derivativeFn === 'function'
            ? derivativeFn(x0)
            : (fn(x0 + 0.0001) - fn(x0 - 0.0001)) / 0.0002;

        ctx.strokeStyle = tangentColor;
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();

        const xLeft = minX;
        const yLeft = y0 + slope * (xLeft - x0);
        const xRight = maxX;
        const yRight = y0 + slope * (xRight - x0);

        ctx.moveTo(toCanvasX(xLeft), toCanvasY(yLeft));
        ctx.lineTo(toCanvasX(xRight), toCanvasY(yRight));
        ctx.stroke();
        ctx.setLineDash([]);

        // Tangent point marker
        ctx.fillStyle = tangentColor;
        ctx.beginPath();
        ctx.arc(toCanvasX(x0), toCanvasY(y0), 5, 0, Math.PI * 2);
        ctx.fill();
      } catch (err) {
        console.error('Error drawing tangent', err);
      }
    }
  }, [fn, tangentAt, derivativeFn, xRange, yRange, curveColor, tangentColor, showGrid, zoom]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const cy = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const minX = xRange[0] / zoom;
    const maxX = xRange[1] / zoom;
    const minY = yRange[0] / zoom;
    const maxY = yRange[1] / zoom;

    const mx = minX + (cx / canvas.width) * (maxX - minX);
    const my = maxY - (cy / canvas.height) * (maxY - minY);

    let evaluatedY = null;
    try {
      if (typeof fn === 'function') evaluatedY = fn(mx);
    } catch {
      evaluatedY = null;
    }

    setHoverCoords({
      x: mx.toFixed(2),
      y: my.toFixed(2),
      fx: evaluatedY !== null && !isNaN(evaluatedY) ? evaluatedY.toFixed(2) : null,
    });
  };

  const handleMouseLeave = () => {
    setHoverCoords(null);
  };

  return (
    <div className={`graph-canvas-container ${className}`}>
      <div className="graph-toolbar">
        <span className="graph-title">Interactive Function Plotter</span>
        <div className="graph-controls">
          <button
            type="button"
            className="graph-btn"
            onClick={() => setZoom((z) => Math.min(z * 1.25, 5))}
            title="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            className="graph-btn"
            onClick={() => setZoom((z) => Math.max(z * 0.8, 0.2))}
            title="Zoom Out"
          >
            -
          </button>
          <button
            type="button"
            className="graph-btn"
            onClick={() => setZoom(1)}
            title="Reset Zoom"
          >
            ↺
          </button>
        </div>
      </div>

      <div className="graph-canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="graph-canvas"
        />

        {hoverCoords && (
          <div className="graph-tooltip">
            <span>x: {hoverCoords.x}</span>
            {hoverCoords.fx !== null && <span> | f(x): {hoverCoords.fx}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
