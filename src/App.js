import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const RotatingGlass = () => {
  const glassRef = useRef();
  const { scene } = useGLTF('/black-glb.glb');

  const [scrollY, setScrollY] = useState(0);

  // Track the scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update rotation based on scroll and automatic rotation
  useFrame(() => {
    if (glassRef.current) {
      // Calculate max scroll position
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const normalizedScroll = scrollY / maxScroll; // Normalizes scroll between 0 and 1

      // Rotate the glass based on the scroll position
      const rotationAngle = Math.sin(normalizedScroll * Math.PI) * Math.PI; // Full 180 degrees forward and then backward
      glassRef.current.rotation.y = rotationAngle + performance.now() * 0.001; // Continuous rotation effect
    }
  });

  return <primitive ref={glassRef} object={scene} />;
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
        {/* Enable zoom functionality */}
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default App;
