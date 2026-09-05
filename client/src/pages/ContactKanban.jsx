import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight, Kanban, List, Lock, Mail, Plus, Search, Truck, User } from "lucide-react";


export default function ContactKanban() {
  const navigate = useNavigate();

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
          <div className="w-full py-space-md flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-md">
              <Link
                className="inline-flex items-center gap-space-2xs font-body-sm text-body-sm font-semibold text-primary hover:text-on-secondary-container transition-colors"
                to="#"
              >
                <ArrowLeft className="text-[18px]" />
                <span>Back to Dashboard</span>
              </Link>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <span>Account</span>
                <ChevronRight className="text-[14px]" />
                <span className="font-semibold text-on-surface">
                  Contacts Directory
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-base">
              <div className="flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-semibold">Active Ledgers: 138</span>
                <span className="text-outline-variant">•</span>
                <span className="tracking-wider uppercase font-semibold text-primary">
                  Sync Status: REAL-TIME
                </span>
              </div>
            </div>
          </div>
          <div className="w-full bg-surface-container-lowest p-space-base lg:p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-lg">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-base">
              <div className="flex items-center gap-space-md">
                <h1 className="font-headline-lg text-headline-lg text-on-surface">
                  Contacts
                </h1>
                <span className="inline-flex items-center px-space-sm py-space-2xs rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold">
                  142 Contacts
                </span>
              </div>
              <div className="flex-1 max-w-xl w-full xl:mx-space-base">
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-space-base pointer-events-none text-on-surface-variant">
                    <Search className="text-[20px]" />
                  </span>
                  <input
                    className="w-full h-10 pl-10 pr-16 bg-surface-container-low hover:bg-surface-container focus:bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md rounded-full transition-all outline-none"
                    placeholder="Search contacts by name, email, company, or phone..."
                    type="text"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-space-base pointer-events-none">
                    <span className="px-space-xs py-space-2xs rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase font-semibold">
                      ⌘K
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-space-sm w-full xl:w-auto justify-end">
                <div className="inline-flex items-center bg-surface-container-low p-1 rounded-full gap-1">
                  <button
                    aria-label="List View"
                    className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                    type="button"
                    onClick={() => navigate('/contacts/list')}
                  >
                    <List className="text-[20px] block" />
                  </button>
                  <button
                    aria-label="Kanban View Active"
                    className="px-space-sm py-1 rounded-full bg-surface-container-lowest text-primary shadow-sm font-label-sm text-label-sm font-semibold flex items-center gap-space-xs"
                    type="button"
                  >
                    <Kanban className="text-[18px] text-primary" />
                    <span className="hidden sm:inline">Kanban</span>
                  </button>
                </div>
                <button
                  className="inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-body-md text-body-md font-semibold transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    file_download
                  </span>
                  <span>Export</span>
                </button>
                <button
                  className="inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-body-md text-body-md font-semibold transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    upload
                  </span>
                  <span>Import</span>
                </button>
                <button
                  className="inline-flex items-center gap-space-xs px-space-base py-space-sm rounded-full bg-primary-container text-on-primary font-body-md text-body-md font-semibold hover:bg-primary transition-colors shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    person_add
                  </span>
                  <span>New Contact</span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
              <div className="flex flex-wrap items-center gap-space-xs">
                <button
                  className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold"
                  type="button"
                >
                  <span>Type: All</span>
                  <ChevronDown className="text-[16px]" />
                </button>
                <button
                  className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md font-semibold transition-colors"
                  type="button"
                >
                  <span>Status: Active</span>
                  <ChevronDown className="text-[16px]" />
                </button>
                <button
                  className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md font-semibold transition-colors"
                  type="button"
                >
                  <span>Owner: All Accounts</span>
                  <ChevronDown className="text-[16px]" />
                </button>
              </div>
              <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  swap_vert
                </span>
                <span>
                  Sorted by: <strong>Recent Activity</strong>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full mt-space-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-lg items-start">
            <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-2xl">
              <div className="flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Customers
                  </h2>
                  <span className="px-space-sm py-space-2xs rounded-full bg-surface-container font-numeric-md text-numeric-md text-on-surface-variant">
                    48
                  </span>
                </div>
                <button
                  aria-label="Add customer"
                  className="w-7 h-7 rounded-full bg-surface-container-lowest hover:bg-secondary-container flex items-center justify-center text-on-surface hover:text-on-secondary-fixed transition-colors"
                  type="button"
                >
                  <Plus className="text-[16px]" />
                </button>
              </div>
              <div className="flex flex-col gap-space-md">
                <div className="group bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <img
                        className="w-11 h-11 rounded-full object-cover shadow-sm"
                        data-alt="Professional studio portrait of Sarah Jenkins, a middle-aged VP with glasses and sleek blazer against a soft neutral studio backdrop in warm daylight"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtV1paGxa9cf1Rj_Fa2dysh2b0hp0VmWikb_K4LHmFH2VhKAjy0A3g4TYngEvRmyGrG5wbI16J55ajBaOlbS5s7dlI3VxpUKEPGvaiovDg-IBl3ttSAdsBzXgRVZ_hnea6N2f2mQ4TEgjVJQTVP7zmjrNcetg2PXkUQ8_fevzMqHgQtOnhwJs8X756yFxt4jnjYb-UcPFtcCFRXljf0Nm3jBJzE_E3Rbzd8J9_R25_-KEYcQaWVe8K0w"
                      />
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          Sarah Jenkins
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          VP Purchasing
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Menu options"
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      storefront
                    </span>
                    <span className="font-medium text-on-surface">
                      Acme Retail Chain
                    </span>
                  </div>
                  <div className="mt-space-sm flex flex-col gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-space-xs truncate">
                      <Mail className="text-[15px]" />
                      <span className="truncate">s.jenkins@acmeretail.com</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        call
                      </span>
                      <span>+1 (555) 349-8821</span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low/40 px-space-xs py-space-2xs rounded-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="inline-flex items-center gap-space-2xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                        Active
                      </span>
                      <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        Enterprise
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Send message"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble_outline
                        </span>
                      </button>
                      <button
                        aria-label="Call contact"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          phone
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="group bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-headline-sm">
                        MR
                      </div>
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          Marcus Rivera
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Regional Operations Head
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Menu options"
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      business
                    </span>
                    <span className="font-medium text-on-surface">
                      Metro Distro Hub
                    </span>
                  </div>
                  <div className="mt-space-sm flex flex-col gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-space-xs truncate">
                      <Mail className="text-[15px]" />
                      <span className="truncate">mrivera@metrohub.io</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        call
                      </span>
                      <span>+1 (555) 782-9014</span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low/40 px-space-xs py-space-2xs rounded-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="inline-flex items-center gap-space-2xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                        Active
                      </span>
                      <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        High Value
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Send message"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble_outline
                        </span>
                      </button>
                      <button
                        aria-label="Call contact"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          phone
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="group bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <img
                        className="w-11 h-11 rounded-full object-cover shadow-sm"
                        data-alt="Portrait photo of Elena Rostova, sleek dark hair, wearing an elegant corporate teal blazer in modern airy high-rise office architecture"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGJiaYHgihaX0e-CyzTMrP_UF4IiqCBnbuDhyQuWi1d52b2l1yKVO5DWxPYc46c06pW5KAUCDzLwxKNMHCCV2fqgScCjdVuwr8gDSJVLJks4WbRam3tS43_NbSMMQ7VWEKJxV0pd0mhR2_6e5zBFFfAGABbKpbsH_b4472O7lwcafMIQdnpVH-DHyTDhMlgyz0b-b9Gzzcidv8WPo_30sOZ4m-TXzFLfMtTA7fQQVDTiRA2HHjWur6nA"
                      />
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          Elena Rostova
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Procurement Director
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Menu options"
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      domain
                    </span>
                    <span className="font-medium text-on-surface">
                      Vanguard Consumer Ltd
                    </span>
                  </div>
                  <div className="mt-space-sm flex flex-col gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-space-xs truncate">
                      <Mail className="text-[15px]" />
                      <span className="truncate">elena@vanguardgroup.eu</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        call
                      </span>
                      <span>+44 20 7946 0912</span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low/40 px-space-xs py-space-2xs rounded-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="inline-flex items-center gap-space-2xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Send message"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble_outline
                        </span>
                      </button>
                      <button
                        aria-label="Call contact"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          phone
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-2xl">
              <div className="flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Vendors
                  </h2>
                  <span className="px-space-sm py-space-2xs rounded-full bg-surface-container font-numeric-md text-numeric-md text-on-surface-variant">
                    36
                  </span>
                </div>
                <button
                  aria-label="Add vendor"
                  className="w-7 h-7 rounded-full bg-surface-container-lowest hover:bg-secondary-container flex items-center justify-center text-on-surface hover:text-on-secondary-fixed transition-colors"
                  type="button"
                >
                  <Plus className="text-[16px]" />
                </button>
              </div>
              <div className="flex flex-col gap-space-md">
                <div className="group bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-11 h-11 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-headline-sm">
                        DC
                      </div>
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          David Chen
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Fleet Logistics Lead
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Menu options"
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <Truck className="text-[16px] text-primary" />
                    <span className="font-medium text-on-surface">
                      Apex Supply Logistics
                    </span>
                  </div>
                  <div className="mt-space-sm flex flex-col gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-space-xs truncate">
                      <Mail className="text-[15px]" />
                      <span className="truncate">d.chen@apexsupply.com</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        call
                      </span>
                      <span>+1 (555) 492-1088</span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low/40 px-space-xs py-space-2xs rounded-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="inline-flex items-center gap-space-2xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                        Active
                      </span>
                      <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        Contracted
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Send message"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble_outline
                        </span>
                      </button>
                      <button
                        aria-label="Call contact"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          phone
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="group bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <img
                        className="w-11 h-11 rounded-full object-cover shadow-sm"
                        data-alt="Close up modern business portrait of Robert Sterling, senior executive with silver hair wearing minimalist dark attire with soft natural window lighting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCypzwj8lJ897U2f9dtnATP1AMpNbkEo-EctvInNR8BNEEny8XjJy9yLzW_31iBeUFal8lpGi9J2sp7va0d0h83IKKrKQPzt9Uu52l-0CkM_h0h9ufxb8BZmLzkEVLT_ftftpddGVSxBQcmQFklI6lBxiPIDHFVTXit6gA19EloaQo3k9KnYLB8aB-4UhX-1Ky2tB5aJZc8QhyJ9fvVCzjRglPDHHkr50OHedT5rqfvD-csDRZYS70klQ"
                      />
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          Robert Sterling
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Cold Storage Ops
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Menu options"
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      ac_unit
                    </span>
                    <span className="font-medium text-on-surface">
                      ArcticLine Cold Systems
                    </span>
                  </div>
                  <div className="mt-space-sm flex flex-col gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-space-xs truncate">
                      <Mail className="text-[15px]" />
                      <span className="truncate">rsterling@arcticline.net</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        call
                      </span>
                      <span>+1 (555) 901-4472</span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low/40 px-space-xs py-space-2xs rounded-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="inline-flex items-center gap-space-2xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Send message"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble_outline
                        </span>
                      </button>
                      <button
                        aria-label="Call contact"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          phone
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-2xl">
              <div className="flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Partners
                  </h2>
                  <span className="px-space-sm py-space-2xs rounded-full bg-surface-container font-numeric-md text-numeric-md text-on-surface-variant">
                    28
                  </span>
                </div>
                <button
                  aria-label="Add partner"
                  className="w-7 h-7 rounded-full bg-surface-container-lowest hover:bg-secondary-container flex items-center justify-center text-on-surface hover:text-on-secondary-fixed transition-colors"
                  type="button"
                >
                  <Plus className="text-[16px]" />
                </button>
              </div>
              <div className="flex flex-col gap-space-md">
                <div className="group bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-11 h-11 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-headline-sm">
                        PP
                      </div>
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          Priya Patel
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Channel Growth VP
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Menu options"
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      handshake
                    </span>
                    <span className="font-medium text-on-surface">
                      Synergy Wholesale
                    </span>
                  </div>
                  <div className="mt-space-sm flex flex-col gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-space-xs truncate">
                      <Mail className="text-[15px]" />
                      <span className="truncate">p.patel@synergygroup.com</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        call
                      </span>
                      <span>+1 (555) 610-3390</span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low/40 px-space-xs py-space-2xs rounded-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="inline-flex items-center gap-space-2xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                        Active
                      </span>
                      <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        Strategic
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Send message"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble_outline
                        </span>
                      </button>
                      <button
                        aria-label="Call contact"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          phone
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="group bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-11 h-11 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-bold text-headline-sm">
                        CD
                      </div>
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          Chloe Dubois
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Integration Architect
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Menu options"
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      hub
                    </span>
                    <span className="font-medium text-on-surface">
                      DataNexus Alliance
                    </span>
                  </div>
                  <div className="mt-space-sm flex flex-col gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-space-xs truncate">
                      <Mail className="text-[15px]" />
                      <span className="truncate">chloe@datanexus.io</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        call
                      </span>
                      <span>+33 1 42 68 55 00</span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low/40 px-space-xs py-space-2xs rounded-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="inline-flex items-center gap-space-2xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Send message"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble_outline
                        </span>
                      </button>
                      <button
                        aria-label="Call contact"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          phone
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-2xl">
              <div className="flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    Inactive / Leads
                  </h2>
                  <span className="px-space-sm py-space-2xs rounded-full bg-surface-container font-numeric-md text-numeric-md text-on-surface-variant">
                    30
                  </span>
                </div>
                <button
                  aria-label="Add inactive lead"
                  className="w-7 h-7 rounded-full bg-surface-container-lowest hover:bg-secondary-container flex items-center justify-center text-on-surface hover:text-on-secondary-fixed transition-colors"
                  type="button"
                >
                  <Plus className="text-[16px]" />
                </button>
              </div>
              <div className="flex flex-col gap-space-md">
                <div className="group bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer opacity-85 hover:opacity-100">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-11 h-11 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-headline-sm">
                        TL
                      </div>
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          Thomas Lindqvist
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Procurement Analyst
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Menu options"
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      corporate_fare
                    </span>
                    <span className="font-medium text-on-surface">
                      Nordic Freight AS
                    </span>
                  </div>
                  <div className="mt-space-sm flex flex-col gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-space-xs truncate">
                      <Mail className="text-[15px]" />
                      <span className="truncate">t.lind@nordicfreight.no</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        call
                      </span>
                      <span>+47 22 33 44 55</span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low/40 px-space-xs py-space-2xs rounded-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                        Lead / Pending
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Send message"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble_outline
                        </span>
                      </button>
                      <button
                        aria-label="Call contact"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          phone
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="group bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all cursor-pointer opacity-85 hover:opacity-100">
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-11 h-11 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-headline-sm">
                        NK
                      </div>
                      <div>
                        <h3 className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          Nadia Kassem
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Independent Broker
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Menu options"
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <div className="mt-space-md flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      domain_disabled
                    </span>
                    <span className="font-medium text-on-surface">
                      Levant Commodities
                    </span>
                  </div>
                  <div className="mt-space-sm flex flex-col gap-space-2xs text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-space-xs truncate">
                      <Mail className="text-[15px]" />
                      <span className="truncate">nadia@levanttrade.com</span>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[15px]">
                        call
                      </span>
                      <span>+971 4 391 2890</span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low/40 px-space-xs py-space-2xs rounded-lg">
                    <div className="flex items-center gap-space-xs">
                      <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                        Dormant
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="Send message"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          chat_bubble_outline
                        </span>
                      </button>
                      <button
                        aria-label="Call contact"
                        className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          phone
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-space-xl p-space-base rounded-2xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[22px]">
                  contact_phone
                </span>
              </div>
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface">
                  CRM Pipeline Synchronization
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  UrbanMart Core ERP automates dual-entry verification across
                  all commercial contacts and supplier terms.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-base shrink-0">
              <span className="font-label-sm text-label-sm text-secondary font-semibold">
                4 Channels Healthy
              </span>
              <button
                className="px-space-base py-1.5 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-body-sm text-body-sm font-semibold transition-colors shadow-sm"
                type="button"
              >
                Review Sync Log
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
