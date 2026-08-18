import { EightExamples } from "../../data/calcAgLengthyExamples";
import {
  LA_VECTORS_P1_EXAMPLES,
  LA_VECTORS_P2_EXAMPLES,
} from "../../data/laVectorsCertExamples";
import {
  LA_MATRICES_P1_EXAMPLES,
  LA_MATRICES_P2_EXAMPLES,
} from "../../data/laMatricesCertExamples";
import {
  LA_SYSTEMS_P1_EXAMPLES,
  LA_SYSTEMS_P2_EXAMPLES,
} from "../../data/laSystemsCertExamples";
import {
  LA_EIGEN_P1_EXAMPLES,
  LA_EIGEN_P2_EXAMPLES,
} from "../../data/laEigenCertExamples";

const BANKS = {
  vectors: [LA_VECTORS_P1_EXAMPLES, LA_VECTORS_P2_EXAMPLES],
  matrices: [LA_MATRICES_P1_EXAMPLES, LA_MATRICES_P2_EXAMPLES],
  systems: [LA_SYSTEMS_P1_EXAMPLES, LA_SYSTEMS_P2_EXAMPLES],
  eigen: [LA_EIGEN_P1_EXAMPLES, LA_EIGEN_P2_EXAMPLES],
};

/** Eight lengthy certificate examples + real-life note for Linear Algebra guides. */
export default function LaCertificateBoost({ topic, part = 1 }) {
  const bank = BANKS[topic]?.[part === 2 ? 1 : 0];
  if (!bank) return null;

  return (
    <section className="section" id={`la-cert-${topic}-p${part}`}>
      <div className="sec-badge">Eight lengthy certificate examples</div>
      <h2 className="sec-title">
        Part {part} — detailed solutions (8 steps each)
      </h2>
      <EightExamples items={bank} />
    </section>
  );
}
