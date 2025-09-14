'use client';

import { useState } from 'react';
import { Brain, Bot, Zap, BarChart3 } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

export default function Tabs({ tabs = [], defaultTab, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTabData && (
          <div className="animate-fadeIn">
            {activeTabData.content}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente específico para las pestañas de GanaFácil en inglés
export function GanaFacilTabsEn({ className = '' }: { className?: string }) {
  const tabs: Tab[] = [
    {
      id: 'predictive',
      label: 'Predictive Analysis',
      icon: <Brain className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Anbel AI Algorithm</h3>
            <p className="text-gray-700 mb-4">
              Our artificial intelligence system analyzes thousands of historical draws 
              to identify hidden patterns and trends.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Number Frequency</h4>
                <p className="text-sm text-gray-600">Historical appearance analysis</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Temporal Patterns</h4>
                <p className="text-sm text-gray-600">Cycle identification</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Probabilities</h4>
                <p className="text-sm text-gray-600">Advanced statistical calculation</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommended Numbers</h4>
            <div className="grid grid-cols-6 gap-3">
              {[7, 14, 23, 31, 42, 8].map((num, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 text-center py-2 px-3 rounded-lg font-bold">
                  {num}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              * Based on analysis of the last 100 draws
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'assistant',
      label: 'Anbel AI Assistant',
      icon: <Bot className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligent Chat</h3>
            <p className="text-gray-700 mb-4">
              Chat with our AI assistant that will guide you and answer your questions 
              about predictions and strategies.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                  <p>How does the Anbel algorithm work?</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs">
                  <p>Anbel uses 4 integrated algorithms that analyze historical patterns, 
                  number frequencies and temporal trends to generate predictions 
                  with 94.5% accuracy.</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                  <p>What are the best numbers for today?</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs">
                  <p>Based on current analysis, I recommend: 7, 14, 23, 31, 42, 8. 
                  These numbers have the highest probability of appearing according to our algorithms.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> To access the complete chat and ask personalized questions, 
                register on our platform.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'realtime',
      label: 'Real Time',
      icon: <Zap className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Live Updates</h3>
            <p className="text-gray-700 mb-4">
              Get instant updated predictions with the latest draw data 
              and real-time analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Last Draw</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Winning numbers:</span>
                  <div className="flex gap-2">
                    {[3, 17, 25, 38, 44, 12].map((num, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">Today, 3:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Anbel Accuracy:</span>
                  <span className="text-green-600 font-bold">4/6 numbers</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Next Predictions</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next draw:</span>
                  <span className="font-medium">In 2 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hot numbers:</span>
                  <div className="flex gap-1">
                    {[7, 14, 23].map((num, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Confidence:</span>
                  <span className="text-green-600 font-bold">94.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      label: 'Statistics',
      icon: <BarChart3 className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Analysis</h3>
            <p className="text-gray-700 mb-4">
              View detailed statistics, historical trends and performance metrics 
              from our predictions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">94.5%</div>
              <div className="text-sm text-gray-600">Overall Accuracy</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,240+</div>
              <div className="text-sm text-gray-600">Successful Predictions</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
              <div className="text-sm text-gray-600">Active Algorithms</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trends</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Most frequent number:</span>
                <span className="font-bold text-blue-600">7 (appeared 8 times)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Least frequent number:</span>
                <span className="font-bold text-red-600">1 (appeared 1 time)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Best number range:</span>
                <span className="font-bold text-green-600">20-30 (35% of appearances)</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return <Tabs tabs={tabs} defaultTab="predictive" className={className} />;
}
