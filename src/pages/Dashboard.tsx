import { motion } from 'framer-motion';
import { Users, GraduationCap, Activity, Route, MessageSquare, TrendingUp, IndianRupee } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { PriorityCard } from '../components/PriorityCard';
import { ConstituencyMap } from '../components/ConstituencyMap';
import { CONSTITUENCY_STATS, wards, priorities } from '../data/mockData';
import { useState } from 'react';

export function Dashboard() {
  const [selectedWardId, setSelectedWardId] = useState<number | null>(null);
  const [selectedPriorityId, setSelectedPriorityId] = useState<string | null>(null);

  const selectedPriority = priorities.find((p) => p.id === selectedPriorityId) || null;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Constituency Overview</h1>
          <p className="text-sm text-surface-500 mt-1">
            Real-time decision intelligence for public investment optimization
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-surface-200 shadow-soft">
            <div className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse" />
            <span className="text-sm font-medium text-surface-700">Live Data</span>
          </div>
          <div className="px-4 py-2 bg-white rounded-xl border border-surface-200 shadow-soft">
            <span className="text-xs text-surface-500">Last Updated:</span>
            <p className="text-sm font-medium text-surface-700">2 min ago</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Population"
          value={CONSTITUENCY_STATS.population}
          icon={Users}
          color="primary"
          format="compact"
          trend={{ value: 3.2, label: 'vs last year' }}
        />
        <StatCard
          title="Schools"
          value={CONSTITUENCY_STATS.schools}
          unit="total"
          icon={GraduationCap}
          color="accent"
        />
        <StatCard
          title="Hospitals"
          value={CONSTITUENCY_STATS.hospitals}
          unit="total"
          icon={Activity}
          color="critical"
        />
        <StatCard
          title="Road Projects"
          value={CONSTITUENCY_STATS.roadProjects}
          unit="active"
          icon={Route}
          color="secondary"
        />
        <StatCard
          title="Citizen Submissions"
          value={CONSTITUENCY_STATS.submissions}
          icon={MessageSquare}
          color="primary"
          format="compact"
          trend={{ value: 12.4, label: 'this month' }}
        />
        <StatCard
          title="Available Budget"
          value={CONSTITUENCY_STATS.availableBudget}
          unit="Cr"
          icon={IndianRupee}
          color="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-surface-200 shadow-soft p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-surface-900">Top Investment Priorities</h2>
                <p className="text-xs text-surface-500">AI-ranked by impact and citizen need</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-surface-500">Sort by:</span>
                <span className="text-xs font-medium text-primary-600 px-3 py-1 bg-primary-50 rounded-lg">
                  Impact Score
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {priorities.slice(0, 3).map((priority, index) => (
                <PriorityCard
                  key={priority.id}
                  priority={priority}
                  index={index}
                  isSelected={selectedPriorityId === priority.id}
                  onSelect={() => setSelectedPriorityId(priority.id)}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-surface-200 shadow-soft p-6"
          >
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Ward Comparison</h2>
            <div className="h-64">
              <ConstituencyMap
                wards={wards}
                selectedWardId={selectedWardId}
                onWardSelect={(ward) => setSelectedWardId(ward.id)}
                highlightMode="infrastructure"
              />
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-soft-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Top Recommendation</h3>
                <p className="text-xs text-primary-200">Highest impact opportunity</p>
              </div>
            </div>

            <h4 className="text-lg font-bold mb-2">Expand Government School</h4>
            <p className="text-sm text-primary-100 mb-4">Ward 6 - Critical infrastructure gap</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-xs text-primary-200">Citizens Benefited</p>
                <p className="text-xl font-bold">{(18430 / 1000).toFixed(1)}K</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-xs text-primary-200">ROI Projection</p>
                <p className="text-xl font-bold">4.2x</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-primary-200">AI Confidence</p>
                <p className="text-2xl font-bold">96%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-primary-200">Est. Cost</p>
                <p className="text-2xl font-bold"> 4.2 Cr</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-surface-200 shadow-soft p-5"
          >
            <h3 className="text-sm font-semibold text-surface-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'New submission cluster detected', time: '2 min ago', type: 'cluster' },
                { action: 'Infrastructure gap flagged - Ward 12', time: '15 min ago', type: 'alert' },
                { action: 'Budget optimization complete', time: '1 hr ago', type: 'success' },
                { action: 'Citizen voice map updated', time: '3 hrs ago', type: 'update' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-50 transition-colors">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.type === 'alert'
                        ? 'bg-critical-400'
                        : item.type === 'success'
                        ? 'bg-secondary-400'
                        : 'bg-primary-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-surface-700 truncate">{item.action}</p>
                    <p className="text-xs text-surface-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
