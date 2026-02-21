import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme';
import { useAchievements, type Achievement } from '../hooks/useAchievements';
import { useGlobalStats } from '../hooks/useGlobalStats';
import { getMonsterName, MONSTER_TYPES } from '../constants/monsters';
import type { HistoryEntry } from '../types';

interface ComunidadScreenProps {
  history: HistoryEntry[];
  total: number;
  streak: number;
  countByMonsterId: Record<string, number>;
}

function AchievementCard({ a }: { a: Achievement }): React.JSX.Element {
  return (
    <View style={[styles.achCard, a.unlocked && styles.achCardUnlocked]}>
      <Text style={styles.achEmoji}>{a.emoji}</Text>
      <View style={styles.achContent}>
        <View style={styles.achTop}>
          <Text style={[styles.achTitle, !a.unlocked && styles.achTitleLocked]}>{a.title}</Text>
          {a.unlocked && (
            <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
          )}
        </View>
        <Text style={styles.achDesc}>{a.description}</Text>
        {!a.unlocked && (
          <View style={styles.progressWrap}>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${a.progress * 100}%` }]} />
            </View>
            <Text style={styles.progressLabel}>{a.progressLabel}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function ComunidadScreen({
  history,
  total,
  streak,
  countByMonsterId,
}: ComunidadScreenProps): React.JSX.Element {
  const achievements = useAchievements({ history, total, streak, countByMonsterId });
  const { rankingByMonster, totalCommunityLatas, loading, error, refresh } = useGlobalStats();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const maxCount = rankingByMonster.reduce((m, r) => Math.max(m, r.count), 1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── LOGROS ── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Logros</Text>
        <Text style={styles.sectionMeta}>
          {unlockedCount} de {achievements.length} desbloqueados
        </Text>
      </View>

      {achievements.map((a) => (
        <AchievementCard key={a.id} a={a} />
      ))}

      {/* ── COMUNIDAD ── */}
      <View style={[styles.sectionHeader, styles.sectionHeaderCommunity]}>
        <Text style={styles.sectionTitle}>Comunidad</Text>
        <TouchableOpacity onPress={refresh} disabled={loading} activeOpacity={0.7}>
          <Ionicons
            name="refresh-outline"
            size={20}
            color={loading ? colors.textMuted : colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Total latas */}
      <View style={styles.communityTotalCard}>
        <Text style={styles.communityTotalNumber}>
          {loading ? '—' : totalCommunityLatas.toLocaleString()}
        </Text>
        <Text style={styles.communityTotalLabel}>latas registradas en total</Text>
      </View>

      {/* Estado loading / error */}
      {loading && (
        <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
      )}
      {!loading && error && (
        <View style={styles.errorWrap}>
          <Ionicons name="cloud-offline-outline" size={20} color={colors.textMuted} />
          <Text style={styles.errorText}>No se pudieron cargar los datos de la comunidad</Text>
        </View>
      )}

      {/* Ranking sabores */}
      {!loading && !error && (
        <View style={styles.rankingCard}>
          <Text style={styles.rankingTitle}>Sabores más populares</Text>
          {rankingByMonster.map((entry, i) => {
            const monster = MONSTER_TYPES.find((m) => m.id === entry.monsterId);
            const barWidth = totalCommunityLatas > 0 ? entry.count / maxCount : 0;
            return (
              <View key={entry.monsterId} style={styles.rankRow}>
                <Text style={styles.rankPos}>{i + 1}</Text>
                <View style={[styles.rankDot, { backgroundColor: monster?.color ?? colors.border }]} />
                <View style={styles.rankInfo}>
                  <View style={styles.rankTop}>
                    <Text style={styles.rankName} numberOfLines={1}>
                      {getMonsterName(entry.monsterId)}
                    </Text>
                    <Text style={styles.rankCount}>{entry.count}</Text>
                  </View>
                  <View style={styles.rankBar}>
                    <View
                      style={[
                        styles.rankBarFill,
                        {
                          backgroundColor: monster?.color ?? colors.primary,
                          width: `${barWidth * 100}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.lg, paddingBottom: 48, paddingTop: spacing.md },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionHeaderCommunity: { marginTop: spacing.xl },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  sectionMeta: { fontSize: 13, color: colors.textMuted },

  // Achievement cards
  achCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    opacity: 0.55,
  },
  achCardUnlocked: {
    opacity: 1,
    borderWidth: 1,
    borderColor: colors.primary + '50',
  },
  achEmoji: { fontSize: 28, lineHeight: 36 },
  achContent: { flex: 1 },
  achTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 2 },
  achTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.text },
  achTitleLocked: { color: colors.textSecondary },
  achDesc: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.sm },
  progressWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  progressBg: {
    flex: 1,
    height: 4,
    backgroundColor: colors.background,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: 4, backgroundColor: colors.primary, borderRadius: 2, minWidth: 2 },
  progressLabel: { fontSize: 11, color: colors.textMuted, minWidth: 40, textAlign: 'right' },

  // Community
  communityTotalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  communityTotalNumber: { fontSize: 48, fontWeight: '800', color: colors.primary },
  communityTotalLabel: { fontSize: 14, color: colors.textMuted, marginTop: 4 },

  loader: { marginVertical: spacing.lg },
  errorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  errorText: { fontSize: 14, color: colors.textMuted },

  rankingCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  rankingTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  rankPos: { fontSize: 13, fontWeight: '700', color: colors.textMuted, width: 18, textAlign: 'center' },
  rankDot: { width: 10, height: 10, borderRadius: radius.full },
  rankInfo: { flex: 1 },
  rankTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  rankName: { flex: 1, fontSize: 14, color: colors.text, marginRight: spacing.sm },
  rankCount: { fontSize: 14, fontWeight: '700', color: colors.primary },
  rankBar: { height: 6, backgroundColor: colors.background, borderRadius: 3, overflow: 'hidden' },
  rankBarFill: { height: 6, borderRadius: 3, minWidth: 3 },
});
