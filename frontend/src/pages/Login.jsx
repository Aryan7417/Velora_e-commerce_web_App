import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    // Simulate login
    const success = login(email, password);
    if (success) {
      navigate('/profile');
    } else {
      setErrorMsg("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12 font-body-md text-on-surface text-left">
      <div className="p-xl md:p-2xl flex flex-col gap-lg">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="text-display-lg font-display-lg text-primary hover:text-primary-container transition-colors">
            Velora
          </Link>
          <p className="text-body-md font-body-md text-on-surface-variant mt-2">
            Welcome back. Please enter your details.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient-1 p-8 border border-outline-variant/30 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>

          {errorMsg && (
            <div className="mb-md bg-error-container text-on-error-container p-sm rounded-lg text-body-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* Email Field */}
            <div className="flex flex-col gap-xs">
              <label className="block text-body-sm font-label-md font-bold text-on-surface mb-xs" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px] block">mail</span>
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full pl-10 pr-3 py-2 border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-xs">
              <label className="block text-body-sm font-label-md font-bold text-on-surface mb-xs" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-[20px] block">lock</span>
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2 border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between mt-sm text-body-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded bg-surface-container-lowest cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-on-surface-variant cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="font-label-md text-primary hover:text-primary-fixed-dim transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-sm">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-label-md font-label-md text-on-primary bg-primary hover:bg-surface-tint focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 cursor-pointer active:scale-[0.98]"
              >
                Sign in
              </button>
            </div>

            {/* Social Login Divider */}
            <div className="relative mt-lg mb-md">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-body-sm font-body-sm">
                <span className="px-2 bg-surface-container-lowest text-on-surface-variant">Or continue with</span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-sm">
              <button
                type="button"
                onClick={() => alert("Simulated Google Sign-In")}
                className="w-full inline-flex justify-center py-2 px-4 border border-outline-variant rounded-lg shadow-sm bg-surface-container-lowest text-label-md font-label-md text-on-surface hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => alert("Simulated Facebook Sign-In")}
                className="w-full inline-flex justify-center py-2 px-4 border border-outline-variant rounded-lg shadow-sm bg-surface-container-lowest text-label-md font-label-md text-on-surface hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z"></path>
                </svg>
                Facebook
              </button>
            </div>
          </form>
        </div>

        {/* Sign Up Link */}
        <p className="mt-lg text-center text-body-sm font-body-sm text-on-surface-variant">
          Don't have an account?{' '}
          <Link to="/signup" className="font-label-md text-primary hover:text-primary-fixed-dim transition-colors duration-200">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
