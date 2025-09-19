import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapFallback from "./components/MapFallback";
import EnhancedFloatDataPanel from "./components/EnhancedFloatDataPanel";
import ChatSection from "./components/ChatSection";
import FunFactsSection from "./components/FunFactsSection";
import LiveDashboard from "./components/LiveDashboard";
import ViewModeSelector from "./components/ViewModeSelector";
import { Waves, Info, Maximize2, Minimize2, Zap } from "lucide-react";

const FloatChat = () => {
  const [selectedFloat, setSelectedFloat] = useState(null);
  const [viewMode, setViewMode] = useState('2d');
  const [showTrajectories, setShowTrajectories] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [realTimeMode, setRealTimeMode] = useState(true);

  const handleFloatSelect = (float) => {
    setSelectedFloat(float);
  };

  const handleClosePanel = () => {
    setSelectedFloat(null);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleToggleTrajectories = () => {
    setShowTrajectories(!showTrajectories);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleRealTime = () => {
    setRealTimeMode(!realTimeMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">FloatChat</h1>
            <p className="text-gray-400 text-sm">Explore ocean data with AI-powered insights</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleRealTime}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
              realTimeMode 
                ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                : 'bg-slate-800/50 border-gray-700 text-gray-400'
            }`}
          >
            <Zap className={`w-4 h-4 ${realTimeMode ? 'animate-pulse' : ''}`} />
            <span className="text-sm">Real-time</span>
          </button>
          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="text-sm">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors">
            <Info className="w-4 h-4" />
            <span className="text-sm">About</span>
          </button>
        </div>
      </header>

      {/* Live Dashboard */}
      <LiveDashboard />

      {/* Main Visualization Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-3xl blur-3xl" />
        
        <div className={`relative z-10 flex gap-6 px-6 py-8 ${isFullscreen ? 'h-screen' : ''}`}>
          {/* Map Container */}
          <div className={`flex-1 relative ${isFullscreen ? 'h-full' : 'min-h-[700px]'}`}>
            <div className="absolute inset-0 bg-slate-900/30 rounded-2xl border border-cyan-500/20 overflow-hidden">
              {/* Enhanced background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-slate-900/50" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
              
              {/* Animated grid */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse"
                    style={{ 
                      top: `${(i + 1) * 8.33}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  />
                ))}
                {[...Array(16)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse"
                    style={{ 
                      left: `${(i + 1) * 6.25}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '4s'
                    }}
                  />
                ))}
              </div>
            </div>
            
            <MapFallback 
              selectedFloat={selectedFloat} 
              onFloatSelect={handleFloatSelect}
              showTrajectories={showTrajectories}
              realTimeMode={realTimeMode}
            />
            
            {/* Enhanced Instructions */}
            <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-400 text-sm mb-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span>Click on glowing points to explore float data</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span>Enhanced 2D Ocean Visualization • 6 Active Floats</span>
              </div>
            </div>

            {/* Enhanced Status Indicator */}
            <div className="absolute top-6 left-6">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-cyan-400 text-sm">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span>Enhanced Ocean Map</span>
                  </div>
                  {realTimeMode && (
                    <div className="flex items-center gap-1 text-green-400 text-xs">
                      <Zap className="w-3 h-3 animate-pulse" />
                      <span>Live Data</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Performance indicator */}
            <div className="absolute top-6 right-6">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500/30">
                <div className="flex items-center gap-2 text-green-400 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Optimized Mode</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Side Panel */}
          {!isFullscreen && (
            <div className="w-80 flex flex-col gap-6">
              <ViewModeSelector
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                showTrajectories={showTrajectories}
                onToggleTrajectories={handleToggleTrajectories}
              />
              
              <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Waves className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-cyan-400">ARGO Float Network</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Explore real-time oceanographic data from autonomous profiling floats deployed across global oceans.
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>Active Float (Normal Operation)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Selected Float (Data Panel Open)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Low Battery Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Trajectory Path (When Enabled)</span>
                  </div>
                </div>
              </div>

              {/* Mini stats panel */}
              <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <h4 className="text-sm font-semibold text-white mb-3">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-400">3,984</div>
                    <div className="text-xs text-gray-400">Global Floats</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-cyan-400">6</div>
                    <div className="text-xs text-gray-400">Visible Here</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">2.8M</div>
                    <div className="text-xs text-gray-400">Data Points</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-400">800</div>
                    <div className="text-xs text-gray-400">Daily Profiles</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Float Data Panel */}
        <EnhancedFloatDataPanel float={selectedFloat} onClose={handleClosePanel} />
      </div>

      {/* Chat Section */}
      {!isFullscreen && (
        <>
          <div className="py-16 px-6">
            <ChatSection />
          </div>

          {/* Fun Facts Section */}
          <FunFactsSection />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FloatChat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
