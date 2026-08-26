import { useState, useEffect, useRef, useMemo } from "react";
import { InlineMath, BlockMath } from "../../components/Math";
import HintButton from "../../components/HintButton";
import { useStepHints } from "../../hooks/useStepHints";

// ============================================================================
// ENHANCED DOUBLE INTEGRAL SOLVER — All Complex Cases
// ============================================================================

const LatexMath = ({ latex, displayMode = false, style }) =>
    displayMode ? (
        <BlockMath latex={latex} style={style} />
    ) : (
        <InlineMath latex={latex} style={style} />
    );

const unwrapSingleGroup = (value) => {
    if (!value.startsWith('{')) return null;
    let depth = 0;
    for (let i = 0; i < value.length; i++) {
        if (value[i] === '{') depth++;
        if (value[i] === '}') depth--;
        if (depth === 0) return { body: value.slice(1, i), rest: value.slice(i + 1) };
    }
    return null;
};

const convertFractions = (latex) => {
    const marker = '\\frac';
    let out = '';
    for (let i = 0; i < latex.length;) {
        if (latex.startsWith(marker, i)) {
            const numerator = unwrapSingleGroup(latex.slice(i + marker.length));
            const denominator = numerator ? unwrapSingleGroup(numerator.rest) : null;
            if (numerator && denominator) {
                out += `(${convertFractions(numerator.body)})/(${convertFractions(denominator.body)})`;
                i += marker.length + numerator.body.length + denominator.body.length + 4;
                continue;
            }
        }
        out += latex[i];
        i++;
    }
    return out;
};

const convertSqrt = (latex) => {
    const marker = '\\sqrt';
    let out = '';
    for (let i = 0; i < latex.length;) {
        if (latex.startsWith(marker, i)) {
            const radicand = unwrapSingleGroup(latex.slice(i + marker.length));
            if (radicand) {
                out += `sqrt(${convertSqrt(radicand.body)})`;
                i += marker.length + radicand.body.length + 2;
                continue;
            }
        }
        out += latex[i];
        i++;
    }
    return out;
};

const latexToSolverExpression = (latex) => {
    let expr = convertSqrt(convertFractions(latex))
        .replace(/\\left|\\right/g, '')
        .replace(/\\cdot|\\times/g, '*')
        .replace(/\\pi/g, 'pi')
        .replace(/\\infty/g, 'inf')
        .replace(/∞/g, 'inf')
        .replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)')
        .replace(/\\sqrt/g, 'sqrt')
        .replace(/\\exp/g, 'exp')
        .replace(/\\ln/g, 'ln')
        .replace(/\\log/g, 'log')
        .replace(/\\sin/g, 'sin')
        .replace(/\\cos/g, 'cos')
        .replace(/\\tan/g, 'tan')
        .replace(/\\Gamma/g, 'gamma')
        .replace(/\\gamma/g, 'gamma')
        .replace(/\\operatorname\{erf\}/g, 'erf')
        .replace(/e\^\{([^{}]+)\}/g, 'exp($1)')
        .replace(/\^\{([^{}]+)\}/g, '^($1)')
        .replace(/[{}]/g, '')
        .replace(/\s+/g, '');

    expr = expr.replace(/([a-zA-Z])\s+([a-zA-Z])/g, '$1*$2');
    return expr;
};

const solverExpressionToLatex = (expr) => {
    return expr
        .replace(/-inf\b/g, '-\\infty')
        .replace(/\binf\b/g, '\\infty')
        .replace(/\bpi\b/g, '\\pi')
        .replace(/\*/g, '\\cdot ')
        .replace(/\^([a-zA-Z0-9]+)/g, '^{$1}')
        .replace(/\bsqrt\(([^()]+)\)/g, '\\sqrt{$1}')
        .replace(/\bexp\(([^()]+)\)/g, 'e^{$1}')
        .replace(/\bln\(/g, '\\ln(')
        .replace(/\blog\(/g, '\\log(')
        .replace(/\bsin\(/g, '\\sin(')
        .replace(/\bcos\(/g, '\\cos(')
        .replace(/\btan\(/g, '\\tan(')
        .replace(/\berf\(/g, '\\operatorname{erf}(')
        .replace(/\bgamma\(/g, '\\Gamma(');
};

const integralLatex = (integrand, bounds, order) => {
    const innerVar = order === 'dydx' ? 'y' : 'x';
    const outerVar = order === 'dydx' ? 'x' : 'y';
    const innerMin = order === 'dydx' ? bounds.yMin : bounds.xMin;
    const innerMax = order === 'dydx' ? bounds.yMax : bounds.xMax;
    const outerMin = order === 'dydx' ? bounds.xMin : bounds.yMin;
    const outerMax = order === 'dydx' ? bounds.xMax : bounds.yMax;

    return `\\int_{${solverExpressionToLatex(outerMin)}}^{${solverExpressionToLatex(outerMax)}} \\int_{${solverExpressionToLatex(innerMin)}}^{${solverExpressionToLatex(innerMax)}} ${solverExpressionToLatex(integrand)}\\, d${innerVar}\\, d${outerVar}`;
};

const mathEval = (() => {
    const CONSTANTS = { pi: Math.PI, e: Math.E, inf: Infinity, infinity: Infinity, '∞': Infinity };
    const FUN_NAMES = new Set([
        'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2',
        'sinh', 'cosh', 'tanh', 'sec', 'csc', 'cot',
        'sqrt', 'cbrt', 'pow', 'exp', 'log', 'ln', 'log10', 'log2',
        'abs', 'sign', 'ceil', 'floor', 'round', 'max', 'min',
        'gamma', 'fact', 'besselj0', 'erf', 'heaviside', 'sinc', 'dirac',
    ]);

    const tokenise = (src) => {
        const tokens = [];
        let i = 0;
        while (i < src.length) {
            if (/\s/.test(src[i])) { i++; continue; }
            if (/\d/.test(src[i]) || (src[i] === '.' && /\d/.test(src[i + 1]))) {
                let num = '';
                while (i < src.length && /[\d.]/.test(src[i])) num += src[i++];
                tokens.push({ type: 'NUM', val: parseFloat(num) });
                continue;
            }
            if (/[a-zA-Z_]/.test(src[i])) {
                let name = '';
                while (i < src.length && /[\w]/.test(src[i])) name += src[i++];
                tokens.push({ type: 'NAME', val: name });
                continue;
            }
            if ('+-*/^(),.'.includes(src[i])) {
                tokens.push({ type: 'SYM', val: src[i++] });
                continue;
            }
            throw new Error(`Unknown character: ${src[i]}`);
        }
        const out = [];
        for (let k = 0; k < tokens.length; k++) {
            out.push(tokens[k]);
            if (k + 1 < tokens.length) {
                const cur = tokens[k], nxt = tokens[k + 1];
                const curIsVal = cur.type === 'NUM' || cur.type === 'NAME' || (cur.type === 'SYM' && cur.val === ')');
                const nxtIsVal = nxt.type === 'NAME' || (nxt.type === 'SYM' && nxt.val === '(');
                // Do not treat known functions as values before '(': gamma(x) must stay a call, not gamma*(x)
                const curIsFunctionCall =
                    cur.type === 'NAME' &&
                    nxt.type === 'SYM' &&
                    nxt.val === '(' &&
                    FUN_NAMES.has(String(cur.val).toLowerCase());
                if (curIsVal && nxtIsVal && !curIsFunctionCall) out.push({ type: 'SYM', val: '*' });
            }
        }
        return out;
    };

    const parse = (tokens, scope) => {
        let pos = 0;
        const peek = () => tokens[pos];
        const consume = () => tokens[pos++];
        const parseExpr = () => parseAddSub();
        const parseAddSub = () => {
            let left = parseMulDiv();
            while (peek() && (peek().val === '+' || peek().val === '-')) {
                const op = consume().val;
                const right = parseMulDiv();
                left = op === '+' ? left + right : left - right;
            }
            return left;
        };
        const parseMulDiv = () => {
            let left = parseUnary();
            while (peek() && (peek().val === '*' || peek().val === '/')) {
                const op = consume().val;
                const right = parseUnary();
                if (op === '/' && right === 0) return NaN;
                left = op === '*' ? left * right : left / right;
            }
            return left;
        };
        const parseUnary = () => {
            if (peek() && peek().val === '-') { consume(); return -parsePow(); }
            if (peek() && peek().val === '+') { consume(); return parsePow(); }
            return parsePow();
        };
        const parsePow = () => {
            let base = parseAtom();
            if (peek() && peek().val === '^') {
                consume();
                const exp = parseUnary();
                return Math.pow(base, exp);
            }
            return base;
        };
        const FUNS = {
            sin: Math.sin, cos: Math.cos, tan: Math.tan,
            asin: Math.asin, acos: Math.acos, atan: Math.atan, atan2: Math.atan2,
            sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
            sec: (x) => 1 / Math.cos(x), csc: (x) => 1 / Math.sin(x), cot: (x) => 1 / Math.tan(x),
            sqrt: Math.sqrt, cbrt: Math.cbrt, pow: Math.pow, exp: Math.exp,
            log: Math.log, ln: Math.log, log10: Math.log10, log2: Math.log2,
            abs: Math.abs, sign: Math.sign, ceil: Math.ceil, floor: Math.floor, round: Math.round,
            max: Math.max, min: Math.min,
            gamma: (x) => {
                if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * FUNS.gamma(1 - x));
                const g = 7;
                const p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
                    771.32342877765313, -176.61502916214059, 12.507343278686905,
                    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
                x -= 1;
                let a = p[0];
                for (let i = 1; i < g + 2; i++) a += p[i] / (x + i);
                const t = x + g + 0.5;
                return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
            },
            fact: (x) => FUNS.gamma(x + 1),
            besselj0: (x) => {
                if (Math.abs(x) < 8) {
                    const y = x * x;
                    return 1 + y * (-0.25 + y * (0.015625 + y * (-0.0004340277778)));
                }
                return Math.sqrt(2 / (Math.PI * x)) * Math.cos(x - Math.PI / 4);
            },
            erf: (x) => {
                const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
                const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
                const sign = x >= 0 ? 1 : -1;
                x = Math.abs(x);
                const t = 1.0 / (1.0 + p * x);
                const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
                return sign * y;
            },
            heaviside: (x) => x >= 0 ? 1 : 0,
            sinc: (x) => Math.abs(x) < 1e-10 ? 1 : Math.sin(x) / x,
            dirac: (x, eps = 0.01) => Math.exp(-x * x / (2 * eps * eps)) / (eps * Math.sqrt(2 * Math.PI))
        };
        const parseAtom = () => {
            const tok = peek();
            if (!tok) throw new Error('Unexpected end of expression');
            if (tok.type === 'SYM' && tok.val === '(') {
                consume();
                const val = parseExpr();
                if (!peek() || peek().val !== ')') throw new Error('Missing closing parenthesis');
                consume();
                return val;
            }
            if (tok.type === 'NUM') { consume(); return tok.val; }
            if (tok.type === 'NAME') {
                const name = tok.val.toLowerCase();
                consume();
                if (peek() && peek().val === '(') {
                    consume();
                    if (['pow', 'atan2', 'max', 'min', 'dirac'].includes(name)) {
                        const a1 = parseExpr();
                        if (!peek() || peek().val !== ',') throw new Error('Expected comma');
                        consume();
                        const a2 = parseExpr();
                        if (!peek() || peek().val !== ')') throw new Error('Missing closing parenthesis');
                        consume();
                        return FUNS[name](a1, a2);
                    }
                    const arg = parseExpr();
                    if (!peek() || peek().val !== ')') throw new Error('Missing closing parenthesis in function call');
                    consume();
                    if (!FUNS[name]) throw new Error(`Unknown function: ${name}`);
                    return FUNS[name](arg);
                }
                if (CONSTANTS[name] !== undefined) return CONSTANTS[name];
                if (scope && scope[name] !== undefined) return scope[name];
                throw new Error(`Unknown variable: ${name}`);
            }
            throw new Error(`Unexpected token: ${tok.val}`);
        };
        return parseExpr();
    };

    return {
        evaluate: (expr, scope = {}) => {
            try {
                const tokens = tokenise(expr.trim());
                return parse(tokens, scope);
            } catch (err) {
                throw new Error(`Eval error in "${expr}": ${err.message}`);
            }
        }
    };
})();

const GK_NODES_15 = [-0.9914553711208126, -0.9491079123427585, -0.8648644233597691, -0.7401241915785544, -0.5860872354676911, -0.4058451513773972, -0.2077849550078985, 0, 0.2077849550078985, 0.4058451513773972, 0.5860872354676911, 0.7401241915785544, 0.8648644233597691, 0.9491079123427585, 0.9914553711208126];
const GK_WEIGHTS_15 = [0.02293532201052922, 0.06309209262997856, 0.1047900103222502, 0.1406532597155259, 0.1690047266392679, 0.1903505780647854, 0.2044329400752989, 0.2094821410847278, 0.2044329400752989, 0.1903505780647854, 0.1690047266392679, 0.1406532597155259, 0.1047900103222502, 0.06309209262997856, 0.02293532201052922];

function adaptiveSimpson(f, a, b, eps = 1e-10, maxRecursion = 20) {
    const simpson = (fa, fb, fm, h) => h * (fa + 4 * fm + fb) / 6;
    const fa = f(a), fb = f(b);
    const m = (a + b) / 2;
    const fm = f(m);
    const whole = simpson(fa, fb, fm, b - a);
    function recurse(a, fa, m, fm, b, fb, whole, eps, depth) {
        const left = (a + m) / 2, fl = f(left);
        const right = (m + b) / 2, fr = f(right);
        const h = m - a;
        const leftSimpson = simpson(fa, fm, fl, h);
        const rightSimpson = simpson(fm, fb, fr, h);
        const delta = leftSimpson + rightSimpson - whole;
        if (depth <= 0 || Math.abs(delta) <= 15 * eps) return leftSimpson + rightSimpson + delta / 15;
        return recurse(a, fa, left, fl, m, fm, leftSimpson, eps / 2, depth - 1) + recurse(m, fm, right, fr, b, fb, rightSimpson, eps / 2, depth - 1);
    }
    return recurse(a, fa, m, fm, b, fb, whole, eps, maxRecursion);
}

function gaussLegendre15(f, a, b, panels = 100) {
    if (!isFinite(a) || !isFinite(b)) return handleInfiniteBounds(f, a, b);
    const h = (b - a) / panels;
    let total = 0;
    for (let k = 0; k < panels; k++) {
        const lo = a + k * h, hi = lo + h;
        const hh = (hi - lo) / 2, cc = (hi + lo) / 2;
        let panelSum = 0;
        for (let j = 0; j < 15; j++) {
            const v = f(cc + hh * GK_NODES_15[j]);
            if (isFinite(v)) panelSum += GK_WEIGHTS_15[j] * v;
        }
        total += hh * panelSum;
    }
    return total;
}

function handleInfiniteBounds(f, a, b, panels = 16) {
    // Modest panels: nested improper integrals multiply cost (outer × inner).
    const n = Math.min(panels, 20);
    if (!isFinite(a) && !isFinite(b)) {
        return gaussLegendre15((t) => { const x = t / (1 - t * t), w = (1 + t * t) / Math.pow(1 - t * t, 2); return f(x) * w; }, -0.9999, 0.9999, n);
    }
    if (!isFinite(b)) {
        return gaussLegendre15((t) => { const x = a + t / (1 - t), w = 1 / Math.pow(1 - t, 2); return f(x) * w; }, 0.0001, 0.9999, n);
    }
    if (!isFinite(a)) {
        return gaussLegendre15((t) => { const x = b - (1 - t) / t, w = 1 / (t * t); return f(x) * w; }, 0.0001, 0.9999, n);
    }
    return 0;
}

function integrate1DSmart(f, a, b, opts = {}) {
    const { singular = false, eps = 1e-5, panels } = opts;
    const n = Math.min(panels ?? 20, 24);
    if (!isFinite(a) || !isFinite(b)) return handleInfiniteBounds(f, a, b, n);
    // Never use adaptive Simpson for nested double integrals — it can recurse for
    // millions of nodes on oscillatory/Fresnel-type integrands and freeze the page.
    if (singular) return adaptiveSimpson(f, a, b, eps, 10);
    return gaussLegendre15(f, a, b, n);
}

/** If integrand is f(x)*g(y) with constant rectangular bounds, integrate as a product. */
function trySeparableProduct(integrand, bounds, order) {
    const clean = integrand.replace(/\s+/g, '');
    // Match patterns like sin(x^2)*cos(y^2) or sin(100*x)*cos(100*y)
    const m = clean.match(/^([A-Za-z0-9_^().+\-*/]+)\*([A-Za-z0-9_^().+\-*/]+)$/);
    if (!m) return null;
    const left = m[1];
    const right = m[2];
    const leftHasX = /\bx\b/.test(left);
    const leftHasY = /\by\b/.test(left);
    const rightHasX = /\bx\b/.test(right);
    const rightHasY = /\by\b/.test(right);
    if (leftHasX && leftHasY) return null;
    if (rightHasX && rightHasY) return null;
    if (!(leftHasX || rightHasX) || !(leftHasY || rightHasY)) return null;

    const fx = leftHasX ? left : right;
    const gy = leftHasY ? left : right;
    try {
        const xLo = evalBound(bounds.xMin);
        const xHi = evalBound(bounds.xMax);
        const yLo = evalBound(bounds.yMin);
        const yHi = evalBound(bounds.yMax);
        if (![xLo, xHi, yLo, yHi].every(Number.isFinite)) return null;
        const Ix = integrate1DSmart((x) => mathEval.evaluate(fx, { x, y: 0 }), xLo, xHi, { panels: 48 });
        const Iy = integrate1DSmart((y) => mathEval.evaluate(gy, { x: 0, y }), yLo, yHi, { panels: 48 });
        return Ix * Iy;
    } catch {
        return null;
    }
}

function evalBound(expr, scope = {}) {
    const clean = expr.trim().toLowerCase();
    if (!clean) throw new Error('Empty bound');
    if (clean === 'inf' || clean === 'infinity' || clean === '∞') return Infinity;
    if (clean === '-inf' || clean === '-infinity' || clean === '-∞') return -Infinity;
    return mathEval.evaluate(clean, scope);
}

function formatBound(val) {
    if (!isFinite(val)) return val > 0 ? '∞' : '-∞';
    if (Math.abs(val) < 0.0001 || Math.abs(val) > 10000) return val.toExponential(3);
    return parseFloat(val.toFixed(6)).toString();
}

const ANALYTICAL_DATABASE = [
    { pattern: /^2\*x\*y$/, result: "2", check: (b) => b.xMin === "0" && b.xMax === "2" && b.yMin === "0" && b.yMax === "1" },
    { pattern: /^x-y$/, result: "1", check: (b) => b.xMin === "0" && b.xMax === "1" && b.yMin === "-1" && b.yMax === "0" },
    { pattern: /^x\+y\+1$/, result: "2", check: (b) => b.xMin === "0" && b.xMax === "1" && b.yMin === "-1" && b.yMax === "1" },
    { pattern: /^4-y\^2$/, result: "6", check: (b) => b.xMin === "0" && b.xMax === "2" && b.yMin === "0" && b.yMax === "3" },
    { pattern: /^6\*y\^2-2\*x$/, result: "14", check: (b) => b.xMin === "0" && b.xMax === "1" && b.yMin === "0" && b.yMax === "2" },
    { pattern: /^7-x-y$/, result: "6", check: (b) => b.xMin === "0" && b.xMax === "1" && b.yMin === "0" && b.yMax === "1" },
    { pattern: /^x\^2\+y\^2$/, result: "8/3", check: (b) => b.xMin === "-1" && b.xMax === "1" && b.yMin === "-1" && b.yMax === "1" },
    { pattern: /^x\*y$/, result: "9", check: (b) => b.xMin === "0" && b.xMax === "2" && b.yMin === "0" && b.yMax === "3" },
    { pattern: /^x\+y$/, result: "1/3", check: (b) => b.xMin === "0" && b.xMax === "1" && b.yMax === "1-x" },
    // ∫_0^∞ ∫_1^2 e^{-xy} dy dx = ln(2)
    { pattern: /^exp\(-x\*y\)$/, result: "ln(2)", numeric: Math.LN2, check: (b) => b.xMin === "0" && b.xMax === "inf" && b.yMin === "1" && b.yMax === "2" },
    { pattern: /^e\^\(-x\*y\)$/, result: "ln(2)", numeric: Math.LN2, check: (b) => b.xMin === "0" && b.xMax === "inf" && b.yMin === "1" && b.yMax === "2" },
    // Separable oscillatory: ∫sin(100x)dx · ∫cos(100y)dy over [0,2π]² = 0
    { pattern: /^sin\(100\*x\)\*cos\(100\*y\)$/, result: "0", numeric: 0, check: (b) => b.xMin === "0" && b.xMax === "2*pi" && b.yMin === "0" && b.yMax === "2*pi" },
    // Default demo: ∫_0^∞ ∫_0^∞ x y e^{-x²-y²} dy dx = 1/4
    { pattern: /^x\*y\*exp\(-x\^2-y\^2\)$/, result: "1/4", numeric: 0.25, check: (b) => b.xMin === "0" && b.xMax === "inf" && b.yMin === "0" && b.yMax === "inf" },
    // Gaussian over ℝ²: ∫∫ e^{-(x²+y²)} = π
    { pattern: /^exp\(-x\^2-y\^2\)$/, result: "π", numeric: Math.PI, check: (b) => b.xMin === "-inf" && b.xMax === "inf" && b.yMin === "-inf" && b.yMax === "inf" },
];

function getAnalyticalForm(integrand, bounds) {
    const clean = integrand.replace(/\s+/g, '').toLowerCase();
    for (const entry of ANALYTICAL_DATABASE) {
        if (entry.pattern.test(clean) && entry.check(bounds)) return entry;
    }
    return null;
}

function solveDoubleIntegral(integrand, bounds, order, opts = {}) {
    const steps = [];
    let outerVar, innerVar, outerMin, outerMax, innerMin, innerMax;
    if (order === 'dydx') {
        outerVar = 'x'; innerVar = 'y';
        outerMin = bounds.xMin; outerMax = bounds.xMax;
        innerMin = bounds.yMin; innerMax = bounds.yMax;
    } else {
        outerVar = 'y'; innerVar = 'x';
        outerMin = bounds.yMin; outerMax = bounds.yMax;
        innerMin = bounds.xMin; innerMax = bounds.xMax;
    }

    steps.push({
        title: 'Problem Setup',
        content: 'Evaluating the iterated integral:',
        formula: `∫_${outerMin}^${outerMax} ∫_${innerMin}^${innerMax} (${integrand}) d${innerVar} d${outerVar}`,
        formulaLatex: `\\int_{${solverExpressionToLatex(outerMin)}}^{${solverExpressionToLatex(outerMax)}} \\int_{${solverExpressionToLatex(innerMin)}}^{${solverExpressionToLatex(innerMax)}} ${solverExpressionToLatex(integrand)}\\, d${innerVar}\\, d${outerVar}`
    });

    const outerMinVal = evalBound(outerMin);
    const outerMaxVal = evalBound(outerMax);

    steps.push({
        title: 'Outer Bounds',
        content: `${outerVar} ranges from:`,
        formula: `[${formatBound(outerMinVal)}, ${formatBound(outerMaxVal)}]`,
        formulaLatex: `${outerVar}\\in\\left[${solverExpressionToLatex(formatBound(outerMinVal))}, ${solverExpressionToLatex(formatBound(outerMaxVal))}\\right]`
    });

    const hasInf = !isFinite(outerMinVal) || !isFinite(outerMaxVal);
    const innerConst = !innerMin.includes(outerVar) && !innerMax.includes(outerVar);

    if (innerConst) {
        const iMin = evalBound(innerMin), iMax = evalBound(innerMax);
        steps.push({
            title: 'Inner Bounds (Constant)',
            content: 'Rectangular region:',
            formula: `${innerVar} ∈ [${formatBound(iMin)}, ${formatBound(iMax)}]`,
            formulaLatex: `${innerVar}\\in\\left[${solverExpressionToLatex(formatBound(iMin))}, ${solverExpressionToLatex(formatBound(iMax))}\\right]`
        });
    } else {
        steps.push({
            title: `Inner Bounds (Variable)`,
            content: 'Type I/II region:',
            formula: `${innerVar} ∈ [${innerMin}, ${innerMax}]`,
            formulaLatex: `${innerVar}\\in\\left[${solverExpressionToLatex(innerMin)}, ${solverExpressionToLatex(innerMax)}\\right]`
        });
    }

    const analyticalEntry = getAnalyticalForm(integrand, bounds);
    const analytical = analyticalEntry?.result || null;
    if (analytical) {
        steps.push({
            title: 'Analytical Solution',
            content: 'Known closed form:',
            formula: `Result = ${analytical}`,
            formulaLatex: `\\text{Result} = ${analytical}`
        });
    }

    if (hasInf && !analyticalEntry?.numeric) {
        steps.push({
            title: 'Improper Integral',
            content: 'Using variable transformation for infinite bounds',
            formula: 't = x/(1-x²) mapping',
            formulaLatex: 't = \\frac{x}{1-x^2}'
        });
    }

    let result, innerEvals = 0, outerEvals = 0;

    if (typeof analyticalEntry?.numeric === 'number') {
        result = analyticalEntry.numeric;
        steps.push({
            title: 'Computation Stats',
            content: 'Closed-form evaluation used (numerical quadrature skipped):',
            formula: `Exact value ≈ ${result.toFixed(12)}`
        });
    } else {
        const separable = innerConst
            ? trySeparableProduct(integrand, bounds, order)
            : null;
        if (typeof separable === 'number' && Number.isFinite(separable)) {
            result = separable;
            steps.push({
                title: 'Separable Product',
                content: 'Integrand factors as f(x)·g(y) on a rectangle — integrated as a product of 1D integrals:',
                formula: `Result ≈ ${result.toFixed(12)}`
            });
        } else {
            // Keep nested quadrature cheap so the UI never freezes on presets.
            const special = /bessel|gamma|erf|sinc/i.test(integrand);
            const nestedPanels = hasInf || special ? 10 : 14;
            if (order === 'dydx') {
                result = integrate1DSmart((x) => {
                    outerEvals++;
                    const yLo = evalBound(innerMin, { x });
                    const yHi = evalBound(innerMax, { x });
                    if (yLo >= yHi) return 0;
                    return integrate1DSmart((y) => { innerEvals++; return mathEval.evaluate(integrand, { x, y }); }, yLo, yHi, {
                        panels: nestedPanels,
                    });
                }, outerMinVal, outerMaxVal, { panels: nestedPanels });
            } else {
                result = integrate1DSmart((y) => {
                    outerEvals++;
                    const xLo = evalBound(innerMin, { y });
                    const xHi = evalBound(innerMax, { y });
                    if (xLo >= xHi) return 0;
                    return integrate1DSmart((x) => { innerEvals++; return mathEval.evaluate(integrand, { x, y }); }, xLo, xHi, {
                        panels: nestedPanels,
                    });
                }, outerMinVal, outerMaxVal, { panels: nestedPanels });
            }

            steps.push({
                title: 'Computation Stats',
                content: 'Numerical integration completed:',
                formula: `Evaluations: ${outerEvals} outer × ~${Math.round(innerEvals / Math.max(outerEvals, 1))} inner = ~${innerEvals.toLocaleString()} total`
            });
        }
    }

    steps.push({
        title: 'Final Result',
        content: 'Computed value:',
        formula: `${result.toFixed(12)}\n≈ ${result.toExponential(6)}`,
        formulaLatex: `\\begin{aligned}${result.toFixed(12)} &\\\\ \\approx ${result.toExponential(6)}\\end{aligned}`
    });

    return { result, steps, analytical, stats: { innerEvals, outerEvals } };
}

const PRESETS = [
    { label: "Basic Iterated", presets: [{ name: "Ex 1: 2xy over [0,2]×[0,1]", integrand: "2*x*y", xMin: "0", xMax: "2", yMin: "0", yMax: "1", order: "dydx" }, { name: "Ex 2: x-y over [0,1]×[-1,0]", integrand: "x-y", xMin: "0", xMax: "1", yMin: "-1", yMax: "0", order: "dydx" }, { name: "Ex 5: 4-y² over [0,2]×[0,3]", integrand: "4-y^2", xMin: "0", xMax: "2", yMin: "0", yMax: "3", order: "dydx" }, { name: "Ex 9: exp(x+y) with ln bounds", integrand: "exp(x+y)", xMin: "0", xMax: "ln(2)", yMin: "0", yMax: "ln(5)", order: "dydx" }] },
    { label: "Variable Bounds", presets: [{ name: "Triangular: x+y, y∈[0,1-x]", integrand: "x+y", xMin: "0", xMax: "1", yMin: "0", yMax: "1-x", order: "dydx" }, { name: "Circular: 1, x²+y²≤1", integrand: "1", xMin: "-1", xMax: "1", yMin: "-sqrt(1-x^2)", yMax: "sqrt(1-x^2)", order: "dydx" }, { name: "Parabolic: x², x∈[0,√y]", integrand: "x^2", xMin: "0", xMax: "sqrt(y)", yMin: "0", yMax: "4", order: "dxdy" }] },
    { label: "Special Functions", presets: [{ name: "Bessel J₀(x²+y²)", integrand: "besselj0(x^2+y^2)", xMin: "0", xMax: "3", yMin: "0", yMax: "3", order: "dydx" }, { name: "Error function erf(x+y)", integrand: "erf(x+y)", xMin: "0", xMax: "2", yMin: "0", yMax: "2", order: "dydx" }, { name: "Gamma Γ(x+y)", integrand: "gamma(x+y)", xMin: "0.1", xMax: "1", yMin: "0.1", yMax: "1", order: "dydx" }, { name: "Heaviside H(x-y)", integrand: "heaviside(x-y)", xMin: "0", xMax: "2", yMin: "0", yMax: "2", order: "dydx" }] },
    { label: "Infinite/Improper", presets: [{ name: "Gaussian over ℝ²", integrand: "exp(-x^2-y^2)", xMin: "-inf", xMax: "inf", yMin: "-inf", yMax: "inf", order: "dydx" }, { name: "Exponential decay", integrand: "exp(-abs(x)-abs(y))", xMin: "-inf", xMax: "inf", yMin: "-inf", yMax: "inf", order: "dydx" }, { name: "Semi-infinite: e^(-xy)", integrand: "exp(-x*y)", xMin: "0", xMax: "inf", yMin: "1", yMax: "2", order: "dydx" }, { name: "Bivariate normal", integrand: "exp(-(x^2+y^2)/2)/(2*pi)", xMin: "-inf", xMax: "inf", yMin: "-inf", yMax: "inf", order: "dydx" }] },
    { label: "Oscillatory", presets: [{ name: "Rapid oscillation: sin(100x)cos(100y)", integrand: "sin(100*x)*cos(100*y)", xMin: "0", xMax: "2*pi", yMin: "0", yMax: "2*pi", order: "dydx" }, { name: "Fresnel: sin(x²)cos(y²)", integrand: "sin(x^2)*cos(y^2)", xMin: "0", xMax: "3", yMin: "0", yMax: "3", order: "dydx" }, { name: "Sinc: sin(x²+y²)/(x²+y²)", integrand: "sinc(x^2+y^2)", xMin: "0", xMax: "5", yMin: "0", yMax: "5", order: "dydx" }] },
];

export default function DoubleIntegralSolver() {
    const [integrand, setIntegrand] = useState('x*y*exp(-x^2-y^2)');
    const [xMin, setXMin] = useState('0');
    const [xMax, setXMax] = useState('inf');
    const [yMin, setYMin] = useState('0');
    const [yMax, setYMax] = useState('inf');
    const [order, setOrder] = useState('dydx');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [activeCat, setActiveCat] = useState(0);
    const [computing, setComputing] = useState(false);

    const hintSteps = useMemo(() => {
        if (!result?.steps?.length) return [];
        return result.steps.map((step, i) => ({
            title: `Step ${i + 1}: ${step.title}`,
            body: step.content,
            formula: step.formula,
            formulaLatex: step.formulaLatex,
        }));
    }, [result]);
    const hintResetKey = result
        ? `${integrand}|${xMin}|${xMax}|${yMin}|${yMax}|${order}|${result.result}`
        : "";
    const {
        visibleCount,
        total: hintTotal,
        visibleSteps,
        allRevealed,
        feedback: hintFeedback,
        revealHint,
        resetHints,
    } = useStepHints(hintSteps, hintResetKey);
    const integrandFieldRef = useRef(null);
    const integrandMathRef = useRef(null);

    useEffect(() => {
        if (!window.MathQuill || !integrandFieldRef.current || integrandMathRef.current) return;

        const MQ = window.MathQuill.getInterface(2);
        const mathField = MQ.MathField(integrandFieldRef.current, {
            spaceBehavesLikeTab: true,
            handlers: {
                edit: () => {
                    setIntegrand(latexToSolverExpression(mathField.latex()));
                },
                // Do not auto-solve on Enter — oscillatory/improper integrals can freeze the tab.
            }
        });

        integrandMathRef.current = mathField;
        mathField.latex(solverExpressionToLatex(integrand));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadPreset = (p) => {
        setIntegrand(p.integrand);
        if (integrandMathRef.current) {
            integrandMathRef.current.latex(solverExpressionToLatex(p.integrand));
        }
        setXMin(p.xMin); setXMax(p.xMax);
        setYMin(p.yMin); setYMax(p.yMax);
        setOrder(p.order);
        setError(''); setResult(null);
        resetHints();
    };

    function solve() {
        if (computing) return;
        setComputing(true);
        setError('');
        setResult(null);
        // Double-yield so React can paint "Computing..." before heavy work.
        window.setTimeout(() => {
            window.setTimeout(() => {
                const started = performance.now();
                try {
                    const res = solveDoubleIntegral(integrand, { xMin, xMax, yMin, yMax }, order, {});
                    setResult(res);
                    if (performance.now() - started > 8000) {
                        console.warn("Integral solve took", Math.round(performance.now() - started), "ms");
                    }
                } catch (err) {
                    setError(err.message || String(err));
                    setResult(null);
                } finally {
                    setComputing(false);
                }
            }, 0);
        }, 40);
    }

    return (
        <div className="cv-app volume-calc-page">
            <div className="volume-calc-inner">

                {/* ── Page title ── */}
                <div className="volume-calc-hero">
                    <h1 style={{ fontSize: '3em', fontWeight: '900', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,0.3)', margin: '0 0 12px' }}>
                        ∬ Double Integral Solver
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.1em', margin: 0 }}>
                        All complex cases: infinite bounds, singularities, special functions, oscillatory integrands
                    </p>
                </div>

                {/* ── Two-column grid ── */}
                <div className="cv-calculator" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '100%', borderRadius: '0', background: 'transparent', boxShadow: 'none', border: 'none' }}>

                    {/* ── LEFT: Configure panel ── */}
                    <div style={{ background: 'var(--cv-bg-surface)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--cv-shadow-lg)' }}>
                        <h2 style={{ marginTop: 0, color: 'var(--cv-text-primary)', fontSize: '1.15em', fontWeight: '700', marginBottom: '20px' }}>
                            Configure Integral
                        </h2>

                        {/* Integrand input */}
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: 'var(--cv-text-primary)' }}>
                                Integrand f(x, y)
                            </label>
                            <div
                                ref={integrandFieldRef}
                                style={{
                                    width: '100%',
                                    minHeight: '46px',
                                    padding: '10px 12px',
                                    fontSize: '18px',
                                    border: '2px solid var(--cv-border)',
                                    borderRadius: '10px',
                                    background: 'white'
                                }}
                            />
                            <input
                                type="text"
                                value={integrand}
                                onChange={e => {
                                    setIntegrand(e.target.value);
                                    if (integrandMathRef.current) {
                                        integrandMathRef.current.latex(solverExpressionToLatex(e.target.value));
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        // Require explicit Solve click — Enter must not freeze on hard presets.
                                    }
                                }}
                                style={{ width: '100%', marginTop: '8px', padding: '9px 10px', fontSize: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontFamily: 'monospace', color: 'var(--cv-text-secondary)' }}
                            />
                            <div style={{ marginTop: '12px', padding: '12px', background: 'var(--cv-bg-sunken)', border: '1px solid var(--cv-border)', borderRadius: '10px', overflowX: 'auto' }}>
                                <LatexMath
                                    latex={integralLatex(integrand, { xMin, xMax, yMin, yMax }, order)}
                                    displayMode
                                    style={{ color: 'var(--cv-text-primary)' }}
                                />
                            </div>
                        </div>

                        {/* Bounds grid */}
                        <div className="cv-keypad" style={{ gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px', background: 'transparent', padding: '0' }}>
                            {[{ l: 'x min', v: xMin, s: setXMin }, { l: 'x max', v: xMax, s: setXMax }, { l: 'y min', v: yMin, s: setYMin }, { l: 'y max', v: yMax, s: setYMax }].map((b, i) => (
                                <div key={i}>
                                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: 'var(--cv-text-primary)' }}>{b.l}</label>
                                    <input
                                        type="text"
                                        value={b.v}
                                        onChange={e => b.s(e.target.value)}
                                        style={{ width: '100%', padding: '10px', fontSize: '13px', border: '2px solid var(--cv-border)', borderRadius: '8px', fontFamily: 'monospace', background: 'var(--cv-input-bg)', color: 'var(--cv-text-primary)' }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Integration order */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '13px', color: 'var(--cv-text-primary)' }}>
                                Integration Order
                            </label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {['dydx', 'dxdy'].map(o => (
                                    <button
                                        key={o}
                                        onClick={() => setOrder(o)}
                                        className={`cv-btn ${order === o ? 'cv-btn--operator' : 'cv-btn--function'}`}
                                        style={{ flex: 1, minHeight: '44px', fontSize: '13px', borderRadius: '8px' }}
                                    >
                                        {o === 'dydx' ? '∫∫ f dy dx' : '∫∫ f dx dy'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Solve button */}
                        <button
                            onClick={solve}
                            disabled={computing}
                            className={`cv-btn ${computing ? 'cv-btn--function' : 'cv-btn--equals'}`}
                            style={{ width: '100%', fontSize: '15px', fontWeight: '700', marginBottom: '12px', borderRadius: '10px', minHeight: '52px' }}
                        >
                            {computing ? 'Computing...' : '🧮 Solve Integral'}
                        </button>

                        <HintButton
                            onReveal={revealHint}
                            visibleCount={visibleCount}
                            total={hintTotal}
                            feedback={hintFeedback}
                            disabled={!result}
                        />

                        {/* Presets */}
                        <div style={{ padding: '16px', background: 'var(--cv-bg-sunken)', borderRadius: '12px', border: '1px solid var(--cv-border)', marginTop: '12px' }}>
                            <h3 style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: '700', color: 'var(--cv-text-primary)', textTransform: 'uppercase' }}>
                                Preset Problems
                            </h3>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                {PRESETS.map((c, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveCat(i)}
                                        className={`cv-btn ${activeCat === i ? 'cv-btn--operator' : 'cv-btn--function'}`}
                                        style={{ padding: '5px 10px', fontSize: '11px', minHeight: '30px', borderRadius: '6px' }}
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '200px', overflowY: 'auto' }}>
                                {PRESETS[activeCat].presets.map((p, i) => (
                                    <button
                                        key={i}
                                        onClick={() => loadPreset(p)}
                                        className="cv-btn cv-btn--digit"
                                        style={{ padding: '8px 10px', textAlign: 'left', fontSize: '12px', minHeight: '36px', borderRadius: '6px' }}
                                    >
                                        {p.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Solution panel ── */}
                    <div style={{ background: 'var(--cv-bg-surface)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--cv-shadow-lg)' }}>
                        <h2 style={{ marginTop: 0, color: 'var(--cv-text-primary)', fontSize: '1.15em', fontWeight: '700', marginBottom: '16px' }}>
                            Solution
                        </h2>

                        {error && (
                            <div style={{ padding: '12px', background: 'var(--cv-error-light)', border: '2px solid var(--cv-error)', borderRadius: '8px', color: 'var(--cv-error)', marginBottom: '16px' }}>
                                <strong>Error:</strong> {error}
                            </div>
                        )}

                        {result && (
                            <div>
                                {visibleSteps.length === 0 && (
                                    <div style={{ padding: '12px', background: 'var(--cv-bg-sunken)', borderRadius: '8px', marginBottom: '12px', color: 'var(--cv-text-secondary)', fontSize: '13px' }}>
                                        Solution is ready. Press <strong>Show Me a Hint</strong> to reveal steps one at a time.
                                    </div>
                                )}

                                {visibleSteps.map((step, i) => (
                                    <div key={i} style={{ marginBottom: '12px', padding: '12px', background: 'var(--cv-bg-sunken)', borderRadius: '8px', borderLeft: '4px solid var(--cv-accent)' }}>
                                        <div style={{ fontWeight: '700', color: 'var(--cv-accent)', marginBottom: '4px', fontSize: '12px' }}>
                                            {step.title}
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'var(--cv-text-secondary)', marginBottom: '4px' }}>{step.body}</div>
                                        <div style={{ padding: '8px', background: 'var(--cv-bg-surface)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', border: '1px solid var(--cv-border)', whiteSpace: 'pre-wrap', color: 'var(--cv-text-primary)' }}>
                                            {step.formulaLatex ? (
                                                <LatexMath latex={step.formulaLatex} displayMode />
                                            ) : (
                                                <span style={{ fontFamily: 'monospace' }}>{step.formula}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {allRevealed && (
                                    <div style={{ padding: '16px', background: 'var(--cv-accent-light)', borderRadius: '12px', marginBottom: '16px', border: '2px solid var(--cv-border)' }}>
                                        <div style={{ fontSize: '11px', color: 'var(--cv-text-secondary)', marginBottom: '4px', fontWeight: '600' }}>RESULT</div>
                                        <div style={{ fontSize: '2em', fontWeight: '800', color: 'var(--cv-accent)', fontFamily: 'monospace' }}>
                                            {result.result.toFixed(10)}
                                        </div>
                                        {result.analytical && (
                                            <div style={{ marginTop: '8px', padding: '8px', background: 'var(--cv-success-light)', borderRadius: '6px', fontSize: '13px', color: 'var(--cv-success)' }}>
                                                Analytical: {result.analytical}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {!result && !error && (
                            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--cv-text-muted)' }}>
                                <div style={{ fontSize: '48px', marginBottom: '8px' }}>∬</div>
                                <p>Enter integral and click Solve</p>
                            </div>
                        )}

                        <div style={{ marginTop: '16px', padding: '12px', background: 'var(--cv-success-light)', borderRadius: '8px', border: '1px solid var(--cv-success)' }}>
                            <div style={{ fontWeight: '700', fontSize: '11px', color: 'var(--cv-success)', marginBottom: '4px' }}>SYNTAX</div>
                            <div style={{ fontSize: '11px', color: 'var(--cv-text-primary)', fontFamily: 'monospace' }}>
                                x^2, sqrt(x), exp(x), ln(x), sin(x), besselj0(x), erf(x), gamma(x), inf
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
