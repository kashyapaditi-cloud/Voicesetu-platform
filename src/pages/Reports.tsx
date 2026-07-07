import { motion } from 'framer-motion';
import { BarChart3, Download, Filter, Calendar, TrendingUp, Users, IndianRupee, MapPin } from 'lucide-react';
import { priorities, CONSTITUENCY_STATS, wards } from '../data/mockData';

export function Reports() {
  const totalInvestment = priorities.reduce((s, p) => s + p.cost, 0);
  const totalBeneficiaries = priorities.reduce((s, p) => s + p.citizensBenefited, 0);
  const avgConfidence = priorities.reduce((s, p) => s + p.aiConfidence, 0) / priorities.length;

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
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">Reports & Analytics</h1>
              <p className="text-sm text-surface-500">Investment impact and decision intelligence</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-100 rounded-xl border border-surface-200 text-surface-700 hover:bg-surface-200 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 rounded-xl text-white hover:bg-primary-600 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export Report</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Investment Value', value: totalInvestment, unit: 'Cr', icon: IndianRupee, color: 'primary' },
          { label: 'Citizens Impacted', value: (totalBeneficiaries / 1000).toFixed(1), unit: 'K', icon: Users, color: 'secondary' },
          { label: 'Avg AI Confidence', value: avgConfidence.toFixed(0), unit: '%', icon: TrendingUp, color: 'accent' },
          { label: 'Wards Covered', value: new Set(priorities.map(p => p.wardId)).size, unit: '', icon: MapPin, color: 'primary' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-surface-200 shadow-soft p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
            </div>
            <p className="text-xs text-surface-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-surface-900 font-mono">
               {stat.value}{stat.unit}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-8 bg-white rounded-2xl border border-surface-200 shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-surface-900">Priority Performance Summary</h2>
              <p className="text-sm text-surface-500">Investment recommendations with projected impact</p>
            </div>
          </div>

          <div className="space-y-4">
            {priorities.map((priority, index) => (
              <motion.div
                key={priority.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl border border-surface-200 bg-surface-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-surface-400">#{index + 1}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-surface-900">{priority.title}</h3>
                      <p className="text-xs text-surface-500">Ward {priority.wardId}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    priority.status === 'approved' ? 'bg-secondary-100 text-secondary-700' :
                    priority.status === 'under_review' ? 'bg-primary-100 text-primary-700' :
                    'bg-surface-100 text-surface-600'
                  }`}>
                    {priority.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-surface-500">Cost</p>
                    <p className="text-sm font-bold text-primary-600"> {priority.cost.toFixed(1)} Cr</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Citizens</p>
                    <p className="text-sm font-bold text-surface-900">{priority.citizensBenefited.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Impact Score</p>
                    <p className="text-sm font-bold text-surface-900">{priority.impactScore}/100</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">AI Confidence</p>
                    <p className="text-sm font-bold text-secondary-600">{priority.aiConfidence}%</p>
                  </div>
                </div>

                <div className="mt-3 h-2 bg-surface-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${priority.impactScore}%` }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-4 space-y-4"
        >
          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(
                priorities.reduce((acc, p) => {
                  acc[p.category] = (acc[p.category] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-xs text-surface-600 capitalize">{category.replace('_', ' ')}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-surface-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${(count / priorities.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-surface-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-4">Ward Impact</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {wards.sort((a, b) => (b.complaintVolume - a.complaintVolume)).slice(0, 6).map((ward) => (
                <div key={ward.id} className="flex items-center justify-between p-2 rounded-lg bg-surface-50">
                  <div>
                    <p className="text-xs font-medium text-surface-900">Ward {ward.id}</p>
                    <p className="text-xs text-surface-500">{ward.name.split('-')[1]?.trim()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-surface-900">{ward.complaintVolume}</p>
                    <p className="text-xs text-surface-500">voices</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-5 text-white">
            <h3 className="text-sm font-semibold mb-2">ROI Summary</h3>
            <p className="text-2xl font-bold mb-1">3.4x</p>
            <p className="text-xs text-primary-100">
              Projected 5-year return on public investment across all approved priorities
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
