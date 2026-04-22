import { cn } from "@/lib/cn";

export function Pill({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide",
        tone === "default" && "border-line bg-bg-1 text-fg-1",
        tone === "accent" && "border-accent/30 bg-accent/10 text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
