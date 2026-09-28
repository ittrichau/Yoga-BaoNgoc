import { useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { MapPin, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Field } from "@/components/field";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { canManageUsers } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import type { Location } from "@/lib/types";

export const Route = createFileRoute("/_app/locations")({
  component: LocationsPage,
});

function LocationsPage() {
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const locations = useStudio((s) => s.locations);
  const upsert = useStudio((s) => s.upsertLocation);
  const setActive = useStudio((s) => s.setLocationActive);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Location | null>(null);
  const [pending, setPending] = useState<Location | null>(null);
  const [form, setForm] = useState({ name: "", address: "" });

  if (!canManageUsers(role)) return <Navigate to="/dashboard" />;

  function start(loc?: Location) {
    setEditing(loc ?? null);
    setForm(loc ? { name: loc.name, address: loc.address } : { name: "", address: "" });
    setOpen(true);
  }

  return (
    <div>
      <PageHeader
        title="Cơ sở"
        description="Dữ liệu hội viên, kho và giao dịch luôn gắn với một cơ sở."
        actions={
          <Button onClick={() => start()}>
            <Plus className="size-4" /> Thêm cơ sở
          </Button>
        }
      />
      <div className="grid gap-3">
        {locations.map((l) => (
          <div key={l.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-sage/20 text-olive">
                <MapPin className="size-4" />
              </span>
              <div>
                <p className="font-medium">{l.name}</p>
                <p className="text-sm text-muted-foreground">{l.address || "Chưa có địa chỉ"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={l.isActive ? "success" : "muted"}>{l.isActive ? "Hoạt động" : "Khóa"}</Badge>
              <Button variant="ghost" size="icon" onClick={() => start(l)}>
                <Pencil className="size-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPending(l)}>
                {l.isActive ? "Khóa" : "Mở"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa cơ sở" : "Thêm cơ sở"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Tên cơ sở" required>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Địa chỉ">
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
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
        title={pending?.isActive ? "Khóa cơ sở?" : "Mở lại cơ sở?"}
        description={pending?.name ?? ""}
        confirmLabel={pending?.isActive ? "Khóa" : "Mở lại"}
        destructive={pending?.isActive}
        onConfirm={() => {
          if (!pending) return;
          const res = setActive(pending.id, !pending.isActive);
          if (res.ok) toast.success(res.message);
          else toast.error(res.message);
          setPending(null);
        }}
      />
    </div>
  );
}
