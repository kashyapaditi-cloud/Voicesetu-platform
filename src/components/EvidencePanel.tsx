import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageSquare, Building2, Users, IndianRupee, ChevronRight, AlertTriangle } from 'lucide-react';
import type { Priority } from '../types';

interface EvidencePanelProps {
  priority: Priority | null;
}

const evidenceIcons = {
  citizen_voice: MessageSquare,
  infrastructure: Building2,
  demographic: Users,
  budget: IndianRupee,
};

const evidenceColors = {
  citizen_voice: 'bg-primary-100 text-primary-600 border-primary-200',
  infrastructure: 'bg-secondary-100 text-secondary-600 border-secondary-200',
  demographic: 'bg-accent-100 text-accent-600 border-accent-200',
  budget: 'bg-surface-100 text-surface-600 border-surface-300',
};

export function EvidencePanel({ priority }: EvidencePanelProps) {
  const [activeTab, setActiveTab] = useState<'evidence' | 'tradeoffs'>('evidence');

  if (!priority) {
    return (
      <div className="h-full flex items-center justify-center bg-surface-50 rounded-2xl border border-surface-200">
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-surface-400" />
          </div>
          <p className="text-sm font-medium text-surface-600">Select a priority to view evidence</p>
          <p className="text-xs text-surface-400 mt-1">Click on any priority card to inspect</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl border border-surface-200 shadow-soft h-full flex flex-col"
    >
      <div className="p-4 border-b border-surface-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">Evidence Chain</span>
        </div>
        <h3 className="text-sm font-semibold text-surface-900 line-clamp-1">{priority.title}</h3>

        <div className="flex gap-1 mt-4 bg-surface-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'evidence'
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-surface-500 hover:text-surface-700'
            }`}
          >
            Evidence ({priority.evidence.length})
          </button>
          <button
            onClick={() => setActiveTab('tradeoffs')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'tradeoffs'
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-surface-500 hover:text-surface-700'
            }`}
          >
            Trade-offs ({priority.tradeoffs.length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'evidence' ? (
            <motion.div
              key="evidence"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-3"
            >
              {priority.evidence.map((evidence, index) => {
                const Icon = evidenceIcons[evidence.type];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-xl border ${evidenceColors[evidence.type]}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white/50">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-semibold text-surface-900">{evidence.title}</h4>
                          <span className="text-xs text-surface-500 font-medium">
                            {(evidence.weight * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-xs text-surface-600 mb-2">{evidence.description}</p>
                        <p className="text-xs text-surface-400">
                          <span className="font-medium">Source:</span> {evidence.source}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="tradeoffs"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-3"
            >
              {priority.tradeoffs.map((tradeoff, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-xl border border-accent-200 bg-accent-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent-100">
                      <AlertTriangle className="w-4 h-4 text-accent-600" />
                    </div>
                    <p className="text-xs text-surface-700 flex-1">{tradeoff}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-surface-100 bg-surface-50 rounded-b-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-surface-500">AI Confidence</p>
            <p className="text-lg font-bold text-secondary-600">{priority.aiConfidence}%</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-surface-500">Evidence Sources</p>
            <p className="text-lg font-bold text-surface-900">{priority.evidence.length}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
