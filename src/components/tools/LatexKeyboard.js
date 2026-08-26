import React, { useState, useCallback, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./LatexKeyboard.css";
import LatexKeyboard from "../../components/LatexKeyboard";

/* ============================================================
   LaTeX Math Keyboard
   Props:
     value      {string}   — controlled LaTeX string
     onChange   {function} — called with new LaTeX string
     onInsert   {function} — called when user inserts from keyboard
     placeholder {string}  — placeholder text when empty
     compact    {boolean}  — single-row tab strip instead of full panel
   ============================================================ */

const KEY_GROUPS = [
  {
    id: 'basic',
    label: 'Basic',
    icon: '±',
    keys: [
      { display: 'x²',   latex: '^{2}',          label: 'squared' },
      { display: 'xⁿ',   latex: '^{}',            label: 'power',      cursor: -1 },
      { display: '√',    latex: '\\sqrt{}',       label: 'square root', cursor: -1 },
      { display: 'ⁿ√',   latex: '\\sqrt[n]{}',   label: 'nth root',   cursor: -1 },
      { display: '|x|',  latex: '\\left|\\right|', label: 'absolute value' },
      { display: 'a/b',  latex: '\\frac{}{}',     label: 'fraction',   cursor: -1 },
      { display: '±',    latex: '\\pm',           label: 'plus minus' },
      { display: '≠',    latex: '\\neq',          label: 'not equal' },
      { display: '≤',    latex: '\\leq',          label: 'less or equal' },
      { display: '≥',    latex: '\\geq',          label: 'greater or equal' },
      { display: '≈',    latex: '\\approx',       label: 'approx' },
      { display: '∞',    latex: '\\infty',        label: 'infinity' },
      { display: '%',    latex: '\\%',            label: 'percent' },
      { display: '·',    latex: '\\cdot',         label: 'dot product' },
      { display: '×',    latex: '\\times',        label: 'times' },
      { display: '÷',    latex: '\\div',          label: 'divide' },
    ],
  },
  {
    id: 'calculus',
    label: 'Calculus',
    icon: '∫',
    keys: [
      { display: 'd/dx',  latex: '\\frac{d}{dx}',              label: 'derivative' },
      { display: 'd²/dx²',latex: '\\frac{d^2}{dx^2}',         label: '2nd derivative' },
      { display: '∂/∂x',  latex: '\\frac{\\partial}{\\partial x}', label: 'partial deriv.' },
      { display: '∫',     latex: '\\int',                      label: 'integral' },
      { display: '∫ab',   latex: '\\int_{}^{}',                label: 'definite integral', cursor: -1 },
      { display: '∬',     latex: '\\iint',                     label: 'double integral' },
      { display: '∭',     latex: '\\iiint',                    label: 'triple integral' },
      { display: '∮',     latex: '\\oint',                     label: 'contour integral' },
      { display: 'lim',   latex: '\\lim_{ \\to }',             label: 'limit' },
      { display: 'Σ',     latex: '\\sum_{}^{}',                label: 'sum', cursor: -1 },
      { display: 'Π',     latex: '\\prod_{}^{}',               label: 'product', cursor: -1 },
      { display: '∇',     latex: '\\nabla',                    label: 'nabla / gradient' },
    ],
  },
  {
    id: 'trig',
    label: 'Trig',
    icon: '∿',
    keys: [
      { display: 'sin',   latex: '\\sin',          label: 'sine' },
      { display: 'cos',   latex: '\\cos',          label: 'cosine' },
      { display: 'tan',   latex: '\\tan',          label: 'tangent' },
      { display: 'csc',   latex: '\\csc',          label: 'cosecant' },
      { display: 'sec',   latex: '\\sec',          label: 'secant' },
      { display: 'cot',   latex: '\\cot',          label: 'cotangent' },
      { display: 'sin⁻¹', latex: '\\arcsin',       label: 'arcsine' },
      { display: 'cos⁻¹', latex: '\\arccos',       label: 'arccosine' },
      { display: 'tan⁻¹', latex: '\\arctan',       label: 'arctangent' },
      { display: 'sinh',  latex: '\\sinh',         label: 'hyperbolic sin' },
      { display: 'cosh',  latex: '\\cosh',         label: 'hyperbolic cos' },
      { display: 'tanh',  latex: '\\tanh',         label: 'hyperbolic tan' },
      { display: 'log',   latex: '\\log',          label: 'log base 10' },
      { display: 'ln',    latex: '\\ln',           label: 'natural log' },
      { display: 'logₙ',  latex: '\\log_{}',       label: 'log base n', cursor: -1 },
      { display: 'eˣ',    latex: 'e^{}',           label: 'exponential', cursor: -1 },
    ],
  },
  {
    id: 'greek',
    label: 'Greek',
    icon: 'α',
    keys: [
      { display: 'α', latex: '\\alpha',   label: 'alpha' },
      { display: 'β', latex: '\\beta',    label: 'beta' },
      { display: 'γ', latex: '\\gamma',   label: 'gamma' },
      { display: 'Γ', latex: '\\Gamma',   label: 'Gamma (upper)' },
      { display: 'δ', latex: '\\delta',   label: 'delta' },
      { display: 'Δ', latex: '\\Delta',   label: 'Delta (upper)' },
      { display: 'ε', latex: '\\epsilon', label: 'epsilon' },
      { display: 'ζ', latex: '\\zeta',    label: 'zeta' },
      { display: 'η', latex: '\\eta',     label: 'eta' },
      { display: 'θ', latex: '\\theta',   label: 'theta' },
      { display: 'Θ', latex: '\\Theta',   label: 'Theta (upper)' },
      { display: 'λ', latex: '\\lambda',  label: 'lambda' },
      { display: 'Λ', latex: '\\Lambda',  label: 'Lambda (upper)' },
      { display: 'μ', latex: '\\mu',      label: 'mu' },
      { display: 'ν', latex: '\\nu',      label: 'nu' },
      { display: 'π', latex: '\\pi',      label: 'pi' },
      { display: 'Π', latex: '\\Pi',      label: 'Pi (upper)' },
      { display: 'ρ', latex: '\\rho',     label: 'rho' },
      { display: 'σ', latex: '\\sigma',   label: 'sigma' },
      { display: 'Σ', latex: '\\Sigma',   label: 'Sigma (upper)' },
      { display: 'τ', latex: '\\tau',     label: 'tau' },
      { display: 'φ', latex: '\\phi',     label: 'phi' },
      { display: 'Φ', latex: '\\Phi',     label: 'Phi (upper)' },
      { display: 'χ', latex: '\\chi',     label: 'chi' },
      { display: 'ψ', latex: '\\psi',     label: 'psi' },
      { display: 'Ψ', latex: '\\Psi',     label: 'Psi (upper)' },
      { display: 'ω', latex: '\\omega',   label: 'omega' },
      { display: 'Ω', latex: '\\Omega',   label: 'Omega (upper)' },
    ],
  },
  {
    id: 'symbols',
    label: 'Symbols',
    icon: '∈',
    keys: [
      { display: '∈',   latex: '\\in',         label: 'element of' },
      { display: '∉',   latex: '\\notin',      label: 'not element of' },
      { display: '⊂',   latex: '\\subset',     label: 'subset' },
      { display: '⊆',   latex: '\\subseteq',   label: 'subset or equal' },
      { display: '⊃',   latex: '\\supset',     label: 'superset' },
      { display: '∪',   latex: '\\cup',        label: 'union' },
      { display: '∩',   latex: '\\cap',        label: 'intersection' },
      { display: '∅',   latex: '\\emptyset',   label: 'empty set' },
      { display: 'ℝ',   latex: '\\mathbb{R}',  label: 'real numbers' },
      { display: 'ℤ',   latex: '\\mathbb{Z}',  label: 'integers' },
      { display: 'ℕ',   latex: '\\mathbb{N}',  label: 'naturals' },
      { display: 'ℚ',   latex: '\\mathbb{Q}',  label: 'rationals' },
      { display: '∀',   latex: '\\forall',     label: 'for all' },
      { display: '∃',   latex: '\\exists',     label: 'there exists' },
      { display: '¬',   latex: '\\neg',        label: 'negation' },
      { display: '∧',   latex: '\\land',       label: 'and' },
      { display: '∨',   latex: '\\lor',        label: 'or' },
      { display: '→',   latex: '\\rightarrow', label: 'right arrow' },
      { display: '↔',   latex: '\\leftrightarrow', label: 'biconditional' },
      { display: '⇒',   latex: '\\Rightarrow', label: 'implies' },
      { display: '⟹',  latex: '\\implies',    label: 'implies (long)' },
      { display: '⟺',  latex: '\\iff',        label: 'iff' },
    ],
  },
];

/* Renders a LaTeX string safely. Returns null if katex throws. */
function renderLatex(latex) {
  if (!latex || !latex.trim()) return null;
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true,
      output: 'html',
    });
  } catch {
    return null;
  }
}

export default function LatexKeyboard({
  value = '',
  onChange,
  onInsert,
  placeholder = 'Type or tap keys to build a math expression…',
  compact = false,
}) {
  const [activeGroup, setActiveGroup] = useState('basic');
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  /* Sync internal state if parent changes value prop */
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = useCallback((e) => {
    const v = e.target.value;
    setInputValue(v);
    onChange?.(v);
  }, [onChange]);

  const insertLatex = useCallback((latex, cursorOffset) => {
    const el = inputRef.current;
    if (!el) {
      const next = inputValue + latex;
      setInputValue(next);
      onChange?.(next);
      onInsert?.(latex);
      return;
    }

    const start = el.selectionStart ?? inputValue.length;
    const end   = el.selectionEnd   ?? inputValue.length;
    const next  = inputValue.slice(0, start) + latex + inputValue.slice(end);
    setInputValue(next);
    onChange?.(next);
    onInsert?.(latex);

    /* Restore focus and position cursor inside braces when cursorOffset is set */
    requestAnimationFrame(() => {
      el.focus();
      const pos = cursorOffset !== undefined
        ? start + latex.length + cursorOffset
        : start + latex.length;
      el.setSelectionRange(pos, pos);
    });
  }, [inputValue, onChange, onInsert]);

  const currentGroup = KEY_GROUPS.find(g => g.id === activeGroup) ?? KEY_GROUPS[0];
  const rendered = renderLatex(inputValue);

  return (
    <div className={`lkb${compact ? ' lkb--compact' : ''}`} role="region" aria-label="LaTeX math keyboard">

      {/* ── Input row ── */}
      <div className="lkb__input-row">
        <textarea
          ref={inputRef}
          className="lkb__input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          rows={2}
          spellCheck={false}
          aria-label="LaTeX input"
          aria-describedby="lkb-preview-label"
        />
        <button
          className="lkb__clear-btn"
          onClick={() => { setInputValue(''); onChange?.(''); }}
          aria-label="Clear input"
          title="Clear"
        >
          ✕
        </button>
      </div>

      {/* ── Rendered preview ── */}
      <div className="lkb__preview" aria-live="polite">
        <span id="lkb-preview-label" className="lkb__preview-label">Preview</span>
        {rendered ? (
          <div
            className="lkb__preview-math"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        ) : (
          <span className="lkb__preview-empty">
            {inputValue ? 'Invalid LaTeX' : 'Expression preview appears here'}
          </span>
        )}
      </div>

      {/* ── Tab strip ── */}
      <div className="lkb__tabs" role="tablist" aria-label="Key groups">
        {KEY_GROUPS.map(group => (
          <button
            key={group.id}
            role="tab"
            aria-selected={activeGroup === group.id}
            aria-controls={`lkb-panel-${group.id}`}
            className={`lkb__tab${activeGroup === group.id ? ' lkb__tab--active' : ''}`}
            onClick={() => setActiveGroup(group.id)}
          >
            <span className="lkb__tab-icon" aria-hidden="true">{group.icon}</span>
            {!compact && <span className="lkb__tab-label">{group.label}</span>}
          </button>
        ))}
      </div>

      {/* ── Key panel ── */}
      <div
        id={`lkb-panel-${currentGroup.id}`}
        role="tabpanel"
        aria-label={`${currentGroup.label} keys`}
        className="lkb__panel"
      >
        {currentGroup.keys.map((key) => (
          <button
            key={key.latex}
            className="lkb__key"
            onClick={() => insertLatex(key.latex, key.cursor)}
            title={key.label}
            aria-label={`Insert ${key.label}`}
          >
            {key.display}
          </button>
        ))}
      </div>

      {/* ── Copy row ── */}
      <div className="lkb__footer">
        <span className="lkb__raw-label">LaTeX:</span>
        <code className="lkb__raw">{inputValue || '—'}</code>
        <button
          className="lkb__copy-btn"
          onClick={() => navigator.clipboard?.writeText(inputValue)}
          disabled={!inputValue}
          aria-label="Copy LaTeX to clipboard"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
