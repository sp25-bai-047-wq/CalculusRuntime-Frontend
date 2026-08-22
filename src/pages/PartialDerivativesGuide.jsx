import StudyGuideShell from "./StudyGuideShell";
import { GuideMcqSection } from "../components/GuideMcq";
import {
  MV_141_QUIZ,
  MV_142_QUIZ,
  MV_143_QUIZ,
  MV_144_QUIZ,
  MV_145_QUIZ,
  MV_146_QUIZ,
  MV_147_QUIZ,
} from "../data/mvPartialQuizzes";
import "./PartialDerivativesGuide.css";
import { RealLifeUse } from "./calculus/CalcBlocks";
import {
  PartialsExtendedPart1,
  PartialsExtendedPart2,
} from "./GuideExtendedMaterials";
import MvCertificateBoost from "./MvCertificateBoost";

function Divider() {
  return <hr className="divider" />;
}

function OpeningNote() {
  return (
    <div className="opening-note-box">
      <p className="opening-note">
        <strong>Operational Blueprint:</strong>{" "}
        {"This comprehensive study guide extends single-variable calculus principles—limits, continuity, differentiation, and optimization—to multivariable scalar fields where outputs depend upon multiple interdependent inputs. In physical reality, thermal distributions, aerodynamic pressures, and financial loss landscapes vary across spatial dimensions and time. Partial derivatives quantify localized rates of change along individual coordinate axes by holding all other variables constant. Building upon partial derivatives, we construct gradient vectors for steepest ascent, compute directional derivatives along arbitrary trajectories, determine tangent planes for local linearizations, and apply multivariable chain rules. This foundation enables rigorous multivariable optimization and advanced physical system modeling."}
      </p>
    </div>
  );
}

function SectionS141() {
  return (
    <section className="section" id="s141">
      <div className="sec-badge">
        {"Section"}
      </div>
      <h2 className="sec-title">
        {"Functions of Several Variables"}
      </h2>
      <p>
        {"We begin by defining what it means for a rule to depend on two (or more) inputs and by developing the tools\n        needed to visualize such functions: domains, graphs, and level curves."}
      </p>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Function of Two Variables"}
        </div>
        {"\n        A "}
        <em>
          {"function of two variables"}
        </em>
        {" $f$ is a rule that assigns a unique real number $f(x,y)$ to each ordered\n        pair $(x,y)$ in a subset $D\\subseteq\\mathbb{R}^2$. $D$ is the "}
        <strong>
          {"domain"}
        </strong>
        {"; the set of all output\n        values is the "}
        <strong>
          {"range"}
        </strong>
        {". We call $x,y$ the "}
        <strong>
          {"independent variables"}
        </strong>
        {" and $z = f(x,y)$\n        the "}
        <strong>
          {"dependent variable"}
        </strong>
        {".\n      "}
      </div>

      <RealLifeUse>
        Temperature maps $T(x,y)$, terrain elevation $h(x,y)$, and image brightness are everyday functions of two variables — weather apps and topographic maps are literally graphs of $z=f(x,y)$.
      </RealLifeUse>
      <h3 className="subsec">
        {"Finding the Natural Domain"}
      </h3>
      <p>
        {"The natural domain is the largest set of input pairs for which the formula produces a real, well-defined\n        number. Typical restrictions are: square-root radicand $\\geq 0$, denominator $\\neq 0$, logarithm argument $> 0$.\n      "}
      </p>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Domain of $f(x,y) = \\sqrt{9-x^2-y^2}$"}
        </div>
        <p>
          {"Determine the domain and range."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"We need $9 - x^2 - y^2 \\geq 0$, i.e. $x^2+y^2\\leq 9$."}
          </p>
          <div className="fml">
            {"$$D = \\{(x,y)\\in\\mathbb{R}^2 : x^2+y^2 \\leq 9\\}$$"}
          </div>
          <p>
            {"This is the "}
            <strong>
              {"closed disk"}
            </strong>
            {" of radius 3 centred at the origin. On $D$, the radicand ranges\n            from 0 to 9, so the range is $[0,3]$. Geometrically, the graph $z=\\sqrt{9-x^2-y^2}$ is the upper hemisphere\n            of radius 3."}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Domain of $\\displaystyle g(x,y)=\\frac{\\ln(y-x)}{x^2-1}$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"Need: (i) $y-x > 0\\;\\Rightarrow\\;y>x$ and (ii) $x^2-1\\neq 0\\;\\Rightarrow\\;x\\neq\\pm 1$."}
          </p>
          <div className="fml">
            {"$$D = \\{(x,y) : y>x\\}\\setminus\\{x=1\\}\\setminus\\{x=-1\\}$$"}
          </div>
          <p>
            {"The open half-plane above the line $y=x$, with vertical lines $x=\\pm 1$ excluded."}
          </p>
        </div>
      </div>
      <h3 className="subsec">
        {"Graphs and Surfaces"}
      </h3>
      <p>
        {"The "}
        <strong>
          {"graph"}
        </strong>
        {" of $f(x,y)$ is the surface $\\Sigma=\\{(x,y,z):z=f(x,y),(x,y)\\in D\\}$ in\n        $\\mathbb{R}^3$. Common shapes: $z=x^2+y^2$ is a paraboloid, $z=\\sqrt{x^2+y^2}$ is a cone, $z=xy$ is a saddle.\n      "}
      </p>
      <h3 className="subsec">
        {"Level Curves and Contour Maps"}
      </h3>
      <p>
        {"A "}
        <strong>
          {"level curve"}
        </strong>
        {" of $f$ at height $c$ is the set $\\{(x,y):f(x,y)=c\\}$. Plotting many level curves\n        at equally spaced values of $c$ produces a "}
        <strong>
          {"contour map"}
        </strong>
        {". Key reading rules:"}
      </p>
      <ul className="steps">
        <li>
          <span>
            {"Closely packed contours \u2192 steep terrain (large rate of change)."}
          </span>
        </li>
        <li>
          <span>
            {"Widely spaced contours \u2192 gentle slope (small rate of change)."}
          </span>
        </li>
        <li>
          <span>
            {"Contour lines never cross (function has a unique value at each point)."}
          </span>
        </li>
      </ul>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Level curves of a paraboloid and a saddle"}
        </div>
        <p>
          {"Describe the level curves of (a) $f(x,y)=x^2+y^2$ and (b) $h(x,y)=x^2-y^2$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            <strong>
              {"(a)"}
            </strong>
            {" $x^2+y^2=c$: concentric circles of radius $\\sqrt{c}$ for $c>0$; a single point at\n            $c=0$; empty for $c"}
            {"<"}
            {"0$. The contour map looks like a bull's-eye expanding from the origin."}
          </p>
          <p>
            <strong>
              {"(b)"}
            </strong>
            {" $x^2-y^2=c$: rectangular hyperbolas opening left-right for $c>0$, up-down for $c\n                "}
            {"<"}
            {"0$, and the two diagonal lines $y=\\pm x$ for $c=0$. The surface is the classic saddle shape."}
          </p>
        </div>
      </div>
      <h3 className="subsec">
        {"Functions of Three Variables"}
      </h3>
      <p>
        {"For $w=f(x,y,z)$, the graph requires four dimensions. Instead we study "}
        <strong>
          {"level surfaces"}
        </strong>
        {"\n        $f(x,y,z)=c$. For example, the level surfaces of $f=x^2+y^2+z^2$ are spheres. These concepts extend\n        to any number of variables."}
      </p>
    </section>
  );
}

function SectionS142() {
  return (
    <section className="section" id="s142">
      <div className="sec-badge">
        {"Section"}
      </div>
      <h2 className="sec-title">
        {"Limits and Continuity"}
      </h2>
      <p>
        {"In one variable, $x$ can approach $a$ from only two directions. In two variables, $(x,y)$ can approach $(a,b)$\n        along infinitely many curves. A limit exists only if "}
        <em>
          {"every possible path"}
        </em>
        {" leads to the same value,\n        making two-variable limits subtler and richer."}
      </p>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Limit"}
        </div>
        {"\n        We write $\\displaystyle\\lim_{(x,y)\\to(a,b)}f(x,y)=L$ if: for every $\\varepsilon>0$ there exists $\\delta>0$ such\n        that\n        $$0 "}
        {"<"}
        {" \\sqrt{(x-a)^2+(y-b)^2} "}
        {"<"}
        {" \\delta \\;\\Longrightarrow\\; |f(x,y)-L|"}
        {"<"}
        {"\\varepsilon.$$ The point $(a,b)$ need not\n          belong to the domain of $f$. "}
      </div>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Two-Path Test for Non-Existence"}
        </div>
        {"\n            If $f(x,y)\\to L_1$ along one path to $(a,b)$ and $f(x,y)\\to L_2$ along a different path, with $L_1\\neq L_2$,\n            then the limit "}
        <strong>
          {"does not exist"}
        </strong>
        {".\n          "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"A subtle non-existent limit"}
        </div>
        <p>
          {"Show $\\displaystyle\\lim_{(x,y)\\to(0,0)}\\frac{2x^2y}{x^4+y^2}$ does not exist."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            <strong>
              {"Along $y=0$:"}
            </strong>
            {" $\\dfrac{0}{x^4}=0\\to 0$."}
          </p>
          <p>
            <strong>
              {"Along $y=x^2$:"}
            </strong>
            {" $\\dfrac{2x^2\\cdot x^2}{x^4+x^4}=\\dfrac{2x^4}{2x^4}=1\\to 1$."}
          </p>
          <p>
            {"Two paths give different limits, so the limit does not exist. Note: along every "}
            <em>
              {"straight-line"}
            </em>
            {"\n                path $y=mx$, the limit equals 0 \u2014 revealing why checking only straight lines is insufficient."}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Proving a limit exists via polar coordinates"}
        </div>
        <p>
          {"Show $\\displaystyle\\lim_{(x,y)\\to(0,0)}\\frac{x^3+y^3}{x^2+y^2}=0$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"Let $x=r\\cos\\theta$, $y=r\\sin\\theta$, so $x^2+y^2=r^2$. Then:"}
          </p>
          <div className="fml">
            {"$$\\left|\\frac{x^3+y^3}{x^2+y^2}\\right| = r\\left|\\cos^3\\theta+\\sin^3\\theta\\right| \\leq 2r\n                \\xrightarrow{r\\to 0} 0$$"}
          </div>
          <p>
            {"Since the bound $2r$ is independent of $\\theta$ and goes to 0, by the Squeeze Theorem the limit equals\n                0."}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Limit by direct substitution"}
        </div>
        <p>
          {"$\\displaystyle\\lim_{(x,y)\\to(1,2)}\\frac{x^2y-2xy^2}{x+y}$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"The expression is a rational function and $(1,2)$ is in its domain (denominator $=3\\neq 0$), so\n                substitute directly:"}
          </p>
          <div className="fml">
            {"$$\\frac{(1)^2(2)-2(1)(4)}{3}=\\frac{2-8}{3}=-2$$"}
          </div>
        </div>
      </div>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Continuity"}
        </div>
        {"\n            $f(x,y)$ is "}
        <em>
          {"continuous at $(a,b)$"}
        </em>
        {" if $(a,b)\\in D$, the limit exists, and\n            $\\lim_{(x,y)\\to(a,b)}f(x,y)=f(a,b)$.\n            "}
        <ul>
          <li>
            {"Polynomials in $x,y$ are continuous on all of $\\mathbb{R}^2$."}
          </li>
          <li>
            {"Rational functions are continuous wherever the denominator is nonzero."}
          </li>
          <li>
            {"Compositions of continuous functions are continuous (wherever defined)."}
          </li>
        </ul>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Extending a function to be continuous"}
        </div>
        <p>
          {"Is $\\displaystyle f(x,y)=\\frac{x^2-y^2}{x-y}$ extendable to a continuous function at points where $x=y$?\n            "}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"For $x\\neq y$: $\\dfrac{x^2-y^2}{x-y}=\\dfrac{(x+y)(x-y)}{x-y}=x+y$. The function $x+y$ is continuous\n                everywhere, so we define:"}
          </p>
          <div className="fml">
            {"$$F(x,y)=\\begin{cases}x+y & \\text{if }(x,y)\\in\\mathbb{R}^2\\end{cases}$$"}
          </div>
          <p>
            {"The removable discontinuity along the line $x=y$ is filled by the formula $x+y$. $F$ is continuous on\n                all of $\\mathbb{R}^2$."}
          </p>
        </div>
      </div>
      <div className="note">
        {"\n            Continuity in two variables is strictly stronger than \"continuous in each variable separately.\" There exist\n            functions that are continuous in $x$ for each fixed $y$, and continuous in $y$ for each fixed $x$, but are\n            not continuous jointly at the origin. This topic provides such an example.\n          "}
      </div>
    </section>
  );
}

function SectionS143() {
  return (
    <section className="section" id="s143">
      <div className="sec-badge">
        {"Section"}
      </div>
      <h2 className="sec-title">
        {"Partial Derivatives"}
      </h2>
      <p>
        {"The key new operation: differentiate $f(x,y)$ with respect to one variable while holding the other fixed. The\n        result, the "}
        <strong>
          {"partial derivative"}
        </strong>
        {", measures the rate of change of $f$ in one coordinate direction.\n      "}
      </p>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Partial Derivatives"}
        </div>
        {"\n        $$\\frac{\\partial f}{\\partial x} = f_x = \\lim_{h\\to 0}\\frac{f(x+h,y)-f(x,y)}{h}$$\n        $$\\frac{\\partial f}{\\partial y} = f_y = \\lim_{h\\to 0}\\frac{f(x,y+h)-f(x,y)}{h}$$\n        Both are ordinary one-variable limits. To compute $f_x$ in practice: differentiate with respect to $x$, treating\n        $y$ as a constant. Vice versa for $f_y$.\n      "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Partial derivatives of a polynomial-trig function"}
        </div>
        <p>
          {"Find $f_x$ and $f_y$ for $f(x,y)=x^3y^2+\\sin(xy)-e^{2y}$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <div className="fml">
            {"$$f_x = 3x^2y^2 + y\\cos(xy)$$"}
          </div>
          <div className="fml">
            {"$$f_y = 2x^3y + x\\cos(xy) - 2e^{2y}$$"}
          </div>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Quotient rule required"}
        </div>
        <p>
          {"Find $g_x$ for $g(x,y)=\\dfrac{x^2\\ln y}{x^2+y}$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"Treat $y$ as constant, apply quotient rule in $x$:"}
          </p>
          <div className="fml">
            {"$$g_x = \\frac{2x\\ln y\\,(x^2+y)-x^2\\ln y\\cdot 2x}{(x^2+y)^2} = \\frac{2xy\\ln y}{(x^2+y)^2}$$\n          "}
          </div>
        </div>
      </div>
      <h3 className="subsec">
        {"Geometric Interpretation"}
      </h3>
      <p>
        {"Fixing $y=b$ slices the surface $z=f(x,y)$ with the plane $y=b$, producing a curve. $f_x(a,b)$ is the slope of\n        that curve at the point $(a,b,f(a,b))$ \u2014 the rate of rise in the $x$-direction. Similarly $f_y(a,b)$ is the\n        slope in the $y$-direction. Together they determine the tangent plane."}
      </p>
      <h3 className="subsec">
        {"Higher-Order Partial Derivatives"}
      </h3>
      <p>
        {"Differentiating again gives four second-order partials:"}
      </p>
      <div className="fml">
        {"\n        $$f_{xx}=\\frac{\\partial^2 f}{\\partial x^2},\\quad f_{yy}=\\frac{\\partial^2 f}{\\partial y^2},\\quad\n        f_{xy}=\\frac{\\partial}{\\partial y}\\!\\left(\\frac{\\partial f}{\\partial x}\\right)=\\frac{\\partial^2 f}{\\partial\n        y\\,\\partial x},\\quad f_{yx}=\\frac{\\partial^2 f}{\\partial x\\,\\partial y}$$\n      "}
      </div>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Clairaut / Schwarz (Mixed Partials)"}
        </div>
        {"\n        If $f_{xy}$ and $f_{yx}$ are both continuous on an open disk containing $(a,b)$, then:\n        $$f_{xy}(a,b)=f_{yx}(a,b)$$\n        The order of differentiation does not matter under this continuity condition.\n      "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"All four second-order partials and Clairaut verification"}
        </div>
        <p>
          {"For $f(x,y)=x^2e^{xy}$, find $f_{xx}$, $f_{yy}$, $f_{xy}$, $f_{yx}$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"$f_x = xe^{xy}(2+xy)$; $\\quad f_y = x^3e^{xy}$."}
          </p>
          <div className="fml">
            {"$$f_{xx} = e^{xy}(2+4xy+x^2y^2)$$"}
          </div>
          <div className="fml">
            {"$$f_{yy} = x^4e^{xy}$$"}
          </div>
          <div className="fml">
            {"$$f_{xy} = x^2e^{xy}(3+xy) = f_{yx} \\checkmark$$"}
          </div>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Partial derivatives and the Heat Equation (PDE)"}
        </div>
        <p>
          {"The temperature $u(x,t)$ in a uniform rod satisfies $u_t=k\\,u_{xx}$. Verify that $u(x,t)=e^{-k\\pi^2\n          t}\\sin(\\pi x)$ is a solution."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <div className="fml">
            {"$$u_t = -k\\pi^2\\,e^{-k\\pi^2 t}\\sin(\\pi x)$$"}
          </div>
          <div className="fml">
            {"$$u_{xx} = -\\pi^2\\,e^{-k\\pi^2 t}\\sin(\\pi x)$$"}
          </div>
          <p>
            {"So $k\\,u_{xx}=-k\\pi^2 e^{-k\\pi^2 t}\\sin(\\pi x)=u_t.$ \u2713 This solution represents one heat-decay mode in a\n            rod of length 1 with ends held at 0\u00b0."}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Three-variable partial derivatives"}
        </div>
        <p>
          {"For $w=x\\sin(yz)+z^2\\ln x$, find $w_x$, $w_y$, $w_z$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <div className="fml">
            {"$$w_x=\\sin(yz)+\\frac{z^2}{x},\\qquad w_y=xz\\cos(yz),\\qquad w_z=xy\\cos(yz)+2z\\ln x$$"}
          </div>
        </div>
      </div>
      <div className="note">
        {"\n        Partial derivatives are the building blocks of everything that follows: gradient, directional derivatives,\n        tangent planes, differentials, the chain rule, and optimization. Master the notation ($f_x$, $\\partial\n        f/\\partial x$, $\\partial^2 f/\\partial y\\,\\partial x$) and the mechanical rule (hold all other variables\n        constant) and the rest of the topic follows naturally.\n      "}
      </div>
    </section>
  );
}

function SectionS144() {
  return (
    <section className="section" id="s144">
      <div className="sec-badge">
        {"Section"}
      </div>
      <h2 className="sec-title">
        {"The Chain Rule"}
      </h2>
      <p>
        {"When the inputs $x,y$ of $f(x,y)$ are themselves functions of additional variables, we need the\n        "}
        <strong>
          {"multivariable chain rule"}
        </strong>
        {" to compute the resulting derivatives. It generalizes the\n        single-variable rule $\\frac{d}{dt}f(g(t))=f'(g(t))\\,g'(t)$ by adding one term for each path through which the\n        intermediate variables influence the output."}
      </p>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Chain Rule, Case 1 (one parameter)"}
        </div>
        {"\n        If $z=f(x,y)$ is differentiable and $x=x(t)$, $y=y(t)$ are differentiable, then $z$ is a differentiable function\n        of $t$ and:\n        $$\\frac{dz}{dt} = \\frac{\\partial f}{\\partial x}\\frac{dx}{dt}+\\frac{\\partial f}{\\partial y}\\frac{dy}{dt}$$\n      "}
      </div>
      <RealLifeUse>
        A robot arm's tip position depends on joint angles that themselves change with time — the multivariable chain rule is how engineers convert motor speeds into tip velocity.
      </RealLifeUse>

      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Chain rule along a parametric curve"}
        </div>
        <p>
          {"If $z=x^2\\sin y$, $x=t^2$, $y=2t$, find $dz/dt$ at $t=1$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <div className="fml">
            {"$$\\frac{dz}{dt}=2x\\sin y\\cdot 2t+x^2\\cos y\\cdot 2$$"}
          </div>
          <p>
            {"At $t=1$: $x=1$, $y=2$. So $\\dfrac{dz}{dt}=4\\sin 2+2\\cos 2\\approx 4(0.909)+2(-0.416)\\approx 2.80$."}
          </p>
        </div>
      </div>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Chain Rule, Case 2 (two parameters)"}
        </div>
        {"\n        If $z=f(x,y)$, $x=x(s,t)$, $y=y(s,t)$ are all differentiable, then:\n        $$\\frac{\\partial z}{\\partial s}=\\frac{\\partial f}{\\partial x}\\frac{\\partial x}{\\partial s}+\\frac{\\partial\n        f}{\\partial y}\\frac{\\partial y}{\\partial s},\\qquad\\frac{\\partial z}{\\partial t}=\\frac{\\partial f}{\\partial\n        x}\\frac{\\partial x}{\\partial t}+\\frac{\\partial f}{\\partial y}\\frac{\\partial y}{\\partial t}$$\n      "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Chain rule with two intermediate variables"}
        </div>
        <p>
          {"Let $z=e^{x-y}$, $x=s^2t$, $y=st^2$. Find $\\partial z/\\partial s$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"$z_x=e^{x-y}$, $z_y=-e^{x-y}$, $x_s=2st$, $y_s=t^2$."}
          </p>
          <div className="fml">
            {"$$\\frac{\\partial z}{\\partial s}=e^{x-y}(2st)-e^{x-y}(t^2)=e^{s^2t-st^2}\\,t(2s-t)$$"}
          </div>
        </div>
      </div>
      <h3 className="subsec">
        {"Chain Rule for Three Variables"}
      </h3>
      <p>
        {"If $w=f(x,y,z)$ and $x,y,z$ are differentiable functions of $t$:"}
      </p>
      <div className="fml">
        {"$$\\frac{dw}{dt}=\\frac{\\partial f}{\\partial x}\\frac{dx}{dt}+\\frac{\\partial f}{\\partial\n        y}\\frac{dy}{dt}+\\frac{\\partial f}{\\partial z}\\frac{dz}{dt}$$"}
      </div>
      <h3 className="subsec">
        {"Implicit Differentiation"}
      </h3>
      <p>
        {"When $F(x,y)=0$ defines $y$ implicitly as a function of $x$, differentiating both sides with the chain rule\n        gives a clean formula without needing to solve for $y$."}
      </p>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Implicit Differentiation"}
        </div>
        {"\n        If $F(x,y)=0$ defines $y=y(x)$ and $F_y\\neq 0$:\n        $$\\frac{dy}{dx}=-\\frac{F_x}{F_y}$$\n        If $F(x,y,z)=0$ defines $z=z(x,y)$ and $F_z\\neq 0$:\n        $$\\frac{\\partial z}{\\partial x}=-\\frac{F_x}{F_z},\\qquad\\frac{\\partial z}{\\partial y}=-\\frac{F_y}{F_z}$$\n      "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Folium of Descartes: implicit differentiation"}
        </div>
        <p>
          {"Find $dy/dx$ on the curve $F(x,y)=x^3+y^3-3xy=0$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"$F_x=3x^2-3y$, $F_y=3y^2-3x$."}
          </p>
          <div className="fml">
            {"$$\\frac{dy}{dx}=-\\frac{3x^2-3y}{3y^2-3x}=\\frac{y-x^2}{y^2-x}$$"}
          </div>
          <p>
            {"At $(3/2,3/2)$: slope $=\\frac{3/2-9/4}{9/4-3/2}=\\frac{-3/4}{3/4}=-1$. The tangent line is $y=-x+3$."}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Implicit partial derivatives of a surface"}
        </div>
        <p>
          {"If $x^2+2y^2+3z^2+xyz=9$, find $\\partial z/\\partial x$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"$F=x^2+2y^2+3z^2+xyz-9$. $F_x=2x+yz$, $F_z=6z+xy$."}
          </p>
          <div className="fml">
            {"$$\\frac{\\partial z}{\\partial x}=-\\frac{2x+yz}{6z+xy}$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionS145() {
  return (
    <section className="section" id="s145">
      <div className="sec-badge">
        {"Section"}
      </div>
      <h2 className="sec-title">
        {"Directional Derivatives and the Gradient"}
      </h2>
      <p>
        {"Partial derivatives give rates of change only along the $x$- and $y$-axes. The "}
        <strong>
          {"directional\n          derivative"}
        </strong>
        {" generalises this to any direction, and the "}
        <strong>
          {"gradient"}
        </strong>
        {" $\\nabla f$ packages\n        all that directional information into a single powerful vector."}
      </p>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Directional Derivative"}
        </div>
        {"\n        The "}
        <em>
          {"directional derivative"}
        </em>
        {" of $f$ at $(x_0,y_0)$ in the direction of a unit vector $\\mathbf{u}=\\langle\n        a,b\\rangle$ ($|\\mathbf{u}|=1$) is:\n        $$D_{\\mathbf{u}}f(x_0,y_0)=\\lim_{h\\to 0}\\frac{f(x_0+ha,y_0+hb)-f(x_0,y_0)}{h}$$\n        It measures the rate of change of $f$ per unit distance in direction $\\mathbf{u}$.\n      "}
      </div>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 The Gradient Vector"}
        </div>
        {"\n        $$\\nabla f(x,y)=\\left\\langle\\frac{\\partial f}{\\partial x},\\frac{\\partial f}{\\partial\n        y}\\right\\rangle=f_x\\,\\mathbf{i}+f_y\\,\\mathbf{j}$$\n        For three variables: $\\nabla f=\\langle f_x,f_y,f_z\\rangle$.\n      "}
      </div>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Directional Derivative via Gradient"}
        </div>
        {"\n        If $f$ is differentiable at $(x_0,y_0)$ and $\\mathbf{u}=\\langle\\cos\\theta,\\sin\\theta\\rangle$:\n        $$D_{\\mathbf{u}}f = \\nabla f\\cdot\\mathbf{u} = |\\nabla f|\\cos\\alpha$$\n        where $\\alpha$ is the angle between $\\nabla f$ and $\\mathbf{u}$. This maximum is $|\\nabla f|$ (when\n        $\\mathbf{u}\\parallel\\nabla f$) and minimum $-|\\nabla f|$ (when $\\mathbf{u}\\parallel-\\nabla f$).\n      "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Computing a directional derivative"}
        </div>
        <p>
          {"Find $D_{\\mathbf{u}}f$ at $(1,2)$ in direction $\\mathbf{v}=\\langle 3,4\\rangle$ for $f(x,y)=x^2e^y-xy$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"Unit vector: $\\mathbf{u}=\\langle 3/5,4/5\\rangle$. At $(1,2)$: $f_x=2xe^y-y=2e^2-2$, $f_y=x^2e^y-x=e^2-1$.\n          "}
          </p>
          <div className="fml">
            {"$$D_{\\mathbf{u}}f =\n            (2e^2-2)\\tfrac{3}{5}+(e^2-1)\\tfrac{4}{5}=\\frac{6e^2-6+4e^2-4}{5}=2(e^2-1)\\approx 12.78$$"}
          </div>
        </div>
      </div>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Four Key Properties of the Gradient"}
        </div>
        {"\n        At any point where $\\nabla f\\neq\\mathbf{0}$:\n        "}
        <ul>
          <li>
            <strong>
              {"Steepest ascent:"}
            </strong>
            {" $f$ increases fastest in direction $\\nabla f/|\\nabla f|$; rate $=\n            |\\nabla f|$."}
          </li>
          <li>
            <strong>
              {"Steepest descent:"}
            </strong>
            {" $f$ decreases fastest in direction $-\\nabla f/|\\nabla f|$; rate $=\n            -|\\nabla f|$."}
          </li>
          <li>
            <strong>
              {"Zero directional change:"}
            </strong>
            {" $D_{\\mathbf{u}}f=0$ when $\\mathbf{u}\\perp\\nabla f$ (along level\n            curve)."}
          </li>
          <li>
            <strong>
              {"Normal to level curves:"}
            </strong>
            {" $\\nabla f(x_0,y_0)\\perp$ the level curve $f=c$ at $(x_0,y_0)$.\n          "}
          </li>
        </ul>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Fastest increase and normal to level curve"}
        </div>
        <p>
          {"For $T(x,y)=100-x^2-2y^2$ (temperature field), find the direction of fastest temperature increase at $(1,1)$\n          and the rate. Verify that $\\nabla T$ is perpendicular to the level curve through $(1,1)$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <div className="fml">
            {"$$\\nabla T = \\langle -2x,-4y\\rangle,\\qquad \\nabla T(1,1)=\\langle -2,-4\\rangle$$"}
          </div>
          <p>
            <strong>
              {"Fastest increase direction:"}
            </strong>
            {" $\\mathbf{u}=\\dfrac{\\langle\n            -2,-4\\rangle}{2\\sqrt{5}}=\\langle\\tfrac{-1}{\\sqrt{5}},\\tfrac{-2}{\\sqrt{5}}\\rangle$."}
          </p>
          <p>
            <strong>
              {"Rate:"}
            </strong>
            {" $|\\nabla T(1,1)|=2\\sqrt{5}\\approx 4.47$ degrees per unit length."}
          </p>
          <p>
            <strong>
              {"Level curve through $(1,1)$:"}
            </strong>
            {" $T=97$, i.e. $x^2+2y^2=3$. Tangent to this ellipse at $(1,1)$\n            has direction vector $\\langle -4,2\\rangle$ (from $\\nabla(x^2+2y^2)$ rotated 90\u00b0). Indeed $\\langle\n            -2,-4\\rangle\\cdot\\langle -4,2\\rangle=8-8=0$. \u2713"}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Gradient in three variables \u2014 normal to a level surface"}
        </div>
        <p>
          {"For $f(x,y,z)=x^2+2y^2+z^2$, find $\\nabla f$ at $(1,-1,2)$ and write the equation of the tangent plane to the\n          level surface $f=7$ there."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <div className="fml">
            {"$$\\nabla f=\\langle 2x,4y,2z\\rangle,\\qquad \\nabla f(1,-1,2)=\\langle 2,-4,4\\rangle$$"}
          </div>
          <p>
            {"Tangent plane (using normal $\\nabla f$):"}
          </p>
          <div className="fml">
            {"$$2(x-1)-4(y+1)+4(z-2)=0\\;\\Longrightarrow\\; x-2y+2z=13$$"}
          </div>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Gradient and the chain rule"}
        </div>
        <p>
          {"A particle moves along $\\mathbf{r}(t)=\\langle\\cos t,\\sin t,t\\rangle$. If $T(x,y,z)=xyz$ is the temperature,\n          find the rate of change of temperature felt by the particle at $t=\\pi/2$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <div className="fml">
            {"$$\\frac{dT}{dt}=\\nabla T\\cdot\\mathbf{r}'(t)=\\langle yz,xz,xy\\rangle\\cdot\\langle -\\sin t,\\cos\n            t,1\\rangle$$"}
          </div>
          <p>
            {"At $t=\\pi/2$: $(x,y,z)=(0,1,\\pi/2)$. $\\nabla T=(yz,xz,xy)=(\\pi/2,0,0)$, $\\mathbf{r}'=(-1,0,1)$."}
          </p>
          <div className="fml">
            {"$$\\frac{dT}{dt}=(\\pi/2)(-1)+0+0=-\\frac{\\pi}{2}$$"}
          </div>
          <p>
            {"The temperature is decreasing at rate $\\pi/2$ at that instant."}
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionS146() {
  return (
    <section className="section" id="s146">
      <div className="sec-badge">
        {"Section"}
      </div>
      <h2 className="sec-title">
        {"Tangent Planes and Differentials"}
      </h2>
      <p>
        {"The tangent line to $y=f(x)$ is the best linear approximation to the curve at a point. For surfaces $z=f(x,y)$,\n        the analogue is the "}
        <strong>
          {"tangent plane"}
        </strong>
        {", constructed from both partial derivatives. The "}
        <strong>
          {"total\n          differential"}
        </strong>
        {" $df$ is the multivariable version of $dy\\approx f'(x)\\,dx$, and it is the foundation of\n        error analysis and sensitivity analysis."}
      </p>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Tangent Plane to $z=f(x,y)$"}
        </div>
        {"\n        If $f$ has continuous partial derivatives, the tangent plane to $z=f(x,y)$ at $P_0=(x_0,y_0,z_0)$ (with\n        $z_0=f(x_0,y_0)$) is:\n        $$z-z_0=f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0)$$\n        The normal vector to this plane is $\\mathbf{n}=\\langle f_x(x_0,y_0),\\,f_y(x_0,y_0),\\,-1\\rangle$.\n      "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Tangent plane to a paraboloid"}
        </div>
        <p>
          {"Find the tangent plane to $z=x^2+y^2$ at $(1,2,5)$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"$f_x=2x=2$, $f_y=2y=4$ at $(1,2)$."}
          </p>
          <div className="fml">
            {"$$z-5=2(x-1)+4(y-2)\\;\\Longrightarrow\\; z=2x+4y-5$$"}
          </div>
          <p>
            {"Normal line: $\\dfrac{x-1}{2}=\\dfrac{y-2}{4}=\\dfrac{z-5}{-1}$."}
          </p>
        </div>
      </div>
      <h3 className="subsec">
        {"Tangent Plane to an Implicit Surface"}
      </h3>
      <p>
        {"For a surface $F(x,y,z)=c$, the gradient $\\nabla F$ is normal to the surface, giving:"}
      </p>
      <div className="fml">
        {"$$F_x(P_0)(x-x_0)+F_y(P_0)(y-y_0)+F_z(P_0)(z-z_0)=0$$"}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Tangent plane to an ellipsoid"}
        </div>
        <p>
          {"Find the tangent plane to $\\dfrac{x^2}{4}+y^2+\\dfrac{z^2}{9}=3$ at $(2,1,3)$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"$F_x=x/2=1$, $F_y=2y=2$, $F_z=2z/9=2/3$ at $(2,1,3)$."}
          </p>
          <div className="fml">
            {"$$1(x-2)+2(y-1)+\\tfrac{2}{3}(z-3)=0\\;\\Longrightarrow\\;3x+6y+2z=20$$"}
          </div>
        </div>
      </div>
      <h3 className="subsec">
        {"Differentiability and the Total Differential"}
      </h3>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Total Differential"}
        </div>
        {"\n        If $f(x,y)$ is differentiable at $(x_0,y_0)$, its "}
        <em>
          {"total differential"}
        </em>
        {" is:\n        $$df = f_x(x_0,y_0)\\,dx + f_y(x_0,y_0)\\,dy$$\n        It approximates the actual change $\\Delta f=f(x_0+\\Delta x,y_0+\\Delta y)-f(x_0,y_0)$ when $|\\Delta x|$ and\n        $|\\Delta y|$ are small: $\\Delta f\\approx df$.\n      "}
      </div>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Sufficient Condition for Differentiability"}
        </div>
        {"\n        If $f_x$ and $f_y$ both exist and are "}
        <em>
          {"continuous"}
        </em>
        {" in an open region containing $(x_0,y_0)$, then $f$ is\n        differentiable at $(x_0,y_0)$.\n      "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Linear approximation using the differential"}
        </div>
        <p>
          {"Approximate $f(3.02, 3.97)$ where $f(x,y)=\\sqrt{x^2+y^2}$, starting from $(3,4)$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"$f(3,4)=5$. $f_x=\\dfrac{x}{\\sqrt{x^2+y^2}}=\\dfrac{3}{5}$, $f_y=\\dfrac{4}{5}$ at $(3,4)$. $dx=0.02$,\n            $dy=-0.03$."}
          </p>
          <div className="fml">
            {"$$df=\\frac{3}{5}(0.02)+\\frac{4}{5}(-0.03)=0.012-0.024=-0.012$$"}
          </div>
          <p>
            {"So $f(3.02,3.97)\\approx 5-0.012=4.988$. Exact value: $\\sqrt{(3.02)^2+(3.97)^2}\\approx 4.9880$. \u2713"}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Error propagation \u2014 pendulum period"}
        </div>
        <p>
          {"The period is $T=2\\pi\\sqrt{L/g}$. If $L$ has error $|\\delta L/L|\\leq 0.5\\%$ and $g$ has error $|\\delta\n          g/g|\\leq 0.1\\%$, find the maximum relative error in $T$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"Taking logarithm: $\\ln T=\\ln(2\\pi)+\\tfrac{1}{2}\\ln L-\\tfrac{1}{2}\\ln g$. Differentiating:"}
          </p>
          <div className="fml">
            {"$$\\frac{dT}{T}=\\frac{1}{2}\\frac{dL}{L}-\\frac{1}{2}\\frac{dg}{g}$$"}
          </div>
          <div className="fml">
            {"$$\\left|\\frac{dT}{T}\\right|\\leq\\frac{1}{2}(0.5\\%)+\\frac{1}{2}(0.1\\%)=0.3\\%$$"}
          </div>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Volume error of a cylindrical can"}
        </div>
        <p>
          {"$V=\\pi r^2h$ with $r=5$ cm, $h=12$ cm, $|dr|\\leq 0.1$ cm, $|dh|\\leq 0.15$ cm. Estimate the maximum absolute\n          error in $V$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <div className="fml">
            {"$$dV=2\\pi rh\\,dr+\\pi r^2\\,dh$$"}
          </div>
          <div className="fml">
            {"$$|dV|\\leq 2\\pi(5)(12)(0.1)+\\pi(25)(0.15)=12\\pi+3.75\\pi=15.75\\pi\\approx 49.5\\text{ cm}^3$$\n          "}
          </div>
          <p>
            {"Relative error: $15.75\\pi/(300\\pi)\\approx 5.25\\%$."}
          </p>
        </div>
      </div>
      <h3 className="subsec" id="s146lin">
        {"Linearization of Functions of Two Variables"}
      </h3>
      <p>
        {"The tangent plane formula doubles as the best linear (affine) approximation to $f$ near a point. This is the\n        multivariable analogue of the single-variable linearization $L(x)=f(a)+f'(a)(x-a)$."}
      </p>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Linearization at $(x_0,y_0)$"}
        </div>
        {"\n        If $f$ is differentiable at $(x_0,y_0)$, the "}
        <em>
          {"linearization"}
        </em>
        {" of $f$ at $(x_0,y_0)$ is the linear\n        function:\n        $$L(x,y)=f(x_0,y_0)+f_x(x_0,y_0)(x-x_0)+f_y(x_0,y_0)(y-y_0)$$\n        The approximation $f(x,y)\\approx L(x,y)$ is called the "}
        <strong>
          {"standard linear approximation"}
        </strong>
        {" or\n        "}
        <strong>
          {"tangent plane approximation"}
        </strong>
        {". The error satisfies $\\varepsilon(x,y)\\to 0$ as $(x,y)\\to(x_0,y_0)$\n        in the sense that:\n        $$f(x,y)-L(x,y) = \\varepsilon_1\\Delta x+\\varepsilon_2\\Delta y, \\qquad \\varepsilon_1,\\varepsilon_2\\to 0 \\text{ as\n        } (\\Delta x,\\Delta y)\\to(0,0)$$\n      "}
      </div>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Linearization of Three Variables"}
        </div>
        {"\n        For $w=f(x,y,z)$ differentiable at $(x_0,y_0,z_0)$:\n        $$L(x,y,z)=f(x_0,y_0,z_0)+f_x(P_0)(x-x_0)+f_y(P_0)(y-y_0)+f_z(P_0)(z-z_0)$$\n        where $P_0=(x_0,y_0,z_0)$. This is the "}
        <em>
          {"hyperplane tangent"}
        </em>
        {" to the graph of $f$ at $P_0$.\n      "}
      </div>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Error Bound for Linearization"}
        </div>
        {"\n        If $f_{xx}$, $f_{yy}$, $f_{xy}$ are continuous on a rectangle $R$ centred at $(x_0,y_0)$, and\n        $|f_{xx}|,|f_{yy}|,|f_{xy}|\\leq M$ on $R$, then the error $E(x,y)=f(x,y)-L(x,y)$ satisfies:\n        $$|E(x,y)|\\leq \\frac{1}{2}M(|x-x_0|+|y-y_0|)^2$$\n        Thus the linearization is accurate to second order in the displacement from $(x_0,y_0)$.\n      "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Linearization of $f(x,y)=xe^y+\\cos(xy)$ at $(1,0)$"}
        </div>
        <p>
          {"Find the linearization and use it to approximate $f(1.1,\\,-0.1)$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"$f(1,0)=1\\cdot 1+\\cos(0)=2$."}
          </p>
          <div className="fml">
            {"$$f_x=e^y-y\\sin(xy)\\Bigl|_{(1,0)}=1-0=1$$"}
          </div>
          <div className="fml">
            {"$$f_y=xe^y-x\\sin(xy)\\Bigl|_{(1,0)}=1-0=1$$"}
          </div>
          <p>
            {"Linearization:"}
          </p>
          <div className="fml">
            {"$$L(x,y)=2+1\\cdot(x-1)+1\\cdot(y-0)=1+x+y$$"}
          </div>
          <p>
            {"Approximation: $f(1.1,-0.1)\\approx L(1.1,-0.1)=1+1.1+(-0.1)=2.000$."}
          </p>
          <p>
            {"Exact: $f(1.1,-0.1)=1.1e^{-0.1}+\\cos(-0.11)\\approx 1.1(0.9048)+0.9940\\approx 0.9953+0.9940\\approx 1.9893$.\n            The error is about $0.011$, consistent with the quadratic error bound."}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Three-variable linearization"}
        </div>
        <p>
          {"Find the linearization of $f(x,y,z)=\\sqrt{x^2+y^2+z^2}$ at $(2,1,2)$ and use it to approximate\n          $f(2.02,\\,0.97,\\,2.01)$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"$f(2,1,2)=\\sqrt{4+1+4}=3$. The partial derivatives at $(2,1,2)$:"}
          </p>
          <div className="fml">
            {"$$f_x=\\frac{x}{\\sqrt{x^2+y^2+z^2}}\\Bigl|_{(2,1,2)}=\\frac{2}{3},\\qquad f_y=\\frac{1}{3},\\qquad\n            f_z=\\frac{2}{3}$$"}
          </div>
          <div className="fml">
            {"$$L(x,y,z)=3+\\tfrac{2}{3}(x-2)+\\tfrac{1}{3}(y-1)+\\tfrac{2}{3}(z-2)$$"}
          </div>
          <p>
            {"At $(2.02,0.97,2.01)$: $\\Delta x=0.02$, $\\Delta y=-0.03$, $\\Delta z=0.01$."}
          </p>
          <div className="fml">
            {"\n            $$L=3+\\tfrac{2}{3}(0.02)+\\tfrac{1}{3}(-0.03)+\\tfrac{2}{3}(0.01)=3+0.01333-0.01+0.00667=3.010$$"}
          </div>
          <p>
            {"Exact value: $\\sqrt{(2.02)^2+(0.97)^2+(2.01)^2}=\\sqrt{4.0804+0.9409+4.0401}=\\sqrt{9.0614}\\approx 3.0102$. \u2713\n          "}
          </p>
        </div>
      </div>
      <h3 className="subsec" id="s146taylor">
        {"Taylor Series for Functions of Two Variables"}
      </h3>
      <p>
        {"Just as the single-variable Taylor series $f(x)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(a)}{n!}(x-a)^n$ extends a\n        linear approximation to higher-order accuracy, the "}
        <strong>
          {"multivariate Taylor series"}
        </strong>
        {" extends the\n        linearization by including quadratic, cubic, and higher-order terms in the increments $h=x-x_0$ and $k=y-y_0$.\n      "}
      </p>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Taylor's Formula for $f(x,y)$ at $(x_0,y_0)$"}
        </div>
        {"\n        If $f$ has continuous partial derivatives of all orders on a disk around $(x_0,y_0)$, with $h=x-x_0$, $k=y-y_0$:\n        $$f(x,y)=f(x_0,y_0)+(hf_x+kf_y)+\\frac{1}{2!}(h^2f_{xx}+2hkf_{xy}+k^2f_{yy})+\\frac{1}{3!}(h^3f_{xxx}+3h^2kf_{xxy}+3hk^2f_{xyy}+k^3f_{yyy})+\\cdots$$\n        where all partials are evaluated at $(x_0,y_0)$. Using the symbolic operator $D=h\\dfrac{\\partial}{\\partial\n        x}+k\\dfrac{\\partial}{\\partial y}$, this compresses to:\n        $$\\boxed{f(x,y)=\\sum_{n=0}^{\\infty}\\frac{1}{n!}\\left(h\\frac{\\partial}{\\partial x}+k\\frac{\\partial}{\\partial\n        y}\\right)^n f\\Bigl|_{(x_0,y_0)}}$$\n        The partial sums $T_n$ are the "}
        <em>
          {"$n$-th degree Taylor polynomials"}
        </em>
        {".\n      "}
      </div>
      <div className="note">
        <strong>
          {"Expanding the operator:"}
        </strong>
        {" $(hD_x+kD_y)^2 f = h^2f_{xx}+2hkf_{xy}+k^2f_{yy}$ (by the binomial\n        theorem, since mixed partials are equal by Clairaut's theorem). The pattern continues for higher powers.\n      "}
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Second-degree Taylor polynomial of $f(x,y)=e^x\\cos y$ at $(0,0)$"}
        </div>
        <p>
          {"Find $T_2(x,y)$ and use it to approximate $e^{0.1}\\cos(0.2)$."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"At $(0,0)$: $f=1$. First partials: $f_x=e^x\\cos y\\big|_0=1$; $f_y=-e^x\\sin y\\big|_0=0$."}
          </p>
          <p>
            {"Second partials: $f_{xx}=e^x\\cos y\\big|_0=1$; $f_{xy}=-e^x\\sin y\\big|_0=0$; $f_{yy}=-e^x\\cos y\\big|_0=-1$.\n          "}
          </p>
          <div className="fml">
            {"$$T_2(x,y)=1+x+\\frac{1}{2}(x^2-y^2)=1+x+\\frac{x^2-y^2}{2}$$"}
          </div>
          <p>
            {"Approximation: $e^{0.1}\\cos(0.2)\\approx T_2(0.1,0.2)=1+0.1+\\frac{0.01-0.04}{2}=1.1-0.015=1.085$."}
          </p>
          <p>
            {"Exact: $e^{0.1}\\cos(0.2)\\approx(1.10517)(0.98007)\\approx 1.0827$. The error is $\\approx 0.0023$, consistent\n            with a third-order remainder."}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Taylor expansion of $f(x,y)=\\sin(x+y)$ around $(0,0)$"}
        </div>
        <p>
          {"Write the Taylor series up to third degree."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"Compute all partials at $(0,0)$: $f=\\sin(x+y)$, $f_x=f_y=\\cos(x+y)\\big|_0=1$;\n            $f_{xx}=f_{xy}=f_{yy}=-\\sin(x+y)\\big|_0=0$; $f_{xxx}=f_{xxy}=f_{xyy}=f_{yyy}=-\\cos(x+y)\\big|_0=-1$."}
          </p>
          <div className="fml">
            {"$$T_3(x,y)=(x+y)-\\frac{1}{6}(x^3+3x^2y+3xy^2+y^3)=(x+y)-\\frac{(x+y)^3}{6}$$"}
          </div>
          <p>
            {"This is just the univariate expansion $\\sin u=u-\\tfrac{u^3}{6}+\\cdots$ with $u=x+y$, confirming the\n            formula. The full series is $\\displaystyle\\sum_{n=0}^{\\infty}\\frac{(-1)^n(x+y)^{2n+1}}{(2n+1)!}$."}
          </p>
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">
          {"Example"}
        </div>
        <div className="exm-title">
          {"Taylor polynomial of $f(x,y)=e^{x+2y}$ at $(0,0)$ up to second order"}
        </div>
        <p>
          {"Derive $T_2$ and confirm it matches the product $e^x\\cdot e^{2y}$ expanded term by term."}
        </p>
        <div className="sol">
          <div className="sol-lbl">
            {"Solution"}
          </div>
          <p>
            {"All partials of $e^{x+2y}$ at $(0,0)$: $f=1$; $f_x=1$, $f_y=2$; $f_{xx}=1$, $f_{xy}=2$, $f_{yy}=4$."}
          </p>
          <div className="fml">
            {"$$T_2(x,y)=1+(x+2y)+\\frac{1}{2}(x^2+4xy+4y^2)=1+(x+2y)+\\frac{(x+2y)^2}{2}$$"}
          </div>
          <p>
            {"Cross-check: $e^u\\approx 1+u+u^2/2$ with $u=x+2y$ gives exactly the same result. \u2713"}
          </p>
        </div>
      </div>
      <div className="box thm">
        <div className="box-lbl">
          {"Taylor's Theorem with Remainder (Two Variables)"}
        </div>
        {"\n        If $f$ has continuous partial derivatives up to order $n+1$ on an open set containing the segment from\n        $(x_0,y_0)$ to $(x,y)$, then:\n        $$f(x,y)=T_n(x,y)+R_n(x,y)$$\n        where the remainder is:\n        $$R_n(x,y)=\\frac{1}{(n+1)!}\\left(h\\frac{\\partial}{\\partial x}+k\\frac{\\partial}{\\partial\n        y}\\right)^{n+1}f\\Bigl|_{(x_0+\\xi h,\\,y_0+\\xi k)}$$\n        for some $\\xi\\in(0,1)$ (the multivariate mean value form). In practice, if all $(n+1)$-st partials are bounded\n        by $M$, then:\n        $$|R_n|\\leq \\frac{M}{(n+1)!}(|h|+|k|)^{n+1}$$\n      "}
      </div>
      <div className="note">
        {"\n        The multivariate Taylor series is the engine behind many methods in numerical analysis, physics, and\n        optimization. In optimization, the second-order Taylor expansion\n        $f(\\mathbf{x}_0+\\mathbf{h})\\approx f(\\mathbf{x}_0)+\\nabla f\\cdot\\mathbf{h}+\\tfrac{1}{2}\\mathbf{h}^T\n        H\\,\\mathbf{h}$ (where $H$ is the Hessian matrix) is precisely what gives the second derivative test its power:\n        the sign of the quadratic form $\\mathbf{h}^T H\\,\\mathbf{h}$ determines whether the critical point is a minimum,\n        maximum, or saddle.\n      "}
      </div>
    </section>
  );
}

function SectionS147() {
  return (
    <section className="section" id="s147">
      <div className="sec-badge">
        {"Section"}
      </div>
      <h2 className="sec-title">
        {"Extreme Values and Saddle Points"}
      </h2>
      <p>
        {"This section answers the question: where does a function of two variables attain its maximum or minimum? The\n        theory mirrors single-variable calculus but with an important twist: a critical point in two dimensions can also\n        be a "}
        <strong>
          {"saddle point"}
        </strong>
        {" \u2014 neither a max nor a min \u2014 and distinguishing the three cases requires the\n        "}
        <em>
          {"Second Derivative Test"}
        </em>
        {"."}
      </p>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Local Extrema"}
        </div>
        {"\n        $f$ has a "}
        <em>
          {"local maximum"}
        </em>
        {" at $(a,b)$ if $f(a,b)\\geq f(x,y)$ for all $(x,y)$ sufficiently close to\n        $(a,b)$. It has a "}
        <em>
          {"local minimum"}
        </em>
        {" if $f(a,b)\\leq f(x,y)$ for all such points.\n      "}
      </div>
      <div className="box thm">
        <div className="box-lbl">
          {"Theorem \u2014 Necessary Condition (Critical Points)"}
        </div>
        {"\n        If $f(a,b)$ is a local extremum and $f_x$, $f_y$ exist at $(a,b)$, then $f_x(a,b)=0$ and $f_y(a,b)=0$. Such a\n        point is called a "}
        <strong>
          {"critical point"}
        </strong>
        {".\n      "}
      </div>
      <div className="box def">
        <div className="box-lbl">
          {"Definition \u2014 Saddle Point"}
        </div>
        {"\n        A critical point $(a,b)$ is a "}
        <em>
          {"saddle point"}
        </em>
        {" if every open disk around it contains points where\n        $f>f(a,b)$ and also points where $f<f(a,b)$. The graph looks like a mountain pass: curving upward in one direction and downward in another.\n      "}
      </div>
      <h3 className="subsec">
            {"The First Derivative Test"}
          </h3>
          <p>
            {"In single-variable calculus the first derivative test tells us whether a critical point is a local max,\n            local min, or neither by examining the sign change of $f'$. In two variables, the analogue is to examine how\n            $f$ behaves along every direction emanating from the critical point \u2014 which is exactly what the\n            "}
            <strong>
              {"directional derivative"}
            </strong>
            {" $D_{\\mathbf{u}}f$ tells us."}
          </p>
          <div className="box thm">
            <div className="box-lbl">
              {"Theorem \u2014 First Derivative Test (Two Variables)"}
            </div>
            {"\n            Let $(a,b)$ be a critical point of $f$ (so $\\nabla f(a,b)=\\mathbf{0}$) and suppose $f$ is differentiable in\n            an open disk around $(a,b)$.\n            "}
            <ul>
              <li>
                {"If $f(x,y) \\leq f(a,b)$ for "}
                <em>
                  {"all"}
                </em>
                {" $(x,y)$ near $(a,b)$, then $(a,b)$ is a "}
                <strong>
                  {"local\n                  maximum"}
                </strong>
                {"."}
              </li>
              <li>
                {"If $f(x,y) \\geq f(a,b)$ for "}
                <em>
                  {"all"}
                </em>
                {" $(x,y)$ near $(a,b)$, then $(a,b)$ is a "}
                <strong>
                  {"local\n                  minimum"}
                </strong>
                {"."}
              </li>
              <li>
                {"If in every neighbourhood of $(a,b)$ there exist points where $f > f(a,b)$ "}
                <em>
                  {"and"}
                </em>
                {" points\n                where $f < f(a,b)$, then $(a,b)$ is a "}
                <strong>
                  {"saddle point"}
                </strong>
                {" \u2014 not an extremum."}
              </li>
            </ul>
            {"\n            Because $\\nabla f(a,b)=\\mathbf{0}$, every directional derivative $D_{\\mathbf{u}}f(a,b)=\\nabla\n            f\\cdot\\mathbf{u}=0$. The first-order information alone cannot distinguish the three cases; we must examine\n            how $f$ changes along specific paths by substituting a parametrisation into $f$ and applying the\n            single-variable first derivative test there.\n          "}
          </div>
          <div className="note">
            {"\n            The first derivative test in 2D is a "}
            <em>
              {"diagnostic tool"}
            </em>
            {": by restricting $f$ to carefully chosen curves\n            through $(a,b)$ and checking sign changes of the resulting single-variable function, we can confirm or rule\n            out a local extremum \u2014 especially useful when the Second Derivative Test is inconclusive ($D=0$).\n          "}
          </div>
          <div className="box exm">
            <div className="box-lbl">
              {"Example"}
            </div>
            <div className="exm-title">
              {"Confirming a local minimum via sign analysis along paths"}
            </div>
            <p>
              {"The function $f(x,y)=x^2+y^2$ has a critical point at the origin. Use the first derivative test idea to\n              confirm it is a local minimum."}
            </p>
            <div className="sol">
              <div className="sol-lbl">
                {"Solution"}
              </div>
              <p>
                {"$f_x=2x=0$ and $f_y=2y=0$ only at $(0,0)$, so it is the sole critical point. Now examine $f$ along an\n                arbitrary straight-line path through the origin: let $x=at$, $y=bt$ for constants $a,b$ not both zero.\n                Then:"}
              </p>
              <div className="fml">
                {"$$g(t)=f(at,bt)=a^2t^2+b^2t^2=(a^2+b^2)t^2$$"}
              </div>
              <p>
                {"Since $a^2+b^2>0$, we have $g(t)>0$ for all $t\\neq 0$ and $g(0)=0$. So along every line through\n                the origin, $f$ has a local minimum at $t=0$, i.e. at the origin."}
              </p>
              <p>
                {"More directly: $f(x,y)=x^2+y^2\\geq 0=f(0,0)$ for all $(x,y)$, with equality only at $(0,0)$. This is a\n                "}
                <strong>
                  {"global"}
                </strong>
                {" (and hence local) minimum."}
              </p>
            </div>
          </div>
          <div className="box exm">
            <div className="box-lbl">
              {"Example"}
            </div>
            <div className="exm-title">
              {"Using path restrictions to identify a saddle point"}
            </div>
            <p>
              {"Show that $f(x,y)=x^2-y^2$ has a saddle point at the origin using the first derivative test approach."}
            </p>
            <div className="sol">
              <div className="sol-lbl">
                {"Solution"}
              </div>
              <p>
                {"Critical point: $f_x=2x=0$, $f_y=-2y=0$ gives $(0,0)$. Now test two paths:"}
              </p>
              <p>
                <strong>
                  {"Along the $x$-axis"}
                </strong>
                {" ($y=0$): $g(t)=f(t,0)=t^2$. So $g(t)-g(0)=t^2>0$ for $t\\neq 0$ \u2014\n                $f$ is larger than $f(0,0)=0$ nearby."}
              </p>
              <p>
                <strong>
                  {"Along the $y$-axis"}
                </strong>
                {" ($x=0$): $h(t)=f(0,t)=-t^2$. So $h(t)-h(0)=-t^2<0$ for $t\\neq 0$\n                \u2014 $f$ is smaller than $f(0,0)=0$ nearby."}
              </p>
              <p>
                {"Since $f$ is both above and below $f(0,0)$ in every open disk around the origin, the origin is a\n                "}
                <strong>
                  {"saddle point"}
                </strong>
                {" \u2014 not a local extremum. This is the monkey-saddle cousin: the surface\n                $z=x^2-y^2$ rises along the $x$-direction and falls along the $y$-direction, exactly like a mountain\n                pass."}
              </p>
            </div>
          </div>
          <div className="box exm">
            <div className="box-lbl">
              {"Example"}
            </div>
            <div className="exm-title">
              {"First derivative test when the Second Derivative Test fails ($D=0$)"}
            </div>
            <p>
              {"Classify the critical point at the origin for $f(x,y)=x^4+y^4$ and $g(x,y)=x^4-y^4$, two cases where\n              $D=0$."}
            </p>
            <div className="sol">
              <div className="sol-lbl">
                {"Solution"}
              </div>
              <p>
                <strong>
                  {"Case (a): $f(x,y)=x^4+y^4$."}
                </strong>
                {" $f_x=4x^3=0$, $f_y=4y^3=0$ at $(0,0)$. $f_{xx}=12x^2=0$,\n                $f_{yy}=12y^2=0$, $f_{xy}=0$ at origin, so $D=0$ \u2014 inconclusive. But $f(x,y)=x^4+y^4\\geq 0=f(0,0)$ for\n                all $(x,y)$. So $(0,0)$ is a "}
                <strong>
                  {"local (global) minimum"}
                </strong>
                {"."}
              </p>
              <p>
                <strong>
                  {"Case (b): $g(x,y)=x^4-y^4$."}
                </strong>
                {" Same second derivatives, same $D=0$. But:"}
              </p>
              <p>
                {"Along $y=0$: $g(t,0)=t^4>0$ for $t\\neq 0$. \u00a0Along $x=0$: $g(0,t)=-t^4<0$."}
              </p>
              <p>
                {"$g$ is both above and below $g(0,0)=0$ near the origin, so $(0,0)$ is a "}
                <strong>
                  {"saddle point"}
                </strong>
                {".\n              "}
              </p>
              <p>
                {"These two examples illustrate that when $D=0$, the first derivative test (path-restriction method) is\n                the only tool available to classify the critical point."}
              </p>
            </div>
          </div>
          <h3 className="subsec">
            {"The Second Derivative Test"}
          </h3>
          <div className="box thm">
            <div className="box-lbl">
              {"Theorem \u2014 Second Derivative Test for Two Variables"}
            </div>
            {"\n            Let $(a,b)$ be a critical point of $f$ where $f_{xx}$, $f_{yy}$, $f_{xy}$ are all continuous. Define the\n            "}
            <strong>
              {"Hessian discriminant"}
            </strong>
            {":\n            $$D(a,b)=f_{xx}(a,b)\\,f_{yy}(a,b)-\\bigl[f_{xy}(a,b)\\bigr]^2$$\n            "}
            <ul>
              <li>
                {"$D>0$ and $f_{xx}>0$ \u00a0\u27f9\u00a0 "}
                <strong>
                  {"local minimum"}
                </strong>
              </li>
              <li>
                {"$D>0$ and $f_{xx}"}
                {"<"}
                {"0$ \u00a0\u27f9\u00a0 "}
                <strong>
                  {"local maximum"}
                </strong>
              </li>
              <li>
                {"$D"}
                {"<"}
                {"0$ \u00a0\u27f9\u00a0 "}
                <strong>
                  {"saddle point"}
                </strong>
              </li>
              <li>
                {"$D=0$ \u00a0\u27f9\u00a0 "}
                <strong>
                  {"inconclusive"}
                </strong>
              </li>
            </ul>
          </div>
          <div className="note">
            {"\n            $D$ is the determinant of the $2\\times 2$ Hessian matrix\n            $\\begin{pmatrix}f_{xx}&f_{xy}\\\\f_{yx}&f_{yy}\\end{pmatrix}$. If $D>0$, all directional second derivatives\n            have the same sign (both eigenvalues of the Hessian are positive for a min, negative for a max). If $D"}
            {"<"}
            {"0$,\n              the Hessian has one positive and one negative eigenvalue \u2014 the saddle-point signature. "}
          </div>
          <div className="box exm">
            <div className="box-lbl">
              {"Example"}
            </div>
            <div className="exm-title">
              {"Locating and classifying all critical points"}
            </div>
            <p>
              {"Find and classify all critical points of $f(x,y)=x^3+y^3-3xy$."}
            </p>
            <div className="sol">
              <div className="sol-lbl">
                {"Solution"}
              </div>
              <p>
                <strong>
                  {"Step 1 \u2014 Solve $\\nabla f = \\mathbf{0}$."}
                </strong>
              </p>
              <div className="fml">
                {"$$f_x=3x^2-3y=0\\;\\Rightarrow\\;y=x^2;\\qquad f_y=3y^2-3x=0\\;\\Rightarrow\\;x=y^2$$"}
              </div>
              <p>
                {"Substituting $y=x^2$ into $x=y^2=x^4$: $x(x^3-1)=0$, giving $x=0$ or $x=1$. Critical points:\n                    $(0,0)$ and $(1,1)$."}
              </p>
              <p>
                <strong>
                  {"Step 2 \u2014 Compute $D$."}
                </strong>
                {" $f_{xx}=6x$, $f_{yy}=6y$, $f_{xy}=-3$, so $D=36xy-9$."}
              </p>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>
                        {"Point"}
                      </th>
                      <th>
                        {"$f_{xx}$"}
                      </th>
                      <th>
                        {"$D=36xy-9$"}
                      </th>
                      <th>
                        {"Classification"}
                      </th>
                      <th>
                        {"$f$ value"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {"$(0,0)$"}
                      </td>
                      <td>
                        {"$0$"}
                      </td>
                      <td>
                        {"$-9<0$"}
                      </td>
                      <td>
                        {"Saddle point"}
                      </td>
                      <td>
                        {"$0$"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {"$(1,1)$"}
                      </td>
                      <td>
                        {"$6>0$"}
                      </td>
                      <td>
                        {"$27>0$"}
                      </td>
                      <td>
                        {"Local minimum"}
                      </td>
                      <td>
                        {"$-1$"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                {"At the saddle $(0,0)$: moving along $y=x$ gives $f=2x^3-3x^2$ which has a local max at 0, while\n                    along $y=-x$ gives $f=-3x^2$ with a min. At $(1,1)$: the smallest nearby value of $f$ is $-1$."}
              </p>
            </div>
          </div>
          <div className="box exm">
            <div className="box-lbl">
              {"Example"}
            </div>
            <div className="exm-title">
              {"Multiple critical points \u2014 two maxima and a saddle"}
            </div>
            <p>
              {"Find all critical points of $f(x,y)=4xy-x^4-y^4$."}
            </p>
            <div className="sol">
              <div className="sol-lbl">
                {"Solution"}
              </div>
              <p>
                {"$f_x=4y-4x^3=0\\Rightarrow y=x^3$; $f_y=4x-4y^3=0\\Rightarrow x=y^3$. Substituting: $x=x^9$, so\n                    $x=0,\\pm 1$. Critical points: $(0,0)$, $(1,1)$, $(-1,-1)$."}
              </p>
              <p>
                {"$f_{xx}=-12x^2$, $f_{yy}=-12y^2$, $f_{xy}=4$. $D=144x^2y^2-16$."}
              </p>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>
                        {"Point"}
                      </th>
                      <th>
                        {"$D$"}
                      </th>
                      <th>
                        {"$f_{xx}$"}
                      </th>
                      <th>
                        {"Result"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {"$(0,0)$"}
                      </td>
                      <td>
                        {"$-16<0$"}
                      </td>
                      <td>
                        {"$0$"}
                      </td>
                      <td>
                        {"Saddle point; $f=0$"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {"$(1,1)$"}
                      </td>
                      <td>
                        {"$128>0$"}
                      </td>
                      <td>
                        {"$-12<0$"}
                      </td>
                      <td>
                        {"Local max; $f=2$"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {"$(-1,-1)$"}
                      </td>
                      <td>
                        {"$128>0$"}
                      </td>
                      <td>
                        {"$-12<0$"}
                      </td>
                      <td>
                        {"Local max; $f=2$"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h3 className="subsec">
            {"Absolute Extrema on Closed Bounded Regions"}
          </h3>
          <div className="box thm">
            <div className="box-lbl">
              {"Theorem \u2014 Extreme Value Theorem (2D)"}
            </div>
            {"\n                If $f$ is continuous on a closed bounded set $D\\subset\\mathbb{R}^2$, then $f$ attains its absolute\n                maximum and absolute minimum on $D$. These occur at interior critical points or on the boundary of $D$.\n              "}
          </div>
          <div className="box thm">
            <div className="box-lbl">
              {"Procedure \u2014 Absolute Extrema on Closed Bounded $D$"}
            </div>
            <ul>
              <li>
                <strong>
                  {"Interior:"}
                </strong>
                {" Solve $f_x=0$, $f_y=0$ inside $D$; evaluate $f$ at each solution."}
              </li>
              <li>
                <strong>
                  {"Boundary:"}
                </strong>
                {" On each edge/curve of $\\partial D$, reduce $f$ to a single-variable\n                    function and find its extrema (including endpoints of each edge)."}
              </li>
              <li>
                <strong>
                  {"Compare:"}
                </strong>
                {" The largest candidate value is the absolute max; the smallest is the\n                    absolute min."}
              </li>
            </ul>
          </div>
          <div className="box exm">
            <div className="box-lbl">
              {"Example"}
            </div>
            <div className="exm-title">
              {"Absolute extrema on a rectangle"}
            </div>
            <p>
              {"Find the absolute max and min of $f(x,y)=x^2-2xy+2y$ on $D=[0,3]\\times[0,2]$."}
            </p>
            <div className="sol">
              <div className="sol-lbl">
                {"Solution"}
              </div>
              <p>
                <strong>
                  {"Interior:"}
                </strong>
                {" $f_x=2x-2y=0$, $f_y=-2x+2=0$ gives $x=1$, $y=1$. $f(1,1)=1-2+2=1$."}
              </p>
              <p>
                <strong>
                  {"Edges:"}
                </strong>
              </p>
              <p>
                {"$y=0$, $0\\leq x\\leq 3$: $f=x^2$. Values: $f(0,0)=0$, $f(3,0)=9$."}
              </p>
              <p>
                {"$y=2$, $0\\leq x\\leq 3$: $f=(x-2)^2$. Min at $x=2$: $f=0$; endpoints $f(0,2)=4$, $f(3,2)=1$."}
              </p>
              <p>
                {"$x=0$, $0\\leq y\\leq 2$: $f=2y$. Values: $f(0,0)=0$, $f(0,2)=4$."}
              </p>
              <p>
                {"$x=3$, $0\\leq y\\leq 2$: $f=9-4y$. Values: $f(3,0)=9$, $f(3,2)=1$."}
              </p>
              <div className="fml">
                {"$$\\text{Absolute max} = 9 \\text{ at }(3,0);\\qquad \\text{Absolute min}=0\\text{ at\n                    }(0,0)\\text{ and }(2,2)$$"}
              </div>
            </div>
          </div>
          <div className="box exm">
            <div className="box-lbl">
              {"Example"}
            </div>
            <div className="exm-title">
              {"Absolute extrema on a triangle"}
            </div>
            <p>
              {"Find absolute extrema of $f(x,y)=2+2x+2y-x^2-y^2$ on the triangle with vertices $O(0,0)$, $A(2,0)$,\n                  $B(0,2)$."}
            </p>
            <div className="sol">
              <div className="sol-lbl">
                {"Solution"}
              </div>
              <p>
                <strong>
                  {"Interior:"}
                </strong>
                {" $f_x=2-2x=0$, $f_y=2-2y=0$ gives $(1,1)$ (inside triangle since $1+1\\leq\n                    2$). $f(1,1)=4$."}
              </p>
              <p>
                <strong>
                  {"Edge $OA$ ($y=0$, $0\\leq x\\leq 2$):"}
                </strong>
                {" $f=2+2x-x^2=-(x-1)^2+3$. Max $=3$ at $x=1$;\n                    endpoints: $f(0,0)=2$, $f(2,0)=2$."}
              </p>
              <p>
                <strong>
                  {"Edge $OB$ ($x=0$, $0\\leq y\\leq 2$):"}
                </strong>
                {" $f=2+2y-y^2=-(y-1)^2+3$. Max $=3$ at $y=1$;\n                    endpoints: same."}
              </p>
              <p>
                <strong>
                  {"Edge $AB$ ($y=2-x$, $0\\leq x\\leq 2$):"}
                </strong>
                {" $f=2x(2-x)=4x-2x^2$. Max at $x=1$: $f=2$.\n                    Endpoints: $f(2,0)=f(0,2)=0$."}
              </p>
              <div className="fml">
                {"$$\\text{Absolute max}=4\\text{ at }(1,1);\\qquad\\text{Absolute min}=0\\text{ at\n                    }A(2,0)\\text{ and }B(0,2)$$"}
              </div>
            </div>
          </div>
          <div className="box exm">
            <div className="box-lbl">
              {"Example"}
            </div>
            <div className="exm-title">
              {"Applied optimization \u2014 open-top box with minimum material"}
            </div>
            <p>
              {"Design an open-top rectangular box with volume $V=32$ ft$^3$ using the least possible surface area.\n                  Let $x,y$ be base dimensions and $z$ be height."}
            </p>
            <div className="sol">
              <div className="sol-lbl">
                {"Solution"}
              </div>
              <p>
                {"Constraint: $xyz=32\\Rightarrow z=32/(xy)$. Surface area to minimize:"}
              </p>
              <div className="fml">
                {"$$S(x,y)=xy+2xz+2yz=xy+\\frac{64}{y}+\\frac{64}{x}$$"}
              </div>
              <p>
                {"Setting $S_x=y-64/x^2=0$ and $S_y=x-64/y^2=0$ gives $x^2y=64$ and $xy^2=64$. Dividing: $x=y$, so\n                    $x^3=64$, hence $x=y=4$ ft, $z=2$ ft."}
              </p>
              <p>
                {"Confirming minimum: $D=S_{xx}S_{yy}-S_{xy}^2=\\tfrac{128}{x^3}\\cdot\\tfrac{128}{y^3}-1=4-1=3>0$,\n                    $S_{xx}=\\tfrac{128}{64}=2>0$. \u2713"}
              </p>
              <div className="fml">
                {"$$S_{\\min}=16+16+16=48\\text{ ft}^2\\quad\\text{at }x=y=4\\text{ ft},\\;z=2\\text{ ft}$$\n                  "}
              </div>
              <p>
                {"The optimal box has a square base of side 4 ft and height 2 ft \u2014 the base side is twice the height.\n                  "}
              </p>
            </div>
          </div>
          <div className="box exm">
            <div className="box-lbl">
              {"Example"}
            </div>
            <div className="exm-title">
              {"Least-squares regression line \u2014 a classical optimization"}
            </div>
            <p>
              {"Given data points $(x_1,y_1),\\ldots,(x_n,y_n)$, find the line $y=mx+b$ minimising the sum of squared\n                  residuals $S(m,b)=\\sum_{i=1}^n(y_i-mx_i-b)^2$."}
            </p>
            <div className="sol">
              <div className="sol-lbl">
                {"Solution"}
              </div>
              <p>
                {"Setting $\\partial S/\\partial m=0$ and $\\partial S/\\partial b=0$:"}
              </p>
              <div className="fml">
                {"$$\\frac{\\partial S}{\\partial\n                    b}=-2\\sum(y_i-mx_i-b)=0\\;\\Rightarrow\\;\\bar{y}=m\\bar{x}+b$$"}
              </div>
              <div className="fml">
                {"$$\\frac{\\partial S}{\\partial m}=-2\\sum x_i(y_i-mx_i-b)=0\\;\\Rightarrow\\;m=\\frac{\\sum\n                    x_iy_i-n\\bar{x}\\bar{y}}{\\sum x_i^2-n\\bar{x}^2}$$"}
              </div>
              <p>
                {"The Hessian discriminant $D=4n\\sum x_i^2-4(\\sum x_i)^2>0$ by the Cauchy-Schwarz inequality (for\n                    non-constant $x_i$), confirming a global minimum. This is the standard least-squares regression\n                    formula derived entirely using partial derivatives."}
              </p>
            </div>
          </div>
    </section>
  );
}

function SectionSummary() {
  return (
    <section className="section" id="summary">
      <div className="sec-badge">
        {"Summary"}
      </div>
      <h2 className="sec-title">
        {"Key Formulas at a Glance"}
      </h2>
      <div className="sum-grid">
        <div className="sum-card">
          <div className="sc-lbl">
            {"Partial derivative (definition)"}
          </div>
          <p>
            {"$f_x = \\lim_{h\\to 0}\\dfrac{f(x+h,y)-f(x,y)}{h}$"}
          </p>
        </div>
        <div className="sum-card">
          <div className="sc-lbl">
            {"Gradient"}
          </div>
          <p>
            {"$\\nabla f = \\langle f_x, f_y\\rangle$ \u00a0(or $\\langle f_x,f_y,f_z\\rangle$ in 3D)"}
          </p>
        </div>
        <div className="sum-card">
          <div className="sc-lbl">
            {"Directional derivative"}
          </div>
          <p>
            {"$D_{\\mathbf{u}}f = \\nabla f\\cdot\\mathbf{u}$, \u00a0 $|\\mathbf{u}|=1$"}
          </p>
        </div>
        <div className="sum-card">
          <div className="sc-lbl">
            {"Chain rule (one parameter)"}
          </div>
          <p>
            {"$\\dfrac{dz}{dt}=f_x\\dfrac{dx}{dt}+f_y\\dfrac{dy}{dt}$"}
          </p>
        </div>
        <div className="sum-card">
          <div className="sc-lbl">
            {"Implicit differentiation"}
          </div>
          <p>
            {"$\\dfrac{dy}{dx}=-\\dfrac{F_x}{F_y}$; \u00a0 $\\dfrac{\\partial z}{\\partial x}=-\\dfrac{F_x}{F_z}$"}
          </p>
        </div>
        <div className="sum-card">
          <div className="sc-lbl">
            {"Tangent plane to $z=f(x,y)$"}
          </div>
          <p>
            {"$z-z_0=f_x(x-x_0)+f_y(y-y_0)$"}
          </p>
        </div>
        <div className="sum-card">
          <div className="sc-lbl">
            {"Total differential"}
          </div>
          <p>
            {"$df=f_x\\,dx+f_y\\,dy$"}
          </p>
        </div>
        <div className="sum-card">
          <div className="sc-lbl">
            {"Hessian discriminant"}
          </div>
          <p>
            {"$D=f_{xx}f_{yy}-f_{xy}^2$"}
          </p>
        </div>
        <div className="sum-card">
          <div className="sc-lbl">
            {"Clairaut's theorem"}
          </div>
          <p>
            {"$f_{xy}=f_{yx}$ \u00a0(under continuity)"}
          </p>
        </div>
        <div className="sum-card">
          <div className="sc-lbl">
            {"Max rate of increase"}
          </div>
          <p>
            {"$|\\nabla f|$ in direction $\\hat{\\nabla}f=\\nabla f/|\\nabla f|$"}
          </p>
        </div>
      </div>
      <div className="note">
        <strong>
          {"The unifying thread here is the gradient $\\nabla f$."}
        </strong>
        {" It is simultaneously: the vector\n        of all partial derivatives, the direction of fastest increase, the normal to level curves and surfaces, the key\n        ingredient in the chain rule ($dz/dt=\\nabla f\\cdot\\mathbf{r}'$), and the tool that builds tangent planes. Every\n        major result in later sections either defines or uses $\\nabla f$.\n      "}
      </div>
    </section>
  );
}

function SectionRealWorld() {
  return (
    <section className="section" id="pd-real-world">
      <div className="sec-badge">{"Applications"}</div>
      <h2 className="sec-title">{"Where This Shows Up in Real Life"}</h2>
      <div className="box def">
        <div className="box-lbl">{"Real-World Use"}</div>
        <p>
          {"Partial derivatives and gradients aren't just textbook exercises \u2014 they're the working machinery behind everyday technology. A weather app's "}
          <strong>{"heat map"}</strong>
          {" is literally a function of two variables (latitude, longitude), and the gradient at any point tells meteorologists the direction and rate of fastest temperature change \u2014 exactly the $\\nabla f$ we computed in this guide."}
        </p>
        <p>
          {"Surveying and GPS terrain-fitting software uses partial derivatives to build smooth elevation models from scattered sensor readings, finding the best-fit surface the same way we found tangent planes. And in "}
          <strong>{"machine learning"}</strong>
          {", the gradient descent algorithm that trains nearly every modern AI model is nothing more than repeatedly stepping in the direction of $-\\nabla f$ \u2014 steepest descent \u2014 across a loss function with thousands or millions of variables instead of just two."}
        </p>
      </div>
    </section>
  );
}

function GuideFooter() {
  return (
    <footer className="pg-foot">
      {"\n      Partial Derivatives \u00b7 Rendered with MathJax 3\n    "}
    </footer>
  );
}

function GuideSidebarPart1() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-sub">Multivariable Calculus</div>
        <div className="sb-title">Partial Derivatives · Part 1</div>
      </div>
      <div className="sb-group">Sections</div>
      <a className="sb-link" href="#s141">Functions of Several Variables</a>
      <a className="sb-link" href="#s142">Limits &amp; Continuity</a>
      <a className="sb-link" href="#s143">Partial Derivatives</a>
      <div className="sb-group">Reference</div>
      <a className="sb-link" href="#summary1"><span className="sn">—</span>Key Formulas</a>
    </nav>
  );
}

function GuideSidebarPart2() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-sub">Multivariable Calculus</div>
        <div className="sb-title">Partial Derivatives · Part 2</div>
      </div>
      <div className="sb-group">Sections</div>
      <a className="sb-link" href="#s144">The Chain Rule</a>
      <a className="sb-link" href="#s145">Directional Derivatives</a>
      <a className="sb-link" href="#s146">Tangent Planes</a>
      <a className="sb-link" href="#s147">Extreme Values</a>
      <div className="sb-group">Reference</div>
      <a className="sb-link" href="#summary"><span className="sn">—</span>Key Formulas</a>
    </nav>
  );
}

function GuideHeaderPart1() {
  return (
    <header className="ch-hdr">
      <div className="ch-eye">Multivariable Calculus Study Guide · Part 1 of 2</div>
      <h1 className="ch-title">Partial Derivatives</h1>
      <p className="ch-sub">Functions of Several Variables, Limits, Continuity &amp; Partial Derivatives</p>
      <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
    </header>
  );
}

function GuideHeaderPart2() {
  return (
    <header className="ch-hdr">
      <div className="ch-eye">Multivariable Calculus Study Guide · Part 2 of 2</div>
      <h1 className="ch-title">Partial Derivatives</h1>
      <p className="ch-sub">Chain Rule, Directional Derivatives, Tangent Planes &amp; Extreme Values</p>
      <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
    </header>
  );
}

function TableOfContentsPart1() {
  return (
    <nav className="toc">
      <div className="toc-h">Contents — Part 1 of 2</div>
      <div className="toc-grid">
        <a className="toc-a" href="#s141">Functions of Several Variables</a>
        <a className="toc-a" href="#s142">Limits and Continuity</a>
        <a className="toc-a" href="#s143">Partial Derivatives</a>
        <a className="toc-a" href="#summary1"><span className="tn">—</span>Key Formulas</a>
      </div>
    </nav>
  );
}

function TableOfContentsPart2() {
  return (
    <nav className="toc">
      <div className="toc-h">Contents — Part 2 of 2</div>
      <div className="toc-grid">
        <a className="toc-a" href="#s144">The Chain Rule</a>
        <a className="toc-a" href="#s145">Directional Derivatives &amp; Gradient</a>
        <a className="toc-a" href="#s146">Tangent Planes &amp; Differentials</a>
        <a className="toc-a" href="#s147">Extreme Values &amp; Saddle Points</a>
        <a className="toc-a" href="#summary"><span className="tn">—</span>Key Formulas</a>
      </div>
    </nav>
  );
}

function PartialDerivativesContent({ part = 1 }) {
  if (part === 1) {
    return (
      <>
        <GuideSidebarPart1 />
        <main className="main">
          <GuideHeaderPart1 />
          <TableOfContentsPart1 />
          <OpeningNote />
          <Divider />
          <SectionS141 />
          <GuideMcqSection id="mcq141" badge="Practice" title="Functions of Several Variables — Quiz" scoreId="score141" section="141" questions={MV_141_QUIZ} />
          <Divider />
          <SectionS142 />
          <GuideMcqSection id="mcq142" badge="Practice" title="Limits and Continuity — Quiz" scoreId="score142" section="142" questions={MV_142_QUIZ} />
          <Divider />
          <SectionS143 />
          <Divider />
          <GuideMcqSection id="mcq143" badge="Practice" title="Partial Derivatives — Quiz" scoreId="score143" section="143" questions={MV_143_QUIZ} />
          <Divider />
          <PartialsExtendedPart1 />
          <MvCertificateBoost topic="partial" part={1} />
          <RealLifeUse>
            Partial derivatives power weather models, finance Greeks, and machine-learning gradients — anytime a quantity depends on several inputs and you ask what happens if one input shifts.
          </RealLifeUse>

          <section id="summary1" className="section">
            <div className="sec-badge">Reference</div>
            <h2 className="sec-title">Part 1 Key Formulas</h2>
            <p>Continue to <a href="/partial-derivatives/2" style={{color:"var(--gold)",fontWeight:600}}>Part 2</a> for Chain Rule, Directional Derivatives, Tangent Planes, and Extreme Values.</p>
          </section>
          <GuideFooter />
        </main>
      </>
    );
  }

  return (
    <>
      <GuideSidebarPart2 />
      <main className="main">
        <GuideHeaderPart2 />
        <TableOfContentsPart2 />
        <Divider />
        <SectionS144 />
        <Divider />
        <SectionS145 />
        <Divider />
        <SectionS146 />
        <Divider />
        <SectionS147 />
        <Divider />
        <SectionSummary />
        <Divider />
        <GuideMcqSection id="mcq144" badge="Practice" title="Chain Rule — Quiz" scoreId="score144" section="144" questions={MV_144_QUIZ} />
        <Divider />
        <GuideMcqSection id="mcq145" badge="Practice" title="Directional Derivatives and Gradient — Quiz" scoreId="score145" section="145" questions={MV_145_QUIZ} />
        <Divider />
        <GuideMcqSection id="mcq146" badge="Practice" title="Tangent Planes and Differentials — Quiz" scoreId="score146" section="146" questions={MV_146_QUIZ} />
        <Divider />
        <GuideMcqSection id="mcq147" badge="Practice" title="Extreme Values — Quiz" scoreId="score147" section="147" questions={MV_147_QUIZ} />
        <Divider />
        <PartialsExtendedPart2 />
        <Divider />
        <MvCertificateBoost topic="partial" part={2} />
        <Divider />
        <SectionRealWorld />
        <GuideFooter />
      </main>
    </>
  );
}

function PartialDerivativesGuide({ part = 1 }) {
  return (
    <StudyGuideShell
      guideClass="partial-derivatives-guide"
      title={`Partial Derivatives — Part ${part}`}
    >
      <PartialDerivativesContent part={part} />
    </StudyGuideShell>
  );
}

export default PartialDerivativesGuide;
