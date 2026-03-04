import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { spacing, radius } from '../theme';
import type { ColorPalette } from '../theme';
import { useTheme } from '../contexts/ThemeContext';
import { useStats } from '../hooks/useStats';
import { MONSTER_TYPES, MONSTER_I18N_KEY } from '../constants/monsters';
import type { HistoryEntry } from '../types';

interface StatsScreenProps {
  visible: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  countByMonsterId: Record<string, number>;
}

export default function StatsScreen({
  visible,
  onClose,
  history,
  countByMonsterId,
}: StatsScreenProps): React.JSX.Element {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const stats = useStats(history);
  const styles = getStyles(colors);
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - spacing.lg * 2 - spacing.md * 2; // padding del card + content

  // --- Data for gifted-charts ---

  // Last 7 days bar chart
  const barData7 = stats.last7Days.map((d) => ({
    value: d.count,
    label: d.dayLabel,
    frontColor: colors.primary,
    labelTextStyle: { color: colors.textMuted, fontSize: 11 },
  }));

  // Monthly trend bar chart
  const barDataMonthly = stats.last6Months.map((m) => ({
    value: m.count,
    label: m.monthLabel,
    frontColor: colors.primary,
    labelTextStyle: { color: colors.textMuted, fontSize: 11 },
    topLabelComponent: () => (
      <Text style={{ color: colors.textMuted, fontSize: 11, marginBottom: 2 }}>
        {m.count > 0 ? m.count : ''}
      </Text>
    ),
  }));

  // Hour distribution pie chart
  const hourColors = ['#7C3AED', '#F59E0B', colors.primary, '#3B82F6'];
  const totalHourEntries = stats.byHourBucket.reduce((s, b) => s + b.count, 0);
  const pieDataHour = stats.byHourBucket.map((b, i) => ({
    value: b.count || 0.1,
    color: hourColors[i],
    text: totalHourEntries > 0 && b.count > 0
      ? `${Math.round((b.count / totalHourEntries) * 100)}%`
      : '',
    emoji: b.emoji,
    label: b.label,
    count: b.count,
    pct: totalHourEntries > 0 ? Math.round((b.count / totalHourEntries) * 100) : 0,
  }));

  // Flavor data
  const flavorData = MONSTER_TYPES.map((m) => {
    const mKey = MONSTER_I18N_KEY[m.id];
    return {
      id: m.id,
      name: mKey ? t(`monsters.${mKey}.name`) : (m.name ?? m.id),
      count: countByMonsterId[m.id] ?? 0,
      color: m.color,
    };
  }).sort((a, b) => b.count - a.count);

  const totalFlavorEntries = flavorData.reduce((s, m) => s + m.count, 0);
  const pieDataFlavor = flavorData.map((m) => ({
    value: m.count || 0.1,
    color: m.color,
    text: totalFlavorEntries > 0 && m.count > 0 && Math.round((m.count / totalFlavorEntries) * 100) >= 5
      ? `${Math.round((m.count / totalFlavorEntries) * 100)}%`
      : '',
    name: m.name.replace('Monster ', '').replace('Juice ', '').split(' ').slice(0, 2).join(' '),
    count: m.count,
    pct: totalFlavorEntries > 0 ? Math.round((m.count / totalFlavorEntries) * 100) : 0,
  }));

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

          {/* Last 7 days — BarChart */}
          <Text style={styles.sectionTitle}>{t('stats.last7Days')}</Text>
          <View style={styles.card}>
            <View style={styles.chartWrapper}>
              {history.length > 0 ? (
                <BarChart
                  data={barData7}
                  width={chartWidth}
                  height={150}
                  labelsExtraHeight={20}
                  barWidth={24}
                  spacing={12}
                  initialSpacing={0}
                  endSpacing={0}
                  noOfSections={4}
                  barBorderRadius={4}
                  isAnimated
                  animationDuration={600}
                  yAxisThickness={0}
                  xAxisThickness={1}
                  xAxisColor={colors.border}
                  yAxisTextStyle={{ color: colors.textMuted, fontSize: 11 }}
                  xAxisLabelTextStyle={{ color: colors.textMuted, fontSize: 10 }}
                  hideRules
                  showGradient
                  gradientColor={colors.primary + '80'}
                  backgroundColor={colors.surface}
                  disablePress
                  adjustToWidth
                  numberOfBars={7}
                />
              ) : (
                <Text style={styles.emptyText}>{t('stats.noData')}</Text>
              )}
            </View>
          </View>

          {/* Hour distribution — PieChart */}
          <Text style={styles.sectionTitle}>{t('stats.hourOfDay')}</Text>
          <View style={styles.card}>
            <View style={styles.pieContainer}>
              <PieChart
                data={pieDataHour}
                donut
                radius={70}
                innerRadius={40}
                innerCircleColor={colors.surface}
                centerLabelComponent={() => (
                  <View style={styles.pieCenter}>
                    <Text style={styles.pieCenterNumber}>{totalHourEntries}</Text>
                  </View>
                )}
                textColor={colors.white}
                textSize={10}
                fontWeight="700"
                isAnimated
              />
            </View>
            <View style={styles.pieLegend}>
              {pieDataHour.map((item, i) => (
                <View key={i} style={styles.pieLegendRow}>
                  <View style={[styles.pieLegendDot, { backgroundColor: hourColors[i] }]} />
                  <Text style={styles.pieLegendEmoji}>{item.emoji}</Text>
                  <Text style={styles.pieLegendName}>{item.label}</Text>
                  <Text style={styles.pieLegendValue}>{item.count}</Text>
                  <Text style={styles.pieLegendPct}>{item.pct}%</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Monthly trend — BarChart */}
          <Text style={styles.sectionTitle}>{t('stats.monthlyTrend')}</Text>
          <View style={styles.card}>
            <View style={styles.chartWrapper}>
              <BarChart
                data={barDataMonthly}
                width={chartWidth}
                height={150}
                labelsExtraHeight={20}
                barWidth={28}
                spacing={14}
                initialSpacing={0}
                endSpacing={0}
                noOfSections={4}
                barBorderRadius={4}
                isAnimated
                animationDuration={600}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor={colors.border}
                yAxisTextStyle={{ color: colors.textMuted, fontSize: 11 }}
                xAxisLabelTextStyle={{ color: colors.textMuted, fontSize: 10 }}
                hideRules
                showGradient
                gradientColor={colors.primary + '80'}
                backgroundColor={colors.surface}
                disablePress
                adjustToWidth
                numberOfBars={6}
              />
            </View>
          </View>

          {/* Record personal */}
          <Text style={styles.sectionTitle}>{t('stats.personalRecord')}</Text>
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

          {/* By flavor — PieChart */}
          <Text style={styles.sectionTitle}>{t('stats.byFlavor')}</Text>
          <View style={styles.card}>
            {flavorData.some((m) => m.count > 0) ? (
              <>
                <View style={styles.pieContainer}>
                  <PieChart
                    data={pieDataFlavor}
                    donut
                    radius={70}
                    innerRadius={40}
                    innerCircleColor={colors.surface}
                    centerLabelComponent={() => (
                      <View style={styles.pieCenter}>
                        <Text style={styles.pieCenterNumber}>{totalFlavorEntries}</Text>
                      </View>
                    )}
                    textColor={colors.white}
                    textSize={10}
                    fontWeight="700"
                    focusOnPress
                    isAnimated
                  />
                </View>
                <View style={styles.pieLegend}>
                  {pieDataFlavor.filter((m) => m.count > 0).map((item, i) => (
                    <View key={i} style={styles.pieLegendRow}>
                      <View style={[styles.pieLegendDot, { backgroundColor: item.color }]} />
                      <Text style={styles.pieLegendName}>{item.name}</Text>
                      <Text style={styles.pieLegendValue}>{item.count}</Text>
                      <Text style={styles.pieLegendPct}>{item.pct}%</Text>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <Text style={styles.emptyText}>{t('stats.noData')}</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const getStyles = (colors: ColorPalette) => StyleSheet.create({
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
    paddingBottom: spacing.xl,
    overflow: 'hidden',
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

  // Record
  recordCard: { alignItems: 'center', paddingVertical: spacing.xl },
  recordNumber: { fontSize: 56, fontWeight: '800', color: colors.primary, lineHeight: 64 },
  recordLabel: { fontSize: 15, color: colors.textMuted, marginTop: 4 },

  // PieChart
  pieContainer: { alignItems: 'center', marginVertical: spacing.md },
  pieCenter: { alignItems: 'center', justifyContent: 'center' },
  pieCenterNumber: { fontSize: 20, fontWeight: '800', color: colors.primary },
  pieLegend: { gap: 6, marginTop: spacing.sm },
  pieLegendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pieLegendDot: { width: 10, height: 10, borderRadius: 5 },
  pieLegendEmoji: { fontSize: 16 },
  pieLegendName: { flex: 1, fontSize: 13, color: colors.text },
  pieLegendValue: { fontSize: 13, fontWeight: '700', color: colors.text, minWidth: 20, textAlign: 'right' },
  pieLegendPct: { fontSize: 13, color: colors.textMuted, minWidth: 36, textAlign: 'right' },

  chartWrapper: {
    width: '100%',
    overflow: 'hidden',
  },

  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    paddingVertical: spacing.md,
  },
});
