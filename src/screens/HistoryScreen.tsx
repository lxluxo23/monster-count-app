import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { HistoryCard } from '../components';
import { getMonsterName } from '../constants/monsters';
import type { HistoryEntry } from '../types';
import { colors, spacing } from '../theme';

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isToday) {
    return 'Hoy ' + d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString('es', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface HistoryScreenProps {
  history: HistoryEntry[];
  loading: boolean;
}

export default function HistoryScreen({
  history,
  loading,
}: HistoryScreenProps): React.JSX.Element {
  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Cargando…</Text>
      </View>
    );
  }

  if (history.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Aún no hay Monsters en el historial.</Text>
        <Text style={styles.emptySub}>Añade una desde la pestaña Inicio.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Historial</Text>
        <Text style={styles.count}>{history.length} registros</Text>
      </View>
      <FlatList<HistoryEntry>
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HistoryCard
            title={getMonsterName(item.monsterId)}
            dateLabel={formatDate(item.date)}
          />
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
});
