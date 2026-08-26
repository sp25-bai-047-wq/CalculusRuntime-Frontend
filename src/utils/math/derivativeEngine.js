import { create, all } from "mathjs";

const math = create(all);

const ALLOWED_VARIABLES = new Set(['x', 'y', 'z', 't', 'u', 'v', 'w']);
const ALLOWED_CONSTANTS = new Set(['e', 'pi', 'i', 'Infinity', 'NaN', 'true', 'false']);

const KNOWN_FUNCTIONS = [
  'sin', 'cos', 'tan', 'sec', 'csc', 'cot',
  'asin', 'acos', 'atan', 'atan2',
  'sinh', 'cosh', 'tanh',
  'log', 'log10', 'log2', 'ln', 'exp', 'sqrt', 'abs',
  'floor', 'ceil', 'round', 'sign',
  'min', 'max', 'mod', 'pow', 'hypot', 'atanh', 'acosh', 'asinh', 'acot'
];

export function normalizeExpression(expression) {
  let normalized = String(expression).trim();

  normalized = normalized
    .replace(/^[a-zA-Z]\s*\(\s*[a-zA-Z]\s*\)\s*=\s*/, '')
    .replace(/^[a-zA-Z]\s*=\s*/, '');

  KNOWN_FUNCTIONS.forEach((name) => {
    normalized = normalized.replace(new RegExp(`\\b${name}\\b`, 'gi'), name);
  });

  return normalized;
}

function isKnownFunctionName(name) {
  return KNOWN_FUNCTIONS.includes(name) || typeof math[name] === 'function';
}

export function getExpressionVariables(expression) {
  const node = math.parse(normalizeExpression(expression));
  const variables = new Set();

  node.traverse((child) => {
    if (!child.isSymbolNode) {
      return;
    }

    const name = child.name;
    if (ALLOWED_CONSTANTS.has(name) || isKnownFunctionName(name)) {
      return;
    }

    if (ALLOWED_VARIABLES.has(name)) {
      variables.add(name);
    }
  });

  return [...variables].sort();
}

export function parseFunction(expression, activeVariable = 'x') {
  try {
    const normalized = normalizeExpression(expression);
    const node = math.parse(normalized);
    const invalidSymbols = new Set();

    node.traverse((child) => {
      if (!child.isSymbolNode) {
        return;
      }

      const name = child.name;
      if (ALLOWED_CONSTANTS.has(name) || isKnownFunctionName(name) || ALLOWED_VARIABLES.has(name)) {
        return;
      }
      invalidSymbols.add(name);
    });

    if (invalidSymbols.size > 0) {
      throw new Error(
        `Unknown symbol(s): ${[...invalidSymbols].join(', ')}. Use variables like x, y, z and functions like sin(x), cos(x), exp(x).`
      );
    }

    const variables = getExpressionVariables(normalized);
    if (variables.length === 0) {
      throw new Error('Expression must include at least one variable, for example x or y.');
    }

    if (!variables.includes(activeVariable)) {
      throw new Error(
        `Your expression uses ${variables.join(', ')}, but you selected "${activeVariable}" as the active variable.`
      );
    }

    node.compile();
    return node;
  } catch (error) {
    if (error.message.startsWith('Unknown symbol') || error.message.startsWith('Expression must') || error.message.startsWith('Your expression')) {
      throw error;
    }
    throw new Error(`Invalid expression: ${error.message}`);
  }
}

export function computeDerivative(expression, variable = 'x') {
  try {
    const normalized = normalizeExpression(expression);
    const node = math.parse(normalized);
    const derivative = math.simplify(math.derivative(node, variable));
    return derivative.toString();
  } catch (error) {
    throw new Error(`Unable to compute derivative: ${error.message}`);
  }
}
