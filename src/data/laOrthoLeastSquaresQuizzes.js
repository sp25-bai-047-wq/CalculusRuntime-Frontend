/** Study-guide quiz bank for Orthogonality & Least Squares — 15 MCQs. */

export const LA_OL_QUIZ = [
    {
      prompt: "Vectors $u$ and $v$ are orthogonal exactly when:",
      options: ["$u\\cdot v=0$", "$\\|u\\|=\\|v\\|$", "$u=cv$ for some scalar $c$"],
      answer: "A",
      explanation: "Orthogonality is defined by a zero dot product.",
    },
    {
      prompt: "Are $u=(1,2,-1)$ and $v=(3,-1,1)$ orthogonal?",
      options: ["Yes, $u\\cdot v=0$", "No, $u\\cdot v=4$", "No, $u\\cdot v=6$"],
      answer: "A",
      explanation: "$1(3)+2(-1)+(-1)(1)=3-2-1=0$.",
    },
    {
      prompt: "A set of nonzero orthogonal vectors is always:",
      options: ["Linearly independent", "Linearly dependent", "A basis for $\\mathbb{R}^n$"],
      answer: "A",
      explanation: "Taking the dot product with each vector in a dependence relation forces all coefficients to zero.",
    },
    {
      prompt: "An orthonormal set additionally requires:",
      options: ["Each vector has length $1$", "All vectors point the same direction", "The set has exactly $2$ vectors"],
      answer: "A",
      explanation: "Orthonormal = orthogonal + unit length.",
    },
    {
      prompt: "The orthogonal projection of $b$ onto a line spanned by $a$ is:",
      options: [
        "$\\hat b=\\dfrac{a\\cdot b}{a\\cdot a}\\,a$",
        "$\\hat b=\\dfrac{a\\cdot a}{a\\cdot b}\\,a$",
        "$\\hat b=(a\\cdot b)\\,b$",
      ],
      answer: "A",
      explanation: "Scale $a$ by the ratio of dot products so the residual $b-\\hat b$ is orthogonal to $a$.",
    },
    {
      prompt: "For a matrix $Q$ with orthonormal columns, $Q^TQ$ equals:",
      options: ["$I$, the identity matrix", "$Q$ itself", "The zero matrix"],
      answer: "A",
      explanation: "Orthonormal columns have unit length and pairwise-zero dot products, exactly the entries of $I$.",
    },
    {
      prompt: "The Gram–Schmidt process converts a basis into:",
      options: [
        "An orthogonal (or orthonormal) basis for the same space",
        "The eigenvectors of the matrix of basis vectors",
        "A single vector spanning the space",
      ],
      answer: "A",
      explanation: "It subtracts projections onto previous vectors to build mutual orthogonality, preserving the span.",
    },
    {
      prompt: "The QR decomposition writes a matrix $A$ (independent columns) as:",
      options: [
        "$A=QR$ with $Q$ orthonormal-columns and $R$ upper triangular",
        "$A=QR$ with both $Q,R$ diagonal",
        "$A=QR$ with $Q$ symmetric and $R$ orthogonal",
      ],
      answer: "A",
      explanation: "QR packages the Gram–Schmidt result: $Q$ holds the orthonormal directions, $R$ the projection coefficients.",
    },
    {
      prompt: "The least-squares solution to an inconsistent system $Ax=b$ solves the normal equations:",
      options: ["$A^TA\\hat x=A^Tb$", "$Ax=b$ exactly", "$A^{-1}b=\\hat x$ always"],
      answer: "A",
      explanation: "Minimizing $\\|Ax-b\\|^2$ leads to the normal equations, valid even when $A$ isn't square.",
    },
    {
      prompt: "In least squares, the residual $b-A\\hat x$ is always:",
      options: [
        "Orthogonal to the column space of $A$",
        "Equal to zero",
        "Parallel to every column of $A$",
      ],
      answer: "A",
      explanation: "The best approximation theorem: the error is orthogonal to the subspace you projected onto.",
    },
    {
      prompt: "Fitting a line $y=mx+c$ to data points by least squares is equivalent to:",
      options: [
        "Solving the normal equations for the design matrix of $(x_i,1)$ rows",
        "Finding eigenvalues of the data matrix",
        "Solving $Ax=b$ exactly for every point",
      ],
      answer: "A",
      explanation: "Each data point gives one row $[x_i\\ \\ 1]$; least squares finds the best $(m,c)$ overall.",
    },
    {
      prompt: "The orthogonal complement $W^{\\perp}$ of a subspace $W$ of $\\mathbb{R}^n$ consists of:",
      options: [
        "All vectors orthogonal to every vector in $W$",
        "All vectors inside $W$",
        "The zero vector only",
      ],
      answer: "A",
      explanation: "Definition of orthogonal complement.",
    },
    {
      prompt: "The projection matrix onto the column space of $A$ (full column rank) is:",
      options: [
        "$P=A(A^TA)^{-1}A^T$",
        "$P=AA^T$",
        "$P=(A^TA)^{-1}$",
      ],
      answer: "A",
      explanation: "$P$ sends $b$ to $A\\hat x$ using the least-squares solution $\\hat x=(A^TA)^{-1}A^Tb$.",
    },
    {
      prompt: "A projection matrix $P$ always satisfies:",
      options: ["$P^2=P$", "$P^2=-P$", "$\\det P\\neq0$"],
      answer: "A",
      explanation: "Projecting an already-projected vector changes nothing, so $P$ is idempotent.",
    },
    {
      prompt: "Best-fitting a quadratic $y=a+bx+cx^2$ to noisy data by least squares uses a design matrix whose columns are:",
      options: [
        "$1,\\ x,\\ x^2$ evaluated at each data point",
        "The eigenvalues of the data",
        "Orthogonal vectors only, regardless of $x$",
      ],
      answer: "A",
      explanation: "Each unknown coefficient gets its own column built from the powers of $x_i$.",
    },
  ];