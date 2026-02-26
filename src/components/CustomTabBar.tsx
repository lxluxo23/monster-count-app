import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

interface CustomTabBarProps extends BottomTabBarProps {
  onScanPress: () => void;
}

export function CustomTabBar({ state, descriptors, navigation, onScanPress }: CustomTabBarProps): React.JSX.Element {
  const SCAN_INDEX = 2; // Home, History, Scan, Community, Profile

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isScan = index === SCAN_INDEX;

        if (isScan) {
          return (
            <View key={route.key} style={styles.scanTabWrap}>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={onScanPress}
                activeOpacity={0.8}
              >
                <Ionicons name="barcode-outline" size={28} color={colors.primary} />
              </TouchableOpacity>
            </View>
          );
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = {
          Home: isFocused ? 'home' : 'home-outline',
          History: isFocused ? 'list' : 'list-outline',
          Community: isFocused ? 'people' : 'people-outline',
          Profile: isFocused ? 'person' : 'person-outline',
        }[route.name] ?? 'ellipse-outline';

        const label = options.tabBarLabel ?? route.name;
        const labelStr = typeof label === 'string' ? label : route.name;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={iconName as 'home' | 'home-outline' | 'list' | 'list-outline' | 'people' | 'people-outline' | 'person' | 'person-outline'}
              size={24}
              color={isFocused ? colors.primary : colors.textMuted}
            />
            <Text
              style={[styles.label, { color: isFocused ? colors.primary : colors.textMuted }]}
              numberOfLines={1}
            >
              {labelStr}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  scanTabWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
  },
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
});
