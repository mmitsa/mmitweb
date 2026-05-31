import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type Node = { x: number; y: number; d: string; icon: string; label: string; delay: string };

// Coordinates in a 0–100 viewBox (≈ container %).
const NODES: Node[] = [
  { x: 26, y: 18, d: "M50 50 Q 36 30 26 18", icon: "security", label: "أمن سيبراني", delay: "0s" },
  { x: 20, y: 80, d: "M50 50 Q 32 68 20 80", icon: "lan", label: "شبكات واتصالات", delay: "0.8s" },
  { x: 83, y: 32, d: "M50 50 Q 70 40 83 32", icon: "cloud_done", label: "تحول رقمي", delay: "1.6s" },
  { x: 78, y: 82, d: "M50 50 Q 66 70 78 82", icon: "analytics", label: "تحليل بيانات", delay: "2.4s" },
];

/** Signature hero illustration: a live "paths" network with the M mark at its core. */
export function PathsNetwork({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {/* base routes */}
        {NODES.map((n) => (
          <path
            key={`base-${n.label}`}
            d={n.d}
            fill="none"
            stroke="#324cd6"
            strokeOpacity="0.18"
            strokeWidth="0.6"
          />
        ))}
        {/* traveling signal pulses */}
        {NODES.map((n) => (
          <path
            key={`sig-${n.label}`}
            d={n.d}
            fill="none"
            stroke="#4cd6ff"
            strokeWidth="1.1"
            strokeLinecap="round"
            className="signal-route"
            style={{ animationDelay: n.delay }}
          />
        ))}
        {/* nodes */}
        {NODES.map((n) => (
          <g key={`node-${n.label}`}>
            <circle cx={n.x} cy={n.y} r="2.4" fill="#4e67f0" fillOpacity="0.25" className="node-ring" style={{ animationDelay: n.delay }} />
            <circle cx={n.x} cy={n.y} r="1.7" fill="#324cd6" className="node-core" style={{ animationDelay: n.delay }} />
          </g>
        ))}
      </svg>

      {/* Node labels */}
      {NODES.map((n) => (
        <div
          key={`chip-${n.label}`}
          className="absolute flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-outline-variant/30 bg-surface-container-lowest px-2.5 py-1.5 text-xs font-head text-on-surface shadow-sm"
          style={{ top: `${n.y}%`, left: `${n.x}%`, transform: "translate(-50%, -50%)" }}
        >
          <Icon name={n.icon} className="text-[16px] text-secondary" />
          {n.label}
        </div>
      ))}

      {/* Core M node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -inset-6 rounded-full bg-secondary/20 blur-2xl" />
        <div className="animate-float relative flex h-28 w-28 items-center justify-center rounded-3xl border border-outline-variant/30 bg-surface-container-lowest shadow-[0_20px_50px_-16px_rgba(50,76,214,0.45)]">
          <Logo className="h-16 w-auto" />
        </div>
      </div>
    </div>
  );
}

const BACKDROP_PATHS = [
  "M-5 30 Q 30 10 55 32 T 110 28",
  "M-5 62 Q 25 48 50 64 T 110 58",
  "M-5 88 Q 35 72 60 90 T 110 84",
];

/** Faint full-bleed paths backdrop for light section/hero backgrounds. */
export function PathsBackdrop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      {BACKDROP_PATHS.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="#324cd6" strokeOpacity="0.10" strokeWidth="0.4" />
          <path
            d={d}
            fill="none"
            stroke="#4cd6ff"
            strokeWidth="0.5"
            strokeLinecap="round"
            className="signal-route"
            style={{ animationDelay: `${i * 1.1}s`, animationDuration: "5s" }}
          />
        </g>
      ))}
    </svg>
  );
}
