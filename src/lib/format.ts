const pad = (n: number) => String(n).padStart(2, "0");

export function formatVnd(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n);
}

export function isoDate(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function stamp(d = new Date()) {
  return `${isoDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function addDays(dateStr: string, days: number) {
  const d = parseDate(dateStr);
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

export function parseDate(dateStr: string) {
  const [y, m, day] = dateStr.slice(0, 10).split("-").map(Number);
  return new Date(y, (m || 1) - 1, day || 1);
}

export function daysBetween(from: string, to: string) {
  const a = parseDate(from).getTime();
  const b = parseDate(to).getTime();
  return Math.round((b - a) / 86400000);
}

export function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  const d = parseDate(dateStr);
  return d.toLocaleDateString("vi-VN");
}

export function formatDateTime(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  const datePart = dateStr.slice(0, 10);
  const timePart = dateStr.slice(11, 16);
  return timePart ? `${formatDate(datePart)} ${timePart}` : formatDate(datePart);
}

export function isBirthdayToday(birthDate: string | null | undefined) {
  if (!birthDate) return false;
  const today = isoDate();
  return birthDate.slice(5, 10) === today.slice(5, 10);
}

export function timeAgo(dateStr: string) {
  const d = new Date(dateStr.replace(" ", "T"));
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  return formatDateTime(dateStr);
}
