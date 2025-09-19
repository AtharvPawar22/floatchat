import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Globe, 
  Map, 
  Route, 
  Eye, 
  Layers,
  Settings
} from 'lucide-react';

const ViewModeSelector = ({ 
  viewMode, 
  onViewModeChange, 
  showTrajectories, 
  onToggleTrajectories,
  className = ""
}) => {
  const viewModes = [
    {
      id: '3d',
      label: '3D Globe',
      icon: Globe,
      description: 'Interactive 3D Earth visualization'
    },
    {
      id: '2d',
      label: '2D Map',
      icon: Map,
      description: 'Flat ocean map view'
    }
  ];

  const features = [
    {
      id: 'trajectories',
      label: 'Trajectories',
      icon: Route,
      active: showTrajectories,
      onClick: onToggleTrajectories,
      description: 'Show float movement paths'
    }
  ];

  return (
    <div className={`bg-slate-900/80 backdrop-blur-sm rounded-lg border border-cyan-500/20 p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-cyan-400" />
        <h3 className="font-semibold text-white">View Options</h3>
      </div>

      {/* View Mode Selection */}
      <div className="space-y-2 mb-4">
        <div className="text-sm text-gray-400 mb-2">Display Mode</div>
        <div className="grid grid-cols-2 gap-2">
          {viewModes.map((mode) => {
            const IconComponent = mode.icon;
            const isActive = viewMode === mode.id;
            
            return (
              <Button
                key={mode.id}
                onClick={() => onViewModeChange(mode.id)}
                variant={isActive ? "default" : "outline"}
                className={`relative p-3 h-auto flex flex-col items-center gap-2 ${
                  isActive 
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white border-cyan-500' 
                    : 'bg-slate-800 hover:bg-slate-700 text-gray-300 border-gray-600'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="text-xs font-medium">{mode.label}</div>
                {isActive && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                  </div>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="space-y-2">
        <div className="text-sm text-gray-400 mb-2">Features</div>
        {features.map((feature) => {
          const IconComponent = feature.icon;
          
          return (
            <div
              key={feature.id}
              className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={feature.onClick}
            >
              <div className="flex items-center gap-3">
                <IconComponent className={`w-4 h-4 ${feature.active ? 'text-cyan-400' : 'text-gray-400'}`} />
                <div>
                  <div className={`text-sm font-medium ${feature.active ? 'text-white' : 'text-gray-300'}`}>
                    {feature.label}
                  </div>
                  <div className="text-xs text-gray-500">{feature.description}</div>
                </div>
              </div>
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                feature.active 
                  ? 'bg-cyan-500 border-cyan-500' 
                  : 'border-gray-600'
              }`}>
                {feature.active && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Settings hint */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Settings className="w-3 h-3" />
          <span>More options available in settings</span>
        </div>
      </div>
    </div>
  );
};

export default ViewModeSelector;