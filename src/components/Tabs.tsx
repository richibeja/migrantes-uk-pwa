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

// Componente específico para las pestañas de GanaFácil
export function GanaFacilTabs({ className = '' }: { className?: string }) {
  const tabs: Tab[] = [
    {
      id: 'predictive',
      label: 'Análisis Predictivo',
      icon: <Brain className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Algoritmo Anbel IA</h3>
            <p className="text-gray-700 mb-4">
              Nuestro sistema de inteligencia artificial analiza miles de sorteos históricos 
              para identificar patrones y tendencias ocultas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Frecuencia de Números</h4>
                <p className="text-sm text-gray-600">Análisis de aparición histórica</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Patrones Temporales</h4>
                <p className="text-sm text-gray-600">Identificación de ciclos</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Probabilidades</h4>
                <p className="text-sm text-gray-600">Cálculo estadístico avanzado</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Números Recomendados</h4>
            <div className="grid grid-cols-6 gap-3">
              {[7, 14, 23, 31, 42, 8].map((num, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 text-center py-2 px-3 rounded-lg font-bold">
                  {num}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              * Basado en análisis de los últimos 100 sorteos
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'assistant',
      label: 'Asistente Anbel IA',
      icon: <Bot className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Chat Inteligente</h3>
            <p className="text-gray-700 mb-4">
              Conversa con nuestro asistente IA que te guiará y responderá tus preguntas 
              sobre predicciones y estrategias.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                  <p>¿Cómo funciona el algoritmo Anbel?</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs">
                  <p>Anbel utiliza 4 algoritmos integrados que analizan patrones históricos, 
                  frecuencias de números y tendencias temporales para generar predicciones 
                  con 94.5% de precisión.</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                  <p>¿Cuáles son los mejores números para hoy?</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs">
                  <p>Basado en el análisis actual, te recomiendo: 7, 14, 23, 31, 42, 8. 
                  Estos números tienen la mayor probabilidad de aparición según nuestros algoritmos.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Nota:</strong> Para acceder al chat completo y hacer preguntas personalizadas, 
                regístrate en nuestra plataforma.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'realtime',
      label: 'Tiempo Real',
      icon: <Zap className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Actualizaciones en Vivo</h3>
            <p className="text-gray-700 mb-4">
              Obtén predicciones actualizadas al instante con los últimos datos de sorteos 
              y análisis en tiempo real.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Último Sorteo</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Números ganadores:</span>
                  <div className="flex gap-2">
                    {[3, 17, 25, 38, 44, 12].map((num, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-medium">Hoy, 15:30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Precisión Anbel:</span>
                  <span className="text-green-600 font-bold">4/6 números</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Próximas Predicciones</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sorteo siguiente:</span>
                  <span className="font-medium">En 2 horas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Números calientes:</span>
                  <div className="flex gap-1">
                    {[7, 14, 23].map((num, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Confianza:</span>
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
      label: 'Estadísticas',
      icon: <BarChart3 className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Análisis Detallado</h3>
            <p className="text-gray-700 mb-4">
              Visualiza estadísticas detalladas, tendencias históricas y métricas de rendimiento 
              de nuestras predicciones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">94.5%</div>
              <div className="text-sm text-gray-600">Precisión General</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,240+</div>
              <div className="text-sm text-gray-600">Predicciones Exitosas</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
              <div className="text-sm text-gray-600">Algoritmos Activos</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Satisfacción</div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Tendencias de la Semana</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Número más frecuente:</span>
                <span className="font-bold text-blue-600">7 (apareció 8 veces)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Número menos frecuente:</span>
                <span className="font-bold text-red-600">1 (apareció 1 vez)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mejor rango de números:</span>
                <span className="font-bold text-green-600">20-30 (35% de apariciones)</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return <Tabs tabs={tabs} defaultTab="predictive" className={className} />;
}
