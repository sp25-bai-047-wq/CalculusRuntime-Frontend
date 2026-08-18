/** Study-guide quiz bank for Singular Value Decomposition (SVD) — 15 MCQs. */

export const LA_SVD_QUIZ = [
    {
      prompt: "The singular value decomposition writes any $m\\times n$ matrix $A$ as:",
      options: [
        "$A=U\\Sigma V^T$ with $U,V$ orthogonal and $\\Sigma$ diagonal",
        "$A=PDP^{-1}$ with $D$ diagonal",
        "$A=LU$ with $L,U$ triangular",
      ],
      answer: "A",
      explanation: "SVD exists for every matrix, unlike eigendecomposition which needs a square, diagonalizable matrix.",
    },
    {
      prompt: "The singular values $\\sigma_i$ of $A$ are:",
      options: [
        "The square roots of the eigenvalues of $A^TA$",
        "The eigenvalues of $A$ directly",
        "Always equal to $1$",
      ],
      answer: "A",
      explanation: "$A^TA$ is symmetric positive semidefinite, so its eigenvalues are $\\geq0$; their square roots are the singular values.",
    },
    {
      prompt: "The columns of $V$ in $A=U\\Sigma V^T$ are:",
      options: [
        "Eigenvectors of $A^TA$",
        "Eigenvectors of $A$",
        "The rows of $\\Sigma$",
      ],
      answer: "A",
      explanation: "$V$ diagonalizes $A^TA=V\\Sigma^2V^T$.",
    },
    {
      prompt: "The columns of $U$ in $A=U\\Sigma V^T$ are:",
      options: [
        "Eigenvectors of $AA^T$",
        "Eigenvectors of $A^TA$",
        "Arbitrary orthonormal vectors unrelated to $A$",
      ],
      answer: "A",
      explanation: "$U$ diagonalizes $AA^T=U\\Sigma^2U^T$.",
    },
    {
      prompt: "The rank of $A$ equals:",
      options: [
        "The number of nonzero singular values",
        "The number of rows of $A$ always",
        "The largest singular value",
      ],
      answer: "A",
      explanation: "Zero singular values correspond to directions collapsed to zero, so rank counts the nonzero ones.",
    },
    {
      prompt: "For $A=\\begin{pmatrix}3&0\\\\0&0\\end{pmatrix}$, the singular values are:",
      options: ["$3$ and $0$", "$3$ and $3$", "$9$ and $0$"],
      answer: "A",
      explanation: "$A^TA=\\operatorname{diag}(9,0)$, and $\\sqrt{9}=3$, $\\sqrt0=0$.",
    },
    {
      prompt: "The largest singular value $\\sigma_1$ of $A$ equals:",
      options: [
        "The maximum of $\\|Ax\\|$ over unit vectors $\\|x\\|=1$",
        "The trace of $A$",
        "The determinant of $A$",
      ],
      answer: "A",
      explanation: "$\\sigma_1$ measures the largest stretching factor $A$ applies to any unit vector.",
    },
    {
      prompt: "The condition number of an invertible square matrix (in the 2-norm) is:",
      options: [
        "$\\sigma_{\\max}/\\sigma_{\\min}$",
        "$\\sigma_{\\max}\\cdot\\sigma_{\\min}$",
        "$\\sigma_{\\max}+\\sigma_{\\min}$",
      ],
      answer: "A",
      explanation: "It's the ratio of largest to smallest singular value, measuring sensitivity to errors.",
    },
    {
      prompt: "By the Eckart–Young theorem, the best rank-$k$ approximation to $A$ (in Frobenius/2-norm) is obtained by:",
      options: [
        "Keeping only the $k$ largest singular values/vectors and zeroing the rest",
        "Rounding every entry of $A$ to $k$ decimal places",
        "Taking the first $k$ rows of $A$",
      ],
      answer: "A",
      explanation: "Truncating the SVD to the top $k$ terms gives the provably closest lower-rank matrix.",
    },
    {
      prompt: "The Moore–Penrose pseudoinverse of $A=U\\Sigma V^T$ is:",
      options: [
        "$A^{+}=V\\Sigma^{+}U^T$, where $\\Sigma^{+}$ inverts the nonzero singular values",
        "$A^{+}=U\\Sigma V^T$ unchanged",
        "$A^{+}=A^T$ always",
      ],
      answer: "A",
      explanation: "Reciprocate the nonzero diagonal entries and transpose the factor order.",
    },
    {
      prompt: "If $A$ is symmetric positive definite, its singular values are:",
      options: [
        "Exactly its eigenvalues",
        "The squares of its eigenvalues",
        "Always equal to $1$",
      ],
      answer: "A",
      explanation: "For SPD matrices, $A^TA=A^2$ has eigenvalues $\\lambda_i^2$, so singular values $\\sigma_i=\\lambda_i>0$ match the eigenvalues.",
    },
    {
      prompt: "SVD-based image compression works by:",
      options: [
        "Storing only the top few singular values/vectors instead of every pixel",
        "Rotating the image $90^\\circ$",
        "Deleting random pixels",
      ],
      answer: "A",
      explanation: "A low-rank SVD truncation reconstructs a visually close image using far less data.",
    },
    {
      prompt: "Principal Component Analysis (PCA) is closely related to SVD because:",
      options: [
        "The right singular vectors of the centered data matrix are the principal directions",
        "PCA requires computing a matrix inverse only",
        "PCA and SVD apply only to square matrices",
      ],
      answer: "A",
      explanation: "PCA's principal components are eigenvectors of the covariance matrix, which SVD of the centered data matrix directly provides.",
    },
    {
      prompt: "For an $m\\times n$ matrix with $m>n$, the 'thin' (economy) SVD keeps:",
      options: [
        "$U$ as $m\\times n$, $\\Sigma$ as $n\\times n$, $V$ as $n\\times n$",
        "$U$ square $m\\times m$ only, discarding $\\Sigma$",
        "Only the matrix $V$",
      ],
      answer: "A",
      explanation: "The thin SVD drops the extra orthonormal columns of $U$ that multiply zero rows of $\\Sigma$.",
    },
    {
      prompt: "If $A$ is invertible, solving $Ax=b$ using its SVD gives:",
      options: [
        "$x=V\\Sigma^{-1}U^Tb$",
        "$x=U\\Sigma V^Tb$",
        "$x=\\Sigma^{-1}b$ regardless of $U,V$",
      ],
      answer: "A",
      explanation: "Invert each orthogonal factor by its transpose and $\\Sigma$ by its reciprocal diagonal.",
    },
  ];