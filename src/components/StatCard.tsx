import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { radius, spacing } from '../theme';
import type { ColorPalette } from '../theme';

interface StatCardProps {
  value: number;
  label: string;
  onPress?: () => void;
}

export function StatCard({ value, label, onPress }: StatCardProps): React.JSX.Element {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const content = (
    <>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.card}>{content}</View>;
}

const getStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      padding: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 100,
    },
    value: {
      fontSize: 40,
      fontWeight: '800',
      color: colors.primary,
      letterSpacing: -1,
    },
    label: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: 6,
      fontWeight: '600',
    },
  });
