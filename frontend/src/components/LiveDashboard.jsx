import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Globe, Database, Users, TrendingUp, Zap } from 'lucide-react';
import { oceanStats, simulateRealTimeData } from '../data/mockData';

const LiveDashboard = () => {
  const [liveData, setLiveData] = useState(simulateRealTimeData());
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setLiveData(simulateRealTimeData());
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const stats = [
    {
      icon: Activity,
      label: 'Active Floats',
      value: liveData.activeFloats.toLocaleString(),
      change: '+12',
      color: 'text-green-400 bg-green-500/10 border-green-500/20'
    },
    {
      icon: Database,
      label: 'Data Points',
      value: oceanStats.dataPoints.toLocaleString(),
      change: `+${liveData.newMeasurements}`,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: Globe,
      label: 'Oceans Monitored',
      value: oceanStats.oceans.length,
      change: 'Global',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      icon: Users,
      label: 'Countries',
      value: oceanStats.countriesInvolved.toString(),
      change: 'International',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      icon: TrendingUp,
      label: 'Daily Profiles',
      value: oceanStats.profilesPerDay.toString(),
      change: '+24h',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    },
    {
      icon: Zap,
      label: 'Live Updates',
      value: liveData.dataTransmissions.toString(),
      change: 'Real-time',
      color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
    }
  ];

  return (
    <div className="w-full bg-slate-950/50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Global Ocean Network</h2>
            <p className="text-gray-400">Real-time ARGO float monitoring dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-sm text-gray-300">{isLive ? 'Live' : 'Paused'}</span>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-colors"
            >
              {isLive ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className={`${stat.color} p-4 border transition-all duration-300 hover:scale-105`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-current/20 flex items-center justify-center">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <Badge className="bg-current/10 text-current border-current/30 text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-xs opacity-80">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Ocean Coverage */}
        <div className="mt-6">
          <Card className="bg-slate-900/60 backdrop-blur-sm border-cyan-500/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Ocean Coverage</h3>
            <div className="flex flex-wrap gap-2">
              {oceanStats.oceans.map((ocean, index) => (
                <Badge
                  key={index}
                  className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-3 py-1"
                >
                  {ocean} Ocean
                </Badge>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Last updated: {new Date(liveData.timestamp).toLocaleTimeString()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;