import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { radius, spacing } from '../theme';
import type { ColorPalette } from '../theme';

interface HistoryCardProps {
  title: string;
  dateLabel: string;
}

export function HistoryCard({ title, dateLabel }: HistoryCardProps): React.JSX.Element {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{dateLabel}</Text>
    </View>
  );
}

const getStyles = (colors: ColorPalette) => StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  date: {
    color: colors.textMuted,
    fontSize: 14,
  },
});
