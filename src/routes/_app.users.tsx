import { useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Pencil, Plus, RotateCcw, UserRound } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Field } from "@/components/field";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { canManageUsers } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import { ROLE_LABELS, type Role, type User } from "@/lib/types";

export const Route = createFileRoute("/_app/users")({
  component: UsersPage,
});

function UsersPage() {
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const users = useStudio((s) => s.users);
  const locations = useStudio((s) => s.locations.filter((l) => l.isActive));
  const userLocations = useStudio((s) => s.userLocations);
  const upsert = useStudio((s) => s.upsertUser);
  const setActive = useStudio((s) => s.setUserActive);
  const resetDemo = useStudio((s) => s.resetDemo);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [pending, setPending] = useState<User | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullName: "",
    role: "TEACHER" as Role,
    locationIds: [] as number[],
  });

  if (!canManageUsers(role)) return <Navigate to="/dashboard" />;

  function start(user?: User) {
    setEditing(user ?? null);
    setForm(
      user
        ? {
            username: user.username,
            password: "",
            fullName: user.fullName,
            role: user.role,
            locationIds: userLocations.filter((ul) => ul.userId === user.id).map((ul) => ul.locationId),
          }
        : { username: "", password: "", fullName: "", role: "TEACHER", locationIds: [] },
    );
    setOpen(true);
  }

  return (
    <div>
      <PageHeader
        title="Người dùng"
        description="Tài khoản giáo viên, chủ phòng và admin. Để trống cơ sở khi tạo mới sẽ gán tất cả cơ sở."
        actions={
          <>
            <Button variant="outline" onClick={() => setResetOpen(true)}>
              <RotateCcw className="size-4" /> Khôi phục dữ liệu mẫu
            </Button>
            <Button onClick={() => start()}>
              <Plus className="size-4" /> Thêm người dùng
            </Button>
          </>
        }
      />
      <div className="grid gap-3">
        {users.map((u) => {
          const locs = userLocations.filter((ul) => ul.userId === u.id).map((ul) => locations.find((l) => l.id === ul.locationId)?.name).filter(Boolean);
          return (
            <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-sage/20 text-olive">
                  <UserRound className="size-4" />
                </span>
                <div>
                  <p className="font-medium">{u.fullName}</p>
                  <p className="text-sm text-muted-foreground">{u.username} · {locs.join(", ") || "Chưa gán cơ sở"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={u.isActive ? "success" : "muted"}>{ROLE_LABELS[u.role]}</Badge>
                <Button variant="ghost" size="icon" onClick={() => start(u)}>
                  <Pencil className="size-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPending(u)}>
                  {u.isActive ? "Khóa" : "Mở"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Sửa người dùng" : "Thêm người dùng"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Field label="Họ tên" required>
              <Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </Field>
            <Field label="Tên đăng nhập" required>
              <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </Field>
            <Field label={editing ? "Mật khẩu mới (để trống nếu giữ nguyên)" : "Mật khẩu"} required={!editing}>
              <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </Field>
            <Field label="Vai trò">
              <select className="h-10 rounded-md border border-input bg-card px-3 text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
                {Object.entries(ROLE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </Field>
            <div>
              <p className="mb-2 text-sm font-medium">Cơ sở (để trống = tất cả)</p>
              <div className="grid gap-2">
                {locations.map((l) => {
                  const checked = form.locationIds.includes(l.id);
                  return (
                    <label key={l.id} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(v) =>
                          setForm((f) => ({
                            ...f,
                            locationIds: v ? [...f.locationIds, l.id] : f.locationIds.filter((id) => id !== l.id),
                          }))
                        }
                      />
                      {l.name}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
            <Button
              onClick={() => {
                const res = upsert({ id: editing?.id, ...form, password: form.password || undefined });
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
        title={pending?.isActive ? "Khóa tài khoản?" : "Mở lại tài khoản?"}
        description={pending ? `${pending.fullName} (${pending.username})` : ""}
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
      <ConfirmDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Khôi phục dữ liệu mẫu?"
        description="Toàn bộ thay đổi local sẽ bị xóa và khôi phục studio demo Bảo Ngọc."
        confirmLabel="Khôi phục"
        destructive
        onConfirm={() => {
          resetDemo();
          toast.success("Đã khôi phục dữ liệu mẫu. Đăng nhập lại để tiếp tục.");
          setResetOpen(false);
        }}
      />
    </div>
  );
}
