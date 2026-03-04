import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MusicAnnouncerProps {
  song: string;
  artist: string;
  visible: boolean;
  monsterColor: string;
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicAnnouncer({
  song,
  artist,
  visible,
  monsterColor,
  isPlaying,
  onToggle,
}: MusicAnnouncerProps): React.JSX.Element | null {
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const [shown, setShown] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          toValue: -250,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShown(false));
      }, 6000);
    } else {
      slideAnim.setValue(-250);
      setShown(false);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    }

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [visible, slideAnim]);

  // Tap to re-show if hidden but still playing
  const handleReshow = () => {
    if (shown) return;
    setShown(true);
    slideAnim.setValue(-250);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShown(false));
    }, 6000);
  };

  if (!visible && !shown) return null;

  return (
    <>
      {/* Mini music icon when announcer is hidden but music is playing */}
      {!shown && isPlaying && (
        <TouchableOpacity style={styles.miniButton} onPress={handleReshow} activeOpacity={0.7}>
          <Ionicons name="musical-notes" size={18} color="#fff" />
        </TouchableOpacity>
      )}

      {shown && (
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateX: slideAnim }], borderLeftColor: monsterColor },
          ]}
        >
          <View style={styles.iconWrap}>
            <Ionicons name="musical-notes" size={16} color={monsterColor} />
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
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
    borderLeftWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 10,
    maxWidth: '80%',
    zIndex: 100,
    elevation: 10,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
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
    bottom: 12,
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 10,
  },
});
