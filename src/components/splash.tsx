export function Splash() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6">
      <div className="app-loader-mark splash-mark">
        <span className="app-loader-ring" />
        <img src="/bao-ngoc-logo.png" alt="Bảo Ngọc" className="h-20 w-auto object-contain" />
      </div>
      <p className="mt-5 text-sm tracking-[0.28em] text-muted-foreground">FITNESS AND YOGA</p>
      <p className="mt-2 text-xs text-muted-foreground">Đang tải...</p>
    </div>
  );
}
