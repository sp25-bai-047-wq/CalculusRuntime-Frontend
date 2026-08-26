import {
  EightExamples,
  PARTIAL_P1_EXAMPLES,
  PARTIAL_P2_EXAMPLES,
  VECTOR_P1_EXAMPLES,
  VECTOR_P2_EXAMPLES,
  INTEGRALS_P1_EXAMPLES,
  INTEGRALS_P2_EXAMPLES,
  LAGRANGE_P1_EXAMPLES,
  LAGRANGE_P2_EXAMPLES,
  DIVCURL_P1_EXAMPLES,
  DIVCURL_P2_EXAMPLES,
  STOKES_P1_EXAMPLES,
  STOKES_P2_EXAMPLES,
} from "../../data/mvLengthyExamples";

const BANKS = {
  partial: [PARTIAL_P1_EXAMPLES, PARTIAL_P2_EXAMPLES],
  vector: [VECTOR_P1_EXAMPLES, VECTOR_P2_EXAMPLES],
  integrals: [INTEGRALS_P1_EXAMPLES, INTEGRALS_P2_EXAMPLES],
  lagrange: [LAGRANGE_P1_EXAMPLES, LAGRANGE_P2_EXAMPLES],
  divcurl: [DIVCURL_P1_EXAMPLES, DIVCURL_P2_EXAMPLES],
  stokes: [STOKES_P1_EXAMPLES, STOKES_P2_EXAMPLES],
};

/** Eight lengthy certificate examples + real-life note for multivariable guides. */
export default function MvCertificateBoost({ topic, part = 1 }) {
  const bank = BANKS[topic]?.[part === 2 ? 1 : 0];
  if (!bank) return null;

  return (
    <section className="section" id={`mv-cert-${topic}-p${part}`}>
      <div className="sec-badge">Eight lengthy certificate examples</div>
      <h2 className="sec-title">
        Part {part} — detailed solutions (≥8 steps each)
      </h2>
      <EightExamples items={bank} />
    </section>
  );
}
