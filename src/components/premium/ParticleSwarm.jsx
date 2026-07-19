import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const ParticleSwarm = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Particles setup
    const count = 25000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material
    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false
    });
    
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    
    // UI Helpers (mocked as requested by the prompt structure)
    const addControl = (id, label, min, max, init) => init; // Static for now
    
    // Pre-allocate objects for the loop to avoid Garbage Collection
    const target = new THREE.Vector3();
    const color = new THREE.Color();
    
    const clock = new THREE.Clock();
    
    // Animation Loop
    let animationFrameId;
    const animate = () => {
      const time = clock.getElapsedTime();
      
      const positionsArr = geometry.attributes.position.array;
      const colorsArr = geometry.attributes.color.array;
      
      const expansion = addControl("scale", "Expansion", 10, 100, 25);
      
      for (let i = 0; i < count; i++) {
        // --- START OF COMPUTATIONAL ARTIST SHADER LOGIC ---
        
        // Use Golden Ratio for even spherical distribution initially
        const phi = i * 2.3999632; 
        const theta = Math.acos(1 - 2 * (i + 0.5) / count);
        
        // Time variables for flowing animation
        const t = time * 0.3;
        
        // Create a breathing, twisting nebula effect
        const breath = Math.sin(t * 2.0 + i * 0.001) * 2.0;
        const radius = expansion + breath + Math.sin(i * 0.1) * 5.0;
        
        // Base spherical coordinates
        let x = radius * Math.sin(theta) * Math.cos(phi + t);
        let y = radius * Math.sin(theta) * Math.sin(phi + t);
        let z = radius * Math.cos(theta);
        
        // Apply a vortex twist around the Y axis
        const distFromCenter = Math.sqrt(x * x + z * z);
        const twistAngle = distFromCenter * 0.05 * Math.sin(t * 0.5);
        
        const tx = x * Math.cos(twistAngle) - z * Math.sin(twistAngle);
        const tz = x * Math.sin(twistAngle) + z * Math.cos(twistAngle);
        
        // Add some noise/chaos
        const chaos = Math.sin(i * 123.456) * 1.5;
        
        target.set(tx, y + chaos, tz);
        
        // Color logic based on spatial position and time
        const hue = (0.5 + (distFromCenter / 40.0) + t * 0.1) % 1.0; 
        // Force vibrant colors (cyan, blue, purple, lime)
        color.setHSL(hue, 0.9, 0.6);
        
        // --- END OF COMPUTATIONAL ARTIST SHADER LOGIC ---
        
        // Update buffers
        positionsArr[i * 3] = target.x;
        positionsArr[i * 3 + 1] = target.y;
        positionsArr[i * 3 + 2] = target.z;
        
        colorsArr[i * 3] = color.r;
        colorsArr[i * 3 + 1] = color.g;
        colorsArr[i * 3 + 2] = color.b;
      }
      
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      
      // Gentle camera rotation
      camera.position.x = Math.sin(time * 0.1) * 50;
      camera.position.z = Math.cos(time * 0.1) * 50;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-24 my-12 bg-black border-y border-white/10">
      {/* 3D Canvas Container */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full z-0 opacity-80 mix-blend-screen"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Foreground Content Overlay */}
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-3xl border border-white/10"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white leading-tight mb-6">
            Data visualization <br/>
            <span className="text-[#c4f82a]">reimagined.</span>
          </h2>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Harnessing the power of high-performance WebGL to render complex, interactive environments at 60fps.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ParticleSwarm;
