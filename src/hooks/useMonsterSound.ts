import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

/** Track metadata resolved at runtime from the Deezer API. */
export interface ResolvedTrack {
  song: string;
  artist: string;
  previewUrl: string;
  /** Album cover URL (small, ~56px) from Deezer. */
  albumCover: string | null;
}

interface UseMonsterSoundReturn {
  isPlaying: boolean;
  isLoading: boolean;
  toggle: () => void;
  /** The randomly-selected track for this session (null while loading / if none). */
  currentTrack: ResolvedTrack | null;
}

/**
 * Fetches track metadata + preview URL from the Deezer public API.
 */
async function fetchTrack(trackId: number): Promise<ResolvedTrack | null> {
  try {
    console.log(`[MonsterSound] Fetching track ${trackId}...`);
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
    const preview = data.preview as string | undefined;
    if (!preview) {
      console.warn('[MonsterSound] No preview URL available');
      return null;
    }
    return {
      song: data.title ?? 'Unknown',
      artist: data.artist?.name ?? 'Unknown',
      previewUrl: preview,
      albumCover: data.album?.cover_small ?? data.album?.cover ?? null,
    };
  } catch (err) {
    console.warn('[MonsterSound] Fetch failed:', err);
    return null;
  }
}

/** Pick a random element from an array. */
function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function useMonsterSound(
  trackIds: number[] | undefined,
  shouldPlay: boolean,
  audioEnabled: boolean = true,
  volume: number = 0.7
): UseMonsterSoundReturn {
  const active = shouldPlay && audioEnabled;

  const [source, setSource] = useState<{ uri: string } | null>(null);
  const [fetching, setFetching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<ResolvedTrack | null>(null);
  const hasAutoPlayed = useRef(false);

  // Stable key so the effect only re-runs when the actual IDs change
  const tracksKey = useMemo(() => trackIds?.join(',') ?? '', [trackIds]);

  // Pick a random track ID, fetch metadata + preview URL
  useEffect(() => {
    setSource(null);
    setCurrentTrack(null);
    hasAutoPlayed.current = false;

    if (!active || !trackIds || trackIds.length === 0) {
      setFetching(false);
      return;
    }

    const selectedId = pickRandom(trackIds);
    let cancelled = false;
    setFetching(true);

    fetchTrack(selectedId).then((track) => {
      if (cancelled) return;
      setFetching(false);
      if (track) {
        setCurrentTrack(track);
        setSource({ uri: track.previewUrl });
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, tracksKey]);

  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);
  const volumeRef = useRef(volume);
  volumeRef.current = volume;

  const isPlaying = status.playing;
  const isLoading = fetching || (!!source && !status.isLoaded);

  // Apply volume — run on every volume change and whenever player becomes loaded
  useEffect(() => {
    if (!status.isLoaded) return;
    try {
      player.volume = volume;
    } catch {
      /* player may have been released */
    }
  }, [volume, status.isLoaded, player]);

  // Auto-play once when the NEW source is loaded
  useEffect(() => {
    if (source && active && status.isLoaded && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      try {
        player.volume = volumeRef.current;
        player.play();
      } catch {
        /* player may have been released */
      }
    }
  }, [source, active, status.isLoaded, player]);

  const toggle = useCallback(() => {
    if (!status.isLoaded) return;
    try {
      player.volume = volumeRef.current;
      if (status.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch {
      /* player may have been released */
    }
  }, [player, status.isLoaded, status.playing]);

  return { isPlaying, isLoading, toggle, currentTrack };
}
