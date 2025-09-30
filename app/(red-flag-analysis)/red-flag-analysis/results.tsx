import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import { RedFlagAnalysisResults } from "@/modules/red-flag-analysis/components/RedFlagAnalysisResults";

export default function RedFlagAnalysis() {
  return (
    <SoftSkyBackdrop>
      <RedFlagAnalysisResults />
    </SoftSkyBackdrop>
  );
}