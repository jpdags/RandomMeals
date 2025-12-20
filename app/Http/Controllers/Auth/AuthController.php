<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Show the login form
     */
    public function showLoginForm(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        throw ValidationException::withMessages([
            'email' => __('The provided credentials do not match our records.'),
        ]);
    }

    /**
     * Show the registration form
     */
    public function showRegisterForm(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle registration
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        return redirect('/');
    }

    /**
     * Handle logout
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Redirect to Google OAuth
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google OAuth callback
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::where('email', $googleUser->email)->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                    'email_verified_at' => now(),
                ]);
            } else {
                $user->update([
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                ]);
            }

            Auth::login($user);

            return redirect('/');
        } catch (\Exception $e) {
            Log::error('Google OAuth Error: ' . $e->getMessage());
            return redirect('/login')->withErrors(['error' => 'Unable to login with Google. Please try again.']);
        }
    }

    /**
     * Show forgot password form
     */
    public function showForgotPasswordForm(): Response
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    /**
     * Show verify OTP form
     */
    public function showVerifyOtpForm(): Response
    {
        return Inertia::render('Auth/VerifyOtp');
    }

    /**
     * Send password reset OTP
     */
    public function sendPasswordResetOtp(Request $request)
    {
        // Validate email
        $request->validate([
            'email' => 'required|email',
        ]);

        // Check if user exists
        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return response()->json([
                'message' => 'No account found with that email address.',
            ], 422);
        }

        // Generate OTP (6-digit code)
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Store OTP in password_resets table with expiration
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($otp),
                'created_at' => now(),
            ]
        );

        // Send OTP via email
        try {
            Mail::raw("Your password reset OTP is: {$otp}\n\nThis OTP expires in 60 minutes.", function ($message) use ($user) {
                $message->to($user->email)
                    ->subject('Password Reset OTP - RandomMeals');
            });
            Log::info('OTP sent successfully to: ' . $user->email);
            return response()->json([
                'message' => 'OTP sent to your email address.',
                'email' => $user->email,
            ]);
        } catch (\Exception $e) {
            Log::error('OTP Email Error: ' . $e->getMessage());
            Log::error('OTP Email Stack: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Unable to send OTP. Please check your email address or try again later.',
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Verify OTP and send reset password link
     */
    public function verifyPasswordResetOtp(Request $request)
    {
        // Validate input
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        // Check if user exists
        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return response()->json([
                'message' => 'No account found with that email address.',
            ], 422);
        }

        // Get stored OTP
        $resetToken = DB::table('password_reset_tokens')
            ->where('email', $user->email)
            ->first();

        if (!$resetToken) {
            return response()->json([
                'message' => 'OTP has expired or does not exist. Please request a new one.',
            ], 422);
        }

        // Verify OTP
        if (!Hash::check($request->otp, $resetToken->token)) {
            return response()->json([
                'message' => 'Invalid OTP. Please try again.',
            ], 422);
        }

        // Check if OTP has expired (60 minutes)
        if (now()->diffInMinutes($resetToken->created_at) > 60) {
            DB::table('password_reset_tokens')->where('email', $user->email)->delete();
            return response()->json([
                'message' => 'OTP has expired. Please request a new one.',
            ], 422);
        }

        // Generate password reset token
        $newResetToken = Str::random(60);
        
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($newResetToken),
                'created_at' => now(),
            ]
        );

        Log::info('OTP verified successfully for: ' . $user->email);

        return response()->json([
            'message' => 'OTP verified successfully.',
            'reset_token' => $newResetToken,
            'email' => $user->email,
        ]);
    }

    /**
     * Delete user account
     */
    public function deleteAccount(Request $request)
    {
        try {
            $request->validate([
                'password' => 'required|string',
            ]);

            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'message' => 'User not found.',
                ], 401);
            }

            // Verify password
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'The provided password does not match your account password.',
                ], 422);
            }

            // Store user data before deletion (optional - for logging/backup)
            Log::info('User account deleted: ' . $user->email . ' (ID: ' . $user->id . ')');

            // Delete associated data
            $user->favorites()->delete();
            $user->ratings()->delete();
            $user->notes()->delete();

            // Delete the user account
            $user->delete();

            // Logout the user
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'message' => 'Account deleted successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Account deletion error: ' . $e->getMessage());
            return response()->json([
                'message' => 'An error occurred while deleting your account. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show password reset form
     */
    public function showResetPasswordForm(Request $request, string $token): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => $request->email,
        ]);
    }

    /**
     * Handle password reset
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found.',
            ], 422);
        }

        // Update user password
        $user->password = Hash::make($request->password);
        $user->save();

        // Clear any OTP tokens for this user
        DB::table('password_reset_tokens')->where('email', $user->email)->delete();

        Log::info('Password reset for user: ' . $user->email);

        return response()->json([
            'message' => 'Password has been reset successfully.',
        ]);
    }
}
