import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { mockFloats } from '../data/mockData';

const Globe3D = ({ selectedFloat, onFloatSelect, showTrajectories = false }) => {
  const globeRef = useRef();
  const [globeReady, setGlobeReady] = useState(false);
  
  // Convert our mock floats to the format expected by react-globe.gl
  const globeFloats = mockFloats.map(float => ({
    ...float,
    lat: float.coordinates.lat,
    lng: float.coordinates.lng,
    size: selectedFloat?.id === float.id ? 0.8 : 0.4,
    color: selectedFloat?.id === float.id ? '#00ff88' : 
           float.status === 'warning' ? '#fbbf24' : '#00ccff'
  }));

  // Create trajectory data for the selected float
  const trajectoryData = showTrajectories && selectedFloat ? [{
    points: selectedFloat.trajectory?.map(point => ({
      lat: point.lat,
      lng: point.lng,
      alt: 0.01
    })) || []
  }] : [];

  useEffect(() => {
    if (globeRef.current && globeReady) {
      // Set up globe controls
      const globe = globeRef.current;
      
      // Auto-rotate
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      globe.controls().enableDamping = true;
      globe.controls().dampingFactor = 0.1;
      globe.controls().enableZoom = true;
      globe.controls().minDistance = 150;
      globe.controls().maxDistance = 800;
    }
  }, [globeReady]);

  const handleFloatClick = (float) => {
    onFloatSelect(float);
    // Animate to the selected float
    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: float.lat,
        lng: float.lng,
        altitude: 2
      }, 1000);
    }
  };

  const handleGlobeReady = () => {
    setGlobeReady(true);
  };

  return (
    <div className="w-full h-full relative">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Float markers
        pointsData={globeFloats}
        pointAltitude={0.01}
        pointRadius="size"
        pointColor="color"
        pointLabel={(d) => `
          <div style="background: rgba(0,0,0,0.8); padding: 8px; border-radius: 6px; color: white; font-size: 12px;">
            <div style="color: #00ccff; font-weight: bold;">${d.name}</div>
            <div>${d.coordinates.lat.toFixed(2)}°N, ${Math.abs(d.coordinates.lng).toFixed(2)}°W</div>
            <div style="color: #00ff88;">Temp: ${d.data.temperature}°C</div>
            <div style="color: #00ccff;">Salinity: ${d.data.salinity} PSU</div>
            <div style="color: #a855f7;">Depth: ${d.data.depth}m</div>
            <div style="color: #f59e0b;">Battery: ${d.batteryLevel}%</div>
          </div>
        `}
        onPointClick={handleFloatClick}
        
        // Trajectories
        pathsData={trajectoryData}
        pathPoints="points"
        pathPointLat="lat"
        pathPointLng="lng"
        pathPointAlt="alt"
        pathColor={() => '#ff6b35'}
        pathStroke={2}
        pathDashLength={0.1}
        pathDashGap={0.05}
        pathDashAnimateTime={3000}
        
        // Globe appearance
        atmosphereColor="#00ccff"
        atmosphereAltitude={0.1}
        
        // Lighting
        enablePointerInteraction={true}
        
        // Animation
        animateIn={true}
        
        onGlobeReady={handleGlobeReady}
        
        width={window.innerWidth * 0.6}
        height={window.innerHeight * 0.8}
      />
      
      {/* Loading indicator */}
      {!globeReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <div className="text-cyan-400 text-lg">Loading 3D Earth...</div>
            <div className="text-gray-400 text-sm">Initializing globe</div>
          </div>
        </div>
      )}
      
      {/* 3D Mode indicator */}
      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-500/30">
        <div className="flex items-center gap-2 text-cyan-400 text-sm">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span>3D Globe Mode</span>
        </div>
      </div>
      
      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/30">
        <div className="text-xs text-gray-300 space-y-1">
          <div>🖱️ Drag to rotate</div>
          <div>🔍 Scroll to zoom</div>
          <div>📍 Click floats for data</div>
          {showTrajectories && <div>🛤️ Trajectories enabled</div>}
        </div>
      </div>
    </div>
  );
};

export default Globe3D;