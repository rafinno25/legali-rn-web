import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import { OnboardingWelcome } from "@/modules/onboarding/components/OnboardingWelcome";

export default function HomeTab() {
  return (
    <SoftSkyBackdrop>
      <OnboardingWelcome />
    </SoftSkyBackdrop>
  );
}
