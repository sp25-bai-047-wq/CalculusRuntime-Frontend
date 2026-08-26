import { Link } from "react-router-dom";
import StudyGuideShell from "../courses/StudyGuideShell";
import "../multivariableCalculus/PartialDerivativesGuide.css";
import { LaMcqSection } from "./LaMcq";
import { TheoryBox, TheoremBox, ProcedureBox, WorkedExample, PracticalTheory, RealLifeUse } from "./LaBlocks";

function Divider() {
  return <hr className="divider" />;
}

function TransformGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Linear Transformations (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Transform · Part 2</div></div>
          <a className="sb-link" href="#la-t-matrix">Matrix Representation</a>
          <a className="sb-link" href="#la-t-proc2">Method</a>
          <a className="sb-link" href="#la-t-ex-p2">Examples</a>
          <a className="sb-link" href="#quiz-la-t-matrix">Quiz</a>
          <a className="sb-link" href="#la-t-apps">Applications</a>
          <a className="sb-link" href="#quiz-la-t-apps">Quiz</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Linear Algebra · Part 2 of 2</div>
            <h1 className="ch-title">Linear Transformations</h1>
            <p className="ch-sub">Matrix representation, composition, invertibility, and applications</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <section className="section" id="la-t-matrix">
            <div className="sec-badge">Section 4.3</div>
            <h2 className="sec-title">Matrix representation — deep theory</h2>
            <p>
              {"Every linear transformation between finite-dimensional spaces can be captured by a single matrix: once you know where the transformation sends a basis, you know where it sends every vector. Composition, invertibility, and area/volume scaling all become questions about that matrix."}
            </p>
            <TheoryBox title="Standard matrix from basis images">
              <p>
                {"For $T:\\mathbb{R}^n\\to\\mathbb{R}^m$, the standard matrix $A$ has $T(e_1),\\ldots,T(e_n)$ as its columns, in order. Then $T(x)=Ax$ for every $x$, because $x=\\sum x_ie_i$ and linearity distributes $T$ across the sum."}
              </p>
              <p>
                {"Relative to a non-standard basis $B=\\{b_1,\\ldots,b_n\\}$, the matrix $[T]_B$ instead has the $B$-coordinates of $T(b_i)$ as its columns. If $B$ happens to be an eigenbasis of the standard matrix, $[T]_B$ comes out diagonal."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Composition and inversion stay matrix operations">
              <p>
                {"Composing transformations corresponds exactly to multiplying their matrices in the same order: $[S\\circ T]=[S][T]$. A transformation is invertible exactly when its matrix is invertible, and $[T^{-1}]=[T]^{-1}$."}
              </p>
            </PracticalTheory>
            <TheoremBox title="Determinant scales area and volume">
              <p>
                {"For $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ or $\\mathbb{R}^3\\to\\mathbb{R}^3$, the absolute value of the determinant of the standard matrix is exactly the factor by which $T$ scales area or volume. A negative determinant additionally signals an orientation flip (a reflection is mixed in)."}
              </p>
            </TheoremBox>
            <RealLifeUse>{"Every rotation, scale, or skew you see in a graphics engine, CAD tool, or game physics update is a standard matrix applied to each vertex; composing camera, model, and projection matrices is exactly composing linear transformations."}</RealLifeUse>
            <TheoryBox title="Change of basis bonus">
              <p>
                {"If $P$'s columns are the basis $B$ written in standard coordinates, then $[T]_B=P^{-1}AP$ where $A$ is the standard matrix. This is the same similarity relationship used in diagonalization — a transformation's matrix looks different in different bases, but the transformation itself does not change."}
              </p>
            </TheoryBox>
          </section>

          <section className="section" id="la-t-proc2">
            <div className="sec-badge">Procedure</div>
            <h2 className="sec-title">How to compose and invert transformations</h2>
            <ProcedureBox
              title="Composing and inverting linear transformations"
              steps={[
                { text: "Write down the standard matrices $[S]$ and $[T]$ for each transformation.", why: "Every linear map is fully described by its standard matrix." },
                { text: "For $S\\circ T$ (apply $T$ first, then $S$), multiply the matrices in that order: $[S][T]$.", why: "Composition order matches matrix multiplication order." },
                { text: "To invert $T$, check $\\det([T])\\neq0$ first.", why: "A zero determinant means the matrix — and the transformation — is not invertible." },
                { text: "If invertible, compute $[T]^{-1}$ using the standard inverse formula (or row reduction for larger matrices).", why: "The inverse matrix represents the inverse transformation." },
                { text: "Verify by checking $[T][T]^{-1}=I$ on at least one nontrivial vector.", why: "A quick numeric check catches arithmetic slips." },
                { text: "For area/volume scaling, compute $|\\det([T])|$ directly from the standard matrix.", why: "The determinant's absolute value is the geometric scaling factor." },
              ]}
            />
          </section>

          <section className="section" id="la-t-ex-p2">
            <div className="sec-badge">Large examples</div>
            <h2 className="sec-title">Four detailed worked examples</h2>

            <WorkedExample
              number={1}
              title="Reflection matrix across a line through the origin"
              setup={"Find the matrix of reflection across the line $y=x$, and use it to reflect $(3,5)$."}
              steps={[
                { text: "Reflection across $y=x$ swaps coordinates: $T(x,y)=(y,x)$.", why: "Geometric definition of this reflection." },
                { text: "$T(1,0)=(0,1)$ and $T(0,1)=(1,0)$.", why: "Apply to standard basis vectors." },
                { text: "Standard matrix: $A=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$.", why: "Images become columns." },
                { text: "Apply to $(3,5)$: $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}\\begin{pmatrix}3\\\\5\\end{pmatrix}=\\begin{pmatrix}5\\\\3\\end{pmatrix}$.", why: "Direct multiplication." },
                { text: "Check $A^2=I$, since reflecting twice returns the original point.", why: "Reflections are self-inverse." },
              ]}
              result={"$A=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$, and the reflection of $(3,5)$ is $(5,3)$."}
              check={"$A^2=I$, as expected for any reflection."}
            />
            <WorkedExample
              number={2}
              title="Matrix of a transformation in a non-standard basis"
              setup={"$T(x,y)=(2x+y,\\,x+2y)$. Find the matrix of $T$ relative to the basis $B=\\{(1,1),(1,-1)\\}$."}
              steps={[
                { text: "$T(1,1)=(3,3)=3(1,1)+0(1,-1)$, so the first column of $[T]_B$ is $(3,0)$.", why: "Convert the output back into $B$-coordinates, not standard coordinates." },
                { text: "$T(1,-1)=(1,-1)=0(1,1)+1(1,-1)$, so the second column is $(0,1)$.", why: "Same conversion for the second basis vector." },
                { text: "$[T]_B=\\begin{pmatrix}3&0\\\\0&1\\end{pmatrix}$, diagonal in this basis.", why: "Assemble the two columns." },
                { text: "This works because $(1,1)$ and $(1,-1)$ are eigenvectors of $T$'s standard matrix, with eigenvalues $3,1$.", why: "Diagonal representation happens exactly in an eigenbasis." },
              ]}
              result={"$[T]_B=\\begin{pmatrix}3&0\\\\0&1\\end{pmatrix}$."}
              check={"The standard matrix $\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$ has eigenvalues $3,1$, matching the diagonal entries."}
            />
            <WorkedExample
              number={3}
              title="Inverse of a linear transformation"
              setup={"$T(x,y)=(2x+3y,\\,x+2y)$. Determine whether $T$ is invertible, and if so, find $T^{-1}$."}
              steps={[
                { text: "Standard matrix $A=\\begin{pmatrix}2&3\\\\1&2\\end{pmatrix}$; $\\det A=2(2)-3(1)=1\\neq0$.", why: "Nonzero determinant means $A$ is invertible." },
                { text: "$A^{-1}=\\dfrac{1}{\\det A}\\begin{pmatrix}2&-3\\\\-1&2\\end{pmatrix}=\\begin{pmatrix}2&-3\\\\-1&2\\end{pmatrix}$.", why: "$2\\times2$ inverse formula, with $\\det A=1$." },
                { text: "So $T^{-1}(x,y)=(2x-3y,\\,-x+2y)$.", why: "Translate the inverse matrix back into a formula." },
                { text: "Check: $T(T^{-1}(x,y))=(x,y)$ after expanding both components.", why: "Composition with the inverse must return the identity." },
              ]}
              result={"$T$ is invertible; $T^{-1}(x,y)=(2x-3y,\\,-x+2y)$."}
              check={"$T(T^{-1}(x,y))=(x,y)$ for all $x,y$."}
            />
            <WorkedExample
              number={4}
              title="Area scaling of the unit square"
              setup={"Find how the linear transformation with matrix $A=\\begin{pmatrix}3&1\\\\1&2\\end{pmatrix}$ scales area."}
              steps={[
                { text: "$T(0,0)=(0,0)$, $T(1,0)=(3,1)$, $T(0,1)=(1,2)$, $T(1,1)=(4,3)$.", why: "Apply $A$ to each corner of the unit square." },
                { text: "The image is a parallelogram with sides along $(3,1)$ and $(1,2)$.", why: "Linear maps send the unit square to a parallelogram." },
                { text: "$\\det A=3(2)-1(1)=5$.", why: "$2\\times2$ determinant formula." },
                { text: "So the unit square (area $1$) maps to a parallelogram of area $5$.", why: "Area scaling factor equals $|\\det A|$." },
              ]}
              result={"Area scaling factor is $|\\det A|=5$."}
              check={"The shoelace formula on the transformed vertices independently gives area $5$."}
            />
          </section>

          <LaMcqSection
            id="quiz-la-t-matrix"
            badge="Quiz 4.3"
            title="Matrix representation"
            scoreId="score-la-t-matrix"
            section="la-t-matrix"
            questions={[
              {
                prompt: "If $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ sends $e_1=(1,0)\\mapsto(2,3)$ and $e_2=(0,1)\\mapsto(-1,4)$, the standard matrix of $T$ is:",
                options: ["$\\begin{pmatrix}2&-1\\\\3&4\\end{pmatrix}$", "$\\begin{pmatrix}2&3\\\\-1&4\\end{pmatrix}$", "$\\begin{pmatrix}3&4\\\\2&-1\\end{pmatrix}$"],
                answer: "A",
                explanation: "Images of the standard basis vectors become the columns of the matrix, in order.",
              },
              {
                prompt: "Composing two linear transformations $S\\circ T$ corresponds to matrix operation:",
                options: ["Matrix multiplication $[S][T]$", "Matrix addition $[S]+[T]$", "Entrywise product of $[S]$ and $[T]$"],
                answer: "A",
                explanation: "Applying $T$ then $S$ matches multiplying the standard matrices in that order.",
              },
              {
                prompt: "A linear transformation $T:\\mathbb{R}^n\\to\\mathbb{R}^n$ is invertible iff:",
                options: ["Its standard matrix is invertible (nonzero determinant)", "It fixes the origin", "It is a rotation"],
                answer: "A",
                explanation: "Invertibility of $T$ matches invertibility of its matrix representation.",
              },
              {
                prompt: "Two linear transformations with the same matrix relative to a fixed basis must:",
                options: ["Act identically on every vector", "Only agree on the basis vectors", "Have different kernels"],
                answer: "A",
                explanation: "A transformation is completely determined by where it sends a basis.",
              },
            ]}
          />

          <Divider />

          <section className="section" id="la-t-apps">
            <div className="sec-badge">Section 4.4</div>
            <h2 className="sec-title">Applications — deep theory</h2>
            <TheoryBox title="Rotations, reflections, projections, shears">
              <p>
                {"Rotation by $\\theta$: $\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}$. Reflection across the $x$-axis negates $y$ only. Projection onto the $x$-axis keeps $x$ and zeroes $y$. A shear $\\begin{pmatrix}1&k\\\\0&1\\end{pmatrix}$ slants shapes while always preserving area, since $\\det=1$ for every $k$."}
              </p>
              <p>
                {"A linear map $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is onto exactly when its matrix has rank $2$ — its columns span the whole plane. A map $\\mathbb{R}^2\\to\\mathbb{R}^3$ can never be onto $\\mathbb{R}^3$, since the image can have dimension at most $2$."}
              </p>
            </TheoryBox>
            <TheoremBox title="Graphics pipelines are composed transformations">
              <p>
                {"A 3D object rendered on screen typically passes through a model matrix, a view (camera) matrix, and a projection matrix, applied in sequence — exactly a composition of linear (or affine) transformations, computed once per frame as a single combined matrix for speed."}
              </p>
            </TheoremBox>
          </section>

          <LaMcqSection
            id="quiz-la-t-apps"
            badge="Quiz 4.4"
            title="Applications"
            scoreId="score-la-t-apps"
            section="la-t-apps"
            questions={[
              {
                prompt: "The matrix $\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}$ represents:",
                options: ["A rotation by angle $\\theta$", "A reflection across the $x$-axis", "A projection onto the $x$-axis"],
                answer: "A",
                explanation: "This is the standard counterclockwise rotation matrix.",
              },
              {
                prompt: "The matrix $\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$ represents:",
                options: ["Projection onto the $x$-axis", "Reflection across the $y$-axis", "A $90^\\circ$ rotation"],
                answer: "A",
                explanation: "It keeps the $x$-component and zeroes the $y$-component.",
              },
              {
                prompt: "If $T$ is a shear transformation given by $\\begin{pmatrix}1&k\\\\0&1\\end{pmatrix}$, then $\\det(T)$ is:",
                options: ["$1$", "$k$", "$0$"],
                answer: "A",
                explanation: "Shear matrices always have determinant $1$, so they preserve area.",
              },
              {
                prompt: "If $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is onto (surjective), then its standard matrix must have:",
                options: ["Rank $2$", "Rank $0$", "A zero row"],
                answer: "A",
                explanation: "Surjectivity onto $\\mathbb{R}^2$ requires the columns to span $\\mathbb{R}^2$, i.e. full rank $2$.",
              },
            ]}
          />

          <Divider />
          <section className="section" id="summary">
            <div className="sec-badge">Reference</div>
            <h2 className="sec-title">Module complete</h2>
            <p>
              {"Every linear transformation reduces to a matrix: composition becomes multiplication, invertibility becomes a determinant check, and geometric scaling reads straight off that determinant."}
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
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Linear Transformations (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Transform · Part 1</div></div>
        <a className="sb-link" href="#la-t-intro">Definition & Properties</a>
        <a className="sb-link" href="#la-t-proc1">Method</a>
        <a className="sb-link" href="#la-t-ex-p1">Examples</a>
        <a className="sb-link" href="#quiz-la-t-intro">Quiz</a>
        <a className="sb-link" href="#la-t-kernel">Kernel & Range</a>
        <a className="sb-link" href="#quiz-la-t-kernel">Quiz</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Linear Algebra · Part 1 of 2</div>
          <h1 className="ch-title">Linear Transformations</h1>
          <p className="ch-sub">Maps that preserve addition and scaling — theory and calculations</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <section className="section" id="la-t-intro">
          <div className="sec-badge">Section 4.1</div>
          <h2 className="sec-title">Definition & properties — deep theory</h2>
          <p>
            {"A transformation $T$ is linear when it plays nicely with the two basic vector operations: adding vectors and scaling them. That single requirement is powerful enough to force $T$ to be completely determined by a matrix."}
          </p>
          <TheoryBox title="T(u+v) = T(u)+T(v), T(cu) = cT(u)">
            <p>
              {"$T$ is linear iff for all vectors $u,v$ and scalars $c$: $T(u+v)=T(u)+T(v)$ (additivity) and $T(cu)=cT(u)$ (homogeneity). Together these force $T(0)=0$ — a translation like $T(x,y)=(x+1,y)$ is never linear."}
            </p>
            <p>
              {"Because any vector $x$ in $\\mathbb{R}^n$ is a combination $x=\\sum x_ie_i$ of the standard basis, linearity means $T(x)=\\sum x_iT(e_i)$. So $T$ is completely pinned down once you know where it sends each basis vector."}
            </p>
          </TheoryBox>
          <TheoremBox title="Determined by a basis">
            <p>
              {"If two linear transformations agree on every vector of a basis, they agree everywhere — there is no freedom left. This is why the standard matrix (built from images of the standard basis) captures $T$ completely."}
            </p>
          </TheoremBox>
          <RealLifeUse>{"Computer graphics engines store every rotation, scale, or skew of a 2D/3D object as exactly this kind of standard matrix, applied to each vertex — nothing more than linearity in action."}</RealLifeUse>
        </section>

        <section className="section" id="la-t-proc1">
          <div className="sec-badge">Procedure</div>
          <h2 className="sec-title">How to find the standard matrix of a transformation</h2>
          <ProcedureBox
            title="How to build the standard matrix of T"
            steps={[
              { text: "Apply $T$ to each standard basis vector $e_1,\\ldots,e_n$ in turn.", why: "Linearity means the images of the basis vectors determine T everywhere." },
              { text: "Place $T(e_1),\\ldots,T(e_n)$ as the columns of a matrix $A$, in order.", why: "This is exactly how the standard matrix is defined." },
              { text: "For any input $x$, compute $T(x)=Ax$ by ordinary matrix-vector multiplication.", why: "Linearity guarantees this reproduces T exactly." },
              { text: "Double-check on a vector that is not a basis vector, by comparing $Ax$ to a direct application of the transformation's rule.", why: "A quick numeric check catches sign or ordering slips." },
              { text: "If $T$ is described geometrically (rotation, reflection, projection, shear), recall or derive the standard matrix pattern for that geometric map.", why: "Common geometric transformations have well-known standard matrices." },
            ]}
          />
        </section>

        <section className="section" id="la-t-ex-p1">
          <div className="sec-badge">Large examples</div>
          <h2 className="sec-title">Four detailed worked examples</h2>

          <WorkedExample
            number={1}
            title="Standard matrix from images of basis vectors"
            setup={"$T:\\mathbb{R}^2\\to\\mathbb{R}^2$ sends $(1,0)\\mapsto(3,1)$ and $(0,1)\\mapsto(-2,4)$. Find the standard matrix and $T(5,2)$."}
            steps={[
              { text: "The standard matrix has $T(e_1)$ and $T(e_2)$ as its columns.", why: "Every linear map is determined by where it sends the standard basis." },
              { text: "$A=\\begin{pmatrix}3&-2\\\\1&4\\end{pmatrix}$.", why: "Place the images side by side in order." },
              { text: "$T(5,2)=A\\begin{pmatrix}5\\\\2\\end{pmatrix}=\\begin{pmatrix}15-4\\\\5+8\\end{pmatrix}=\\begin{pmatrix}11\\\\13\\end{pmatrix}$.", why: "Multiply row by column." },
              { text: "Check by linearity directly: $5(3,1)+2(-2,4)=(15,5)+(-4,8)=(11,13)$.", why: "Independent verification using linearity directly." },
            ]}
            result={"$A=\\begin{pmatrix}3&-2\\\\1&4\\end{pmatrix}$, $T(5,2)=(11,13)$."}
            check={"Both the matrix method and direct linearity give $(11,13)$."}
          />
          <WorkedExample
            number={2}
            title="Kernel and image of a projection"
            setup={"Find the kernel and image of $T(x,y,z)=(x,y,0)$, the projection onto the $xy$-plane."}
            steps={[
              { text: "Standard matrix: $A=\\begin{pmatrix}1&0&0\\\\0&1&0\\\\0&0&0\\end{pmatrix}$.", why: "Read off coefficients of $x,y,z$ in each output component." },
              { text: "Kernel: solve $Av=0$, i.e. $x=0,\\,y=0$, $z$ free — the $z$-axis.", why: "Definition of the null space." },
              { text: "Image: all outputs $(x,y,0)$ — the $xy$-plane itself.", why: "Third coordinate is always killed." },
              { text: "Rank $=2$, nullity $=1$; check rank–nullity: $2+1=3=\\dim(\\mathbb{R}^3)$.", why: "Domain dimension confirmed." },
            ]}
            result={"$\\ker T=$ the $z$-axis; $\\operatorname{im}T=$ the $xy$-plane; rank $2$, nullity $1$."}
            check={"Rank + nullity $=3$, matching the domain $\\mathbb{R}^3$."}
          />
          <WorkedExample
            number={3}
            title="Composition of two transformations"
            setup={"$T$ rotates by $90^\\circ$ and $S$ scales by $2$ in $x$ and $3$ in $y$. Find the matrix of $S\\circ T$ and apply it to $(1,1)$."}
            steps={[
              { text: "$[T]=\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$, $[S]=\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$.", why: "Standard matrices for rotation and scaling." },
              { text: "$S\\circ T$ means apply $T$ first, so its matrix is $[S][T]=\\begin{pmatrix}0&-2\\\\3&0\\end{pmatrix}$.", why: "Composition order matches matrix multiplication order." },
              { text: "Apply to $(1,1)$: $\\begin{pmatrix}0&-2\\\\3&0\\end{pmatrix}\\begin{pmatrix}1\\\\1\\end{pmatrix}=\\begin{pmatrix}-2\\\\3\\end{pmatrix}$.", why: "Direct multiplication." },
              { text: "Verify step by step: $T(1,1)=(-1,1)$, then $S(-1,1)=(-2,3)$ — matches.", why: "Applying the two maps one at a time should agree." },
            ]}
            result={"$[S\\circ T]=\\begin{pmatrix}0&-2\\\\3&0\\end{pmatrix}$, and $(S\\circ T)(1,1)=(-2,3)$."}
            check={"Applying $T$ then $S$ separately reproduces the same output."}
          />
          <WorkedExample
            number={4}
            title="Determining injectivity and surjectivity"
            setup={"For $T:\\mathbb{R}^3\\to\\mathbb{R}^2$ with matrix $A=\\begin{pmatrix}1&2&1\\\\0&1&1\\end{pmatrix}$, decide whether $T$ is one-to-one and/or onto."}
            steps={[
              { text: "Row reduce $A$: two pivots, so $\\operatorname{rank}(A)=2$.", why: "Find the rank via echelon form." },
              { text: "Nullity $=3-2=1\\neq0$, so $T$ is not one-to-one.", why: "Injectivity requires $\\ker T=\\{0\\}$." },
              { text: "Rank $=2=$ dimension of the codomain, so $T$ is onto.", why: "Full rank means the columns span the codomain." },
              { text: "Concretely, $(1,-1,1)$ solves $Av=0$, confirming a nonzero kernel vector.", why: "Exhibits a specific nonzero kernel vector." },
            ]}
            result={"$T$ is onto but not one-to-one."}
            check={"$A(1,-1,1)^T=(0,0)$, confirming a nonzero kernel vector."}
          />
        </section>

        <LaMcqSection
          id="quiz-la-t-intro"
          badge="Quiz 4.1"
          title="Definition & properties"
          scoreId="score-la-t-intro"
          section="la-t-intro"
          questions={[
            {
              prompt: "A transformation $T$ is linear iff for all vectors $u,v$ and scalars $c$:",
              options: ["$T(u+v)=T(u)+T(v)$ and $T(cu)=cT(u)$", "$T(u+v)=T(u)T(v)$", "$T(0)\\neq 0$ is allowed as long as it is one-to-one"],
              answer: "A",
              explanation: "Additivity and homogeneity define linearity; together they force $T(0)=0$.",
            },
            {
              prompt: "Which map is linear?",
              options: ["$T(x,y)=(x+y,\\,2x)$", "$T(x,y)=(xy,\\,x)$", "$T(x,y)=(x+1,\\,y)$"],
              answer: "A",
              explanation: "Only $T(x,y)=(x+y,2x)$ has no products or added constants.",
            },
            {
              prompt: "The identity transformation $T(v)=v$ has standard matrix:",
              options: ["$I$, the identity matrix", "The zero matrix", "Any orthogonal matrix"],
              answer: "A",
              explanation: "Every basis vector maps to itself, giving the identity matrix's columns.",
            },
          ]}
        />

        <Divider />

        <section className="section" id="la-t-kernel">
          <div className="sec-badge">Section 4.2</div>
          <h2 className="sec-title">Kernel, range & rank–nullity — deep theory</h2>
          <TheoryBox title="Kernel and image">
            <p>
              {"The kernel (null space) of $T$ is $\\ker(T)=\\{v:T(v)=0\\}$ — every input that collapses to zero. The image (range) is the set of all outputs, $\\operatorname{im}(T)=\\{T(v):v\\in\\text{domain}\\}$. Both are always subspaces, of the domain and codomain respectively."}
            </p>
            <p>
              {"$T$ is one-to-one (injective) exactly when $\\ker(T)=\\{0\\}$: no nonzero vector is lost. $T$ is onto (surjective) exactly when $\\operatorname{im}(T)$ fills the entire codomain."}
            </p>
          </TheoryBox>
          <TheoremBox title="Rank–nullity theorem">
            <p>
              {"For $T:\\mathbb{R}^n\\to\\mathbb{R}^m$, $\\operatorname{rank}(T)+\\operatorname{nullity}(T)=n$, where rank is $\\dim(\\operatorname{im} T)$ and nullity is $\\dim(\\ker T)$. This single identity explains why a map from a smaller space to a larger one can never be onto, and why a map from a larger space to a smaller one can never be one-to-one."}
            </p>
          </TheoremBox>
        </section>

        <LaMcqSection
          id="quiz-la-t-kernel"
          badge="Quiz 4.2"
          title="Kernel, range & rank–nullity"
          scoreId="score-la-t-kernel"
          section="la-t-kernel"
          questions={[
            {
              prompt: "The kernel (null space) of a linear transformation $T$ is:",
              options: ["$\\{v: T(v)=0\\}$", "The set of all outputs of $T$", "The set of eigenvectors of $T$"],
              answer: "A",
              explanation: "Kernel is the set of inputs mapped to the zero vector.",
            },
            {
              prompt: "By the rank–nullity theorem, for $T:\\mathbb{R}^n\\to\\mathbb{R}^m$:",
              options: ["$\\operatorname{rank}(T)+\\operatorname{nullity}(T)=n$", "$\\operatorname{rank}(T)-\\operatorname{nullity}(T)=m$", "$\\operatorname{rank}(T)\\cdot\\operatorname{nullity}(T)=n$"],
              answer: "A",
              explanation: "Dimension of the domain splits between the image's dimension and the kernel's dimension.",
            },
            {
              prompt: "A linear transformation $T$ is one-to-one (injective) exactly when:",
              options: ["$\\ker(T)=\\{0\\}$", "$T$ is represented by a square matrix", "The image of $T$ is all of $\\mathbb{R}^m$"],
              answer: "A",
              explanation: "Only the zero vector maps to zero, so distinct inputs give distinct outputs.",
            },
            {
              prompt: "For $T:\\mathbb{R}^3\\to\\mathbb{R}^2$ with a $2\\times3$ standard matrix of rank $2$, the nullity is:",
              options: ["$1$", "$0$", "$2$"],
              answer: "A",
              explanation: "Rank–nullity: $3=\\operatorname{rank}+\\operatorname{nullity}=2+\\operatorname{nullity}$.",
            },
          ]}
        />

        <Divider />
        <section className="section" id="summary1">
          <div className="sec-badge">Reference</div>
          <h2 className="sec-title">Continue</h2>
          <p>
            {"Linearity pins a transformation down to its action on a basis; the kernel and image reveal how much information survives the map. Part 2 assembles all of this into matrix representation, composition, and applications."}
          </p>
          <p>
            Use the gold button: <strong>Next: Part 2 — Matrix representation & invertibility</strong>.
          </p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default TransformGuide;
