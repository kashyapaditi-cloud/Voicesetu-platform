import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, AlertTriangle, PieChart } from 'lucide-react';
import { priorities as initialPriorities } from '../data/mockData';
import type { Priority } from '../types';

interface BudgetSliderProps {
  budget: number;
  onBudgetChange: (budget: number) => void;
}

export function BudgetSlider({ budget, onBudgetChange }: BudgetSliderProps) {
  const [allocatedPriorities, setAllocatedPriorities] = useState<Priority[]>(initialPriorities);
  const totalNeeded = initialPriorities.reduce((sum, p) => sum + p.cost, 0);
  const maxBudget = 75;

  useEffect(() => {
    const sorted = [...initialPriorities].sort((a, b) => b.impactScore - a.impactScore);
    let remaining = budget;
    const allocated = sorted.map((p) => {
      if (remaining >= p.cost) {
        remaining -= p.cost;
        return { ...p, status: 'approved' as const };
      }
      return { ...p, status: 'pending' as const };
    });
    setAllocatedPriorities(allocated);
  }, [budget]);

  const approvedPriorityCosts = allocatedPriorities
    .filter((p) => p.status === 'approved')
    .reduce((sum, p) => sum + p.cost, 0);
  const affectedPopulation = allocatedPriorities
    .filter((p) => p.status === 'approved')
    .reduce((sum, p) => sum + p.citizensBenefited, 0);
  const utilization = ((approvedPriorityCosts / budget) * 100).toFixed(0);
  const shortfall = Math.max(0, totalNeeded - budget);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-surface-200 shadow-soft p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-surface-900">Budget Simulator</h3>
          <p className="text-sm text-surface-500">Adjust available funds to see optimal allocations</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold font-mono text-primary-600">
             {budget.toFixed(1)}
            <span className="text-lg text-surface-600 ml-1">Cr</span>
          </p>
          <p className="text-xs text-surface-500">Available Budget</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-surface-500"> {maxBudget.toFixed(1)} Cr</span>
          <span className="text-xs text-surface-500">Available range</span>
        </div>
        <div className="relative">
          <div className="h-3 bg-surface-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(budget / maxBudget) * 100}%` }}
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
            />
          </div>
          <input
            type="range"
            min="5"
            max={maxBudget}
            step="0.5"
            value={budget}
            onChange={(e) => onBudgetChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer"
          />
          <motion.div
            animate={{ left: `${(budget / maxBudget) * 100}%` }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-soft border-2 border-primary-500 pointer-events-none"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-surface-400"> 5.0 Cr (Minimum)</span>
          <span className="text-xs text-surface-400"> {maxBudget.toFixed(1)} Cr (Maximum)</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 rounded-xl bg-secondary-50 border border-secondary-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-secondary-600" />
            <span className="text-xs text-surface-600">Utilization</span>
          </div>
          <p className="text-xl font-bold text-secondary-700 font-mono">{utilization}%</p>
        </div>
        <div className="p-3 rounded-xl bg-primary-50 border border-primary-200">
          <div className="flex items-center gap-2 mb-1">
            <PieChart className="w-4 h-4 text-primary-600" />
            <span className="text-xs text-surface-600">Citizens Impacted</span>
          </div>
          <p className="text-xl font-bold text-primary-700 font-mono">
            {(affectedPopulation / 1000).toFixed(1)}K
          </p>
        </div>
        <div className="p-3 rounded-xl bg-accent-50 border border-accent-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-accent-600" />
            <span className="text-xs text-surface-600">Shortfall</span>
          </div>
          <p className="text-xl font-bold text-accent-700 font-mono">
             {shortfall.toFixed(1)} Cr
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-surface-500 mb-3">Priority Allocation Status</p>
        {allocatedPriorities.slice(0, 5).map((priority) => {
          const isApproved = priority.status === 'approved';
          return (
            <motion.div
              key={priority.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, backgroundColor: isApproved ? '#f0fdf4' : '#fef2f2' }}
              className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${
                isApproved ? 'border-secondary-200' : 'border-critical-200'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isApproved ? 'bg-secondary-100' : 'bg-surface-100'
                }`}
              >
                <span className="text-xs font-bold text-surface-600">
                   {priority.cost.toFixed(1)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-surface-900 truncate">{priority.title}</p>
                <p className="text-xs text-surface-500">{formatNumber(priority.citizensBenefited)} citizens</p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  isApproved
                    ? 'bg-secondary-100 text-secondary-700'
                    : 'bg-critical-100 text-critical-700'
                }`}
              >
                {isApproved ? 'Approved' : 'Deferred'}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function formatNumber(num: number): string {
  if (num >= 100000) {
    return (num / 100000).toFixed(1) + 'L';
  }
  return num.toLocaleString('en-IN');
}
