import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Briefcase, CheckCircle, ChevronDown, Eye, EyeOff, IdCard, Lock, Mail, Plus, Shield, ShieldCheck, User, Wallet } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1 font-body-sm text-body-sm text-red-600 font-medium">{msg}</p>;
}

function PwRule({ met, label }) {
  return (
    <div className={`inline-flex items-center gap-1 px-space-sm py-space-2xs rounded-full font-label-sm text-label-sm transition-all ${met ? "bg-emerald-100 text-emerald-700" : "bg-surface-container-low text-on-surface-variant"}`}>
      {met ? <CheckCircle className="text-[13px] w-3 h-3" /> : <span className="w-3 h-3 rounded-full border border-current inline-block" />}
      <span>{label}</span>
    </div>
  );
}

export default function CreateUser() {
  const navigate = useNavigate();
  const { user, register, logout } = useAuth();

  const userRole = user?.role ?? "Admin";

  const [form, setForm] = useState({ name: "", loginId: "", email: "", role: "Accountant", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [success, setSuccess] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const pw = form.password;
  const pwRules = {
    len: pw.length > 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    special: /[^a-zA-Z0-9]/.test(pw),
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (form.loginId.length < 6 || form.loginId.length > 12) errs.loginId = "Login ID must be 6–12 characters.";
    else if (!/^[a-zA-Z0-9]+$/.test(form.loginId)) errs.loginId = "Letters and numbers only.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Enter a valid email address.";
    if (!pwRules.len) errs.password = "Password must be more than 8 characters.";
    else if (!pwRules.lower) errs.password = "Must contain a lowercase letter.";
    else if (!pwRules.upper) errs.password = "Must contain an uppercase letter.";
    else if (!pwRules.special) errs.password = "Must contain a special character.";
    if (form.confirm !== form.password) errs.confirm = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGlobalError("");
    setSuccess("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const result = register(form.loginId, form.email, form.password, form.name, form.role);
    if (result.success) {
      setSuccess(`User "${form.name}" (${form.role}) created successfully!`);
      setForm({ name: "", loginId: "", email: "", role: "Accountant", password: "", confirm: "" });
    } else {
      if (result.field) setErrors({ [result.field]: result.error });
      else setGlobalError(result.error);
    }
  };

  const inputBase = "w-full h-10 pl-11 pr-space-md rounded-lg text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-on-surface-variant/60";
  const inputNormal = `${inputBase} bg-surface-container-lowest focus:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]`;
  const inputError = `${inputBase} bg-red-50 border border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.18)]`;
  const inp = (field) => (errors[field] ? inputError : inputNormal);

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-xl">
            <div className="h-9 px-space-base bg-surface-container-low rounded-lg flex items-center justify-center">
              <span className="font-label-md text-label-md tracking-wider text-on-surface font-bold uppercase">URBANMART</span>
            </div>
            <nav className="hidden md:flex items-center gap-space-lg h-16">
              <Link className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" to="/sales-orders">Sales</Link>
              <Link className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" to="/purchase-orders">Purchase</Link>
              <Link className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" to="/chart-of-accounts">Account</Link>
              <Link className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors" to="/profit-and-loss">Report</Link>
            </nav>
          </div>
          <div className="flex items-center gap-space-base">
            <div className="flex items-center gap-space-xs">
              <span className="hidden sm:inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                {userRole === "Admin" ? <Shield className="text-[14px] w-3.5 h-3.5" /> : <Briefcase className="text-[14px] w-3.5 h-3.5" />}
                {userRole}
              </span>
              {userRole === "Admin" && (
                <button className="inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-primary text-on-primary font-body-md text-body-md font-semibold hover:bg-primary/90 transition-colors shadow-sm cursor-pointer" type="button" onClick={() => navigate("/create-user")}>
                  <Plus className="text-[18px]" />
                  <span>Create User</span>
                </button>
              )}
            </div>
            <div className="h-8 w-[1px] bg-surface-container hidden sm:block"></div>
            {/* Profile dropdown */}
            <div className="relative">
              <button className="flex items-center gap-space-sm p-space-xs rounded-full hover:bg-surface-container-low transition-colors text-left cursor-pointer" type="button" onClick={() => setProfileOpen((o) => !o)}>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="text-on-primary text-[18px]" />
                </div>
                <div className="hidden xl:flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">{user?.name ?? "USER"}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{userRole}</span>
                </div>
                <ChevronDown className="text-on-surface-variant text-[20px]" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-surface-container rounded-xl shadow-lg z-50 overflow-hidden py-1">
                  <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low transition-colors">
                    <User className="w-4 h-4 text-on-surface-variant" />
                    <span>Profile</span>
                  </Link>
                  <div className="h-px bg-surface-container my-1"></div>
                  <button onClick={() => { logout(); navigate("/login"); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-container/30 transition-colors cursor-pointer">
                    <Lock className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-16 bg-background max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col w-full relative py-space-xl items-center justify-center min-w-0">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[42rem] h-[24rem] bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
          {/* Breadcrumb */}
          <div className="w-full max-w-2xl mb-space-base flex items-center justify-between">
            <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-space-xs text-secondary hover:text-on-secondary-fixed-variant transition-colors font-body-md text-body-md font-semibold group cursor-pointer">
              <ArrowLeft className="text-[18px] transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="hidden sm:flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
              <ShieldCheck className="text-[15px] text-primary" />
              <span>Identity &amp; Access Management</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-xl shadow-on-surface/5 p-space-xl sm:p-space-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-fixed via-primary-container to-secondary"></div>

            {/* Card Header */}
            <div className="flex flex-col gap-space-sm mb-space-xl pb-space-lg bg-surface-container-low/40 -mx-space-xl -mt-space-xl p-space-xl sm:-mx-space-2xl sm:-mt-space-2xl sm:p-space-2xl">
              <div className="flex items-center justify-between">
                <div className="h-8 px-space-md bg-surface-container rounded-lg flex items-center justify-center">
                  <span className="font-label-md text-label-md tracking-wider text-on-surface font-bold uppercase">URBANMART</span>
                </div>
                <span className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  <ShieldCheck className="text-[14px] w-3.5 h-3.5" />
                  Admin Only
                </span>
              </div>
              <div className="mt-space-xs">
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Create New User Account</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">Provision credentials and role access for a new team member.</p>
              </div>
            </div>

            {/* Success / Error banners */}
            {success && (
              <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm">
                <CheckCircle className="w-5 h-5 shrink-0" />
                {success}
              </div>
            )}
            {globalError && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm">{globalError}</div>
            )}

            <form className="flex flex-col gap-space-lg" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="fullName">
                  Full Name <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input className={inp("name")} id="fullName" placeholder="e.g. Jane Doe" value={form.name} onChange={set("name")} type="text" />
                </div>
                <FieldError msg={errors.name} />
              </div>

              {/* Login ID */}
              <div className="flex flex-col gap-space-2xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="loginId">
                  Login ID <span className="text-error">*</span>
                  <span className="ml-2 text-on-surface-variant font-normal text-xs">(6–12 alphanumeric chars)</span>
                </label>
                <div className="relative flex items-center">
                  <IdCard className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input className={inp("loginId")} id="loginId" maxLength={12} placeholder="e.g. jdoe01" value={form.loginId} onChange={set("loginId")} type="text" />
                </div>
                <FieldError msg={errors.loginId} />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-space-2xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="emailId">
                  Email ID <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input className={inp("email")} id="emailId" placeholder="name@urbanmart.enterprise" value={form.email} onChange={set("email")} type="email" />
                </div>
                <FieldError msg={errors.email} />
              </div>

              {/* Role selector */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface font-semibold">Role &amp; Access Level <span className="text-error">*</span></span>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setForm((f) => ({ ...f, role: "Accountant" }))}
                    className={`flex-1 flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all text-left ${form.role === "Accountant" ? "border-primary bg-primary/5" : "border-surface-container-high bg-surface-container-low hover:bg-surface-container"}`}>
                    <Wallet className="w-5 h-5 mb-2 text-secondary" />
                    <span className="font-semibold text-on-surface text-sm">Accountant</span>
                    <span className="text-xs text-on-surface-variant mt-1 leading-snug">Ledger, invoices, bills &amp; payments. No user management.</span>
                  </button>
                  <button type="button" onClick={() => setForm((f) => ({ ...f, role: "Admin" }))}
                    className={`flex-1 flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all text-left ${form.role === "Admin" ? "border-primary bg-primary/5" : "border-surface-container-high bg-surface-container-low hover:bg-surface-container"}`}>
                    <Shield className="w-5 h-5 mb-2 text-primary" />
                    <span className="font-semibold text-on-surface text-sm">Admin</span>
                    <span className="text-xs text-on-surface-variant mt-1 leading-snug">Full system access including user creation and settings.</span>
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-space-2xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                  Password <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input className={`${inp("password")} pr-11`} id="password" placeholder="••••••••••••" value={form.password} onChange={set("password")} type={showPw ? "text" : "password"} />
                  <button className="absolute right-space-sm p-space-xs text-on-surface-variant hover:text-on-surface rounded-full transition-colors cursor-pointer" onClick={() => setShowPw((p) => !p)} type="button">
                    {showPw ? <EyeOff className="text-[20px]" /> : <Eye className="text-[20px]" />}
                  </button>
                </div>
                <FieldError msg={errors.password} />
                <div className="flex flex-wrap gap-space-xs mt-space-xs">
                  <PwRule met={pwRules.len} label="9+ chars" />
                  <PwRule met={pwRules.upper} label="Uppercase" />
                  <PwRule met={pwRules.lower} label="Lowercase" />
                  <PwRule met={pwRules.special} label="Special char" />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-space-2xs">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="confirmPassword">
                  Re-Enter Password <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <ShieldCheck className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input className={`${inp("confirm")} pr-11`} id="confirmPassword" placeholder="••••••••••••" value={form.confirm} onChange={set("confirm")} type={showCpw ? "text" : "password"} />
                  <button className="absolute right-space-sm p-space-xs text-on-surface-variant hover:text-on-surface rounded-full transition-colors cursor-pointer" onClick={() => setShowCpw((p) => !p)} type="button">
                    {showCpw ? <EyeOff className="text-[20px]" /> : <Eye className="text-[20px]" />}
                  </button>
                </div>
                <FieldError msg={errors.confirm} />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-space-base mt-space-md pt-space-lg border-t border-surface-container">
                <button className="w-full sm:w-auto px-space-xl py-space-sm rounded-full font-body-md text-body-md font-semibold text-on-surface-variant bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer" onClick={() => navigate("/dashboard")} type="button">
                  Cancel
                </button>
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-2xl py-space-sm rounded-full bg-primary text-on-primary font-body-md text-body-md font-semibold hover:bg-primary/90 transition-all shadow-md cursor-pointer" type="submit">
                  <CheckCircle className="text-[20px]" />
                  <span>Create User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low/60 py-space-lg mt-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col sm:flex-row items-center justify-between gap-space-base text-on-surface-variant font-body-sm text-body-sm">
          <span>© 2025 UrbanMart Enterprise Operations. All rights reserved.</span>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">Encrypted Ledger Active</span>
        </div>
      </footer>
    </div>
  );
}
