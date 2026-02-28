import React, { useState, useCallback, useRef, useEffect } from 'react';
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
import { getMonsterName } from '../constants/monsters';
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
  const [successMonster, setSuccessMonster] = useState<string | null>(null);
  const lastUnknownTime = useRef(0);

  useEffect(() => {
    if (!visible) {
      setScanned(false);
      setAdding(false);
      setLastBarcode(null);
      setSuccessMonster(null);
    }
  }, [visible]);

  const handleBarCodeScanned = useCallback(
    async ({ data }: { data: string }) => {
      if (scanned || adding || successMonster) return;
      if (Date.now() - lastUnknownTime.current < 2000) return;
      setScanned(true);
      setLastBarcode(data);

      const monsterId = barcodeToMonsterId(data);

      if (monsterId) {
        setAdding(true);
        try {
          await onAdd(monsterId, 'camera');
          setAdding(false);
          setSuccessMonster(monsterId);
          setTimeout(() => {
            setSuccessMonster(null);
            onClose();
          }, 1500);
        } catch (err) {
          if (err instanceof RateLimitError) {
            Alert.alert(
              t('rateLimit.title'),
              t('rateLimit.exceeded', { minutes: err.waitMinutes })
            );
          } else {
            throw err;
          }
          setScanned(false);
        } finally {
          setAdding(false);
        }
      } else {
        lastUnknownTime.current = Date.now();
        Alert.alert(
          t('scanner.unknownTitle'),
          t('scanner.unknownMessage', { code: data }),
          [
            { text: t('history.cancel'), style: 'cancel' },
            { text: t('scanner.addManually'), onPress: () => { setScanned(false); setLastBarcode(null); onClose(); } },
          ]
        );
      }
    },
    [scanned, adding, successMonster, onAdd, onClose, t]
  );

  const resetScanner = useCallback(() => {
    setScanned(false);
    setLastBarcode(null);
  }, []);

  if (!visible) return <></>;

  if (!permission) {
    return (
      <Modal visible transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible transparent animationType="slide" onRequestClose={onClose}>
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
    <Modal visible animationType="slide" onRequestClose={onClose}>
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
          {successMonster && (
            <View style={styles.successOverlay}>
              <Ionicons name="checkmark-circle" size={64} color="#27AE60" />
              <Text style={styles.successText}>{t('scanner.registered')}</Text>
              <Text style={styles.successMonster}>{getMonsterName(successMonster)}</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('scanner.hint')}</Text>
          {lastBarcode && !adding && !successMonster && (
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
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  successText: {
    color: '#27AE60',
    fontSize: 18,
    fontWeight: '800',
  },
  successMonster: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
