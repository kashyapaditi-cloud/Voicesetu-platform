import { motion } from 'framer-motion';
import { MessageSquare, Layers, Eye, IndianRupee, Languages, AlertTriangle } from 'lucide-react';
import { AIChat } from '../components/AIChat';
import { ConstituencyMap } from '../components/ConstituencyMap';
import { submissions, wards } from '../data/mockData';
import { useState } from 'react';

const crossLingualClusters = [
  {
    id: 'c1',
    title: 'Water Infrastructure',
    english: 'No water supply in our area for past 3 weeks',
    hindi: 'पानी नहीं आ रहा है हमारे इलाके में',
    similarity: 0.94,
    count: 892,
    wardId: 6,
  },
  {
    id: 'c2',
    title: 'Education Infrastructure',
    english: 'School building is too small for all children',
    hindi: 'स्कूल में जगह नहीं है बच्चों के लिए',
    similarity: 0.91,
    count: 423,
    wardId: 6,
  },
  {
    id: 'c3',
    title: 'Power Supply',
    english: 'Frequent power cuts daily',
    hindi: 'बिजली कटती रहती है रोज़',
    similarity: 0.96,
    count: 156,
    wardId: 3,
  },
];

export function AIAssistant() {
  const [selectedWardId, setSelectedWardId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'clustering' | 'invisible'>('chat');

  const invisibleWards = wards.filter(w => w.invisibleCitizens > 50).sort((a, b) => b.invisibleCitizens - a.invisibleCitizens);

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
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-surface-900">AI Assistant</h1>
              <p className="text-sm text-surface-500">Policy analysis and citizen voice intelligence</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white rounded-xl border border-surface-200 p-1">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'chat'
                ? 'bg-primary-50 text-primary-700'
                : 'text-surface-500 hover:bg-surface-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
          <button
            onClick={() => setActiveTab('clustering')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'clustering'
                ? 'bg-primary-50 text-primary-700'
                : 'text-surface-500 hover:bg-surface-50'
            }`}
          >
            <Languages className="w-4 h-4" />
            Clustering
          </button>
          <button
            onClick={() => setActiveTab('invisible')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'invisible'
                ? 'bg-primary-50 text-primary-700'
                : 'text-surface-500 hover:bg-surface-50'
            }`}
          >
            <Eye className="w-4 h-4" />
            Invisible Citizens
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-4" style={{ height: 'calc(100vh - 12rem)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-8"
        >
          {activeTab === 'chat' && <AIChat />}

          {activeTab === 'clustering' && (
            <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-6 h-full overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-surface-900">Cross-Lingual Issue Clustering</h2>
                  <p className="text-sm text-surface-500">Semantic analysis across 12 languages</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-surface-500">Accuracy:</span>
                  <span className="text-sm font-bold text-secondary-600">95%</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4">
                {crossLingualClusters.map((cluster, index) => (
                  <motion.div
                    key={cluster.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl border border-surface-200 bg-surface-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-surface-900">{cluster.title}</h3>
                          <p className="text-xs text-surface-500">Ward {cluster.wardId} | {cluster.count} submissions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-surface-500">Semantic Similarity</p>
                        <p className="text-lg font-bold text-secondary-600">{(cluster.similarity * 100).toFixed(0)}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-white border border-surface-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700">English</span>
                        </div>
                        <p className="text-xs text-surface-700">{cluster.english}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-surface-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent-100 text-accent-700">Hindi</span>
                        </div>
                        <p className="text-xs text-surface-700">{cluster.hindi}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-surface-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-secondary-500 rounded-full"
                            style={{ width: `${cluster.similarity * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-surface-500">Match confidence</span>
                      </div>
                      <span className="text-xs text-primary-600 font-medium cursor-pointer hover:underline">
                        View all {cluster.count} submissions
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'invisible' && (
            <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-6 h-full overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-surface-900">Invisible Citizens Engine</h2>
                  <p className="text-sm text-surface-500">Underserved populations with low voice volume</p>
                </div>
                <div className="px-3 py-1.5 bg-critical-50 rounded-lg border border-critical-200">
                  <span className="text-xs font-medium text-critical-700">
                    {wards.reduce((s, w) => s + w.invisibleCitizens, 0)} citizens identified
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3">
                {invisibleWards.map((ward, index) => (
                  <motion.div
                    key={ward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl border border-critical-200 bg-critical-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-critical-100 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-critical-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-surface-900">{ward.name}</h3>
                          <p className="text-xs text-surface-500">Infrastructure Score: {ward.infrastructureScore}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-critical-600">{ward.invisibleCitizens}</p>
                        <p className="text-xs text-surface-500">invisible citizens</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-accent-600" />
                        <span className="text-xs text-surface-600">
                          {ward.invisibleCitizens > 150
                            ? 'Remote location with poor digital connectivity'
                            : ward.invisibleCitizens > 100
                            ? 'Elderly population with technology barriers'
                            : 'Seasonal migration affecting reporting'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-3.5 h-3.5 text-primary-600" />
                        <span className="text-xs text-surface-600">
                          Recommended: {ward.invisibleCitizens > 150 ? 'Mobile registration units + weekly visits' : 'Door-to-door surveys + community champions'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="p-2 rounded-lg bg-white border border-surface-200">
                        <p className="text-xs text-surface-500">Pop</p>
                        <p className="text-sm font-semibold text-surface-900">{(ward.population / 1000).toFixed(1)}K</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-surface-200">
                        <p className="text-xs text-surface-500">Complaints</p>
                        <p className="text-sm font-semibold text-surface-900">{ward.complaintVolume}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-surface-200">
                        <p className="text-xs text-surface-500">Infra Gap</p>
                        <p className="text-sm font-semibold text-critical-600">{100 - ward.infrastructureScore}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <h4 className="text-sm font-semibold mb-2">Key Insight</h4>
                <p className="text-xs text-primary-100">
                  Wards with invisible citizens have 2.3x higher infrastructure deficit scores.
                  Addressing these populations can unlock significant ROI on public investment.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-4 space-y-4"
        >
          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft overflow-hidden h-72">
            <div className="p-3 border-b border-surface-100">
              <h3 className="text-xs font-semibold text-surface-900">Invisible Citizens Map</h3>
            </div>
            <div className="h-[calc(100%-40px)]">
              <ConstituencyMap
                wards={wards}
                selectedWardId={selectedWardId}
                onWardSelect={(w) => setSelectedWardId(w.id)}
                highlightMode="invisible"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-3">Processing Pipeline</h3>
            <div className="space-y-2">
              {[
                { label: 'Voice Collection', value: '3,248', status: 'active' },
                { label: 'Language Detection', value: '12 languages', status: 'active' },
                { label: 'Semantic Clustering', value: '47 clusters', status: 'active' },
                { label: 'Invisible Detection', value: '723 citizens', status: 'active' },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-surface-50"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
                    <span className="text-xs text-surface-700">{step.label}</span>
                  </div>
                  <span className="text-xs font-medium text-primary-600">{step.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-surface-200 shadow-soft p-4">
            <h3 className="text-sm font-semibold text-surface-900 mb-3">Voice Analysis Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-surface-50">
                <p className="text-xs text-surface-500">Today</p>
                <p className="text-lg font-bold text-surface-900">147</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-50">
                <p className="text-xs text-surface-500">This Week</p>
                <p className="text-lg font-bold text-surface-900">892</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-50">
                <p className="text-xs text-surface-500">Sentiment</p>
                <p className="text-lg font-bold text-accent-600">-0.42</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-50">
                <p className="text-xs text-surface-500">Response Rate</p>
                <p className="text-lg font-bold text-secondary-600">78%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
