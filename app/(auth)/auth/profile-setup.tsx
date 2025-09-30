import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import { ProfileSetupForm } from "@/modules/auth/components/ProfileSetupForm";

export default function ProfileSetup() {
  return (
    <SoftSkyBackdrop>
      <ProfileSetupForm />
    </SoftSkyBackdrop>
  );
}