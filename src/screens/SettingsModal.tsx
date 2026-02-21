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
import { colors, spacing, radius } from '../theme';

const HOUR_PRESETS = [
  { label: '9:00', hour: 9 },
  { label: '12:00', hour: 12 },
  { label: '18:00', hour: 18 },
  { label: '21:00', hour: 21 },
];

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  notificationsEnabled: boolean;
  notificationHour: number;
  onToggleNotifications: (value: boolean) => Promise<void>;
  onSetNotificationHour: (hour: number) => Promise<void>;
}

export default function SettingsModal({
  visible,
  onClose,
  notificationsEnabled,
  notificationHour,
  onToggleNotifications,
  onSetNotificationHour,
}: SettingsModalProps): React.JSX.Element {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Ajustes</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={26} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* NOTIFICACIONES */}
            <Text style={styles.sectionLabel}>NOTIFICACIONES</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="notifications-outline" size={20} color={colors.textSecondary} />
                <Text style={styles.rowLabel}>Recordatorio diario</Text>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={onToggleNotifications}
                  trackColor={{ false: colors.border, true: colors.primary + '80' }}
                  thumbColor={notificationsEnabled ? colors.primary : colors.textMuted}
                />
              </View>

              {notificationsEnabled && (
                <View style={styles.presetWrap}>
                  <Text style={styles.presetLabel}>Hora del recordatorio</Text>
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

            {/* ACERCA DE */}
            <Text style={styles.sectionLabel}>ACERCA DE</Text>
            <View style={styles.card}>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutApp}>Monster Counter</Text>
                <Text style={styles.aboutVersion}>Versión 1.2</Text>
              </View>
              <Text style={styles.aboutCopyright}>
                Aplicación para llevar registro de tus latas de Monster Energy.{'\n'}© 2026
              </Text>
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
