import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius } from '../theme';
import { getMonsterName } from '../constants/monsters';
import { usePublicProfile } from '../hooks/usePublicProfile';
import { useAuth } from '../contexts/AuthContext';
import type { Achievement } from '../hooks/useAchievements';

interface PublicProfileScreenProps {
  userId: string | null;
  visible: boolean;
  onClose: () => void;
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
      </View>
    </View>
  );
}

export default function PublicProfileScreen({
  userId,
  visible,
  onClose,
}: PublicProfileScreenProps): React.JSX.Element {
  const { t } = useTranslation();
  const { status } = useAuth();
  const { data, loading, error } = usePublicProfile(visible ? userId : null);

  const isGuest = status !== 'authenticated';

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.fullScreen}>
        <View style={styles.header}>
            <Text style={styles.title}>{t('publicProfile.title')}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={26} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.contentArea}>
          {loading && !isGuest && (
            <View style={styles.center}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}

          {isGuest && (
            <View style={styles.center}>
              <Ionicons name="lock-closed-outline" size={48} color={colors.textMuted} />
              <Text style={styles.errorText}>{t('publicProfile.loginRequired')}</Text>
            </View>
          )}

          {!isGuest && error && (
            <View style={styles.center}>
              <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {!loading && !error && !isGuest && data && (
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              <View style={styles.avatarWrap}>
                <View style={styles.avatar}>
                  {data.avatarUrl ? (
                    <Image source={{ uri: data.avatarUrl }} style={styles.avatarImage} />
                  ) : (
                    <Ionicons name="person" size={40} color={colors.textMuted} />
                  )}
                </View>
              </View>
              <Text style={styles.displayName}>{data.displayName}</Text>

              {data.showStats && (
                <>
                  <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                      <Text style={styles.statValue}>{data.total}</Text>
                      <Text style={styles.statLabel}>{t('profile.totalLabel')}</Text>
                    </View>
                    <View style={styles.statCard}>
                      <Text style={styles.statValue}>{data.streak}</Text>
                      <Text style={styles.statLabel}>{t('profile.streakLabel')}</Text>
                    </View>
                  </View>
                  {data.favoriteMonsterId && (
                    <View style={styles.favoriteCard}>
                      <Ionicons name="heart" size={24} color={colors.primary} />
                      <View style={styles.favoriteText}>
                        <Text style={styles.favoriteLabel}>{t('profile.favoriteLabel')}</Text>
                        <Text style={styles.favoriteName}>
                          {getMonsterName(data.favoriteMonsterId)} ·{' '}
                          {t('profile.favoriteUnit', {
                            count: data.countByMonsterId[data.favoriteMonsterId] ?? 0,
                          })}
                        </Text>
                      </View>
                    </View>
                  )}
                </>
              )}

              {!data.showStats && (
                <Text style={styles.privacyNote}>{t('publicProfile.statsPrivate')}</Text>
              )}

              {data.showAchievements && data.achievements.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>
                    {t('comunidad.achievementsTitle')} ({data.achievements.filter((a) => a.unlocked).length}/{data.achievements.length})
                  </Text>
                  {data.achievements.map((a) => (
                    <AchievementCard key={a.id} a={a} />
                  ))}
                </>
              )}

              {data.showAchievements === false && (
                <Text style={styles.privacyNote}>{t('publicProfile.achievementsPrivate')}</Text>
              )}

              <View style={{ height: spacing.xl }} />
            </ScrollView>
          )}
          </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingTop: spacing.xl,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  contentArea: {
    flex: 1,
    minHeight: 0,
  },
  center: {
    paddingVertical: spacing.xl * 2,
    alignItems: 'center',
  },
  errorText: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: spacing.md,
  },
  scroll: { flex: 1, minHeight: 0 },
  content: { paddingTop: spacing.md, paddingBottom: spacing.xl },
  avatarWrap: { alignItems: 'center', marginBottom: spacing.md },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  displayName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statValue: { fontSize: 28, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  favoriteText: { flex: 1 },
  favoriteLabel: { fontSize: 12, color: colors.textMuted },
  favoriteName: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 2 },
  privacyNote: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  achCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
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
  achEmoji: { fontSize: 24, lineHeight: 32 },
  achContent: { flex: 1 },
  achTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 2 },
  achTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: colors.text },
  achTitleLocked: { color: colors.textSecondary },
  achDesc: { fontSize: 12, color: colors.textMuted },
});
