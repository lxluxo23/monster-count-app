import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Alert } from 'react-native';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { HistoryCard } from '../components';
import { getMonsterName } from '../constants/monsters';
import type { HistoryEntry } from '../types';
import { colors, spacing, radius } from '../theme';
import i18n from '../i18n';

function formatDate(iso: string, todayLabel: string): string {
  const lang = i18n.language;
  const locale = lang === 'pt' ? 'pt-BR' : lang;
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

function renderRightActions(
  _progress: Animated.AnimatedInterpolation<number>,
  dragX: Animated.AnimatedInterpolation<number>,
) {
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
  const openSwipeableRef = useRef<Swipeable | null>(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('tabs.history')}</Text>
        <Text style={styles.count}>{t('history.records', { count: history.length })}</Text>
      </View>
      <FlatList<HistoryEntry>
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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

const styles = StyleSheet.create({
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
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 32,
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
