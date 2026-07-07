import { motion } from 'framer-motion';
import { useState } from 'react';
import { Database, Building2, Users, Activity, Zap, Droplet, HeartPulse, School, Route, Trash2 } from 'lucide-react';
import { ConstituencyMap } from '../components/ConstituencyMap';
import { wards, infrastructure } from '../data/mockData';

const infraTypes = [
  { type: 'school', label: 'Schools', icon: School, color: 'primary' },
  { type: 'hospital', label: 'Healthcare', icon: HeartPulse, color: 'critical' },
  { type: 'water_supply', label: 'Water Supply', icon: Droplet, color: 'secondary' },
  { type: 'road', label: 'Roads', icon: Road, color: 'accent' },
  { type: 'power', label: 'Power', icon: Zap, color: 'primary' },
  { type: 'sanitation', label: 'Sanitation', icon: Trash2, color: 'accent' },
];

const statusConfig = {
  adequate: { color: 'bg-secondary-500', label: 'Adequate', textColor: 'text-secondary-700' },
  stressed: { color: 'bg-accent-500', label: 'Stressed', textColor: 'text-accent-700' },
  critical: { color: 'bg-critical-500', label: 'Critical', textColor: 'text-critical-700' },
};

export function DigitalTwin() {
  const [selectedType, setSelectedType] = useState<string>('school');
  const [selectedWardId, setSelectedWardId] = useState<number | null>(null);

  const filteredInfra = infrastructure.filter(i => i.type === selectedType);
  const criticalInfra = infrastructure.filter(i => i.status === 'critical');
  const stressedInfra = infrastructure.filter(i => i.status === 'stressed');

  const selectedWard = wards.find(w => w.id === selectedWardId);
  const wardInfra = infrastructure.filter(i => i.wardId === selectedWardId);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">Digital Twin</h1>
              <p className="text-sm text-surface-500">Real-time infrastructure monitoring</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-critical-50 border border-critical-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-critical-500" />
            <span className="text-xs font-medium text-critical-700">{criticalInfra.length} Critical</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-accent-50 border border-accent-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-500" />
            <span className="text-xs font-medium text-accent-700">{stressedInfra.length} Stressed</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-secondary-50 border border-secondary-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary-500" />
            <span className="text-xs font-medium text-secondary-700">{infrastructure.filter(i => i.status === 'adequate').length} Adequate</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-9 bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden"
        >
          <div className="p-4 border-b border-surface-100">
            <div className="flex items-center gap-2">
              {infraTypes.map((config) => {
                const Icon = config.icon;
                const isActive = selectedType === config.type;
                const count = infrastructure.filter(i => i.type === config.type).length;
                const criticalCount = infrastructure.filter(i => i.type === config.type && i.status === 'critical').length;

                return (
                  <button
                    key={config.type}
                    onClick={() => setSelectedType(config.type)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                      isActive
                        ? `bg-${config.color}-100 text-${config.color}-700 border border-${config.color}-200`
                        : 'text-surface-500 hover:bg-surface-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{config.label}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-surface-200 text-surface-600">{count}</span>
                    {criticalCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-critical-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-surface-200">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-surface-900">Infrastructure Map</h3>
                <span className="text-xs text-surface-500">Select ward for details</span>
              </div>
              <div className="h-80 rounded-xl overflow-hidden bg-surface-50">
                <ConstituencyMap
                  wards={wards}
                  selectedWardId={selectedWardId}
                  onWardSelect={(w) => setSelectedWardId(w.id)}
                  highlightMode="infrastructure"
                />
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-semibold text-surface-900 mb-4">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1).replace('_', ' ')} Assets
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {filteredInfra.map((asset, index) => {
                  const config = statusConfig[asset.status];
                  return (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-3 rounded-xl border ${
                        asset.status === 'critical'
                          ? 'border-critical-200 bg-critical-50'
                          : asset.status === 'stressed'
                          ? 'border-accent-200 bg-accent-50'
                          : 'border-surface-200 bg-surface-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-surface-900">{asset.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${config.color} text-white`}>
                          {config.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-surface-500">Capacity:</span>
                          <span className="text-xs font-semibold text-surface-700">{asset.capacity}%</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-surface-500">Utilization:</span>
                          <span className={`text-xs font-semibold ${
                            asset.utilization > 100 ? 'text-critical-600' : 'text-surface-700'
                          }`}>
                            {asset.utilization}%
                          </span>
                        </div>
                        {asset.gap > 0 && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-surface-500">Gap:</span>
                            <span className="text-xs font-semibold text-critical-600">{asset.gap}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 h-1.5 bg-surface-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            asset.utilization > 120 ? 'bg-critical-500' :
                            asset.utilization > 100 ? 'bg-accent-500' : 'bg-secondary-500'
                          }`}
                          style={{ width: `${Math.min(asset.utilization, 150) / 1.5}%` }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-3 space-y-4"
        >
          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-4">System Health</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary-500" />
                  <span className="text-sm text-surface-600">Operating Normal</span>
                </div>
                <span className="text-sm font-bold text-surface-900">
                  {infrastructure.filter(i => i.status === 'adequate').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-500" />
                  <span className="text-sm text-surface-600">Under Strain</span>
                </div>
                <span className="text-sm font-bold text-accent-700">{stressedInfra.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-critical-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-critical-500" />
                  <span className="text-sm text-surface-600">Critical Intervention</span>
                </div>
                <span className="text-sm font-bold text-critical-700">{criticalInfra.length}</span>
              </div>
            </div>
          </div>

          {selectedWard && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4"
            >
              <h3 className="text-sm font-semibold text-surface-900 mb-3">{selectedWard.name}</h3>
              <div className="space-y-2">
                {wardInfra.length > 0 ? wardInfra.map((infra) => {
                  const config = statusConfig[infra.status];
                  return (
                    <div key={infra.id} className="p-2.5 rounded-lg bg-surface-50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-surface-700">{infra.name}</span>
                        <span className={`text-xs ${config.textColor}`}>{config.label}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-surface-500">
                        <span>Util: {infra.utilization}%</span>
                        {infra.gap > 0 && <span className="text-critical-500">Gap: {infra.gap}</span>}
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-xs text-surface-500 text-center py-4">
                    No {selectedType.replace('_', ' ')} infrastructure in this ward
                  </p>
                )}
              </div>
            </motion.div>
          )}

          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5" />
              <h3 className="text-sm font-semibold">Live Monitoring</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary-200">Data Points/sec</span>
                <span className="text-sm font-bold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary-200">Sensor Coverage</span>
                <span className="text-sm font-bold">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary-200">Anomaly Alerts</span>
                <span className="text-sm font-bold">3</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
