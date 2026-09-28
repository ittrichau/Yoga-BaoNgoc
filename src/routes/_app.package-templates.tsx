import { useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { ClipboardList, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { Field } from "@/components/field";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatVnd } from "@/lib/format";
import { canManageTemplates } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import { PACKAGE_TYPE_LABELS, type PackageTemplate, type PackageType } from "@/lib/types";

export const Route = createFileRoute("/_app/package-templates")({
  component: TemplatesPage,
});

function TemplatesPage() {
  const locId = useStudio((s) => s.sessionLocationId)!;
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const rows = useStudio((s) => s.packageTemplates.filter((t) => t.locationId === locId && t.isActive));
  const upsert = useStudio((s) => s.upsertTemplate);
  const deactivate = useStudio((s) => s.deactivateTemplate);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PackageTemplate | null>(null);
  const [pending, setPending] = useState<PackageTemplate | null>(null);
  const [form, setForm] = useState({
    name: "",
    packageType: "BASIC" as PackageType,
    durationDays: 90,
    totalSessions: 36,
    totalDrinks: 36,
    totalAmount: 3200000,
  });

  if (!canManageTemplates(role)) return <Navigate to="/dashboard" />;

  function start(row?: PackageTemplate) {
    setEditing(row ?? null);
    setForm(
      row
        ? {
            name: row.name,
            packageType: row.packageType,
            durationDays: row.durationDays,
            totalSessions: row.totalSessions,
            totalDrinks: row.totalDrinks,
            totalAmount: row.totalAmount,
          }
        : { name: "", packageType: "BASIC", durationDays: 90, totalSessions: 36, totalDrinks: 36, totalAmount: 3200000 },
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader
        title="Mẫu gói"
        description="Mẫu dùng khi gán gói cho hội viên."
        actions={
          <Button onClick={() => start()}>
            <Plus className="size-4" /> Thêm mẫu
          </Button>
        }
      />
      {rows.length === 0 ? (
        <EmptyState icon={ClipboardList} title="Chưa có mẫu gói" />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {rows.map((t) => (
            <div key={t.id} className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-medium">{t.name}</h3>
                  <Badge className="mt-2">{PACKAGE_TYPE_LABELS[t.packageType]}</Badge>
                </div>
                <div className="flex">
                  <Button variant="ghost" size="icon" onClick={() => start(t)}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setPending(t)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Thời hạn</dt>
                  <dd>{t.durationDays} ngày</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Buổi tập</dt>
                  <dd>{t.totalSessions || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Ly đồ uống</dt>
                  <dd>{t.totalDrinks || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Giá</dt>
                  <dd className="tabular-nums">{formatVnd(t.totalAmount)}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa mẫu gói" : "Thêm mẫu gói"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Tên mẫu" required>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Loại">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.packageType} onChange={(e) => setForm({ ...form, packageType: e.target.value as PackageType })}>
                {Object.entries(PACKAGE_TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Số ngày">
                <Input type="number" value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: Number(e.target.value) })} />
              </Field>
              <Field label="Số buổi">
                <Input type="number" value={form.totalSessions} onChange={(e) => setForm({ ...form, totalSessions: Number(e.target.value) })} />
              </Field>
              <Field label="Số ly">
                <Input type="number" value={form.totalDrinks} onChange={(e) => setForm({ ...form, totalDrinks: Number(e.target.value) })} />
              </Field>
              <Field label="Giá (VND)">
                <Input type="number" value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: Number(e.target.value) })} />
              </Field>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                const res = upsert({ id: editing?.id, ...form });
                if (res.ok) {
                  toast.success(res.message);
                  setOpen(false);
                } else toast.error(res.message);
              }}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={Boolean(pending)}
        onOpenChange={(v) => !v && setPending(null)}
        title="Vô hiệu hóa mẫu gói?"
        description={`${pending?.name} sẽ không còn hiện khi gán gói mới.`}
        confirmLabel="Vô hiệu hóa"
        destructive
        onConfirm={() => {
          if (!pending) return;
          const res = deactivate(pending.id);
          if (res.ok) toast.success(res.message);
          else toast.error(res.message);
          setPending(null);
        }}
      />
    </div>
  );
}
