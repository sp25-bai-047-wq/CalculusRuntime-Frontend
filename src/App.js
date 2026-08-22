import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./pages/ProgressContext";
import Layout from "./components/Layout";
import ScrollToTop from "./utils/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteThemeManager from "./components/SiteThemeManager";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AISolver from "./pages/AISolver";
import NotFound from "./pages/NotFound";
import CourseHub from "./pages/CourseHub";
import SimpleConcepts from "./pages/SimpleConcepts";
import ConceptExplore from "./pages/ConceptExplore";

import IntegralsPart1 from "./pages/IntegralsPart1";
import IntegralsPart2 from "./pages/IntegralsPart2";
import PartialPart1 from "./pages/PartialPart1";
import PartialPart2 from "./pages/PartialPart2";
import VectorPart1 from "./pages/VectorPart1";
import VectorPart2 from "./pages/VectorPart2";
import LimitsPart1 from "./pages/LimitsPart1";
import LimitsPart2 from "./pages/LimitsPart2";
import TaylorPart1 from "./pages/TaylorPart1";
import TaylorPart2 from "./pages/TaylorPart2";
import LagrangePart1 from "./pages/LagrangePart1";
import LagrangePart2 from "./pages/LagrangePart2";
import StokesPart1 from "./pages/StokesPart1";
import StokesPart2 from "./pages/StokesPart2";
import DivergencePart1 from "./pages/DivergencePart1";
import DivergencePart2 from "./pages/DivergencePart2";
import PractiseSection from "./pages/PractiseSection";
import PersonalizedStudyPlan from "./pages/PersonalizedStudyPlan";
import ContinuityFinder from "./pages/ContinuityFinder";
import ExtremeValueFunction from "./pages/ExtremeValueFinder";
import VolumeCalculator from "./pages/VolumeCalculator";
import DerivativeTool from "./components/DerivativeTool";
import VectorFieldVisualizer from "./pages/VectorFieldVisualizer";
import CheatSheet from "./pages/CheatSheet";
import Leaderboard from "./pages/Leaderboard";
import Certificate from "./pages/calculus/Certificate";
import CourseQuiz from "./pages/CourseQuiz";
import MyCertificates from "./pages/MyCertificates";
import VerifyCertificate from "./pages/VerifyCertificate";
import SavedForLater from "./pages/SavedForLater";
import Chatbot from "./components/Chatbot/Chatbot";
import BackToTop from "./components/BackToTop";

import {
  LinearEquationsPart1,
  LinearEquationsPart2,
  VectorsPart1,
  VectorsPart2,
  MatricesPart1,
  MatricesPart2,
  SystemsPart1,
  SystemsPart2,
  EigenPart1,
  EigenPart2,
  TransformPart1,
  TransformPart2,
  OrthoPart1,
  OrthoPart2,
  SvdPart1,
  SvdPart2,
} from "./pages/linearAlgebra/LaParts";
import MatrixSandbox from "./pages/linearAlgebra/MatrixSandbox";
import LinearAlgebraOverview from "./pages/linearAlgebra/LinearAlgebraOverview";

import {
  ProbBasicsPart1,
  ProbBasicsPart2,
  RandomVarsPart1,
  RandomVarsPart2,
  DescriptivePart1,
  DescriptivePart2,
  HypothesisPart1,
  HypothesisPart2,
  RegressionPart1,
  RegressionPart2,
} from "./pages/probabilityStatistics/PsParts";

import {
  DiffPart1,
  DiffPart2,
  IntPart1,
  IntPart2,
  SeriesPart1,
  SeriesPart2,
  ConicsPart1,
  ConicsPart2,
} from "./pages/calculus/CalcParts";

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <ScrollToTop />
            <SiteThemeManager />
            <Routes>
              {/* Home */}
              <Route path="/" element={<Layout body={<Home />} />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Layout body={<Dashboard />} />} />
              <Route path="/saved" element={<Layout body={<SavedForLater />} />} />

              {/* Course hubs */}
              <Route path="/courses/:courseId" element={<Layout body={<CourseHub />} />} />

              {/* Simple Concepts */}
              <Route path="/simple-concepts" element={<Layout body={<SimpleConcepts />} />} />
              <Route path="/simple-concepts/:slug" element={<Layout body={<ConceptExplore />} />} />

              {/* AI Solver */}
              <Route path="/ai-solver" element={<Layout body={<AISolver />} />} />

              {/* Partial Derivatives */}
              <Route path="/partial-derivatives" element={<Navigate to="/partial-derivatives/1" replace />} />
              <Route path="/partial-derivatives/1" element={<Layout body={<PartialPart1 />} />} />
              <Route path="/partial-derivatives/2" element={<Layout body={<PartialPart2 />} />} />

              {/* Vector Calculus */}
              <Route path="/vector-calculus" element={<Navigate to="/vector-calculus/1" replace />} />
              <Route path="/vector-calculus/1" element={<Layout body={<VectorPart1 />} />} />
              <Route path="/vector-calculus/2" element={<Layout body={<VectorPart2 />} />} />
              <Route path="/vectorfield" element={<Layout body={<VectorFieldVisualizer />} />} />

              {/* Limits & Continuity */}
              <Route path="/limits-continuity" element={<Navigate to="/limits-continuity/1" replace />} />
              <Route path="/limits-continuity/1" element={<Layout body={<LimitsPart1 />} />} />
              <Route path="/limits-continuity/2" element={<Layout body={<LimitsPart2 />} />} />

              {/* Differentiation (Calculus certificate) */}
              <Route path="/differentiation" element={<Navigate to="/differentiation/1" replace />} />
              <Route path="/differentiation/1" element={<Layout body={<DiffPart1 />} />} />
              <Route path="/differentiation/2" element={<Layout body={<DiffPart2 />} />} />

              {/* Integration (Calculus certificate) */}
              <Route path="/integration" element={<Navigate to="/integration/1" replace />} />
              <Route path="/integration/1" element={<Layout body={<IntPart1 />} />} />
              <Route path="/integration/2" element={<Layout body={<IntPart2 />} />} />

              {/* Sequences & Series */}
              <Route path="/sequences-series" element={<Navigate to="/sequences-series/1" replace />} />
              <Route path="/sequences-series/1" element={<Layout body={<SeriesPart1 />} />} />
              <Route path="/sequences-series/2" element={<Layout body={<SeriesPart2 />} />} />

              {/* Conic Sections */}
              <Route path="/conic-sections" element={<Navigate to="/conic-sections/1" replace />} />
              <Route path="/conic-sections/1" element={<Layout body={<ConicsPart1 />} />} />
              <Route path="/conic-sections/2" element={<Layout body={<ConicsPart2 />} />} />

              {/* Multiple Integrals */}
              <Route path="/multiple-integrals" element={<Navigate to="/multiple-integrals/1" replace />} />
              <Route path="/multiple-integrals/1" element={<Layout body={<IntegralsPart1 />} />} />
              <Route path="/multiple-integrals/2" element={<Layout body={<IntegralsPart2 />} />} />

              {/* Taylor Series */}
              <Route path="/taylor-series" element={<Navigate to="/taylor-series/1" replace />} />
              <Route path="/taylor-series/1" element={<Layout body={<TaylorPart1 />} />} />
              <Route path="/taylor-series/2" element={<Layout body={<TaylorPart2 />} />} />

              <Route path="/certificates" element={<Layout body={<MyCertificates />} />} />
              <Route path="/verify" element={<Layout body={<VerifyCertificate />} />} />
              <Route path="/certificate/:courseId" element={<Layout body={<Certificate />} />} />
              <Route path="/quiz/:courseId" element={<Layout body={<CourseQuiz />} />} />

              {/* Lagrange Multipliers */}
              <Route path="/lagrange-multipliers" element={<Navigate to="/lagrange-multipliers/1" replace />} />
              <Route path="/lagrange-multipliers/1" element={<Layout body={<LagrangePart1 />} />} />
              <Route path="/lagrange-multipliers/2" element={<Layout body={<LagrangePart2 />} />} />

              {/* Stokes Theorem */}
              <Route path="/stokes-theorem" element={<Navigate to="/stokes-theorem/1" replace />} />
              <Route path="/stokes-theorem/1" element={<Layout body={<StokesPart1 />} />} />
              <Route path="/stokes-theorem/2" element={<Layout body={<StokesPart2 />} />} />

              {/* Divergence and Curl */}
              <Route path="/divergence-curl" element={<Navigate to="/divergence-curl/1" replace />} />
              <Route path="/divergence-curl/1" element={<Layout body={<DivergencePart1 />} />} />
              <Route path="/divergence-curl/2" element={<Layout body={<DivergencePart2 />} />} />

              {/* Linear Algebra */}
              <Route path="/linear-algebra/overview" element={<Layout body={<LinearAlgebraOverview />} />} />
              <Route path="/linear-algebra/linear-equations" element={<Navigate to="/linear-algebra/linear-equations/1" replace />} />
              <Route path="/linear-algebra/linear-equations/1" element={<Layout body={<LinearEquationsPart1 />} />} />
              <Route path="/linear-algebra/linear-equations/2" element={<Layout body={<LinearEquationsPart2 />} />} />
              <Route path="/linear-algebra/vectors" element={<Navigate to="/linear-algebra/vectors/1" replace />} />
              <Route path="/linear-algebra/vectors/1" element={<Layout body={<VectorsPart1 />} />} />
              <Route path="/linear-algebra/vectors/2" element={<Layout body={<VectorsPart2 />} />} />
              <Route path="/linear-algebra/matrices" element={<Navigate to="/linear-algebra/matrices/1" replace />} />
              <Route path="/linear-algebra/matrices/1" element={<Layout body={<MatricesPart1 />} />} />
              <Route path="/linear-algebra/matrices/2" element={<Layout body={<MatricesPart2 />} />} />
              <Route path="/linear-algebra/systems" element={<Navigate to="/linear-algebra/systems/1" replace />} />
              <Route path="/linear-algebra/systems/1" element={<Layout body={<SystemsPart1 />} />} />
              <Route path="/linear-algebra/systems/2" element={<Layout body={<SystemsPart2 />} />} />
              <Route path="/linear-algebra/eigen" element={<Navigate to="/linear-algebra/eigen/1" replace />} />
              <Route path="/linear-algebra/eigen/1" element={<Layout body={<EigenPart1 />} />} />
              <Route path="/linear-algebra/eigen/2" element={<Layout body={<EigenPart2 />} />} />
              {/* Linear Transformations */}
              <Route path="/linear-algebra/transformations" element={<Navigate to="/linear-algebra/transformations/1" replace />} />
              <Route path="/linear-algebra/transformations/1" element={<Layout body={<TransformPart1 />} />} />
              <Route path="/linear-algebra/transformations/2" element={<Layout body={<TransformPart2 />} />} />
              
              {/* Orthogonality & Least Squares */}
              <Route path="/linear-algebra/orthogonality" element={<Navigate to="/linear-algebra/orthogonality/1" replace />} />
              <Route path="/linear-algebra/orthogonality/1" element={<Layout body={<OrthoPart1 />} />} />
              <Route path="/linear-algebra/orthogonality/2" element={<Layout body={<OrthoPart2 />} />} />
              
              {/* Singular Value Decomposition */}
              <Route path="/linear-algebra/svd" element={<Navigate to="/linear-algebra/svd/1" replace />} />
              <Route path="/linear-algebra/svd/1" element={<Layout body={<SvdPart1 />} />} />
              <Route path="/linear-algebra/svd/2" element={<Layout body={<SvdPart2 />} />} />
              <Route path="/linear-algebra/matrix-sandbox" element={<Layout body={<MatrixSandbox />} />} />

              {/* Probability & Statistics */}
              <Route path="/probability-statistics/probability-basics" element={<Navigate to="/probability-statistics/probability-basics/1" replace />} />
              <Route path="/probability-statistics/probability-basics/1" element={<Layout body={<ProbBasicsPart1 />} />} />
              <Route path="/probability-statistics/probability-basics/2" element={<Layout body={<ProbBasicsPart2 />} />} />
              <Route path="/probability-statistics/random-variables" element={<Navigate to="/probability-statistics/random-variables/1" replace />} />
              <Route path="/probability-statistics/random-variables/1" element={<Layout body={<RandomVarsPart1 />} />} />
              <Route path="/probability-statistics/random-variables/2" element={<Layout body={<RandomVarsPart2 />} />} />
              <Route path="/probability-statistics/descriptive-statistics" element={<Navigate to="/probability-statistics/descriptive-statistics/1" replace />} />
              <Route path="/probability-statistics/descriptive-statistics/1" element={<Layout body={<DescriptivePart1 />} />} />
              <Route path="/probability-statistics/descriptive-statistics/2" element={<Layout body={<DescriptivePart2 />} />} />
              <Route path="/probability-statistics/hypothesis-testing" element={<Navigate to="/probability-statistics/hypothesis-testing/1" replace />} />
              <Route path="/probability-statistics/hypothesis-testing/1" element={<Layout body={<HypothesisPart1 />} />} />
              <Route path="/probability-statistics/hypothesis-testing/2" element={<Layout body={<HypothesisPart2 />} />} />
              <Route path="/probability-statistics/regression-correlation" element={<Navigate to="/probability-statistics/regression-correlation/1" replace />} />
              <Route path="/probability-statistics/regression-correlation/1" element={<Layout body={<RegressionPart1 />} />} />
              <Route path="/probability-statistics/regression-correlation/2" element={<Layout body={<RegressionPart2 />} />} />

              {/* Tools */}
              <Route path="/test" element={<Layout body={<ContinuityFinder />} />} />
              <Route path="/extreme" element={<Layout body={<ExtremeValueFunction />} />} />
              <Route path="/volumecalculator" element={<Layout body={<VolumeCalculator />} />} />
              <Route path="/derivative-visualizer" element={<Navigate to="/taylorx" replace />} />
              <Route path="/taylorx" element={<Layout body={<DerivativeTool />} />} />
              <Route path="/cheatsheet" element={<Layout body={<CheatSheet />} />} />

              {/* Practice Section */}
              <Route path="/practice" element={<Layout body={<PractiseSection />} />} />

              {/* AI Personalized Study Plan */}
              <Route path="/study-plan" element={<Layout body={<PersonalizedStudyPlan />} />} />

              {/* Peer Leaderboard */}
              <Route path="/leaderboard" element={<Layout body={<Leaderboard />} />} />

              {/* Catch-all */}
              <Route path="*" element={<Layout body={<NotFound />} />} />
            </Routes>
            <Chatbot />
            <BackToTop />
          </ErrorBoundary>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
