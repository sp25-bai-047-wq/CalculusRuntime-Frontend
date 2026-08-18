import { EightExamples } from "../../data/calcAgLengthyExamples";
import {
  PS_PROB_P1_EXAMPLES,
  PS_PROB_P2_EXAMPLES,
} from "../../data/psProbBasicsCertExamples";
import {
  PS_RV_P1_EXAMPLES,
  PS_RV_P2_EXAMPLES,
} from "../../data/psRandomVarsCertExamples";
import {
  PS_DESC_P1_EXAMPLES,
  PS_DESC_P2_EXAMPLES,
} from "../../data/psDescriptiveCertExamples";
import {
  PS_HYP_P1_EXAMPLES,
  PS_HYP_P2_EXAMPLES,
} from "../../data/psHypothesisCertExamples";
import {
  PS_REG_P1_EXAMPLES,
  PS_REG_P2_EXAMPLES,
} from "../../data/psRegressionCertExamples";

const BANKS = {
  probability: [PS_PROB_P1_EXAMPLES, PS_PROB_P2_EXAMPLES],
  randomvars: [PS_RV_P1_EXAMPLES, PS_RV_P2_EXAMPLES],
  descriptive: [PS_DESC_P1_EXAMPLES, PS_DESC_P2_EXAMPLES],
  hypothesis: [PS_HYP_P1_EXAMPLES, PS_HYP_P2_EXAMPLES],
  regression: [PS_REG_P1_EXAMPLES, PS_REG_P2_EXAMPLES],
};

/** Eight lengthy certificate examples + real-life note for Probability & Statistics guides. */
export default function PsCertificateBoost({ topic, part = 1 }) {
  const bank = BANKS[topic]?.[part === 2 ? 1 : 0];
  if (!bank) return null;

  return (
    <section className="section" id={`ps-cert-${topic}-p${part}`}>
      <div className="sec-badge">Eight lengthy certificate examples</div>
      <h2 className="sec-title">
        Part {part} — detailed solutions (8 steps each)
      </h2>
      <EightExamples items={bank} />
    </section>
  );
}
