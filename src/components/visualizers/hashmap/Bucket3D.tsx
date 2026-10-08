import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Bucket as BucketData } from './types';
import { Entry3D } from './Entry3D';

interface Bucket3DProps {
  bucket: BucketData;
  /** Position in world space */
  position: [number, number, number];
  isHighlighted: boolean;
  highlightEntryId: string | null;
}

// Colors
const CYLINDER_DEFAULT = new THREE.Color('#1a1d27');
const CYLINDER_HIGHLIGHT = new THREE.Color('#1e2a40');
const EMISSIVE_COLOR = new THREE.Color('#4a90e2');
const RING_DEFAULT = new THREE.Color('#2a2e3a');
const RING_HIGHLIGHT = new THREE.Color('#4a90e2');

const CYLINDER_RADIUS = 0.55;
const CYLINDER_HEIGHT = 0.6;

export const Bucket3D: React.FC<Bucket3DProps> = ({
  bucket,
  position,
  isHighlighted,
  highlightEntryId,
}) => {
  const cylinderRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    const t = Math.min(1, (delta || 0.016) * 8);

    // Smooth cylinder color
    if (cylinderRef.current) {
      const mat = cylinderRef.current.material as THREE.MeshStandardMaterial;
      const target = isHighlighted ? CYLINDER_HIGHLIGHT : CYLINDER_DEFAULT;
      mat.color.lerp(target, t);
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        isHighlighted ? 0.25 : 0.0,
        t,
      );
    }

    // Smooth ring color
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      const target = isHighlighted ? RING_HIGHLIGHT : RING_DEFAULT;
      mat.color.lerp(target, t);
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        isHighlighted ? 0.5 : 0.0,
        t,
      );
    }
  });

  return (
    <group position={position}>
      {/* Bucket cylinder */}
      <mesh ref={cylinderRef} position={[0, CYLINDER_HEIGHT / 2, 0]}>
        <cylinderGeometry args={[CYLINDER_RADIUS, CYLINDER_RADIUS, CYLINDER_HEIGHT, 32, 1, true]} />
        <meshStandardMaterial
          color={CYLINDER_DEFAULT}
          emissive={EMISSIVE_COLOR}
          emissiveIntensity={0}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top ring — solid ring to define the bucket opening */}
      <mesh
        ref={ringRef}
        position={[0, CYLINDER_HEIGHT, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[CYLINDER_RADIUS - 0.03, CYLINDER_RADIUS + 0.03, 32]} />
        <meshStandardMaterial
          color={RING_DEFAULT}
          emissive={EMISSIVE_COLOR}
          emissiveIntensity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom disc */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[CYLINDER_RADIUS, 32]} />
        <meshStandardMaterial
          color="#141620"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Bucket index label */}
      <Html position={[0, -0.28, 0]} center transform pointerEvents="none">
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '18px',
            fontWeight: 'bold',
            color: isHighlighted ? '#4a90e2' : '#8b949e',
            userSelect: 'none',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          }}
        >
          {String(bucket.index)}
        </span>
      </Html>


      {/* Entries stacking above the bucket */}
      {bucket.entries.map((entry, i) => (
        <Entry3D
          key={entry.id}
          entryKey={entry.key}
          value={entry.value}
          entryId={entry.id}
          stackIndex={i}
          isHighlighted={highlightEntryId === entry.id}
          bucketPosition={[0, 0, 0]}
        />
      ))}
    </group>
  );
};
