import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius } from '../theme';
import { MONSTER_I18N_KEY } from '../constants/monsters';
import type { MonsterType } from '../types';

interface MonsterDetailModalProps {
  monster: MonsterType | null;
  visible: boolean;
  onClose: () => void;
}

interface NutritionRowProps {
  label: string;
  value: string;
  icon: string;
}

function NutritionRow({ label, value, icon }: NutritionRowProps): React.JSX.Element {
  return (
    <View style={styles.nutritionRow}>
      <Text style={styles.nutritionIcon}>{icon}</Text>
      <Text style={styles.nutritionLabel}>{label}</Text>
      <Text style={styles.nutritionValue}>{value}</Text>
    </View>
  );
}

export default function MonsterDetailModal({
  monster,
  visible,
  onClose,
}: MonsterDetailModalProps): React.JSX.Element {
  const { t } = useTranslation();

  if (!monster) return <></>;

  const n = monster.nutrition;
  const mKey = MONSTER_I18N_KEY[monster.id];
  const monsterName = mKey ? t(`monsters.${mKey}.name`) : (monster.name ?? monster.id);
  const monsterDescription = mKey ? t(`monsters.${mKey}.description`) : monster.description;
  const monsterLegend = mKey ? t(`monsters.${mKey}.legend`) : monster.legend;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={[styles.sheet, { borderTopColor: monster.color }]}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header con imagen */}
          <View style={[styles.imageWrap, { backgroundColor: monster.color + '22' }]}>
            {monster.image && (
              <Image source={monster.image} style={styles.image} resizeMode="contain" />
            )}
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
            {/* Nombre + close */}
            <View style={styles.titleRow}>
              <Text style={styles.name}>{monsterName}</Text>
              <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Ionicons name="close-circle" size={28} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Descripción */}
            {monsterDescription && (
              <Text style={styles.description}>{monsterDescription}</Text>
            )}

            {/* Leyenda de la lata */}
            {monsterLegend && (
              <>
                <Text style={styles.sectionLabel}>{t('detail.legend')}</Text>
                <View style={styles.legendCard}>
                  <Text style={styles.legendQuote}>"</Text>
                  <Text style={styles.legendText}>{monsterLegend}</Text>
                </View>
              </>
            )}

            {/* Tabla nutricional */}
            {n && (
              <>
                <Text style={styles.sectionLabel}>{t('detail.nutritionTitle', { volume: n.volume })}</Text>
                <View style={styles.nutritionCard}>
                  <NutritionRow label={t('detail.calories')} value={`${n.kcal} kcal`} icon="🔥" />
                  <View style={styles.divider} />
                  <NutritionRow label={t('detail.caffeine')} value={`${n.caffeine} mg`} icon="⚡" />
                  <View style={styles.divider} />
                  <NutritionRow label={t('detail.sugar')} value={`${n.sugar} g`} icon="🍬" />
                  <View style={styles.divider} />
                  <NutritionRow label={t('detail.sodium')} value={`${n.sodium} mg`} icon="🧂" />
                </View>

                {/* Aviso cafeína */}
                <Text style={styles.disclaimer}>{t('detail.disclaimer')}</Text>
              </>
            )}

            <View style={{ height: spacing.xl }} />
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderTopWidth: 3,
    maxHeight: '85%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  imageWrap: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginTop: spacing.sm,
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
  },
  image: {
    width: 120,
    height: 120,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 26,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  nutritionCard: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  nutritionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  nutritionIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  nutritionLabel: { flex: 1, fontSize: 15, color: colors.textSecondary },
  nutritionValue: { fontSize: 15, fontWeight: '700', color: colors.text },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  legendCard: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  legendQuote: {
    fontSize: 48,
    color: colors.primary,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: spacing.sm,
  },
  legendText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
