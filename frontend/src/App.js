import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapFallback from "./components/MapFallback";
import FloatDataPanel from "./components/FloatDataPanel";
import ChatSection from "./components/ChatSection";
import FunFactsSection from "./components/FunFactsSection";
import { Waves, Info } from "lucide-react";

const FloatChat = () => {
  const [selectedFloat, setSelectedFloat] = useState(null);

  const handleFloatSelect = (float) => {
    setSelectedFloat(float);
  };

  const handleClosePanel = () => {
    setSelectedFloat(null);
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
        
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors">
          <Info className="w-4 h-4" />
          <span className="text-sm">About</span>
        </button>
      </header>

      {/* Main Globe Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-3xl blur-3xl" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 px-6 py-8">
          {/* Globe Container */}
          <div className="flex-1 min-h-[600px] relative">
            <div className="absolute inset-0 bg-slate-900/30 rounded-2xl border border-cyan-500/20" />
            <MapFallback selectedFloat={selectedFloat} onFloatSelect={handleFloatSelect} />
            
            {/* Instructions */}
            <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span>Click on glowing points to explore float data</span>
              </div>
            </div>
          </div>

          {/* Side Panel for Float Selection Info */}
          <div className="lg:w-80 flex flex-col gap-6">
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Waves className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-cyan-400">Select an ARGO Float</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Click on any glowing marker in the ocean to explore real-time data from that location
              </p>
            </div>
          </div>
        </div>

        {/* Float Data Panel */}
        <FloatDataPanel float={selectedFloat} onClose={handleClosePanel} />
      </div>

      {/* Chat Section */}
      <div className="py-16 px-6">
        <ChatSection />
      </div>

      {/* Fun Facts Section */}
      <FunFactsSection />
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
