'use client';

interface ActivationCounterProps {
  className?: string;
}

export default function ActivationCounter({ className = '' }: ActivationCounterProps) {
  // Valores estáticos para evitar problemas de hidratación
  const activeUsers = 1547;
  const recentActivations = 23;
  const progressPercentage = Math.round((activeUsers / 2000) * 100);

  return (
    <div id="activation-counter" className={`bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gold mb-4">
          🚀 Usuarios Activándose Ahora
        </h3>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Usuarios Activos */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {activeUsers}
            </div>
            <p className="text-gray-300 text-sm">Usuarios Activos</p>
            <div className="flex items-center justify-center mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-green-400 text-xs">En línea</span>
            </div>
          </div>

          {/* Activaciones Recientes */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600/30">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {recentActivations}
            </div>
            <p className="text-gray-300 text-sm">Activaciones Hoy</p>
            <div className="flex items-center justify-center mt-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-blue-400 text-xs">En tiempo real</span>
            </div>
          </div>
        </div>

        {/* Barra de Progreso */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Meta: 2000 usuarios</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Mensaje de Urgencia */}
        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg p-3">
          <p className="text-yellow-400 text-sm font-semibold">
            ⚡ Últimas 24 horas: {recentActivations} personas se han activado
          </p>
        </div>

        {/* Indicador de Actividad */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < 3 ? 'bg-green-400' : 'bg-gray-600'
                } animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          <span className="text-green-400 text-sm font-medium">
            Alta actividad
          </span>
        </div>
      </div>
    </div>
  );
}
