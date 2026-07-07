import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoReplay, setAutoReplay] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);

  return (
    <div className="space-y-4 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
          <SettingsIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
          <p className="text-sm text-surface-500">Configure platform preferences</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden"
      >
        <div className="p-4 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-surface-400" />
            <div>
              <h3 className="text-sm font-semibold text-surface-900">Profile</h3>
              <p className="text-xs text-surface-500">Account and user preferences</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900">Display Name</p>
              <p className="text-xs text-surface-500">How your name appears in reports</p>
            </div>
            <input
              type="text"
              defaultValue="Administrator"
              className="px-3 py-2 text-sm border border-surface-200 rounded-xl w-48 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900">Role</p>
              <p className="text-xs text-surface-500">Access level and permissions</p>
            </div>
            <select className="px-3 py-2 text-sm border border-surface-200 rounded-xl w-48 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
              <option>MLA Office</option>
              <option>Administrator</option>
              <option>Analyst</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden"
      >
        <div className="p-4 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-surface-400" />
            <div>
              <h3 className="text-sm font-semibold text-surface-900">Notifications</h3>
              <p className="text-xs text-surface-500">Alert and notification preferences</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900">Push Notifications</p>
              <p className="text-xs text-surface-500">Receive alerts for critical priorities</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                notifications ? 'bg-primary-500' : 'bg-surface-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  notifications ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900">Auto Decision Replay</p>
              <p className="text-xs text-surface-500">Play reasoning animation for new decisions</p>
            </div>
            <button
              onClick={() => setAutoReplay(!autoReplay)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                autoReplay ? 'bg-primary-500' : 'bg-surface-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  autoReplay ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden"
      >
        <div className="p-4 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-surface-400" />
            <div>
              <h3 className="text-sm font-semibold text-surface-900">Privacy & Security</h3>
              <p className="text-xs text-surface-500">Data handling and security settings</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900">Anonymized Data Sharing</p>
              <p className="text-xs text-surface-500">Share anonymized insights for model improvement</p>
            </div>
            <button
              onClick={() => setDataSharing(!dataSharing)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                dataSharing ? 'bg-primary-500' : 'bg-surface-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  dataSharing ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden"
      >
        <div className="p-4 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-surface-400" />
            <div>
              <h3 className="text-sm font-semibold text-surface-900">Data Management</h3>
              <p className="text-xs text-surface-500">Constituency data and sync settings</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900">Constituency Dataset</p>
              <p className="text-xs text-surface-500">Currently loaded dataset</p>
            </div>
            <div className="px-3 py-2 bg-primary-50 border border-primary-200 rounded-lg">
              <span className="text-xs font-medium text-primary-700">Default Constituency</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-surface-900">Last Sync</p>
              <p className="text-xs text-surface-500">Most recent data update</p>
            </div>
            <span className="text-sm text-surface-600">2 minutes ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
