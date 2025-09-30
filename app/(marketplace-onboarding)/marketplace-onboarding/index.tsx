import { useRouter } from "expo-router";
import React from "react";
import { MarketplaceOnboardingContainer } from "@/modules/marketplace/components/MarketplaceOnboardingContainer";
import { MarketplaceOnboardingBackground0 } from "@/modules/marketplace/components/MarketplaceOnboardingBackground0";
import { MarketplaceOnboardingBackground1 } from "@/modules/marketplace/components/MarketplaceOnboardingBackground1";
import { MarketplaceOnboardingBackground2 } from "@/modules/marketplace/components/MarketplaceOnboardingBackground2";
import { MarketplaceOnboardingBackground3 } from "@/modules/marketplace/components/MarketplaceOnboardingBackground3";

export default function MarketplaceOnboarding() {
  const router = useRouter();

  const steps = [
    {
      title: "Find trusted legal help, fast",
      description:
        "Our lawyer marketplace connects you with verified US attorneys for any case, transaction, or legal question—no matter your background or experience.",
      background: React.createElement(MarketplaceOnboardingBackground0),
      primaryColor: "#EF4444",
    },
    {
      title: "Transparent pricing and honest reviews",
      description:
        "Preview up-front pricing and payment options before deciding to connect—no hidden fees or surprises. Compare costs for similar cases in your state and read reviews from other clients. After your case is done, you can share your experience and help build a trustworthy legal community for everyone.",
      background: React.createElement(MarketplaceOnboardingBackground1),
      primaryColor: "#3FA7CC",
    },
    {
      title: "Real-time connection and support",
      description:
        "Book a free introduction or instantly chat with attorneys using our in-app messaging—get answers and reassurance right away, not days later. Work with your lawyer to review documents, make drafts, or negotiate deals. easily from your phone or computer. You'll get phone alerts so you can track progress and never miss a deadline.",
      background: React.createElement(MarketplaceOnboardingBackground2),
      primaryColor: "#10B981",
    },
    {
      title: "Fast, accessible, and mobile-first!",
      description:
        "Our guides explain how legal matters work, and our team is here to help. We offer support in different languages and guides in plain English so everyone gets the help they need.",
      background: React.createElement(MarketplaceOnboardingBackground3),
      primaryColor: "#8B5CF6",
    },
  ];

  const handleComplete = () => {
    router.push("/marketplace/ai-intake");
  };

  return <MarketplaceOnboardingContainer steps={steps} onComplete={handleComplete} />;
}
