import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const RotatingGlass = () => {
  const glassRef = useRef();
  const { scene } = useGLTF('/black-glb.glb'); // Ensure the path to your GLB file is correct

  const [scrollY, setScrollY] = useState(0);
  
  // Track the scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update rotation and position based on scroll
  useFrame(() => {
    if (glassRef.current) {
      // Calculate the maximum scrollable height
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const normalizedScroll = scrollY / maxScroll; // Normalize scroll between 0 and 1

      // Rotation calculations
      const xRotation = normalizedScroll * Math.PI * 2; // Full 360-degree rotation for flipping effect
      const yRotation = normalizedScroll * Math.PI * 4; // Adjust multiplier for faster/slower Y-axis rotation

      glassRef.current.rotation.x = xRotation; // Rotate around the X-axis
      glassRef.current.rotation.y = yRotation - Math.PI / 2; // Start rotated 90 degrees around the Y-axis

      // Update position to move down as you scroll
      const moveDistance = -normalizedScroll * 5; // Adjust the multiplier for the range of movement
      glassRef.current.position.y = moveDistance + Math.sin(Date.now() / 500) * 0.2; // Combine scroll movement and oscillation
    }
  });

  return (
    <primitive 
      ref={glassRef} 
      object={scene} 
      scale={[1.5, 1.5, 1.5]} // Increase the scale for larger size; adjust values as needed
    />
  );
};

const App = () => {
  return (
    <div style={{ height: '200vh', margin: 0, padding: 0 }}>
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh' }}
        camera={{ position: [0, 0, 10] }} // Adjust the initial camera position if needed
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <RotatingGlass />
        </Suspense>
        {/* Disable zoom and other controls */}
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default App;
