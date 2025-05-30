import { createClient } from './supabase/client';
import { users }  from './user'

const supabase = createClient();

export type AuthError = {
  message: string;
  status?: number;
};

export const auth = {
  // Email & Password Sign Up
  async signUp(email: string, password: string) {
    // Step 1: Check if email already exists in users table
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error(
        'This email is already registered. Try signing in instead.'
      );
    }

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows returned
      throw checkError;
    }

    // Step 2: Try to sign up the user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    // If signup fails
    if (signUpError) {
      throw signUpError;
    }

    // If no user data, something went wrong
    if (!data.user) {
      throw new Error('Failed to create user account');
    }

    // Step 3: Only proceed with profile creation for new signups
    if (data.user.identities?.length === 0) {
      try {
        await users.captureUserDetails(data.user);
      } catch (profileError) {
        // If profile creation fails, clean up the auth user
        await supabase.auth.admin.deleteUser(data.user.id);
        throw profileError;
      }
    }

    return data;
  },

  // Email & Password Sign In
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    if (data.user) {
      await users.captureUserDetails(data.user);
    }

    return data;
  },

  // OAuth Sign In (Google, GitHub)
  async signInWithOAuth(provider: 'github' | 'google', nextUrl?: string) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${nextUrl || '/'}`,
      },
    });
    if (error) throw error;
    return data;
  },

  // Sign Out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    //useAccessStore.getState().reset();
    if (error) throw { message: error.message, status: error.status };
  },

  // Password Reset Request
  async resetPasswordRequest(email: string) {
    // First check if user exists in our users table and uses email provider
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, provider')
      .eq('email', email)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      // PGRST116 means no rows returned
      throw userError;
    }

    // If user doesn't exist or doesn't use email auth, still return success
    // This prevents email enumeration attacks
    if (!user || user.provider !== 'email') {
      return {
        success: true,
        message: 'If an account exists, a password reset link will be sent.',
      };
    }

    const resetLink = `${location.origin}/auth/reset-password`;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: resetLink,
    });

    if (error) throw error;

    return {
      success: true,
      message: 'If an account exists, a password reset link will be sent.',
    };
  },

  // Password Reset
  async resetPassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw { message: error.message, status: error.status };
    return data;
  },
};