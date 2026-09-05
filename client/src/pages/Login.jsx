import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, AtSign, Check, Eye, Landmark, Lock, ShieldCheck } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen relative overflow-x-hidden flex flex-col justify-between selection:bg-secondary-container selection:text-on-secondary-container">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[48rem] h-[28rem] bg-secondary-fixed/40 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-surface-container-low rounded-full blur-2xl opacity-60"></div>
      </div>
      <header className="w-full pt-space-lg px-gutter-mobile md:px-gutter-desktop">
        <div className="max-w-container-max mx-auto flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-lg bg-surface-container-lowest shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] flex items-center justify-center">
              <Landmark className="text-primary text-[20px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                UrbanMart
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Enterprise Ledger
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md bg-surface-container-lowest/80 backdrop-blur-md px-space-md py-space-xs rounded-full shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]">
            <ShieldCheck className="text-primary text-[16px]" />
            <span>Security Portal</span>
          </div>
        </div>
      </header>
      <main className="w-full flex-1 flex items-center justify-center px-gutter-mobile md:px-gutter-desktop py-space-xl">
        <div className="flex flex-col w-full items-center justify-center relative">
          <div className="w-full max-w-[460px] relative">
            <div className="absolute -top-10 -left-12 w-36 h-36 bg-secondary-fixed/50 rounded-full blur-2xl pointer-events-none -z-10"></div>
            <div className="absolute -bottom-8 -right-10 w-40 h-40 bg-primary-fixed/40 rounded-full blur-2xl pointer-events-none -z-10"></div>
            <div className="bg-surface-container-lowest rounded-xl p-10 md:p-12 shadow-xl shadow-surface-variant/30 flex flex-col items-center text-center">
              <div className="w-32 h-9 rounded-lg bg-surface-container-low flex items-center justify-center mb-space-lg shadow-sm">
                <span className="font-label-md text-label-md tracking-widest text-on-surface-variant uppercase font-semibold">
                  URBANMART
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-xl max-w-[340px] leading-relaxed">
                Sign in to access your business operations &amp; accounting
                ledgers
              </p>
              <form
                className="w-full text-left space-y-space-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("/dashboard");
                }}
              >
                <div>
                  <label
                    className="block font-label-md text-label-md text-on-surface mb-space-xs"
                    htmlFor="login-id"
                  >
                    Login ID
                  </label>
                  <div className="relative flex items-center rounded-xl bg-surface-container-lowest shadow-sm transition-all focus-within:shadow-[0_0_0_3px_rgba(20,184,166,0.18)] focus-within:bg-surface-container-lowest">
                    <AtSign className="text-outline absolute left-space-md pointer-events-none text-[20px]" />
                    <input
                      className="w-full h-11 pl-11 pr-space-md bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none transition-colors"
                      id="login-id"
                      placeholder="e.g. alex.morgan@company.com or merchant ID"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative flex items-center rounded-xl bg-surface-container-lowest shadow-sm transition-all focus-within:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]">
                    <Lock className="text-outline absolute left-space-md pointer-events-none text-[20px]" />
                    <input
                      className="w-full h-11 pl-11 pr-11 bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none transition-colors"
                      id="password"
                      placeholder="••••••••••••"
                      type="password"
                    />
                    <button
                      aria-label="Toggle password visibility"
                      className="absolute right-space-md text-outline hover:text-primary transition-colors flex items-center justify-center p-1 rounded-full focus:outline-none"
                      id="toggle-password"
                      type="button"
                    >
                      <Eye className="text-[20px]" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <label className="flex items-center gap-space-sm cursor-pointer select-none group">
                    <input
                      className="sr-only peer"
                      id="remember-me"
                      type="checkbox"
                    />
                    <div className="w-[18px] h-[18px] rounded bg-surface-container flex items-center justify-center peer-checked:bg-primary transition-colors">
                      <Check className="text-on-primary text-[14px] opacity-0 peer-checked:opacity-100 font-bold transition-opacity" />
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      Remember this device for 30 days
                    </span>
                  </label>
                </div>
                <div className="pt-space-sm">
                  <button
                    className="w-full h-11 rounded-full bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-body-md font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-space-xs active:scale-[0.99] focus:outline-none focus:shadow-[0_0_0_3px_rgba(20,184,166,0.3)]"
                    type="submit"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="text-[18px]" />
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center gap-space-sm mt-space-lg font-body-sm text-body-sm">
                <Link
                  className="text-on-surface-variant hover:text-primary transition-colors"
                  to="#"
                >
                  Forgot Password
                </Link>
                <span className="text-outline-variant font-light">|</span>
                <Link
                  className="text-primary font-semibold hover:text-on-primary-container transition-colors"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
              <div className="mt-space-xl flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface-variant">
                <ShieldCheck className="text-primary text-[15px]" />
                <span className="font-label-sm text-label-sm tracking-wide">
                  SOC-2 Type II Certified • 256-bit Encryption
                </span>
              </div>
            </div>
            <div className="mt-space-md flex items-center justify-between px-space-xs text-on-surface-variant font-label-sm text-label-sm">
              <span className="flex items-center gap-space-2xs text-tertiary">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse inline-block"></span>
                Operational Systems Online
              </span>
              <span className="opacity-70 font-numeric-md text-label-sm">
                v4.18.2
              </span>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full pb-space-lg pt-space-md px-gutter-mobile md:px-gutter-desktop">
        <div className="max-w-container-max mx-auto flex flex-col sm:flex-row items-center justify-center gap-space-xs sm:gap-space-sm text-center text-on-surface-variant font-body-sm text-body-sm">
          <span className="flex items-center gap-space-2xs">
            <Lock className="text-[14px] text-primary" />
            SOC-2 Certified
          </span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span>256-bit TLS Encryption</span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span>© 2025 UrbanMart Technologies Inc.</span>
        </div>
      </footer>
    </div>
  );
}
