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
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-gifted-charts';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, radius } from '../theme';
import type { ColorPalette } from '../theme';
import { useAchievements, type Achievement } from '../hooks/useAchievements';
import { useGlobalStats } from '../hooks/useGlobalStats';
import { useFlavorRequests } from '../hooks/useFlavorRequests';
import { useAuth } from '../contexts/AuthContext';
import { getMonsterName, MONSTER_TYPES } from '../constants/monsters';
import PublicProfileScreen from './PublicProfileScreen';
import FlavorRequestModal from './FlavorRequestModal';
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
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors, insets);
  const { status, user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [imageViewerUri, setImageViewerUri] = useState<string | null>(null);
  const [newlyUnlockedIds, setNewlyUnlockedIds] = useState<Set<string>>(new Set());
  const achievements = useAchievements({ history, total, streak, countByMonsterId });
  const { rankingByMonster, rankingByUser, totalCommunityLatas, loading, error, refresh } = useGlobalStats();
  const { requests, loading: requestsLoading, isAdmin, submitRequest, toggleVote, deleteRequest, approvePhoto, refresh: refreshRequests } = useFlavorRequests();

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

      {/* SOLICITAR SABORES */}
      <View style={[styles.sectionHeader, styles.sectionHeaderCommunity]}>
        <Text style={styles.sectionTitle}>{t('comunidad.flavorRequests')}</Text>
        {status === 'authenticated' && (
          <TouchableOpacity onPress={() => setShowRequestModal(true)} activeOpacity={0.7}>
            <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {requestsLoading && (
        <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
      )}

      {!requestsLoading && requests.length === 0 && (
        <View style={styles.requestEmptyWrap}>
          <Text style={styles.requestEmptyText}>{t('comunidad.requestEmpty')}</Text>
          {status !== 'authenticated' && (
            <Text style={styles.requestLoginHint}>{t('comunidad.requestLoginToSubmit')}</Text>
          )}
        </View>
      )}

      {!requestsLoading && requests.map((req) => {
        const canDelete = isAdmin || (user?.id === req.userId);
        const canApprovePhoto = isAdmin && req.photoPath && !req.photoApproved;
        const handleDelete = () => {
          if (!canDelete) return;
          Alert.alert(
            t('comunidad.requestDeleteTitle'),
            t('comunidad.requestDeleteMsg', { name: req.name }),
            [
              { text: t('history.cancel'), style: 'cancel' },
              { text: t('comunidad.requestDelete'), style: 'destructive', onPress: () => deleteRequest(req.id) },
            ],
          );
        };
        return (
          <View key={req.id} style={styles.requestCard}>
            {req.photoUrl ? (
              <TouchableOpacity
                onPress={() => setImageViewerUri(req.photoUrl)}
                activeOpacity={0.8}
                style={styles.requestPhotoTouchable}
              >
                <Image source={{ uri: req.photoUrl }} style={styles.requestPhoto} />
                {!req.photoApproved && (
                  <View style={styles.photoPendingBadge}>
                    <Text style={styles.photoPendingText}>{t('comunidad.photoPending')}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <View style={styles.requestPhotoPlaceholder}>
                <Ionicons name="image-outline" size={24} color={colors.textMuted} />
              </View>
            )}
            <View style={styles.requestInfo}>
              <Text style={styles.requestName} numberOfLines={2}>{req.name}</Text>
              {req.description && (
                <Text style={styles.requestDesc} numberOfLines={2}>{req.description}</Text>
              )}
              {req.authorName && (
                <Text style={styles.requestAuthor}>{t('comunidad.requestBy', { name: req.authorName })}</Text>
              )}
            </View>
            <View style={styles.requestActions}>
              {canApprovePhoto && (
                <TouchableOpacity
                  style={styles.requestApproveBtn}
                  onPress={() => approvePhoto(req.id)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="checkmark-circle-outline" size={20} color={colors.primary} />
                  <Text style={styles.requestApproveText}>{t('comunidad.approvePhoto')}</Text>
                </TouchableOpacity>
              )}
              {canDelete && (
                <TouchableOpacity
                  style={styles.requestDeleteBtn}
                  onPress={handleDelete}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="trash-outline" size={20} color="#dc3545" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.requestVoteBtn, req.hasVoted && styles.requestVoteBtnActive]}
                onPress={() => {
                  if (status !== 'authenticated') return;
                  toggleVote(req.id);
                }}
                activeOpacity={status === 'authenticated' ? 0.7 : 1}
              >
                <Ionicons
                  name={req.hasVoted ? 'arrow-up-circle' : 'arrow-up-circle-outline'}
                  size={22}
                  color={req.hasVoted ? colors.primary : colors.textMuted}
                />
                <Text style={[styles.requestVoteCount, req.hasVoted && styles.requestVoteCountActive]}>
                  {req.voteCount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      {/* Image viewer modal */}
      <Modal
        visible={imageViewerUri !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setImageViewerUri(null)}
      >
        <Pressable
          style={styles.imageViewerOverlay}
          onPress={() => setImageViewerUri(null)}
        >
          {imageViewerUri && (
            <Image
              source={{ uri: imageViewerUri }}
              style={styles.imageViewerImage}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity
            style={styles.imageViewerClose}
            onPress={() => setImageViewerUri(null)}
          >
            <Ionicons name="close-circle" size={36} color="#fff" />
          </TouchableOpacity>
        </Pressable>
      </Modal>

      <FlavorRequestModal
        visible={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSubmit={submitRequest}
      />

      <PublicProfileScreen
        userId={selectedUserId}
        visible={selectedUserId !== null}
        onClose={() => setSelectedUserId(null)}
      />
    </ScrollView>
  );
}

const getStyles = (colors: ColorPalette, insets: { top: number; bottom: number } = { top: 0, bottom: 0 }) => StyleSheet.create({
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

  // Flavor requests
  requestEmptyWrap: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  requestEmptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  requestLoginHint: { fontSize: 12, color: colors.textMuted, fontStyle: 'italic' },
  requestCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    alignItems: 'center',
  },
  requestPhotoTouchable: { position: 'relative' },
  requestPhoto: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
  },
  photoPendingBadge: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    right: 2,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 4,
    paddingVertical: 2,
    alignItems: 'center',
  },
  photoPendingText: { fontSize: 9, color: '#fff', fontWeight: '600' },
  requestApproveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: spacing.sm,
  },
  requestApproveText: { fontSize: 12, fontWeight: '600', color: colors.primary },
  requestPhotoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  requestDeleteBtn: {
    padding: spacing.sm,
  },
  requestInfo: { flex: 1 },
  requestName: { fontSize: 15, fontWeight: '700', color: colors.text },
  requestDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  requestAuthor: { fontSize: 11, color: colors.textMuted, marginTop: 4 },
  requestVoteBtn: {
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  requestVoteBtnActive: {},
  requestVoteCount: { fontSize: 12, fontWeight: '700', color: colors.textMuted, marginTop: 2 },
  requestVoteCountActive: { color: colors.primary },
  imageViewerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageViewerImage: {
    width: '100%',
    height: '100%',
  },
  imageViewerClose: {
    position: 'absolute',
    top: insets.top + spacing.sm,
    right: spacing.lg,
  },
});
