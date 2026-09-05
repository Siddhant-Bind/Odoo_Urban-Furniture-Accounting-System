import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, ChevronDown, IdCard, Lock, Mail, Plus, User, Wallet } from "lucide-react";


export default function CreateUser() {
  const navigate = useNavigate();
  // TODO: Add role context here later. For now, mocking as Admin.
  const userRole = "Admin";

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen relative overflow-x-hidden flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-xl">
            <div className="h-9 px-space-base bg-surface-container-low rounded-lg flex items-center justify-center">
              <span className="font-label-md text-label-md tracking-wider text-on-surface font-bold uppercase">
                URBANMART
              </span>
            </div>
            <nav
              className="hidden md:flex items-center gap-space-lg h-16"
              data-active-classes="text-on-surface font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-container"
            >
              <Link
                aria-current="page"
                className="h-16 inline-flex items-center transition-colors text-on-surface font-semibold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-container"
                data-path="sales"
                to="#"
              >
                Sales
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="purchase"
                to="#"
              >
                Purchase
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="account"
                to="#"
              >
                Account
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="report"
                to="#"
              >
                Report
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-space-base">
            <div className="flex items-center gap-space-xs">
              <span className="hidden sm:inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                <Lock className="text-[14px]" />
                Admin
              </span>
              <button
                className="inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-primary-container text-on-primary font-body-md text-body-md font-semibold hover:bg-primary transition-colors"
                type="button"
              >
                <Plus className="text-[18px]" />
                <span className="">Create User</span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-surface-container hidden sm:block"></div>
            <button
              className="flex items-center gap-space-sm p-space-xs rounded-full hover:bg-surface-container-low transition-colors text-left"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="text-on-primary text-[18px]" />
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Alex Morgan
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Admin
                </span>
              </div>
              <ChevronDown className="text-on-surface-variant text-[20px]" />
            </button>
          </div>
        </div>
      </header>
      <main className="w-full pt-16 bg-background max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col w-full relative py-space-xl items-center justify-center min-w-0">
          {/*  Ambient background glow elements contained within page bounds  */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[42rem] h-[24rem] bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute top-64 right-1/4 w-[28rem] h-[18rem] bg-surface-container-high/30 rounded-full blur-2xl pointer-events-none -z-10"></div>
          {/*  Breadcrumb and Context Nav Bar  */}
          <div className="w-full max-w-2xl mb-space-base flex items-center justify-between">
            <Link
              className="inline-flex items-center gap-space-xs text-secondary hover:text-on-secondary-fixed-variant transition-colors font-body-md text-body-md font-semibold group"
              to="#"
            >
              <ArrowLeft className="text-[18px] transition-transform group-hover:-translate-x-0.5" />
              <span className="">Back to App Dashboard</span>
            </Link>
            <div className="hidden sm:flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
              <ShieldCheck className="text-[15px] text-primary" />
              <span className="">Identity &amp; Access Directory (IAM)</span>
            </div>
          </div>
          {/*  Primary Centered Elevated Form Card  */}
          <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-xl shadow-on-surface/5 p-space-xl sm:p-space-2xl relative overflow-hidden">
            {/*  Top Decorative Line Stripe  */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-fixed via-primary-container to-secondary"></div>
            {/*  Card Header Section  */}
            <div className="flex flex-col gap-space-sm mb-space-xl pb-space-lg bg-surface-container-low/40 -mx-space-xl -mt-space-xl p-space-xl sm:-mx-space-2xl sm:-mt-space-2xl sm:p-space-2xl">
              <div className="flex items-center justify-between">
                {/*  Logo Badge  */}
                <div className="h-8 px-space-md bg-surface-container rounded-lg flex items-center justify-center">
                  <span className="font-label-md text-label-md tracking-wider text-on-surface font-bold uppercase">
                    URBANMART
                  </span>
                </div>
                {/*  Security Clearance Pill  */}
                <span className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  <UserRoundCheck className="text-[14px]" />
                  Security Clearance: Admin
                </span>
              </div>
              <div className="mt-space-xs">
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Create New User Account
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">
                  Provision enterprise credentials, cryptographic privileges,
                  and operational scopes.
                </p>
              </div>
            </div>
            {/*  Interactive Creation Form  */}
            <form
              className="flex flex-col gap-space-lg"
              id="createUserForm"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
            >
              {/*  Field 1: Name  */}
              <div className="flex flex-col gap-space-xs">
                <label
                  className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                  htmlFor="fullName"
                >
                  <span className="">
                    Full Legal Name <span className="text-error">*</span>
                  </span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm">
                    Directory Record
                  </span>
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input
                    className="w-full h-10 pl-11 pr-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]"
                    id="fullName"
                    name="fullName"
                    placeholder="Full legal name (e.g. Jane Doe)"
                    required=""
                    style={{}}
                    type="text"
                  />
                </div>
              </div>
              {/*  Field 2: Login Id  */}
              <div className="flex flex-col gap-space-2xs">
                <label
                  className="font-label-md text-label-md text-on-surface font-semibold"
                  htmlFor="loginId"
                >
                  Login ID <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <IdCard className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input
                    className="w-full h-10 pl-11 pr-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-on-surface-variant/60 focus:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]"
                    id="loginId"
                    maxLength="12"
                    minLength="6"
                    name="loginId"
                    pattern="^[a-zA-Z0-9_]{6,12}$"
                    placeholder="e.g. jdoe_ops"
                    required=""
                    style={{}}
                    type="text"
                  />
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-2xs mt-space-2xs">
                  <Info className="text-[14px] text-primary" />
                  Must be unique and 6–12 alphanumeric characters.
                </p>
              </div>
              {/*  Field 3: E-mail Id  */}
              <div className="flex flex-col gap-space-2xs">
                <label
                  className="font-label-md text-label-md text-on-surface font-semibold"
                  htmlFor="emailId"
                >
                  E-mail ID <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input
                    className="w-full h-10 pl-11 pr-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-on-surface-variant/60 focus:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]"
                    id="emailId"
                    name="emailId"
                    placeholder="name@urbanmart.enterprise"
                    required=""
                    style={{}}
                    type="email"
                  />
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-2xs mt-space-2xs">
                  <MailCheck className="text-[14px] text-primary" />
                  Must not be a duplicate enterprise email address.
                </p>
              </div>
              {/*  Field 4: Role & Access Level Selector (Segmented Cards)  */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Role &amp; Access Level <span className="text-error">*</span>
                </span>
                <div
                  className="grid grid-cols-1 gap-space-sm"
                  id="roleSelectorGroup"
                  style={{}}
                >
                  {/*  Role: Standard User  */}

                  {/*  Role: Accountant (Pre-selected)  */}
                  <label
                    className="role-option relative flex flex-col p-space-md rounded-xl cursor-pointer transition-all bg-secondary-container/40 select-none"
                    data-role="accountant"
                    style={{}}
                  >
                    <input
                      checked=""
                      className="sr-only"
                      name="userRole"
                      type="radio"
                      value="accountant"
                    />
                    <div className="flex items-center justify-between mb-space-xs">
                      <Wallet className="text-secondary text-[22px]" />
                      <span className="radio-indicator w-4 h-4 rounded-full bg-primary-container flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                      </span>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Accountant
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs leading-snug">
                      General ledger, fiscal entries, invoices &amp; tax.
                    </span>
                  </label>
                  {/*  Role: Administrator  */}
                  <label
                    className="role-option relative flex flex-col p-space-md rounded-xl cursor-pointer transition-all bg-surface-container-low hover:bg-surface-container-high/60 select-none"
                    data-role="admin"
                  >
                    <input
                      className="sr-only"
                      name="userRole"
                      type="radio"
                      value="admin"
                    />
                    <div className="flex items-center justify-between mb-space-xs">
                      <UserCog className="text-primary text-[22px]" />
                      <span className="radio-indicator w-4 h-4 rounded-full bg-surface-container flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-transparent"></span>
                      </span>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Administrator
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs leading-snug">
                      Full system hierarchy and user governance.
                    </span>
                  </label>
                </div>
              </div>
              {/*  Field 5: Password  */}
              <div className="flex flex-col gap-space-2xs">
                <label
                  className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                  htmlFor="password"
                >
                  <span className="">
                    Password <span className="text-error">*</span>
                  </span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm">
                    Entropy check enabled
                  </span>
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input
                    className="w-full h-10 pl-11 pr-11 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-on-surface-variant/60 focus:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]"
                    id="password"
                    name="password"
                    onChange={() => {}}
                    placeholder="••••••••••••"
                    required=""
                    style={{}}
                    type="password"
                  />
                  <button
                    className="absolute right-space-sm p-space-xs text-on-surface-variant hover:text-on-surface rounded-full transition-colors flex items-center justify-center"
                    onClick={() => {}}
                    title="Toggle password view"
                    type="button"
                  >
                    <Eye className="text-[20px]" />
                  </button>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
                  Must be unique with lowercase, uppercase, and a special
                  character (min. 8 characters).
                </p>
                {/*  Live Requirement Validation Badges  */}
                <div className="flex flex-wrap gap-space-xs mt-space-xs pt-space-xs">
                  <div
                    className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm transition-all"
                    id="rule-len"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      radio_button_unchecked
                    </span>
                    <span className="">8+ characters</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm transition-all"
                    id="rule-upper"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      radio_button_unchecked
                    </span>
                    <span className="">Uppercase letter</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm transition-all"
                    id="rule-lower"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      radio_button_unchecked
                    </span>
                    <span className="">Lowercase letter</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm transition-all"
                    id="rule-special"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      radio_button_unchecked
                    </span>
                    <span className="">Special character</span>
                  </div>
                </div>
              </div>
              {/*  Field 6: Re-Enter Password  */}
              <div className="flex flex-col gap-space-2xs">
                <label
                  className="font-label-md text-label-md text-on-surface font-semibold"
                  htmlFor="confirmPassword"
                >
                  Re-Enter Password <span className="text-error">*</span>
                </label>
                <div className="relative flex items-center">
                  <ShieldCheck className="absolute left-space-md text-on-surface-variant text-[20px] pointer-events-none" />
                  <input
                    className="w-full h-10 pl-11 pr-11 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-on-surface-variant/60 focus:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={() => {}}
                    placeholder="••••••••••••"
                    required=""
                    style={{}}
                    type="password"
                  />
                  <button
                    className="absolute right-space-sm p-space-xs text-on-surface-variant hover:text-on-surface rounded-full transition-colors flex items-center justify-center"
                    onClick={() => {}}
                    title="Toggle password view"
                    type="button"
                  >
                    <Eye className="text-[20px]" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-space-2xs">
                  <p
                    className="font-body-sm text-body-sm text-on-surface-variant"
                    id="matchText"
                  >
                    Passwords must match.
                  </p>
                  <span
                    className="hidden font-label-sm text-label-sm px-space-sm py-space-2xs rounded-full"
                    id="matchStatusBadge"
                  ></span>
                </div>
              </div>
              {/*  Action Buttons  */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-space-base mt-space-md pt-space-lg bg-surface-container-low/20 -mx-space-xl sm:-mx-space-2xl px-space-xl sm:px-space-2xl">
                <button
                  className="w-full sm:w-auto px-space-xl py-space-sm rounded-full font-body-md text-body-md font-semibold text-on-surface-variant bg-surface-container-low hover:bg-surface-container transition-colors text-center"
                  onClick={() => navigate("/dashboard")}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-2xl py-space-sm rounded-full bg-primary-container text-on-primary font-body-md text-body-md font-semibold hover:bg-primary transition-all shadow-md shadow-primary-container/25 active:scale-[0.98]"
                  id="submitBtn"
                  type="submit"
                >
                  <CheckCircle className="text-[20px]" />
                  <span className="">Create User</span>
                </button>
              </div>
            </form>
          </div>
          {/*  Bottom Enterprise Compliance & Ledger Details Banner  */}
          <div className="w-full max-w-2xl mt-space-lg flex flex-wrap items-center justify-between gap-space-sm px-space-md text-on-surface-variant font-label-sm text-label-sm">
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center gap-space-2xs text-secondary font-semibold">
                <Lock className="text-[15px]" />
                SOC-2 Type II Certified
              </span>
              <span className="">•</span>
              <span className="">256-bit TLS Encryption</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[15px] text-tertiary">
                history_edu
              </span>
              <span className="">Encrypted Audit Trail #UA-8902</span>
            </div>
          </div>
          {/*  Client-side Interactive Behaviors  */}
        </div>
      </main>
      <footer className="w-full bg-surface-container-low/60 py-space-lg mt-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col sm:flex-row items-center justify-between gap-space-base text-on-surface-variant font-body-sm text-body-sm">
          <span className="">
            © 2025 UrbanMart Enterprise Operations. All rights reserved.
          </span>
          <div className="flex items-center gap-space-lg">
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              Encrypted Ledger Active
            </span>
            <span className="font-body-sm text-body-sm">v2.4.0-prod</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
