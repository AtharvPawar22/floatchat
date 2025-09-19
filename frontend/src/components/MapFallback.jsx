import React, { useState, useEffect } from 'react';
import { mockFloats } from '../data/mockData';

const MapFallback = ({ selectedFloat, onFloatSelect, showTrajectories = false, realTimeMode = true }) => {
  const [animatedFloats, setAnimatedFloats] = useState(mockFloats);

  useEffect(() => {
    if (!realTimeMode) return;

    const interval = setInterval(() => {
      setAnimatedFloats(prev => prev.map(float => ({
        ...float,
        // Slight position animation for real-time effect
        animationOffset: {
          x: Math.sin(Date.now() * 0.001 + parseFloat(float.id.slice(-1))) * 0.5,
          y: Math.cos(Date.now() * 0.0008 + parseFloat(float.id.slice(-1))) * 0.3
        }
      })));
    }, 100);

    return () => clearInterval(interval);
  }, [realTimeMode]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Enhanced ocean background with layers */}
      <div className="absolute inset-0">
        {/* Base ocean layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900" />
        
        {/* Depth layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/40 to-blue-900/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-800/30" />
        
        {/* Animated water surface effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse" 
               style={{ animationDuration: '4s' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent animate-pulse" 
               style={{ animationDuration: '6s', animationDelay: '2s' }} />
        </div>
      </div>
      
      {/* Enhanced grid lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
            style={{ 
              top: `${(i + 1) * 10}%`,
              opacity: 0.3 + Math.sin(Date.now() * 0.002 + i) * 0.2
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
            style={{ 
              left: `${(i + 1) * 8.33}%`,
              opacity: 0.2 + Math.sin(Date.now() * 0.0015 + i) * 0.15
            }}
          />
        ))}
      </div>
      
      {/* Enhanced continent shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* North America */}
        <div className="absolute top-[15%] left-[10%] w-40 h-32 bg-gradient-to-br from-green-700/40 to-green-800/50 rounded-2xl transform rotate-12 border border-green-600/20" />
        <div className="absolute top-[18%] left-[13%] w-12 h-8 bg-green-600/30 rounded-lg transform rotate-12" />
        
        {/* Europe/Africa */}
        <div className="absolute top-[25%] right-[15%] w-32 h-28 bg-gradient-to-br from-green-700/40 to-green-800/50 rounded-xl transform -rotate-6 border border-green-600/20" />
        <div className="absolute top-[45%] right-[18%] w-28 h-24 bg-gradient-to-br from-orange-800/30 to-yellow-800/40 rounded-lg transform rotate-3 border border-orange-600/20" />
        
        {/* South America */}
        <div className="absolute bottom-[20%] left-[20%] w-24 h-40 bg-gradient-to-br from-green-700/40 to-green-800/50 rounded-2xl transform rotate-6 border border-green-600/20" />
        
        {/* Asia/Australia */}
        <div className="absolute top-[30%] right-[25%] w-36 h-20 bg-gradient-to-br from-green-700/40 to-green-800/50 rounded-xl transform rotate-12 border border-green-600/20" />
        <div className="absolute bottom-[30%] right-[10%] w-28 h-18 bg-gradient-to-br from-orange-700/40 to-red-800/30 rounded-xl transform -rotate-3 border border-orange-600/20" />
      </div>
      
      {/* Float markers with enhanced effects */}
      {animatedFloats.map((float, index) => {
        const baseX = (index * 12 + 15) % 75;
        const baseY = (index * 18 + 20) % 65;
        
        // Apply animation offset if in real-time mode
        const x = baseX + (realTimeMode && float.animationOffset ? float.animationOffset.x : 0);
        const y = baseY + (realTimeMode && float.animationOffset ? float.animationOffset.y : 0);
        
        const isSelected = selectedFloat?.id === float.id;
        const isWarning = float.status === 'warning';
        
        return (
          <div key={float.id} className="absolute z-10">
            {/* Trajectory path */}
            {showTrajectories && isSelected && (
              <svg className="absolute pointer-events-none" width="200" height="200" 
                   style={{ left: `${x - 5}%`, top: `${y - 5}%` }}>
                <path
                  d={`M 20 20 Q 40 10 60 25 T 100 30 Q 120 35 140 25`}
                  stroke="#ff6b35"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              </svg>
            )}
            
            {/* Glow effect */}
            <div
              className={`absolute w-8 h-8 rounded-full blur-sm ${
                isSelected ? 'bg-green-400/50' : isWarning ? 'bg-yellow-400/50' : 'bg-cyan-400/50'
              } animate-ping`}
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                animationDuration: isSelected ? '1s' : '2s'
              }}
            />
            
            {/* Ripple effect */}
            <div
              className={`absolute w-12 h-12 rounded-full border-2 ${
                isSelected ? 'border-green-400/30' : isWarning ? 'border-yellow-400/30' : 'border-cyan-400/30'
              } animate-ping`}
              style={{ 
                left: `${x - 1}%`, 
                top: `${y - 1}%`,
                animationDuration: '3s',
                animationDelay: '0.5s'
              }}
            />
            
            {/* Main float marker */}
            <button
              onClick={() => onFloatSelect(float)}
              className={`absolute w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-150 z-20 ${
                isSelected
                  ? 'bg-green-400 border-green-300 shadow-lg shadow-green-400/50 animate-pulse'
                  : isWarning
                  ? 'bg-yellow-400 border-yellow-300 shadow-lg shadow-yellow-400/50 hover:bg-yellow-300'
                  : 'bg-cyan-400 border-cyan-300 shadow-lg shadow-cyan-400/50 hover:bg-cyan-300'
              }`}
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                boxShadow: `0 0 ${isSelected ? '20px' : '12px'} currentColor`,
              }}
              title={`${float.name} - ${float.coordinates.lat.toFixed(2)}°N, ${Math.abs(float.coordinates.lng).toFixed(2)}°W • ${float.data.temperature}°C • Battery: ${float.batteryLevel}%`}
            />
            
            {/* Data preview on hover */}
            {isSelected && (
              <div
                className="absolute bg-slate-900/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-2 text-xs text-white min-w-[140px] pointer-events-none z-30"
                style={{ 
                  left: `${x + 2}%`, 
                  top: `${y - 8}%`
                }}
              >
                <div className="font-semibold text-cyan-400 mb-1">{float.name}</div>
                <div className="text-gray-300">{float.coordinates.lat.toFixed(2)}°N, {Math.abs(float.coordinates.lng).toFixed(2)}°W</div>
                <div className="text-green-400 text-[10px] mt-1">
                  {float.data.temperature}°C • {float.data.salinity} PSU
                </div>
                <div className="text-purple-400 text-[10px]">
                  Depth: {float.data.depth}m
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Enhanced title overlay */}
      <div className="absolute top-4 left-4 text-cyan-400 text-sm font-medium pointer-events-none z-10">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-500/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span>Enhanced Ocean Map • {animatedFloats.length} Floats</span>
          </div>
        </div>
      </div>
      
      {/* Real-time data indicator */}
      {realTimeMode && (
        <div className="absolute bottom-4 right-4 text-green-400 text-xs pointer-events-none">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Real-time Updates Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapFallback;