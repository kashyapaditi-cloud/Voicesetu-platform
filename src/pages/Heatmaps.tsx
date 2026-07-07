import { motion } from 'framer-motion';
import { useState } from 'react';
import { Map, Layers, TrendingUp, AlertTriangle, Eye, BarChart3 } from 'lucide-react';
import { ConstituencyMap } from '../components/ConstituencyMap';
import { wards, submissions } from '../data/mockData';

type MetricType = 'population' | 'complaints' | 'infrastructure' | 'invisible';

const metricConfig: Record<MetricType, { label: string; icon: typeof Map; description: string }> = {
  population: {
    label: 'Population Density',
    icon: Layers,
    description: 'Ward population distribution across constituency'
  },
  complaints: {
    label: 'Citizen Complaints',
    icon: AlertTriangle,
    description: 'Volume of submissions by ward'
  },
  infrastructure: {
    label: 'Infrastructure Gaps',
    icon: TrendingUp,
    description: 'Critical infrastructure deficit scores'
  },
  invisible: {
    label: 'Invisible Citizens',
    icon: Eye,
    description: 'Underserved populations with low voice'
  },
};

export function Heatmaps() {
  const [activeMetric, setActiveMetric] = useState<MetricType>('infrastructure');
  const [selectedWardId, setSelectedWardId] = useState<number | null>(null);

  const selectedWard = wards.find(w => w.id === selectedWardId);
  const config = metricConfig[activeMetric];

  const getWardStats = (metric: MetricType) => {
    return wards.map(ward => ({
      ward,
      value: metric === 'population' ? ward.population :
             metric === 'complaints' ? ward.complaintVolume :
             metric === 'infrastructure' ? 100 - ward.infrastructureScore :
             ward.invisibleCitizens
    })).sort((a, b) => b.value - a.value);
  };

  const topWards = getWardStats(activeMetric).slice(0, 5);

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
              <Map className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">Spatial Heatmaps</h1>
              <p className="text-sm text-surface-500">Geographic visualization of constituency metrics</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-9 bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden"
        >
          <div className="p-4 border-b border-surface-100">
            <div className="flex items-center gap-4">
              {(Object.keys(metricConfig) as MetricType[]).map((metric) => {
                const Icon = metricConfig[metric].icon;
                return (
                  <button
                    key={metric}
                    onClick={() => setActiveMetric(metric)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                      activeMetric === metric
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-surface-500 hover:bg-surface-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{metricConfig[metric].label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-[calc(100vh-18rem)]">
            <ConstituencyMap
              wards={wards}
              selectedWardId={selectedWardId}
              onWardSelect={(ward) => setSelectedWardId(ward.id)}
              highlightMode={activeMetric}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-3 space-y-4"
        >
          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-1">{config.label}</h3>
            <p className="text-xs text-surface-500 mb-4">{config.description}</p>

            <div className="p-3 rounded-xl bg-primary-50 border border-primary-100 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-surface-600">Total Wards</span>
                <span className="text-sm font-bold text-primary-700">{wards.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-surface-600">Avg Score</span>
                <span className="text-sm font-bold text-primary-700">
                  {activeMetric === 'infrastructure'
                    ? (wards.reduce((s, w) => s + w.infrastructureScore, 0) / wards.length).toFixed(0)
                    : (wards.reduce((s, w) => s + (activeMetric === 'population' ? w.population : activeMetric === 'complaints' ? w.complaintVolume : w.invisibleCitizens), 0) / wards.length).toFixed(0)
                  }
                </span>
              </div>
            </div>

            <h4 className="text-xs font-medium text-surface-500 mb-2">Top 5 Wards</h4>
            <div className="space-y-2">
              {topWards.map((item, index) => (
                <motion.div
                  key={item.ward.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedWardId(item.ward.id)}
                  className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${
                    selectedWardId === item.ward.id
                      ? 'bg-primary-50 border border-primary-200'
                      : 'bg-surface-50 hover:bg-surface-100'
                  }`}
                >
                  <span className={`text-xs font-bold ${index === 0 ? 'text-critical-600' : index < 3 ? 'text-accent-600' : 'text-surface-600'}`}>
                    #{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-surface-900 truncate">{item.ward.name}</p>
                    <p className="text-xs text-surface-500">
                      {activeMetric === 'population' ? `${item.value.toLocaleString()} people` :
                       activeMetric === 'complaints' ? `${item.value} complaints` :
                       activeMetric === 'infrastructure' ? `${100 - item.value}% score` :
                       `${item.value} citizens`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedWard && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4"
            >
              <h3 className="text-sm font-semibold text-surface-900 mb-3">{selectedWard.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-50">
                  <span className="text-xs text-surface-600">Population</span>
                  <span className="text-sm font-bold text-surface-900">{selectedWard.population.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-50">
                  <span className="text-xs text-surface-600">Infrastructure Score</span>
                  <span className={`text-sm font-bold ${selectedWard.infrastructureScore < 60 ? 'text-critical-600' : 'text-surface-900'}`}>
                    {selectedWard.infrastructureScore}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-50">
                  <span className="text-xs text-surface-600">Complaints</span>
                  <span className="text-sm font-bold text-surface-900">{selectedWard.complaintVolume}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-critical-50">
                  <span className="text-xs text-surface-600">Invisible Citizens</span>
                  <span className="text-sm font-bold text-critical-600">{selectedWard.invisibleCitizens}</span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-3">Legend</h3>
            <div className="space-y-2">
              {[
                { color: 'bg-critical-500', label: 'Critical (70%+)' },
                { color: 'bg-accent-500', label: 'High (50-70%)' },
                { color: 'bg-secondary-500', label: 'Medium (30-50%)' },
                { color: 'bg-primary-300', label: 'Low (<30%)' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                  <span className="text-xs text-surface-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
