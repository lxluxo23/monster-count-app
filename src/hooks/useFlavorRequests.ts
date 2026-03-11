import { useState, useEffect, useCallback } from 'react';
import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { FlavorRequest } from '../types';

const ADMIN_ID = '035376c2-4605-4a74-992f-3fe036a3ae92';

interface UseFlavorRequestsReturn {
  requests: FlavorRequest[];
  loading: boolean;
  isAdmin: boolean;
  submitRequest: (name: string, description?: string, photoUri?: string) => Promise<void>;
  toggleVote: (requestId: string) => Promise<void>;
  deleteRequest: (requestId: string) => Promise<void>;
  approvePhoto: (requestId: string) => Promise<void>;
  refresh: () => void;
}

export function useFlavorRequests(): UseFlavorRequestsReturn {
  const { user } = useAuth();
  const isAdmin = user?.id === ADMIN_ID;
  const [requests, setRequests] = useState<FlavorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  // Fetch requests + check user votes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const { data: rows, error } = await supabase.from('flavor_requests_with_votes').select('*');

        if (error || !rows || cancelled) {
          if (!cancelled) setLoading(false);
          return;
        }

        // Get current user's votes
        let votedIds = new Set<string>();
        if (user) {
          const { data: votes } = await supabase
            .from('flavor_request_votes')
            .select('request_id')
            .eq('user_id', user.id);
          if (votes) {
            votedIds = new Set(votes.map((v: { request_id: string }) => v.request_id));
          }
        }

        if (cancelled) return;

        const mapped: FlavorRequest[] = rows.map((r: Record<string, unknown>) => {
          const photoPath = r.photo_path as string | null;
          const photoApproved = (r.photo_approved as boolean) ?? true;
          const isAuthor = user?.id === (r.user_id as string);
          let photoUrl: string | null = null;
          if (photoPath && (photoApproved || isAdmin || isAuthor)) {
            const { data } = supabase.storage.from('flavor-requests').getPublicUrl(photoPath);
            photoUrl = data.publicUrl;
          }
          return {
            id: r.id as string,
            userId: r.user_id as string,
            name: r.name as string,
            description: (r.description as string) ?? null,
            photoPath,
            photoUrl,
            photoApproved,
            createdAt: r.created_at as string,
            authorName: (r.author_name as string) ?? null,
            voteCount: (r.vote_count as number) ?? 0,
            hasVoted: votedIds.has(r.id as string),
          };
        });

        setRequests(mapped);
      } catch (err) {
        if (__DEV__) console.warn('[FlavorRequests] fetch error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tick, user, isAdmin]);

  const submitRequest = useCallback(
    async (name: string, description?: string, photoUri?: string) => {
      if (!user) return;

      let photoPath: string | null = null;

      if (photoUri) {
        const fileName = `${user.id}/${Date.now()}.jpg`;
        const contentType = 'image/jpeg';

        const base64 = await FileSystem.readAsStringAsync(photoUri, {
          encoding: 'base64',
        });
        const arrayBuffer = decode(base64);

        const { error: uploadErr } = await supabase.storage
          .from('flavor-requests')
          .upload(fileName, arrayBuffer, { contentType, upsert: false });

        if (uploadErr) {
          if (__DEV__) console.warn('[FlavorRequests] upload error:', uploadErr);
          throw uploadErr;
        }
        photoPath = fileName;
      }

      const { error } = await supabase.from('flavor_requests').insert({
        user_id: user.id,
        name: name.trim(),
        description: description?.trim() || null,
        photo_path: photoPath,
        photo_approved: !photoPath,
      });

      if (error) {
        if (__DEV__) console.warn('[FlavorRequests] insert error:', error);
        throw error;
      }

      refresh();
    },
    [user, refresh]
  );

  const toggleVote = useCallback(
    async (requestId: string) => {
      if (!user) return;

      const target = requests.find((r) => r.id === requestId);
      if (!target) return;

      if (target.hasVoted) {
        await supabase
          .from('flavor_request_votes')
          .delete()
          .eq('user_id', user.id)
          .eq('request_id', requestId);
      } else {
        await supabase
          .from('flavor_request_votes')
          .insert({ user_id: user.id, request_id: requestId });
      }

      // Optimistic update
      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId
            ? { ...r, hasVoted: !r.hasVoted, voteCount: r.voteCount + (r.hasVoted ? -1 : 1) }
            : r
        )
      );
    },
    [user, requests]
  );

  const deleteRequest = useCallback(
    async (requestId: string) => {
      if (!user) return;

      const target = requests.find((r) => r.id === requestId);
      const canDelete = isAdmin || target?.userId === user.id;
      if (!canDelete) return;

      // Delete photo from storage if exists
      if (target?.photoPath) {
        await supabase.storage.from('flavor-requests').remove([target.photoPath]);
      }

      await supabase.from('flavor_requests').delete().eq('id', requestId);

      // Optimistic remove
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    },
    [user, requests, isAdmin]
  );

  const approvePhoto = useCallback(
    async (requestId: string) => {
      if (!user || !isAdmin) return;

      const { error } = await supabase
        .from('flavor_requests')
        .update({ photo_approved: true })
        .eq('id', requestId);

      if (error) {
        if (__DEV__) console.warn('[FlavorRequests] approve error:', error);
        throw error;
      }

      // Optimistic update + refresh to get photoUrl for newly approved
      const target = requests.find((r) => r.id === requestId);
      if (target?.photoPath) {
        const { data } = supabase.storage.from('flavor-requests').getPublicUrl(target.photoPath);
        setRequests((prev) =>
          prev.map((r) =>
            r.id === requestId ? { ...r, photoApproved: true, photoUrl: data.publicUrl } : r
          )
        );
      } else {
        setRequests((prev) =>
          prev.map((r) => (r.id === requestId ? { ...r, photoApproved: true } : r))
        );
      }
    },
    [user, isAdmin, requests]
  );

  return {
    requests,
    loading,
    isAdmin,
    submitRequest,
    toggleVote,
    deleteRequest,
    approvePhoto,
    refresh,
  };
}
