import { useState } from "react";
import Icon from "@/components/ui/icon";
import { RingProgress, BarChart } from "./shared";
import { DAILY_GOAL, weekData, monthData, friends, achievements } from "./data";

// ─── HomeScreen ───────────────────────────────────────────────────────────────
export function HomeScreen({ steps }: { steps: number }) {
  const pct = Math.round((steps / DAILY_GOAL) * 100);
  const calories = Math.round(steps * 0.04);
  const km = (steps * 0.00078).toFixed(1);
  const minutes = Math.round(steps / 100);

  return (
    <div className="flex flex-col items-center gap-5 pb-2 animate-fade-in">
      <div className="w-full flex justify-between items-center">
        <div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "Rubik" }}>ЧЕТВЕРГ, 2 АПРЕЛЯ</p>
          <h2 style={{ fontFamily: "Oswald", fontSize: 20, color: "white" }}>Продолжай, боец! 💪</h2>
        </div>
        <div style={{
          background: "var(--card-bg)", border: "1px solid var(--card-border)",
          borderRadius: 12, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6
        }}>
          <span style={{ fontSize: 14 }}>🔥</span>
          <span style={{ color: "var(--neon-orange)", fontFamily: "Oswald", fontSize: 16 }}>7</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "Rubik" }}>дней</span>
        </div>
      </div>

      <RingProgress steps={steps} goal={DAILY_GOAL} />

      <div className="w-full">
        <div className="flex justify-between mb-2">
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "Rubik" }}>Прогресс дня</span>
          <span style={{ fontSize: 12, color: "var(--neon-orange)", fontFamily: "Oswald" }}>{pct}%</span>
        </div>
        <div style={{ background: "rgba(255,107,26,0.1)", borderRadius: 8, height: 6, overflow: "hidden" }}>
          <div style={{
            width: `${pct}%`, height: "100%",
            background: "linear-gradient(90deg, var(--neon-orange), var(--neon-yellow))",
            borderRadius: 8, transition: "width 1.5s ease",
            boxShadow: "0 0 10px rgba(255,107,26,0.5)"
          }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        {[
          { icon: "Flame", val: `${calories}`, unit: "ккал", color: "var(--neon-orange)" },
          { icon: "MapPin", val: km, unit: "км", color: "var(--neon-blue)" },
          { icon: "Clock", val: `${minutes}`, unit: "мин", color: "var(--neon-green)" },
        ].map((s, i) => (
          <div key={i} className="card-hover animate-slide-up" style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: 16, padding: "12px 8px",
            textAlign: "center",
            animationDelay: `${0.1 + i * 0.1}s`,
            opacity: 0,
          }}>
            <Icon name={s.icon as "Flame"} size={18} style={{ color: s.color, margin: "0 auto 6px" }} />
            <div style={{ fontFamily: "Oswald", fontSize: 22, color: "white" }}>{s.val}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "Rubik" }}>{s.unit}</div>
          </div>
        ))}
      </div>

      <div className="w-full" style={{
        background: "var(--card-bg)", border: "1px solid var(--card-border)",
        borderRadius: 16, padding: 16
      }}>
        <div className="flex justify-between items-center mb-4">
          <h3 style={{ fontFamily: "Oswald", fontSize: 16, color: "white" }}>Активность недели</h3>
          <span style={{ fontSize: 10, color: "var(--neon-green)", fontFamily: "Rubik", letterSpacing: 1 }}>
            ● ОНЛАЙН
          </span>
        </div>
        <BarChart data={weekData} period="week" />
      </div>
    </div>
  );
}

// ─── StatsScreen ──────────────────────────────────────────────────────────────
export function StatsScreen() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const totalSteps = weekData.reduce((a, b) => a + b.steps, 0);
  const totalCal = weekData.reduce((a, b) => a + b.calories, 0);
  const avgSteps = Math.round(totalSteps / weekData.length);

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <h2 style={{ fontFamily: "Oswald", fontSize: 24, color: "white" }}>Статистика</h2>

      <div style={{
        display: "flex", background: "var(--card-bg)",
        border: "1px solid var(--card-border)", borderRadius: 12, padding: 4
      }}>
        {(["week", "month"] as const).map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{
            flex: 1, padding: "8px 0", borderRadius: 10, border: "none",
            fontFamily: "Oswald", fontSize: 14,
            background: period === p ? "var(--neon-orange)" : "transparent",
            color: period === p ? "#0D0F14" : "rgba(255,255,255,0.5)",
            cursor: "pointer", transition: "all 0.2s",
            boxShadow: period === p ? "0 0 12px rgba(255,107,26,0.4)" : "none"
          }}>
            {p === "week" ? "НЕДЕЛЯ" : "МЕСЯЦ"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Всего шагов", val: totalSteps.toLocaleString("ru"), icon: "Footprints", color: "var(--neon-orange)" },
          { label: "Калорий сожжено", val: `${totalCal}`, icon: "Flame", color: "var(--neon-green)" },
          { label: "Среднее/день", val: avgSteps.toLocaleString("ru"), icon: "TrendingUp", color: "var(--neon-blue)" },
          { label: "Цель выполнена", val: "3 дня", icon: "CheckCircle", color: "var(--neon-yellow)" },
        ].map((s, i) => (
          <div key={i} className="card-hover animate-slide-up" style={{
            background: "var(--card-bg)", border: "1px solid var(--card-border)",
            borderRadius: 16, padding: 14, opacity: 0, animationDelay: `${i * 0.1}s`
          }}>
            <Icon name={s.icon as "Flame"} size={20} style={{ color: s.color }} />
            <div style={{ fontFamily: "Oswald", fontSize: 22, color: "white", marginTop: 6 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "Rubik" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: "var(--card-bg)", border: "1px solid var(--card-border)",
        borderRadius: 16, padding: 16
      }}>
        <h3 style={{ fontFamily: "Oswald", fontSize: 16, color: "white", marginBottom: 16 }}>
          {period === "week" ? "Шаги по дням" : "Шаги по месяцу"}
        </h3>
        <BarChart data={period === "week" ? weekData : monthData} period={period} />
      </div>

      <div style={{
        background: "var(--card-bg)", border: "1px solid var(--card-border)",
        borderRadius: 16, padding: 16
      }}>
        <h3 style={{ fontFamily: "Oswald", fontSize: 16, color: "white", marginBottom: 12 }}>Детали недели</h3>
        <div className="flex flex-col gap-2">
          {weekData.map((d, i) => {
            const pct = Math.min((d.steps / DAILY_GOAL) * 100, 100);
            const isGoal = d.steps >= DAILY_GOAL;
            return (
              <div key={i} className="flex items-center gap-3">
                <span style={{ width: 24, fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "Rubik" }}>{d.day}</span>
                <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    width: `${pct}%`, height: "100%", borderRadius: 4,
                    background: isGoal
                      ? "linear-gradient(90deg, var(--neon-green), rgba(0,245,160,0.6))"
                      : "linear-gradient(90deg, var(--neon-orange), rgba(255,107,26,0.6))",
                    transition: "width 1s ease"
                  }} />
                </div>
                <span style={{
                  width: 52, textAlign: "right", fontSize: 12,
                  fontFamily: "Oswald",
                  color: isGoal ? "var(--neon-green)" : "rgba(255,255,255,0.6)"
                }}>
                  {d.steps.toLocaleString("ru")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── GoalsScreen ──────────────────────────────────────────────────────────────
export function GoalsScreen() {
  const goals = [
    { title: "Ежедневная цель", target: 10000, current: 7430, unit: "шагов", icon: "🎯", color: "var(--neon-orange)" },
    { title: "Калории в день", target: 400, current: 297, unit: "ккал", icon: "🔥", color: "var(--neon-green)" },
    { title: "Расстояние в день", target: 8, current: 5.8, unit: "км", icon: "📍", color: "var(--neon-blue)" },
    { title: "Активные минуты", target: 60, current: 74, unit: "мин", icon: "⏱️", color: "var(--neon-yellow)" },
  ];

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 style={{ fontFamily: "Oswald", fontSize: 24, color: "white" }}>Цели активности</h2>
        <button style={{
          background: "var(--neon-orange)", color: "#0D0F14",
          border: "none", borderRadius: 10, padding: "6px 14px",
          fontFamily: "Oswald", fontSize: 13, cursor: "pointer",
          boxShadow: "0 0 12px rgba(255,107,26,0.4)"
        }}>
          + Добавить
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {goals.map((g, i) => {
          const pct = Math.min((g.current / g.target) * 100, 100);
          const done = g.current >= g.target;
          return (
            <div key={i} className="card-hover animate-slide-up" style={{
              background: "var(--card-bg)", border: `1px solid ${done ? "rgba(0,245,160,0.3)" : "var(--card-border)"}`,
              borderRadius: 18, padding: 18, opacity: 0, animationDelay: `${i * 0.1}s`,
              position: "relative", overflow: "hidden"
            }}>
              {done && (
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  background: "var(--neon-green)", color: "#0D0F14",
                  borderRadius: 8, padding: "2px 8px", fontSize: 10, fontFamily: "Oswald"
                }}>
                  ВЫПОЛНЕНО ✓
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: 24 }}>{g.icon}</span>
                <div>
                  <div style={{ fontFamily: "Oswald", fontSize: 16, color: "white" }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "Rubik" }}>
                    Цель: {g.target} {g.unit}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mb-2">
                <span style={{ fontSize: 13, fontFamily: "Oswald", color: done ? "var(--neon-green)" : "var(--neon-orange)" }}>
                  {g.current} {g.unit}
                </span>
                <span style={{ fontSize: 13, fontFamily: "Oswald", color: "rgba(255,255,255,0.4)" }}>
                  {Math.round(pct)}%
                </span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 8, overflow: "hidden" }}>
                <div style={{
                  width: `${pct}%`, height: "100%", borderRadius: 8,
                  background: done
                    ? "linear-gradient(90deg, var(--neon-green), rgba(0,245,160,0.6))"
                    : `linear-gradient(90deg, ${g.color}, rgba(255,107,26,0.4))`,
                  boxShadow: done ? "0 0 10px rgba(0,245,160,0.5)" : `0 0 10px rgba(255,107,26,0.4)`,
                  transition: "width 1s ease"
                }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        background: "linear-gradient(135deg, rgba(255,107,26,0.1), rgba(255,230,0,0.05))",
        border: "1px solid rgba(255,107,26,0.2)", borderRadius: 16, padding: 16
      }}>
        <div className="flex items-center gap-2 mb-2">
          <span>💡</span>
          <span style={{ fontFamily: "Oswald", fontSize: 14, color: "var(--neon-orange)" }}>СОВЕТ ДНЯ</span>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "Rubik", lineHeight: 1.6 }}>
          Тебе осталось 2 570 шагов до дневной цели. Прогулка в 25 минут поможет достичь её!
        </p>
      </div>
    </div>
  );
}

// ─── AchievementsScreen ───────────────────────────────────────────────────────
export function AchievementsScreen() {
  const unlocked = achievements.filter(a => a.unlocked).length;

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 style={{ fontFamily: "Oswald", fontSize: 24, color: "white" }}>Достижения</h2>
        <span style={{
          background: "linear-gradient(90deg, var(--neon-orange), var(--neon-yellow))",
          color: "#0D0F14", borderRadius: 10, padding: "4px 12px",
          fontFamily: "Oswald", fontSize: 14
        }}>
          {unlocked} / {achievements.length}
        </span>
      </div>

      <div style={{
        background: "var(--card-bg)", border: "1px solid var(--card-border)",
        borderRadius: 16, padding: 16
      }}>
        <div className="flex justify-between mb-2">
          <div>
            <span style={{ fontFamily: "Oswald", fontSize: 20, color: "var(--neon-orange)" }}>Уровень 12</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "Rubik", marginLeft: 8 }}>«Марафонец»</span>
          </div>
          <span style={{ fontSize: 12, fontFamily: "Oswald", color: "rgba(255,255,255,0.5)" }}>3400 / 5000 XP</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 10, overflow: "hidden" }}>
          <div style={{
            width: "68%", height: "100%", borderRadius: 8,
            background: "linear-gradient(90deg, var(--neon-orange), var(--neon-yellow))",
            boxShadow: "0 0 12px rgba(255,107,26,0.5)"
          }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((a, i) => (
          <div key={a.id} className="card-hover animate-bounce-in" style={{
            background: a.unlocked
              ? "linear-gradient(135deg, rgba(255,107,26,0.15), rgba(255,230,0,0.05))"
              : "var(--card-bg)",
            border: `1px solid ${a.unlocked ? "rgba(255,107,26,0.4)" : "var(--card-border)"}`,
            borderRadius: 18, padding: 16,
            opacity: 0, animationDelay: `${i * 0.08}s`,
            position: "relative", overflow: "hidden"
          }}>
            {!a.unlocked && (
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(13,15,20,0.5)",
                backdropFilter: "blur(1px)", borderRadius: 18
              }} />
            )}
            <div style={{ fontSize: 32, marginBottom: 8, filter: a.unlocked ? "none" : "grayscale(1)" }}>
              {a.icon}
            </div>
            <div style={{ fontFamily: "Oswald", fontSize: 14, color: a.unlocked ? "white" : "rgba(255,255,255,0.4)", marginBottom: 4 }}>
              {a.title}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "Rubik", marginBottom: 8 }}>
              {a.desc}
            </div>
            {!a.unlocked && (
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 4, overflow: "hidden" }}>
                <div style={{
                  width: `${a.progress}%`, height: "100%", borderRadius: 4,
                  background: "var(--neon-orange)"
                }} />
              </div>
            )}
            {a.unlocked && (
              <div style={{
                display: "inline-block",
                background: "linear-gradient(90deg, var(--neon-orange), var(--neon-yellow))",
                borderRadius: 6, padding: "2px 8px",
                fontSize: 10, fontFamily: "Oswald", color: "#0D0F14"
              }}>
                ПОЛУЧЕНО
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SocialScreen ─────────────────────────────────────────────────────────────
export function SocialScreen() {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 style={{ fontFamily: "Oswald", fontSize: 24, color: "white" }}>Рейтинг друзей</h2>
        <button style={{
          background: "rgba(0,194,255,0.1)", color: "var(--neon-blue)",
          border: "1px solid rgba(0,194,255,0.3)", borderRadius: 10, padding: "6px 14px",
          fontFamily: "Oswald", fontSize: 12, cursor: "pointer"
        }}>
          + Добавить
        </button>
      </div>

      <div style={{
        background: "linear-gradient(135deg, rgba(0,194,255,0.1), rgba(0,245,160,0.05))",
        border: "1px solid rgba(0,194,255,0.25)", borderRadius: 18, padding: 18
      }}>
        <div className="flex items-center gap-2 mb-3">
          <span style={{ fontSize: 18 }}>⚔️</span>
          <span style={{ fontFamily: "Oswald", fontSize: 16, color: "var(--neon-blue)" }}>НЕДЕЛЬНОЕ СОРЕВНОВАНИЕ</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div style={{ fontFamily: "Oswald", fontSize: 28, color: "white" }}>5 дней</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "Rubik" }}>до конца недели</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Oswald", fontSize: 20, color: "var(--neon-orange)" }}>+2 570</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "Rubik" }}>шагов до лидера</div>
          </div>
        </div>
      </div>

      <div style={{
        background: "var(--card-bg)", border: "1px solid var(--card-border)",
        borderRadius: 18, padding: 16
      }}>
        <h3 style={{ fontFamily: "Oswald", fontSize: 16, color: "white", marginBottom: 14 }}>
          Таблица лидеров
        </h3>
        <div className="flex flex-col gap-2">
          {friends.map((f, i) => {
            const isMe = f.name === "Ты";
            const maxSteps = friends[0].steps;
            const pct = (f.steps / maxSteps) * 100;
            return (
              <div key={i} className="animate-slide-up" style={{
                background: isMe ? "rgba(255,107,26,0.08)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isMe ? "rgba(255,107,26,0.3)" : "transparent"}`,
                borderRadius: 12, padding: "10px 14px",
                opacity: 0, animationDelay: `${i * 0.1}s`
              }}>
                <div className="flex items-center gap-3">
                  <div style={{
                    width: 28, textAlign: "center",
                    fontFamily: "Oswald", fontSize: 16,
                    color: i === 0 ? "var(--neon-yellow)" : i === 1 ? "var(--neon-orange)" : "rgba(255,255,255,0.3)"
                  }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${f.rank}`}
                  </div>
                  <span style={{ fontSize: 22 }}>{f.avatar}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "Oswald", fontSize: 15,
                      color: isMe ? "var(--neon-orange)" : "white"
                    }}>
                      {f.name}
                    </div>
                    <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
                      <div style={{
                        width: `${pct}%`, height: "100%", borderRadius: 2,
                        background: i === 0 ? "var(--neon-yellow)" : isMe ? "var(--neon-orange)" : "rgba(255,255,255,0.2)"
                      }} />
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "Oswald", fontSize: 15,
                    color: i === 0 ? "var(--neon-yellow)" : isMe ? "var(--neon-orange)" : "rgba(255,255,255,0.6)"
                  }}>
                    {f.steps.toLocaleString("ru")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button style={{
        width: "100%", padding: "16px",
        background: "linear-gradient(90deg, var(--neon-orange), var(--neon-yellow))",
        border: "none", borderRadius: 16,
        fontFamily: "Oswald", fontSize: 16, color: "#0D0F14",
        cursor: "pointer", letterSpacing: 1,
        boxShadow: "0 0 24px rgba(255,107,26,0.4)"
      }}>
        ⚡ ВЫЗВАТЬ НА СОРЕВНОВАНИЕ
      </button>
    </div>
  );
}
