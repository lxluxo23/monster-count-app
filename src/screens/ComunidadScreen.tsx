import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-gifted-charts';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, radius } from '../theme';
import type { ColorPalette } from '../theme';
import { useAchievements, type Achievement } from '../hooks/useAchievements';
import { useGlobalStats } from '../hooks/useGlobalStats';
import { getMonsterName, MONSTER_TYPES } from '../constants/monsters';
import PublicProfileScreen from './PublicProfileScreen';
import type { HistoryEntry } from '../types';

const SHOWN_ACHIEVEMENTS_KEY = 'unlockedAchievementsShown';

interface ComunidadScreenProps {
  history: HistoryEntry[];
  total: number;
  streak: number;
  countByMonsterId: Record<string, number>;
}

function AchievementCard({ a, colors, isNew }: { a: Achievement; colors: ColorPalette; isNew: boolean }): React.JSX.Element {
  const styles = getStyles(colors);
  const pulseAnim = useRef(new Animated.Value(isNew ? 0.85 : 1)).current;

  useEffect(() => {
    if (!isNew) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      { iterations: 3 },
    ).start();
  }, [isNew, pulseAnim]);

  return (
    <Animated.View style={[styles.achCard, a.unlocked && styles.achCardUnlocked, isNew && styles.achCardNew, { transform: [{ scale: pulseAnim }] }]}>
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
    </Animated.View>
  );
}

// 2.6: Avatar/iniciales en ranking
function UserAvatar({ name, avatarUrl, colors }: { name: string; avatarUrl?: string; colors: ColorPalette }): React.JSX.Element {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generar color consistente basado en el nombre
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  const bgColor = `hsl(${hue}, 50%, 40%)`;

  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        style={{ width: 28, height: 28, borderRadius: 14 }}
      />
    );
  }

  return (
    <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: bgColor, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.white, fontSize: 11, fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}

export default function ComunidadScreen({
  history,
  total,
  streak,
  countByMonsterId,
}: ComunidadScreenProps): React.JSX.Element {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newlyUnlockedIds, setNewlyUnlockedIds] = useState<Set<string>>(new Set());
  const achievements = useAchievements({ history, total, streak, countByMonsterId });
  const { rankingByMonster, rankingByUser, totalCommunityLatas, loading, error, refresh } = useGlobalStats();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  // 2.7: Detectar logros recién desbloqueados
  useEffect(() => {
    (async () => {
      const unlockedIds = achievements.filter((a) => a.unlocked).map((a) => a.id);
      if (unlockedIds.length === 0) return;
      const raw = await AsyncStorage.getItem(SHOWN_ACHIEVEMENTS_KEY);
      const shownSet = new Set<string>(raw ? JSON.parse(raw) : []);
      const freshIds = unlockedIds.filter((id) => !shownSet.has(id));
      if (freshIds.length > 0) {
        setNewlyUnlockedIds(new Set(freshIds));
        freshIds.forEach((id) => shownSet.add(id));
        await AsyncStorage.setItem(SHOWN_ACHIEVEMENTS_KEY, JSON.stringify([...shownSet]));
      }
    })();
  }, [achievements]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* LOGROS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('comunidad.achievementsTitle')}</Text>
        <Text style={styles.sectionMeta}>
          {t('comunidad.unlocked', { count: unlockedCount, total: achievements.length })}
        </Text>
      </View>

      {achievements.map((a) => (
        <AchievementCard key={a.id} a={a} colors={colors} isNew={newlyUnlockedIds.has(a.id)} />
      ))}

      {/* COMUNIDAD */}
      <View style={[styles.sectionHeader, styles.sectionHeaderCommunity]}>
        <Text style={styles.sectionTitle}>{t('comunidad.communityTitle')}</Text>
        <TouchableOpacity onPress={refresh} disabled={loading} activeOpacity={0.7}>
          <Ionicons
            name="refresh-outline"
            size={20}
            color={loading ? colors.textMuted : colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.communityTotalCard}>
        <Text style={styles.communityTotalNumber}>
          {loading ? '—' : totalCommunityLatas.toLocaleString()}
        </Text>
        <Text style={styles.communityTotalLabel}>{t('comunidad.communityTotal')}</Text>
      </View>

      {loading && (
        <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
      )}
      {!loading && error && (
        <View style={styles.errorWrap}>
          <Ionicons name="cloud-offline-outline" size={20} color={colors.textMuted} />
          <Text style={styles.errorText}>{t('comunidad.error')}</Text>
        </View>
      )}

      {/* Ranking sabores — PieChart */}
      {!loading && !error && rankingByMonster.length > 0 && (() => {
        const totalMonster = rankingByMonster.reduce((sum, e) => sum + e.count, 0);
        const pieData = rankingByMonster.map((entry) => {
          const monster = MONSTER_TYPES.find((m) => m.id === entry.monsterId);
          const pct = totalMonster > 0 ? Math.round((entry.count / totalMonster) * 100) : 0;
          return {
            value: entry.count,
            color: monster?.color ?? colors.primary,
            text: pct >= 5 ? `${pct}%` : '',
            name: getMonsterName(entry.monsterId).replace('Monster ', '').replace('Juice ', '').split(' ').slice(0, 2).join(' '),
            pct,
            monsterColor: monster?.color ?? colors.primary,
          };
        });
        return (
          <View style={styles.rankingCard}>
            <Text style={styles.rankingTitle}>{t('comunidad.flavorRanking')}</Text>
            <View style={styles.pieContainer}>
              <PieChart
                data={pieData}
                donut
                radius={80}
                innerRadius={45}
                innerCircleColor={colors.surface}
                centerLabelComponent={() => (
                  <View style={styles.pieCenter}>
                    <Text style={styles.pieCenterNumber}>{totalMonster}</Text>
                    <Text style={styles.pieCenterLabel}>total</Text>
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
              {pieData.map((item, i) => (
                <View key={i} style={styles.pieLegendRow}>
                  <View style={[styles.pieLegendDot, { backgroundColor: item.monsterColor }]} />
                  <Text style={styles.pieLegendName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.pieLegendPct}>{item.pct}%</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })()}

      {/* Ranking usuarios — 2.6: con avatares */}
      {!loading && !error && rankingByUser.length > 0 && (
        <>
          <View style={[styles.sectionHeader, styles.sectionHeaderCommunity]}>
            <Text style={styles.sectionTitle}>{t('comunidad.topDrinkers')}</Text>
          </View>
          <View style={styles.rankingCard}>
            {rankingByUser.map((entry, i) => {
              const maxUserCount = rankingByUser[0]?.count ?? 1;
              const medals = ['🥇', '🥈', '🥉'];
              return (
                <TouchableOpacity
                  key={entry.userId}
                  style={styles.rankRow}
                  onPress={() => setSelectedUserId(entry.userId)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.rankPos}>{medals[i] ?? i + 1}</Text>
                  <UserAvatar name={entry.displayName} avatarUrl={entry.avatarUrl} colors={colors} />
                  <View style={styles.rankInfo}>
                    <View style={styles.rankTop}>
                      <Text style={styles.rankName} numberOfLines={1}>{entry.displayName}</Text>
                      <Text style={styles.rankCount}>{entry.count} 🥤</Text>
                    </View>
                    <View style={styles.rankBar}>
                      <View
                        style={[
                          styles.rankBarFill,
                          {
                            backgroundColor: colors.primary,
                            width: `${(entry.count / maxUserCount) * 100}%`,
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>

        </>
      )}

      <PublicProfileScreen
        userId={selectedUserId}
        visible={selectedUserId !== null}
        onClose={() => setSelectedUserId(null)}
      />
    </ScrollView>
  );
}

const getStyles = (colors: ColorPalette) => StyleSheet.create({
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

  // Achievement cards — 2.5: opacity 0.7
  achCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    opacity: 0.7,
  },
  achCardUnlocked: {
    opacity: 1,
    borderWidth: 1,
    borderColor: colors.primary + '50',
  },
  achCardNew: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
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
  pieContainer: { alignItems: 'center', marginVertical: spacing.md },
  pieCenter: { alignItems: 'center', justifyContent: 'center' },
  pieCenterNumber: { fontSize: 22, fontWeight: '800', color: colors.primary },
  pieCenterLabel: { fontSize: 11, color: colors.textMuted },
  pieLegend: { gap: 6, marginTop: spacing.sm },
  pieLegendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pieLegendDot: { width: 10, height: 10, borderRadius: 5 },
  pieLegendName: { flex: 1, fontSize: 13, color: colors.text },
  pieLegendPct: { fontSize: 13, fontWeight: '600', color: colors.textMuted, minWidth: 36, textAlign: 'right' },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  rankPos: { fontSize: 13, fontWeight: '700', color: colors.textMuted, width: 18, textAlign: 'center' },
  rankInfo: { flex: 1 },
  rankTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  rankName: { flex: 1, fontSize: 14, color: colors.text, marginRight: spacing.sm },
  rankCount: { fontSize: 14, fontWeight: '700', color: colors.primary },
  rankBar: { height: 6, backgroundColor: colors.background, borderRadius: 3, overflow: 'hidden' },
  rankBarFill: { height: 6, borderRadius: 3, minWidth: 3 },
});
