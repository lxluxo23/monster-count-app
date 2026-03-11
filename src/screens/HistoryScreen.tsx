import React, { useRef, useCallback, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { HistoryCard } from '../components';
import { getMonsterName, MONSTER_TYPES } from '../constants/monsters';
import type { HistoryEntry } from '../types';
import { spacing, radius } from '../theme';
import type { ColorPalette } from '../theme';
import { useTheme } from '../contexts/ThemeContext';
import i18n from '../i18n';

function formatDate(iso: string, todayLabel: string): string {
  const lang = i18n.language;
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang;
  const d = new Date(iso);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isToday) {
    return todayLabel + ' ' + d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface HistoryScreenProps {
  history: HistoryEntry[];
  loading: boolean;
  onRemove: (id: string) => Promise<void>;
}

export default function HistoryScreen({
  history,
  loading,
  onRemove,
}: HistoryScreenProps): React.JSX.Element {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const openSwipeableRef = useRef<Swipeable | null>(null);
  const [filterMonsterId, setFilterMonsterId] = useState<string | null>(null);

  const filteredHistory = useMemo(
    () => (filterMonsterId ? history.filter((e) => e.monsterId === filterMonsterId) : history),
    [history, filterMonsterId]
  );

  const renderRightActions = useCallback(
    (
      _progress: Animated.AnimatedInterpolation<number>,
      dragX: Animated.AnimatedInterpolation<number>
    ) => {
      const scale = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0.5],
        extrapolate: 'clamp',
      });

      return (
        <View style={styles.deleteAction}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="trash-outline" size={22} color={colors.white} />
          </Animated.View>
        </View>
      );
    },
    [styles.deleteAction, colors.white]
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>{t('history.loading')}</Text>
      </View>
    );
  }

  if (history.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>{t('history.emptyTitle')}</Text>
        <Text style={styles.emptySub}>{t('history.emptySubtitle')}</Text>
      </View>
    );
  }

  const todayLabel = t('history.today');

  const listHeader = (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{t('tabs.history')}</Text>
        <Text style={styles.count}>{t('history.records', { count: filteredHistory.length })}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        <TouchableOpacity
          style={[styles.filterChip, filterMonsterId === null && styles.filterChipActive]}
          onPress={() => setFilterMonsterId(null)}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.filterChipText, filterMonsterId === null && styles.filterChipTextActive]}
          >
            {t('history.filterAll')}
          </Text>
        </TouchableOpacity>
        {MONSTER_TYPES.map((m) => {
          const active = filterMonsterId === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              style={[
                styles.filterChip,
                active && { backgroundColor: m.color + '30', borderColor: m.color },
              ]}
              onPress={() => setFilterMonsterId(active ? null : m.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.filterDot, { backgroundColor: m.color }]} />
              <Text
                style={[styles.filterChipText, active && { color: colors.text }]}
                numberOfLines={1}
              >
                {getMonsterName(m.id).replace('Monster ', '').replace('Juice ', '')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList<HistoryEntry>
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <View style={styles.emptyFilter}>
            <Text style={styles.emptyFilterText}>{t('history.emptyFilter')}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Swipeable
            ref={(ref) => {
              if (ref) openSwipeableRef.current = ref;
            }}
            renderRightActions={renderRightActions}
            overshootRight={false}
            onSwipeableOpen={() => {
              Alert.alert(
                t('history.deleteTitle'),
                t('history.deleteMessage', { name: getMonsterName(item.monsterId) }),
                [
                  {
                    text: t('history.cancel'),
                    style: 'cancel',
                    onPress: () => openSwipeableRef.current?.close(),
                  },
                  {
                    text: t('history.delete'),
                    style: 'destructive',
                    onPress: () => onRemove(item.id),
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <HistoryCard
              title={getMonsterName(item.monsterId)}
              dateLabel={formatDate(item.date, todayLabel)}
            />
          </Swipeable>
        )}
      />
    </View>
  );
}

const getStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    loading: {
      color: colors.textMuted,
      fontSize: 17,
    },
    empty: {
      color: colors.text,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '600',
    },
    emptySub: {
      color: colors.textMuted,
      marginTop: 10,
      fontSize: 15,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text,
    },
    count: {
      fontSize: 14,
      color: colors.textMuted,
    },
    filterRow: {
      paddingHorizontal: spacing.lg,
      gap: spacing.sm,
      paddingBottom: spacing.md,
      alignItems: 'center',
    },
    filterChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      flexShrink: 0,
      flexGrow: 0,
    },
    filterChipActive: {
      backgroundColor: colors.primary + '25',
      borderColor: colors.primary,
    },
    filterChipText: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
    },
    filterChipTextActive: {
      color: colors.primary,
    },
    filterDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    list: {
      paddingHorizontal: spacing.lg,
      paddingBottom: 32,
    },
    emptyFilter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing.xl * 2,
    },
    emptyFilterText: {
      color: colors.textMuted,
      fontSize: 15,
    },
    deleteAction: {
      backgroundColor: '#E74C3C',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      borderRadius: radius.md,
      marginBottom: 12,
    },
  });
