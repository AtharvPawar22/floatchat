import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Thermometer, 
  Droplets, 
  ArrowDown, 
  Calendar, 
  Activity, 
  Battery,
  Gauge,
  Beaker,
  MapPin,
  TrendingUp,
  X
} from 'lucide-react';

const EnhancedFloatDataPanel = ({ float, onClose }) => {
  const [realTimeData, setRealTimeData] = useState(float?.data);

  useEffect(() => {
    if (!float) return;
    
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        temperature: float.data.temperature + (Math.random() - 0.5) * 0.2,
        salinity: float.data.salinity + (Math.random() - 0.5) * 0.1,
        oxygen: float.data.oxygen + (Math.random() - 0.5) * 2,
        ph: float.data.ph + (Math.random() - 0.5) * 0.05
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [float]);

  if (!float) return null;

  const getBatteryColor = (level) => {
    if (level > 80) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (level > 50) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="fixed top-4 right-4 w-96 z-50 max-h-[90vh] overflow-hidden">
      <Card className="bg-slate-900/95 backdrop-blur-lg border-cyan-500/30 text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
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
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="p-4 bg-slate-800/50 flex items-center justify-between">
          <Badge className={`${getStatusColor(float.status)} border`}>
            {float.status.toUpperCase()}
          </Badge>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${getBatteryColor(float.batteryLevel)}`}>
            <Battery className="w-4 h-4" />
            <span className="text-sm font-medium">{float.batteryLevel}%</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="overflow-y-auto max-h-[60vh]">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800 m-2">
              <TabsTrigger value="current" className="text-xs">Current</TabsTrigger>
              <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
              <TabsTrigger value="stats" className="text-xs">Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="p-4 space-y-4">
              {/* Temperature */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Thermometer className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-300">Temperature</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {realTimeData?.temperature.toFixed(1)}°C
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(realTimeData?.temperature / 30) * 100}%` }}
                  />
                </div>
              </div>

              {/* Salinity */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                      <Droplets className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-300">Salinity</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {realTimeData?.salinity.toFixed(1)} PSU
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(realTimeData?.salinity / 40) * 100}%` }}
                  />
                </div>
              </div>

              {/* Depth & Pressure */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/50 rounded-lg p-3 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowDown className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-gray-300">Depth</span>
                  </div>
                  <div className="text-lg font-bold text-purple-400">
                    {float.data.depth.toLocaleString()}m
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-gray-300">Pressure</span>
                  </div>
                  <div className="text-lg font-bold text-orange-400">
                    {float.data.pressure} dbar
                  </div>
                </div>
              </div>

              {/* Oxygen & pH */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/50 rounded-lg p-3 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-300">Oxygen</span>
                  </div>
                  <div className="text-lg font-bold text-blue-400">
                    {realTimeData?.oxygen.toFixed(1)} μmol/kg
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-pink-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Beaker className="w-4 h-4 text-pink-400" />
                    <span className="text-xs text-gray-300">pH</span>
                  </div>
                  <div className="text-lg font-bold text-pink-400">
                    {realTimeData?.ph.toFixed(1)}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="p-4 space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Recent Trajectory
                </h4>
                {float.trajectory?.map((point, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-3 border border-gray-600/30">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-white">
                          {point.lat.toFixed(2)}°N, {Math.abs(point.lng).toFixed(2)}°W
                        </div>
                        <div className="text-xs text-gray-400">{point.date}</div>
                      </div>
                      {index === 0 && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {float.data.measurements.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-300">Total Measurements</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {float.data.daysActive}
                  </div>
                  <div className="text-xs text-gray-300">Days Active</div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Last Update</span>
                </div>
                <div className="text-lg font-semibold text-white">
                  {float.data.lastUpdate}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400">{float.data.status}</span>
                </div>
                <div className="text-xs text-gray-400">
                  Transmitting every 10 days • Next cycle in 3 days
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedFloatDataPanel;