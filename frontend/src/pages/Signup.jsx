import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setErrorMsg("Please agree to the Terms and Conditions & Privacy Policy.");
      return;
    }

    // Simulate signup

    try {
  const res = await axios.post(
    "http://localhost:2000/api/auth/register",
    {
      name,
      email,
      password,
    }
  );

  console.log(res.data);

  navigate("/login");

} catch (error) {
  setErrorMsg(
    error.response?.data?.message ||
    "Registration failed"
  );
}
    // const success = signup(name, email, password);

    // // if (success) {
    // //   navigate('/profile');
    // // }
    
    // // else {
    // //   setErrorMsg("Registration failed. Please try again.");
    // // }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12 antialiased text-left">
      <div className="w-full max-w-[440px] bg-surface-container-lowest rounded-xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.08)] overflow-hidden border border-outline-variant/30">
        <div className="p-xl md:p-2xl flex flex-col gap-lg">
          
          {/* Header */}
          <div className="text-center space-y-sm">
            <span className="text-headline-md font-headline-md text-primary font-bold">Velora</span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Create Account</h2>
            <p className="text-body-md font-body-md text-on-surface-variant">Join us to start shopping seamlessly.</p>
          </div>

          {errorMsg && (
            <div className="bg-error-container text-on-error-container p-sm rounded-lg text-body-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            {/* Full Name */}
            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-body-sm font-bold text-on-surface" htmlFor="fullName">
                Full Name
              </label>
              <input 
                type="text" 
                id="fullName" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Doe" 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-[10px] text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-0 transition-all focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-body-sm font-bold text-on-surface" htmlFor="email">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-[10px] text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-0 transition-all focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-body-sm font-bold text-on-surface" htmlFor="password">
                Password
              </label>
              <input 
                type="password" 
                id="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-[10px] text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-0 transition-all focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-body-sm font-bold text-on-surface" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input 
                type="password" 
                id="confirmPassword" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-[10px] text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-0 transition-all focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-sm pt-sm">
              <div className="flex items-center h-5">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-lowest cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <label className="text-body-sm font-body-sm text-on-surface-variant cursor-pointer select-none" htmlFor="terms">
                  I agree to the <a href="#" className="text-primary hover:text-surface-tint underline decoration-primary/30 underline-offset-2 transition-colors">Terms and Conditions</a> and <a href="#" className="text-primary hover:text-surface-tint underline decoration-primary/30 underline-offset-2 transition-colors">Privacy Policy</a>.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-primary text-on-primary text-label-md font-label-md py-md rounded-xl mt-sm hover:bg-surface-tint transition-colors shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex items-center justify-center gap-sm active:scale-[0.98] duration-100"
            >
              Create Account
              <span className="material-symbols-outlined block" style={{ fontVariationSettings: "'FILL' 0" }}>
                arrow_forward
              </span>
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-sm">
            <p className="text-body-md font-body-md text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:text-surface-tint transition-colors ml-1">
                Log in
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </main>
  );
};
export default Signup;
