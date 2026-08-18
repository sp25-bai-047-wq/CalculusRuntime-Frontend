/** Study-guide quiz bank for Linear Transformations — 15 MCQs. */

export const LA_LT_QUIZ = [
    {
      prompt: "A transformation $T$ is linear iff for all vectors $u,v$ and scalars $c$:",
      options: [
        "$T(u+v)=T(u)+T(v)$ and $T(cu)=cT(u)$",
        "$T(u+v)=T(u)T(v)$",
        "$T(0)\\neq 0$ is allowed as long as it is one-to-one",
      ],
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
      prompt: "If $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ sends $e_1=(1,0)\\mapsto(2,3)$ and $e_2=(0,1)\\mapsto(-1,4)$, the standard matrix of $T$ is:",
      options: [
        "$\\begin{pmatrix}2&-1\\\\3&4\\end{pmatrix}$",
        "$\\begin{pmatrix}2&3\\\\-1&4\\end{pmatrix}$",
        "$\\begin{pmatrix}3&4\\\\2&-1\\end{pmatrix}$",
      ],
      answer: "A",
      explanation: "Images of the standard basis vectors become the columns of the matrix, in order.",
    },
    {
      prompt: "The kernel (null space) of a linear transformation $T$ is:",
      options: [
        "$\\{v: T(v)=0\\}$",
        "The set of all outputs of $T$",
        "The set of eigenvectors of $T$",
      ],
      answer: "A",
      explanation: "Kernel is the set of inputs mapped to the zero vector.",
    },
    {
      prompt: "By the rank–nullity theorem, for $T:\\mathbb{R}^n\\to\\mathbb{R}^m$:",
      options: [
        "$\\operatorname{rank}(T)+\\operatorname{nullity}(T)=n$",
        "$\\operatorname{rank}(T)-\\operatorname{nullity}(T)=m$",
        "$\\operatorname{rank}(T)\\cdot\\operatorname{nullity}(T)=n$",
      ],
      answer: "A",
      explanation: "Dimension of the domain splits between the image's dimension and the kernel's dimension.",
    },
    {
      prompt: "A linear transformation $T$ is one-to-one (injective) exactly when:",
      options: [
        "$\\ker(T)=\\{0\\}$",
        "$T$ is represented by a square matrix",
        "The image of $T$ is all of $\\mathbb{R}^m$",
      ],
      answer: "A",
      explanation: "Only the zero vector maps to zero, so distinct inputs give distinct outputs.",
    },
    {
      prompt: "Composing two linear transformations $S\\circ T$ corresponds to matrix operation:",
      options: ["Matrix multiplication $[S][T]$", "Matrix addition $[S]+[T]$", "Entrywise product of $[S]$ and $[T]$"],
      answer: "A",
      explanation: "Applying $T$ then $S$ matches multiplying the standard matrices in that order.",
    },
    {
      prompt: "The matrix $\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}$ represents:",
      options: ["A rotation by angle $\\theta$", "A reflection across the $x$-axis", "A projection onto the $x$-axis"],
      answer: "A",
      explanation: "This is the standard counterclockwise rotation matrix.",
    },
    {
      prompt: "The matrix $\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$ represents:",
      options: [
        "Projection onto the $x$-axis",
        "Reflection across the $y$-axis",
        "A $90^\\circ$ rotation",
      ],
      answer: "A",
      explanation: "It keeps the $x$-component and zeroes the $y$-component.",
    },
    {
      prompt: "A linear transformation $T:\\mathbb{R}^n\\to\\mathbb{R}^n$ is invertible iff:",
      options: [
        "Its standard matrix is invertible (nonzero determinant)",
        "It fixes the origin",
        "It is a rotation",
      ],
      answer: "A",
      explanation: "Invertibility of $T$ matches invertibility of its matrix representation.",
    },
    {
      prompt: "If $T$ is a shear transformation given by $\\begin{pmatrix}1&k\\\\0&1\\end{pmatrix}$, then $\\det(T)$ is:",
      options: ["$1$", "$k$", "$0$"],
      answer: "A",
      explanation: "Shear matrices always have determinant $1$, so they preserve area.",
    },
    {
      prompt: "For $T:\\mathbb{R}^3\\to\\mathbb{R}^2$ with a $2\\times3$ standard matrix of rank $2$, the nullity is:",
      options: ["$1$", "$0$", "$2$"],
      answer: "A",
      explanation: "Rank–nullity: $3=\\operatorname{rank}+\\operatorname{nullity}=2+\\operatorname{nullity}$.",
    },
    {
      prompt: "Two linear transformations with the same matrix relative to a fixed basis must:",
      options: ["Act identically on every vector", "Only agree on the basis vectors", "Have different kernels"],
      answer: "A",
      explanation: "A transformation is completely determined by where it sends a basis.",
    },
    {
      prompt: "The identity transformation $T(v)=v$ has standard matrix:",
      options: ["$I$, the identity matrix", "The zero matrix", "Any orthogonal matrix"],
      answer: "A",
      explanation: "Every basis vector maps to itself, giving the identity matrix's columns.",
    },
    {
      prompt: "If $T:\\mathbb{R}^2\\to\\mathbb{R}^2$ is onto (surjective), then its standard matrix must have:",
      options: ["Rank $2$", "Rank $0$", "A zero row"],
      answer: "A",
      explanation: "Surjectivity onto $\\mathbb{R}^2$ requires the columns to span $\\mathbb{R}^2$, i.e. full rank $2$.",
    },
  ];