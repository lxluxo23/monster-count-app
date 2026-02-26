import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius } from '../theme';
import { barcodeToMonsterId } from '../constants/barcodes';
import { RateLimitError } from '../hooks/useHistory';

interface BarcodeScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (monsterId: string, source?: 'manual' | 'camera') => Promise<void>;
}

export default function BarcodeScannerModal({
  visible,
  onClose,
  onAdd,
}: BarcodeScannerModalProps): React.JSX.Element {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [adding, setAdding] = useState(false);
  const [lastBarcode, setLastBarcode] = useState<string | null>(null);

  const handleBarCodeScanned = useCallback(
    async ({ data }: { data: string }) => {
      if (scanned || adding) return;
      setScanned(true);
      setLastBarcode(data);

      const monsterId = barcodeToMonsterId(data);

      if (monsterId) {
        setAdding(true);
        try {
          await onAdd(monsterId, 'camera');
          onClose();
        } catch (err) {
          if (err instanceof RateLimitError) {
            Alert.alert(
              t('rateLimit.title'),
              t('rateLimit.exceeded', { minutes: err.waitMinutes })
            );
          } else {
            throw err;
          }
        } finally {
          setAdding(false);
          setScanned(false);
        }
      } else {
        setScanned(false);
        Alert.alert(
          t('scanner.unknownTitle'),
          t('scanner.unknownMessage', { code: data }),
          [
            { text: t('history.cancel'), style: 'cancel', onPress: () => setScanned(false) },
            { text: t('scanner.addManually'), onPress: () => { setScanned(false); onClose(); } },
          ]
        );
      }
    },
    [scanned, adding, onAdd, onClose, t]
  );

  const resetScanner = useCallback(() => {
    setScanned(false);
    setLastBarcode(null);
  }, []);

  if (!visible) return <></>;

  if (!permission) {
    return (
      <Modal visible transparent animationType="slide">
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible transparent animationType="slide">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t('scanner.title')}</Text>
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={28} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.permissionBox}>
            <Ionicons name="camera-outline" size={48} color={colors.textMuted} />
            <Text style={styles.permissionText}>{t('scanner.permissionNeeded')}</Text>
            <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
              <Text style={styles.permissionBtnText}>{t('scanner.grantPermission')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('scanner.title')}</Text>
          <TouchableOpacity onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.cameraWrap}>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128'],
            }}
          />
          <View style={styles.scanFrame} />
          {adding && (
            <View style={styles.addingOverlay}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.addingText}>{t('scanner.adding')}</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('scanner.hint')}</Text>
          {lastBarcode && !adding && (
            <TouchableOpacity style={styles.rescanBtn} onPress={resetScanner}>
              <Text style={styles.rescanText}>{t('scanner.rescan')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
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
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  cameraWrap: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  scanFrame: {
    position: 'absolute',
    top: '30%',
    left: '15%',
    right: '15%',
    height: 180,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radius.lg,
    backgroundColor: 'transparent',
  },
  addingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  addingText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  permissionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.lg,
  },
  permissionText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  permissionBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
  },
  permissionBtnText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    alignItems: 'center',
    gap: spacing.sm,
  },
  footerText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  rescanBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  rescanText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
