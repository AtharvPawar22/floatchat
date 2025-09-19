import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { ChevronLeft, ChevronRight, Globe, Activity, Waves, Database } from 'lucide-react';
import { mockFunFacts } from '../data/mockData';

const iconMap = {
  Research: Database,
  Globe: Globe,
  Waves: Waves,
  Activity: Activity
};

const FunFactsSection = () => {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % mockFunFacts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextFact = () => {
    setCurrentFact(prev => (prev + 1) % mockFunFacts.length);
  };

  const prevFact = () => {
    setCurrentFact(prev => (prev - 1 + mockFunFacts.length) % mockFunFacts.length);
  };

  const fact = mockFunFacts[currentFact];
  const IconComponent = iconMap[fact.icon] || Activity;

  return (
    <div className="w-full bg-slate-950/50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Ocean Discovery</h2>
          <p className="text-gray-400">Fascinating insights from the deep</p>
        </div>

        <Card className="bg-slate-900/80 backdrop-blur-lg border-cyan-500/20 p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5" />
          
          <div className="relative flex items-center justify-between">
            <button
              onClick={prevFact}
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 text-center max-w-2xl mx-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4">{fact.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{fact.description}</p>
            </div>

            <button
              onClick={nextFact}
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {mockFunFacts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFact(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentFact 
                    ? 'bg-cyan-400 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FunFactsSection;