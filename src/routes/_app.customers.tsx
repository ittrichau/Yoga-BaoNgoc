import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { EmptyState } from "@/components/empty-state";
import { Field } from "@/components/field";
import { PageHeader } from "@/components/page-header";
import { SearchField } from "@/components/search-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/format";
import { canEditCustomer, canSoftDelete } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import type { Customer } from "@/lib/types";
import { initials, matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/_app/customers")({
  component: CustomersPage,
});

function CustomersPage() {
  const locId = useStudio((s) => s.sessionLocationId);
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const customers = useStudio((s) => s.customers.filter((c) => c.locationId === locId && c.isActive));
  const nextCode = useStudio((s) => (locId ? s.nextCustomerCode(locId) : "HV000001"));
  const upsert = useStudio((s) => s.upsertCustomer);
  const deactivate = useStudio((s) => s.deactivateCustomer);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Customer | null>(null);
  const [form, setForm] = useState({ fullName: "", phone: "", birthDate: "", notes: "" });

  const rows = useMemo(
    () => customers.filter((c) => matchesQuery(`${c.code} ${c.fullName} ${c.phone} ${c.notes}`, q)),
    [customers, q],
  );

  function openCreate() {
    setEditing(null);
    setForm({ fullName: "", phone: "", birthDate: "", notes: "" });
    setOpen(true);
  }
  function openEdit(c: Customer) {
    setEditing(c);
    setForm({ fullName: c.fullName, phone: c.phone, birthDate: c.birthDate, notes: c.notes });
    setOpen(true);
  }

  return (
    <div>
      <PageHeader
        title="Hội viên"
        description={`${customers.length} hội viên đang hoạt động · mã tiếp theo ${nextCode}`}
        actions={
          <Button onClick={openCreate}>
            <Plus className="size-4" /> Thêm hội viên
          </Button>
        }
      />
      <div className="mb-4">
        <SearchField value={q} onChange={setQ} placeholder="Tìm mã, tên, số điện thoại" />
      </div>
      {rows.length === 0 ? (
        <EmptyState icon={Users} title="Không có hội viên" description="Thêm hội viên mới hoặc đổi từ khóa tìm kiếm." />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] md:block">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Hội viên</th>
                  <th className="px-4 py-3 font-medium">Mã</th>
                  <th className="px-4 py-3 font-medium">Điện thoại</th>
                  <th className="px-4 py-3 font-medium">Ngày sinh</th>
                  <th className="px-4 py-3 font-medium">Ghi chú</th>
                  <th className="px-4 py-3 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-full bg-sage/20 text-xs font-medium text-olive">
                          {initials(c.fullName)}
                        </span>
                        <span className="font-medium">{c.fullName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="muted">{c.code}</Badge>
                    </td>
                    <td className="px-4 py-3 tabular-nums">{c.phone || "—"}</td>
                    <td className="px-4 py-3">{formatDate(c.birthDate)}</td>
                    <td className="max-w-48 truncate px-4 py-3 text-muted-foreground">{c.notes || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        {canEditCustomer(role) ? (
                          <Button variant="ghost" size="icon" aria-label="Sửa" onClick={() => openEdit(c)}>
                            <Pencil className="size-4" />
                          </Button>
                        ) : null}
                        {canSoftDelete(role) ? (
                          <Button variant="ghost" size="icon" aria-label="Vô hiệu hóa" onClick={() => setPendingDelete(c)}>
                            <Trash2 className="size-4" />
                          </Button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 md:hidden">
            {rows.map((c) => (
              <div key={c.id} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-sage/20 text-xs font-medium text-olive">
                      {initials(c.fullName)}
                    </span>
                    <div>
                      <p className="font-medium">{c.fullName}</p>
                      <p className="text-xs text-muted-foreground">{c.code}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {canEditCustomer(role) ? (
                      <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                        <Pencil className="size-4" />
                      </Button>
                    ) : null}
                    {canSoftDelete(role) ? (
                      <Button variant="ghost" size="icon" onClick={() => setPendingDelete(c)}>
                        <Trash2 className="size-4" />
                      </Button>
                    ) : null}
                  </div>
                </div>
                <dl className="mt-3 grid gap-1 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Điện thoại</dt>
                    <dd>{c.phone || "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Ngày sinh</dt>
                    <dd>{formatDate(c.birthDate)}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa hội viên" : "Thêm hội viên"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {!editing ? (
              <p className="text-sm text-muted-foreground">
                Mã sẽ được cấp tự động: <span className="font-medium text-foreground">{nextCode}</span>
              </p>
            ) : null}
            <Field label="Họ tên" required>
              <Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </Field>
            <Field label="Số điện thoại">
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Ngày sinh">
              <Input type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
            </Field>
            <Field label="Ghi chú">
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                const res = upsert({ id: editing?.id, ...form });
                if (!res.ok) toast.error(res.message);
                else {
                  toast.success(res.message);
                  setOpen(false);
                }
              }}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(v) => !v && setPendingDelete(null)}
        title="Vô hiệu hóa hội viên?"
        description={`Hội viên ${pendingDelete?.fullName} sẽ không còn hiện trong danh sách, nhưng lịch sử giao dịch được giữ lại.`}
        confirmLabel="Vô hiệu hóa"
        destructive
        onConfirm={() => {
          if (!pendingDelete) return;
          const res = deactivate(pendingDelete.id);
          if (res.ok) toast.success(res.message);
          else toast.error(res.message);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
