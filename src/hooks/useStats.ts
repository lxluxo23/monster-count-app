import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { localDayKey } from '../utils/dateUtils';
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
  verifiedCount: number; // Entradas por cámara (más verificables)
}

export function useStats(history: HistoryEntry[]): Stats {
  const { t } = useTranslation();

  return useMemo(() => {
    const now = new Date();

    const hourBucketDefs = [
      { labelKey: 'earlyMorning', emoji: '🌙', from: 0, to: 8 },
      { labelKey: 'morning', emoji: '☀️', from: 8, to: 13 },
      { labelKey: 'afternoon', emoji: '🌤️', from: 13, to: 20 },
      { labelKey: 'night', emoji: '🌃', from: 20, to: 24 },
    ];

    // ── Últimos 7 días ──────────────────────────────────────────────────────
    const last7Days: DayBar[] = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (6 - i));
      const key = localDayKey(d);
      return {
        dayLabel: t(`stats.days.${d.getDay()}`),
        count: history.filter((e) => localDayKey(new Date(e.date)) === key).length,
      };
    });

    // ── Últimos 6 meses ─────────────────────────────────────────────────────
    const last6Months: MonthBar[] = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const y = d.getFullYear();
      const m = d.getMonth();
      return {
        monthLabel: t(`stats.months.${m}`),
        count: history.filter((e) => {
          const ed = new Date(e.date);
          return ed.getFullYear() === y && ed.getMonth() === m;
        }).length,
      };
    });

    // ── Distribución horaria ─────────────────────────────────────────────────
    const byHourBucket: HourBucket[] = hourBucketDefs.map((b) => ({
      label: t(`stats.${b.labelKey}`),
      emoji: b.emoji,
      from: b.from,
      to: b.to,
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
            const d = best.date;
            const dateLabel = `${d.getDate()} ${t(`stats.months.${d.getMonth()}`)}`;
            return { dateLabel, count: best.count };
          })()
        : null;

    // ── Días activos ─────────────────────────────────────────────────────────
    const totalDaysActive = dayEntries.length;

    // ── Promedios ────────────────────────────────────────────────────────────
    const averagePerActiveDay =
      totalDaysActive > 0 ? Math.round((history.length / totalDaysActive) * 10) / 10 : 0;

    const cutoff28 = new Date(now);
    cutoff28.setDate(cutoff28.getDate() - 28);
    const last28Count = history.filter((e) => new Date(e.date) >= cutoff28).length;
    const averagePerWeek = Math.round((last28Count / 4) * 10) / 10;

    const verifiedCount = history.filter((e) => e.source === 'camera').length;

    return {
      last7Days,
      last6Months,
      byHourBucket,
      recordDay,
      totalDaysActive,
      averagePerActiveDay,
      averagePerWeek,
      verifiedCount,
    };
  }, [history, t]);
}
