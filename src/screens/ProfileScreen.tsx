import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MONSTER_TYPES, getMonsterName } from '../constants/monsters';
import { colors, spacing, radius } from '../theme';

interface ProfileScreenProps {
  total: number;
  today: number;
  favoriteMonsterId: string | null;
  countByMonsterId: Record<string, number>;
  userName: string;
  onSetUserName: (name: string) => Promise<void>;
}

export default function ProfileScreen({
  total,
  today,
  favoriteMonsterId,
  countByMonsterId,
  userName,
  onSetUserName,
}: ProfileScreenProps): React.JSX.Element {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const favoriteCount = favoriteMonsterId ? countByMonsterId[favoriteMonsterId] ?? 0 : 0;

  const handleSaveName = () => {
    if (tempName.trim()) {
      onSetUserName(tempName.trim());
      setShowEditModal(false);
    }
  };

  const handleMenuPress = (label: string) => {
    switch (label) {
      case 'Mis datos':
        setTempName(userName);
        setShowEditModal(true);
        break;
      case 'Estadísticas detalladas':
        setShowStatsModal(true);
        break;
      case 'Notificaciones':
        Alert.alert('Notificaciones', 'Función disponible próximamente');
        break;
      case 'Acerca de':
        Alert.alert(
          'Monster Counter',
          'Versión 1.0\n\nAplicación para llevar registro de tus latas de Monster Energy.\n\n© 2026'
        );
        break;
      case 'Ajustes':
        Alert.alert('Ajustes', 'Panel de configuración próximamente');
        break;
    }
  };

  const statsData = MONSTER_TYPES.map((m) => ({
    ...m,
    count: countByMonsterId[m.id] ?? 0,
  })).sort((a, b) => b.count - a.count);

  const maxCount = statsData.length > 0 ? Math.max(...statsData.map((m) => m.count), 1) : 1;

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={colors.textMuted} />
            </View>
          </View>
          <Text style={styles.greeting}>¡Hola, {userName}!</Text>
          <Text style={styles.subGreeting}>Tu resumen de Monsters</Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{total}</Text>
              <Text style={styles.statLabel}>Total latas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{today}</Text>
              <Text style={styles.statLabel}>Hoy</Text>
            </View>
          </View>
          {favoriteMonsterId && (
            <View style={styles.favoriteCard}>
              <Ionicons name="heart" size={24} color={colors.primary} />
              <View style={styles.favoriteText}>
                <Text style={styles.favoriteLabel}>Tu favorito</Text>
                <Text style={styles.favoriteName}>
                  {getMonsterName(favoriteMonsterId)} · {favoriteCount} veces
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Opciones</Text>
          {[
            { icon: 'person-outline' as const, label: 'Mis datos' },
            { icon: 'notifications-outline' as const, label: 'Notificaciones' },
            { icon: 'stats-chart-outline' as const, label: 'Estadísticas detalladas' },
            { icon: 'information-circle-outline' as const, label: 'Acerca de' },
            { icon: 'settings-outline' as const, label: 'Ajustes' },
          ].map((item, index, arr) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuRow, index === arr.length - 1 && styles.menuRowLast]}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item.label)}
            >
              <Ionicons name={item.icon} size={22} color={colors.textSecondary} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footer}>Monster Counter · v1.0</Text>
      </ScrollView>

      {/* Modal editar nombre */}
      <Modal visible={showEditModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar nombre</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Escribe tu nombre"
              placeholderTextColor={colors.textMuted}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSaveName}
              >
                <Text style={styles.modalButtonTextSave}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal estadísticas detalladas */}
      <Modal visible={showStatsModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalContentLarge]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Estadísticas</Text>
              <TouchableOpacity onPress={() => setShowStatsModal(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.statsList}>
              {statsData.map((monster) => (
                <View key={monster.id} style={styles.statsRow}>
                  <View style={styles.statsRowTop}>
                    <View
                      style={[styles.statsColorDot, { backgroundColor: monster.color }]}
                    />
                    <Text style={styles.statsName}>{monster.name}</Text>
                    <Text style={styles.statsCount}>{monster.count}</Text>
                  </View>
                  <View style={styles.statsBar}>
                    <View
                      style={[
                        styles.statsBarFill,
                        {
                          backgroundColor: monster.color,
                          width: `${(monster.count / maxCount) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
              {statsData.every((m) => m.count === 0) && (
                <Text style={styles.emptyStats}>
                  Aún no hay estadísticas. Añade Monsters desde Inicio.
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatarWrap: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.surfaceElevated,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  subGreeting: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: 4,
  },
  statsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  statRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  favoriteText: { flex: 1 },
  favoriteLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  menuSection: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  modalContentLarge: {
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: colors.background,
  },
  modalButtonSave: {
    backgroundColor: colors.primary,
  },
  modalButtonTextCancel: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  modalButtonTextSave: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
  statsList: {
    maxHeight: 400,
  },
  statsRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  statsRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statsBar: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statsBarFill: {
    height: 8,
    borderRadius: 4,
    minWidth: 4,
  },
  statsColorDot: {
    width: 12,
    height: 12,
    borderRadius: radius.full,
    marginRight: spacing.md,
  },
  statsName: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  statsCount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  emptyStats: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 15,
    marginTop: spacing.lg,
  },
});
