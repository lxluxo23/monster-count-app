import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authorize } from 'react-native-app-auth';
import * as Crypto from 'expo-crypto';
import { supabase } from '../lib/supabase';
import type { Session, User } from '../lib/supabase';
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../constants/env';

// Derivar el GUID quitando el sufijo de Google
const GOOGLE_GUID = GOOGLE_ANDROID_CLIENT_ID.replace('.apps.googleusercontent.com', '');

const googleConfig = {
  issuer: 'https://accounts.google.com',
  clientId: GOOGLE_ANDROID_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUrl: `com.googleusercontent.apps.${GOOGLE_GUID}:/oauth2redirect/google`,
  scopes: ['openid', 'profile', 'email'],
};

// ---------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------

export type AuthStatus = 'loading' | 'guest' | 'authenticated';

export interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  session: Session | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isSigningIn: boolean;
}

// ---------------------------------------------------------------
// Contexto
// ---------------------------------------------------------------

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}

// ---------------------------------------------------------------
// Provider
// ---------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [session, setSession] = useState<Session | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Bootstrap: restaurar sesión al iniciar
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      setStatus(existing ? 'authenticated' : 'guest');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setStatus(newSession ? 'authenticated' : 'guest');
    });

    return () => subscription.unsubscribe();
  }, []);

  // Google Sign-In via AppAuth (Chrome Custom Tab, sin browser externo)
  const signInWithGoogle = useCallback(async (): Promise<void> => {
    setIsSigningIn(true);
    try {
      // Nonce para proteger contra replay attacks
      const rawNonce = Crypto.randomUUID();
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        rawNonce
      );

      const result = await authorize({
        ...googleConfig,
        additionalParameters: { nonce: hashedNonce },
      });

      if (!result.idToken) throw new Error('Google no devolvió idToken');

      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: result.idToken,
        nonce: rawNonce,
      });

      if (error) throw error;

    } catch (err: unknown) {
      // El usuario canceló — silencioso
      if (err instanceof Error && err.message.includes('cancel')) return;
      if (err instanceof Error && err.message.includes('Cancel')) return;
      console.error('[Auth] Error en Google Sign-In:', err);
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut();
  }, []);

  const value: AuthContextValue = {
    status,
    user: session?.user ?? null,
    session,
    signInWithGoogle,
    signOut,
    isSigningIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
