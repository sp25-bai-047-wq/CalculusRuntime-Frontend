import LaTopicPart from "./LaTopicPart";
import LinearEquationsGuide from "./LinearEquationsGuide";
import VectorsGuide from "./VectorsGuide";
import MatricesGuide from "./MatricesGuide";
import SystemsGuide from "./SystemsGuide";
import EigenGuide from "./EigenGuide";
import TransformGuide from "./TransformGuide";
import OrthoLeastSquaresGuide from "./OrthoLeastSquaresGuide";
import SvdGuide from "./SvdGuide";

export function LinearEquationsPart1() {
  return (
    <LaTopicPart
      sectionId="la-lineq-1"
      title="Linear Equations — Part 1"
      path="/linear-algebra/linear-equations/1"
      Guide={LinearEquationsGuide}
      part={1}
      nextPath="/linear-algebra/linear-equations/2"
      nextLabel="Next: Part 2 — Systems and solving techniques"
    />
  );
}

export function LinearEquationsPart2() {
  return (
    <LaTopicPart
      sectionId="la-lineq-2"
      title="Linear Equations — Part 2"
      path="/linear-algebra/linear-equations/2"
      Guide={LinearEquationsGuide}
      part={2}
      nextPath="/linear-algebra/vectors/1"
      nextLabel="Next: Vectors and Vector Spaces"
    />
  );
}

export function VectorsPart1() {
  return (
    <LaTopicPart
      sectionId="la-vectors-1"
      title="Vectors & Vector Spaces — Part 1"
      path="/linear-algebra/vectors/1"
      Guide={VectorsGuide}
      part={1}
      nextPath="/linear-algebra/vectors/2"
      nextLabel="Next: Part 2 — Span and basis"
    />
  );
}

export function VectorsPart2() {
  return (
    <LaTopicPart
      sectionId="la-vectors-2"
      title="Vectors & Vector Spaces — Part 2"
      path="/linear-algebra/vectors/2"
      Guide={VectorsGuide}
      part={2}
      nextPath="/linear-algebra/matrices/1"
      nextLabel="Next: Matrices and Determinants"
    />
  );
}

export function MatricesPart1() {
  return (
    <LaTopicPart
      sectionId="la-matrices-1"
      title="Matrices & Determinants — Part 1"
      path="/linear-algebra/matrices/1"
      Guide={MatricesGuide}
      part={1}
      nextPath="/linear-algebra/matrices/2"
      nextLabel="Next: Part 2 — Determinants and inverses"
    />
  );
}

export function MatricesPart2() {
  return (
    <LaTopicPart
      sectionId="la-matrices-2"
      title="Matrices & Determinants — Part 2"
      path="/linear-algebra/matrices/2"
      Guide={MatricesGuide}
      part={2}
      nextPath="/linear-algebra/systems/1"
      nextLabel="Next: Systems of Linear Equations"
    />
  );
}

export function SystemsPart1() {
  return (
    <LaTopicPart
      sectionId="la-systems-1"
      title="Systems of Linear Equations — Part 1"
      path="/linear-algebra/systems/1"
      Guide={SystemsGuide}
      part={1}
      nextPath="/linear-algebra/systems/2"
      nextLabel="Next: Part 2 — Rank and geometry"
    />
  );
}

export function SystemsPart2() {
  return (
    <LaTopicPart
      sectionId="la-systems-2"
      title="Systems of Linear Equations — Part 2"
      path="/linear-algebra/systems/2"
      Guide={SystemsGuide}
      part={2}
      nextPath="/linear-algebra/eigen/1"
      nextLabel="Next: Eigenvalues and Eigenvectors"
    />
  );
}

export function EigenPart1() {
  return (
    <LaTopicPart
      sectionId="la-eigen-1"
      title="Eigenvalues & Eigenvectors — Part 1"
      path="/linear-algebra/eigen/1"
      Guide={EigenGuide}
      part={1}
      nextPath="/linear-algebra/eigen/2"
      nextLabel="Next: Part 2 — Diagonalization"
    />
  );
}

export function EigenPart2() {
  return (
    <LaTopicPart
      sectionId="la-eigen-2"
      title="Eigenvalues & Eigenvectors — Part 2"
      path="/linear-algebra/eigen/2"
      Guide={EigenGuide}
      part={2}
      nextPath="/linear-algebra/transformations/1"
      nextLabel="Next: Linear Transformations"
    />
  );
}

export function TransformPart1() {
  return (
    <LaTopicPart
      sectionId="la-transform-1"
      title="Linear Transformations — Part 1"
      path="/linear-algebra/transformations/1"
      Guide={TransformGuide}
      part={1}
      nextPath="/linear-algebra/transformations/2"
      nextLabel="Next: Part 2 — Matrix representation & invertibility"
    />
  );
}

export function TransformPart2() {
  return (
    <LaTopicPart
      sectionId="la-transform-2"
      title="Linear Transformations — Part 2"
      path="/linear-algebra/transformations/2"
      Guide={TransformGuide}
      part={2}
      nextPath="/linear-algebra/orthogonality/1"
      nextLabel="Next: Orthogonality & Least Squares"
    />
  );
}

export function OrthoPart1() {
  return (
    <LaTopicPart
      sectionId="la-ortho-1"
      title="Orthogonality & Least Squares — Part 1"
      path="/linear-algebra/orthogonality/1"
      Guide={OrthoLeastSquaresGuide}
      part={1}
      nextPath="/linear-algebra/orthogonality/2"
      nextLabel="Next: Part 2 — Projections & Least Squares"
    />
  );
}

export function OrthoPart2() {
  return (
    <LaTopicPart
      sectionId="la-ortho-2"
      title="Orthogonality & Least Squares — Part 2"
      path="/linear-algebra/orthogonality/2"
      Guide={OrthoLeastSquaresGuide}
      part={2}
      nextPath="/linear-algebra/svd/1"
      nextLabel="Next: Singular Value Decomposition"
    />
  );
}

export function SvdPart1() {
  return (
    <LaTopicPart
      sectionId="la-svd-1"
      title="Singular Value Decomposition — Part 1"
      path="/linear-algebra/svd/1"
      Guide={SvdGuide}
      part={1}
      nextPath="/linear-algebra/svd/2"
      nextLabel="Next: Part 2 — Applications & Low-rank Approximation"
    />
  );
}

export function SvdPart2() {
  return (
    <LaTopicPart
      sectionId="la-svd-2"
      title="Singular Value Decomposition — Part 2"
      path="/linear-algebra/svd/2"
      Guide={SvdGuide}
      part={2}
      courseId="linear-algebra"
      nextPath="/courses/linear-algebra"
      nextLabel="Back to Linear Algebra course hub"
    />
  );
}