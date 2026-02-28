import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import { usePrivacy } from '../hooks/usePrivacy';

const HOUR_PRESETS = [
  { label: '9:00', hour: 9 },
  { label: '12:00', hour: 12 },
  { label: '18:00', hour: 18 },
  { label: '21:00', hour: 21 },
];

const GOAL_PRESETS = [0, 1, 2, 3, 4, 5];

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  notificationsEnabled: boolean;
  notificationHour: number;
  onToggleNotifications: (value: boolean) => Promise<void>;
  onSetNotificationHour: (hour: number) => Promise<void>;
  dailyGoal: number;
  onSetDailyGoal: (value: number) => Promise<void>;
}

export default function SettingsModal({
  visible,
  onClose,
  notificationsEnabled,
  notificationHour,
  onToggleNotifications,
  onSetNotificationHour,
  dailyGoal,
  onSetDailyGoal,
}: SettingsModalProps): React.JSX.Element {
  const { t } = useTranslation();
  const { status } = useAuth();
  const {
    showInRanking,
    setShowInRanking,
    showAchievements,
    setShowAchievements,
    showStats,
    setShowStats,
  } = usePrivacy();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('settings.title')}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={26} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* NOTIFICACIONES */}
            <Text style={styles.sectionLabel}>{t('settings.notificationsSection')}</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="notifications-outline" size={20} color={colors.textSecondary} />
                <Text style={styles.rowLabel}>{t('settings.dailyReminder')}</Text>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={onToggleNotifications}
                  trackColor={{ false: colors.border, true: colors.primary + '80' }}
                  thumbColor={notificationsEnabled ? colors.primary : colors.textMuted}
                />
              </View>

              {notificationsEnabled && (
                <View style={styles.presetWrap}>
                  <Text style={styles.presetLabel}>{t('settings.reminderTime')}</Text>
                  <View style={styles.presets}>
                    {HOUR_PRESETS.map((p) => (
                      <TouchableOpacity
                        key={p.hour}
                        style={[
                          styles.presetChip,
                          notificationHour === p.hour && styles.presetChipActive,
                        ]}
                        onPress={() => onSetNotificationHour(p.hour)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.presetChipText,
                            notificationHour === p.hour && styles.presetChipTextActive,
                          ]}
                        >
                          {p.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* META DIARIA */}
            <Text style={styles.sectionLabel}>{t('settings.dailyGoalSection')}</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="flag-outline" size={20} color={colors.textSecondary} />
                <Text style={styles.rowLabel}>{t('settings.dailyGoal')}</Text>
              </View>
              <Text style={styles.privacyDesc}>{t('settings.dailyGoalDesc')}</Text>
              <View style={styles.presetWrap}>
                <View style={styles.presets}>
                  {GOAL_PRESETS.map((g) => (
                    <TouchableOpacity
                      key={g}
                      style={[
                        styles.presetChip,
                        dailyGoal === g && styles.presetChipActive,
                      ]}
                      onPress={() => onSetDailyGoal(g)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.presetChipText,
                          dailyGoal === g && styles.presetChipTextActive,
                        ]}
                      >
                        {g === 0 ? t('settings.dailyGoalOff') : String(g)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* PRIVACIDAD */}
            {status === 'authenticated' && (
              <>
                <Text style={styles.sectionLabel}>{t('settings.privacySection')}</Text>
                <View style={styles.card}>
                  <View style={styles.row}>
                    <Ionicons name="podium-outline" size={20} color={colors.textSecondary} />
                    <Text style={styles.rowLabel}>{t('settings.showInRanking')}</Text>
                    <Switch
                      value={showInRanking}
                      onValueChange={setShowInRanking}
                      trackColor={{ false: colors.border, true: colors.primary + '80' }}
                      thumbColor={showInRanking ? colors.primary : colors.textMuted}
                    />
                  </View>
                  <Text style={styles.privacyDesc}>{t('settings.showInRankingDesc')}</Text>

                  <View style={[styles.row, styles.rowBorder]}>
                    <Ionicons name="trophy-outline" size={20} color={colors.textSecondary} />
                    <Text style={styles.rowLabel}>{t('settings.showAchievements')}</Text>
                    <Switch
                      value={showAchievements}
                      onValueChange={setShowAchievements}
                      trackColor={{ false: colors.border, true: colors.primary + '80' }}
                      thumbColor={showAchievements ? colors.primary : colors.textMuted}
                    />
                  </View>
                  <Text style={styles.privacyDesc}>{t('settings.showAchievementsDesc')}</Text>

                  <View style={[styles.row, styles.rowBorder]}>
                    <Ionicons name="stats-chart-outline" size={20} color={colors.textSecondary} />
                    <Text style={styles.rowLabel}>{t('settings.showStats')}</Text>
                    <Switch
                      value={showStats}
                      onValueChange={setShowStats}
                      trackColor={{ false: colors.border, true: colors.primary + '80' }}
                      thumbColor={showStats ? colors.primary : colors.textMuted}
                    />
                  </View>
                  <Text style={styles.privacyDesc}>{t('settings.showStatsDesc')}</Text>
                </View>
              </>
            )}

            {/* ACERCA DE */}
            <Text style={styles.sectionLabel}>{t('settings.aboutSection')}</Text>
            <View style={styles.card}>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutApp}>{t('settings.appName')}</Text>
                <Text style={styles.aboutVersion}>{t('settings.version')}</Text>
              </View>
              <Text style={styles.aboutCopyright}>{t('settings.copyright')}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  rowLabel: { flex: 1, fontSize: 16, color: colors.text, fontWeight: '500' },
  presetWrap: {
    paddingBottom: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  presetLabel: { fontSize: 13, color: colors.textMuted, marginBottom: spacing.sm },
  presets: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  presetChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  presetChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  presetChipText: { fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
  presetChipTextActive: { color: colors.black, fontWeight: '700' },
  privacyDesc: {
    fontSize: 12,
    color: colors.textMuted,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    lineHeight: 16,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  aboutApp: { fontSize: 16, fontWeight: '700', color: colors.text },
  aboutVersion: { fontSize: 14, color: colors.textMuted },
  aboutCopyright: {
    fontSize: 13,
    color: colors.textMuted,
    paddingBottom: spacing.md,
    lineHeight: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
});
