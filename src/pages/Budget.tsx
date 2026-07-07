import { motion } from 'framer-motion';
import { useState } from 'react';
import { IndianRupee, PieChart, BarChart3, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BudgetSlider } from '../components/BudgetSlider';
import { ConstituencyMap } from '../components/ConstituencyMap';
import { PriorityCard } from '../components/PriorityCard';
import { wards, priorities } from '../data/mockData';

export function BudgetSimulator() {
  const [budget, setBudget] = useState(15.8);
  const [selectedWardId, setSelectedWardId] = useState<number | null>(null);

  const totalNeeded = priorities.reduce((s, p) => s + p.cost, 0);
  const shortfall = Math.max(0, totalNeeded - budget);

  const getApprovedPriorities = () => {
    const sorted = [...priorities].sort((a, b) => b.impactScore - a.impactScore);
    let remaining = budget;
    return sorted.map(p => {
      if (remaining >= p.cost) {
        remaining -= p.cost;
        return { ...p, isApproved: true };
      }
      return { ...p, isApproved: false };
    });
  };

  const approvedPriorities = getApprovedPriorities();
  const approvedCost = approvedPriorities.filter(p => p.isApproved).reduce((s, p) => s + p.cost, 0);
  const affectedCitizens = approvedPriorities.filter(p => p.isApproved).reduce((s, p) => s + p.citizensBenefited, 0);

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
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">Budget Simulator</h1>
              <p className="text-sm text-surface-500">Interactive allocation optimization</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-critical-50 rounded-xl border border-critical-200">
            <span className="text-xs text-critical-600">Total Required: </span>
            <span className="text-sm font-bold text-critical-700">{totalNeeded.toFixed(1)} Cr</span>
          </div>
          <div className="px-4 py-2 bg-secondary-50 rounded-xl border border-secondary-200">
            <span className="text-xs text-secondary-600">Current Shortfall: </span>
            <span className="text-sm font-bold text-secondary-700"> {shortfall.toFixed(1)} Cr</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-8 space-y-4"
        >
          <BudgetSlider budget={budget} onBudgetChange={setBudget} />

          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-900">Prioritization Results</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-surface-500">Allocated:</span>
                <span className="text-sm font-bold text-primary-600">{approvedPriorities.filter(p => p.isApproved).length}/{priorities.length}</span>
              </div>
            </div>

            <div className="space-y-3">
              {approvedPriorities.map((priority, index) => (
                <motion.div
                  key={priority.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border transition-all ${
                    priority.isApproved
                      ? 'bg-secondary-50 border-secondary-200'
                      : 'bg-surface-50 border-surface-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        priority.isApproved ? 'bg-secondary-100' : 'bg-surface-200'
                      }`}>
                        {priority.isApproved ? (
                          <CheckCircle2 className="w-4 h-4 text-secondary-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-surface-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-surface-900">{priority.title}</p>
                        <p className="text-xs text-surface-500">Ward {priority.wardId} | {priority.citizensBenefited.toLocaleString()} citizens</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${priority.isApproved ? 'text-secondary-600' : 'text-surface-400'}`}>
                         {priority.cost.toFixed(1)} Cr
                      </p>
                      <p className="text-xs text-surface-500">Impact: {priority.impactScore}/100</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-4 space-y-4"
        >
          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-5">
            <h3 className="text-sm font-semibold text-surface-900 mb-4">Allocation Summary</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-secondary-50 to-secondary-100 border border-secondary-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-secondary-700">Budget Utilization</span>
                  <span className="text-xl font-bold text-secondary-700 font-mono">
                    {((approvedCost / budget) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(approvedCost / budget) * 100}%` }}
                    className="h-full bg-secondary-500 rounded-full"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
                <div className="flex items-center gap-2 mb-2">
                  <PieChart className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-primary-700">Total Impact</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary-700 font-mono">
                    {(affectedCitizens / 1000).toFixed(1)}K
                  </span>
                  <span className="text-sm text-primary-600">citizens</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-accent-600" />
                  <span className="text-sm text-accent-700">ROI Projection</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-accent-700 font-mono">3.4x</span>
                  <span className="text-sm text-accent-600">5-year return</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-3">Ward Distribution Map</h3>
            <div className="h-48 rounded-xl overflow-hidden">
              <ConstituencyMap
                wards={wards}
                selectedWardId={selectedWardId}
                onWardSelect={(w) => setSelectedWardId(w.id)}
                highlightMode="complaints"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5" />
              <h3 className="text-sm font-semibold">Budget Simulation Insights</h3>
            </div>
            <p className="text-xs text-primary-100 leading-relaxed">
              The optimizer has allocated funds to maximize citizen impact within budget constraints.
              Increasing budget by {shortfall > 0 ? `${shortfall.toFixed(1)} Cr` : '0'} fully funds all critical priorities.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
