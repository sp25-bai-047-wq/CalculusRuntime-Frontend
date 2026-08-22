/** Study-guide quiz banks for the Linear Algebra "Linear Equations" guide — 8 MCQs per section. */

export const LA_LE_FORMS_QUIZ = [
  {
    prompt: "Which is the general (standard) form of a linear equation in two variables?",
    options: ["$Ax+By=C$", "$Ax^2+By=C$", "$Axy=C$"],
    answer: "A",
    explanation: "Linear means degree 1 in every variable, with no products or powers of the unknowns.",
  },
  {
    prompt: "In $Ax+By=C$, what must be true for it to genuinely involve both variables?",
    options: ["$A$ and $B$ are not both zero", "$C\\neq 0$", "$A=B$"],
    answer: "A",
    explanation: "If both $A$ and $B$ were zero there would be no variables left in the equation.",
  },
  {
    prompt: "The general form of a linear equation in three variables is:",
    options: ["$Ax+By+Cz=D$", "$Ax+By=D$", "$ABCxyz=D$"],
    answer: "A",
    explanation: "One more variable, one more coefficient — the pattern just extends.",
  },
  {
    prompt: "The solution set of one linear equation $Ax+By+Cz=D$ (not all coefficients zero) is geometrically a:",
    options: ["Point", "Line", "Plane"],
    answer: "C",
    explanation: "A single linear equation in 3D removes exactly one degree of freedom, leaving a flat plane.",
  },
  {
    prompt: "The general form of a linear equation in $n$ variables, written compactly, is:",
    options: ["$a_1x_1+a_2x_2+\\cdots+a_nx_n=b$", "$x_1x_2\\cdots x_n=b$", "$a_1x_1^2+\\cdots+a_nx_n^2=b$"],
    answer: "A",
    explanation: "Every term is a constant times one variable, added together — that is the linear pattern.",
  },
  {
    prompt: "One linear equation in $n$ variables describes a:",
    options: ["Line, always", "Hyperplane in $\\mathbb{R}^n$", "Curve"],
    answer: "B",
    explanation: "It always cuts one dimension out of the space: a line in $\\mathbb{R}^2$, a plane in $\\mathbb{R}^3$, a hyperplane beyond that.",
  },
  {
    prompt: "Which of these is NOT a linear equation?",
    options: ["$3x-5y=10$", "$x+2y-z=0$", "$xy=4$"],
    answer: "C",
    explanation: "$xy$ is a product of two unknowns, which makes the equation nonlinear.",
  },
  {
    prompt: "Rewrite $5x-2y=10$ in slope-intercept form $y=mx+b$.",
    options: ["$y=\\tfrac{5}{2}x-5$", "$y=\\tfrac{2}{5}x-5$", "$y=-\\tfrac{5}{2}x+5$"],
    answer: "A",
    explanation: "$-2y=10-5x \\Rightarrow y=\\tfrac{5}{2}x-5$.",
  },
];

export const LA_LE_GRAPH_QUIZ = [
  {
    prompt: "To find the x-intercept of a line, you should:",
    options: ["Set $x=0$ and solve for $y$", "Set $y=0$ and solve for $x$", "Solve for both at once"],
    answer: "B",
    explanation: "The x-intercept is where the line crosses the x-axis — that's where $y=0$.",
  },
  {
    prompt: "To find the y-intercept of $Ax+By=C$, you should:",
    options: ["Set $y=0$", "Set $x=0$", "Set $A=0$"],
    answer: "B",
    explanation: "The y-intercept is where the line crosses the y-axis — that's where $x=0$.",
  },
  {
    prompt: "The x-intercept of $2x+3y=6$ is:",
    options: ["$(3,0)$", "$(0,2)$", "$(2,0)$"],
    answer: "A",
    explanation: "Set $y=0$: $2x=6 \\Rightarrow x=3$.",
  },
  {
    prompt: "The y-intercept of $2x+3y=6$ is:",
    options: ["$(0,3)$", "$(0,2)$", "$(2,0)$"],
    answer: "B",
    explanation: "Set $x=0$: $3y=6 \\Rightarrow y=2$.",
  },
  {
    prompt: "The line $x-y=4$ crosses the y-axis at:",
    options: ["$(0,-4)$", "$(0,4)$", "$(4,0)$"],
    answer: "A",
    explanation: "Set $x=0$: $-y=4 \\Rightarrow y=-4$.",
  },
  {
    prompt: "Once you have both intercepts of a line, the next step to graph it is:",
    options: ["Plot both points and draw a straight line through them", "Plot only the origin", "Compute a second derivative"],
    answer: "A",
    explanation: "Two points fully determine a straight line — connect them and extend in both directions.",
  },
  {
    prompt: "The equation $4x=20$ graphs as:",
    options: ["A horizontal line through $y=5$", "A vertical line through $x=5$", "A line through the origin"],
    answer: "B",
    explanation: "$4x=20 \\Rightarrow x=5$ for every $y$ — a vertical line.",
  },
  {
    prompt: "A vertical line such as $x=5$ has:",
    options: ["Only a y-intercept", "Only an x-intercept (unless it passes through the origin)", "Infinitely many x-intercepts"],
    answer: "B",
    explanation: "It never crosses the y-axis (unless the line is $x=0$), but it crosses the x-axis once.",
  },
];

export const LA_LE_SYS_QUIZ = [
  {
    prompt: "A system of linear equations can have:",
    options: ["Exactly 0, 1, or infinitely many solutions", "Exactly 0, 1, or 2 solutions", "Any number from 0 to 5 solutions"],
    answer: "A",
    explanation: "There is no fourth option — those are the only three possibilities for a linear system.",
  },
  {
    prompt: "Two lines that intersect at exactly one point give a system with:",
    options: ["No solution", "A unique solution", "Infinitely many solutions"],
    answer: "B",
    explanation: "One crossing point means one $(x,y)$ pair satisfies both equations.",
  },
  {
    prompt: "Two distinct parallel lines that never meet give a system with:",
    options: ["No solution", "A unique solution", "Infinitely many solutions"],
    answer: "A",
    explanation: "No shared point means no pair satisfies both equations — the system is inconsistent.",
  },
  {
    prompt: "Two equations that describe the very same line give a system with:",
    options: ["No solution", "A unique solution", "Infinitely many solutions (indefinite)"],
    answer: "C",
    explanation: "Every point on the line satisfies both equations — the system is dependent.",
  },
  {
    prompt: "The lines $y=3x+1$ and $y=3x-4$ are:",
    options: ["Parallel — no solution", "Intersecting — unique solution", "The same line"],
    answer: "A",
    explanation: "Same slope ($3$), different y-intercepts — parallel and never meeting.",
  },
  {
    prompt: "In standard form, $A_1x+B_1y=C_1$ and $A_2x+B_2y=C_2$ are parallel (or coincide) exactly when:",
    options: ["$A_1B_2=A_2B_1$", "$A_1=A_2$ only", "$C_1=C_2$"],
    answer: "A",
    explanation: "This cross-multiplication test compares slopes without dividing, so it also covers vertical lines.",
  },
  {
    prompt: "In a system with $n$ unknowns written as $A\\mathbf{x}=\\mathbf{b}$, the three possibilities (unique / none / infinite) still apply because:",
    options: [
      "Every linear system, in any number of variables, is inconsistent, has one solution, or has infinitely many",
      "Systems with more than 3 variables always have infinitely many solutions",
      "Only 2-variable systems can be inconsistent",
    ],
    answer: "A",
    explanation: "The three-possibility rule is a general fact about linear systems, not just 2D lines.",
  },
  {
    prompt: "A system is called \"indefinite\" (or dependent) when:",
    options: [
      "It has no solution",
      "It has infinitely many solutions described by one or more free parameters",
      "It has exactly one solution",
    ],
    answer: "B",
    explanation: "Indefinite systems leave at least one variable free, producing a whole family of solutions.",
  },
];

export const LA_LE_SOLVE_QUIZ = [
  {
    prompt: "Which of these is NOT one of the three elementary operations used to solve a system?",
    options: ["Interchange two equations", "Multiply an equation by a nonzero constant", "Square both sides of an equation"],
    answer: "C",
    explanation: "Squaring can introduce new, false solutions — it is not a safe elementary operation.",
  },
  {
    prompt: "Why is it legal to multiply an equation by a nonzero constant?",
    options: [
      "It scales both sides equally, so the solution set stays exactly the same",
      "It changes the solution set on purpose",
      "It only works for equations that already have a solution",
    ],
    answer: "A",
    explanation: "Multiplying both sides by the same nonzero number preserves every equality.",
  },
  {
    prompt: "Why can't you multiply an equation by zero as a solving technique?",
    options: [
      "It turns the equation into $0=0$, destroying all information about the unknowns",
      "It is perfectly fine to do",
      "It only changes the sign of every term",
    ],
    answer: "A",
    explanation: "Zero collapses the equation to a trivial statement that is true for every value — you lose the constraint.",
  },
  {
    prompt: "Adding a multiple of one equation to another is useful because it can:",
    options: ["Change the number of unknowns", "Eliminate a variable, revealing another one's value", "Force the system to have no solution"],
    answer: "B",
    explanation: "This is the core elimination move: combine equations so one unknown cancels out.",
  },
  {
    prompt: "For $x+y+z=6,\\ 2x-y+z=3,\\ x+2y-z=2$: eliminating $x$ from the second equation with $E_2-2E_1$ gives:",
    options: ["$-3y-z=-9$", "$3y+z=3$", "$y+z=-3$"],
    answer: "A",
    explanation: "$(2x-y+z)-2(x+y+z)=3-12 \\Rightarrow -3y-z=-9$.",
  },
  {
    prompt: "Continuing that system, eliminating $x$ from the third equation with $E_3-E_1$ gives:",
    options: ["$y-2z=-4$", "$2y-z=-4$", "$y+2z=4$"],
    answer: "A",
    explanation: "$(x+2y-z)-(x+y+z)=2-6 \\Rightarrow y-2z=-4$.",
  },
  {
    prompt: "Solving the reduced pair $3y+z=9$ and $y-2z=-4$ gives $z=3,\\ y=2$. Back-substituting into $x+y+z=6$ gives:",
    options: ["$x=1$", "$x=3$", "$x=6$"],
    answer: "A",
    explanation: "$x+2+3=6 \\Rightarrow x=1$.",
  },
  {
    prompt: "So the full solution to $x+y+z=6,\\ 2x-y+z=3,\\ x+2y-z=2$ is:",
    options: ["$(x,y,z)=(1,2,3)$", "$(x,y,z)=(3,2,1)$", "$(x,y,z)=(2,1,3)$"],
    answer: "A",
    explanation: "Check: $1+2+3=6$, $2(1)-2+3=3$, $1+2(2)-3=2$ — all three equations hold.",
  },
];
