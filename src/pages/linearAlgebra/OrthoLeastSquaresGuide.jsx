import { Link } from "react-router-dom";
import StudyGuideShell from "../StudyGuideShell";
import "../PartialDerivativesGuide.css";
import { LaMcqSection } from "./LaMcq";
import { TheoryBox, TheoremBox, ProcedureBox, WorkedExample, PracticalTheory, RealLifeUse } from "./LaBlocks";

function Divider() {
  return <hr className="divider" />;
}

function OrthoLeastSquaresGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Orthogonality & Least Squares (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Ortho · Part 2</div></div>
          <a className="sb-link" href="#la-o-proj">Orthogonal Projections</a>
          <a className="sb-link" href="#la-o-proc2">Method</a>
          <a className="sb-link" href="#la-o-ex-p2">Examples</a>
          <a className="sb-link" href="#quiz-la-o-proj">Quiz</a>
          <a className="sb-link" href="#la-o-apps">Applications</a>
          <a className="sb-link" href="#quiz-la-o-apps">Quiz</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Linear Algebra · Part 2 of 2</div>
            <h1 className="ch-title">Orthogonality & Least Squares</h1>
            <p className="ch-sub">Projections, normal equations, and least-squares applications</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <section className="section" id="la-o-proj">
            <div className="sec-badge">Section 5.3</div>
            <h2 className="sec-title">Orthogonal Projections — deep theory</h2>
            <p>
              {"The orthogonal projection of a vector b onto a subspace W is the unique closest point in W to b. This single idea powers least squares, Fourier series, and many approximation methods."}
            </p>
            <TheoryBox title="Projection onto a subspace">
              <p>
                {"If the columns of A form a basis for W, the projection of b onto W is $\\hat{b}=A\\hat{x}$ where $\\hat{x}$ solves the normal equations $A^TA\\hat{x}=A^Tb$. The residual $b-\\hat{b}$ is orthogonal to every column of A (and therefore to all of W)."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Workflow that stays organized">
              <p>
                {"Form $A^TA$ and $A^Tb$, solve the square system for $\\hat{x}$, then compute $\\hat{b}=A\\hat{x}$. Always check that the residual is orthogonal to the columns of A."}
              </p>
            </PracticalTheory>
            <TheoremBox title="Best approximation">
              <p>
                {"Among all vectors in W, the orthogonal projection $\\hat{b}$ is the unique closest point to b. This is the geometric heart of least squares."}
              </p>
            </TheoremBox>
            <RealLifeUse>{"GPS receivers and robotics controllers use orthonormal coordinate frames so that measuring along one axis never leaks error into another; least-squares fitting of data, signal denoising, and regression in statistics all rest on orthogonal projection."}</RealLifeUse>
          </section>

          <section className="section" id="la-o-proc2">
            <div className="sec-badge">Procedure</div>
            <h2 className="sec-title">How to compute a least-squares solution</h2>
            <ProcedureBox
              title="How to solve a least-squares problem"
              steps={[
                { text: "Form the normal equations $A^TA\\hat{x}=A^Tb$.", why: "These come from setting the residual orthogonal to Col(A)." },
                { text: "Solve the square system for $\\hat{x}$ (unique when A has independent columns).", why: "AᵀA is invertible precisely when the columns of A are independent." },
                { text: "Compute the projection $\\hat{b}=A\\hat{x}$ and the residual $b-\\hat{b}$.", why: "The residual must be orthogonal to every column of A." },
                { text: "Optionally compute the error $||b-\\hat{b}||$.", why: "This quantifies how well the model fits the data." },
                { text: "For a projection matrix instead of a single vector, compute $P=A(A^TA)^{-1}A^T$.", why: "P sends any b directly to its projection $Ab$ onto Col(A)." },
              ]}
            />
          </section>

          <section className="section" id="la-o-ex-p2">
            <div className="sec-badge">Large examples</div>
            <h2 className="sec-title">Four detailed worked examples</h2>

            <WorkedExample
              number={1}
              title="Least-squares line fit through three points"
              setup={"Find the least-squares line $y=mx+c$ through $(0,1)$, $(1,2)$, $(2,2)$."}
              steps={[
                { text: "Design matrix $A=\\begin{pmatrix}0&1\\\\1&1\\\\2&1\\end{pmatrix}$, $b=(1,2,2)$, unknowns $x=(m,c)$.", why: "Each row encodes one data point's equation $y=mx+c$." },
                { text: "$A^TA=\\begin{pmatrix}5&3\\\\3&3\\end{pmatrix}$, $A^Tb=\\begin{pmatrix}6\\\\5\\end{pmatrix}$.", why: "Compute the normal-equation matrix and right-hand side." },
                { text: "Solving: $m=\\tfrac12$, $c=\\tfrac{7}{6}$.", why: "Eliminate $c$, then back-substitute." },
              ]}
              result={"$y=\\tfrac12x+\\tfrac{7}{6}$."}
              check={"Predicted values are close to the actual $1,2,2$, with small symmetric residuals."}
            />
            <WorkedExample
              number={2}
              title="Projection matrix onto a column space"
              setup={"Find the projection matrix $P$ onto the column space of $A=\\begin{pmatrix}1&0\\\\0&1\\\\1&1\\end{pmatrix}$, and use it to project $b=(1,2,3)$."}
              steps={[
                { text: "$P=A(A^TA)^{-1}A^T$; $A^TA=\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$, $(A^TA)^{-1}=\\tfrac13\\begin{pmatrix}2&-1\\\\-1&2\\end{pmatrix}$.", why: "Standard formula for projecting onto $\\operatorname{col}(A)$." },
                { text: "$P=\\tfrac13\\begin{pmatrix}2&-1&1\\\\-1&2&1\\\\1&1&2\\end{pmatrix}$.", why: "Multiply the three factors together." },
                { text: "$Pb=(1,2,3)=b$, since $b$ already lies in $\\operatorname{col}(A)$.", why: "Projecting a vector already in the subspace leaves it unchanged." },
              ]}
              result={"$P=\\tfrac13\\begin{pmatrix}2&-1&1\\\\-1&2&1\\\\1&1&2\\end{pmatrix}$, and $Pb=b$."}
              check={"$b$ equals column 1 plus $2\\times$ column 2 of $A$, so $P$ fixes it, as expected."}
            />
            <WorkedExample
              number={3}
              title="Least squares for an overdetermined line fit"
              setup={"Fit $y=c_0+c_1x$ using least squares to $(1,1),(2,3),(3,4),(4,4)$, then compute the sum of squared residuals."}
              steps={[
                { text: "$A^TA=\\begin{pmatrix}4&10\\\\10&30\\end{pmatrix}$, $A^Tb=\\begin{pmatrix}12\\\\35\\end{pmatrix}$.", why: "Sum of $1$'s, sum of $x_i$, sum of $x_i^2$, and the corresponding $b$-sums." },
                { text: "Solving gives $c_1=1$, $c_0=0.5$: fitted line $y=0.5+x$.", why: "Solve the reduced $2\\times2$ system." },
                { text: "Residuals: $-0.5,\\,0.5,\\,0.5,\\,-0.5$; sum of squares $=4(0.25)=1$.", why: "Actual minus predicted, squared and summed." },
              ]}
              result={"$y=0.5+x$, sum of squared residuals $=1$."}
              check={"Residuals sum to zero, as least squares always makes the residual orthogonal to the constant column."}
            />
            <WorkedExample
              number={4}
              title="Orthogonal complement of a plane in R³"
              setup={"Find the orthogonal complement of the plane $W=\\{(x,y,z):x+2y-z=0\\}$, and decompose $b=(3,1,2)$ into components in $W$ and $W^{\\perp}$."}
              steps={[
                { text: "$W^{\\perp}=\\operatorname{span}(1,2,-1)$, the line along the plane's normal.", why: "The complement of a hyperplane is the line along its normal." },
                { text: "Project $b$ onto $W^{\\perp}$: $\\hat b=\\dfrac{n\\cdot b}{n\\cdot n}n=(0.5,1,-0.5)$.", why: "Same line-projection formula used throughout this unit." },
                { text: "The $W$-component is $b-\\hat b=(2.5,0,2.5)$.", why: "Whatever remains after removing the normal component." },
              ]}
              result={"$W^{\\perp}=\\operatorname{span}(1,2,-1)$; $b=(2.5,0,2.5)+(0.5,1,-0.5)$."}
              check={"$(2.5,0,2.5)\\cdot(1,2,-1)=0$, confirming it lies in $W$."}
            />
          </section>

          <LaMcqSection
            id="quiz-la-o-proj"
            badge="Quiz 5.3"
            title="Orthogonal Projections"
            scoreId="score-la-o-proj"
            section="la-o-proj"
            questions={[
              {
                prompt: "The residual $b-A\\hat{x}$ is always:",
                options: ["Orthogonal to Col(A)", "Zero", "Parallel to b"],
                answer: "A",
                explanation: "This is exactly what the normal equations enforce.",
              },
              {
                prompt: "Normal equations are written as:",
                options: ["$A^TA\\hat{x}=A^Tb$", "$Ax=b$", "$A^{-1}b=x$"],
                answer: "A",
                explanation: "Derived by minimizing ||Ax−b||².",
              },
              {
                prompt: "When columns of A are independent, $A^TA$ is:",
                options: ["Invertible", "Singular", "Zero"],
                answer: "A",
                explanation: "Independent columns guarantee $A^TA$ is invertible.",
              },
              {
                prompt: "A projection matrix $P$ always satisfies:",
                options: ["$P^2=P$", "$P^2=-P$", "$\\det P\\neq0$"],
                answer: "A",
                explanation: "Projecting an already-projected vector changes nothing, so P is idempotent.",
              },
            ]}
          />

          <Divider />

          <section className="section" id="la-o-apps">
            <div className="sec-badge">Section 5.4</div>
            <h2 className="sec-title">Applications of least squares</h2>
            <TheoryBox title="Why least squares matters">
              <p>
                {"Overdetermined systems appear constantly in data fitting, sensor fusion, and scientific computing. The least-squares solution is the standard practical answer when exact consistency is impossible."}
              </p>
            </TheoryBox>
          </section>

          <LaMcqSection
            id="quiz-la-o-apps"
            badge="Quiz 5.4"
            title="Applications"
            scoreId="score-la-o-apps"
            section="la-o-apps"
            questions={[
              {
                prompt: "Least squares is most useful when the system is:",
                options: ["Overdetermined", "Square and invertible", "Underdetermined only"],
                answer: "A",
                explanation: "More equations than unknowns is the classic setting.",
              },
              {
                prompt: "The geometric meaning of the least-squares solution is:",
                options: ["Orthogonal projection of b onto Col(A)", "Any solution of Ax=b", "The zero vector"],
                answer: "A",
                explanation: "It is the closest point in the column space.",
              },
              {
                prompt: "A common application is:",
                options: ["Data fitting / regression", "Only eigenvalue problems", "Only matrix inversion"],
                answer: "A",
                explanation: "Regression is the most frequent use of least squares.",
              },
            ]}
          />

          <Divider />
          <section className="section" id="summary">
            <div className="sec-badge">Reference</div>
            <h2 className="sec-title">Module complete</h2>
            <p>
              {"Orthogonal projections and the normal equations give the best approximation of b by vectors in Col(A). This is the foundation of least-squares methods."}
            </p>
            <p>
              Drill in the{" "}
              <Link to="/practice" style={{ color: "var(--gold)", fontWeight: 600 }}>
                Practice Arena
              </Link>{" "}
              or return via the gold bar to the course hub.
            </p>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Orthogonality & Least Squares (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Ortho · Part 1</div></div>
        <a className="sb-link" href="#la-o-intro">Orthogonality</a>
        <a className="sb-link" href="#la-o-proc1">Method</a>
        <a className="sb-link" href="#la-o-ex-p1">Examples</a>
        <a className="sb-link" href="#quiz-la-o-intro">Quiz</a>
        <a className="sb-link" href="#la-o-gram">Gram–Schmidt</a>
        <a className="sb-link" href="#quiz-la-o-gram">Quiz</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Linear Algebra · Part 1 of 2</div>
          <h1 className="ch-title">Orthogonality & Least Squares</h1>
          <p className="ch-sub">Orthogonal sets, projections, and orthonormal bases</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <section className="section" id="la-o-intro">
          <div className="sec-badge">Section 5.1</div>
          <h2 className="sec-title">Orthogonality — deep theory</h2>
          <p>
            {"Two vectors are orthogonal when their dot product is zero. Orthogonal and orthonormal sets simplify almost every calculation involving lengths, angles, and projections."}
          </p>
          <TheoryBox title="Orthogonal and orthonormal sets">
            <p>
              {"A set of vectors is orthogonal if every pair of distinct vectors has dot product zero. It is orthonormal if, in addition, every vector has length 1. Orthonormal bases make coordinates especially simple: the coefficients are just the corresponding dot products."}
            </p>
          </TheoryBox>
          <TheoremBox title="Pythagorean theorem">
            <p>
              {"If u and v are orthogonal, then $||u+v||^2 = ||u||^2 + ||v||^2$. This extends to any finite orthogonal set."}
            </p>
          </TheoremBox>
          <RealLifeUse>{"GPS receivers and robotics controllers use orthonormal coordinate frames so that measuring along one axis never leaks error into another."}</RealLifeUse>
        </section>

        <section className="section" id="la-o-proc1">
          <div className="sec-badge">Procedure</div>
          <h2 className="sec-title">How to check orthogonality and normalize</h2>
          <ProcedureBox
            title="Working with orthogonal sets"
            steps={[
              { text: "Compute all pairwise dot products; they must be zero for orthogonality.", why: "Definition of an orthogonal set." },
              { text: "To normalize a nonzero vector u, replace it by $u/||u||$.", why: "Produces a unit vector in the same direction." },
              { text: "An orthogonal set of nonzero vectors is automatically linearly independent.", why: "A standard theorem of linear algebra." }
            ]}
          />
        </section>

        <section className="section" id="la-o-ex-p1">
          <div className="sec-badge">Large examples</div>
          <h2 className="sec-title">Four detailed worked examples</h2>

          <WorkedExample
            number={1}
            title="Testing orthogonality and building unit vectors"
            setup={"Check whether $u=(2,-1,2)$ and $v=(1,4,1)$ are orthogonal, then normalize each."}
            steps={[
              { text: "$u\\cdot v=2(1)+(-1)(4)+2(1)=2-4+2=0$, so $u$ and $v$ are orthogonal.", why: "Dot product test for orthogonality." },
              { text: "$\\|u\\|=\\sqrt{4+1+4}=3$; $\\|v\\|=\\sqrt{1+16+1}=3\\sqrt2$.", why: "Length is the square root of the dot product with itself." },
              { text: "Unit vectors: $\\hat u=\\tfrac13(2,-1,2)$, $\\hat v=\\tfrac{1}{3\\sqrt2}(1,4,1)$.", why: "Divide by each vector's own length." },
            ]}
            result={"$u\\perp v$; $\\hat u=\\tfrac13(2,-1,2)$, $\\hat v=\\tfrac{1}{3\\sqrt2}(1,4,1)$."}
            check={"$\\hat u\\cdot\\hat u=1$, confirming unit length."}
          />
          <WorkedExample
            number={2}
            title="Projection of a vector onto a line"
            setup={"Find the orthogonal projection of $b=(4,3)$ onto the line spanned by $a=(1,2)$, and the distance from $b$ to that line."}
            steps={[
              { text: "$\\hat b=\\dfrac{a\\cdot b}{a\\cdot a}a=\\tfrac{10}{5}(1,2)=(2,4)$.", why: "Projection formula onto a line through the origin." },
              { text: "Residual $e=b-\\hat b=(2,-1)$.", why: "Error vector between $b$ and its projection." },
              { text: "Distance $=\\|e\\|=\\sqrt5$.", why: "The shortest distance from $b$ to the line is the length of the perpendicular residual." },
            ]}
            result={"$\\hat b=(2,4)$, distance $\\sqrt5$."}
            check={"$a\\cdot(b-\\hat b)=0$ confirms the projection is correct."}
          />
          <WorkedExample
            number={3}
            title="Gram–Schmidt orthogonalization"
            setup={"Apply Gram–Schmidt to $v_1=(1,1,0)$, $v_2=(1,0,1)$ to get an orthogonal basis for their span."}
            steps={[
              { text: "$u_1=v_1=(1,1,0)$.", why: "First vector is unchanged." },
              { text: "$u_2=v_2-\\dfrac{u_1\\cdot v_2}{u_1\\cdot u_1}u_1=(1,0,1)-\\tfrac12(1,1,0)=(\\tfrac12,-\\tfrac12,1)$.", why: "Subtract the component of $v_2$ along $u_1$." },
              { text: "Check orthogonality: $u_1\\cdot u_2=\\tfrac12-\\tfrac12+0=0$.", why: "Confirms the construction worked." },
            ]}
            result={"$u_1=(1,1,0)$, $u_2=(\\tfrac12,-\\tfrac12,1)$."}
            check={"$u_1\\cdot u_2=0$ and both vectors still span the original plane."}
          />
          <WorkedExample
            number={4}
            title="QR decomposition of a 3×2 matrix"
            setup={"Find the QR decomposition of $A=\\begin{pmatrix}1&1\\\\1&0\\\\0&1\\end{pmatrix}$ using Gram–Schmidt."}
            steps={[
              { text: "Reusing Example 3's Gram–Schmidt: $q_1=\\tfrac{1}{\\sqrt2}(1,1,0)$, $q_2=\\sqrt{\\tfrac23}(\\tfrac12,-\\tfrac12,1)$.", why: "Normalize the orthogonal basis." },
              { text: "$R_{11}=\\|a_1\\|=\\sqrt2$; $R_{12}=q_1\\cdot a_2=\\tfrac{1}{\\sqrt2}$; $R_{22}=\\|u_2\\|=\\sqrt{3/2}$.", why: "$R$ entries are projections of later columns onto earlier $q$'s." },
              { text: "$A=QR$ with $Q=[q_1\\ q_2]$, $R=\\begin{pmatrix}\\sqrt2&1/\\sqrt2\\\\0&\\sqrt{3/2}\\end{pmatrix}$.", why: "Assemble the factorization." },
            ]}
            result={"$A=QR$ with $Q$ orthonormal-columns and $R$ upper triangular."}
            check={"Reconstructing $QR$ column by column returns exactly $A$."}
          />
        </section>

        <LaMcqSection
          id="quiz-la-o-intro"
          badge="Quiz 5.1"
          title="Orthogonality basics"
          scoreId="score-la-o-intro"
          section="la-o-intro"
          questions={[
            {
              prompt: "Two nonzero vectors are orthogonal when their dot product is:",
              options: ["Zero", "One", "Their lengths product"],
              answer: "A",
              explanation: "By definition, u·v = 0.",
            },
            {
              prompt: "An orthonormal set is:",
              options: ["Orthogonal and every vector has length 1", "Only orthogonal", "Only unit vectors"],
              answer: "A",
              explanation: "Both conditions are required.",
            },
            {
              prompt: "If u ⊥ v then ||u+v||² equals:",
              options: ["||u||² + ||v||²", "||u||² − ||v||²", "2||u||||v||"],
              answer: "A",
              explanation: "Pythagorean theorem for orthogonal vectors.",
            },
            {
              prompt: "A set of nonzero orthogonal vectors is always:",
              options: ["Linearly independent", "Linearly dependent", "A basis for $\\mathbb{R}^n$"],
              answer: "A",
              explanation: "Taking the dot product with each vector in a dependence relation forces all coefficients to zero.",
            },
          ]}
        />

        <Divider />

        <section className="section" id="la-o-gram">
          <div className="sec-badge">Section 5.2</div>
          <h2 className="sec-title">Gram–Schmidt process</h2>
          <TheoryBox title="Producing an orthonormal basis">
            <p>
              {"Given any basis, the Gram–Schmidt process produces an orthonormal basis for the same span by successive orthogonal projections and normalization."}
            </p>
          </TheoryBox>
        </section>

        <LaMcqSection
          id="quiz-la-o-gram"
          badge="Quiz 5.2"
          title="Gram–Schmidt"
          scoreId="score-la-o-gram"
          section="la-o-gram"
          questions={[
            {
              prompt: "Gram–Schmidt starts by:",
              options: ["Normalizing the first vector", "Taking cross products", "Computing determinants"],
              answer: "A",
              explanation: "The first step is usually to normalize v₁.",
            },
            {
              prompt: "The process produces:",
              options: ["An orthonormal basis for the same span", "A random basis", "Only orthogonal but non-unit vectors"],
              answer: "A",
              explanation: "It yields an orthonormal basis of the original subspace.",
            },
            {
              prompt: "After Gram–Schmidt, the new vectors are:",
              options: ["Orthogonal (and usually normalized)", "Always parallel", "Linearly dependent"],
              answer: "A",
              explanation: "That is the whole point of the algorithm.",
            },
            {
              prompt: "The QR decomposition writes a matrix $A$ (independent columns) as:",
              options: ["$A=QR$ with $Q$ orthonormal-columns and $R$ upper triangular", "$A=QR$ with both $Q,R$ diagonal", "$A=QR$ with $Q$ symmetric and $R$ orthogonal"],
              answer: "A",
              explanation: "QR packages the Gram–Schmidt result: $Q$ holds the orthonormal directions, $R$ the projection coefficients.",
            },
          ]}
        />

        <Divider />
        <section className="section" id="summary1">
          <div className="sec-badge">Reference</div>
          <h2 className="sec-title">Continue</h2>
          <p>
            {"Orthogonal sets simplify projections and length calculations. Part 2 develops the projection formula and least-squares applications."}
          </p>
          <p>
            Use the gold button: <strong>Next: Part 2 — Projections & Least Squares</strong>.
          </p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default OrthoLeastSquaresGuide;