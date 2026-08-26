# ⚛️ Calculus Runtime — Frontend

This directory contains the React Single-Page Application (SPA) for **Calculus Runtime**.

---

## 📁 Architecture & Organization

```
src/
├── components/          # Reusable component system
│   ├── common/          # Scalable UI building blocks (Button, Card, Modal, Input, Badge, Alert, LoadingSpinner)
│   ├── study/           # Educational widgets (ProgressBar, ConceptCard, FormulaViewer, Quiz, Hint)
│   ├── tools/           # Math tools (GraphCanvas, StepByStepSolution, MatrixGrid, DerivativeTool)
│   ├── Chatbot/         # AI Chatbot widget & message components
│   └── index.js         # Unified component barrel export
├── pages/               # Domain-organized page views
│   ├── auth/            # Login, Signup
│   ├── calculus/        # Calculus guides & certificates
│   ├── certificates/    # Certificate verification & portfolio
│   ├── courses/         # CourseHub, quiz, and concept explorer
│   ├── dashboard/       # Dashboard, study plans, leaderboard
│   ├── home/            # Home page
│   ├── linearAlgebra/   # Matrices, vectors, eigenvalue visualizer & sandbox
│   ├── multivariableCalculus/ # Multivariable calculus guides & topics
│   ├── probabilityStatistics/ # Probability & statistics guides & labs
│   ├── system/          # 404, error pages & placeholders
│   ├── tools/           # AI solver, volume calculator, vector fields
│   └── index.js         # Unified pages barrel export
├── context/             # Global state (AuthContext, ProgressContext)
├── hooks/               # Custom hooks (useProgress, useStepHints)
├── services/            # API integration services (chatApi, verificationAPI)
├── utils/               # Math rendering, LaTeX helpers, storage utilities
├── data/                # Quiz and course curriculum data
└── styles/              # Global CSS & themes
```

---

## 🛠 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimized bundle size.

---

## 🧩 Component Usage Examples

```javascript
// Import common design system UI
import { Button, Card, Modal, Badge, Input, Alert, LoadingSpinner } from './components/common';

// Import study and learning widgets
import { ProgressBar, ConceptCard, FormulaViewer } from './components/study';

// Import interactive math and graphing tools
import { GraphCanvas, StepByStepSolution, MatrixGrid } from './components/tools';
```
