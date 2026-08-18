/**
 * routeContext.js — Objective CB-5
 * Reads pathname + maps to topic; full URL is sent with every chat request.
 */

const ROUTE_MAP = [
  { match: /\/partial-derivatives\/2/, topic: "Partial Derivatives Part 2", detail: "higher-order partials, mixed partials, chain rule for multivariable functions" },
  { match: /\/partial-derivatives\/1/, topic: "Partial Derivatives Part 1", detail: "definition of partial derivatives, notation, geometric interpretation" },
  { match: /\/partial-derivatives/, topic: "Partial Derivatives", detail: "partial derivatives and related concepts" },
  { match: /\/vector-calculus\/2/, topic: "Vector Calculus Part 2", detail: "curl, divergence, Stokes theorem, divergence theorem" },
  { match: /\/vector-calculus\/1/, topic: "Vector Calculus Part 1", detail: "vector fields, line integrals, gradient, flux" },
  { match: /\/vector-calculus/, topic: "Vector Calculus", detail: "vector calculus topics" },
  { match: /\/vectorfield/, topic: "Vector Field Visualizer", detail: "visualizing 2D vector fields, direction and magnitude of field vectors" },
  { match: /\/limits-continuity\/2/, topic: "Limits and Continuity Part 2", detail: "continuity of multivariable functions, continuity on regions" },
  { match: /\/limits-continuity\/1/, topic: "Limits and Continuity Part 1", detail: "limits of multivariable functions, path-dependent limits" },
  { match: /\/limits-continuity/, topic: "Limits and Continuity", detail: "limits and continuity for multivariable functions" },
  { match: /\/differentiation\/2/, topic: "Differentiation Part 2", detail: "related rates, extrema, mean value theorem, L'Hopital, implicit and parametric derivatives" },
  { match: /\/differentiation\/1/, topic: "Differentiation Part 1", detail: "definition of derivative, power product quotient chain rules" },
  { match: /\/differentiation/, topic: "Differentiation", detail: "differentiation rules and applications" },
  { match: /\/integration\/2/, topic: "Integration Part 2", detail: "substitution, integration by parts, partial fractions, improper integrals" },
  { match: /\/integration\/1/, topic: "Integration Part 1", detail: "antiderivatives, definite integrals, fundamental theorem of calculus, area" },
  { match: /\/integration/, topic: "Integration", detail: "integration techniques and applications" },
  { match: /\/sequences-series\/2/, topic: "Sequences and Infinite Series Part 2", detail: "ratio root AST absolute vs conditional convergence power series radius" },
  { match: /\/sequences-series\/1/, topic: "Sequences and Infinite Series Part 1", detail: "sequences geometric p-series telescoping term test" },
  { match: /\/sequences-series/, topic: "Sequences and Infinite Series", detail: "sequences series and convergence tests" },
  { match: /\/conic-sections\/2/, topic: "Conic Sections Part 2", detail: "general conic discriminant rotation optics orbits navigation" },
  { match: /\/conic-sections\/1/, topic: "Conic Sections Part 1", detail: "distance circles parabola ellipse hyperbola eccentricity" },
  { match: /\/conic-sections/, topic: "Conic Sections and Analytic Geometry", detail: "analytic geometry of conic sections" },
  { match: /\/multiple-integrals\/2/, topic: "Multiple Integrals Part 2", detail: "change of variables, Jacobians, polar, cylindrical and spherical coordinates" },
  { match: /\/multiple-integrals\/1/, topic: "Multiple Integrals Part 1", detail: "double integrals, iterated integrals, Fubini's theorem" },
  { match: /\/multiple-integrals/, topic: "Multiple Integrals", detail: "double and triple integrals" },
  { match: /\/taylor-series\/2/, topic: "Taylor Series Part 2", detail: "multivariable Taylor expansions, quadratic approximation, error estimation" },
  { match: /\/taylor-series\/1/, topic: "Taylor Series Part 1", detail: "Taylor polynomials, series expansion of single-variable functions, convergence" },
  { match: /\/taylor-series/, topic: "Taylor Series", detail: "Taylor and Maclaurin series and approximations" },
  { match: /\/lagrange-multipliers\/2/, topic: "Lagrange Multipliers Part 2", detail: "two-constraint problems, applications of Lagrange multipliers, worked optimization examples" },
  { match: /\/lagrange-multipliers\/1/, topic: "Lagrange Multipliers Part 1", detail: "constrained optimization, gradient alignment condition, single-constraint problems" },
  { match: /\/lagrange-multipliers/, topic: "Lagrange Multipliers", detail: "constrained optimization with Lagrange multipliers" },
  { match: /\/stokes-theorem\/2/, topic: "Stokes' Theorem Part 2", detail: "applying Stokes' theorem, surface orientation, computing circulation via curl" },
  { match: /\/stokes-theorem\/1/, topic: "Stokes' Theorem Part 1", detail: "statement of Stokes' theorem, relating line integrals to surface integrals" },
  { match: /\/stokes-theorem/, topic: "Stokes' Theorem", detail: "Stokes' theorem and its applications" },
  { match: /\/divergence-curl\/2/, topic: "Divergence and Curl Part 2", detail: "divergence theorem, flux across closed surfaces, physical interpretations" },
  { match: /\/divergence-curl\/1/, topic: "Divergence and Curl Part 1", detail: "definitions of divergence and curl, del operator, computing div and curl" },
  { match: /\/divergence-curl/, topic: "Divergence and Curl", detail: "divergence, curl, and the divergence theorem" },
  { match: /\/simple-concepts\/[^/]+/, topic: "Simple Concepts (detail page)", detail: "interactive concept exploration" },
  { match: /\/simple-concepts/, topic: "Simple Concepts", detail: "functions of several variables, level curves, surfaces in 3D" },
  { match: /\/linear-algebra\/vectors\/2/, topic: "Vectors & Vector Spaces Part 2", detail: "span, basis, linear independence, dimension" },
  { match: /\/linear-algebra\/vectors\/1/, topic: "Vectors & Vector Spaces Part 1", detail: "vectors in R^n, addition, scalar multiplication, dot product" },
  { match: /\/linear-algebra\/vectors/, topic: "Vectors & Vector Spaces", detail: "vectors, span, basis, and linear independence" },
  { match: /\/linear-algebra\/matrices\/2/, topic: "Matrices & Determinants Part 2", detail: "determinants, invertibility, inverse matrices" },
  { match: /\/linear-algebra\/matrices\/1/, topic: "Matrices & Determinants Part 1", detail: "matrix operations, linear maps, transpose" },
  { match: /\/linear-algebra\/matrices/, topic: "Matrices & Determinants", detail: "matrices, determinants, and inverses" },
  { match: /\/linear-algebra\/matrix-sandbox/, topic: "Matrix Sandbox", detail: "up to 10 matrices: multiply, add, powers, eigenvalues, RREF, and more" },
  { match: /\/linear-algebra\/systems\/2/, topic: "Systems of Linear Equations Part 2", detail: "rank, consistency, nullspace geometry" },
  { match: /\/linear-algebra\/systems\/1/, topic: "Systems of Linear Equations Part 1", detail: "augmented matrices, Gaussian elimination, pivots" },
  { match: /\/linear-algebra\/systems/, topic: "Systems of Linear Equations", detail: "solving Ax=b by row reduction" },
  { match: /\/linear-algebra\/eigen\/2/, topic: "Eigenvalues & Eigenvectors Part 2", detail: "diagonalization, applications of eigenvalues" },
  { match: /\/linear-algebra\/eigen\/1/, topic: "Eigenvalues & Eigenvectors Part 1", detail: "eigenvalue equation, characteristic polynomial, eigenspaces" },
  { match: /\/linear-algebra\/eigen/, topic: "Eigenvalues & Eigenvectors", detail: "eigenvalues, eigenvectors, and diagonalization" },
  { match: /\/probability-statistics\/probability-basics\/2/, topic: "Probability Basics Part 2", detail: "conditional probability, independence, Bayes theorem" },
  { match: /\/probability-statistics\/probability-basics\/1/, topic: "Probability Basics Part 1", detail: "sample spaces, axioms, equally likely outcomes" },
  { match: /\/probability-statistics\/probability-basics/, topic: "Probability Basics", detail: "foundations of probability" },
  { match: /\/probability-statistics\/bayes-lab/, topic: "Bayes Lab", detail: "interactive Bayes screening calculator for P(D|+), PPV, base rates" },
  { match: /\/probability-statistics\/random-variables\/2/, topic: "Random Variables Part 2", detail: "continuous RVs, PDFs, named distributions" },
  { match: /\/probability-statistics\/random-variables\/1/, topic: "Random Variables Part 1", detail: "discrete RVs, PMFs, expectation and variance" },
  { match: /\/probability-statistics\/random-variables/, topic: "Random Variables & Distributions", detail: "random variables and distributions" },
  { match: /\/probability-statistics\/descriptive-statistics\/2/, topic: "Descriptive Statistics Part 2", detail: "spread, z-scores, and data displays" },
  { match: /\/probability-statistics\/descriptive-statistics\/1/, topic: "Descriptive Statistics Part 1", detail: "mean, median, percentiles" },
  { match: /\/probability-statistics\/descriptive-statistics/, topic: "Descriptive Statistics", detail: "summarizing data" },
  { match: /\/probability-statistics\/hypothesis-testing\/2/, topic: "Hypothesis Testing Part 2", detail: "p-values, Type I/II errors, power" },
  { match: /\/probability-statistics\/hypothesis-testing\/1/, topic: "Hypothesis Testing Part 1", detail: "null and alternative hypotheses, z and t tests" },
  { match: /\/probability-statistics\/hypothesis-testing/, topic: "Hypothesis Testing", detail: "formal statistical decisions" },
  { match: /\/probability-statistics\/regression-correlation\/2/, topic: "Regression Part 2", detail: "least squares line and residual diagnostics" },
  { match: /\/probability-statistics\/regression-correlation\/1/, topic: "Regression Part 1", detail: "correlation and linear association" },
  { match: /\/probability-statistics\/regression-correlation/, topic: "Regression & Correlation", detail: "correlation and linear regression" },
  { match: /\/probability-statistics\//, topic: "Probability and Statistics", detail: "probability and statistics modules" },
  { match: /\/courses\/linear-algebra/, topic: "Linear Algebra Course Hub", detail: "linear algebra modules overview" },
  { match: /\/courses\/probability-statistics/, topic: "Probability and Statistics Course Hub", detail: "probability and statistics modules overview" },
  { match: /\/courses\/[^/]+/, topic: "Course Hub", detail: "course overview listing study guides and parts" },
  { match: /\/test/, topic: "Continuity Finder Tool", detail: "testing continuity of multivariable functions" },
  { match: /\/extreme/, topic: "Extreme Value Finder Tool", detail: "critical points, second derivative test, saddle points" },
  { match: /\/volumecalculator/, topic: "Volume Calculator Tool", detail: "volumes using double and triple integrals" },
  { match: /\/(taylorx|derivative-visualizer)/, topic: "Derivative Visualizer Tool", detail: "interactive derivative and Taylor approximation plotting" },
  { match: /\/cheatsheet/, topic: "Formula Cheat Sheet", detail: "key multivariable calculus formulas and identities reference" },
  { match: /\/practice/, topic: "Practice Section", detail: "practice problems across multivariable calculus topics" },
  { match: /\/study-plan/, topic: "Personalized Study Plan", detail: "AI-personalized study plan across calculus topics" },
  { match: /\/leaderboard/, topic: "Leaderboard", detail: "opt-in peer progress comparison and rankings" },
  { match: /\/ai-solver/, topic: "AI Solver", detail: "symbolic computation for calculus problems" },
  { match: /\/dashboard/, topic: "Dashboard", detail: "student progress and saved work" },
  { match: /\/login/, topic: "Login", detail: "account sign-in" },
  { match: /\/signup/, topic: "Sign Up", detail: "account registration" },
  { match: /^\/$/, topic: "Home", detail: "general multivariable calculus overview" },
];

export function getPageUrl() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

export function getTopicContext(pathname = getPageUrl()) {
  for (const entry of ROUTE_MAP) {
    if (entry.match.test(pathname)) {
      return { topic: entry.topic, detail: entry.detail };
    }
  }
  return { topic: "Multivariable Calculus", detail: "general multivariable calculus topics" };
}

/** Full context string injected into every LLM request */
export function getContextString(pathname = getPageUrl()) {
  const { topic, detail } = getTopicContext(pathname);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = `${origin}${pathname}`;
  return (
    `The student is currently on CalcVoyager page ${pathname} (full URL: ${fullUrl}). ` +
    `Topic: "${topic}". Focus: ${detail}.`
  );
}