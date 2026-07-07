import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Lightbulb,
  Map,
  Database,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'decision-studio', label: 'Decision Studio', icon: Lightbulb },
  { id: 'heatmaps', label: 'Heatmaps', icon: Map },
  { id: 'digital-twin', label: 'Digital Twin', icon: Database },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'ai-assistant', label: 'AI Assistant', icon: MessageSquare },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentView, onViewChange, collapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`fixed left-0 top-16 bottom-0 bg-white border-r border-surface-200 z-40 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col p-3">
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-600' : ''}`} />
                {!collapsed && (
                  <span className={`text-sm font-medium ${isActive ? 'text-primary-700' : ''}`}>
                    {item.label}
                  </span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="border-t border-surface-200 pt-3 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-600' : ''}`} />
                {!collapsed && (
                  <span className={`text-sm font-medium ${isActive ? 'text-primary-700' : ''}`}>
                    {item.label}
                  </span>
                )}
              </motion.button>
            );
          })}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-surface-500 hover:bg-surface-50 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Collapse</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}
