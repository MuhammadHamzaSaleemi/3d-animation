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
      const xRotation = normalizedScroll * Math.PI * 10; // Full 360-degree rotation for flipping effect
      const yRotation = normalizedScroll * Math.PI * 30; // Adjust multiplier for faster/slower Y-axis rotation

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
    <div style={{ margin: 0, padding: 0 }}>
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1 }}
        camera={{ position: [0, 0, 10] }} // Adjust the initial camera position if needed
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <RotatingGlass />
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>

      {/* Container for all sections with top padding equal to the height of the canvas */}
      <div style={{ paddingTop: '100vh', position: 'relative', zIndex: 2 }}>
        {/* First Section */}
        <section style={{ 
          backgroundColor: 'rgba(120, 162, 173, 0.8)', // Slightly transparent background
          padding: '50px 0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
          <div style={{ display: 'flex', maxWidth: '1200px', width: '100%', padding: '0 20px' }}>
            <div style={{ flex: 1 }}>
              <img 
                src="https://picsum.photos/400/400?random=1" 
                alt="Trek Straw Mug"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div style={{ flex: 1, color: 'white', paddingLeft: '20px' }}>
              <h2 style={{ fontSize: '2.5rem', margin: 0 }}>TREK STRAW MUG - 40 OZ</h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                From Timmies 🌹 runs to mountain hikes, Trek Straw Mug's got your back. 
                40 ounces of leak-proof, cup holder-friendly hydration that's true north strong and cold.
              </p>
              <button style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}>
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Second Section */}
        <section style={{ 
          backgroundColor: 'rgba(17, 17, 17, 0.8)', // Slightly transparent background
          padding: '50px 0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh', 
          color: 'white'
        }}>
          <div style={{ display: 'flex', maxWidth: '1200px', width: '100%', padding: '0 20px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2.5rem', margin: 0 }}>
                FROM ARCTIC WHITE TO MAPLE RED, FIND YOUR PERFECT SHADE
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.5', margin: '20px 0' }}>
                Find your perfect shade. Trek Straw Mug offers a palette as varied as our landscapes,
                with 24-hour chill to match. It's time to turn heads while you turn down the heat.
              </p>
              <input 
                type="email" 
                placeholder="Email" 
                style={{ 
                  padding: '10px', 
                  width: '250px', 
                  marginRight: '10px', 
                  border: 'none', 
                  borderRadius: '3px' 
                }} 
              />
              <button style={{
                padding: '10px 15px',
                backgroundColor: '#555',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}>Subscribe</button>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {/* Placeholder images using Picsum */}
              <img src="https://picsum.photos/200/200?random=2" alt="Black Mug" style={{ margin: '10px', maxWidth: '45%' }} />
              <img src="https://picsum.photos/200/200?random=3" alt="White Mug" style={{ margin: '10px', maxWidth: '45%' }} />
              <img src="https://picsum.photos/200/200?random=4" alt="Red Mug" style={{ margin: '10px', maxWidth: '45%' }} />
              <img src="https://picsum.photos/200/200?random=5" alt="Green Mug" style={{ margin: '10px', maxWidth: '45%' }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
