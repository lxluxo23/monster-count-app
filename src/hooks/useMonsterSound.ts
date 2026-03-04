import { useEffect, useRef, useState, useCallback } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

interface UseMonsterSoundReturn {
  isPlaying: boolean;
  isLoading: boolean;
  toggle: () => void;
}

/**
 * Fetches a fresh preview URL from the Deezer public API.
 * Preview URLs contain temporary tokens that expire, so we resolve them at runtime.
 */
async function fetchPreviewUrl(trackId: number): Promise<string | null> {
  try {
    console.log(`[MonsterSound] Fetching preview for track ${trackId}...`);
    const res = await fetch(`https://api.deezer.com/track/${trackId}`);
    if (!res.ok) {
      console.warn(`[MonsterSound] Deezer API returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (data.error) {
      console.warn('[MonsterSound] Deezer API error:', data.error);
      return null;
    }
    const url = data.preview as string | undefined;
    console.log(`[MonsterSound] Preview URL: ${url ? 'OK' : 'none'}`);
    return url ?? null;
  } catch (err) {
    console.warn('[MonsterSound] Fetch failed:', err);
    return null;
  }
}

export function useMonsterSound(
  deezerTrackId: number | undefined,
  shouldPlay: boolean,
  audioEnabled: boolean = true,
  volume: number = 0.7,
): UseMonsterSoundReturn {
  const active = shouldPlay && audioEnabled;

  const [source, setSource] = useState<{ uri: string } | null>(null);
  const [fetching, setFetching] = useState(false);
  const hasAutoPlayed = useRef(false);

  // Resolve preview URL when modal opens; clear immediately on close/change
  useEffect(() => {
    setSource(null);
    hasAutoPlayed.current = false;

    if (!active || !deezerTrackId) {
      setFetching(false);
      return;
    }

    let cancelled = false;
    setFetching(true);

    fetchPreviewUrl(deezerTrackId).then((url) => {
      if (cancelled) return;
      setFetching(false);
      if (url) {
        setSource({ uri: url });
      }
    });

    return () => { cancelled = true; };
  }, [active, deezerTrackId]);

  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);

  const isPlaying = status.playing;
  const isLoading = fetching || (!!source && !status.isLoaded);

  // Apply volume changes
  useEffect(() => {
    if (status.isLoaded) {
      player.volume = volume;
    }
  }, [volume, status.isLoaded, player]);

  // Auto-play once when the NEW source is loaded
  useEffect(() => {
    if (source && active && status.isLoaded && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      player.volume = volume;
      player.play();
    }
  }, [source, active, status.isLoaded, player, volume]);

  const toggle = useCallback(() => {
    if (!status.isLoaded) return;
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  }, [player, status.isLoaded, status.playing]);

  return { isPlaying, isLoading, toggle };
}
