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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MONSTER_TYPES, getMonsterName } from '../constants/monsters';
import { colors, spacing, radius } from '../theme';
import { useAuth } from '../contexts/AuthContext';

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
  const { status, user, signInWithGoogle, signOut, isSigningIn } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const isAuthenticated = status === 'authenticated';
  const favoriteCount = favoriteMonsterId ? countByMonsterId[favoriteMonsterId] ?? 0 : 0;

  const displayName = isAuthenticated
    ? (user?.user_metadata?.full_name as string | undefined) ?? userName
    : userName;

  const handleSaveName = () => {
    if (tempName.trim()) {
      onSetUserName(tempName.trim());
      setShowEditModal(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro? Tus datos locales se conservarán.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', style: 'destructive', onPress: () => signOut().catch(console.error) },
      ]
    );
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
          'Versión 1.2\n\nAplicación para llevar registro de tus latas de Monster Energy.\n\n© 2026'
        );
        break;
      case 'Ajustes':
        Alert.alert('Ajustes', 'Panel de configuración próximamente');
        break;
      case 'Cerrar sesión':
        handleSignOut();
        break;
    }
  };

  const statsData = MONSTER_TYPES.map((m) => ({
    ...m,
    count: countByMonsterId[m.id] ?? 0,
  })).sort((a, b) => b.count - a.count);

  const maxCount = statsData.length > 0 ? Math.max(...statsData.map((m) => m.count), 1) : 1;

  const menuItems: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string }[] = [
    { icon: 'person-outline', label: 'Mis datos' },
    { icon: 'notifications-outline', label: 'Notificaciones' },
    { icon: 'stats-chart-outline', label: 'Estadísticas detalladas' },
    { icon: 'information-circle-outline', label: 'Acerca de' },
    { icon: 'settings-outline', label: 'Ajustes' },
    ...(isAuthenticated ? [{ icon: 'log-out-outline' as const, label: 'Cerrar sesión' }] : []),
  ];

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header / Avatar */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={colors.textMuted} />
            </View>
            {isAuthenticated && (
              <View style={styles.syncBadge}>
                <Ionicons name="cloud-done" size={13} color={colors.primary} />
              </View>
            )}
          </View>
          <Text style={styles.greeting}>¡Hola, {displayName}!</Text>
          <Text style={styles.subGreeting}>
            {isAuthenticated ? 'Sincronización activa ☁️' : 'Tu resumen de Monsters'}
          </Text>
        </View>

        {/* Banner de login (solo en modo guest) */}
        {status === 'guest' && (
          <View style={styles.authBanner}>
            <Ionicons name="cloud-upload-outline" size={26} color={colors.primary} />
            <View style={styles.authBannerText}>
              <Text style={styles.authBannerTitle}>Activa la sincronización</Text>
              <Text style={styles.authBannerSub}>
                Inicia sesión con Google para guardar en la nube
              </Text>
            </View>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={signInWithGoogle}
              disabled={isSigningIn}
              activeOpacity={0.8}
            >
              {isSigningIn
                ? <ActivityIndicator size="small" color={colors.black} />
                : <Text style={styles.googleButtonText}>Google</Text>
              }
            </TouchableOpacity>
          </View>
        )}

        {/* Stats */}
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

        {/* Menú */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Opciones</Text>
          {menuItems.map((item, index, arr) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuRow,
                index === arr.length - 1 && styles.menuRowLast,
              ]}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item.label)}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={item.label === 'Cerrar sesión' ? '#E74C3C' : colors.textSecondary}
              />
              <Text style={[
                styles.menuLabel,
                item.label === 'Cerrar sesión' && styles.menuLabelDestructive,
              ]}>
                {item.label}
              </Text>
              {item.label !== 'Cerrar sesión' && (
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footer}>Monster Counter · v1.2</Text>
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
                    <View style={[styles.statsColorDot, { backgroundColor: monster.color }]} />
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
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 48 },
  header: { alignItems: 'center', paddingVertical: spacing.xl },
  avatarWrap: { marginBottom: spacing.md },
  avatar: {
    width: 88, height: 88, borderRadius: radius.full,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: colors.surfaceElevated,
  },
  syncBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 22, height: 22, borderRadius: radius.full,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.background,
  },
  greeting: { fontSize: 26, fontWeight: '800', color: colors.text },
  subGreeting: { fontSize: 15, color: colors.textMuted, marginTop: 4 },
  authBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, marginHorizontal: spacing.lg,
    borderRadius: radius.lg, padding: spacing.md,
    marginBottom: spacing.lg, gap: spacing.md,
    borderWidth: 1, borderColor: colors.primary + '40',
  },
  authBannerText: { flex: 1 },
  authBannerTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  authBannerSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  googleButton: {
    backgroundColor: colors.primary, paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm, borderRadius: radius.sm,
    minWidth: 72, alignItems: 'center',
  },
  googleButtonText: { color: colors.black, fontWeight: '700', fontSize: 14 },
  statsSection: { paddingHorizontal: spacing.lg, marginBottom: spacing.xl },
  statRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  statCard: {
    flex: 1, backgroundColor: colors.surface,
    borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center',
  },
  statValue: { fontSize: 32, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  favoriteCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, gap: spacing.md,
  },
  favoriteText: { flex: 1 },
  favoriteLabel: { fontSize: 12, color: colors.textMuted },
  favoriteName: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 2 },
  menuSection: {
    backgroundColor: colors.surface, marginHorizontal: spacing.lg,
    borderRadius: radius.lg, overflow: 'hidden',
  },
  menuTitle: {
    fontSize: 13, fontWeight: '600', color: colors.textMuted,
    paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm,
  },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: spacing.md, paddingHorizontal: spacing.lg,
    gap: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
  },
  menuRowLast: { borderBottomWidth: 0 },
  menuLabel: { flex: 1, fontSize: 16, color: colors.text, fontWeight: '500' },
  menuLabelDestructive: { color: '#E74C3C' },
  footer: { textAlign: 'center', fontSize: 12, color: colors.textMuted, marginTop: spacing.xl },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center', alignItems: 'center', padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.surface, borderRadius: radius.lg,
    padding: spacing.lg, width: '100%', maxWidth: 400,
  },
  modalContentLarge: { maxHeight: '80%' },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: spacing.lg,
  },
  modalTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  input: {
    backgroundColor: colors.background, borderRadius: radius.md,
    padding: spacing.md, fontSize: 16, color: colors.text, marginBottom: spacing.lg,
  },
  modalButtons: { flexDirection: 'row', gap: spacing.md },
  modalButton: {
    flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center',
  },
  modalButtonCancel: { backgroundColor: colors.background },
  modalButtonSave: { backgroundColor: colors.primary },
  modalButtonTextCancel: { color: colors.text, fontWeight: '600', fontSize: 16 },
  modalButtonTextSave: { color: colors.black, fontWeight: '700', fontSize: 16 },
  statsList: { maxHeight: 400 },
  statsRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
  },
  statsRowTop: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  statsBar: { height: 8, backgroundColor: colors.background, borderRadius: 4, overflow: 'hidden' },
  statsBarFill: { height: 8, borderRadius: 4, minWidth: 4 },
  statsColorDot: { width: 12, height: 12, borderRadius: radius.full, marginRight: spacing.md },
  statsName: { flex: 1, fontSize: 15, color: colors.text },
  statsCount: { fontSize: 16, fontWeight: '700', color: colors.primary },
  emptyStats: { textAlign: 'center', color: colors.textMuted, fontSize: 15, marginTop: spacing.lg },
});
