import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Thermometer, Droplets, ArrowDown, Calendar, Activity } from 'lucide-react';

const FloatDataPanel = ({ float, onClose }) => {
  if (!float) return null;

  return (
    <div className="fixed top-4 right-4 w-80 z-50">
      <Card className="bg-slate-900/95 backdrop-blur-lg border-cyan-500/30 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-cyan-400">{float.name}</h3>
              <p className="text-sm text-gray-400">
                {float.coordinates.lat.toFixed(2)}°N, {Math.abs(float.coordinates.lng).toFixed(2)}°W
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Temperature */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Thermometer className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-gray-300">Temperature</span>
            </div>
            <div className="text-2xl font-bold text-green-400 mb-2">
              {float.data.temperature}°C
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                style={{ width: `${(float.data.temperature / 30) * 100}%` }}
              />
            </div>
          </div>

          {/* Salinity */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                <Droplets className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-gray-300">Salinity</span>
            </div>
            <div className="text-2xl font-bold text-cyan-400 mb-2">
              {float.data.salinity} PSU
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-2 rounded-full"
                style={{ width: `${(float.data.salinity / 40) * 100}%` }}
              />
            </div>
          </div>

          {/* Depth */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <ArrowDown className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-gray-300">Depth</span>
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-2">
              {float.data.depth.toLocaleString()}m
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full"
                style={{ width: `${(float.data.depth / 4000) * 100}%` }}
              />
            </div>
          </div>

          {/* Last Update */}
          <div className="bg-slate-800/50 rounded-lg p-3 border border-gray-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Last Update</span>
            </div>
            <div className="text-lg font-semibold text-white">
              {float.data.lastUpdate}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">{float.data.status}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FloatDataPanel;