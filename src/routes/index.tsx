import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Splash } from "@/components/splash";
import { useHydrated, useStudio } from "@/lib/store";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Home,
});

function Home() {
  const hydrated = useHydrated();
  const userId = useStudio((s) => s.sessionUserId);
  const locationId = useStudio((s) => s.sessionLocationId);
  if (!hydrated) return <Splash />;
  if (!userId) return <Navigate to="/login" />;
  if (!locationId) return <Navigate to="/select-location" />;
  return <Navigate to="/dashboard" />;
}
