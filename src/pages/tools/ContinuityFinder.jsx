import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import * as math from "mathjs";
import { latexToMathJs } from "crosstex";
import { InlineMath, renderLatexToElement } from "../../components/Math";
import HintButton from "../../components/HintButton";
import { useStepHints } from "../../hooks/useStepHints";

const ContinuityFinder = () => {
    const [variables, setVariables] = useState([{ name: 'x', value: '0' }, { name: 'y', value: '0' }]);
    const [result, setResult] = useState(null);
    const [steps, setSteps] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });
    const [analysisType, setAnalysisType] = useState('general'); // 'general' or 'point'
    const hintResetKey = `${showResult}-${steps.length}-${result ?? ''}`;
    const {
        visibleCount,
        total: hintTotal,
        visibleSteps,
        allRevealed,
        feedback: hintFeedback,
        revealHint,
        resetHints,
    } = useStepHints(steps, hintResetKey);

    const functionFieldRef = useRef(null);
    const mathFieldRef = useRef(null);
    const inputSectionRef = useRef(null);
    const resultSectionRef = useRef(null);

    // Demo examples from the exercises
    const demoExamples = useMemo(() => [
        // Two Variables
        { num: '31a', latex: '\\sin(x+y)', point: '', desc: 'sin(x+y)', category: 'Two Variables' },
        { num: '31b', latex: '\\ln(x^2+y^2)', point: 'x=0,y=0', desc: 'ln(x²+y²)', category: 'Two Variables' },
        { num: '32a', latex: '\\frac{x+y}{x-y}', point: 'x=1,y=1', desc: '(x+y)/(x-y)', category: 'Two Variables' },
        { num: '32b', latex: '\\frac{y}{x^2+1}', point: '', desc: 'y/(x²+1)', category: 'Two Variables' },
        { num: '33a', latex: '\\sin\\frac{1}{xy}', point: 'x=0,y=0', desc: 'sin(1/xy)', category: 'Two Variables' },
        { num: '33b', latex: '\\frac{x+y}{2+\\cos x}', point: '', desc: '(x+y)/(2+cos x)', category: 'Two Variables' },
        { num: '34a', latex: '\\frac{x^2+y^2}{x^2-3x+2}', point: 'x=1,y=0', desc: '(x²+y²)/(x²-3x+2)', category: 'Two Variables' },
        { num: '34b', latex: '\\frac{1}{x^2-y}', point: 'x=1,y=1', desc: '1/(x²-y)', category: 'Two Variables' },

        // Three Variables
        { num: '35a', latex: 'x^2+y^2-2z^2', point: '', desc: 'x²+y²-2z²', category: 'Three Variables' },
        { num: '35b', latex: '\\sqrt{x^2+y^2-1}', point: 'x=0,y=0,z=0', desc: '√(x²+y²-1)', category: 'Three Variables' },
        { num: '36a', latex: '\\ln(xyz)', point: 'x=0,y=0,z=0', desc: 'ln(xyz)', category: 'Three Variables' },
        { num: '36b', latex: 'e^{xy}\\cos z', point: '', desc: 'e^(xy)cos z', category: 'Three Variables' },
        { num: '37a', latex: 'xy\\sin\\frac{1}{z}', point: 'x=0,y=0,z=0', desc: 'xy sin(1/z)', category: 'Three Variables' },
        { num: '37b', latex: '\\frac{1}{x^2+z^2-1}', point: 'x=1,y=0,z=0', desc: '1/(x²+z²-1)', category: 'Three Variables' },
    ], []);

    // Initialize MathQuill
    useEffect(() => {
        if (window.MathQuill && functionFieldRef.current && !mathFieldRef.current) {
            const MQ = window.MathQuill.getInterface(2);
            const mathField = MQ.MathField(functionFieldRef.current, {
                spaceBehavesLikeTab: true,
                handlers: {
                    enter: function () {
                        analyzeContinuity();
                    }
                }
            });
            mathFieldRef.current = mathField;
            mathField.latex('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Render KaTeX for demo examples
    useEffect(() => {
        demoExamples.forEach((example) => {
            renderLatexToElement(
                document.getElementById(`demo-${example.num}`),
                example.latex
            );
        });
    }, [demoExamples]);

    // Render KaTeX for currently revealed solution steps
    useEffect(() => {
        visibleSteps.forEach((step, index) => {
            if (step.math) {
                renderLatexToElement(
                    document.getElementById(`hint-step-math-${index}`),
                    step.math,
                    { displayMode: true }
                );
            }
        });
    }, [visibleSteps]);

    // Scroll to results
    useEffect(() => {
        if (showResult && steps.length > 0) {
            requestAnimationFrame(() => {
                if (resultSectionRef.current) {
                    resultSectionRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }, [showResult, steps]);

    const insertSymbol = (latex) => {
        if (mathFieldRef.current) {
            mathFieldRef.current.cmd(latex);
            mathFieldRef.current.focus();
        }
    };

    const loadExample = (example) => {
        if (mathFieldRef.current) {
            mathFieldRef.current.latex(example.latex);
            const parsedVars = parsePointToVariables(example.point || '');
            setVariables(parsedVars);
            showToastMessage(`Loaded: ${example.desc}`);
            setTimeout(() => {
                if (inputSectionRef.current) {
                    inputSectionRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    };

    const parsePointToVariables = (pointStr) => {
        if (!pointStr) return [{ name: 'x', value: '0' }, { name: 'y', value: '0' }];

        const vars = [];
        const parts = pointStr.split(',');

        parts.forEach(part => {
            const trimmed = part.trim();
            if (trimmed.includes('=')) {
                const [name, value] = trimmed.split('=');
                vars.push({ name: name.trim(), value: value.trim() });
            }
        });

        return vars.length > 0 ? vars : [{ name: 'x', value: '0' }, { name: 'y', value: '0' }];
    };

    const clearFunction = () => {
        if (mathFieldRef.current) {
            mathFieldRef.current.latex('');
            mathFieldRef.current.focus();
        }
        setResult(null);
        setSteps([]);
        setShowResult(false);
        resetHints();
    };

    const showToastMessage = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 2000);
    };

    const renderExplanation = (text) => {
        const parts = String(text).split(/(\\\(.+?\\\))/g);

        return parts.map((part, index) => {
            if (part.startsWith('\\(') && part.endsWith('\\)')) {
                return <InlineMath key={index} latex={part.slice(2, -2)} />;
            }

            return <React.Fragment key={index}>{part}</React.Fragment>;
        });
    };

    const addVariable = () => {
        const nextVarChar = String.fromCharCode(120 + variables.length);
        setVariables([...variables, { name: nextVarChar, value: '0' }]);
    };

    const removeVariable = (index) => {
        if (variables.length > 1) {
            setVariables(variables.filter((_, i) => i !== index));
        }
    };

    const updateVariable = (index, field, value) => {
        const newVars = [...variables];
        newVars[index][field] = value;
        setVariables(newVars);
    };

    const evaluateSpecialValue = useCallback((str) => {
        if (!str) return 0;

        let expr = str
            .replace(/\\pi/g, 'pi')
            .replace(/π/g, 'pi')
            .replace(/\\ln/g, 'log')
            .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
            .replace(/\\sqrt\{([^}]+)\}/g, '(sqrt($1))');

        try {
            const result = math.evaluate(expr);
            if (typeof result === 'number') {
                return result;
            }
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
        } catch {
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
        }
    }, []);

    // Analyze the domain of the function
    const analyzeDomain = (latex, expr, vars) => {
        let restrictions = [];
        let domainLatex = '\\mathbb{R}^{' + vars.length + '}';
        let explanation = 'Analyzing the domain of the function...';
        let continuityExplanation = '';
        let continuityCondition = '';

        // Check for ln (requires positive argument)
        if (latex.includes('\\ln') || latex.includes('\\log')) {
            restrictions.push('logarithm');
            const lnMatch = latex.match(/\\ln\(([^)]+)\)/) || latex.match(/\\ln\{([^}]+)\}/);
            if (lnMatch) {
                const arg = lnMatch[1];
                explanation = `The natural logarithm requires its argument to be positive: \\(${arg} > 0\\)`;
                domainLatex = `\\{(${vars.map(v => v.name).join(',')}) : ${arg} > 0\\}`;
                continuityExplanation = `The function is continuous wherever \\(${arg} > 0\\)`;
                continuityCondition = arg + ' > 0';
            }
        }

        // Check for sqrt (requires non-negative argument)
        if (latex.includes('\\sqrt')) {
            restrictions.push('square root');
            const sqrtMatch = latex.match(/\\sqrt\{([^}]+)\}/);
            if (sqrtMatch) {
                const arg = sqrtMatch[1];
                explanation = `The square root requires its argument to be non-negative: \\(${arg} \\geq 0\\)`;
                domainLatex = `\\{(${vars.map(v => v.name).join(',')}) : ${arg} \\geq 0\\}`;
                continuityExplanation = `The function is continuous wherever \\(${arg} \\geq 0\\)`;
                continuityCondition = arg + ' \\geq 0';
            }
        }

        // Check for fractions (denominator cannot be zero)
        if (latex.includes('\\frac')) {
            restrictions.push('fraction');
            const fracMatch = latex.match(/\\frac\{[^}]+\}\{([^}]+)\}/);
            if (fracMatch) {
                const denom = fracMatch[1];
                explanation = `The denominator cannot be zero: \\(${denom} \\neq 0\\)`;
                domainLatex = `\\{(${vars.map(v => v.name).join(',')}) : ${denom} \\neq 0\\}`;
                continuityExplanation = `The function is continuous wherever \\(${denom} \\neq 0\\)`;
                continuityCondition = denom + ' \\neq 0';
            }
        }

        // Check for division by variable expressions
        const divPatterns = [
            /\/(xy|x\*y)/i,
            /\/([a-z])/i,
            /\/(x\^2[+-]y)/i,
        ];

        for (const pattern of divPatterns) {
            if (expr.match(pattern)) {
                const match = expr.match(pattern);
                if (match && !restrictions.includes('fraction')) {
                    restrictions.push('division');
                    const divisor = match[1];
                    explanation = `Division requires \\(${divisor} \\neq 0\\)`;
                    domainLatex = `\\{(${vars.map(v => v.name).join(',')}) : ${divisor} \\neq 0\\}`;
                    continuityExplanation = `The function is continuous wherever \\(${divisor} \\neq 0\\)`;
                    continuityCondition = divisor + ' \\neq 0';
                }
            }
        }

        // If no restrictions found
        if (restrictions.length === 0) {
            explanation = 'This function is composed of continuous elementary functions (polynomials, trigonometric functions, exponentials)';
            continuityExplanation = `The function is continuous everywhere in its domain (all of \\(\\mathbb{R}${vars.length > 1 ? `^${vars.length}` : ''}\\))`;
            continuityCondition = '\\text{Continuous everywhere}';
        }

        return {
            restrictions,
            domainLatex,
            explanation,
            continuityExplanation,
            continuityCondition
        };
    };

    // Check continuity at a specific point
    const checkContinuityAtPoint = useCallback((expr, vars) => {
        try {
            const scope = {};
            vars.forEach(v => {
                scope[v.name] = evaluateSpecialValue(v.value);
            });
            const pointText = vars.map(v => `\\(${v.name}=${v.value}\\)`).join(', ');

            // Try to evaluate at the point
            const valueAtPoint = math.evaluate(expr, scope);

            if (typeof valueAtPoint === 'number' && isFinite(valueAtPoint)) {
                return {
                    isContinuous: true,
                    explanation: `At point (${pointText}), the function equals \\(${valueAtPoint.toFixed(4)}\\). The function is defined and finite at this point.`,
                    math: `f(${vars.map(v => v.value).join(',')}) = ${valueAtPoint.toFixed(4)}`
                };
            } else if (valueAtPoint === Infinity || valueAtPoint === -Infinity) {
                return {
                    isContinuous: false,
                    explanation: `At point (${pointText}), the function approaches infinity. The function is not continuous at this point.`,
                    math: `f(${vars.map(v => v.value).join(',')}) = ${valueAtPoint === Infinity ? '\\infty' : '-\\infty'}`
                };
            } else {
                return {
                    isContinuous: false,
                    explanation: `At point (${pointText}), the function is undefined.`,
                    math: `f(${vars.map(v => v.value).join(',')}) = \\text{undefined}`
                };
            }
        } catch (error) {
            const pointText = vars.map(v => `\\(${v.name}=${v.value}\\)`).join(', ');
            return {
                isContinuous: false,
                explanation: `At point (${pointText}), the function is undefined or has a discontinuity.`,
                math: `f(${vars.map(v => v.value).join(',')}) = \\text{undefined}`
            };
        }
    }, [evaluateSpecialValue]);

    // Generate conclusion
    const generateConclusion = useCallback((domainAnalysis, continuityResult, vars) => {
        if (analysisType === 'point' && continuityResult) {
            return {
                isContinuous: continuityResult.isContinuous ? 'Continuous' : 'Discontinuous',
                explanation: continuityResult.isContinuous
                    ? `The function is continuous at the point (${vars.map(v => `\\(${v.name}=${v.value}\\)`).join(', ')}).`
                    : `The function is NOT continuous at the point (${vars.map(v => `\\(${v.name}=${v.value}\\)`).join(', ')}).`,
                math: continuityResult.math
            };
        } else {
            const hasRestrictions = domainAnalysis.restrictions.length > 0;
            return {
                isContinuous: hasRestrictions ? 'Continuous on Domain' : 'Continuous Everywhere',
                explanation: domainAnalysis.continuityExplanation,
                math: domainAnalysis.domainLatex
            };
        }
    }, [analysisType]);

    // Analyze continuity
    const analyzeContinuity = useCallback(async () => {
        try {
            if (!mathFieldRef.current) {
                showToastMessage('Please enter a function');
                return;
            }

            const latex = mathFieldRef.current.latex();
            if (!latex.trim()) {
                showToastMessage('Please enter a function');
                return;
            }

            console.log('=== ANALYZING CONTINUITY ===');
            console.log('LaTeX:', latex);
            console.log('Variables:', variables);

            const expr = latexToMathJs(latex);
            console.log('Expression:', expr);

            const analysisSteps = [];

            // Step 1: Function identification
            analysisSteps.push({
                title: 'Step 1: Function Analysis',
                explanation: `Analyzing \\(f(${variables.map(v => v.name).join(',')}) = ${latex}\\)`,
                math: latex
            });

            // Step 2: Domain analysis
            const domainAnalysis = analyzeDomain(latex, expr, variables);
            analysisSteps.push({
                title: 'Step 2: Domain Analysis',
                explanation: domainAnalysis.explanation,
                math: domainAnalysis.domainLatex
            });

            // Step 3: Check continuity at point (if specified)
            let continuityResult = null;
            if (analysisType === 'point') {
                continuityResult = checkContinuityAtPoint(expr, variables);
                analysisSteps.push({
                    title: 'Step 3: Continuity at Point',
                    explanation: continuityResult.explanation,
                    math: continuityResult.math
                });
            } else {
                analysisSteps.push({
                    title: 'Step 3: General Continuity',
                    explanation: domainAnalysis.continuityExplanation,
                    math: domainAnalysis.continuityCondition
                });
            }

            // Step 4: Conclusion
            const conclusion = generateConclusion(domainAnalysis, continuityResult, variables);
            analysisSteps.push({
                title: 'Step 4: Conclusion',
                explanation: conclusion.explanation,
                math: conclusion.math
            });

            setResult(conclusion.isContinuous);
            setSteps(analysisSteps);
            setShowResult(true);
            showToastMessage('Analysis complete!');

        } catch (error) {
            console.error('ERROR:', error);
            showToastMessage('Error: ' + error.message);
        }
    }, [variables, analysisType, checkContinuityAtPoint, generateConclusion]);

    return (
        <div className="app-body">
            <style>{`
                .app-body {
                    --continuity-ink: #16120a;
                    --continuity-muted: #5c4f3a;
                    --continuity-paper: #f4ede0;
                    --continuity-card: #fdf8f0;
                    --continuity-line: #d4c4a8;
                    --continuity-teal: #a0720a;
                    --continuity-blue: #8a6209;
                    --continuity-gold: #c89318;
                    --continuity-plum: #a0720a;
                    --continuity-soft: #f4eee5;
                    --continuity-shadow: 0 18px 52px rgba(28, 24, 18, 0.13);
                    --continuity-shadow-sm: 0 8px 24px rgba(28, 24, 18, 0.08);
                    background: var(--continuity-paper);
                    color: var(--continuity-ink);
                    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                    min-height: 100vh;
                    padding: clamp(1rem, 4vw, 3rem);
                }

                .app-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .app-title {
                    color: #15100c;
                    font-family: Georgia, "Times New Roman", serif;
                    font-size: clamp(2.2rem, 6vw, 4.6rem);
                    font-weight: 700;
                    letter-spacing: 0;
                    line-height: 1;
                    margin: 0;
                    text-align: center;
                }

                .app-subtitle {
                    color: var(--continuity-muted);
                    font-size: clamp(1rem, 2vw, 1.18rem);
                    line-height: 1.65;
                    margin: 0.9rem auto 2.4rem;
                    max-width: 660px;
                    text-align: center;
                }

                .app-subtitle::before {
                    background: linear-gradient(90deg, var(--continuity-teal), var(--continuity-gold), var(--continuity-blue));
                    border-radius: 999px;
                    content: "";
                    display: block;
                    height: 3px;
                    margin: 0 auto 1.2rem;
                    width: min(220px, 50vw);
                }

                .demo-section,
                .input-section,
                .result-section {
                    background: rgba(255, 253, 248, 0.9);
                    border: 1px solid var(--continuity-line);
                    border-radius: 8px;
                    box-shadow: var(--continuity-shadow);
                    overflow: hidden;
                    position: relative;
                }

                .demo-section::before,
                .input-section::before,
                .result-section::before {
                    background: linear-gradient(90deg, var(--continuity-teal), var(--continuity-gold), var(--continuity-plum));
                    content: "";
                    height: 4px;
                    inset: 0 0 auto;
                    position: absolute;
                }

                .demo-section {
                    margin-bottom: 1.2rem;
                    padding: clamp(1.1rem, 3vw, 1.8rem);
                }

                .section-title {
                    color: #15100c;
                    font-family: Georgia, "Times New Roman", serif;
                    font-size: clamp(1.45rem, 3vw, 2rem);
                    font-weight: 700;
                    margin: 0 0 1.2rem;
                }

                .category-section {
                    margin-top: 1.2rem;
                }

                .category-title {
                    align-items: center;
                    color: var(--continuity-teal);
                    display: flex;
                    font-size: 0.78rem;
                    font-weight: 900;
                    gap: 0.7rem;
                    letter-spacing: 0.14em;
                    margin-bottom: 0.85rem;
                    text-transform: uppercase;
                }

                .category-title::after {
                    background: var(--continuity-line);
                    content: "";
                    flex: 1;
                    height: 1px;
                }

                .examples-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
                    gap: 0.8rem;
                }

                .example-card {
                    background: var(--continuity-card);
                    border: 1px solid var(--continuity-line);
                    border-radius: 8px;
                    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset;
                    cursor: pointer;
                    min-height: 104px;
                    padding: 1rem;
                    position: relative;
                    transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
                }

                .example-card:hover {
                    border-color: rgba(47, 116, 107, 0.45);
                    box-shadow: var(--continuity-shadow-sm);
                    transform: translateY(-2px);
                }

                .example-label {
                    color: var(--continuity-muted);
                    font-size: 0.78rem;
                    font-weight: 800;
                    margin-bottom: 0.55rem;
                    text-transform: uppercase;
                }

                .example-function {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 44px;
                    overflow-x: auto;
                    padding: 0.15rem;
                }

                .input-section {
                    margin-bottom: 1.2rem;
                    padding: clamp(1.1rem, 3vw, 1.8rem);
                }

                .limit-builder {
                    margin-bottom: 1.4rem;
                }

                .limit-display {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 1.2rem;
                    flex-wrap: wrap;
                    background: var(--continuity-soft);
                    border: 1px solid var(--continuity-line);
                    border-radius: 8px;
                    padding: 1rem;
                }

                .limit-part {
                    color: var(--continuity-blue);
                    font-size: 1.25rem;
                    font-weight: 800;
                }

                .limit-label {
                    font-family: Georgia, "Times New Roman", serif;
                }

                .variables-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.65rem;
                }

                .variable-row {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .variable-name-input,
                .limit-input-inline {
                    background: var(--continuity-card);
                    border: 1px solid var(--continuity-line);
                    border-radius: 6px;
                    color: var(--continuity-ink);
                    font-size: 1rem;
                    padding: 0.62rem 0.7rem;
                    text-align: center;
                    transition: border-color 0.18s ease, box-shadow 0.18s ease;
                }

                .variable-name-input {
                    width: 64px;
                }

                .limit-input-inline {
                    width: 108px;
                }

                .variable-name-input:focus,
                .limit-input-inline:focus {
                    border-color: var(--continuity-teal);
                    box-shadow: 0 0 0 3px rgba(47, 116, 107, 0.13);
                    outline: none;
                }

                .limit-arrow {
                    color: var(--continuity-gold);
                    font-size: 1.25rem;
                    font-weight: 900;
                }

                .add-var-btn,
                .remove-var-btn {
                    align-items: center;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    display: inline-flex;
                    font-size: 1.1rem;
                    font-weight: 900;
                    height: 38px;
                    justify-content: center;
                    transition: background 0.18s ease, transform 0.18s ease;
                    width: 38px;
                }

                .add-var-btn {
                    background: var(--continuity-teal);
                    color: white;
                }

                .add-var-btn:hover {
                    background: #255d56;
                    transform: translateY(-1px);
                }

                .remove-var-btn {
                    background: #8e3e3e;
                    color: white;
                }

                .remove-var-btn:hover {
                    background: #783333;
                    transform: translateY(-1px);
                }

                .analysis-type-selector {
                    background: var(--continuity-soft);
                    border: 1px solid var(--continuity-line);
                    border-radius: 8px;
                    display: grid;
                    gap: 0.75rem;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    margin-bottom: 1rem;
                    padding: 0.75rem;
                }

                .radio-option {
                    display: flex;
                    align-items: center;
                    background: var(--continuity-card);
                    border: 1px solid var(--continuity-line);
                    border-radius: 6px;
                    cursor: pointer;
                    gap: 0.6rem;
                    padding: 0.8rem 0.9rem;
                }

                .radio-option input[type="radio"] {
                    accent-color: var(--continuity-teal);
                    height: 18px;
                    width: 18px;
                }

                .radio-option label {
                    color: var(--continuity-ink);
                    cursor: pointer;
                    font-size: 0.95rem;
                    font-weight: 800;
                }

                .function-label {
                    color: var(--continuity-ink);
                    font-size: 0.98rem;
                    font-weight: 800;
                    margin-bottom: 0.65rem;
                }

                .function-field {
                    background: var(--continuity-card);
                    border: 1px solid var(--continuity-line);
                    border-radius: 8px;
                    font-size: 1.25rem;
                    min-height: 68px;
                    overflow-x: auto;
                    padding: 1rem;
                    transition: border-color 0.18s ease, box-shadow 0.18s ease;
                }

                .function-field:focus-within {
                    border-color: var(--continuity-teal);
                    box-shadow: 0 0 0 3px rgba(47, 116, 107, 0.13);
                }

                .toolbar-section {
                    margin-top: 1rem;
                }

                .toolbar-title {
                    color: var(--continuity-muted);
                    font-size: 0.8rem;
                    font-weight: 900;
                    letter-spacing: 0.12em;
                    margin-bottom: 0.7rem;
                    text-transform: uppercase;
                }

                .toolbar {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .toolbar-button {
                    background: var(--continuity-card);
                    border: 1px solid var(--continuity-line);
                    border-radius: 6px;
                    color: var(--continuity-blue);
                    cursor: pointer;
                    font-size: 0.92rem;
                    font-weight: 900;
                    min-width: 48px;
                    padding: 0.58rem 0.72rem;
                    transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
                }

                .toolbar-button:hover {
                    background: rgba(47, 116, 107, 0.1);
                    border-color: rgba(47, 116, 107, 0.36);
                    color: var(--continuity-teal);
                    transform: translateY(-1px);
                }

                .actions {
                    display: flex;
                    gap: 0.8rem;
                    margin-top: 1.35rem;
                }

                .calculate-button,
                .clear-button {
                    border: 1px solid transparent;
                    border-radius: 8px;
                    flex: 1;
                    font-size: 1rem;
                    font-weight: 900;
                    min-height: 48px;
                    padding: 0.9rem 1.2rem;
                    cursor: pointer;
                    transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
                }

                .calculate-button {
                    background: var(--continuity-ink);
                    box-shadow: var(--continuity-shadow-sm);
                    color: white;
                }

                .calculate-button:hover {
                    background: var(--continuity-teal);
                    transform: translateY(-1px);
                }

                .clear-button {
                    background: var(--continuity-card);
                    border-color: var(--continuity-line);
                    color: var(--continuity-ink);
                }

                .clear-button:hover {
                    border-color: var(--continuity-gold);
                    color: var(--continuity-gold);
                }

                .result-section {
                    padding: clamp(1.1rem, 3vw, 1.8rem);
                    animation: slideUp 0.5s ease;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .answer-box {
                    background: linear-gradient(135deg, rgba(47, 116, 107, 0.16), rgba(194, 138, 46, 0.14));
                    border: 1px solid rgba(47, 116, 107, 0.22);
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    padding: 1.2rem;
                }

                .answer-label {
                    color: var(--continuity-muted);
                    font-size: 0.78rem;
                    font-weight: 900;
                    letter-spacing: 0.12em;
                    margin-bottom: 0.55rem;
                    text-transform: uppercase;
                }

                .answer-value {
                    color: var(--continuity-ink);
                    font-family: Georgia, "Times New Roman", serif;
                    font-size: clamp(1.45rem, 4vw, 2.2rem);
                    font-weight: 700;
                    line-height: 1.15;
                }

                .steps-box {
                    background: var(--continuity-soft);
                    border: 1px solid var(--continuity-line);
                    border-radius: 8px;
                    padding: 1rem;
                }

                .steps-title {
                    color: #15100c;
                    font-family: Georgia, "Times New Roman", serif;
                    font-size: clamp(1.25rem, 3vw, 1.65rem);
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .steps-content {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                }

                .step-item {
                    background: var(--continuity-card);
                    border: 1px solid var(--continuity-line);
                    border-left: 4px solid var(--continuity-teal);
                    border-radius: 8px;
                    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.75) inset;
                    padding: 1rem;
                }

                .step-number {
                    color: var(--continuity-teal);
                    font-size: 0.98rem;
                    font-weight: 900;
                    margin-bottom: 0.55rem;
                }

                .step-content {
                    color: var(--continuity-muted);
                    font-size: 0.98rem;
                    line-height: 1.6;
                    margin-bottom: 0.6rem;
                }

                .step-math {
                    align-items: center;
                    background: #f7f2ea;
                    border: 1px solid var(--continuity-line);
                    border-radius: 8px;
                    display: flex;
                    justify-content: center;
                    margin-top: 0.7rem;
                    min-height: 44px;
                    overflow-x: auto;
                    padding: 0.9rem;
                }

                .toast {
                    position: fixed;
                    bottom: 1.4rem;
                    right: 1.4rem;
                    background: var(--continuity-ink);
                    color: white;
                    padding: 0.9rem 1rem;
                    border-radius: 8px;
                    box-shadow: var(--continuity-shadow);
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.25s ease, transform 0.25s ease;
                    z-index: 1000;
                }

                .toast-show {
                    opacity: 1;
                    transform: translateY(0);
                }

                @media (max-width: 768px) {
                    .app-title {
                        text-align: left;
                    }

                    .app-subtitle {
                        text-align: left;
                    }

                    .app-subtitle::before {
                        margin-left: 0;
                    }

                    .analysis-type-selector {
                        grid-template-columns: 1fr;
                    }

                    .examples-grid {
                        grid-template-columns: 1fr;
                    }

                    .actions,
                    .limit-display {
                        flex-direction: column;
                    }

                    .variables-container,
                    .variable-row,
                    .calculate-button,
                    .clear-button {
                        width: 100%;
                    }

                    .variable-name-input {
                        flex: 0 0 64px;
                    }

                    .limit-input-inline {
                        flex: 1;
                        width: auto;
                    }

                    .toast {
                        inset: auto 1rem 1rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .example-card,
                    .toolbar-button,
                    .calculate-button,
                    .clear-button,
                    .result-section {
                        animation: none;
                        transition: none;
                    }
                }
            `}</style>

            <div className="app-container">
                <div className="tool-hero">
                    <div>
                        <p className="tool-hero-kicker">Interactive Tool</p>
                        <h1>Continuity Analyzer</h1>
                        <p className="tool-hero-sub">Multi-variable function continuity analysis: test where a function is defined, where it breaks, and why.</p>
                    </div>
                </div>

                {/* Demo Examples */}
                <div className="demo-section">
                    <div className="section-title">📚 Example Functions</div>

                    {['Two Variables', 'Three Variables'].map(category => (
                        <div key={category} className="category-section">
                            <div className="category-title">{category}</div>
                            <div className="examples-grid">
                                {demoExamples
                                    .filter(ex => ex.category === category)
                                    .map(example => (
                                        <div
                                            key={example.num}
                                            className="example-card"
                                            onClick={() => loadExample(example)}
                                        >
                                            <div className="example-label">Ex {example.num}</div>
                                            <div className="example-function" id={`demo-${example.num}`}></div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Section */}
                <div className="input-section" ref={inputSectionRef}>
                    <div className="section-title">Enter Your Function</div>

                    <div className="limit-builder">
                        {/* Analysis Type Selector */}
                        <div className="analysis-type-selector">
                            <div className="radio-option">
                                <input
                                    type="radio"
                                    id="general"
                                    name="analysisType"
                                    value="general"
                                    checked={analysisType === 'general'}
                                    onChange={(e) => setAnalysisType(e.target.value)}
                                />
                                <label htmlFor="general">General Continuity Analysis</label>
                            </div>
                            <div className="radio-option">
                                <input
                                    type="radio"
                                    id="point"
                                    name="analysisType"
                                    value="point"
                                    checked={analysisType === 'point'}
                                    onChange={(e) => setAnalysisType(e.target.value)}
                                />
                                <label htmlFor="point">Continuity at Specific Point</label>
                            </div>
                        </div>

                        {analysisType === 'point' && (
                            <div className="limit-display">
                                <div className="limit-part">
                                    <span className="limit-label">at point</span>
                                </div>

                                <div className="variables-container">
                                    {variables.map((variable, index) => (
                                        <div key={index} className="variable-row">
                                            <input
                                                type="text"
                                                value={variable.name}
                                                onChange={(e) => updateVariable(index, 'name', e.target.value)}
                                                className="variable-name-input"
                                                placeholder="x"
                                                maxLength="3"
                                            />
                                            <span className="limit-arrow">=</span>
                                            <input
                                                type="text"
                                                value={variable.value}
                                                onChange={(e) => updateVariable(index, 'value', e.target.value)}
                                                className="limit-input-inline"
                                                placeholder="0"
                                            />
                                            {variables.length > 1 && (
                                                <button
                                                    onClick={() => removeVariable(index)}
                                                    className="remove-var-btn"
                                                    title="Remove variable"
                                                >
                                                    ×
                                                </button>
                                            )}
                                            {index === variables.length - 1 && variables.length < 5 && (
                                                <button
                                                    onClick={addVariable}
                                                    className="add-var-btn"
                                                    title="Add variable"
                                                >
                                                    +
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="function-label">
                            Enter function f({variables.map(v => v.name).join(', ')}):
                        </div>
                        <div ref={functionFieldRef} className="function-field" />

                        {/* Toolbar */}
                        <div className="toolbar-section">
                            <div className="toolbar-title">Quick Insert Symbols</div>
                            <div className="toolbar">
                                <button onClick={() => insertSymbol('\\frac')} className="toolbar-button">x/y</button>
                                <button onClick={() => insertSymbol('\\sqrt')} className="toolbar-button">√</button>
                                <button onClick={() => insertSymbol('^')} className="toolbar-button">x^n</button>
                                <button onClick={() => insertSymbol('\\sin')} className="toolbar-button">sin</button>
                                <button onClick={() => insertSymbol('\\cos')} className="toolbar-button">cos</button>
                                <button onClick={() => insertSymbol('\\tan')} className="toolbar-button">tan</button>
                                <button onClick={() => insertSymbol('\\ln')} className="toolbar-button">ln</button>
                                <button onClick={() => insertSymbol('\\log')} className="toolbar-button">log</button>
                                <button onClick={() => insertSymbol('e^')} className="toolbar-button">e^x</button>
                                <button onClick={() => insertSymbol('\\pi')} className="toolbar-button">π</button>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="actions">
                        <button onClick={analyzeContinuity} className="calculate-button">
                            🔍 Analyze Continuity
                        </button>
                        <button onClick={clearFunction} className="clear-button">
                            🗑️ Clear
                        </button>
                    </div>

                    <HintButton
                        onReveal={revealHint}
                        visibleCount={visibleCount}
                        total={hintTotal}
                        feedback={hintFeedback}
                        disabled={!showResult}
                    />
                </div>

                {/* Results — steps revealed gradually via Objective 12 hints */}
                {showResult && (
                    <div className="result-section" ref={resultSectionRef}>
                        <div className="steps-box">
                            <div className="steps-title">📝 Solution Hints</div>
                            <div className="steps-content hint-steps">
                                {visibleSteps.length === 0 && (
                                    <div className="step-item">
                                        <div className="step-content">
                                            Analysis is ready. Press <strong>Show Me a Hint</strong> to reveal the first step.
                                        </div>
                                    </div>
                                )}
                                {visibleSteps.map((step, index) => (
                                    <div key={index} className="step-item hint-step">
                                        <div className="step-number hint-step__title">{step.title}</div>
                                        <div className="step-content">{renderExplanation(step.explanation)}</div>
                                        {step.math && (
                                            <div className="step-math" id={`hint-step-math-${index}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {allRevealed && (
                            <div className="answer-box">
                                <div className="answer-label">
                                    Result:
                                </div>
                                <div className="answer-value">
                                    {result}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Toast */}
                {toast.show && (
                    <div className={`toast ${toast.show ? 'toast-show' : ''}`}>
                        {toast.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContinuityFinder;
