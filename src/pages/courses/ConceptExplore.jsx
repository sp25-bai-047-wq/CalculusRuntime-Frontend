import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BlockMath, InlineMath } from "../../components/Math";
import { conceptGroups, getConceptSlug } from "./SimpleConcepts";
import "./ConceptExplore.css";

const conceptDetails = {
  "dimension-theory-of-real-valued-functions": {
    formula: "f:\\mathbb{R}^n\\to\\mathbb{R}",
    examples: [
      { label: "One input", math: "f(x)=x^2", note: "The input moves along a line, while the output is one real number." },
      { label: "Two inputs", math: "f(x,y)=x^2+y^2", note: "The input lives in a plane, and the output can be drawn as height." },
      { label: "Three inputs", math: "f(x,y,z)=x+y-z", note: "The input lives in space, while the output is still a single value." },
    ],
    checks: ["Count the input variables first.", "Remember that the output can still be one number.", "Read the graph as a model of input space plus value."],
  },
  "continuity-using-the-epsilon-delta-idea": {
    formula: "\\forall\\varepsilon>0\\;\\exists\\delta>0\\;\\text{ such that }\\;0<|x-a|<\\delta\\Rightarrow |f(x)-f(a)|<\\varepsilon",
    examples: [
      { label: "Goal", math: "|f(x)-f(a)|<\\varepsilon", note: "Choose the output error you are willing to tolerate around the actual function value." },
      { label: "Control", math: "|x-a|<\\delta", note: "Find how close the input must stay to keep the output inside the epsilon window." },
      { label: "Conclusion", math: "\\lim_{x\\to a}f(x)=f(a)", note: "Every close enough input gives a close enough output, and the limit agrees with the value." },
    ],
    checks: ["Start with the output tolerance.", "Work backward to an input distance.", "The same delta must protect every nearby input.", "Check that the function value exists and matches the limit."],
    deepDive: [
      {
        title: "The Basic Promise",
        body: "Continuity is not just a graph that looks unbroken. It is a guarantee of control: if someone demands the output stay inside any tiny error band, you can choose an input band small enough to force that result.",
        math: "\\varepsilon\\text{ controls output error, while }\\delta\\text{ controls input distance.}",
      },
      {
        title: "A Clean Proof Example",
        body: "For f(x)=2x+1 at a=3, compare the output error with the input error. Once the output error becomes 2|x-3|, the right delta choice is visible.",
        math: "|f(x)-f(3)|=|(2x+1)-7|=2|x-3|,\\quad \\delta=\\frac{\\varepsilon}{2}",
      },
      {
        title: "Why Jumps Fail",
        body: "A jump discontinuity fails because one side of the point refuses to stay close to the function value. No matter how small delta becomes, bad nearby inputs still exist.",
        math: "f(x)=\\begin{cases}0,&x<0\\\\1,&x\\ge 0\\end{cases}\\quad\\text{fails at }x=0",
      },
      {
        title: "Advanced Multivariable Version",
        body: "For f(x,y), closeness is measured by distance in the plane. Every approach direction must obey the same epsilon promise; checking one path is not enough.",
        math: "\\sqrt{(x-a)^2+(y-b)^2}<\\delta\\Rightarrow |f(x,y)-f(a,b)|<\\varepsilon",
      },
    ],
    proofSteps: [
      "Write the output error |f(x)-f(a)|.",
      "Simplify until the expression contains |x-a|.",
      "Choose delta in terms of epsilon.",
      "Show that |x-a|<delta forces |f(x)-f(a)|<epsilon.",
    ],
    conditions: [
      "f(a) must be defined.",
      "The limit as x approaches a must exist.",
      "The limit must equal the actual function value.",
    ],
  },
  "differentiability-in-one-variable": {
    formula: "f(a+h)\\approx f(a)+f'(a)h",
    examples: [
      { label: "Smooth curve", math: "f'(a)\\text{ exists}", note: "A tangent line gives a reliable local picture." },
      { label: "Corner", math: "f'_-(a)\\ne f'_+(a)", note: "The left and right slopes disagree, so differentiability fails." },
      { label: "Local estimate", math: "\\Delta f\\approx f'(a)\\Delta x", note: "Use the slope to estimate a tiny change." },
    ],
    checks: ["Look for one clear tangent direction.", "Corners and cusps usually break differentiability.", "Differentiability is stronger than continuity."],
  },
  "tangent-lines-and-extreme-values": {
    formula: "y-f(a)=f'(a)(x-a)",
    examples: [
      { label: "Stationary point", math: "f'(x)=0", note: "A flat tangent is a candidate for a local high or low." },
      { label: "Endpoint", math: "x=a\\text{ or }x=b", note: "Closed intervals can have extreme values at their ends." },
      { label: "Corner", math: "f'(x)\\text{ DNE}", note: "Nondifferentiable points can also be candidates." },
    ],
    checks: ["List critical points.", "Include endpoints when the interval is closed.", "Compare function values, not just slopes."],
  },
  "what-a-quadric-surface-is": {
    formula: "Ax^2+By^2+Cz^2+Dxy+Exz+Fyz+Gx+Hy+Iz+J=0",
    examples: [
      { label: "Squared terms", math: "x^2,y^2,z^2", note: "The squared variables tell you it belongs to the quadric family." },
      { label: "Signs", math: "x^2+y^2-z^2=1", note: "Mixed signs usually mean a hyperboloid-style surface." },
      { label: "Missing variable", math: "x^2+y^2=9", note: "A missing variable often stretches the curve into a cylinder." },
    ],
    checks: ["Identify which variables are squared.", "Compare the signs of the squared terms.", "Notice any missing variable."],
  },
  ellipsoids: {
    formula: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1",
    examples: [
      { label: "Sphere", math: "x^2+y^2+z^2=r^2", note: "All directions have the same radius." },
      { label: "Stretched", math: "\\frac{x^2}{9}+\\frac{y^2}{4}+z^2=1", note: "Different denominators stretch the surface along different axes." },
      { label: "Closed surface", math: "+,+,+", note: "All squared terms are positive and equal to a constant." },
    ],
    checks: ["All three squared terms are present.", "All signs are positive.", "The surface is bounded in every direction."],
  },
  hyperboloids: {
    formula: "\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=1",
    examples: [
      { label: "One sheet", math: "+,+,-=1", note: "Two positive squared terms usually give one connected surface." },
      { label: "Two sheets", math: "+,-,-=1", note: "One positive squared term usually splits the surface into two parts." },
      { label: "Axis", math: "\\text{negative term marks the opening axis}", note: "The sign pattern helps you find the direction." },
    ],
    checks: ["Count the positive and negative squared terms.", "Use the lone sign to find the axis.", "Do not expect a closed surface."],
  },
  cylinders: {
    formula: "x^2+y^2=9",
    examples: [
      { label: "Circular", math: "x^2+y^2=9", note: "Because z is missing, the circle extends along the z-axis." },
      { label: "Parabolic", math: "y=x^2", note: "A plane curve can extend into a cylinder when another variable is absent." },
      { label: "Axis", math: "z\\text{ missing}", note: "The missing variable names the direction of extension." },
    ],
    checks: ["Find the missing variable.", "Sketch the 2D curve first.", "Extend that curve along the missing direction."],
  },
  paraboloids: {
    formula: "z=x^2+y^2",
    examples: [
      { label: "Elliptic", math: "z=x^2+y^2", note: "Both squared terms lift in the same direction, creating a bowl." },
      { label: "Hyperbolic", math: "z=x^2-y^2", note: "Opposite signs create a saddle." },
      { label: "Opening", math: "x^2+y^2=z", note: "The first-power variable usually names the opening direction." },
    ],
    checks: ["Find the first-power variable.", "Compare signs on the squared terms.", "Same signs make a bowl; opposite signs make a saddle."],
  },
  "functions-of-several-variables": {
    formula: "z=f(x,y)",
    examples: [
      { label: "Height map", math: "f(x,y)=x^2+y^2", note: "Each point in the xy-plane receives one height." },
      { label: "Temperature", math: "T(x,y,z)", note: "Each point in space receives one temperature value." },
      { label: "Level set", math: "f(x,y)=c", note: "Fixing the output shows where the function has one value." },
    ],
    checks: ["Separate inputs from output.", "Use context to name what the output measures.", "Level sets help visualize higher-dimensional inputs."],
  },
  "limits-in-higher-dimensions": {
    formula: "\\lim_{(x,y)\\to(a,b)}f(x,y)=L",
    examples: [
      { label: "Path one", math: "y=0", note: "A single path can support a guess, but it cannot prove the limit alone." },
      { label: "Path two", math: "y=x", note: "A different answer on a different path proves the limit does not exist." },
      { label: "All paths", math: "f(x,y)\\to L", note: "The limit exists only when every approach agrees." },
    ],
    checks: ["Test simple paths first.", "One disagreement disproves the limit.", "Use bounds when paths keep agreeing."],
  },
  "continuity-in-higher-dimensions": {
    formula: "\\lim_{(x,y)\\to(a,b)}f(x,y)=f(a,b)",
    examples: [
      { label: "No break", math: "f(a,b)\\text{ defined}", note: "The function needs an actual value at the point." },
      { label: "Approach", math: "\\lim f=L", note: "Nearby points must approach one shared value." },
      { label: "Match", math: "L=f(a,b)", note: "The approached value must equal the function value." },
    ],
    checks: ["Check the function value exists.", "Check the limit exists.", "Compare those two values."],
  },
  "linearization-and-differentials": {
    formula: "L(x,y)=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)",
    examples: [
      { label: "Base point", math: "(a,b)", note: "Approximation is best near the point where it is built." },
      { label: "Small change", math: "df=f_x\\,dx+f_y\\,dy", note: "Differentials estimate how much the output changes." },
      { label: "Plane model", math: "z=L(x,y)", note: "The tangent plane acts as the local calculator." },
    ],
    checks: ["Pick a nearby base point.", "Compute the partial derivatives there.", "Use only small input changes."],
  },
  "taylor-series-in-one-and-two-variables": {
    formula: "f(a+h,b+k)\\approx f(a,b)+f_xh+f_yk+\\frac12(f_{xx}h^2+2f_{xy}hk+f_{yy}k^2)",
    examples: [
      { label: "First order", math: "f(a)+f'(a)h", note: "Linear information gives a tangent approximation." },
      { label: "Second order", math: "\\frac12 f''(a)h^2", note: "Curvature improves the local model." },
      { label: "Two variables", math: "h=x-a,\\ k=y-b", note: "Small moves in each input direction are combined." },
    ],
    checks: ["Choose the center point.", "Decide how many derivative terms to keep.", "Use it only near the center."],
  },
  "partial-derivatives": {
    formula: "f_x=\\frac{\\partial f}{\\partial x},\\quad f_y=\\frac{\\partial f}{\\partial y}",
    examples: [
      { label: "Hold y fixed", math: "f_x", note: "Move only in the x direction." },
      { label: "Hold x fixed", math: "f_y", note: "Move only in the y direction." },
      { label: "Surface slope", math: "\\nabla f=(f_x,f_y)", note: "Partial derivatives are the pieces of the gradient." },
    ],
    checks: ["Choose one variable to change.", "Treat the others as constants.", "Different partials answer different direction questions."],
  },
  "chain-rule": {
    formula: "\\frac{df}{dt}=f_x\\frac{dx}{dt}+f_y\\frac{dy}{dt}",
    examples: [
      { label: "Inputs move", math: "x=x(t),\\ y=y(t)", note: "The inputs change because another variable changes." },
      { label: "Function reacts", math: "f(x(t),y(t))", note: "The output changes through every input path." },
      { label: "Add rates", math: "f_xx'+f_yy'", note: "Each route contributes part of the total rate." },
    ],
    checks: ["Draw which variables depend on which.", "Differentiate each route.", "Add all routes that reach the output."],
  },
  "directional-derivative": {
    formula: "D_{\\mathbf{u}}f=\\nabla f\\cdot\\mathbf{u}",
    examples: [
      { label: "Unit direction", math: "\\|\\mathbf{u}\\|=1", note: "Direction vectors must be unit length for the rate to be measured correctly." },
      { label: "Fastest increase", math: "\\mathbf{u}=\\frac{\\nabla f}{\\|\\nabla f\\|}", note: "The gradient direction gives the biggest positive rate." },
      { label: "Flat movement", math: "\\nabla f\\cdot\\mathbf{u}=0", note: "Perpendicular directions do not change the value to first order." },
    ],
    checks: ["Normalize the direction vector.", "Compute the gradient.", "Take the dot product."],
  },
  "gradient-vector": {
    formula: "\\nabla f=\\langle f_x,f_y,f_z\\rangle",
    examples: [
      { label: "Fastest rise", math: "\\nabla f", note: "The vector points uphill fastest." },
      { label: "Magnitude", math: "\\|\\nabla f\\|", note: "The length tells how strong the steepest rate is." },
      { label: "Level curves", math: "\\nabla f\\perp f(x,y)=c", note: "The gradient is perpendicular to level curves." },
    ],
    checks: ["Collect all first partial derivatives.", "Evaluate them at the point.", "Use direction and length separately."],
  },
  "tangent-planes-and-differentials": {
    formula: "z-z_0=f_x(a,b)(x-a)+f_y(a,b)(y-b)",
    examples: [
      { label: "Point", math: "(a,b,f(a,b))", note: "The plane must touch the surface at the point." },
      { label: "Slopes", math: "f_x(a,b),f_y(a,b)", note: "The two partials tilt the plane in x and y directions." },
      { label: "Estimate", math: "dz=f_xdx+f_ydy", note: "The plane estimates nearby changes." },
    ],
    checks: ["Find the point on the surface.", "Compute both partial derivatives.", "Build the plane from point plus slopes."],
  },
  "extreme-values-and-saddle-points": {
    formula: "D=f_{xx}f_{yy}-(f_{xy})^2",
    examples: [
      { label: "Local min", math: "D>0,\\ f_{xx}>0", note: "The surface bends upward in both main directions." },
      { label: "Local max", math: "D>0,\\ f_{xx}<0", note: "The surface bends downward in both main directions." },
      { label: "Saddle", math: "D<0", note: "The surface rises one way and falls another." },
    ],
    checks: ["Solve for critical points.", "Compute the second derivative test.", "Classify each point separately."],
  },
  "riemann-sums": {
    formula: "\\sum f(x_i^*,y_i^*)\\Delta A_i",
    examples: [
      { label: "Partition", math: "\\Delta A", note: "Break the region into many small pieces." },
      { label: "Sample", math: "f(x_i^*,y_i^*)", note: "Choose one height or value from each piece." },
      { label: "Limit", math: "\\iint_R f\\,dA", note: "As pieces shrink, the sum becomes an integral." },
    ],
    checks: ["Divide the region.", "Multiply each sample value by area.", "Add and then take the shrinking-piece limit."],
  },
  "double-integrals-over-rectangles": {
    formula: "\\int_a^b\\int_c^d f(x,y)\\,dy\\,dx",
    examples: [
      { label: "Rectangle", math: "a\\le x\\le b,\\ c\\le y\\le d", note: "Bounds are constants for rectangular regions." },
      { label: "Volume", math: "f(x,y)\\ge0", note: "Positive height over area accumulates volume." },
      { label: "Order", math: "dy\\,dx", note: "The inside differential is integrated first." },
    ],
    checks: ["Confirm the region is rectangular.", "Choose an integration order.", "Use constant bounds for both variables."],
  },
  "iterated-integrals": {
    formula: "\\int_a^b\\left(\\int_{g_1(x)}^{g_2(x)} f(x,y)\\,dy\\right)dx",
    examples: [
      { label: "Inner integral", math: "\\int f(x,y)\\,dy", note: "Treat x as constant while integrating with respect to y." },
      { label: "Outer integral", math: "\\int (\\text{inner result})\\,dx", note: "Then accumulate the remaining function of x." },
      { label: "Switch order", math: "dx\\,dy", note: "Changing order may require rewriting the region." },
    ],
    checks: ["Read the inside integral first.", "Hold other variables constant.", "Make bounds match the chosen order."],
  },
  "double-integrals-over-general-regions": {
    formula: "\\iint_R f(x,y)\\,dA",
    examples: [
      { label: "Type I", math: "g_1(x)\\le y\\le g_2(x)", note: "Vertical slices make y bounds depend on x." },
      { label: "Type II", math: "h_1(y)\\le x\\le h_2(y)", note: "Horizontal slices make x bounds depend on y." },
      { label: "Split", math: "R=R_1\\cup R_2", note: "Awkward regions may need more than one integral." },
    ],
    checks: ["Sketch the region.", "Choose vertical or horizontal slices.", "Split the region if one set of bounds is messy."],
  },
  "area-by-double-integration": {
    formula: "\\text{Area}(R)=\\iint_R 1\\,dA",
    examples: [
      { label: "Rectangle", math: "\\int_a^b\\int_c^d 1\\,dy\\,dx", note: "Integrating one just counts area." },
      { label: "Curved region", math: "\\int_a^b(g_2(x)-g_1(x))\\,dx", note: "The inner integral measures slice height." },
      { label: "Polar area", math: "\\int\\int r\\,dr\\,d\\theta", note: "In polar form, the area element includes r." },
    ],
    checks: ["Use integrand one.", "Make bounds describe only the region.", "Remember the polar factor r when needed."],
  },
  "double-integrals-in-polar-form": {
    formula: "\\iint_R f(x,y)\\,dA=\\int_\\alpha^\\beta\\int_{r_1}^{r_2}f(r\\cos\\theta,r\\sin\\theta)r\\,dr\\,d\\theta",
    examples: [
      { label: "Coordinates", math: "x=r\\cos\\theta,\\ y=r\\sin\\theta", note: "Convert x and y before integrating." },
      { label: "Area element", math: "dA=r\\,dr\\,d\\theta", note: "The extra r accounts for widening circular arcs." },
      { label: "Circle", math: "0\\le r\\le a", note: "Circular regions often become simpler in polar form." },
    ],
    checks: ["Use polar when circles or angles dominate.", "Convert the integrand.", "Include the extra r."],
  },
  "triple-integrals-in-rectangular-coordinates": {
    formula: "\\iiint_E f(x,y,z)\\,dV",
    examples: [
      { label: "Box", math: "\\int_a^b\\int_c^d\\int_e^f", note: "A rectangular solid uses constant bounds." },
      { label: "Mass", math: "\\iiint_E \\rho\\,dV", note: "Density accumulated over volume gives mass." },
      { label: "Volume", math: "\\iiint_E 1\\,dV", note: "Integrating one counts the volume of the solid." },
    ],
    checks: ["Describe the solid first.", "Pick an order for x, y, and z.", "Use integrand one for volume or density for mass."],
  },
};

function flattenConcepts() {
  return conceptGroups.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      groupKicker: group.kicker,
      groupTitle: group.title,
      slug: getConceptSlug(item.title),
    }))
  );
}

function ConceptExplore() {
  const { slug } = useParams();
  const concepts = useMemo(() => flattenConcepts(), []);
  const concept = concepts.find((item) => item.slug === slug);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [showChecks, setShowChecks] = useState(false);

  if (!concept) {
    return <Navigate to="/simple-concepts" replace />;
  }

  const detail = conceptDetails[concept.slug] || {
    formula: "",
    examples: [
      {
        label: "Main idea",
        math: "",
        note: "Read the concept slowly, then connect each sentence to a graph, formula, or calculation you already know.",
      },
    ],
    checks: ["State the concept in one sentence.", "Name the inputs and outputs.", "Try one small example by hand."],
  };
  const selectedExample = detail.examples[exampleIndex] || detail.examples[0];

  return (
    <main className="concept-explore-page">
      <section className="concept-explore-hero">
        <Link className="concept-back-link" to="/simple-concepts">
          Back to concepts
        </Link>
        <p className="concept-explore-kicker">{concept.groupTitle}</p>
        <h1>{concept.title}</h1>
        <p>{concept.body}</p>
      </section>

      <section className="concept-workspace" aria-label={`${concept.title} interactive explorer`}>
        <div className="concept-focus-panel">
          <p className="concept-explore-kicker">Core pattern</p>
          {detail.formula && (
            <div className="concept-formula">
              <InlineMath latex={detail.formula} />
            </div>
          )}
          <p>
            Use this page in three passes: recognize the pattern, test one example, then check whether you can explain the result without memorizing wording.
          </p>
        </div>

        <div className="concept-example-panel">
          <div className="concept-example-head">
            <div>
              <p className="concept-explore-kicker">Try it</p>
              <h2>{selectedExample.label}</h2>
            </div>
            <div className="concept-example-tabs" aria-label="Example choices">
              {detail.examples.map((example, index) => (
                <button
                  className={index === exampleIndex ? "is-active" : ""}
                  key={example.label}
                  onClick={() => setExampleIndex(index)}
                  type="button"
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          {selectedExample.math && (
            <div className="concept-example-math">
              <InlineMath latex={selectedExample.math} />
            </div>
          )}
          <p>{selectedExample.note}</p>
        </div>

        <div className="concept-check-panel">
          <label>
            <input
              checked={showChecks}
              onChange={(event) => setShowChecks(event.target.checked)}
              type="checkbox"
            />
            Show self-check steps
          </label>
          {showChecks && (
            <ol>
              {detail.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {detail.deepDive && (
        <section className="concept-deep-dive" aria-label={`${concept.title} deeper explanation`}>
          <div className="concept-deep-head">
            <p className="concept-explore-kicker">From basic to advanced</p>
            <h2>Build the idea layer by layer</h2>
            <p>
              Epsilon-delta continuity is a precision statement: output error is controlled by input distance.
              The cards below move from intuition to proof technique and then to higher-dimensional continuity.
            </p>
          </div>

          <div className="concept-deep-grid">
            {detail.deepDive.map((section) => (
              <article className="concept-deep-card" key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
                <div className="concept-deep-math">
                  <BlockMath latex={section.math} />
                </div>
              </article>
            ))}
          </div>

          <div className="concept-proof-row">
            <div className="concept-proof-panel">
              <h3>How to Prove It</h3>
              <ol>
                {detail.proofSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="concept-proof-panel concept-proof-panel--accent">
              <h3>The Three Conditions</h3>
              <ul>
                {detail.conditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
              <p>
                Holes, jumps, vertical asymptotes, and path-dependent limits break one of these conditions.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default ConceptExplore;
