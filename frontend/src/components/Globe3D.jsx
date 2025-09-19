import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { mockFloats } from '../data/mockData';

const FloatMarker = ({ position, float, onClick, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime;
      meshRef.current.scale.setScalar(
        isSelected ? 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2 : 
        hovered ? 1.2 : 1
      );
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
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial
          color={isSelected ? '#00ff88' : hovered ? '#00ddff' : '#00ccff'}
          emissive={isSelected ? '#00ff88' : hovered ? '#00ddff' : '#00ccff'}
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Pulsing ring effect */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.02, 0.03, 16]} />
        <meshBasicMaterial
          color={isSelected ? '#00ff88' : '#00ccff'}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {(isSelected || hovered) && (
        <Html distanceFactor={8}>
          <div className="bg-slate-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 text-xs text-white min-w-[140px] pointer-events-none">
            <div className="font-semibold text-cyan-400 mb-1">{float.name}</div>
            <div className="text-gray-300">{float.coordinates.lat.toFixed(2)}°N</div>
            <div className="text-gray-300">{Math.abs(float.coordinates.lng).toFixed(2)}°W</div>
            <div className="text-green-400 text-[10px] mt-1">
              {float.data.temperature}°C • {float.data.salinity} PSU
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const FloatTrajectory = ({ float, isVisible }) => {
  const lineRef = useRef();
  
  // Generate trajectory points
  const trajectoryPoints = React.useMemo(() => {
    const points = [];
    const basePos = new THREE.Vector3(...float.position);
    
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 0.3;
      const radius = 1 + Math.sin(angle) * 0.1;
      const pos = basePos.clone();
      pos.multiplyScalar(radius);
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle * 0.5);
      points.push(pos);
    }
    return points;
  }, [float.position]);

  useFrame(() => {
    if (lineRef.current && isVisible) {
      lineRef.current.material.opacity = 0.6 + Math.sin(Date.now() * 0.003) * 0.2;
    }
  });

  if (!isVisible) return null;

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={trajectoryPoints.length}
          array={new Float32Array(trajectoryPoints.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ffaa00" transparent opacity={0.6} />
    </line>
  );
};

const Earth = () => {
  const earthRef = useRef();
  const cloudRef = useRef();
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0015;
    }
  });

  // Create realistic earth materials
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: '#4ade80',
    emissive: '#0f172a',
    emissiveIntensity: 0.05,
    shininess: 50,
  });

  const oceanMaterial = new THREE.MeshPhongMaterial({
    color: '#0ea5e9',
    emissive: '#0c4a6e',
    emissiveIntensity: 0.1,
    shininess: 100,
    transparent: true,
    opacity: 0.8,
  });

  return (
    <group>
      {/* Ocean sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={oceanMaterial} />
      </mesh>
      
      {/* Land masses (simplified) */}
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <primitive object={earthMaterial} />
      </mesh>
      <mesh position={[-0.4, 0.1, 0.7]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <primitive object={earthMaterial} />
      </mesh>
      <mesh position={[0.1, -0.3, 0.9]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <primitive object={earthMaterial} />
      </mesh>
      <mesh position={[-0.2, 0.4, 0.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <primitive object={earthMaterial} />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.02, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

const Scene = ({ selectedFloat, onFloatSelect, showTrajectories }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0ea5e9" />
      
      <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade />
      
      <Earth />
      
      {mockFloats.map((float) => (
        <React.Fragment key={float.id}>
          <FloatMarker
            position={float.position}
            float={float}
            onClick={onFloatSelect}
            isSelected={selectedFloat?.id === float.id}
          />
          <FloatTrajectory
            float={float}
            isVisible={showTrajectories && selectedFloat?.id === float.id}
          />
        </React.Fragment>
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={2}
        maxDistance={8}
        autoRotate={false}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <div className="text-cyan-400 text-lg">Loading 3D Globe...</div>
      <div className="text-gray-400 text-sm">Initializing WebGL</div>
    </div>
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
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg">
          <div className="text-center">
            <div className="text-orange-400 text-lg mb-2">3D Mode Unavailable</div>
            <div className="text-gray-400 text-sm mb-4">Falling back to 2D visualization</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Retry 3D Mode
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Globe3D = ({ selectedFloat, onFloatSelect, showTrajectories = false }) => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);

  useEffect(() => {
    // Enhanced WebGL detection
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || 
                 canvas.getContext('webgl') || 
                 canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setWebGLSupported(false);
        return;
      }

      // Test WebGL capabilities
      const renderer = gl.getParameter(gl.RENDERER);
      console.log('WebGL Renderer:', renderer);
      
      // Enable performance mode for lower-end devices
      if (renderer && renderer.toLowerCase().includes('intel')) {
        setPerformanceMode(true);
      }
      
    } catch (error) {
      console.log('WebGL Error:', error);
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-2">WebGL Not Supported</div>
          <div className="text-gray-400 text-sm">Your browser doesn't support 3D graphics</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 0, 3], fov: 50 }}
            gl={{ 
              antialias: !performanceMode,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
            }}
            onCreated={({ gl, scene }) => {
              gl.setClearColor('#000000', 0);
              gl.shadowMap.enabled = !performanceMode;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
            performance={{ min: 0.8 }}
          >
            <Scene 
              selectedFloat={selectedFloat} 
              onFloatSelect={onFloatSelect}
              showTrajectories={showTrajectories}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
      
      {performanceMode && (
        <div className="absolute bottom-2 right-2 bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded">
          Performance Mode
        </div>
      )}
    </div>
  );
};

export default Globe3D;