import { Link } from "react-router-dom";
import StudyGuideShell from "../StudyGuideShell";
import "../PartialDerivativesGuide.css";
import { LaMcqSection } from "./LaMcq";
import { TheoryBox, TheoremBox, ProcedureBox, WorkedExample, PracticalTheory, RealLifeUse } from "./LaBlocks";

function Divider() {
  return <hr className="divider" />;
}

function SvdGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Singular Value Decomposition (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">SVD · Part 2</div></div>
          <a className="sb-link" href="#la-s-apps">Applications</a>
          <a className="sb-link" href="#la-s-proc2">Method</a>
          <a className="sb-link" href="#la-s-ex-p2">Examples</a>
          <a className="sb-link" href="#quiz-la-s-apps">Quiz</a>
          <a className="sb-link" href="#la-s-lowrank">Low-rank Approx</a>
          <a className="sb-link" href="#quiz-la-s-lowrank">Quiz</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Linear Algebra · Part 2 of 2</div>
            <h1 className="ch-title">Singular Value Decomposition</h1>
            <p className="ch-sub">Applications, low-rank approximation, and the pseudoinverse</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <section className="section" id="la-s-apps">
            <div className="sec-badge">Section 6.3</div>
            <h2 className="sec-title">Why SVD matters</h2>
            <p>
              {"SVD is one of the most useful matrix factorizations in applied mathematics. It reveals the geometry of a linear map, gives the best low-rank approximations, and produces the Moore–Penrose pseudoinverse."}
            </p>
            <TheoryBox title="Geometric picture">
              <p>
                {"Any matrix A maps the unit sphere to an ellipsoid. The singular values are the lengths of the semi-axes of that ellipsoid; the right singular vectors point to the directions that are stretched the most (and least)."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Reading a condition number">
              <p>
                {"A huge gap between the largest and smallest singular value (a large condition number) is a warning sign: small errors or noise in the input get amplified enormously in the corresponding output direction, which matters for numerical solving and for deciding how many singular values are safe to keep."}
              </p>
            </PracticalTheory>
            <RealLifeUse>{"Image compression, principal component analysis (PCA), recommender systems, noise reduction, and solving rank-deficient least-squares problems all rely on SVD."}</RealLifeUse>
          </section>

          <section className="section" id="la-s-proc2">
            <div className="sec-badge">Procedure</div>
            <h2 className="sec-title">Computing a truncated SVD</h2>
            <ProcedureBox
              title="Low-rank approximation via SVD"
              steps={[
                { text: "Compute (or obtain) the full SVD $A = U\\Sigma V^T$.", why: "This is the starting point for truncation." },
                { text: "Keep only the largest $k$ singular values and the corresponding columns of $U$ and $V$.", why: "Eckart–Young theorem says this gives the best rank-$k$ approximation." },
                { text: "Form $A_k = U_k \\Sigma_k V_k^T$.", why: "This is the rank-$k$ matrix closest to A in both Frobenius and spectral norms." },
                { text: "To build the pseudoinverse instead, reciprocate every nonzero singular value and swap the roles of $U$ and $V$: $A^+=V\\Sigma^+U^T$.", why: "Zero singular values cannot be inverted, so they stay zero in $\\Sigma^+$." },
              ]}
            />
          </section>

          <section className="section" id="la-s-ex-p2">
            <div className="sec-badge">Large examples</div>
            <h2 className="sec-title">Four detailed worked examples</h2>

            <WorkedExample
              number={1}
              title="Pseudoinverse of a non-square matrix"
              setup={"Find the Moore–Penrose pseudoinverse of $A=\\begin{pmatrix}2&0\\\\0&0\\\\0&3\\end{pmatrix}$."}
              steps={[
                { text: "$A$ is already in rectangular-diagonal form, so its nonzero entries $2,3$ are the singular values.", why: "Convenient special case." },
                { text: "$\\Sigma^{+}$ replaces each nonzero singular value by its reciprocal and transposes the shape.", why: "Definition of the pseudoinverse of a diagonal matrix." },
                { text: "$A^{+}=\\begin{pmatrix}0.5&0&0\\\\0&0&1/3\\end{pmatrix}$.", why: "Invert the nonzero entries; leave the zero row/column collapsed." },
                { text: "Check: $AA^{+}A=A$, a defining property of the pseudoinverse.", why: "Verification identity." },
              ]}
              result={"$A^{+}=\\begin{pmatrix}0.5&0&0\\\\0&0&1/3\\end{pmatrix}$."}
              check={"$AA^{+}A=A$ holds by direct multiplication."}
            />
            <WorkedExample
              number={2}
              title="SVD reveals the condition number"
              setup={"For $A=\\begin{pmatrix}100&0\\\\0&0.01\\end{pmatrix}$, find the condition number and explain its practical meaning."}
              steps={[
                { text: "$A$ is diagonal, so $\\sigma_1=100$, $\\sigma_2=0.01$.", why: "Already in SVD form with $U=V=I$." },
                { text: "Condition number $\\kappa(A)=\\sigma_{\\max}/\\sigma_{\\min}=100/0.01=10{,}000$.", why: "Standard definition in the 2-norm." },
                { text: "A large $\\kappa$ means $A$ is nearly singular in one direction: tiny input errors get amplified $10{,}000\\times$ relative to the other direction.", why: "Interpretation of condition number." },
              ]}
              result={"$\\kappa(A)=10{,}000$ — the matrix is ill-conditioned."}
              check={"The huge gap between $\\sigma_1=100$ and $\\sigma_2=0.01$ directly explains the sensitivity."}
            />
            <WorkedExample
              number={3}
              title="SVD of a symmetric positive-definite matrix"
              setup={"For symmetric $A=\\begin{pmatrix}5&2\\\\2&2\\end{pmatrix}$ (eigenvalues $6,1$, eigenvectors $(2,1),(1,-2)$), relate its SVD to its eigendecomposition."}
              steps={[
                { text: "Since $A$ is symmetric with positive eigenvalues, $A^TA=A^2$ has eigenvalues $\\lambda_i^2$, so $\\sigma_i=\\lambda_i$: $\\sigma_1=6$, $\\sigma_2=1$.", why: "$A^T=A$ makes $A^TA=A^2$." },
                { text: "The right singular vectors $V$ equal the orthonormal eigenvectors, and because eigenvalues are positive, $U=V$ too.", why: "Left and right singular vectors coincide for symmetric positive-definite matrices." },
                { text: "So $A=U\\Sigma V^T$ becomes exactly $A=Q\\Lambda Q^T$, the spectral decomposition.", why: "SVD reduces to eigendecomposition in this special case." },
              ]}
              result={"For symmetric positive-definite $A$, $\\sigma_i=\\lambda_i$ and $U=V=Q$."}
              check={"$\\sigma_1\\sigma_2=6=\\det A=\\lambda_1\\lambda_2$."}
            />
            <WorkedExample
              number={4}
              title="How much data a truncated SVD keeps"
              setup={"A $100\\times100$ image matrix has $\\sum\\sigma_i^2=5000$ overall, and the top $10$ singular values contribute $4750$ of that. Evaluate the rank-$10$ approximation's quality and storage savings."}
              steps={[
                { text: "Fraction of energy kept: $4750/5000=0.95$, i.e. $95\\%$.", why: "$\\|A\\|_F^2=\\sum\\sigma_i^2$, so this ratio measures retained information." },
                { text: "Relative approximation error $=\\sqrt{1-0.95}=\\sqrt{0.05}\\approx22\\%$.", why: "Frobenius error uses the dropped singular values' energy." },
                { text: "Storage for rank-$10$: $100(10)+10+10(100)=2010$ numbers, versus $10{,}000$ for the full matrix — about $20\\%$ of the original size.", why: "Only the top $10$ triplets are kept." },
              ]}
              result={"Rank-$10$ approximation keeps $95\\%$ of the image energy using only about $20\\%$ of the original storage."}
              check={"$22\\%$ relative error is consistent with dropping $5\\%$ of squared energy ($\\sqrt{0.05}\\approx0.224$)."}
            />
          </section>

          <LaMcqSection
            id="quiz-la-s-apps"
            badge="Quiz 6.3"
            title="SVD Applications"
            scoreId="score-la-s-apps"
            section="la-s-apps"
            questions={[
              {
                prompt: "The best rank-k approximation of A is obtained by:",
                options: ["Keeping the top k singular values/vectors", "Keeping the smallest singular values", "Setting all singular values to 1"],
                answer: "A",
                explanation: "This is the content of the Eckart–Young theorem.",
              },
              {
                prompt: "SVD can be used to compute:",
                options: ["The Moore–Penrose pseudoinverse", "Only eigenvalues of A", "Only the determinant"],
                answer: "A",
                explanation: "The pseudoinverse is formed by inverting the nonzero singular values.",
              },
              {
                prompt: "A common use of truncated SVD is:",
                options: ["Image / data compression", "Only solving Ax=b when A is square", "Computing the trace"],
                answer: "A",
                explanation: "Keeping the largest singular components gives a compact approximation.",
              },
              {
                prompt: "Principal Component Analysis (PCA) is closely related to SVD because:",
                options: ["The right singular vectors of the centered data matrix are the principal directions", "PCA requires computing a matrix inverse only", "PCA and SVD apply only to square matrices"],
                answer: "A",
                explanation: "PCA's principal components are eigenvectors of the covariance matrix, which SVD of the centered data matrix directly provides.",
              },
            ]}
          />

          <Divider />

          <section className="section" id="la-s-lowrank">
            <div className="sec-badge">Section 6.4</div>
            <h2 className="sec-title">Low-rank approximation & pseudoinverse</h2>
            <TheoryBox title="Eckart–Young and the pseudoinverse">
              <p>
                {"The truncated SVD gives the optimal low-rank approximation. The pseudoinverse $A^+$ is obtained by taking the reciprocal of every nonzero singular value and transposing the factors appropriately. It yields the minimum-norm least-squares solution."}
              </p>
            </TheoryBox>
          </section>

          <LaMcqSection
            id="quiz-la-s-lowrank"
            badge="Quiz 6.4"
            title="Low-rank & Pseudoinverse"
            scoreId="score-la-s-lowrank"
            section="la-s-lowrank"
            questions={[
              {
                prompt: "The number of nonzero singular values equals:",
                options: ["The rank of A", "The number of rows always", "The condition number"],
                answer: "A",
                explanation: "Rank is defined as the number of nonzero singular values.",
              },
              {
                prompt: "In the pseudoinverse, zero singular values are:",
                options: ["Left as zero (not inverted)", "Inverted to infinity", "Set to 1"],
                answer: "A",
                explanation: "Only nonzero singular values are inverted.",
              },
              {
                prompt: "Condition number $\\kappa_2(A)$ is:",
                options: ["$\\sigma_{\\max}/\\sigma_{\\min}$", "$\\sigma_{\\max}+\\sigma_{\\min}$", "$\\det(A)$"],
                answer: "A",
                explanation: "It is the ratio of the largest to the smallest singular value.",
              },
            ]}
          />

          <Divider />
          <section className="section" id="summary">
            <div className="sec-badge">Reference</div>
            <h2 className="sec-title">Module complete</h2>
            <p>
              {"SVD reveals the fundamental geometry of any matrix and supplies the optimal tools for low-rank approximation and the pseudoinverse."}
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
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Singular Value Decomposition (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">SVD · Part 1</div></div>
        <a className="sb-link" href="#la-s-intro">Definition</a>
        <a className="sb-link" href="#la-s-proc1">Method</a>
        <a className="sb-link" href="#la-s-ex-p1">Examples</a>
        <a className="sb-link" href="#quiz-la-s-intro">Quiz</a>
        <a className="sb-link" href="#la-s-geom">Geometry</a>
        <a className="sb-link" href="#quiz-la-s-geom">Quiz</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Linear Algebra · Part 1 of 2</div>
          <h1 className="ch-title">Singular Value Decomposition</h1>
          <p className="ch-sub">The most useful matrix factorization — definition and basic properties</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <section className="section" id="la-s-intro">
          <div className="sec-badge">Section 6.1</div>
          <h2 className="sec-title">Definition of the SVD</h2>
          <p>
            {"Every $m\\times n$ matrix A (real or complex) admits a factorization $A = U\\Sigma V^T$ where U and V are orthogonal (or unitary) and $\\Sigma$ is diagonal with nonnegative entries — the singular values."}
          </p>
          <TheoryBox title="A = UΣVᵀ">
            <p>
              {"The diagonal entries of $\\Sigma$ are the singular values $\\sigma_1 \\ge \\sigma_2 \\ge \\cdots \\ge 0$. The columns of V are the right singular vectors; the columns of U are the left singular vectors. Singular values are the square roots of the eigenvalues of $A^TA$ (or $AA^T$)."}
            </p>
          </TheoryBox>
          <TheoremBox title="Existence">
            <p>
              {"Unlike the eigenvalue decomposition, the SVD exists for every matrix, square or rectangular, singular or full-rank."}
            </p>
          </TheoremBox>
          <RealLifeUse>{"Netflix and Spotify recommendation engines run SVD on a giant user-by-item ratings matrix to compress millions of preferences into a handful of underlying 'taste' dimensions."}</RealLifeUse>
        </section>

        <section className="section" id="la-s-proc1">
          <div className="sec-badge">Procedure</div>
          <h2 className="sec-title">How to find singular values</h2>
          <ProcedureBox
            title="Computing singular values (small cases)"
            steps={[
              { text: "Form $A^TA$ (or $AA^T$, whichever is smaller).", why: "Singular values are square roots of its eigenvalues." },
              { text: "Find the eigenvalues of that symmetric positive-semidefinite matrix.", why: "They are real and nonnegative." },
              { text: "Take square roots to obtain the singular values.", why: "By definition $\\sigma_i = \\sqrt{\\lambda_i(A^TA)}$." },
              { text: "The corresponding eigenvectors of $A^TA$ become the right singular vectors (columns of V).", why: "This completes the thin SVD." }
            ]}
          />
        </section>

        <section className="section" id="la-s-ex-p1">
          <div className="sec-badge">Large examples</div>
          <h2 className="sec-title">Four detailed worked examples</h2>

          <WorkedExample
            number={1}
            title="Singular values of a diagonal matrix"
            setup={"Find the SVD of $A=\\begin{pmatrix}4&0\\\\0&-3\\end{pmatrix}$."}
            steps={[
              { text: "$A^TA=\\begin{pmatrix}16&0\\\\0&9\\end{pmatrix}$, already diagonal, so its eigenvalues are $16,9$.", why: "Needed to find singular values." },
              { text: "Singular values: $\\sigma_1=\\sqrt{16}=4$, $\\sigma_2=\\sqrt9=3$.", why: "Singular values are square roots of $A^TA$'s eigenvalues." },
              { text: "$V=I$ (eigenvectors already standard basis); $U$'s columns are $Av_i/\\sigma_i=(1,0),(0,-1)$.", why: "Definition of the left singular vectors." },
              { text: "Check: $U\\Sigma V^T=\\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}\\begin{pmatrix}4&0\\\\0&3\\end{pmatrix}=A$.", why: "Reconstructs the original matrix." },
            ]}
            result={"$\\sigma_1=4,\\ \\sigma_2=3$; $U=\\operatorname{diag}(1,-1)$, $V=I$."}
            check={"Multiplying $U\\Sigma V^T$ back out reproduces $A$ exactly."}
          />
          <WorkedExample
            number={2}
            title="Singular values from A^TA for a rank-deficient matrix"
            setup={"Find the singular values of $A=\\begin{pmatrix}3&0\\\\4&0\\end{pmatrix}$."}
            steps={[
              { text: "$A^TA=\\begin{pmatrix}25&0\\\\0&0\\end{pmatrix}$.", why: "$(3)(3)+(4)(4)=25$; column 2 of $A$ is zero." },
              { text: "Singular values: $\\sigma_1=5$, $\\sigma_2=0$.", why: "Square roots of the eigenvalues $25,0$." },
              { text: "Since $\\sigma_2=0$, $\\operatorname{rank}(A)=1$.", why: "Only one nonzero singular value." },
            ]}
            result={"$\\sigma_1=5,\\ \\sigma_2=0$; $\\operatorname{rank}(A)=1$."}
            check={"$A$'s second column is zero, consistent with a zero singular value and rank $1$."}
          />
          <WorkedExample
            number={3}
            title="Full SVD of a rank-2 matrix"
            setup={"Find the SVD of $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$."}
            steps={[
              { text: "$A^TA=\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$; characteristic polynomial $\\lambda^2-3\\lambda+1=0$.", why: "Trace $=3$, determinant $=1$." },
              { text: "$\\sigma_1=\\sqrt{\\tfrac{3+\\sqrt5}{2}}\\approx1.618$, $\\sigma_2=\\sqrt{\\tfrac{3-\\sqrt5}{2}}\\approx0.618$.", why: "Square roots of the two eigenvalues." },
              { text: "$U$'s columns come from $u_i=Av_i/\\sigma_i$, using the eigenvectors of $A^TA$ as $v_i$.", why: "Definition of left singular vectors." },
              { text: "Check: $\\sigma_1\\sigma_2=\\sqrt{\\lambda_1\\lambda_2}=1=|\\det A|$.", why: "Product of singular values equals $|\\det A|$ for a square matrix." },
            ]}
            result={"$\\sigma_1\\approx1.618,\\ \\sigma_2\\approx0.618$, with $\\sigma_1\\sigma_2=1=|\\det A|$."}
            check={"$\\det A=1(1)-1(0)=1$, matching $\\sigma_1\\sigma_2$."}
          />
          <WorkedExample
            number={4}
            title="Rank-1 approximation via truncated SVD"
            setup={"Given $A=\\begin{pmatrix}2&0\\\\0&1\\end{pmatrix}$ (already in SVD form), find the best rank-1 approximation."}
            steps={[
              { text: "$\\sigma_1=2$, $\\sigma_2=1$, with $U=V=I$.", why: "Diagonal entries are the singular values here." },
              { text: "Eckart–Young: keep only $\\sigma_1$ with its vectors for a rank-1 fit.", why: "The theorem's statement." },
              { text: "$A_1=\\sigma_1u_1v_1^T=\\begin{pmatrix}2&0\\\\0&0\\end{pmatrix}$.", why: "Outer product scaled by the singular value." },
              { text: "Approximation error $\\|A-A_1\\|_F=\\sigma_2=1$.", why: "The Frobenius-norm error equals the largest dropped singular value." },
            ]}
            result={"$A_1=\\begin{pmatrix}2&0\\\\0&0\\end{pmatrix}$, with approximation error $1$."}
            check={"Direct subtraction confirms $\\|A-A_1\\|_F=1=\\sigma_2$."}
          />
        </section>

        <LaMcqSection
          id="quiz-la-s-intro"
          badge="Quiz 6.1"
          title="SVD basics"
          scoreId="score-la-s-intro"
          section="la-s-intro"
          questions={[
            {
              prompt: "In $A=U\\Sigma V^T$, the matrix $\\Sigma$ is:",
              options: ["Diagonal with nonnegative entries", "Always the identity", "Skew-symmetric"],
              answer: "A",
              explanation: "Singular values sit on the diagonal and are ≥ 0.",
            },
            {
              prompt: "Singular values are the square roots of the eigenvalues of:",
              options: ["$A^TA$", "$A$ itself", "$A^{-1}$"],
              answer: "A",
              explanation: "This is the standard computational definition.",
            },
            {
              prompt: "SVD exists for:",
              options: ["Every m×n matrix", "Only square invertible matrices", "Only symmetric matrices"],
              answer: "A",
              explanation: "Unlike eigendecomposition, SVD is universal.",
            },
            {
              prompt: "The columns of $V$ in $A=U\\Sigma V^T$ are:",
              options: ["Eigenvectors of $A^TA$", "Eigenvectors of $A$", "The rows of $\\Sigma$"],
              answer: "A",
              explanation: "$V$ diagonalizes $A^TA=V\\Sigma^2V^T$.",
            },
          ]}
        />

        <Divider />

        <section className="section" id="la-s-geom">
          <div className="sec-badge">Section 6.2</div>
          <h2 className="sec-title">Geometry of the SVD</h2>
          <TheoryBox title="Stretching the unit sphere">
            <p>
              {"The right singular vectors tell you which directions in the domain are stretched the most. The corresponding singular values are the stretch factors. The left singular vectors give the directions of those stretched axes in the codomain."}
            </p>
          </TheoryBox>
        </section>

        <LaMcqSection
          id="quiz-la-s-geom"
          badge="Quiz 6.2"
          title="Geometry"
          scoreId="score-la-s-geom"
          section="la-s-geom"
          questions={[
            {
              prompt: "The largest singular value measures:",
              options: ["The maximum stretch of the unit sphere", "The determinant", "The trace"],
              answer: "A",
              explanation: "It is the operator 2-norm of A.",
            },
            {
              prompt: "Right singular vectors are eigenvectors of:",
              options: ["$A^TA$", "$AA^T$", "$A+A^T$"],
              answer: "A",
              explanation: "They come from the domain side.",
            },
            {
              prompt: "Left singular vectors are eigenvectors of:",
              options: ["$AA^T$", "$A^TA$", "$A^{-1}$"],
              answer: "A",
              explanation: "$U$ diagonalizes $AA^T=U\\Sigma^2U^T$.",
            },
            {
              prompt: "If all singular values are positive, a square matrix A is:",
              options: ["Invertible", "Singular", "Nilpotent"],
              answer: "A",
              explanation: "Full set of positive singular values means full rank.",
            },
          ]}
        />

        <Divider />
        <section className="section" id="summary1">
          <div className="sec-badge">Reference</div>
          <h2 className="sec-title">Continue</h2>
          <p>
            {"The SVD factors every matrix into orthogonal maps and a simple diagonal stretch. Part 2 develops the major applications."}
          </p>
          <p>
            Use the gold button: <strong>Next: Part 2 — Applications & Low-rank Approximation</strong>.
          </p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default SvdGuide;
