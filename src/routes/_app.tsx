import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageEnter } from "@/components/app-loader";
import { Splash } from "@/components/splash";
import { useHydrated, useStudio } from "@/lib/store";

export const Route = createFileRoute("/_app")({
  ssr: false,
  component: AppLayout,
});

function AppLayout() {
  const hydrated = useHydrated();
  const userId = useStudio((s) => s.sessionUserId);
  const locationId = useStudio((s) => s.sessionLocationId);
  if (!hydrated) return <Splash />;
  if (!userId) return <Navigate to="/login" />;
  if (!locationId) return <Navigate to="/select-location" />;
  return (
    <AppShell>
      <PageEnter>
        <Outlet />
      </PageEnter>
    </AppShell>
  );
}
