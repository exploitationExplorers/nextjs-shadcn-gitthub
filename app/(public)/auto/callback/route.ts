import { createClient } from '@/utils/supabase/server';
import { users } from '@/utils/user';
import { NextResponse } from 'next/server';
import  {type NextRequest} from 'next/server';
export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') || '/projects';

    if (!code) {
      console.error('No code provided in callback');
      throw new Error('No code provided');
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log(data,'data');
    console.log(error,'error');
    if (error) {
      console.error('Auth error:', error);
      throw error;
    }

    // Capture user details after successful OAuth
    if (data.user) {
      try {
        await users.captureUserDetails(data.user);
      } catch (error) {
        console.error('Error capturing user details:', error);
        // Don't throw here - we still want to complete the auth flow
      }
    }

    // Redirect to the intended page
    return NextResponse.redirect(new URL(next, requestUrl.origin));
  } catch (error) {
    console.error('Callback error:', error);
    // Add error to the URL so we can display it
    const errorUrl = new URL('/auth/auth-error', request.url);
    errorUrl.searchParams.set('error', 'Failed to sign in');
    return NextResponse.redirect(errorUrl);
  }
}