// ─── Types ───────────────────────────────────────────────────────────────────
export type Tab = "home" | "stats" | "goals" | "achievements" | "social";

export interface Friend {
  name: string;
  avatar: string;
  steps: number;
  rank: number;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  desc: string;
  unlocked: boolean;
  progress: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
export const DAILY_GOAL = 10000;

export const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: "home", icon: "Activity", label: "Главная" },
  { id: "stats", icon: "BarChart2", label: "Статистика" },
  { id: "goals", icon: "Target", label: "Цели" },
  { id: "achievements", icon: "Trophy", label: "Призы" },
  { id: "social", icon: "Users", label: "Рейтинг" },
];

// ─── Mock Data ────────────────────────────────────────────────────────────────
export const weekData = [
  { day: "Пн", steps: 7800, calories: 312 },
  { day: "Вт", steps: 9200, calories: 368 },
  { day: "Ср", steps: 6100, calories: 244 },
  { day: "Чт", steps: 11400, calories: 456 },
  { day: "Пт", steps: 8900, calories: 356 },
  { day: "Сб", steps: 14200, calories: 568 },
  { day: "Вс", steps: 7430, calories: 297 },
];

export const monthData = [
  { label: "1", steps: 8000 }, { label: "5", steps: 10500 },
  { label: "10", steps: 9200 }, { label: "15", steps: 12000 },
  { label: "20", steps: 7800 }, { label: "25", steps: 11500 },
  { label: "30", steps: 9800 },
];

export const friends: Friend[] = [
  { name: "Алексей", avatar: "🏃", steps: 14200, rank: 1 },
  { name: "Ты", avatar: "⚡", steps: 7430, rank: 2 },
  { name: "Маша", avatar: "🔥", steps: 7100, rank: 3 },
  { name: "Дима", avatar: "💪", steps: 6800, rank: 4 },
  { name: "Катя", avatar: "🌟", steps: 5200, rank: 5 },
];

export const achievements: Achievement[] = [
  { id: "1", icon: "🚀", title: "Первый старт", desc: "Сделай 1000 шагов за день", unlocked: true, progress: 100 },
  { id: "2", icon: "🔥", title: "Огненная серия", desc: "7 дней подряд", unlocked: true, progress: 100 },
  { id: "3", icon: "⚡", title: "Молния", desc: "10 000 шагов за день", unlocked: true, progress: 100 },
  { id: "4", icon: "🏆", title: "Чемпион", desc: "30 дней подряд", unlocked: false, progress: 23 },
  { id: "5", icon: "💎", title: "Бриллиант", desc: "100 000 шагов за месяц", unlocked: false, progress: 74 },
  { id: "6", icon: "🌍", title: "Путешественник", desc: "1000 км всего", unlocked: false, progress: 42 },
];
