import { useMemo, useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { SearchField } from "@/components/search-field";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDateTime } from "@/lib/format";
import { canViewAudit } from "@/lib/permissions";
import { useStudio } from "@/lib/store";
import { matchesQuery } from "@/lib/utils";

export const Route = createFileRoute("/_app/audit")({
  component: AuditPage,
});

function AuditPage() {
  const role = useStudio((s) => s.users.find((u) => u.id === s.sessionUserId)?.role ?? null);
  const logs = useStudio((s) => s.auditLogs);
  const users = useStudio((s) => s.users);
  const locations = useStudio((s) => s.locations);
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<(typeof logs)[number] | null>(null);
  const rows = useMemo(
    () =>
      logs.filter((l) => {
        const user = users.find((u) => u.id === l.userId);
        return matchesQuery(`${l.action} ${l.entityType} ${l.details} ${user?.fullName ?? ""}`, q);
      }),
    [logs, users, q],
  );

  if (!canViewAudit(role)) return <Navigate to="/dashboard" />;

  return (
    <div>
      <PageHeader title="Nhật ký hệ thống" description="Mọi thao tác quan trọng được ghi lại theo người dùng và cơ sở." />
      <SearchField value={q} onChange={setQ} placeholder="Lọc hành động, người dùng, nội dung" className="mb-4" />
      {rows.length === 0 ? (
        <EmptyState icon={ScrollText} title="Không có nhật ký" />
      ) : (
        <div className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
          <div className="hidden grid-cols-[8rem_7rem_1fr_9rem] gap-3 bg-muted/60 px-4 py-3 text-xs uppercase tracking-[0.12em] text-muted-foreground md:grid">
            <span>Thời gian</span>
            <span>Hành động</span>
            <span>Chi tiết</span>
            <span>Người dùng</span>
          </div>
          {rows.slice(0, 80).map((l) => {
            const user = users.find((u) => u.id === l.userId);
            const loc = locations.find((x) => x.id === l.locationId);
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setDetail(l)}
                className="grid w-full gap-1 border-t border-border px-4 py-3 text-left text-sm hover:bg-muted/40 md:grid-cols-[8rem_7rem_1fr_9rem] md:items-center md:gap-3"
              >
                <span className="text-xs text-muted-foreground md:text-sm">{formatDateTime(l.createdAt)}</span>
                <Badge variant="muted">{l.action}</Badge>
                <span className="truncate">{l.details}</span>
                <span className="text-muted-foreground">{user?.fullName}</span>
                <span className="sr-only">{loc?.name}</span>
              </button>
            );
          })}
        </div>
      )}
      <Dialog open={Boolean(detail)} onOpenChange={(v) => !v && setDetail(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết nhật ký</DialogTitle>
          </DialogHeader>
          {detail ? (
            <dl className="grid gap-2 text-sm">
              <Row k="Hành động" v={detail.action} />
              <Row k="Đối tượng" v={`${detail.entityType} #${detail.entityId ?? "—"}`} />
              <Row k="Nội dung" v={detail.details} />
              <Row k="Người dùng" v={users.find((u) => u.id === detail.userId)?.fullName ?? "—"} />
              <Row k="Cơ sở" v={locations.find((l) => l.id === detail.locationId)?.name ?? "—"} />
              <Row k="Thời gian" v={formatDateTime(detail.createdAt)} />
            </dl>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
