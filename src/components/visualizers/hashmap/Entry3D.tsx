import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox, Html } from '@react-three/drei';

interface Entry3DProps {
  entryKey: number;
  value: string;
  entryId: string;
  /** Vertical position in the stack (0 = first entry above bucket) */
  stackIndex: number;
  /** Whether this specific entry is highlighted */
  isHighlighted: boolean;
  /** Center position of the parent bucket on the XZ plane */
  bucketPosition: [number, number, number];
}

const ENTRY_HEIGHT = 0.45;
const ENTRY_GAP = 0.55;
const BASE_Y = 1.0; // starts above the bucket cylinder top

// Colors
const DEFAULT_COLOR = new THREE.Color('#1e2230');
const HIGHLIGHT_COLOR = new THREE.Color('#4a90e2');
const KEY_COLOR = '#58a6ff';
const VALUE_COLOR = '#3fb950';
const BORDER_DEFAULT = new THREE.Color('#2a2e3a');
const BORDER_HIGHLIGHT = new THREE.Color('#4a90e2');

export const Entry3D: React.FC<Entry3DProps> = ({
  entryKey,
  value,
  stackIndex,
  isHighlighted,
  bucketPosition,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const edgesRef = useRef<THREE.LineSegments>(null!);

  // Target Y position
  const targetY = BASE_Y + stackIndex * ENTRY_GAP;

  // Smooth animation
  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const t = Math.min(1, (delta || 0.016) * 10);

    // Smooth position
    const currentY = groupRef.current.position.y;
    const newY = THREE.MathUtils.lerp(currentY, targetY, t);
    groupRef.current.position.y = newY;

    // Smooth scale for highlight
    const targetScale = isHighlighted ? 1.15 : 1.0;
    const s = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(s, targetScale, t);
    groupRef.current.scale.setScalar(newScale);

    // Smooth color
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const target = isHighlighted ? HIGHLIGHT_COLOR : DEFAULT_COLOR;
      mat.color.lerp(target, t);
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        isHighlighted ? 0.3 : 0.0,
        t,
      );
    }

    // Smooth edge color
    if (edgesRef.current) {
      const mat = edgesRef.current.material as THREE.LineBasicMaterial;
      const target = isHighlighted ? BORDER_HIGHLIGHT : BORDER_DEFAULT;
      mat.color.lerp(target, t);
    }
  });

  // Rounded box geometry for edges
  const edgesGeometry = useMemo(() => {
    const box = new THREE.BoxGeometry(1.3, ENTRY_HEIGHT, 0.5);
    return new THREE.EdgesGeometry(box);
  }, []);

  return (
    <group
      ref={groupRef}
      position={[bucketPosition[0], 0, bucketPosition[2]]}
    >
      {/* Entry body */}
      <RoundedBox
        ref={meshRef}
        args={[1.3, ENTRY_HEIGHT, 0.5]}
        radius={0.06}
        smoothness={4}
      >
        <meshStandardMaterial
          color={DEFAULT_COLOR}
          emissive={HIGHLIGHT_COLOR}
          emissiveIntensity={0}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* Wireframe edges */}
      <lineSegments geometry={edgesGeometry} ref={edgesRef}>
        <lineBasicMaterial color={BORDER_DEFAULT} transparent opacity={0.5} />
      </lineSegments>

      {/* Key text */}
      <Html position={[-0.25, 0, 0.26]} center transform>
        <span style={{ color: KEY_COLOR, fontSize: '18px', fontFamily: 'monospace', fontWeight: 'bold' }}>
          {String(entryKey)}
        </span>
      </Html>

      {/* Separator */}
      <Html position={[0.05, 0, 0.26]} center transform>
        <span style={{ color: '#6e7681', fontSize: '16px' }}>:</span>
      </Html>

      {/* Value text */}
      <Html position={[0.4, 0, 0.26]} center transform>
        <span style={{ color: VALUE_COLOR, fontSize: '15px', fontFamily: 'monospace', maxWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          "{value}"
        </span>
      </Html>
    </group>
  );
};
