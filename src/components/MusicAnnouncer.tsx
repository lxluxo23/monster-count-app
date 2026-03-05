import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface MusicAnnouncerProps {
  song: string;
  artist: string;
  albumCover?: string | null;
  visible: boolean;
  monsterColor: string;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicAnnouncer({
  song,
  artist,
  albumCover,
  visible,
  monsterColor,
  isPlaying,
  onToggle,
}: MusicAnnouncerProps): React.JSX.Element | null {
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom + 14;
  const slideAnim = useRef(new Animated.Value(300)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [shown, setShown] = useState(false);
  const [coverError, setCoverError] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spinRef = useRef<Animated.CompositeAnimation | null>(null);

  const hasCover = !!albumCover && !coverError;

  // Reset cover error when albumCover changes
  useEffect(() => { setCoverError(false); }, [albumCover]);

  // Slow continuous rotation while playing (vinyl-like)
  useEffect(() => {
    if (isPlaying) {
      spinAnim.setValue(0);
      const loop = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      spinRef.current = loop;
      loop.start();
    } else {
      spinRef.current?.stop();
      spinRef.current = null;
    }

    return () => {
      spinRef.current?.stop();
      spinRef.current = null;
    };
  }, [isPlaying, spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (visible) {
      setShown(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();

      hideTimer.current = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShown(false));
      }, 6000);
    } else {
      slideAnim.setValue(300);
      setShown(false);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    }

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [visible, slideAnim]);

  const handleReshow = () => {
    if (shown) return;
    setShown(true);
    slideAnim.setValue(300);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShown(false));
    }, 6000);
  };

  if (!visible && !shown) return null;

  const coverThumb = (size: number) =>
    hasCover ? (
      <Animated.Image
        source={{ uri: albumCover! }}
        style={[
          { width: size, height: size, borderRadius: size / 2 },
          { transform: [{ rotate: spin }] },
        ]}
        onError={() => setCoverError(true)}
      />
    ) : (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Ionicons name="musical-notes" size={size * 0.6} color={monsterColor} />
      </Animated.View>
    );

  return (
    <>
      {/* Mini floating button when announcer is hidden but music plays */}
      {!shown && isPlaying && (
        <TouchableOpacity style={[styles.miniButton, { bottom: safeBottom }]} onPress={handleReshow} activeOpacity={0.7}>
          {coverThumb(24)}
        </TouchableOpacity>
      )}

      {shown && (
        <Animated.View
          style={[
            styles.container,
            { bottom: safeBottom, transform: [{ translateX: slideAnim }], borderRightColor: monsterColor },
          ]}
        >
          <View style={styles.coverWrap}>
            {coverThumb(32)}
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.songName} numberOfLines={1}>{song}</Text>
            <Text style={styles.artistName} numberOfLines={1}>{artist}</Text>
          </View>
          <TouchableOpacity onPress={onToggle} style={styles.playBtn} activeOpacity={0.7}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 12,
    borderRightWidth: 3,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 10,
    maxWidth: '80%',
    zIndex: 100,
    elevation: 10,
  },
  coverWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textWrap: {
    flex: 1,
  },
  songName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  artistName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginTop: 1,
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniButton: {
    position: 'absolute',
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 10,
  },
});
