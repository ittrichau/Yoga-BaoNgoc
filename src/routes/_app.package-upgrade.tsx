import { useMemo, useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Field } from "@/components/field";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatVnd } from "@/lib/format";
import { canManageTemplates } from "@/lib/permissions";
import { useStudio } from "@/lib/store";

export const Route = createFileRoute("/_app/package-upgrade")({
  component: UpgradePage,
});

function UpgradePage() {
  const locId = useStudio((s) => s.sessionLocationId)!;
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
  const packages = useStudio((s) => s.packages.filter((p) => p.locationId === locId && p.isActive));
  const items = useStudio((s) => s.packageItems);
  const templates = useStudio((s) => s.packageTemplates.filter((t) => t.locationId === locId && t.isActive));
  const upgrade = useStudio((s) => s.upgradePackage);
  const [packageId, setPackageId] = useState(packages[0]?.id ?? 0);
  const [templateId, setTemplateId] = useState(templates[templates.length - 1]?.id ?? 0);
  const [confirm, setConfirm] = useState(false);

  if (!canManageTemplates(role)) return <Navigate to="/dashboard" />;

  const pkg = packages.find((p) => p.id === packageId);
  const tpl = templates.find((t) => t.id === templateId);
  const customer = customers.find((c) => c.id === pkg?.customerId);
  const drinksLeft = items.filter((i) => i.packageId === pkg?.id).reduce((s, i) => s + i.remainingServings, 0);

  const preview = useMemo(() => {
    if (!pkg || !tpl) return null;
    return {
      sessions: tpl.totalSessions + pkg.remainingSessions,
      drinks: tpl.totalDrinks + drinksLeft,
      pay: Math.max(0, tpl.totalAmount - pkg.totalAmount),
    };
  }, [pkg, tpl, drinksLeft]);

  return (
    <div>
      <PageHeader title="Nâng cấp gói" description="Cộng dồn buổi và ly còn lại sang mẫu gói cao hơn, vô hiệu hóa gói cũ." />
      <Card className="max-w-xl">
        <CardContent className="grid gap-4 p-5">
          <Field label="Gói hiện tại">
            <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={packageId} onChange={(e) => setPackageId(Number(e.target.value))}>
              {packages.map((p) => {
                const c = customers.find((x) => x.id === p.customerId);
                return (
                  <option key={p.id} value={p.id}>
                    {c?.fullName} · {p.name}
                  </option>
                );
              })}
            </select>
          </Field>
          <Field label="Mẫu gói mới">
            <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={templateId} onChange={(e) => setTemplateId(Number(e.target.value))}>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} · {formatVnd(t.totalAmount)}
                </option>
              ))}
            </select>
          </Field>
          {pkg && tpl && preview ? (
            <div className="rounded-lg bg-muted/70 p-4 text-sm">
              <p>
                Hội viên <span className="font-medium">{customer?.fullName}</span>
              </p>
              <p className="mt-2">Buổi sau nâng cấp: {preview.sessions}</p>
              <p>Ly sau nâng cấp: {preview.drinks}</p>
              <p className="mt-2 font-medium">Thu thêm: {formatVnd(preview.pay)}</p>
            </div>
          ) : null}
          <Button onClick={() => setConfirm(true)} disabled={!pkg || !tpl}>
            <ArrowUpRight className="size-4" /> Nâng cấp
          </Button>
        </CardContent>
      </Card>
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="Xác nhận nâng cấp gói?"
        description="Gói cũ sẽ bị vô hiệu. Buổi và ly còn lại được cộng vào gói mới."
        confirmLabel="Nâng cấp"
        onConfirm={() => {
          const res = upgrade({ packageId, templateId });
          if (res.ok) toast.success(res.message);
          else toast.error(res.message);
          setConfirm(false);
        }}
      />
    </div>
  );
}
