import StudyGuideShell from "../courses/StudyGuideShell";
import "../multivariableCalculus/PartialDerivativesGuide.css";
import { LaMcqSection } from "./LaMcq";
import {
  LA_LE_FORMS_QUIZ,
  LA_LE_GRAPH_QUIZ,
  LA_LE_SYS_QUIZ,
  LA_LE_SOLVE_QUIZ,
} from "../../data/laLinearEquationsQuizzes";
import { TheoryBox, TheoremBox, ProcedureBox, WorkedExample, PracticalTheory, RealLifeUse } from "./LaBlocks";
import LineGraph from "./LineGraph";

function Divider() {
  return <hr className="divider" />;
}

function LinearEquationsGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Linear Equations (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Linear Equations · Part 2</div></div>
          <a className="sb-link" href="#la-le-sys">Systems &amp; the 3 outcomes</a>
          <a className="sb-link" href="#la-le-parallel">Parallel lines</a>
          <a className="sb-link" href="#la-le-sysn">Systems in n variables</a>
          <a className="sb-link" href="#quiz-la-le-sys">Quiz</a>
          <a className="sb-link" href="#la-le-techniques">Elementary techniques</a>
          <a className="sb-link" href="#la-le-worked3">Solve 3 equations</a>
          <a className="sb-link" href="#quiz-la-le-solve">Quiz</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Linear Algebra · Part 2 of 2</div>
            <h1 className="ch-title">Linear Equations</h1>
            <p className="ch-sub">Systems, the three possible outcomes, parallel lines, and how to solve by hand</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <section className="section" id="la-le-sys">
            <div className="sec-badge">Section 0.6</div>
            <h2 className="sec-title">A system of linear equations — three possible outcomes</h2>
            <p>
              {"A "}<strong>system</strong>{" of linear equations is simply a group of two or more linear equations considered together. A solution to the system is a point (or tuple) that satisfies "}<em>every</em>{" equation in the group at once — not just one of them."}
            </p>
            <TheoryBox title="Only three things can happen">
              <p>
                {"Whenever you solve a linear system, there is no ambiguity about the shape of the answer — exactly one of three things happens:"}
              </p>
              <p>
                {"$\\textbf{1. Unique solution}$ — the equations pin down one and only one point. Two non-parallel lines cross at exactly one $(x,y)$."}
              </p>
              <p>
                {"$\\textbf{2. No solution}$ — the equations contradict each other. Two distinct parallel lines never meet, so nothing satisfies both."}
              </p>
              <p>
                {"$\\textbf{3. Infinitely many solutions (indefinite)}$ — the equations agree everywhere. Two equations that describe the same line share every point on it."}
              </p>
            </TheoryBox>

            <div className="le-graph-row">
              <LineGraph
                range={7}
                lines={[
                  { a: 1, b: 1, c: 5, color: "#a0720a" },
                  { a: 1, b: -1, c: 1, color: "#1a3358" },
                ]}
                extraPoints={[{ x: 3, y: 2, color: "#3a5f32", label: "(3, 2)" }]}
                caption={"Case 1 — unique solution: $x+y=5$ and $x-y=1$ cross once, at $(3,2)$."}
              />
              <LineGraph
                range={7}
                lines={[
                  { a: 1, b: 1, c: 2, color: "#a0720a" },
                  { a: 1, b: 1, c: 5, color: "#1a3358" },
                ]}
                caption={"Case 2 — no solution: $x+y=2$ and $x+y=5$ are parallel, so they never meet."}
              />
              <LineGraph
                range={7}
                lines={[
                  { a: 1, b: 1, c: 2, color: "#a0720a" },
                  { a: 2, b: 2, c: 4, color: "#1a3358", dashed: true },
                ]}
                caption={"Case 3 — infinitely many: $x+y=2$ and $2x+2y=4$ trace the exact same line — the navy dashes sit right on top of the gold line."}
              />
            </div>

            <WorkedExample
              number={1}
              title="Classify all three systems above"
              setup={"Confirm each outcome using algebra, not just the picture."}
              steps={[
                { text: "System A: $x+y=5$, $x-y=1$. Add the equations: $2x=6\\Rightarrow x=3$, then $y=2$. One pair works — unique solution.", why: "Solving directly tells you exactly how many pairs satisfy both equations." },
                { text: "System B: $x+y=2$, $x+y=5$. The left sides are identical but the right sides differ — no $(x,y)$ can make both true at once. No solution." },
                { text: "System C: $x+y=2$, $2x+2y=4$. The second equation is exactly $2\\times$ the first, so it carries no new information — every point on $x+y=2$ works. Infinitely many solutions." },
              ]}
              result={"Unique $(3,2)$; none; infinitely many along $x+y=2$."}
              check={"Spot the pattern: same slope + different intercept = no solution; same slope + same intercept = infinitely many; different slope = unique."}
            />
            <RealLifeUse>{"Two pricing plans that cross once tell you the exact break-even point (unique). Two production lines with the same rate but different starting costs never catch up to each other (no solution). Two equivalent recipes scaled differently describe the same mixture (infinitely many)."}</RealLifeUse>
          </section>

          <section className="section" id="la-le-parallel">
            <div className="sec-badge">Section 0.7</div>
            <h2 className="sec-title">Parallel lines, defined by slope and intercept</h2>
            <TheoremBox title="The slope-intercept test">
              <p>
                {"Write both lines as $y=m_1x+b_1$ and $y=m_2x+b_2$."}
              </p>
              <p>
                {"$\\textbf{Parallel, no solution:}$ $m_1=m_2$ and $b_1\\neq b_2$ — same steepness, different height, never touch."}
              </p>
              <p>
                {"$\\textbf{Coincident, infinite solutions:}$ $m_1=m_2$ and $b_1=b_2$ — same line written twice."}
              </p>
              <p>
                {"$\\textbf{Intersecting, unique solution:}$ $m_1\\neq m_2$ — different steepness always forces exactly one crossing."}
              </p>
            </TheoremBox>
            <PracticalTheory title="A division-free test for standard form">
              <p>
                {"For $A_1x+B_1y=C_1$ and $A_2x+B_2y=C_2$, the lines are parallel or coincident exactly when $A_1B_2=A_2B_1$ — this cross-multiplication trick compares slopes without dividing, so it also handles vertical lines cleanly."}
              </p>
            </PracticalTheory>
            <WorkedExample
              number={2}
              title="Are these two lines parallel?"
              setup={"Check $2x+3y=6$ against $4x+6y=5$."}
              steps={[
                { text: "Cross-multiply the coefficients: $A_1B_2=2\\cdot 6=12$ and $A_2B_1=4\\cdot 3=12$." },
                { text: "$A_1B_2=A_2B_1$, so the lines are parallel (or coincident)." },
                { text: "Check whether they coincide by comparing constants: doubling the first equation gives $4x+6y=12$, but the second equation says $4x+6y=5$ — these disagree." },
                { text: "So the lines are parallel and distinct: no solution." },
              ]}
              result={"Parallel, no solution."}
              check={"Same slope ($-2/3$ for both), different y-intercepts ($2$ vs $5/6$)."}
            />
          </section>

          <section className="section" id="la-le-sysn">
            <div className="sec-badge">Section 0.8</div>
            <h2 className="sec-title">Systems of linear equations in n variables</h2>
            <TheoryBox title="Same three outcomes, more room to move">
              <p>
                {"A general linear system of $m$ equations in $n$ unknowns is written compactly as $A\\mathbf{x}=\\mathbf{b}$, where $A$ collects every coefficient, $\\mathbf{x}=(x_1,\\ldots,x_n)$ is the unknown vector, and $\\mathbf{b}$ is the right-hand side. The three possibilities from Section 0.6 still hold exactly: no solution, a unique solution, or infinitely many."}
              </p>
              <p>
                {"Past three variables you can't sketch the picture, but the algebra generalizes perfectly — the same elementary operations from Section 0.9 still decide the outcome, just applied to more equations and more unknowns."}
              </p>
            </TheoryBox>
            <RealLifeUse>{"Balancing a chemical reaction, allocating a budget across many categories, or fitting a model with many features are all n-variable linear systems solved the same way as a 2×2 system — just with more bookkeeping. For the full rank / Gaussian-elimination treatment of larger systems, continue to the dedicated "}<a href="/linear-algebra/systems/1"><strong>Systems of Linear Equations</strong></a>{" guide."}</RealLifeUse>
          </section>

          <LaMcqSection
            id="quiz-la-le-sys"
            badge="Quiz 0.6–0.8"
            title="Systems, parallel lines, and n variables"
            scoreId="score-la-le-sys"
            section="la-le-sys"
            questions={LA_LE_SYS_QUIZ}
          />

          <Divider />

          <section className="section" id="la-le-techniques">
            <div className="sec-badge">Section 0.9</div>
            <h2 className="sec-title">Elementary techniques for solving a system by hand</h2>
            <p>
              {"Three legal moves let you rewrite any system into an easier, equivalent one — same solution set, simpler equations. Every hand-solving method (including the Gaussian elimination used on bigger systems) is built from just these three."}
            </p>
            <ProcedureBox
              title="The three elementary operations"
              steps={[
                { text: "$\\textbf{Interchange two equations.}$ Reordering the equations changes nothing about which points satisfy all of them." },
                { text: "$\\textbf{Multiply an equation by a nonzero constant.}$ Scaling both sides of one equation equally keeps every solution exactly the same — never multiply by $0$, since that erases the equation's information." },
                { text: "$\\textbf{Add (or subtract) a multiple of one equation to another.}$ This is the workhorse move: it lets you cancel a variable out of one equation using another." },
              ]}
            />
            <TheoremBox title="Why these are safe">
              <p>
                {"Each operation is reversible — you could undo it with another elementary operation — so the new system always has "}<em>exactly</em>{" the same solution set as the old one. That is what lets you simplify freely without accidentally inventing or losing solutions."}
              </p>
            </TheoremBox>
          </section>

          <section className="section" id="la-le-worked3">
            <div className="sec-badge">Worked example</div>
            <h2 className="sec-title">Solving a system of three equations</h2>
            <WorkedExample
              number={3}
              title="Solve using interchange, multiply, and add/subtract"
              setup={"$E_1:\\ x+y+z=6$,\\quad $E_2:\\ 2x-y+z=3$,\\quad $E_3:\\ x+2y-z=2$."}
              steps={[
                { text: "$\\textbf{[Add/subtract]}$ Replace $E_2$ with $E_2-2E_1$ to remove $x$: $(2x-y+z)-2(x+y+z)=3-12\\Rightarrow -3y-z=-9$." },
                { text: "$\\textbf{[Multiply]}$ Multiply that new equation by $-1$ (a nonzero constant) to clean up the signs: $3y+z=9$. Call this $E_2'$." },
                { text: "$\\textbf{[Add/subtract]}$ Replace $E_3$ with $E_3-E_1$ to remove $x$: $(x+2y-z)-(x+y+z)=2-6\\Rightarrow y-2z=-4$. Call this $E_3'$." },
                { text: "The system is now two equations in two unknowns: $E_2':\\ 3y+z=9$ and $E_3':\\ y-2z=-4$." },
                { text: "$\\textbf{[Interchange]}$ Swap $E_2'$ and $E_3'$ so the equation with a plain $y$ leads: now $E_3'$ comes first." },
                { text: "$\\textbf{[Multiply + Add/subtract]}$ Multiply $E_3'$ by $3$ to get $3y-6z=-12$, then subtract it from $E_2'$: $(3y+z)-(3y-6z)=9-(-12)\\Rightarrow 7z=21\\Rightarrow z=3$." },
                { text: "Back-substitute into $E_3':\\ y-2(3)=-4\\Rightarrow y=2$." },
                { text: "Back-substitute into $E_1:\\ x+2+3=6\\Rightarrow x=1$." },
              ]}
              result={"Unique solution $(x,y,z)=(1,2,3)$."}
              check={"$1+2+3=6$ ✓, \\quad $2(1)-2+3=3$ ✓, \\quad $1+2(2)-3=2$ ✓ — all three original equations hold."}
              mistake={"Forgetting to apply the same operation to the whole equation — including the right-hand side — is the single most common slip. Whatever you do to the left side of $E_2$, do it to its right side too."}
            />
          </section>

          <LaMcqSection
            id="quiz-la-le-solve"
            badge="Quiz 0.9"
            title="Elementary techniques &amp; solving three equations"
            scoreId="score-la-le-solve"
            section="la-le-solve"
            questions={LA_LE_SOLVE_QUIZ}
          />

          <Divider />

          <section className="section" id="summary2">
            <div className="sec-badge">Reference</div>
            <h2 className="sec-title">Part 2 complete</h2>
            <p>
              {"A system's fate — unique, none, or infinite — is decided by whether its lines cross once, run parallel, or coincide. Three reversible moves (interchange, multiply, add/subtract) are all you ever need to solve one by hand."}
            </p>
            <p>
              {"Ready to scale this up with matrices, rank, and Gaussian elimination? Continue to "}<strong>Vectors &amp; Vector Spaces</strong>{" using the button below, or jump straight to the "}<a href="/linear-algebra/systems/1"><strong>Systems of Linear Equations</strong></a>{" guide for the full elimination workflow."}
            </p>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Linear Equations (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Linear Equations · Part 1</div></div>
        <a className="sb-link" href="#la-le-2var">Two variables</a>
        <a className="sb-link" href="#la-le-3var">Three variables</a>
        <a className="sb-link" href="#la-le-nvar">n variables</a>
        <a className="sb-link" href="#la-le-slope">What is slope?</a>
        <a className="sb-link" href="#quiz-la-le-forms">Quiz</a>
        <a className="sb-link" href="#la-le-graph">Graphing &amp; intercepts</a>
        <a className="sb-link" href="#quiz-la-le-graph">Quiz</a>
        <a className="sb-link" href="#la-le-elementary">What makes it "linear"</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Linear Algebra · Part 1 of 2</div>
          <h1 className="ch-title">Linear Equations</h1>
          <p className="ch-sub">The general form in 2, 3, and n variables — and how to graph one with intercepts</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <section className="section" id="la-le-2var">
          <div className="sec-badge">Section 0.1</div>
          <h2 className="sec-title">General form of a linear equation in two variables</h2>
          <p>
            {"Every course in linear algebra starts in the same place: the humble straight line. Once you can read, write, and graph one confidently, everything that follows — systems, matrices, vector spaces — is just this same idea repeated at scale."}
          </p>
          <TheoryBox title="Standard form">
            <p>
              {"A linear equation in two variables $x$ and $y$ has the general (standard) form $Ax+By=C$, where $A$, $B$, and $C$ are constants and $A$ and $B$ are not both zero. Every pair $(x,y)$ that makes the equation true is a "}<em>solution</em>{"; plotted together, all solutions form a straight line."}
            </p>
            <p>
              {"The same line can also be written in "}<strong>slope-intercept form</strong>{" $y=mx+b$, where $m=-A/B$ is the slope and $b=C/B$ is the y-intercept (when $B\\neq 0$). Standard form is best for systems and elimination; slope-intercept form is best for graphing quickly."}
            </p>
          </TheoryBox>
          <TheoremBox title="What makes it 'linear'">
            <p>
              {"Every variable appears to the first power only, there are no products like $xy$, and no variable sits inside a root, denominator, or exponent. That is exactly why the graph is a straight line — no curves, no bends."}
            </p>
          </TheoremBox>
          <RealLifeUse>{"A flat-rate taxi fare (base fee plus per-mile charge), a phone plan (fixed fee plus per-minute cost), and simple unit conversions are all everyday linear equations in two variables."}</RealLifeUse>
          <WorkedExample
            number={1}
            title="Convert to slope-intercept form"
            setup={"Rewrite $3x-2y=6$ as $y=mx+b$ and identify the slope and y-intercept."}
            steps={[
              { text: "Isolate the $y$-term: $-2y=6-3x$." },
              { text: "Divide every term by $-2$: $y=\\dfrac{6-3x}{-2}=\\dfrac{3}{2}x-3$." },
              { text: "Compare to $y=mx+b$: slope $m=\\dfrac{3}{2}$, y-intercept $b=-3$." },
            ]}
            result={"$y=\\tfrac{3}{2}x-3$, with slope $\\tfrac{3}{2}$ and y-intercept $-3$."}
            check={"Plug $x=0$ back into the original: $3(0)-2y=6\\Rightarrow y=-3$. Matches $b$."}
          />
        </section>

        <section className="section" id="la-le-3var">
          <div className="sec-badge">Section 0.2</div>
          <h2 className="sec-title">General form in three variables</h2>
          <TheoryBox title="Standard form in 3D">
            <p>
              {"Add one more variable and the pattern extends exactly as you'd expect: $Ax+By+Cz=D$, with $A$, $B$, $C$ not all zero. A solution is now a triple $(x,y,z)$, and the full solution set is no longer a line — it's a flat "}<strong>plane</strong>{" floating in three-dimensional space $\\mathbb{R}^3$."}
            </p>
          </TheoryBox>
          <WorkedExample
            number={2}
            title="Find all three axis intercepts of a plane"
            setup={"For $2x-y+3z=6$, find where the plane crosses each axis."}
            steps={[
              { text: "x-intercept: set $y=0,\\ z=0$: $2x=6\\Rightarrow x=3$. Point $(3,0,0)$." },
              { text: "y-intercept: set $x=0,\\ z=0$: $-y=6\\Rightarrow y=-6$. Point $(0,-6,0)$." },
              { text: "z-intercept: set $x=0,\\ y=0$: $3z=6\\Rightarrow z=2$. Point $(0,0,2)$." },
              { text: "These three points alone are enough to pin down the whole plane — a nice 3D echo of using two intercepts to pin down a line." },
            ]}
            result={"Axis intercepts: $(3,0,0)$, $(0,-6,0)$, $(0,0,2)$."}
            check={"Each point satisfies the original equation on its own, e.g. $2(3)-0+3(0)=6$."}
          />
          <RealLifeUse>{"A recipe that must hit an exact total weight using three ingredients, or a company splitting one budget across three departments, both trace out a plane of valid combinations."}</RealLifeUse>
        </section>

        <section className="section" id="la-le-nvar">
          <div className="sec-badge">Section 0.3</div>
          <h2 className="sec-title">General form in n variables</h2>
          <TheoryBox title="The pattern keeps going">
            <p>
              {"With $n$ unknowns $x_1,x_2,\\ldots,x_n$, the general linear equation is $a_1x_1+a_2x_2+\\cdots+a_nx_n=b$ — or, compactly, $\\mathbf{a}\\cdot\\mathbf{x}=b$, the dot product of a coefficient vector with the unknown vector."}
            </p>
          </TheoryBox>
          <TheoremBox title="Line, plane, hyperplane — one idea">
            <p>
              {"$2$ variables $\\Rightarrow$ a line in $\\mathbb{R}^2$. $3$ variables $\\Rightarrow$ a plane in $\\mathbb{R}^3$. $n$ variables $\\Rightarrow$ a "}<strong>hyperplane</strong>{" in $\\mathbb{R}^n$. In every case, one linear equation removes exactly one degree of freedom from the space it lives in."}
            </p>
          </TheoremBox>
          <RealLifeUse>{"A nutrition constraint balancing dozens of ingredients, or the weighted sum $\\mathbf{w}\\cdot\\mathbf{x}=b$ inside a single artificial neuron, are both linear equations in $n$ variables — the exact same object you just met in 2D and 3D, just with more coordinates."}</RealLifeUse>
        </section>

        <section className="section" id="la-le-slope">
          <div className="sec-badge">Concept spotlight</div>
          <h2 className="sec-title">What is slope? From 2D to n dimensions</h2>
          <p>
            {"Before graphing, it's worth pausing on one plain-English question: what does "}<strong>slope</strong>{" actually mean — and what happens to that idea once you have more than two variables?"}
          </p>
          <TheoryBox title="Slope in 2D: how steep is the line?">
            <p>
              {"Slope answers a simple question: "}<strong>if I move 1 step to the right, how many steps up (or down) does the line go?</strong>{" That's it — it's a measure of steepness, nothing more."}
            </p>
            <p>
              {"It's usually written as \"rise over run\": $m=\\dfrac{\\text{rise}}{\\text{run}}=\\dfrac{\\Delta y}{\\Delta x}$. A slope of $2$ means every $1$ step right takes you $2$ steps up — a steep line. A slope of $\\tfrac{1}{2}$ means it barely climbs. A negative slope means it goes downhill instead."}
            </p>
            <p>
              {"In two variables, one number is enough to describe the tilt because there's only one direction to walk in: along the $x$-axis."}
            </p>
          </TheoryBox>
          <TheoremBox title="Why one number isn't enough anymore">
            <p>
              {"With three variables you're no longer looking at a line — you're looking at a flat plane. On a plane, you can walk in the $x$ direction, the $y$ direction, or anywhere in between, and the plane can tilt differently each way. One single number can't capture all of that at once."}
            </p>
            <p>
              {"So instead of one slope, you get "}<em>one steepness number per variable</em>{" — how much the equation's value changes for each variable, one at a time."}
            </p>
          </TheoremBox>
          <TheoryBox title="Slope in n dimensions, in plain terms">
            <p>
              {"Look back at the general form from Section 0.3: $a_1x_1+a_2x_2+\\cdots+a_nx_n=b$. Each coefficient $a_i$ is answering the exact same question the 2D slope did, just for its own variable: "}<strong>{"\"if I nudge $x_i$ up by 1 and leave every other variable alone, how much does the total change?\""}</strong>
            </p>
            <p>
              {"So 'slope' in $n$ variables isn't one number anymore — it's the whole list of coefficients $(a_1,a_2,\\ldots,a_n)$, one steepness value per variable. Nothing new is being invented here; it's the same rise-over-run idea, just written down once for every direction instead of squeezed into a single ratio."}
            </p>
          </TheoryBox>
          <WorkedExample
            number={"2.5"}
            title="Read the 'slope' straight off the coefficients"
            setup={"For $2x+3y-z=10$, what does each coefficient tell you?"}
            steps={[
              { text: "Coefficient of $x$ is $2$: increasing $x$ by $1$ (holding $y,z$ fixed) increases the total by $2$." },
              { text: "Coefficient of $y$ is $3$: increasing $y$ by $1$ increases the total by $3$ — steeper than the $x$ direction." },
              { text: "Coefficient of $z$ is $-1$: increasing $z$ by $1$ decreases the total by $1$ — that direction slopes downward." },
              { text: "Compare to plain 2D slope: this is exactly the same reading you'd give $m$ in $y=mx+b$ — just done three times instead of once." },
            ]}
            result={"The coefficient list $(2,3,-1)$ is the slope here — one steepness value per variable."}
            check={"Set two of the three variables' changes to $0$ and you're back to a plain single-variable slope, exactly like the 2D case."}
          />
          <RealLifeUse>{"Think of a hiking trail app estimating your fatigue from distance, elevation gain, and pack weight. Each factor gets its own 'slope' — maybe every extra kilogram of pack weight tires you out as much as an extra 100 meters of elevation. That per-variable steepness is precisely the idea above, just with everyday units instead of $x_1,\\ldots,x_n$."}</RealLifeUse>
        </section>

        <LaMcqSection
          id="quiz-la-le-forms"
          badge="Quiz 0.1–0.3"
          title="General form: 2, 3, and n variables"
          scoreId="score-la-le-forms"
          section="la-le-forms"
          questions={LA_LE_FORMS_QUIZ}
        />

        <Divider />

        <section className="section" id="la-le-graph">
          <div className="sec-badge">Section 0.4</div>
          <h2 className="sec-title">Graphing a line using its intercepts</h2>
          <p>
            {"You don't need a table of ten points to graph a line — you only ever need two. The fastest, most reliable pair to use is the pair a line hands you for free: where it crosses each axis."}
          </p>
          <ProcedureBox
            title="How to graph Ax+By=C using intercepts"
            steps={[
              { text: "Find the $x$-intercept: set $y=0$ and solve for $x$. This gives the point $(x,0)$." },
              { text: "Find the $y$-intercept: set $x=0$ and solve for $y$. This gives the point $(0,y)$." },
              { text: "Plot both points on the axes." },
              { text: "Draw one straight line through them, extending it in both directions with arrows." },
              { text: "Check your work: pick a third, easy point on the line and confirm it satisfies the original equation." },
            ]}
          />

          <div className="le-graph-row">
            <LineGraph
              range={6}
              lines={[{ a: 2, b: 3, c: 6, color: "#a0720a", showIntercepts: true }]}
              caption={"$2x+3y=6$ — x-intercept $(3,0)$, y-intercept $(0,2)$."}
            />
            <LineGraph
              range={6}
              lines={[{ a: 1, b: -1, c: 4, color: "#1a3358", showIntercepts: true }]}
              caption={"$x-y=4$ — x-intercept $(4,0)$, y-intercept $(0,-4)$."}
            />
            <LineGraph
              range={6}
              lines={[{ a: 4, b: 0, c: 20, color: "#3a5f32", showIntercepts: true }]}
              caption={"$4x=20$ — a vertical line through $(5,0)$; no y-intercept."}
            />
          </div>

          <WorkedExample
            number={3}
            title="Graph 2x + 3y = 6 by intercepts"
            setup={"Use the procedure above, step by step."}
            steps={[
              { text: "x-intercept: set $y=0$: $2x=6\\Rightarrow x=3$. Point $(3,0)$." },
              { text: "y-intercept: set $x=0$: $3y=6\\Rightarrow y=2$. Point $(0,2)$." },
              { text: "Plot $(3,0)$ and $(0,2)$, then draw the line through them (see the first graph above)." },
              { text: "Check with a third point: does $(6,-2)$ lie on the line? $2(6)+3(-2)=12-6=6$ ✓." },
            ]}
            result={"Line through $(3,0)$ and $(0,2)$, slope $-\\tfrac{2}{3}$."}
            check={"A third point off the two intercepts still satisfies the equation."}
          />
          <WorkedExample
            number={4}
            title="Graph a vertical line: 4x = 20"
            setup={"Notice there is no $y$ term at all."}
            steps={[
              { text: "Solve directly: $4x=20\\Rightarrow x=5$." },
              { text: "Because $y$ never appears, every value of $y$ satisfies the equation as long as $x=5$." },
              { text: "The graph is a vertical line through $x=5$, with only an x-intercept — it never touches the y-axis." },
            ]}
            result={"Vertical line $x=5$."}
            check={"Points $(5,0)$, $(5,3)$, $(5,-7)$ all satisfy $4x=20$."}
            mistake={"Trying to compute a slope for a vertical line — the slope is undefined ($\\Delta x=0$), not zero."}
          />
        </section>

        <LaMcqSection
          id="quiz-la-le-graph"
          badge="Quiz 0.4"
          title="Graphing with x- and y-intercepts"
          scoreId="score-la-le-graph"
          section="la-le-graph"
          questions={LA_LE_GRAPH_QUIZ}
        />

        <Divider />

        <section className="section" id="la-le-elementary">
          <div className="sec-badge">Section 0.5</div>
          <h2 className="sec-title">What makes an equation "linear" (elementary)?</h2>
          <TheoryBox title="The checklist">
            <p>
              {"An equation is linear — sometimes called an "}<em>elementary</em>{" equation in this context — exactly when every variable appears alone, raised to the first power, multiplied only by a constant, and never multiplied by another variable. That checklist is what guarantees the graph is always straight: a line, a plane, or a hyperplane, never a curve."}
            </p>
            <p>
              {"Compare $2x-3y=7$ (linear — straight line) with $xy=4$ or $x^2+y=1$ (both nonlinear — curves, not lines)."}
            </p>
          </TheoryBox>
          <PracticalTheory title="Why this matters next">
            <p>
              {"A single linear equation is already useful, but real problems almost always hand you several constraints at once — a budget "}<em>and</em>{" a time limit, a recipe "}<em>and</em>{" a weight target. Combine several linear equations and you get a "}<strong>system</strong>{" — and that's where Part 2 picks up: the three things that can happen when equations are solved together, and the exact toolkit for solving them by hand."}
            </p>
          </PracticalTheory>
        </section>

        <Divider />

        <section className="section" id="summary1">
          <div className="sec-badge">Reference</div>
          <h2 className="sec-title">Part 1 complete</h2>
          <p>
            {"A linear equation's standard form scales cleanly from two variables to three to $n$: $Ax+By=C$, $Ax+By+Cz=D$, $a_1x_1+\\cdots+a_nx_n=b$. Two intercepts are all you need to graph one."}
          </p>
          <p>
            Use the gold button below: <strong>Next: Part 2 — Systems, parallel lines, and solving techniques</strong>.
          </p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default LinearEquationsGuide;
