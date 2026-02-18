export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? '';
export const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '';
export const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? '';

if (__DEV__) {
  if (!SUPABASE_URL) console.warn('[Env] EXPO_PUBLIC_SUPABASE_URL no configurado en .env');
  if (!SUPABASE_ANON_KEY) console.warn('[Env] EXPO_PUBLIC_SUPABASE_KEY no configurado en .env');
  if (!GOOGLE_WEB_CLIENT_ID) console.warn('[Env] EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID no configurado en .env');
}
