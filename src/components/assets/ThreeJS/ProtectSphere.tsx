import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProtectSphereProps {
  fov: number; // Field of view prop
  particleSize: number; // Dynamic particle size
}

const ProtectSphere: React.FC<ProtectSphereProps> = ({ fov, particleSize }) => {

  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const sphereRef = useRef<THREE.Points | null>(null);
  const radiusRef = useRef<number>(1.75); // Initial radius

  useEffect(() => {
    
    if (!sceneRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Set background to null for transparency

    // Camera setup
    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 1000); // Adjust aspect ratio to 1:1
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 300); // Adjust size to fit the sphere
    rendererRef.current = renderer;
    sceneRef.current.appendChild(renderer.domElement);

    // Generate sphere geometry
    const generateSphereGeometry = (radius: number) => {
      const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const particlesGeometry = new THREE.BufferGeometry();
      const vertices: THREE.Vector3[] = [];
      for (let i = 0; i < sphereGeometry.attributes.position.count; i++) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(sphereGeometry.attributes.position, i);
        vertices.push(vertex);
      }
      particlesGeometry.setFromPoints(vertices);
      return particlesGeometry;
    };

    // Points material
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x41ead4,
      size: particleSize, // Use dynamic size of particles
      sizeAttenuation: true,
    });

    // Initial sphere geometry and mesh
    const particlesGeometry = generateSphereGeometry(radiusRef.current);
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    sphereRef.current = particles;
    scene.add(particles);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Soft white light
    scene.add(ambientLight);

    // Directional lights
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.1);
    directionalLight2.position.set(-1, -1, -1); // Light from the left side
    scene.add(directionalLight2);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update sphere radius using cosine function
      const time = performance.now() * 0.001;
      const amplitude = 0.15; // Amplitude of radius change
      const frequency = 1; // Frequency of oscillation
      const deltaRadius = Math.cos(time * frequency) * amplitude;
      radiusRef.current = 1.75 + deltaRadius; // Update current radius

      // Regenerate geometry with updated radius
      const updatedParticlesGeometry = generateSphereGeometry(radiusRef.current);
      particles.geometry.dispose(); // Dispose old geometry
      particles.geometry = updatedParticlesGeometry;
      particles.geometry.attributes.position.needsUpdate = true;



      renderer.render(scene, camera); // Render the scene
    };

    animate();

    // Clean up
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []); // Re-run effect when fov or particleSize changes

  useEffect(() => {
    // Update camera FOV when it changes
    if (cameraRef.current) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [fov]);

  useEffect(() => {
    // Update particle size when it changes
    if (sphereRef.current) {
      (sphereRef.current.material as THREE.PointsMaterial).size = particleSize;
    }
  }, [particleSize]);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [fov]);

  return (
    <div
      ref={sceneRef}
      style={{ width: '300px', height: '300px', overflow: 'hidden', backgroundColor: 'transparent' }}
    />
  );
};

export default ProtectSphere;
