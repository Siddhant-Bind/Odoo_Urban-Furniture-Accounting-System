import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, ChevronDown, ChevronRight, LayoutDashboard, LayoutList, MoreVertical, Plus, Search, Settings } from "lucide-react";


export default function ContactList() {
  const navigate = useNavigate();

  return (
    <>
      {/*  TopNavBar (Shared Component)  */}
      <header className="bg-surface-container-lowest dark:bg-surface-container-lowest docked full-width top-0 h-16 border-b border-outline-variant dark:border-outline-variant shadow-sm z-50 fixed w-full">
        <div className="flex items-center justify-between px-gutter-desktop w-full max-w-container-max mx-auto h-16">
          <div className="flex items-center gap-8">
            {/*  Brand Logo Placeholder  */}
            <div className="w-[120px] h-[36px] bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg flex items-center justify-center">
              <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
                UrbanMart
              </span>
            </div>
            {/*  Navigation Links (Web only)  */}
            <nav className="hidden md:flex items-center gap-6 h-full pt-5">
              <Link
                className="text-on-surface-variant dark:text-on-surface-variant font-medium pb-5 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 cursor-pointer active:opacity-80 font-body-md text-body-md"
                to="/sales-orders"
              >
                Sales
              </Link>
              <Link
                className="text-on-surface-variant dark:text-on-surface-variant font-medium pb-5 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 cursor-pointer active:opacity-80 font-body-md text-body-md"
                to="/purchase-orders"
              >
                Purchase
              </Link>
              {/*  Active State  */}
              <Link
                aria-current="page"
                className="text-primary dark:text-primary-fixed-dim font-semibold border-b-2 border-primary dark:border-primary-fixed-dim pb-5 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 cursor-pointer active:opacity-80 font-body-md text-body-md"
                to="/contacts"
              >
                Account
              </Link>
              <Link
                className="text-on-surface-variant dark:text-on-surface-variant font-medium pb-5 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 cursor-pointer active:opacity-80 font-body-md text-body-md"
                to="/balance-sheet"
              >
                Report
              </Link>
            </nav>
          </div>
          {/*  Trailing Actions & Profile  */}
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80 font-body-md text-body-md">
              Help
            </button>
            <div className="flex items-center gap-2">
              <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container cursor-pointer active:opacity-80">
                <Bell className="text-[20px]" />
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container cursor-pointer active:opacity-80">
                <Settings className="text-[20px]" />
              </button>
            </div>
            {/*  Profile Area  */}
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <div className="text-right hidden sm:block">
                <div className="font-label-md text-label-md text-on-surface">
                  Alex Morgan
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  Administrator
                </div>
              </div>
              <img
                alt="User Profile"
                className="w-8 h-8 rounded-full object-cover border border-outline-variant"
                data-alt="Professional corporate headshot of a young administrator in a bright modern office setting. Cool color palette with soft natural lighting."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF5pZ-UYgvXhSpZWkA4bvatPG-mT_Hn_41WYYqK_7-QXU443TtkjJDOVjfPDfiArWgNUBiHleBEFvWoL-qqHVMtmvnIkeoZQLUSD3DoKqRe5rcrIKFB8ZPGLohQ5VfWheTOXU7gcBaeshIZ81CTVCpFCoNxpAC6QY9WSbRqZ_eX0efICRmkB9UVUqcfPzU3bvIsarVW-slIuPNREeH39fKB1iFV7tjjBhDi0knCFHrYZAIYIQmdDEm6waWLDcjzSjZjUOSmjBz0E0H"
              />
            </div>
          </div>
        </div>
      </header>
      {/*  Main Content Area  */}
      <main className="flex-grow pt-24 pb-12 px-gutter-mobile md:px-gutter-desktop w-full max-w-container-max mx-auto">
        {/*  Header Section  */}
        <div className="mb-8">
          {/*  Breadcrumbs  */}
          <nav className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant mb-4">
            <Link
              className="hover:text-primary transition-colors flex items-center gap-1"
              to="/dashboard"
            >
              <ArrowLeft className="text-[16px]" />
              Back to Dashboard
            </Link>
            <span>/</span>
            <Link
              className="hover:text-primary transition-colors"
              to="/contacts"
            >
              Account
            </Link>
            <span>/</span>
            <span className="text-on-surface font-medium">
              Contacts Directory
            </span>
          </nav>
          {/*  Title & Actions Row  */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <h1 className="font-display text-display text-on-surface">
                Contacts
              </h1>
              <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full font-label-md text-label-md border border-outline-variant">
                142 Contacts
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/*  Secondary Button  */}
              <button
                onClick={() => navigate(-1)}
                className="rounded-full border-[1.5px] border-primary-container text-[#0F766E] bg-transparent px-5 py-2 font-label-md text-label-md hover:bg-[#CCFBF1]/50 transition-colors"
              >
                Back
              </button>
              {/*  Primary Button  */}
              <button
                onClick={() => navigate("/contacts/new")}
                className="rounded-full bg-primary-container text-white px-5 py-2 font-label-md text-label-md font-semibold hover:bg-[#0F766E] active:ring-2 active:ring-[#99F6E4] active:ring-inset transition-all flex items-center gap-2"
              >
                <Plus className="text-[18px]" />
                New Contact
              </button>
            </div>
          </div>
        </div>
        {/*  Control Bar  */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
          {/*  Search  */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              className="w-full h-10 pl-10 pr-4 rounded-full bg-white border border-[#E2E8F0] font-body-md text-body-md text-on-surface focus:border-primary-container focus:ring-0 focus:shadow-[0_0_0_3px_rgba(20,184,166,0.15)] transition-shadow"
              placeholder="Search contacts by name, email, company..."
              type="text"
            />
          </div>
          {/*  Filters & Views  */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {/*  Dropdown 1  */}
            <div className="relative">
              <button className="h-10 px-4 rounded-lg bg-white border border-[#E2E8F0] font-body-md text-body-md text-on-surface flex items-center gap-2 hover:bg-surface-container-low transition-colors whitespace-nowrap">
                All Types
                <ChevronDown className="text-[18px] text-on-surface-variant" />
              </button>
            </div>
            {/*  Dropdown 2  */}
            <div className="relative">
              <button className="h-10 px-4 rounded-lg bg-white border border-[#E2E8F0] font-body-md text-body-md text-on-surface flex items-center gap-2 hover:bg-surface-container-low transition-colors whitespace-nowrap">
                Status: Active
                <ChevronDown className="text-[18px] text-on-surface-variant" />
              </button>
            </div>
            {/*  View Toggles  */}
            <div className="flex items-center bg-[#F1F5F9] rounded-lg p-1 border border-[#E2E8F0] ml-auto md:ml-2">
              <button
                aria-label="List View"
                onClick={() => navigate("/contacts/list")}
                className="p-1.5 rounded bg-white shadow-sm text-primary-container flex items-center justify-center"
              >
                <LayoutList className="text-[20px]" />
              </button>
              <button
                aria-label="Kanban View"
                onClick={() => navigate("/contacts/kanban")}
                className="p-1.5 rounded text-[#64748B] hover:text-on-surface transition-colors flex items-center justify-center"
              >
                <LayoutDashboard className="text-[20px]" />
              </button>
            </div>
          </div>
        </div>
        {/*  Data Table Card (Level 1 Elevation)  */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.04),0_1px_2px_-1px_rgba(15,23,42,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="p-4 w-12 text-center">
                    <input
                      className="w-[18px] h-[18px] rounded border-[#CBD5E1] text-primary-container focus:ring-primary-container cursor-pointer"
                      type="checkbox"
                    />
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Email
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Company
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Role
                  </th>
                  <th className="p-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 w-16 text-center"></th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-[#E2E8F0]">
                {/*  Row 1  */}
                <tr className="hover:bg-[#CCFBF1]/30 transition-colors group">
                  <td className="p-4 text-center">
                    <input
                      className="w-[18px] h-[18px] rounded border-[#CBD5E1] text-primary-container focus:ring-primary-container cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                        data-alt="Close up minimalist portrait photo of Sarah Jenkins in a bright well lit studio. Cool clean lighting."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5-FdBn6gkj3UHBUKTsV9bhcq7o7XV_NYY4LqQUgSWUsCNd11iLZMQUgIacgMjpfNza8a_OofUS8igZEQvUK-XnR6GN7T3_efXRnAedcWMCxNO4UFOv1Dl1nV7OgQfs1IZ6Q611Z020-5QLs4A6hBYkuA9-fhu5HMAbdC48EKZT-hGBQawHrVtJgkKD9EN4VFHVjpJyPhC-82TEJGXJPY5E3g8fHGmKdgZNRZWF1F2amy43MdLaQu-7guBzNFbkiKxUCdSNpXwnd8p"
                      />
                      <span className="font-semibold text-on-surface">
                        Sarah Jenkins
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-[#64748B]">sarah.j@acmecorp.com</td>
                  <td className="p-4 text-[#64748B]">+1 (555) 123-4567</td>
                  <td className="p-4 text-on-surface">Acme Corp</td>
                  <td className="p-4">
                    <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide">
                      Customer
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-[#CCFBF1] text-[#0F766E] px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-center text-[#64748B]">
                    <button className="p-1 rounded-full hover:bg-[#E2E8F0] transition-colors group-hover:text-primary-container">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
                {/*  Row 2  */}
                <tr className="hover:bg-[#CCFBF1]/30 transition-colors group">
                  <td className="p-4 text-center">
                    <input
                      className="w-[18px] h-[18px] rounded border-[#CBD5E1] text-primary-container focus:ring-primary-container cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E5EEFF] text-[#006B5F] flex items-center justify-center font-bold border border-[#E2E8F0]">
                        MV
                      </div>
                      <span className="font-semibold text-on-surface">
                        Marcus Vance
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-[#64748B]">m.vance@techlogix.io</td>
                  <td className="p-4 text-[#64748B]">+1 (555) 987-6543</td>
                  <td className="p-4 text-on-surface">TechLogix</td>
                  <td className="p-4">
                    <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide">
                      Vendor
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-[#CCFBF1] text-[#0F766E] px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-center text-[#64748B]">
                    <button className="p-1 rounded-full hover:bg-[#E2E8F0] transition-colors group-hover:text-primary-container">
                      <MoreVertical className="text-[20px]" />
                    </button>
                  </td>
                </tr>
                {/*  Row 3  */}
                <tr className="hover:bg-[#CCFBF1]/30 transition-colors group">
                  <td className="p-4 text-center">
                    <input
                      className="w-[18px] h-[18px] rounded border-[#CBD5E1] text-primary-container focus:ring-primary-container cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                        data-alt="Professional studio portrait of Elena Rostova. Soft turquoise background tint. Clean corporate style."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7mFucCRvaRygYwQFcWiFkGTUI8Rib0cYF3GPnKLsM2wVN9gv53KA51pHpL6vgh-jWCua_w_jaRSm3YwencTSu_OLbHi1HCkRkfPqm0z1uKfsiel-sVuIBCyYfDa_HIWnLyDidn8qRkvzc_wD_2_3qlPbS29TiVfWoNQODdYBUtWETm0WBsnhRD02J-SCyBYupiiefzkbKpOGZ98Jf9MXWoGQ27WLvGmTXYSCe0cwERQH9Q6KX0jJTwFdPN8z2kMr3RO38Pb21MFAR"
                      />
                      <span className="font-semibold text-on-surface">
                        Elena Rostova
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-[#64748B]">
                    elena@globalpartners.net
                  </td>
                  <td className="p-4 text-[#64748B]">+44 20 7946 0958</td>
                  <td className="p-4 text-on-surface">Global Partners</td>
                  <td className="p-4">
                    <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide">
                      Partner
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-[#FEE2E2] text-[#B91C1C] px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide">
                      Inactive
                    </span>
                  </td>
                  <td className="p-4 text-center text-[#64748B]">
                    <button className="p-1 rounded-full hover:bg-[#E2E8F0] transition-colors group-hover:text-primary-container">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
                {/*  Row 4  */}
                <tr className="hover:bg-[#CCFBF1]/30 transition-colors group">
                  <td className="p-4 text-center">
                    <input
                      className="w-[18px] h-[18px] rounded border-[#CBD5E1] text-primary-container focus:ring-primary-container cursor-pointer"
                      type="checkbox"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E5EEFF] text-[#006B5F] flex items-center justify-center font-bold border border-[#E2E8F0]">
                        DW
                      </div>
                      <span className="font-semibold text-on-surface">
                        David Wright
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-[#64748B]">
                    david.w@wrightlogistics.com
                  </td>
                  <td className="p-4 text-[#64748B]">+1 (555) 222-3344</td>
                  <td className="p-4 text-on-surface">Wright Logistics</td>
                  <td className="p-4">
                    <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide">
                      Vendor
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-[#CCFBF1] text-[#0F766E] px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-center text-[#64748B]">
                    <button className="p-1 rounded-full hover:bg-[#E2E8F0] transition-colors group-hover:text-primary-container">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/*  Footer / Pagination within Card  */}
          <div className="border-t border-[#E2E8F0] bg-[#FFFFFF] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-body-sm text-body-sm text-[#64748B]">
                Showing 1-4 of 142 contacts
              </span>
              <div className="flex items-center gap-2">
                <span className="font-body-sm text-body-sm text-[#64748B]">
                  Rows per page:
                </span>
                <select className="h-8 rounded bg-white border border-[#E2E8F0] font-body-sm text-body-sm text-on-surface focus:border-primary-container focus:ring-0 cursor-pointer">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] transition-colors disabled:opacity-50"
                disabled=""
              >
                <ArrowLeft className="text-[18px]" />
              </button>
              <button className="w-8 h-8 rounded-full bg-primary-container text-white font-label-md text-label-md flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded-full text-[#64748B] hover:bg-[#F1F5F9] font-label-md text-label-md flex items-center justify-center transition-colors">
                2
              </button>
              <button className="w-8 h-8 rounded-full text-[#64748B] hover:bg-[#F1F5F9] font-label-md text-label-md flex items-center justify-center transition-colors">
                3
              </button>
              <span className="text-[#64748B]">...</span>
              <button className="w-8 h-8 rounded-full text-[#64748B] hover:bg-[#F1F5F9] font-label-md text-label-md flex items-center justify-center transition-colors">
                15
              </button>
              <button className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] transition-colors">
                <ChevronRight className="text-[18px]" />
              </button>
            </div>
          </div>
        </div>
        {/*  Compliance / Status Footer  */}
        <div className="mt-6 flex justify-end">
          <div className="flex items-center gap-2 text-[#64748B] font-body-sm text-body-sm bg-white px-3 py-1.5 rounded-full border border-[#E2E8F0] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            Directory Sync Active
          </div>
        </div>
      </main>
    </>
  );
}
