/**
 * Objective 18 extended study packs — additive only.
 * Uses existing Partial Derivatives guide CSS classes (section, box, fml, sol, steps).
 * Do not put raw `$` or `\` outside of {"..."} string literals.
 */

export function LimitsExtendedPart1() {
  return (
    <section className="section" id="lc-extended-1">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Multivariable Limits — Strategy Toolbox"}</h2>
      <p>
        {"A limit in two variables exists only when every approach yields the same number. "}
        {"Use path tests to disprove existence, and polar or squeeze arguments to prove it."}
      </p>

      <div className="box def">
        <div className="box-lbl">{"Theory — Formal Definition"}</div>
        <p>
          {"$\\displaystyle\\lim_{(x,y)\\to(a,b)} f(x,y)=L$ means: for every $\\varepsilon>0$ there is $\\delta>0$ such that "}
          {"$0<\\sqrt{(x-a)^2+(y-b)^2}<\\delta$ implies $|f(x,y)-L|<\\varepsilon$."}
        </p>
        <p>
          {"Unlike one variable, “left and right” are replaced by an infinite family of directions and curves."}
        </p>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example — Path Failure"}</div>
        <div className="exm-title">
          {"Show that $\\displaystyle\\lim_{(x,y)\\to(0,0)}\\dfrac{x^2-y^2}{x^2+y^2}$ does not exist."}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <ol className="steps">
            <li>{"Along $y=0$: $f(x,0)=1\\to 1$."}</li>
            <li>{"Along $x=0$: $f(0,y)=-1\\to -1$."}</li>
            <li>{"Different path limits imply the overall limit does not exist."}</li>
          </ol>
        </div>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example — Polar Success"}</div>
        <div className="exm-title">
          {"Evaluate $\\displaystyle\\lim_{(x,y)\\to(0,0)}\\dfrac{x^2 y}{x^2+y^2}$ if it exists."}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Set $x=r\\cos\\theta$, $y=r\\sin\\theta$."}</p>
          <div className="fml">
            {"$$\\left|\\frac{r^2\\cos^2\\theta\\cdot r\\sin\\theta}{r^2}\\right|=|r\\cos^2\\theta\\sin\\theta|\\le |r|\\to 0$$"}
          </div>
          <p>{"The bound goes to $0$ uniformly in $\\theta$, so the limit is $0$."}</p>
        </div>
      </div>

      <div className="box thm">
        <div className="box-lbl">{"Pitfalls"}</div>
        <ul className="steps">
          <li>{"Matching limits on $x$- and $y$-axes alone never prove existence."}</li>
          <li>{"Parabolic paths $y=mx^2$ often catch clever counterexamples that linear paths miss."}</li>
          <li>{"Always state whether you are proving existence or nonexistence."}</li>
        </ul>
      </div>
    </section>
  );
}

export function LimitsExtendedPart2() {
  return (
    <section className="section" id="lc-extended-2">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Continuity in Several Variables"}</h2>
      <p>
        {"Continuity at a point requires three matching pieces: the function is defined, the limit exists, and they agree."}
      </p>

      <div className="box def">
        <div className="box-lbl">{"Theory — Removable vs. Essential Gaps"}</div>
        <p>
          {"If $\\lim_{(x,y)\\to(a,b)} f(x,y)=L$ exists but $f(a,b)$ is missing or wrong, redefine $f(a,b)=L$ to restore continuity "}
          {"(removable discontinuity). If path limits disagree, no redefinition can fix it."}
        </p>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">
          {"Make $g(x,y)=\\dfrac{\\sin(x^2+y^2)}{x^2+y^2}$ continuous at the origin."}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"In polar form the expression is $\\dfrac{\\sin(r^2)}{r^2}\\to 1$ as $r\\to 0$."}</p>
          <p>{"Set $g(0,0)=1$. Then $g$ is continuous on all of $\\mathbb{R}^2$."}</p>
        </div>
      </div>

      <div className="box def">
        <div className="box-lbl">{"Theory — Algebra of Continuous Functions"}</div>
        <p>
          {"Sums, products, quotients (away from zeros of the denominator), and compositions of continuous maps remain continuous "}
          {"on their natural domains. Polynomials and rational functions (where defined) are continuous."}
        </p>
      </div>
    </section>
  );
}

export function IntegralsExtendedPart1() {
  return (
    <section className="section" id="mi-extended-1">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Iterated Integrals and Region Design"}</h2>
      <p>
        {"A double integral is a limit of Riemann sums over rectangles in the plane. "}
        {"Fubini converts that sum into nested one-variable integrals — but only after the region is described correctly."}
      </p>

      <div className="box def">
        <div className="box-lbl">{"Theory — Type I vs Type II"}</div>
        <p>
          {"Type I: $a\\le x\\le b$ and $g_1(x)\\le y\\le g_2(x)$. Type II: $c\\le y\\le d$ and $h_1(y)\\le x\\le h_2(y)$. "}
          {"Changing order means redrawing $R$ and rewriting both pairs of bounds."}
        </p>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example — Flip the Order"}</div>
        <div className="exm-title">
          {"Rewrite $\\displaystyle\\int_0^1\\int_x^1 e^{y^2}\\,dy\\,dx$ with $dx$ inner."}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Region: $0\\le x\\le 1$, $x\\le y\\le 1$ is the triangle under $y=1$ and above $y=x$."}</p>
          <p>{"As Type II: $0\\le y\\le 1$ and $0\\le x\\le y$."}</p>
          <div className="fml">{"$$\\int_0^1\\int_0^y e^{y^2}\\,dx\\,dy=\\int_0^1 y e^{y^2}\\,dy=\\tfrac{1}{2}(e-1)$$"}</div>
          <p>{"The original order has no elementary antiderivative in $y$; the flipped order is elementary."}</p>
        </div>
      </div>

      <div className="box thm">
        <div className="box-lbl">{"Checklist"}</div>
        <ol className="steps">
          <li>{"Sketch $R$ before writing any bounds."}</li>
          <li>{"Mark whether vertical or horizontal slices are simpler."}</li>
          <li>{"If the inner integral looks impossible, try flipping the order."}</li>
        </ol>
      </div>
    </section>
  );
}

export function IntegralsExtendedPart2() {
  return (
    <section className="section" id="mi-extended-2">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Polar and Cylindrical Detail"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory — Why the Extra $r$?"}</div>
        <p>
          {"A polar “rectangle” $\\Delta r\\times\\Delta\\theta$ has area approximately $r\\,\\Delta r\\,\\Delta\\theta$. "}
          {"The Jacobian factor $r$ is that geometric correction: $dA = r\\,dr\\,d\\theta$."}
        </p>
        <div className="fml">
          {"$$\\iint_R f(x,y)\\,dA = \\int_\\alpha^\\beta\\int_{a}^{b} f(r\\cos\\theta,r\\sin\\theta)\\, r\\,dr\\,d\\theta$$"}
        </div>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">
          {"Compute $\\displaystyle\\iint_D e^{-(x^2+y^2)}\\,dA$ over the unit disk."}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <div className="fml">
            {"$$\\int_0^{2\\pi}\\int_0^1 e^{-r^2} r\\,dr\\,d\\theta = 2\\pi\\cdot\\tfrac{1}{2}(1-e^{-1})=\\pi(1-e^{-1})$$"}
          </div>
          <p>{"Cartesian form resists an elementary antiderivative; polar converts it instantly."}</p>
        </div>
      </div>

      <div className="box def">
        <div className="box-lbl">{"Theory — Cylindrical Triple Integrals"}</div>
        <p>
          {"With $x=r\\cos\\theta$, $y=r\\sin\\theta$, $z=z$, the volume element is $dV=r\\,dz\\,dr\\,d\\theta$. "}
          {"Use this whenever the solid or integrand is built from $x^2+y^2$."}
        </p>
      </div>
    </section>
  );
}

export function PartialsExtendedPart1() {
  return (
    <section className="section" id="pd-extended-1">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Partial Derivatives — Geometry and Limits"}</h2>
      <p>
        {"A partial derivative freezes all but one variable and differentiates with respect to the free variable. "}
        {"Geometrically it is the slope of a curve cut from the surface $z=f(x,y)$."}
      </p>

      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <div className="fml">
          {"$$f_x(a,b)=\\lim_{h\\to 0}\\frac{f(a+h,b)-f(a,b)}{h},\\quad f_y(a,b)=\\lim_{k\\to 0}\\frac{f(a,b+k)-f(a,b)}{k}$$"}
        </div>
        <p>
          {"Existence of both partials does not imply differentiability in the strong multivariable sense; "}
          {"continuity of the partials on a neighborhood is a standard sufficient condition."}
        </p>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"For $f(x,y)=x^2 y+e^{xy}$, compute $f_x$ and $f_y$."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Treat $y$ as constant for $f_x$: $f_x=2xy + y e^{xy}$."}</p>
          <p>{"Treat $x$ as constant for $f_y$: $f_y=x^2 + x e^{xy}$."}</p>
        </div>
      </div>

      <div className="box thm">
        <div className="box-lbl">{"Clairaut Check"}</div>
        <p>
          {"If $f_{xy}$ and $f_{yx}$ are continuous near a point, then $f_{xy}=f_{yx}$ there. "}
          {"Use equal mixed partials as a quick consistency check on long calculations."}
        </p>
      </div>
    </section>
  );
}

export function PartialsExtendedPart2() {
  return (
    <section className="section" id="pd-extended-2">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Gradient, Chain Rule, and Local Linearization"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory — Gradient"}</div>
        <p>
          {"$\\nabla f = (f_x,f_y)$ points in the direction of steepest ascent. "}
          {"The directional derivative in the unit direction $\\mathbf{u}$ is $\\nabla f\\cdot\\mathbf{u}$."}
        </p>
        <div className="fml">
          {"$$f(a+h,b+k)\\approx f(a,b)+f_x(a,b)h+f_y(a,b)k$$"}
        </div>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"Linearize $f(x,y)=\\sqrt{x+y}$ at $(4,5)$."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"$f(4,5)=3$, $f_x=\\dfrac{1}{2\\sqrt{x+y}}$, $f_y$ same, so $f_x(4,5)=f_y(4,5)=\\dfrac{1}{6}$."}</p>
          <div className="fml">{"$$L(x,y)=3+\\tfrac{1}{6}(x-4)+\\tfrac{1}{6}(y-5)$$"}</div>
        </div>
      </div>

      <div className="box def">
        <div className="box-lbl">{"Theory — Chain Rule"}</div>
        <p>
          {"If $z=f(x,y)$ with $x=x(t)$, $y=y(t)$, then $\\dfrac{dz}{dt}=f_x x'(t)+f_y y'(t)$. "}
          {"In vector form this is $\\nabla f\\cdot\\mathbf{r}'(t)$."}
        </p>
      </div>
    </section>
  );
}

export function TaylorExtendedPart1() {
  return (
    <section className="section" id="taylor-extended-1">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Building Taylor Polynomials Carefully"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <div className="fml">
          {"$$T_n(x)=\\sum_{k=0}^{n}\\frac{f^{(k)}(a)}{k!}(x-a)^k$$"}
        </div>
        <p>
          {"Maclaurin polynomials are the special case $a=0$. "}
          {"Matching derivatives through order $n$ at $a$ is what makes $T_n$ the unique degree-$\\le n$ approximation of that quality."}
        </p>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"Find $T_3(x)$ for $f(x)=\\ln(1+x)$ about $0$."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"$f(0)=0$, $f'=\\dfrac{1}{1+x}$, $f'(0)=1$, $f''(0)=-1$, $f'''(0)=2$."}</p>
          <div className="fml">{"$$T_3(x)=x-\\frac{x^2}{2}+\\frac{x^3}{3}$$"}</div>
        </div>
      </div>

      <div className="box thm">
        <div className="box-lbl">{"Catalog Shortcuts"}</div>
        <p>
          {"Start from known series for $e^x$, $\\sin x$, $\\cos x$, $\\dfrac{1}{1-x}$ and substitute (for example $x\\mapsto -x^2$) "}
          {"instead of recomputing every derivative from scratch."}
        </p>
      </div>
    </section>
  );
}

export function TaylorExtendedPart2() {
  return (
    <section className="section" id="taylor-extended-2">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Error Bounds and Radius of Convergence"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory — Lagrange Remainder"}</div>
        <div className="fml">
          {"$$R_n(x)=\\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}\\quad\\text{for some }c\\text{ between }a\\text{ and }x$$"}
        </div>
        <p>
          {"If $|f^{(n+1)}|\\le M$ on the interval of interest, then "}
          {"$|R_n(x)|\\le \\dfrac{M}{(n+1)!}|x-a|^{n+1}$."}
        </p>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">
          {"How large must $n$ be so that $T_n$ for $e^x$ about $0$ has error $<10^{-4}$ on $[0,1]$?"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"On $[0,1]$, $|f^{(n+1)}|=e^c\\le e$. Need $\\dfrac{e}{(n+1)!}<10^{-4}$."}</p>
          <p>{"Trying values shows $n=7$ already works since $8!=40320$ and $e/40320<10^{-4}$."}</p>
        </div>
      </div>

      <div className="box def">
        <div className="box-lbl">{"Theory — Radius"}</div>
        <p>
          {"Power series converge inside an open interval (or disk) of radius $R$. "}
          {"Ratio/root tests estimate $R$; Taylor series of entire functions like $e^x$ have $R=\\infty$."}
        </p>
      </div>
    </section>
  );
}

export function LagrangeExtendedPart1() {
  return (
    <section className="section" id="lagrange-extended-1">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Why Gradients Align on a Constraint"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <p>
          {"On the level set $g(x,y)=c$, admissible motions are tangent to the constraint. "}
          {"At a constrained local extreme of $f$, the level curve of $f$ is tangent to $g=c$, so their normals are parallel: "}
          {"$\\nabla f = \\lambda \\nabla g$."}
        </p>
        <div className="fml">{"$$\\nabla f = \\lambda \\nabla g,\\qquad g=c$$"}</div>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"Optimize $f=x^2+y^2$ on $x+y=1$."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"$(2x,2y)=\\lambda(1,1)$ and $x+y=1$ give $x=y=\\tfrac{1}{2}$, $f=\\tfrac{1}{2}$ (minimum distance squared from origin to the line)."}</p>
        </div>
      </div>

      <div className="box thm">
        <div className="box-lbl">{"Pitfall"}</div>
        <p>
          {"If $\\nabla g=\\mathbf{0}$ somewhere on the constraint, Lagrange may miss that point. "}
          {"Always treat zeros of $\\nabla g$ as separate candidates."}
        </p>
      </div>
    </section>
  );
}

export function LagrangeExtendedPart2() {
  return (
    <section className="section" id="lagrange-extended-2">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Multipliers, Budgets, and Two Constraints"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory — Meaning of $\\lambda$"}</div>
        <p>
          {"For many models, $\\lambda$ approximates how much the optimal value of $f$ changes when the constraint constant $c$ increases by one unit. "}
          {"Economists call related quantities shadow prices."}
        </p>
      </div>

      <div className="box def">
        <div className="box-lbl">{"Theory — Two Constraints"}</div>
        <div className="fml">{"$$\\nabla f = \\lambda \\nabla g + \\mu \\nabla h,\\quad g=c,\\quad h=d$$"}</div>
        <p>
          {"Each equality constraint contributes one multiplier. "}
          {"Count unknowns carefully: space dimension plus number of multipliers."}
        </p>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example Outline"}</div>
        <div className="exm-title">{"Maximize production $P=L^{1/2}K^{1/2}$ under $wL+rK=B$."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution sketch"}</div>
          <ol className="steps">
            <li>{"Form $\\nabla P = \\lambda \\nabla g$ with $g=wL+rK$."}</li>
            <li>{"Eliminate $\\lambda$ to relate $L$ and $K$."}</li>
            <li>{"Substitute into the budget to finish."}</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export function DivCurlExtendedPart1() {
  return (
    <section className="section" id="divcurl-extended-1">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Divergence and Curl as Local Measurements"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <p>
          {"For $\\mathbf{F}=(P,Q,R)$,"}
        </p>
        <div className="fml">
          {"$$\\nabla\\cdot\\mathbf{F}=P_x+Q_y+R_z$$"}
        </div>
        <div className="fml">
          {"$$\\nabla\\times\\mathbf{F}=\\begin{vmatrix}\\mathbf{i}&\\mathbf{j}&\\mathbf{k}\\\\ \\partial_x&\\partial_y&\\partial_z\\\\ P&Q&R\\end{vmatrix}$$"}
        </div>
        <p>
          {"Positive divergence means local expansion (source-like). Nonzero curl means local rotation (vortex-like)."}
        </p>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"Analyze $\\mathbf{F}=(x,-y,z)$."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"$\\nabla\\cdot\\mathbf{F}=1-1+1=1$ (net expansion)."}</p>
          <p>{"$\\nabla\\times\\mathbf{F}=\\mathbf{0}$ (irrotational)."}</p>
        </div>
      </div>

      <div className="box thm">
        <div className="box-lbl">{"Identities to Memorize"}</div>
        <ul className="steps">
          <li>{"$\\nabla\\times(\\nabla f)=\\mathbf{0}$ (curl of a gradient)."}</li>
          <li>{"$\\nabla\\cdot(\\nabla\\times\\mathbf{F})=0$ (divergence of a curl)."}</li>
        </ul>
      </div>
    </section>
  );
}

export function DivCurlExtendedPart2() {
  return (
    <section className="section" id="divcurl-extended-2">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"From Local Operators to Global Theorems"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory — Divergence Theorem"}</div>
        <div className="fml">
          {"$$\\iiint_E (\\nabla\\cdot\\mathbf{F})\\,dV = \\iint_{\\partial E} \\mathbf{F}\\cdot d\\mathbf{S}$$"}
        </div>
        <p>{"Total expansion inside equals net outward flux through the closed boundary."}</p>
      </div>

      <div className="box def">
        <div className="box-lbl">{"Theory — Stokes"}</div>
        <div className="fml">
          {"$$\\oint_{\\partial S}\\mathbf{F}\\cdot d\\mathbf{r} = \\iint_S (\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}$$"}
        </div>
        <p>{"Circulation around the boundary equals curl-flux through any compatible spanning surface."}</p>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example Idea"}</div>
        <div className="exm-title">{"Flux of $\\mathbf{F}=(x,y,z)$ through the unit sphere."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"$\\nabla\\cdot\\mathbf{F}=3$, so flux $=\\iiint_E 3\\,dV=3\\cdot\\tfrac{4}{3}\\pi=4\\pi$."}</p>
        </div>
      </div>
    </section>
  );
}

export function StokesExtendedPart1() {
  return (
    <section className="section" id="stokes-extended-1">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Orientation and Compatible Boundaries"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <p>
          {"Stokes requires an oriented surface $S$ with boundary $\\partial S$. "}
          {"The right-hand rule links the chosen normal $\\mathbf{n}$ to the positive traversal of $\\partial S$: "}
          {"thumb along $\\mathbf{n}$, fingers curl in the boundary direction."}
        </p>
        <div className="fml">
          {"$$\\oint_{\\partial S}\\mathbf{F}\\cdot d\\mathbf{r}=\\iint_S(\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}$$"}
        </div>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">
          {"If $\\nabla\\times\\mathbf{F}=\\mathbf{0}$ on a simply connected region, circulation on every closed curve is $0$."}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Reason"}</div>
          <p>{"Pick any spanning surface; curl flux is identically zero, so Stokes forces the line integral to vanish."}</p>
        </div>
      </div>

      <div className="box thm">
        <div className="box-lbl">{"Pitfall"}</div>
        <p>
          {"Replacing $S$ by another surface with the same boundary is legal only when orientations match. "}
          {"A flipped normal flips the sign of the surface integral."}
        </p>
      </div>
    </section>
  );
}

export function StokesExtendedPart2() {
  return (
    <section className="section" id="stokes-extended-2">
      <div className="sec-badge">{"Extended Study"}</div>
      <h2 className="sec-title">{"Choosing the Easy Side of Stokes"}</h2>

      <div className="box def">
        <div className="box-lbl">{"Theory — Strategy"}</div>
        <ol className="steps">
          <li>{"Compute $\\nabla\\times\\mathbf{F}$. If it simplifies dramatically, prefer the surface integral."}</li>
          <li>{"If $C$ is easy to parametrize and curl is messy, stay with the line integral."}</li>
          <li>{"Among spanning surfaces, prefer flat disks or coordinate planes."}</li>
        </ol>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Worked Example Outline"}</div>
        <div className="exm-title">
          {"Circulation of $\\mathbf{F}=(-y,x,0)$ around the unit circle in the $xy$-plane."}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"$\\nabla\\times\\mathbf{F}=(0,0,2)$. Take the unit disk with upward normal."}</p>
          <div className="fml">{"$$\\iint_S 2\\,dA=2\\pi$$"}</div>
          <p>{"Directly on $C$: $\\mathbf{r}(t)=(\\cos t,\\sin t,0)$ also yields $2\\pi$."}</p>
        </div>
      </div>
    </section>
  );
}
