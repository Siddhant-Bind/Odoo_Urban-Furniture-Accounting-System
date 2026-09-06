import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, AtSign, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-600 font-medium">{msg}</p>;
}

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({ loginId: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (form.loginId.length < 6 || form.loginId.length > 12)
      errs.loginId = "Login ID must be 6–12 characters.";
    else if (!/^[a-zA-Z0-9]+$/.test(form.loginId))
      errs.loginId = "Letters and numbers only.";

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Enter a valid email address.";

    if (form.password.length <= 8)
      errs.password = "Password must be more than 8 characters.";
    else if (!/[a-z]/.test(form.password))
      errs.password = "Must contain at least one lowercase letter.";
    else if (!/[A-Z]/.test(form.password))
      errs.password = "Must contain at least one uppercase letter.";
    else if (!/[^a-zA-Z0-9]/.test(form.password))
      errs.password = "Must contain at least one special character.";

    if (form.confirm !== form.password)
      errs.confirm = "Passwords do not match.";

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGlobalError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    // Signup always creates an Accountant
    const result = register(form.loginId, form.email, form.password, form.loginId, "Accountant");
    setLoading(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      if (result.field) setErrors({ [result.field]: result.error });
      else setGlobalError(result.error);
    }
  };

  const inputClass = (field) =>
    `w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors duration-150 ${
      errors[field]
        ? "border-red-400 bg-red-50 focus:border-red-500"
        : "bg-[#EFF4FF]/60 hover:bg-[#EFF4FF]/90 focus:bg-white border-[#E2E8F0] focus:border-[#14B8A6]"
    }`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative overflow-x-hidden flex flex-col justify-between">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#CCFBF1]/45 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/3 -left-[10%] w-[500px] h-[500px] bg-[#99F6E4]/20 rounded-full blur-3xl"></div>
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
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-[#E2E8F0]/70 p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="px-5 py-2 rounded-lg bg-[#EFF4FF] border border-[#DBEAFE] text-[11px] font-semibold tracking-widest text-[#475569] uppercase select-none">
              URBANMART
            </div>
          </div>

          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight mb-2">Create your account</h1>
            <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed max-w-sm mx-auto">
              Sign up as an Accountant to manage invoices, bills, and payments
            </p>
          </div>

          {globalError && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">{globalError}</div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Login ID */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5" htmlFor="su-login-id">
                Login ID <span className="text-[#94A3B8] font-normal">(6–12 characters)</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
                  <AtSign className="w-4 h-4" />
                </span>
                <input id="su-login-id" type="text" placeholder="e.g. myuser01" value={form.loginId} onChange={set("loginId")}
                  className={inputClass("loginId")} maxLength={12} />
              </div>
              <FieldError msg={errors.loginId} />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5" htmlFor="su-email">Email ID</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input id="su-email" type="email" placeholder="you@company.com" value={form.email} onChange={set("email")}
                  className={inputClass("email")} />
              </div>
              <FieldError msg={errors.email} />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5" htmlFor="su-password">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
                  <Lock className="w-4 h-4" />
                </span>
                <input id="su-password" type={showPw ? "text" : "password"} placeholder="Create strong password" value={form.password} onChange={set("password")}
                  className={`${inputClass("password")} pr-10`} />
                <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#94A3B8] hover:text-[#64748B] cursor-pointer"
                  onClick={() => setShowPw((p) => !p)}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <FieldError msg={errors.password} />
              <p className="mt-1 text-[11px] text-[#94A3B8]">Min 9 chars, include uppercase, lowercase &amp; special character</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5" htmlFor="su-confirm">Re-enter Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
                  <Lock className="w-4 h-4" />
                </span>
                <input id="su-confirm" type={showCpw ? "text" : "password"} placeholder="Confirm your password" value={form.confirm} onChange={set("confirm")}
                  className={`${inputClass("confirm")} pr-10`} />
                <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#94A3B8] hover:text-[#64748B] cursor-pointer"
                  onClick={() => setShowCpw((p) => !p)}>
                  {showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <FieldError msg={errors.confirm} />
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading}
                className="w-full py-3 px-4 bg-[#14B8A6] hover:bg-[#0F766E] text-white font-semibold text-sm rounded-full shadow-[0_4px_14px_rgba(20,184,166,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60">
                <span>{loading ? "Creating account…" : "Sign Up as Accountant"}</span>
                {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[#64748B]">
            <Link to="/forgot-password" className="hover:text-[#0F172A] transition-colors">Forgot Password</Link>
            <span className="text-[#CBD5E1]">•</span>
            <Link to="/login" className="font-semibold text-[#14B8A6] hover:text-[#0F766E] transition-colors">Log In</Link>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFF4FF] border border-[#DBEAFE] rounded-full text-[11px] font-medium text-[#475569]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>SOC-2 Type II Certified • 256-bit Encryption</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between w-full max-w-[480px] px-2 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
            <span>Operational Systems Online</span>
          </div>
          <span className="font-mono text-[#94A3B8]">v4.18.2</span>
        </div>
      </main>

      <footer className="relative z-10 w-full px-8 py-5 text-center text-xs text-[#64748B] flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span>SOC-2 Certified</span>
        <span className="text-[#CBD5E1]">•</span>
        <span>256-bit TLS Encryption</span>
        <span className="text-[#CBD5E1]">•</span>
        <span>© 2026 UrbanMart Technologies Inc.</span>
      </footer>
    </div>
  );
}
