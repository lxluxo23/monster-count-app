import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { supabase } from '../lib/supabase';
import type { Session, User } from '../lib/supabase';
import { GOOGLE_WEB_CLIENT_ID } from '../constants/env';

// Configurar Google Sign-In una vez al cargar el módulo
GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
  offlineAccess: false,
});

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

  // Google Sign-In nativo — abre el account picker del sistema, sin browser
  const signInWithGoogle = useCallback(async (): Promise<void> => {
    setIsSigningIn(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) {
        // Usuario canceló
        return;
      }

      const idToken = response.data.idToken;
      if (!idToken) throw new Error('Google no devolvió idToken');

      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) throw error;

    } catch (err) {
      if (isErrorWithCode(err)) {
        if (err.code === statusCodes.SIGN_IN_CANCELLED) return;
        if (err.code === statusCodes.IN_PROGRESS) return;
        if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.error('[Auth] Google Play Services no disponible');
          return;
        }
      }
      console.error('[Auth] Error en Google Sign-In:', err);
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await Promise.all([
      supabase.auth.signOut(),
      GoogleSignin.signOut(),
    ]);
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
