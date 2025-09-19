import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Globe3D from "./components/Globe3D";
import MapFallback from "./components/MapFallback";
import EnhancedFloatDataPanel from "./components/EnhancedFloatDataPanel";
import ChatSection from "./components/ChatSection";
import FunFactsSection from "./components/FunFactsSection";
import LiveDashboard from "./components/LiveDashboard";
import ViewModeSelector from "./components/ViewModeSelector";
import { Waves, Info, Maximize2, Minimize2 } from "lucide-react";

const FloatChat = () => {
  const [selectedFloat, setSelectedFloat] = useState(null);
  const [viewMode, setViewMode] = useState('3d');
  const [showTrajectories, setShowTrajectories] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

      {/* Main Globe Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-3xl blur-3xl" />
        
        <div className={`relative z-10 flex gap-6 px-6 py-8 ${isFullscreen ? 'h-screen' : ''}`}>
          {/* Globe Container */}
          <div className={`flex-1 relative ${isFullscreen ? 'h-full' : 'min-h-[700px]'}`}>
            <div className="absolute inset-0 bg-slate-900/30 rounded-2xl border border-cyan-500/20" />
            
            {viewMode === '3d' ? (
              <Globe3D 
                selectedFloat={selectedFloat} 
                onFloatSelect={handleFloatSelect}
                showTrajectories={showTrajectories}
              />
            ) : (
              <MapFallback 
                selectedFloat={selectedFloat} 
                onFloatSelect={handleFloatSelect} 
              />
            )}
            
            {/* Instructions */}
            <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span>Click on glowing points to explore float data</span>
              </div>
              {viewMode === '3d' && (
                <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                  <span>Drag to rotate • Scroll to zoom</span>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="absolute top-6 left-6">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-500/30">
                <div className="flex items-center gap-2 text-cyan-400 text-sm">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span>{viewMode === '3d' ? '3D Globe Mode' : '2D Map Mode'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
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
                  <span className="font-semibold text-cyan-400">Select an ARGO Float</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Click on any glowing marker in the ocean to explore real-time data from that location.
                </p>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Active Float</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Selected Float</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Low Battery Warning</span>
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
