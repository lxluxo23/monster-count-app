import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, radius } from '../theme';
import type { ColorPalette } from '../theme';

const MAX_IMAGE_WIDTH = 1200;
const COMPRESS_QUALITY = 0.6;

interface FlavorRequestModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, description?: string, photoUri?: string) => Promise<void>;
}

export default function FlavorRequestModal({
  visible,
  onClose,
  onSubmit,
}: FlavorRequestModalProps): React.JSX.Element {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors, insets);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setName('');
    setDescription('');
    setPhotoUri(null);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const compressImage = async (uri: string): Promise<string> => {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: MAX_IMAGE_WIDTH } }],
      { compress: COMPRESS_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      const compressed = await compressImage(result.assets[0].uri);
      setPhotoUri(compressed);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      const compressed = await compressImage(result.assets[0].uri);
      setPhotoUri(compressed);
    }
  };

  const handlePickPhoto = () => {
    Alert.alert(t('comunidad.requestPhoto'), undefined, [
      { text: t('comunidad.requestPhotoCamera'), onPress: takePhoto },
      { text: t('comunidad.requestPhotoGallery'), onPress: pickFromGallery },
      { text: t('history.cancel'), style: 'cancel' },
    ]);
  };

  const handleSubmit = async () => {
    if (!name.trim() || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(name, description || undefined, photoUri || undefined);
      reset();
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      Alert.alert(t('comunidad.requestErrorTitle'), msg || t('comunidad.requestErrorGeneric'), [
        { text: 'OK' },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.scroll}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>{t('comunidad.requestNewFlavor')}</Text>
              <TouchableOpacity
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close-circle" size={28} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Name */}
            <Text style={styles.label}>{t('comunidad.requestName')}</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder={t('comunidad.requestNamePlaceholder')}
              placeholderTextColor={colors.textMuted}
              maxLength={100}
              editable={!submitting}
            />

            {/* Description */}
            <Text style={styles.label}>{t('comunidad.requestDescription')}</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={description}
              onChangeText={setDescription}
              placeholder={t('comunidad.requestDescriptionPlaceholder')}
              placeholderTextColor={colors.textMuted}
              maxLength={500}
              multiline
              numberOfLines={3}
              editable={!submitting}
            />

            {/* Photo */}
            <TouchableOpacity
              style={styles.photoBtn}
              onPress={handlePickPhoto}
              disabled={submitting}
              activeOpacity={0.7}
            >
              <Ionicons name="camera-outline" size={20} color={colors.primary} />
              <Text style={styles.photoBtnText}>
                {photoUri ? t('comunidad.requestPhotoChange') : t('comunidad.requestPhoto')}
              </Text>
            </TouchableOpacity>

            {photoUri && (
              <View style={styles.previewWrap}>
                <Image source={{ uri: photoUri }} style={styles.preview} />
                <TouchableOpacity
                  style={styles.previewRemove}
                  onPress={() => setPhotoUri(null)}
                  disabled={submitting}
                  activeOpacity={0.7}
                >
                  <View style={styles.previewRemoveInner}>
                    <Ionicons name="trash" size={18} color="#fff" />
                    <Text style={styles.previewRemoveText}>{t('comunidad.removePhoto')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/* Submit */}
            <TouchableOpacity
              style={[styles.submitBtn, (!name.trim() || submitting) && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={!name.trim() || submitting}
              activeOpacity={0.7}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitBtnText}>{t('comunidad.requestSubmit')}</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const getStyles = (colors: ColorPalette, insets: { top: number; bottom: number }) =>
  StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'flex-end' },
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
    sheet: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: radius.xl,
      borderTopRightRadius: radius.xl,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl + insets.bottom,
      maxHeight: '85%',
    },
    scroll: { maxHeight: 400 },
    handle: {
      width: 48,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.border,
      alignSelf: 'center',
      marginTop: spacing.md,
      marginBottom: spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    title: { fontSize: 18, fontWeight: '800', color: colors.text },
    label: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: spacing.sm,
    },
    input: {
      backgroundColor: colors.background,
      borderRadius: radius.md,
      padding: spacing.md,
      fontSize: 15,
      color: colors.text,
      marginBottom: spacing.md,
    },
    inputMultiline: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    photoBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingVertical: spacing.sm,
      marginBottom: spacing.md,
    },
    photoBtnText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
    previewWrap: {
      marginBottom: spacing.md,
      borderRadius: radius.lg,
      overflow: 'hidden',
      alignSelf: 'flex-start',
    },
    preview: { width: 120, height: 90, borderRadius: radius.lg },
    previewRemove: {
      position: 'absolute',
      top: 4,
      right: 4,
      backgroundColor: 'rgba(220, 53, 69, 0.95)',
      borderRadius: radius.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: 4,
    },
    previewRemoveInner: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    previewRemoveText: { fontSize: 12, fontWeight: '600', color: '#fff' },
    submitBtn: {
      backgroundColor: colors.primary,
      borderRadius: radius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
      marginTop: spacing.sm,
    },
    submitBtnDisabled: { opacity: 0.5 },
    submitBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  });
