import { useMemo } from 'react';
import type { HistoryEntry } from '../types';

export interface DayBar {
  dayLabel: string;
  count: number;
}

export interface MonthBar {
  monthLabel: string;
  count: number;
}

export interface HourBucket {
  label: string;
  emoji: string;
  from: number;
  to: number;
  count: number;
}

export interface Stats {
  last7Days: DayBar[];
  last6Months: MonthBar[];
  byHourBucket: HourBucket[];
  recordDay: { dateLabel: string; count: number } | null;
  totalDaysActive: number;
  averagePerActiveDay: number;
  averagePerWeek: number;
}

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function localDayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function formatDateLabel(d: Date): string {
  return `${d.getDate()} ${MONTH_LABELS[d.getMonth()]}`;
}

const HOUR_BUCKETS: Pick<HourBucket, 'label' | 'emoji' | 'from' | 'to'>[] = [
  { label: 'Madrugada', emoji: '🌙', from: 0, to: 8 },
  { label: 'Mañana', emoji: '☀️', from: 8, to: 13 },
  { label: 'Tarde', emoji: '🌤️', from: 13, to: 20 },
  { label: 'Noche', emoji: '🌃', from: 20, to: 24 },
];

export function useStats(history: HistoryEntry[]): Stats {
  return useMemo(() => {
    const now = new Date();

    // ── Últimos 7 días ──────────────────────────────────────────────────────
    const last7Days: DayBar[] = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (6 - i));
      const key = localDayKey(d);
      return {
        dayLabel: DAY_LABELS[d.getDay()],
        count: history.filter((e) => localDayKey(new Date(e.date)) === key).length,
      };
    });

    // ── Últimos 6 meses ─────────────────────────────────────────────────────
    const last6Months: MonthBar[] = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const y = d.getFullYear();
      const m = d.getMonth();
      return {
        monthLabel: MONTH_LABELS[m],
        count: history.filter((e) => {
          const ed = new Date(e.date);
          return ed.getFullYear() === y && ed.getMonth() === m;
        }).length,
      };
    });

    // ── Distribución horaria ─────────────────────────────────────────────────
    const byHourBucket: HourBucket[] = HOUR_BUCKETS.map((b) => ({
      ...b,
      count: history.filter((e) => {
        const h = new Date(e.date).getHours();
        return h >= b.from && h < b.to;
      }).length,
    }));

    // ── Récord personal ──────────────────────────────────────────────────────
    const dayCountMap: Record<string, { date: Date; count: number }> = {};
    for (const e of history) {
      const d = new Date(e.date);
      const key = localDayKey(d);
      if (!dayCountMap[key]) dayCountMap[key] = { date: d, count: 0 };
      dayCountMap[key].count++;
    }
    const dayEntries = Object.values(dayCountMap);
    const recordDay =
      dayEntries.length > 0
        ? (() => {
            const best = dayEntries.reduce((a, b) => (b.count > a.count ? b : a));
            return { dateLabel: formatDateLabel(best.date), count: best.count };
          })()
        : null;

    // ── Días activos ─────────────────────────────────────────────────────────
    const totalDaysActive = dayEntries.length;

    // ── Promedios ────────────────────────────────────────────────────────────
    const averagePerActiveDay =
      totalDaysActive > 0
        ? Math.round((history.length / totalDaysActive) * 10) / 10
        : 0;

    const cutoff28 = new Date(now);
    cutoff28.setDate(cutoff28.getDate() - 28);
    const last28Count = history.filter((e) => new Date(e.date) >= cutoff28).length;
    const averagePerWeek = Math.round((last28Count / 4) * 10) / 10;

    return {
      last7Days,
      last6Months,
      byHourBucket,
      recordDay,
      totalDaysActive,
      averagePerActiveDay,
      averagePerWeek,
    };
  }, [history]);
}
