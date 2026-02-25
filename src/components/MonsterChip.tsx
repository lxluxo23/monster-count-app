import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import type { MonsterType } from '../types';
import { colors, radius, spacing } from '../theme';
import { getMonsterName } from '../constants/monsters';

interface MonsterChipProps {
  monster: MonsterType;
  selected: boolean;
  onPress: () => void;
  onLongPress?: () => void;
}

export function MonsterChip({ monster, selected, onPress, onLongPress }: MonsterChipProps): React.JSX.Element {
  const name = getMonsterName(monster.id);
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: monster.color },
        selected && styles.chipSelected,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
      activeOpacity={0.85}
    >
      {monster.image != null ? (
        <Image source={monster.image} style={styles.image} resizeMode="contain" />
      ) : (
        <View style={[styles.placeholder, { backgroundColor: colors.surface }]}>
          <Text style={styles.placeholderText}>{name.charAt(0)}</Text>
        </View>
      )}
      <Text style={styles.label} numberOfLines={2}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  chipSelected: {
    borderWidth: 4,
    borderColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
    transform: [{ scale: 1.02 }],
  },
  image: {
    width: 64,
    height: 64,
    marginBottom: spacing.sm,
  },
  placeholder: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  placeholderText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 24,
  },
  label: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 16,
  },
});
