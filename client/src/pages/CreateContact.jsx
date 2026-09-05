import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BadgeCheck, CheckCircle, ChevronDown, IdCard, Lock, Mail, Plus, RefreshCw, Shield, ShoppingBag, User } from "lucide-react";


export default function CreateContact() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get("full_name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      companyName: formData.get("company") || "",
      isVendor: formData.get("role") === "vendor" || formData.get("role") === "both",
      isCustomer: formData.get("role") === "customer" || formData.get("role") === "both",
    };
    try {
      const { fetchClient } = await import('../utils/api');
      await fetchClient('/contacts', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      navigate("/contacts/list");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
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
                to="/sales-orders"
              >
                Sales
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="purchase"
                to="/purchase-orders"
              >
                Purchase
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="account"
                to="/contacts"
              >
                Account
              </Link>
              <Link
                className="h-16 inline-flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
                data-path="report"
                to="/balance-sheet"
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
                <span>Create User</span>
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
        <div className="flex flex-col w-full">
          {/*  Sub-Header & Breadcrumb Bar  */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm py-space-md mb-space-base">
            <div className="flex items-center gap-space-sm flex-wrap">
              <Link
                className="inline-flex items-center gap-space-2xs font-body-sm text-body-sm text-primary hover:text-on-primary-container transition-colors font-medium"
                to="#"
              >
                <ArrowLeft className="text-[16px]" />
                <span>Back to Contacts Directory</span>
              </Link>
              <span className="text-on-surface-variant/40 font-body-sm text-body-sm">
                /
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Account
              </span>
              <span className="text-on-surface-variant/40 font-body-sm text-body-sm">
                /
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Directory
              </span>
              <span className="text-on-surface-variant/40 font-body-sm text-body-sm">
                /
              </span>
              <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                New Contact
              </span>
            </div>
            {/*  Live Directory Sync Indicator Badge  */}
            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-2xs rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium tracking-wide uppercase">
                Ledger Sync:
              </span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                Real-Time Active
              </span>
            </div>
          </div>
          {/*  Primary Page Header / Action Bar  */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg mb-space-xl">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/40 flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-[26px]">
                  person_add
                </span>
              </div>
              <div>
                <div className="flex items-center gap-space-sm">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Create Contact Record
                  </h1>
                  <span className="px-space-sm py-space-2xs rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase font-semibold tracking-wider">
                    Draft
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
                  Establish operational ledger bindings, multi-currency routing,
                  and directory identification.
                </p>
              </div>
            </div>
            {/*  Action Buttons  */}
            <div className="flex items-center gap-space-sm self-start lg:self-auto flex-wrap">
              <button
                className="inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-body-md text-body-md font-semibold transition-all shadow-sm"
                type="button"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="text-[18px]" />
                <span>Back</span>
              </button>
              <button
                className="inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container-low text-secondary font-body-md text-body-md font-semibold transition-all shadow-sm"
                type="button"
              >
                <RefreshCw className="text-[18px]" />
                <span>Reset</span>
              </button>
              <button
                className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-primary-container hover:bg-primary text-on-primary font-body-md text-body-md font-semibold transition-all shadow-md active:scale-95"
                id="save-contact-btn"
                type="submit"
                form="contact-form"
              >
                <CheckCircle className="text-[18px]" />
                <span>Save Contact</span>
              </button>
            </div>
          </div>
          {/*  Form Layout: 2/3 and 1/3 Split Grid  */}
          <form
            className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start"
            id="contact-form"
            onSubmit={handleSubmit}
          >
            {/*  Left / Center Column (8 Cols - 2/3)  */}
            <div className="lg:col-span-8 flex flex-col gap-space-xl">
              {/*  Section 1: Basic Information Card  */}
              <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-space-base mb-space-lg">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-xl bg-secondary-container/50 flex items-center justify-center text-primary">
                      <IdCard className="text-[20px]" />
                    </div>
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Basic Information
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Core identification for CRM routing and invoicing
                      </p>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold bg-secondary-container/30 px-space-sm py-space-2xs rounded-full">
                    Required Identity
                  </span>
                </div>
                <div className="flex flex-col gap-space-lg">
                  {/*  Full Name  */}
                  <div>
                    <div className="flex items-center justify-between mb-space-xs">
                      <label
                        className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold"
                        htmlFor="contact-name"
                      >
                        Contact Name{" "}
                        <span className="text-error font-bold">*</span>
                      </label>
                      <span className="font-body-sm text-body-sm text-on-surface-variant/70">
                        Legal entity or individual
                      </span>
                    </div>
                    <div className="relative">
                      <User className="absolute left-space-md top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]" />
                      <input
                        className="w-full h-11 pl-11 pr-space-md bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                        id="contact-name"
                        name="contact_name"
                        placeholder="e.g. Sarah Jenkins"
                        required=""
                        type="text"
                      />
                    </div>
                  </div>
                  {/*  Email Address & Phone Row  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                    {/*  Email  */}
                    <div>
                      <div className="flex items-center justify-between mb-space-xs">
                        <label
                          className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold"
                          htmlFor="contact-email"
                        >
                          Email Address{" "}
                          <span className="text-error font-bold">*</span>
                        </label>
                        <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/30 px-space-xs py-space-2xs rounded">
                          Unique Required
                        </span>
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-space-md top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]" />
                        <input
                          className="w-full h-11 pl-11 pr-space-md bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                          id="contact-email"
                          name="contact_email"
                          placeholder="e.g. s.jenkins@acmeretail.com"
                          required=""
                          type="email"
                        />
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant/70 mt-space-2xs">
                        Must be unique across the organizational ledger index.
                      </p>
                    </div>
                    {/*  Phone Number  */}
                    <div>
                      <div className="flex items-center justify-between mb-space-xs">
                        <label
                          className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold"
                          htmlFor="contact-phone"
                        >
                          Phone Number
                        </label>
                        <span className="font-body-sm text-body-sm text-on-surface-variant/70">
                          E.164 Format
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <div className="absolute left-space-sm flex items-center gap-space-2xs pointer-events-none text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px]">
                            call
                          </span>
                          <span className="font-numeric-md text-numeric-md text-on-surface">
                            +1
                          </span>
                        </div>
                        <input
                          className="w-full h-11 pl-16 pr-space-md bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                          id="contact-phone"
                          name="contact_phone"
                          placeholder="(555) 234-8901"
                          type="tel"
                        />
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant/70 mt-space-2xs">
                        Used for direct billing SMS and dispatch confirmations.
                      </p>
                    </div>
                  </div>
                  {/*  Contact Classification / Category Pills  */}
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold mb-space-sm">
                      Contact Classification / Type{" "}
                      <span className="text-error font-bold">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-space-md">
                      <label className="cursor-pointer relative">
                        <input
                          checked=""
                          className="peer sr-only"
                          name="contact_type"
                          type="radio"
                          value="Customer"
                        />
                        <div className="p-space-md rounded-xl bg-surface-container-lowest peer-checked:bg-secondary-container/30 transition-all flex flex-col items-center justify-center text-center shadow-sm">
                          <ShoppingBag className="text-primary mb-space-2xs" />
                          <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                            Customer
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            B2C or B2B Client
                          </span>
                        </div>
                      </label>
                      <label className="cursor-pointer relative">
                        <input
                          className="peer sr-only"
                          name="contact_type"
                          type="radio"
                          value="Vendor"
                        />
                        <div className="p-space-md rounded-xl bg-surface-container-lowest peer-checked:bg-secondary-container/30 transition-all flex flex-col items-center justify-center text-center shadow-sm">
                          <span className="material-symbols-outlined text-tertiary mb-space-2xs">
                            storefront
                          </span>
                          <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                            Vendor
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Supplier or Partner
                          </span>
                        </div>
                      </label>
                      <label className="cursor-pointer relative">
                        <input
                          className="peer sr-only"
                          name="contact_type"
                          type="radio"
                          value="Partner"
                        />
                        <div className="p-space-md rounded-xl bg-surface-container-lowest peer-checked:bg-secondary-container/30 transition-all flex flex-col items-center justify-center text-center shadow-sm">
                          <span className="material-symbols-outlined text-secondary mb-space-2xs">
                            handshake
                          </span>
                          <span className="font-headline-sm text-headline-sm text-on-surface font-medium">
                            Partner
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Logistics &amp; Agency
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
              {/*  Section 2: Address Information Card  */}
              <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-space-base mb-space-lg">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-xl bg-secondary-container/50 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">
                        location_on
                      </span>
                    </div>
                    <div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface">
                        Address Details
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Primary billing origin and shipping endpoint
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold">
                    <BadgeCheck className="text-[18px]" />
                    <span>Tax Jurisdiction Ready</span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-lg">
                  {/*  Street Address  */}
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold mb-space-xs"
                      htmlFor="street-address"
                    >
                      Street Address
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]">
                        home
                      </span>
                      <input
                        className="w-full h-11 pl-11 pr-space-md bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                        id="street-address"
                        name="street_address"
                        placeholder="e.g. 100 Innovation Boulevard, Suite 400"
                        type="text"
                      />
                    </div>
                  </div>
                  {/*  City & State Row  */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg">
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold mb-space-xs"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <input
                        className="w-full h-11 px-space-md bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                        id="city"
                        name="city"
                        placeholder="e.g. San Francisco"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold mb-space-xs"
                        htmlFor="state-province"
                      >
                        State / Province
                      </label>
                      <input
                        className="w-full h-11 px-space-md bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                        id="state-province"
                        name="state_province"
                        placeholder="e.g. California"
                        type="text"
                      />
                    </div>
                  </div>
                  {/*  Postal Code & Country Row  */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg">
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold mb-space-xs"
                        htmlFor="postal-code"
                      >
                        Postal / Zip Code
                      </label>
                      <input
                        className="w-full h-11 px-space-md bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                        id="postal-code"
                        name="postal_code"
                        placeholder="e.g. 94105"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold mb-space-xs"
                        htmlFor="country"
                      >
                        Country / Region
                      </label>
                      <div className="relative">
                        <select
                          className="w-full h-11 px-space-md pr-10 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface appearance-none shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                          id="country"
                          name="country"
                        >
                          <option selected="" value="US">
                            United States (USD)
                          </option>
                          <option value="CA">Canada (CAD)</option>
                          <option value="GB">United Kingdom (GBP)</option>
                          <option value="EU">European Union (EUR)</option>
                          <option value="AU">Australia (AUD)</option>
                          <option value="SG">Singapore (SGD)</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">
                          unfold_more
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/*  Section 3: Visual Audit & Ledger Location Preview  */}
              <section className="bg-surface-container-low/50 rounded-2xl p-space-lg shadow-sm">
                <div className="flex items-center justify-between mb-space-md">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      map
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      Regional Headquarters Preview
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Static Geolocation Anchor
                  </span>
                </div>
                <div
                  className="w-full h-44 bg-cover bg-center rounded-xl overflow-hidden shadow-inner flex items-end p-space-md"
                  data-location="Financial District, San Francisco, CA"
                  style={{}}
                >
                  <div className="bg-surface-container-lowest/90 backdrop-blur-md px-space-md py-space-xs rounded-lg shadow-sm flex items-center gap-space-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                    <span className="font-label-md text-label-md text-on-surface font-medium">
                      Auto-mapped to Pacific Western Logistics Corridor
                    </span>
                  </div>
                </div>
              </section>
            </div>
            {/*  Right Column (4 Cols - 1/3)  */}
            <div className="lg:col-span-4 flex flex-col gap-space-xl">
              {/*  Upload Photo Box  */}
              <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm text-center">
                <div className="flex items-center justify-between pb-space-sm mb-space-base">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Contact Photo
                  </h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
                    Optional
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-space-lg bg-surface-container-low/40 rounded-xl">
                  {/*  Circular Avatar Indicator with Image Placeholder  */}
                  <div className="relative w-28 h-28 mb-space-md">
                    <img
                      className="w-28 h-28 rounded-full object-cover shadow-sm ring-4 ring-surface-container-lowest"
                      data-alt="A clean, professional corporate studio headshot portrait with soft neutral lighting and teal rim highlights suited for a modern financial directory contact avatar."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCBeojowF95JGaH2mcrqp6xEuwREpp3-DSaDRq1WQDFea7DCwgRpndY7sibBx2LXSppDsInJGD3JyeoDHvon4bLxhbYPZM2j9L1jkz5csSaCqI4WLqpqa_JxTGlM-Zb_OT5_CcDugueZDrMQYp4T3LN1mTniqaKPwhSzwymj6OShGCe_k0Z3_L2I1bJPgIvXnGnZTE7Etj9q69vpyg_CHJ542d_3yclrzJSpRErQuWoqFK2S7MvLBCow"
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[18px]">
                        photo_camera
                      </span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface font-medium mb-space-2xs">
                    Upload Identification Photo
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md max-w-[240px]">
                    Supports PNG, JPG, or WebP. Max size 5MB. Recommended
                    400×400px.
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container-low text-primary font-body-md text-body-md font-semibold transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      cloud_upload
                    </span>
                    <span>Browse Files</span>
                    <input accept="image/*" className="hidden" type="file" />
                  </label>
                </div>
              </section>
              {/*  Quick Settings & Account Association Card  */}
              <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm">
                <div className="flex items-center gap-space-sm pb-space-base mb-space-lg">
                  <div className="w-8 h-8 rounded-xl bg-secondary-container/50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">
                      manage_accounts
                    </span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Account Association
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      UrbanMart ledger configuration
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-space-lg">
                  {/*  Account Owner Assignment  */}
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold mb-space-xs"
                      htmlFor="account-owner"
                    >
                      Assigned Account Manager
                    </label>
                    <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded-xl">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary">
                        <User className="text-[18px]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-headline-sm text-headline-sm text-on-surface truncate">
                          Alex Morgan
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          Lead Administrator
                        </p>
                      </div>
                      <button
                        className="text-secondary hover:text-on-secondary-container font-label-md text-label-md font-semibold px-space-xs"
                        type="button"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  {/*  Ledger Currency Assignment  */}
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold mb-space-xs"
                      htmlFor="ledger-currency"
                    >
                      Settlement Currency
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-11 px-space-md pr-10 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface appearance-none shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                        id="ledger-currency"
                        name="ledger_currency"
                      >
                        <option value="USD">
                          USD - United States Dollar ($)
                        </option>
                        <option value="EUR">EUR - Euro (€)</option>
                        <option value="GBP">GBP - British Pound (£)</option>
                        <option value="CAD">CAD - Canadian Dollar ($)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">
                        unfold_more
                      </span>
                    </div>
                  </div>
                  {/*  Active Ledger Status Toggle  */}
                  <div className="flex items-center justify-between p-space-md bg-surface-container-low rounded-xl">
                    <div>
                      <p className="font-headline-sm text-headline-sm text-on-surface">
                        Active Record
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Permit immediate invoicing and billing runs
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        checked=""
                        className="sr-only peer"
                        type="checkbox"
                      />
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-on-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:border-surface-container after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
                  </div>
                  {/*  Multi-Currency Credit Limit Input  */}
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold mb-space-xs"
                      htmlFor="credit-limit"
                    >
                      Assigned Credit Limit (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-space-md top-1/2 -translate-y-1/2 font-numeric-md text-numeric-md text-on-surface-variant">
                        $
                      </span>
                      <input
                        className="w-full h-11 pl-8 pr-space-md bg-surface-container-lowest rounded-xl font-numeric-md text-numeric-md text-on-surface placeholder:text-on-surface-variant/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-container"
                        id="credit-limit"
                        name="credit_limit"
                        placeholder="25,000.00"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </section>
              {/*  Ledger Security Audit Card  */}
              <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
                <div className="flex items-center gap-space-sm mb-space-sm">
                  <Shield className="text-secondary text-[20px]" />
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    Audit Compliance
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Record mutations are cryptographically signed under UrbanMart
                  ERP specification 2.4. All updates log an immutable change
                  vector to the global journal.
                </p>
                <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>SHA-256 Ledger ID</span>
                  <span className="font-mono text-primary font-semibold">
                    0x4F...982E
                  </span>
                </div>
              </section>
            </div>
          </form>
          {/*  Sticky Mobile Action Trigger (Desktop Hidden)  */}
          <div className="fixed bottom-4 left-4 right-4 lg:hidden z-40">
            <div className="bg-surface-container-lowest/95 backdrop-blur-xl p-space-sm rounded-2xl shadow-xl flex items-center justify-between gap-space-sm">
              <button
                className="flex-1 py-space-sm rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md font-semibold text-center"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-space-sm rounded-full bg-primary-container text-on-primary font-body-md text-body-md font-semibold text-center shadow-md"
                type="submit"
                form="contact-form"
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full bg-surface-container-low/60 py-space-lg mt-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col sm:flex-row items-center justify-between gap-space-base text-on-surface-variant font-body-sm text-body-sm">
          <span>
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
    </>
  );
}
