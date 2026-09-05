import { NavLink } from 'react-router-dom';
import { User, Bell } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="bg-surface-bg border-b border-border h-16 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
      <div className="flex items-center gap-8">
        <div className="w-32 h-8 bg-gray-200 rounded-sm flex items-center justify-center text-xs text-gray-500 font-medium">
          LOGO PLACEHOLDER
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {['Sales', 'Purchase', 'Account', 'Report'].map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-text-secondary hover:text-text-primary">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
