import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { Splash } from "@/components/splash";
import { Button } from "@/components/ui/button";
import { useHydrated, useStudio } from "@/lib/store";

export const Route = createFileRoute("/select-location")({
  ssr: false,
  component: SelectLocationPage,
});

function SelectLocationPage() {
  const hydrated = useHydrated();
  const navigate = useNavigate();
  const userId = useStudio((s) => s.sessionUserId);
  const user = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId));
  const locations = useStudio((s) => {
    if (!s.sessionUserId) return [];
    const ids = s.userLocations.filter((ul) => ul.userId === s.sessionUserId).map((ul) => ul.locationId);
    return s.locations.filter((l) => l.isActive && ids.includes(l.id));
  });
  const selectLocation = useStudio((s) => s.selectLocation);
  const logout = useStudio((s) => s.logout);

  if (!hydrated) return <Splash />;
  if (!userId) return <Navigate to="/login" />;

  return (
    <div className="min-h-dvh bg-background px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src="/bao-ngoc-logo.png" alt="Bảo Ngọc" className="h-20 w-auto object-contain" />
          <h1 className="mt-5 font-display text-3xl font-medium tracking-tight">Chọn cơ sở làm việc</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Xin chào {user?.fullName}. Dữ liệu hội viên, kho và giao dịch được lọc theo cơ sở bạn chọn.
          </p>
        </div>
        <div className="grid gap-3">
          {locations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              className="flex items-start gap-4 rounded-xl bg-card p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]"
              onClick={() => {
                const res = selectLocation(loc.id);
                if (!res.ok) {
                  toast.error(res.message);
                  return;
                }
                toast.success(res.message);
                navigate({ to: "/dashboard" });
              }}
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-sage/20 text-olive">
                <MapPin className="size-5" />
              </span>
              <span>
                <span className="block font-display text-lg font-medium">{loc.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{loc.address || "Chưa có địa chỉ"}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
}
