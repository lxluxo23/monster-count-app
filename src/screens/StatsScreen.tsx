import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius } from '../theme';
import { useStats } from '../hooks/useStats';
import { MONSTER_TYPES, MONSTER_I18N_KEY } from '../constants/monsters';
import type { HistoryEntry } from '../types';

interface StatsScreenProps {
  visible: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  countByMonsterId: Record<string, number>;
}

const BAR_HEIGHT = 120;
const MONTH_BAR_HEIGHT = 80;

function SectionTitle({ title }: { title: string }): React.JSX.Element {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

export default function StatsScreen({
  visible,
  onClose,
  history,
  countByMonsterId,
}: StatsScreenProps): React.JSX.Element {
  const { t } = useTranslation();
  const stats = useStats(history);

  const max7 = Math.max(...stats.last7Days.map((d) => d.count), 1);
  const max6m = Math.max(...stats.last6Months.map((m) => m.count), 1);
  const maxHour = Math.max(...stats.byHourBucket.map((b) => b.count), 1);
  const totalHour = stats.byHourBucket.reduce((s, b) => s + b.count, 0);

  const flavorData = MONSTER_TYPES.map((m) => {
    const mKey = MONSTER_I18N_KEY[m.id];
    return {
      ...m,
      name: mKey ? t(`monsters.${mKey}.name`) : (m.name ?? m.id),
      count: countByMonsterId[m.id] ?? 0,
    };
  }).sort((a, b) => b.count - a.count);
  const maxFlavor = Math.max(...flavorData.map((m) => m.count), 1);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('stats.title')}</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* KPI cards */}
          <View style={styles.kpiGrid}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{history.length}</Text>
              <Text style={styles.kpiLabel}>{t('stats.totalCans')}</Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{stats.verifiedCount}</Text>
              <Text style={styles.kpiLabel}>{t('stats.verifiedCans')}</Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{stats.totalDaysActive}</Text>
              <Text style={styles.kpiLabel}>{t('stats.activeDays')}</Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{stats.averagePerActiveDay}</Text>
              <Text style={styles.kpiLabel}>{t('stats.avgPerDay')}</Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{stats.averagePerWeek}</Text>
              <Text style={styles.kpiLabel}>{t('stats.avgPerWeek')}</Text>
            </View>
          </View>

          {/* Últimos 7 días */}
          <SectionTitle title={t('stats.last7Days')} />
          <View style={styles.card}>
            <View style={styles.columnChart}>
              {stats.last7Days.map((d, i) => (
                <View key={i} style={styles.columnItem}>
                  <Text style={styles.columnCount}>{d.count > 0 ? d.count : ''}</Text>
                  <View style={styles.columnBarWrap}>
                    <View
                      style={[
                        styles.columnBar,
                        {
                          height: d.count > 0
                            ? Math.max((d.count / max7) * BAR_HEIGHT, 4)
                            : 0,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.columnLabel}>{d.dayLabel}</Text>
                </View>
              ))}
            </View>
            {history.length === 0 && (
              <Text style={styles.emptyText}>{t('stats.noData')}</Text>
            )}
          </View>

          {/* Distribución por hora */}
          <SectionTitle title={t('stats.hourOfDay')} />
          <View style={styles.card}>
            {stats.byHourBucket.map((b) => (
              <View key={b.label} style={styles.hourRow}>
                <Text style={styles.hourEmoji}>{b.emoji}</Text>
                <View style={styles.hourInfo}>
                  <View style={styles.hourTop}>
                    <Text style={styles.hourLabel}>{b.label}</Text>
                    <Text style={styles.hourCount}>
                      {b.count}
                      {totalHour > 0 ? `  ${Math.round((b.count / totalHour) * 100)}%` : ''}
                    </Text>
                  </View>
                  <View style={styles.barBg}>
                    <View
                      style={[
                        styles.barFill,
                        { width: `${(b.count / maxHour) * 100}%` },
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Tendencia mensual */}
          <SectionTitle title={t('stats.monthlyTrend')} />
          <View style={styles.card}>
            <View style={styles.columnChart}>
              {stats.last6Months.map((m, i) => (
                <View key={i} style={styles.columnItem}>
                  <Text style={styles.columnCount}>{m.count > 0 ? m.count : ''}</Text>
                  <View style={[styles.columnBarWrap, { height: MONTH_BAR_HEIGHT }]}>
                    <View
                      style={[
                        styles.columnBar,
                        {
                          height: m.count > 0
                            ? Math.max((m.count / max6m) * MONTH_BAR_HEIGHT, 4)
                            : 0,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.columnLabel}>{m.monthLabel}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Récord personal */}
          <SectionTitle title={t('stats.personalRecord')} />
          <View style={[styles.card, styles.recordCard]}>
            {stats.recordDay ? (
              <>
                <Text style={styles.recordNumber}>{stats.recordDay.count}</Text>
                <Text style={styles.recordLabel}>
                  {t('stats.cansInDay', { date: stats.recordDay.dateLabel })}
                </Text>
              </>
            ) : (
              <Text style={styles.emptyText}>{t('stats.startTracking')}</Text>
            )}
          </View>

          {/* Por sabor */}
          <SectionTitle title={t('stats.byFlavor')} />
          <View style={styles.card}>
            {flavorData.map((m) => (
              <View key={m.id} style={styles.flavorRow}>
                <View style={[styles.flavorDot, { backgroundColor: m.color }]} />
                <View style={styles.flavorInfo}>
                  <View style={styles.flavorTop}>
                    <Text style={styles.flavorName} numberOfLines={1}>{m.name}</Text>
                    <Text style={styles.flavorCount}>{m.count}</Text>
                  </View>
                  <View style={styles.barBg}>
                    <View
                      style={[
                        styles.barFill,
                        { backgroundColor: m.color, width: `${(m.count / maxFlavor) * 100}%` },
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}
            {flavorData.every((m) => m.count === 0) && (
              <Text style={styles.emptyText}>{t('stats.noData')}</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: colors.text },

  content: { padding: spacing.lg, paddingBottom: 48 },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },

  // KPI
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  kpiCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  kpiValue: { fontSize: 30, fontWeight: '800', color: colors.primary },
  kpiLabel: { fontSize: 12, color: colors.textMuted, marginTop: 4, textAlign: 'center' },

  // Column chart
  columnChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: BAR_HEIGHT + 40,
  },
  columnItem: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  columnCount: { fontSize: 11, color: colors.textMuted, marginBottom: 2, height: 16 },
  columnBarWrap: {
    width: '60%',
    height: BAR_HEIGHT,
    justifyContent: 'flex-end',
  },
  columnBar: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
    minWidth: 4,
  },
  columnLabel: { fontSize: 11, color: colors.textMuted, marginTop: 4 },

  // Horizontal bars (hour / flavor)
  barBg: {
    height: 6,
    backgroundColor: colors.background,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
    minWidth: 3,
  },

  // Hour
  hourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  hourEmoji: { fontSize: 22, width: 28, textAlign: 'center' },
  hourInfo: { flex: 1, gap: 4 },
  hourTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hourLabel: { fontSize: 14, color: colors.text, fontWeight: '500' },
  hourCount: { fontSize: 13, color: colors.textMuted },

  // Record
  recordCard: { alignItems: 'center', paddingVertical: spacing.xl },
  recordNumber: { fontSize: 56, fontWeight: '800', color: colors.primary, lineHeight: 64 },
  recordLabel: { fontSize: 15, color: colors.textMuted, marginTop: 4 },

  // Flavor
  flavorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  flavorDot: { width: 12, height: 12, borderRadius: radius.full, flexShrink: 0 },
  flavorInfo: { flex: 1, gap: 4 },
  flavorTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flavorName: { flex: 1, fontSize: 13, color: colors.text, marginRight: spacing.sm },
  flavorCount: { fontSize: 14, fontWeight: '700', color: colors.primary },

  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    paddingVertical: spacing.md,
  },
});
