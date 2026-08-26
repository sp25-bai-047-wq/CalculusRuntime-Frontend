import React, { useState, useRef, useEffect, useCallback } from "react";
import * as math from "mathjs";

const VectorFieldVisualizer = () => {
    const [mode, setMode] = useState('gradient');
    const [funcInput, setFuncInput] = useState('x^2 + y^2');
    const [fieldXInput, setFieldXInput] = useState('-y');
    const [fieldYInput, setFieldYInput] = useState('x');
    const [gridDensity, setGridDensity] = useState(15);
    const [xRange, setXRange] = useState(5);
    const [yRange, setYRange] = useState(5);
    const [pointX, setPointX] = useState(1);
    const [pointY, setPointY] = useState(1);
    const [dirAngle, setDirAngle] = useState(45);
    const [error, setError] = useState('');
    const [hoverInfo, setHoverInfo] = useState(null);

    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const h = 0.0001;

    const evalFunc = useCallback((expr, x, y) => {
        return math.evaluate(expr, { x, y });
    }, []);

    const gradient = useCallback((expr, x, y) => {
        const fx = (evalFunc(expr, x + h, y) - evalFunc(expr, x - h, y)) / (2 * h);
        const fy = (evalFunc(expr, x, y + h) - evalFunc(expr, x, y - h)) / (2 * h);
        return { fx, fy };
    }, [evalFunc]);

    const directionalDerivative = useCallback((expr, x, y, angleDeg) => {
        const rad = (angleDeg * Math.PI) / 180;
        const ux = Math.cos(rad);
        const uy = Math.sin(rad);
        const { fx, fy } = gradient(expr, x, y);
        return { value: fx * ux + fy * uy, ux, uy, fx, fy };
    }, [gradient]);

    const toScreen = useCallback((x, y, w, hgt) => {
        const px = (x / xRange) * (w / 2) + w / 2;
        const py = hgt / 2 - (y / yRange) * (hgt / 2);
        return [px, py];
    }, [xRange, yRange]);

    const drawArrow = useCallback((ctx, x1, y1, x2, y2, color, lineWidth = 1.5) => {
        const headLen = 6;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const container = containerRef.current;
        const size = Math.min(container.clientWidth, 560);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const hgt = canvas.height;

        const computed = getComputedStyle(document.documentElement);
        const bgColor = computed.getPropertyValue('--cv-bg-surface').trim() || '#ffffff';
        const gridColor = computed.getPropertyValue('--cv-border').trim() || '#e0e0e0';
        const axisColor = computed.getPropertyValue('--cv-text-muted').trim() || '#888888';
        const arrowColor = computed.getPropertyValue('--cv-accent').trim() || '#2563eb';
        const pointColor = computed.getPropertyValue('--cv-error').trim() || '#dc2626';
        const dirColor = computed.getPropertyValue('--cv-success').trim() || '#16a34a';

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, w, hgt);

        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        const step = w / (gridDensity);
        for (let i = 0; i <= gridDensity; i++) {
            ctx.beginPath();
            ctx.moveTo(i * step, 0);
            ctx.lineTo(i * step, hgt);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * step);
            ctx.lineTo(w, i * step);
            ctx.stroke();
        }

        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(w / 2, 0);
        ctx.lineTo(w / 2, hgt);
        ctx.moveTo(0, hgt / 2);
        ctx.lineTo(w, hgt / 2);
        ctx.stroke();

        const spacing = (2 * xRange) / gridDensity;
        const maxArrowLen = step * 0.42;

        try {
            let vectors = [];

            if (mode === 'gradient') {
                for (let gx = -gridDensity / 2; gx <= gridDensity / 2; gx++) {
                    for (let gy = -gridDensity / 2; gy <= gridDensity / 2; gy++) {
                        const x = gx * spacing;
                        const y = gy * spacing;
                        const { fx, fy } = gradient(funcInput, x, y);
                        vectors.push({ x, y, vx: fx, vy: fy });
                    }
                }
            } else if (mode === 'field') {
                for (let gx = -gridDensity / 2; gx <= gridDensity / 2; gx++) {
                    for (let gy = -gridDensity / 2; gy <= gridDensity / 2; gy++) {
                        const x = gx * spacing;
                        const y = gy * spacing;
                        const vx = evalFunc(fieldXInput, x, y);
                        const vy = evalFunc(fieldYInput, x, y);
                        vectors.push({ x, y, vx, vy });
                    }
                }
            } else if (mode === 'directional') {
                for (let gx = -gridDensity / 2; gx <= gridDensity / 2; gx++) {
                    for (let gy = -gridDensity / 2; gy <= gridDensity / 2; gy++) {
                        const x = gx * spacing;
                        const y = gy * spacing;
                        const { fx, fy } = gradient(funcInput, x, y);
                        vectors.push({ x, y, vx: fx, vy: fy });
                    }
                }
            }

            const mags = vectors.map(v => Math.hypot(v.vx, v.vy)).filter(m => isFinite(m) && m > 0);
            const maxMag = mags.length > 0 ? Math.max(...mags) : 1;

            vectors.forEach(({ x, y, vx, vy }) => {
                if (!isFinite(vx) || !isFinite(vy)) return;
                const mag = Math.hypot(vx, vy);
                if (mag === 0) return;
                const scale = (mag / maxMag) * maxArrowLen;
                const nx = vx / mag;
                const ny = vy / mag;
                const [px, py] = toScreen(x, y, w, hgt);
                const [px2, py2] = toScreen(x + nx * (scale / step) * spacing, y + ny * (scale / step) * spacing, w, hgt);
                drawArrow(ctx, px, py, px2, py2, arrowColor, 1.3);
            });

            if (mode === 'directional') {
                const { value, ux, uy, fx, fy } = directionalDerivative(funcInput, pointX, pointY, dirAngle);
                const [px, py] = toScreen(pointX, pointY, w, hgt);

                ctx.fillStyle = pointColor;
                ctx.beginPath();
                ctx.arc(px, py, 5, 0, 2 * Math.PI);
                ctx.fill();

                const gMag = Math.hypot(fx, fy) || 1;
                const [gpx, gpy] = toScreen(pointX + (fx / gMag) * spacing * 1.5, pointY + (fy / gMag) * spacing * 1.5, w, hgt);
                drawArrow(ctx, px, py, gpx, gpy, pointColor, 2);

                const [dpx, dpy] = toScreen(pointX + ux * spacing * 1.5, pointY + uy * spacing * 1.5, w, hgt);
                drawArrow(ctx, px, py, dpx, dpy, dirColor, 2);

                setHoverInfo({
                    gradX: fx.toFixed(3), gradY: fy.toFixed(3),
                    dirDeriv: value.toFixed(3),
                    gradMag: gMag.toFixed(3)
                });
            } else {
                setHoverInfo(null);
            }

            setError('');
        } catch (err) {
            setError('Invalid expression: ' + err.message);
        }
    }, [mode, funcInput, fieldXInput, fieldYInput, gridDensity, xRange, pointX, pointY, dirAngle, gradient, evalFunc, directionalDerivative, toScreen, drawArrow]);

    useEffect(() => {
        draw();
        const handleResize = () => draw();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [draw]);

    const handleCanvasClick = (e) => {
        if (mode !== 'directional') return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const x = ((px - canvas.width / 2) / (canvas.width / 2)) * xRange;
        const y = ((canvas.height / 2 - py) / (canvas.height / 2)) * yRange;
        setPointX(parseFloat(x.toFixed(2)));
        setPointY(parseFloat(y.toFixed(2)));
    };

    const presets = {
        gradient: [
            { label: 'x² + y²', value: 'x^2 + y^2' },
            { label: 'sin(x)·cos(y)', value: 'sin(x)*cos(y)' },
            { label: 'x² − y²', value: 'x^2 - y^2' },
            { label: 'ln(x² + y² + 1)', value: 'log(x^2+y^2+1)' },
        ],
        field: [
            { label: 'Rotation (-y, x)', x: '-y', y: 'x' },
            { label: 'Radial (x, y)', x: 'x', y: 'y' },
            { label: 'Saddle (x, -y)', x: 'x', y: '-y' },
            { label: 'Source/Sink', x: 'x/(x^2+y^2+0.1)', y: 'y/(x^2+y^2+0.1)' },
        ],
    };

    return (
        <div style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", background: 'var(--paper, #f4ede0)', minHeight: '100vh', padding: '20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <h1 style={{ textAlign: 'center', color: 'white', fontSize: '3em', fontWeight: 700, marginBottom: '10px', textShadow: '2px 4px 6px rgba(0,0,0,0.2)' }}>
                    Gradient & Vector Field Visualizer
                </h1>
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.9)', fontSize: '1.2em', marginBottom: '40px' }}>
                    Explore gradient vectors, vector fields, and directional derivatives
                </p>

                <div style={{ background: 'var(--cv-bg-surface)', borderRadius: '20px', padding: '30px', marginBottom: '30px', boxShadow: 'var(--cv-shadow-lg)' }}>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                        {[
                            { key: 'gradient', label: 'Gradient Vectors' },
                            { key: 'field', label: 'Vector Field' },
                            { key: 'directional', label: 'Directional Derivative' },
                        ].map(m => (
                            <button
                                key={m.key}
                                onClick={() => setMode(m.key)}
                                className={`cv-btn ${mode === m.key ? 'cv-btn--equals' : 'cv-btn--function'}`}
                                style={{ flex: 1, minWidth: '160px', minHeight: '44px', fontSize: '0.95em', borderRadius: '10px' }}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                        <div>
                            {(mode === 'gradient' || mode === 'directional') && (
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px', color: 'var(--cv-text-primary)' }}>
                                        Function f(x, y)
                                    </label>
                                    <input
                                        type="text"
                                        value={funcInput}
                                        onChange={e => setFuncInput(e.target.value)}
                                        style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid var(--cv-border)', borderRadius: '8px', fontFamily: 'monospace', background: 'var(--cv-input-bg)', color: 'var(--cv-text-primary)' }}
                                    />
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                                        {presets.gradient.map(p => (
                                            <button
                                                key={p.value}
                                                onClick={() => setFuncInput(p.value)}
                                                className="cv-btn cv-btn--digit"
                                                style={{ padding: '5px 10px', fontSize: '11px', minHeight: '28px', borderRadius: '6px' }}
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {mode === 'field' && (
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px', color: 'var(--cv-text-primary)' }}>
                                        Field component P(x,y)
                                    </label>
                                    <input
                                        type="text"
                                        value={fieldXInput}
                                        onChange={e => setFieldXInput(e.target.value)}
                                        style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid var(--cv-border)', borderRadius: '8px', fontFamily: 'monospace', background: 'var(--cv-input-bg)', color: 'var(--cv-text-primary)', marginBottom: '10px' }}
                                    />
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px', color: 'var(--cv-text-primary)' }}>
                                        Field component Q(x,y)
                                    </label>
                                    <input
                                        type="text"
                                        value={fieldYInput}
                                        onChange={e => setFieldYInput(e.target.value)}
                                        style={{ width: '100%', padding: '10px', fontSize: '14px', border: '2px solid var(--cv-border)', borderRadius: '8px', fontFamily: 'monospace', background: 'var(--cv-input-bg)', color: 'var(--cv-text-primary)' }}
                                    />
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                                        {presets.field.map(p => (
                                            <button
                                                key={p.label}
                                                onClick={() => { setFieldXInput(p.x); setFieldYInput(p.y); }}
                                                className="cv-btn cv-btn--digit"
                                                style={{ padding: '5px 10px', fontSize: '11px', minHeight: '28px', borderRadius: '6px' }}
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {mode === 'directional' && (
                                <div style={{ marginBottom: '16px', padding: '14px', background: 'var(--cv-bg-sunken)', borderRadius: '10px' }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px', color: 'var(--cv-text-primary)' }}>
                                        Point (click canvas or set manually)
                                    </label>
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                        <input
                                            type="number" step="0.1" value={pointX}
                                            onChange={e => setPointX(parseFloat(e.target.value) || 0)}
                                            style={{ width: '50%', padding: '8px', fontSize: '13px', border: '2px solid var(--cv-border)', borderRadius: '8px', background: 'var(--cv-input-bg)', color: 'var(--cv-text-primary)' }}
                                        />
                                        <input
                                            type="number" step="0.1" value={pointY}
                                            onChange={e => setPointY(parseFloat(e.target.value) || 0)}
                                            style={{ width: '50%', padding: '8px', fontSize: '13px', border: '2px solid var(--cv-border)', borderRadius: '8px', background: 'var(--cv-input-bg)', color: 'var(--cv-text-primary)' }}
                                        />
                                    </div>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '13px', color: 'var(--cv-text-primary)' }}>
                                        Direction angle: {dirAngle}°
                                    </label>
                                    <input
                                        type="range" min="0" max="360" step="1" value={dirAngle}
                                        onChange={e => setDirAngle(parseInt(e.target.value))}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '12px', color: 'var(--cv-text-secondary)' }}>X range ±</label>
                                    <input
                                        type="number" value={xRange} min="1" max="20"
                                        onChange={e => setXRange(parseFloat(e.target.value) || 5)}
                                        style={{ width: '100%', padding: '8px', fontSize: '13px', border: '2px solid var(--cv-border)', borderRadius: '8px', background: 'var(--cv-input-bg)', color: 'var(--cv-text-primary)' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '12px', color: 'var(--cv-text-secondary)' }}>Y range ±</label>
                                    <input
                                        type="number" value={yRange} min="1" max="20"
                                        onChange={e => setYRange(parseFloat(e.target.value) || 5)}
                                        style={{ width: '100%', padding: '8px', fontSize: '13px', border: '2px solid var(--cv-border)', borderRadius: '8px', background: 'var(--cv-input-bg)', color: 'var(--cv-text-primary)' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '12px', color: 'var(--cv-text-secondary)' }}>Grid density</label>
                                    <input
                                        type="number" value={gridDensity} min="5" max="30" step="1"
                                        onChange={e => setGridDensity(parseInt(e.target.value) || 15)}
                                        style={{ width: '100%', padding: '8px', fontSize: '13px', border: '2px solid var(--cv-border)', borderRadius: '8px', background: 'var(--cv-input-bg)', color: 'var(--cv-text-primary)' }}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div style={{ padding: '10px', background: 'var(--cv-error-light)', border: '2px solid var(--cv-error)', borderRadius: '8px', color: 'var(--cv-error)', fontSize: '13px', marginBottom: '12px' }}>
                                    {error}
                                </div>
                            )}

                            {mode === 'directional' && hoverInfo && (
                                <div style={{ padding: '16px', background: 'var(--cv-accent-light)', borderRadius: '10px', border: '2px solid var(--cv-border)' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cv-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>At point ({pointX}, {pointY})</div>
                                    <div style={{ fontFamily: 'monospace', fontSize: '14px', color: 'var(--cv-text-primary)', lineHeight: 1.8 }}>
                                        ∇f = ({hoverInfo.gradX}, {hoverInfo.gradY})<br />
                                        |∇f| = {hoverInfo.gradMag}<br />
                                        D_u f = {hoverInfo.dirDeriv}
                                    </div>
                                    <div style={{ marginTop: '10px', display: 'flex', gap: '12px', fontSize: '12px' }}>
                                        <span style={{ color: 'var(--cv-error)' }}>● Gradient direction</span>
                                        <span style={{ color: 'var(--cv-success)' }}>● Chosen direction</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <canvas
                                ref={canvasRef}
                                onClick={handleCanvasClick}
                                style={{
                                    border: '2px solid var(--cv-border)',
                                    borderRadius: '12px',
                                    cursor: mode === 'directional' ? 'crosshair' : 'default',
                                    maxWidth: '100%',
                                    width: '100%'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VectorFieldVisualizer;