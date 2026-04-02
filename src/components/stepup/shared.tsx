import { DAILY_GOAL, weekData } from "./data";

// ─── Ring Progress SVG ────────────────────────────────────────────────────────
export function RingProgress({ steps, goal }: { steps: number; goal: number }) {
  const pct = Math.min(steps / goal, 1);
  const r = 80;
  const cx = 100;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - pct * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      <div className="absolute inset-0 rounded-full" style={{
        background: `radial-gradient(circle, rgba(255,107,26,0.12) 0%, transparent 70%)`
      }} />
      <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,107,26,0.1)" strokeWidth="12" />
        <circle cx={cx} cy={cx} r={64} fill="none" stroke="rgba(0,245,160,0.12)" strokeWidth="8" />
        <circle
          cx={cx} cy={cx} r={64} fill="none"
          stroke="var(--neon-green)" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 64}`}
          strokeDashoffset={`${2 * Math.PI * 64 * (1 - Math.min(pct * 1.2, 1))}`}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)" }}
          opacity="0.7"
        />
        <circle
          cx={cx} cy={cx} r={r} fill="none"
          stroke="url(#orangeGrad)" strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={`${offset}`}
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)", filter: "drop-shadow(0 0 6px #FF6B1A)" }}
        />
        <defs>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B1A" />
            <stop offset="100%" stopColor="#FFE600" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-medium" style={{ color: "var(--neon-green)", fontFamily: "Rubik", letterSpacing: 2 }}>
          ШАГОВ
        </span>
        <span className="font-bold leading-none mt-1 text-glow-orange" style={{
          fontFamily: "Oswald", fontSize: 42, color: "white"
        }}>
          {steps.toLocaleString("ru")}
        </span>
        <span className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Rubik" }}>
          из {goal.toLocaleString("ru")}
        </span>
      </div>
    </div>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────
export function BarChart({ data, period }: { data: typeof weekData; period: string }) {
  const maxSteps = Math.max(...data.map(d => d.steps));
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="flex items-end gap-1 h-28 w-full">
      {data.map((d, i) => {
        const h = (d.steps / maxSteps) * 100;
        const isToday = period === "week" && i === dayIndex;
        const isGoal = d.steps >= DAILY_GOAL;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end justify-center" style={{ height: 96 }}>
              <div
                className="w-full bar-animated"
                style={{
                  height: `${h}%`,
                  background: isGoal
                    ? "linear-gradient(180deg, var(--neon-green), rgba(0,245,160,0.4))"
                    : isToday
                    ? "linear-gradient(180deg, var(--neon-orange), rgba(255,107,26,0.4))"
                    : "rgba(255,107,26,0.25)",
                  boxShadow: isGoal ? "0 0 8px rgba(0,245,160,0.4)" : isToday ? "0 0 8px rgba(255,107,26,0.5)" : "none",
                  animationDelay: `${i * 0.08}s`,
                  borderRadius: "4px 4px 0 0",
                }}
              />
            </div>
            <span style={{ fontSize: 9, color: isToday ? "var(--neon-orange)" : "rgba(255,255,255,0.35)", fontFamily: "Rubik" }}>
              {"day" in d ? (d as { day: string; steps: number; calories: number }).day : (d as { label: string; steps: number }).label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
