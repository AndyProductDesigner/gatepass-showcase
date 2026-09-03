import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Creates a Supabase client for Server Components,
// Server Actions and Route Handlers.
export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Stops immediately with a clear error when the Supabase
  // environment variables have not been configured.
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.',
    );
  }

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },

      setAll(cookiesToSet, _headers) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot write cookies.
          // The authentication proxy will handle session refreshing.
        }
      },
    },
  });
}
