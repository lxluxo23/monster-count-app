import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { StatCard, MonsterChip } from '../components';
import { MONSTER_TYPES } from '../constants/monsters';
import { colors, spacing, radius } from '../theme';
import MonsterDetailModal from './MonsterDetailModal';
import StatsScreen from './StatsScreen';
import { RateLimitError } from '../hooks/useHistory';
import type { MonsterType, HistoryEntry } from '../types';

interface HomeScreenProps {
  total: number;
  today: number;
  onAdd: (monsterId: string) => Promise<void>;
  history: HistoryEntry[];
  countByMonsterId: Record<string, number>;
  dailyGoal: number;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.lg * 2 - spacing.md) / 2;

export default function HomeScreen({ total, today, onAdd, history, countByMonsterId, dailyGoal }: HomeScreenProps): React.JSX.Element {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [detailMonster, setDetailMonster] = useState<MonsterType | null>(null);
  const [showStats, setShowStats] = useState(false);
  
  // Animaciones
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selected) {
      // Aparece con bounce
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start();

      // Pulso continuo
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [selected]);

  const handleAdd = async (): Promise<void> => {
    if (!selected || adding) return;
    setAdding(true);
    
    // Animación de feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      await onAdd(selected);
      setSelected(null);
    } catch (err) {
      if (err instanceof RateLimitError) {
        Alert.alert(
          t('rateLimit.title'),
          t('rateLimit.exceeded', { minutes: err.waitMinutes })
        );
      } else {
        throw err;
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{t('home.heroTitle')}</Text>
          <Text style={styles.heroSubtitle}>{t('home.heroSubtitle')}</Text>
        </View>

        <View style={styles.stats}>
          <StatCard value={today} label={t('home.today')} onPress={() => setShowStats(true)} />
          <View style={styles.statGap} />
          <StatCard value={total} label={t('home.total')} onPress={() => setShowStats(true)} />
        </View>

        {dailyGoal > 0 && (
          <View style={styles.goalSection}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalLabel}>{t('home.dailyGoal')}</Text>
              <Text style={styles.goalCount}>
                {today} / {dailyGoal}
              </Text>
            </View>
            <View style={styles.goalBarBg}>
              <View
                style={[
                  styles.goalBarFill,
                  {
                    width: `${Math.min(100, (today / dailyGoal) * 100)}%`,
                    backgroundColor: today >= dailyGoal ? '#27AE60' : colors.primary,
                  },
                ]}
              />
            </View>
            {today >= dailyGoal && (
              <Text style={styles.goalDone}>{t('home.dailyGoalDone')}</Text>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.selectMonster')}</Text>
          <View style={styles.grid}>
            {MONSTER_TYPES.map((m) => (
              <View key={m.id} style={[styles.gridItem, { width: cardWidth }]}>
                <MonsterChip
                  monster={m}
                  selected={selected === m.id}
                  onPress={() => setSelected(selected === m.id ? null : m.id)}
                  onLongPress={() => setDetailMonster(m)}
                />
              </View>
            ))}
          </View>
          <Text style={styles.longPressHint}>{t('home.longPressHint')}</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB circular flotante con animaciones */}
      <Animated.View
        style={[
          styles.fabContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          },
        ]}
        pointerEvents={selected ? 'auto' : 'none'}
      >
        {/* Círculos de resplandor */}
        <Animated.View
          style={[
            styles.fabGlow,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.1],
                outputRange: [0.3, 0],
              }),
            },
          ]}
        />
        
        <TouchableOpacity
          style={[styles.fab, adding && styles.fabAdding]}
          onPress={handleAdd}
          disabled={adding}
          activeOpacity={0.8}
        >
          {adding ? (
            <View style={styles.fabSpinner}>
              <Ionicons name="hourglass" size={28} color={colors.black} />
            </View>
          ) : (
            <Ionicons name="checkmark-circle" size={32} color={colors.black} />
          )}
        </TouchableOpacity>

        {/* Indicador de cantidad si hay selección */}
        {selected && !adding && (
          <Animated.View
            style={[
              styles.badge,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <Text style={styles.badgeText}>1</Text>
          </Animated.View>
        )}
      </Animated.View>

      {/* Modal info nutricional */}
      <MonsterDetailModal
        monster={detailMonster}
        visible={detailMonster !== null}
        onClose={() => setDetailMonster(null)}
      />

      {/* Estadísticas detalladas */}
      <StatsScreen
        visible={showStats}
        onClose={() => setShowStats(false)}
        history={history}
        countByMonsterId={countByMonsterId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  hero: {
    marginBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  statGap: {
    width: spacing.md,
  },
  goalSection: {
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  goalCount: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  goalBarBg: {
    height: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
    overflow: 'hidden',
  },
  goalBarFill: {
    height: '100%',
    borderRadius: 5,
    minWidth: 4,
  },
  goalDone: {
    marginTop: spacing.sm,
    fontSize: 13,
    fontWeight: '700',
    color: '#27AE60',
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 17,
    color: colors.text,
    marginBottom: spacing.lg,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  gridItem: {
    height: 150,
  },
  longPressHint: {
    marginTop: spacing.md,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: spacing.xl + 10,
    right: spacing.lg,
  },
  fabGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    top: -10,
    left: -10,
  },
  fab: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  fabAdding: {
    backgroundColor: colors.primaryDark,
  },
  fabSpinner: {
    transform: [{ rotate: '0deg' }],
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E74C3C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background,
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 6,
  },
  badgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
