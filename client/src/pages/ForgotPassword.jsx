import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AtSign, Eye, EyeOff, Lock, Mail, ShieldCheck, Shield, Briefcase } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-600 font-medium">{msg}</p>;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Enter a valid email address.");
      return;
    }
    // BACKEND SWAP: POST /api/auth/forgot-password { email }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative overflow-x-hidden flex flex-col justify-between">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#CCFBF1]/45 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-10 -right-[10%] w-[600px] h-[600px] bg-[#14B8A6]/10 rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-10 w-full px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#14B8A6] shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 10v11m4-11v11m6-11v11m4-11v11M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4M2 10h20" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-[17px] tracking-tight text-[#0F172A]">UrbanMart</span>
            <span className="block text-[10px] font-semibold tracking-wider text-[#64748B] uppercase">Enterprise Ledger</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] bg-white/80 backdrop-blur-sm border border-[#E2E8F0] px-3.5 py-1.5 rounded-full shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
          <span>Security Portal</span>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-[#E2E8F0]/70 p-8 sm:p-10">
          <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#14B8A6] transition-colors mb-6 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>

          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#CCFBF1] flex items-center justify-center">
              <Lock className="w-7 h-7 text-[#14B8A6]" />
            </div>
          </div>

          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-2">Forgot Password?</h1>
            {!submitted ? (
              <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                Enter your registered email address. We'll send you instructions to reset your password.
              </p>
            ) : (
              <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                If that email is in our system, you'll receive a password reset link shortly.
              </p>
            )}
          </div>

          {!submitted ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5" htmlFor="fp-email">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input id="fp-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors ${error ? "border-red-400 bg-red-50" : "bg-[#EFF4FF]/60 border-[#E2E8F0] focus:border-[#14B8A6] focus:bg-white"}`} />
                </div>
                {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
              </div>
              <button type="submit"
                className="w-full py-3 px-4 bg-[#14B8A6] hover:bg-[#0F766E] text-white font-semibold text-sm rounded-full shadow-[0_4px_14px_rgba(20,184,166,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer">
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-sm text-[#0F172A] font-semibold text-center">Check your inbox</p>
              <Link to="/login" className="text-sm text-[#14B8A6] font-semibold hover:underline">Return to Login</Link>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[#64748B]">
            <Link to="/login" className="hover:text-[#0F172A] transition-colors">Sign In</Link>
            <span className="text-[#CBD5E1]">•</span>
            <Link to="/signup" className="font-semibold text-[#14B8A6] hover:text-[#0F766E] transition-colors">Sign Up</Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full px-8 py-5 text-center text-xs text-[#64748B] flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span>© 2026 UrbanMart Technologies Inc.</span>
      </footer>
    </div>
  );
}
