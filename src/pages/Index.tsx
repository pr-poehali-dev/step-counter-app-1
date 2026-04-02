import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Tab, TABS } from "@/components/stepup/data";
import { HomeScreen, StatsScreen, GoalsScreen, AchievementsScreen, SocialScreen } from "@/components/stepup/screens";

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [steps, setSteps] = useState(7430);
  const [isTracking, setIsTracking] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isTracking) {
      intervalRef.current = setInterval(() => {
        if (Math.random() > 0.5) {
          setSteps(s => s + Math.floor(Math.random() * 3 + 1));
        }
      }, 2000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isTracking]);

  const renderScreen = () => {
    switch (tab) {
      case "home": return <HomeScreen steps={steps} />;
      case "stats": return <StatsScreen />;
      case "goals": return <GoalsScreen />;
      case "achievements": return <AchievementsScreen />;
      case "social": return <SocialScreen />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark-bg)", display: "flex", justifyContent: "center" }}>
      <div style={{
        width: "100%", maxWidth: 430, minHeight: "100vh",
        position: "relative", display: "flex", flexDirection: "column",
        background: "var(--dark-bg)"
      }}>
        <div className="bg-grid" style={{
          position: "fixed", inset: 0, maxWidth: 430,
          pointerEvents: "none", zIndex: 0
        }} />

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          background: "rgba(13,15,20,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--card-border)",
          padding: "12px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div className="flex items-center gap-2">
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: "linear-gradient(135deg, var(--neon-orange), var(--neon-yellow))",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 12px rgba(255,107,26,0.4)"
            }}>
              <span style={{ fontSize: 16 }}>⚡</span>
            </div>
            <span style={{ fontFamily: "Oswald", fontSize: 18, color: "white", letterSpacing: 1 }}>STEPUP</span>
          </div>
          <button
            onClick={() => setIsTracking(t => !t)}
            style={{
              background: isTracking ? "rgba(0,245,160,0.1)" : "rgba(255,107,26,0.1)",
              border: `1px solid ${isTracking ? "rgba(0,245,160,0.3)" : "rgba(255,107,26,0.3)"}`,
              borderRadius: 10, padding: "5px 12px",
              fontFamily: "Rubik", fontSize: 12,
              color: isTracking ? "var(--neon-green)" : "var(--neon-orange)",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 5
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: isTracking ? "var(--neon-green)" : "var(--neon-orange)",
              display: "inline-block",
              boxShadow: isTracking ? "0 0 6px var(--neon-green)" : "none"
            }} />
            {isTracking ? "Трекинг ВКЛ" : "Трекинг ВЫКЛ"}
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "16px 16px 90px", position: "relative", zIndex: 1 }}>
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        <div style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 430,
          background: "rgba(13,15,20,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid var(--card-border)",
          padding: "8px 8px 20px",
          zIndex: 20
        }}>
          <div className="flex justify-around">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", gap: 4, padding: "8px 0",
                background: "none", border: "none", cursor: "pointer",
                position: "relative"
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: tab === t.id ? "rgba(255,107,26,0.15)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                  boxShadow: tab === t.id ? "0 0 12px rgba(255,107,26,0.25)" : "none",
                  border: tab === t.id ? "1px solid rgba(255,107,26,0.3)" : "1px solid transparent"
                }}>
                  <Icon
                    name={t.icon as "Activity"}
                    size={18}
                    style={{ color: tab === t.id ? "var(--neon-orange)" : "rgba(255,255,255,0.3)" }}
                  />
                </div>
                <span style={{
                  fontSize: 9, fontFamily: "Rubik",
                  color: tab === t.id ? "var(--neon-orange)" : "rgba(255,255,255,0.3)",
                  letterSpacing: 0.5
                }}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
