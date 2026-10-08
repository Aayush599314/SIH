import React, { useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { Bucket } from './types';
import { Bucket3D } from './Bucket3D';

interface Scene3DProps {
  buckets: Bucket[];
  highlightBucket: number | null;
  highlightEntryId: string | null;
  onFallbackTo2D?: () => void;
}

/** Verify if WebGL is available before attempting to render 3D Canvas */
export function checkWebGLSupport(): { supported: boolean; reason?: string } {
  if (typeof window === 'undefined') return { supported: true };
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) {
      return {
        supported: false,
        reason: 'WebGL is disabled or hardware acceleration is turned off in your browser settings.',
      };
    }
    return { supported: true };
  } catch (e) {
    return {
      supported: false,
      reason: e instanceof Error ? e.message : 'Could not create WebGL context.',
    };
  }
}

/** Fallback card shown when WebGL is unavailable or crashes */
export const WebGLFallbackCard: React.FC<{
  reason?: string;
  onSwitchTo2D?: () => void;
}> = ({ reason, onSwitchTo2D }) => {
  return (
    <div className="hm-webgl-fallback">
      <div className="hm-webgl-fallback__badge">3D Graphics Unavailable</div>
      <h3 className="hm-webgl-fallback__title">WebGL Acceleration Needed</h3>
      <p className="hm-webgl-fallback__desc">
        {reason ||
          'Your browser could not initialize the 3D graphics context. Hardware acceleration may be disabled or your graphics driver needs a restart.'}
      </p>
      {onSwitchTo2D && (
        <button
          type="button"
          className="hm-webgl-fallback__btn"
          onClick={onSwitchTo2D}
        >
          Switch to 2D Mode
        </button>
      )}
      <div className="hm-webgl-fallback__guide">
        <div className="hm-webgl-fallback__guide-title">How to enable 3D:</div>
        <ol className="hm-webgl-fallback__list">
          <li>Open browser <strong>Settings &gt; System</strong></li>
          <li>Turn ON <strong>"Use graphics acceleration when available"</strong></li>
          <li>Relaunch browser and reload</li>
        </ol>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  onFallbackTo2D?: () => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class WebGLErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Scene3D error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <WebGLFallbackCard
          reason={this.state.error?.message}
          onSwitchTo2D={this.props.onFallbackTo2D}
        />
      );
    }
    return this.props.children;
  }
}

/** Arrange buckets in a circle on the XZ plane. */
function circlePositions(count: number, radius: number): [number, number, number][] {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2; // start from top
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    positions.push([x, 0, z]);
  }
  return positions;
}

/** Ground ring to give spatial context */
const GroundRing: React.FC<{ radius: number }> = ({ radius }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <ringGeometry args={[radius - 0.6, radius + 0.6, 64]} />
      <meshStandardMaterial
        color="#0f1117"
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/** Subtle grid on the ground */
const GroundGrid: React.FC = () => {
  return (
    <gridHelper
      args={[12, 20, '#1a1d27', '#1a1d27']}
      position={[0, -0.02, 0]}
    />
  );
};

export const Scene3D: React.FC<Scene3DProps> = ({
  buckets,
  highlightBucket,
  highlightEntryId,
  onFallbackTo2D,
}) => {
  const [webGLStatus, setWebGLStatus] = useState<{ supported: boolean; reason?: string }>(() =>
    checkWebGLSupport(),
  );

  useEffect(() => {
    setWebGLStatus(checkWebGLSupport());
  }, []);

  const circleRadius = 3.2;
  const positions = useMemo(
    () => circlePositions(buckets.length, circleRadius),
    [buckets.length],
  );

  if (!webGLStatus.supported) {
    return (
      <div className="hm-canvas-container">
        <WebGLFallbackCard
          reason={webGLStatus.reason}
          onSwitchTo2D={onFallbackTo2D}
        />
      </div>
    );
  }

  return (
    <div className="hm-canvas-container">
      <WebGLErrorBoundary onFallbackTo2D={onFallbackTo2D}>
        <Canvas
          camera={{ position: [0, 5.5, 6.5], fov: 45, near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'default',
          }}
          onCreated={({ gl }) => {
            try {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.2;
            } catch {
              // ignore
            }
          }}
        >
          {/* Background color */}
          <color attach="background" args={['#0f1117']} />

          {/* Lighting */}
          <ambientLight intensity={0.5} color="#c9d1d9" />
          <pointLight position={[5, 8, 5]} intensity={60} color="#e6edf3" />
          <pointLight position={[-4, 6, -4]} intensity={30} color="#4a90e2" />
          <pointLight position={[0, 3, 0]} intensity={15} color="#58a6ff" />

          {/* Camera controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            minDistance={3}
            maxDistance={14}
            maxPolarAngle={Math.PI / 2.05}
            target={[0, 0.8, 0]}
          />

          {/* Ground elements */}
          <GroundGrid />
          <GroundRing radius={circleRadius} />

          {/* Buckets */}
          {buckets.map((bucket, i) => (
            <Bucket3D
              key={bucket.index}
              bucket={bucket}
              position={positions[i]}
              isHighlighted={highlightBucket === bucket.index}
              highlightEntryId={
                highlightBucket === bucket.index ? highlightEntryId : null
              }
            />
          ))}
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};

