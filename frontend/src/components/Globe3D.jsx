import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { mockFloats } from '../data/mockData';
import MapFallback from './MapFallback';

const FloatMarker = ({ position, float, onClick, isSelected }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(float);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial
          color={isSelected ? '#00ff88' : '#00ccff'}
          emissive={isSelected ? '#00ff88' : '#00ccff'}
          emissiveIntensity={0.5}
        />
      </mesh>
      {isSelected && (
        <Html distanceFactor={10}>
          <div className="bg-slate-900/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-2 text-xs text-white min-w-[120px]">
            <div className="font-semibold text-cyan-400">{float.name}</div>
            <div className="text-gray-300">{float.coordinates.lat.toFixed(2)}°N</div>
            <div className="text-gray-300">{Math.abs(float.coordinates.lng).toFixed(2)}°W</div>
          </div>
        </Html>
      )}
    </group>
  );
};

const Earth = () => {
  const earthRef = useRef();
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        color="#1e40af"
        emissive="#0f172a"
        emissiveIntensity={0.1}
        shininess={10}
      />
    </mesh>
  );
};

const Scene = ({ selectedFloat, onFloatSelect }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Earth />
      
      {mockFloats.map((float) => (
        <FloatMarker
          key={float.id}
          position={float.position}
          float={float}
          onClick={onFloatSelect}
          isSelected={selectedFloat?.id === float.id}
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={2}
        maxDistance={6}
        autoRotate={false}
      />
    </>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-cyan-400 text-lg">Loading 3D Globe...</div>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Globe3D Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <MapFallback selectedFloat={this.props.selectedFloat} onFloatSelect={this.props.onFloatSelect} />;
    }

    return this.props.children;
  }
}

const Globe3D = ({ selectedFloat, onFloatSelect }) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [use3D, setUse3D] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        setUse3D(false);
      }
    } catch (e) {
      setHasWebGL(false);
      setUse3D(false);
    }
  }, []);

  if (!hasWebGL || !use3D) {
    return <MapFallback selectedFloat={selectedFloat} onFloatSelect={onFloatSelect} />;
  }

  return (
    <div className="w-full h-full">
      <ErrorBoundary selectedFloat={selectedFloat} onFloatSelect={onFloatSelect}>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 0, 3], fov: 45 }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 0);
            }}
          >
            <Scene selectedFloat={selectedFloat} onFloatSelect={onFloatSelect} />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Globe3D;