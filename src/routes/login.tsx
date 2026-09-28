import { useState, type FormEvent } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/field";
import { Splash } from "@/components/splash";
import { useLoading } from "@/lib/loading";
import { DEMO_ACCOUNTS } from "@/lib/seed";
import { ROLE_LABELS } from "@/lib/types";
import { useHydrated, useStudio } from "@/lib/store";

export const Route = createFileRoute("/login")({
  ssr: false,
  component: LoginPage,
});

function LoginPage() {
  const hydrated = useHydrated();
  const navigate = useNavigate();
  const userId = useStudio((s) => s.sessionUserId);
  const login = useStudio((s) => s.login);
  const { busy } = useLoading();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  if (!hydrated) return <Splash />;
  if (userId) return <Navigate to="/select-location" />;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const res = login(username, password);
    if (!res.ok) {
      setError(res.message);
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    navigate({ to: "/select-location" });
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(143,175,157,0.18),transparent_55%)]" />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src="/bao-ngoc-logo.png" alt="Bảo Ngọc" className="h-28 w-auto object-contain sm:h-32" />
          <p className="mt-3 text-[11px] tracking-[0.32em] text-muted-foreground">FITNESS AND YOGA</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)] sm:p-6"
        >
          <h1 className="font-display text-2xl font-medium tracking-tight">Đăng nhập</h1>
          <p className="mt-1 text-sm text-muted-foreground">Dành cho giáo viên và quản lý cơ sở.</p>
          <div className="mt-5 grid gap-4">
            <Field label="Tên đăng nhập" required>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
            </Field>
            <Field label="Mật khẩu" required>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Field>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="h-11 w-full" loading={busy}>
              Vào hệ thống
            </Button>
          </div>
        </form>
        <div className="mt-5 rounded-xl bg-card/80 p-4 shadow-[var(--shadow-border)]">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Tài khoản demo</p>
          <div className="mt-3 grid gap-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.username}
                type="button"
                className="flex w-full items-center justify-between rounded-lg bg-muted/70 px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                onClick={() => {
                  setUsername(acc.username);
                  setPassword(acc.password);
                  setError("");
                }}
              >
                <span>
                  <span className="font-medium">{acc.name}</span>
                  <span className="ml-2 text-muted-foreground">{ROLE_LABELS[acc.role]}</span>
                </span>
                <span className="font-mono text-xs text-olive">
                  {acc.username} / {acc.password}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
