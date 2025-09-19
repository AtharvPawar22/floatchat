import React from 'react';
import { mockFloats } from '../data/mockData';

const MapFallback = ({ selectedFloat, onFloatSelect }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-slate-900 rounded-lg relative overflow-hidden">
      {/* Ocean background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/50 to-blue-900/50" />
      
      {/* Continent shapes (simplified) */}
      <div className="absolute top-[20%] left-[15%] w-32 h-24 bg-green-700/30 rounded-xl transform rotate-12" />
      <div className="absolute top-[40%] right-[20%] w-28 h-20 bg-green-700/30 rounded-lg transform -rotate-6" />
      <div className="absolute bottom-[25%] left-[25%] w-36 h-16 bg-green-700/30 rounded-2xl" />
      
      {/* Float markers */}
      {mockFloats.map((float, index) => {
        const x = (index * 15 + 20) % 80;
        const y = (index * 20 + 25) % 60;
        
        return (
          <button
            key={float.id}
            onClick={() => onFloatSelect(float)}
            className={`absolute w-4 h-4 rounded-full border-2 transition-all duration-200 hover:scale-150 ${
              selectedFloat?.id === float.id
                ? 'bg-green-400 border-green-300 animate-pulse'
                : 'bg-cyan-400 border-cyan-300 hover:bg-cyan-300'
            }`}
            style={{ 
              left: `${x}%`, 
              top: `${y}%`,
              boxShadow: `0 0 ${selectedFloat?.id === float.id ? '16px' : '8px'} currentColor`
            }}
            title={`${float.name} - ${float.coordinates.lat.toFixed(2)}°N, ${Math.abs(float.coordinates.lng).toFixed(2)}°W`}
          />
        );
      })}
      
      {/* Grid lines for ocean feel */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-cyan-500/30"
            style={{ top: `${(i + 1) * 12.5}%` }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-cyan-500/30"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>
      
      {/* Title overlay */}
      <div className="absolute top-4 left-4 text-cyan-400 text-sm font-medium">
        2D Ocean Map View
      </div>
    </div>
  );
};

export default MapFallback;