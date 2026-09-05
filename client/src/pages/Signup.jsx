import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative overflow-x-hidden flex flex-col justify-between">
      {/*  Subtle ambient turquoise background glows matching Login page  */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#CCFBF1]/45 to-transparent rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/3 -left-[10%] w-[500px] h-[500px] bg-[#99F6E4]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-[10%] w-[600px] h-[600px] bg-[#14B8A6]/10 rounded-full blur-3xl"></div>
      </div>

      {/*  Top bar header identical to Login page  */}
      <header className="relative z-10 w-full px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#14B8A6] shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h18M3 10h18M5 10v11m4-11v11m6-11v11m4-11v11M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4M2 10h20"
              />
            </svg>
          </div>
          <div>
            <span className="font-bold text-[17px] tracking-tight text-[#0F172A]">
              UrbanMart
            </span>
            <span className="block text-[10px] font-semibold tracking-wider text-[#64748B] uppercase">
              Enterprise Ledger
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] bg-white/80 backdrop-blur-sm border border-[#E2E8F0] px-3.5 py-1.5 rounded-full shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[#14B8A6]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Security Portal</span>
        </div>
      </header>

      {/*  Centered Card Container  */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-[#E2E8F0]/70 p-8 sm:p-10 transition-all">
          {/*  Empty Logo Placeholder matching Login page  */}
          <div className="flex justify-center mb-6">
            <div className="px-5 py-2 rounded-lg bg-[#EFF4FF] border border-[#DBEAFE] text-[11px] font-semibold tracking-widest text-[#475569] uppercase select-none">
              URBANMART
            </div>
          </div>

          {/*  Heading & Supporting Subtext  */}
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed max-w-sm mx-auto">
              Start streamlining your business operations &amp; multi-store
              accounting
            </p>
          </div>

          {/*  Form Elements in exact requested order  */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            {/*  1. Login Id  */}
            <div>
              <label
                className="block text-xs font-semibold text-[#0F172A] mb-1.5"
                htmlFor="login-id"
              >
                Login ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
                <input
                  id="login-id"
                  type="text"
                  placeholder="e.g. alex.morgan or merchant ID"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#EFF4FF]/60 hover:bg-[#EFF4FF]/90 focus:bg-white border border-[#E2E8F0] focus:border-[#14B8A6] rounded-xl text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors duration-150"
                />
              </div>
            </div>

            {/*  2. Email Id  */}
            <div>
              <label
                className="block text-xs font-semibold text-[#0F172A] mb-1.5"
                htmlFor="email-id"
              >
                Email ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  id="email-id"
                  type="email"
                  placeholder="alex.morgan@company.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#EFF4FF]/60 hover:bg-[#EFF4FF]/90 focus:bg-white border border-[#E2E8F0] focus:border-[#14B8A6] rounded-xl text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors duration-150"
                />
              </div>
            </div>

            {/*  3. Password (masked)  */}
            <div>
              <label
                className="block text-xs font-semibold text-[#0F172A] mb-1.5"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  id="password"
                  type="password"
                  value="supersecretpassword"
                  placeholder="Create strong password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-[#EFF4FF]/60 hover:bg-[#EFF4FF]/90 focus:bg-white border border-[#E2E8F0] focus:border-[#14B8A6] rounded-xl text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors duration-150 tracking-wider"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#94A3B8] hover:text-[#64748B]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/*  4. Re-enter Password (masked)  */}
            <div>
              <label
                className="block text-xs font-semibold text-[#0F172A] mb-1.5"
                htmlFor="confirm-password"
              >
                Re-enter Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#94A3B8]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </span>
                <input
                  id="confirm-password"
                  type="password"
                  value="supersecretpassword"
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-[#EFF4FF]/60 hover:bg-[#EFF4FF]/90 focus:bg-white border border-[#E2E8F0] focus:border-[#14B8A6] rounded-xl text-[#0F172A] placeholder-[#94A3B8] outline-none transition-colors duration-150 tracking-wider"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#94A3B8] hover:text-[#64748B]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/*  Full-width solid turquoise "Sign Up" button  */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#14B8A6] hover:bg-[#0F766E] text-white font-semibold text-sm rounded-full shadow-[0_4px_14px_rgba(20,184,166,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Sign Up</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/*  Small text row underneath with "Forgot Password" and "Sign Up" links separated by divider (identical to login page format)  */}
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[#64748B]">
            <a href="#" className="hover:text-[#0F172A] transition-colors">
              Forgot Password
            </a>
            <span className="text-[#CBD5E1]">•</span>
            <Link
              to="/login"
              className="font-semibold text-[#14B8A6] hover:text-[#0F766E] transition-colors"
            >
              Log In
            </Link>
          </div>

          {/*  SOC-2 Compliance Badge matching Login screen  */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFF4FF] border border-[#DBEAFE] rounded-full text-[11px] font-medium text-[#475569]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-[#14B8A6]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>SOC-2 Type II Certified • 256-bit Encryption</span>
            </div>
          </div>
        </div>

        {/*  Status indicator beneath card matching Login page  */}
        <div className="mt-6 flex items-center justify-between w-full max-w-[480px] px-2 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
            <span>Operational Systems Online</span>
          </div>
          <span className="font-mono text-[#94A3B8]">v4.18.2</span>
        </div>
      </main>

      {/*  Desktop footer matching Login and Landing screens  */}
      <footer className="relative z-10 w-full px-8 py-5 text-center text-xs text-[#64748B] flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <div className="flex items-center gap-1 text-[#475569]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 text-[#14B8A6]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>SOC-2 Certified</span>
        </div>
        <span className="text-[#CBD5E1]">•</span>
        <span>256-bit TLS Encryption</span>
        <span className="text-[#CBD5E1]">•</span>
        <span>© 2025 UrbanMart Technologies Inc.</span>
      </footer>
    </div>
  );
}
