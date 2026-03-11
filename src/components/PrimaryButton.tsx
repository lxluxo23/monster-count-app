import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { radius } from '../theme';
import type { ColorPalette } from '../theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: PrimaryButtonProps): React.JSX.Element {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 18,
      borderRadius: radius.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDisabled: {
      backgroundColor: colors.disabled,
      opacity: 0.6,
    },
    title: {
      color: colors.black,
      fontWeight: '800',
      fontSize: 17,
    },
  });
