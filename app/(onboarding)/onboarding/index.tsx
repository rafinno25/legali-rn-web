import { Link } from "expo-router";
import { ScrollView } from "react-native";

import { SoftSkyBackdrop } from "@/components/backgrounds/SoftSkyBackdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "Red Flag Analysis", color: "bg-[#E4554C]/10", text: "text-[#D23B30]", href: "/(red-flag-analysis)/red-flag-analysis" },
  { label: "Legal Templates", color: "bg-[#5C8FF5]/10", text: "text-[#2855C5]", href: "/(documents)/documents" },
  { label: "Case Timeline", color: "bg-[#7B6FF0]/10", text: "text-[#5146C2]", href: "/(tabs)" },
  { label: "Lawyers Marketplace", color: "bg-[#4E8BD9]/10", text: "text-[#205794]", href: "/(tabs)" },
  { label: "Fund Your Case", color: "bg-[#32C282]/10", text: "text-[#178556]", href: "/(tabs)" },
];

const navigationLinks = [
  { label: "Auth", href: "/(auth)/auth" },
  { label: "Document Builder", href: "/(documents)/documents" },
  { label: "Chat", href: "/chat" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/(tabs)/settings" },
  { label: "Portfolio", href: "/portfolio" },
];

export default function Onboarding() {
  return (
    <SoftSkyBackdrop>
      {/* <SafeAreaView className="flex-1"> */}
      <ScrollView contentContainerClassName="px-6 pb-12 pt-10">
        <Badge variant="outline" className="self-start bg-white/70 px-3 py-1 backdrop-blur">
          <Text className="text-xs font-semibold uppercase tracking-wide text-[#205794]">
            Meet your AI law firm
          </Text>
        </Badge>

        <Text variant="h1" className="mt-6 text-left text-[#14203B]">
          Navigate every dispute with confidence.
        </Text>
        <Text variant="lead" className="mt-4 text-left text-[#38486B]">
          Draft documents, flag risks, collaborate with attorneys, and unlock funding—all from a
          single mobile hub.
        </Text>

        <Card className="mt-8 bg-white/80">
          <CardHeader className="gap-2">
            <CardTitle className="text-lg text-[#14203B]">Quick actions</CardTitle>
            <CardDescription className="text-[#52658F]">
              Jump back into the workflows you use most often.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-row flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href as any} asChild>
                <Badge
                  variant="outline"
                  className={cn(
                    "border-transparent rounded-full px-4 py-2 shadow-sm",
                    action.color,
                    action.text
                  )}
                >
                  <Text className="text-sm font-semibold">{action.label}</Text>
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-6 bg-white/80">
          <CardHeader className="gap-2">
            <CardTitle className="text-lg text-[#14203B]">Continue exploring</CardTitle>
            <CardDescription className="text-[#52658F]">
              Access feature demos and upcoming flows.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href as any} asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#CFDAF4] bg-white/90 shadow-sm shadow-black/5"
                >
                  <Text className="text-[#1B2745] text-base font-semibold">{link.label}</Text>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-10 bg-[#14203B]">
          <CardHeader className="gap-3">
            <CardTitle className="text-[#FDFCFB] text-xl">
              Ready to fund a promising case?
            </CardTitle>
            <CardDescription className="text-[#E5EEFF] text-base">
              Discover vetted claims with precedent-backed insights and unlock legal capital in
              under five minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Link href="/(tabs)" asChild>
              <Button className="bg-[#32C282]" size="lg" variant="default">
                <Text className="text-white text-base font-semibold">Browse litigation campaigns</Text>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </ScrollView>
      {/* </SafeAreaView> */}
    </SoftSkyBackdrop>
  );
}