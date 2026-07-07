import { motion } from 'framer-motion';
import { Bell, Search, User, Settings, ChevronDown } from 'lucide-react';

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-white border-b border-surface-200 fixed top-0 left-0 right-0 z-50"
    >
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-soft">
              <span className="text-white font-bold text-sm">VS</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-surface-900">VoiceSetu</h1>
              <p className="text-xs text-surface-500 -mt-0.5">Decision Intelligence Platform</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-50 border border-primary-200">
              <span className="text-sm font-medium text-primary-700">Constituency View</span>
              <ChevronDown className="w-4 h-4 text-primary-500" />
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search priorities, wards, citizens..."
              className="w-72 pl-9 pr-4 py-2 text-sm bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <button className="relative p-2 rounded-xl hover:bg-surface-100 transition-colors">
            <Bell className="w-5 h-5 text-surface-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-critical-500 rounded-full" />
          </button>

          <button className="p-2 rounded-xl hover:bg-surface-100 transition-colors">
            <Settings className="w-5 h-5 text-surface-600" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-surface-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-surface-900">Administrator</p>
              <p className="text-xs text-surface-500">MLA Office</p>
            </div>
            <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <User className="w-5 h-5 text-primary-700" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
