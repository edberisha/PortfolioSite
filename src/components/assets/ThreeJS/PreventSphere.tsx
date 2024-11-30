import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface PreventSphereProps {
  fov: number; // Field of view
  particleSize: number; // Size of particles
}

const PreventSphere: React.FC<PreventSphereProps> = ({ fov, particleSize }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Ensure background is set to null for transparency

    // Camera setup
    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 1000); // Use dynamic fov
    camera.position.set(0, -10, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable transparency
    renderer.setSize(300, 300); // Adjust size to fit the sphere
    rendererRef.current = renderer;
    sceneRef.current.appendChild(renderer.domElement);

    // Sphere geometry
    const sphereRadius = 4.0;
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);

    // Generate random points on sphere's surface
    const particlesGeometry = new THREE.BufferGeometry();
    const vertices: THREE.Vector3[] = [];
    for (let i = 0; i < sphereGeometry.attributes.position.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(sphereGeometry.attributes.position, i);
      vertices.push(vertex);
    }
    particlesGeometry.setFromPoints(vertices);

    // Points material
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x41ead4,
      size: particleSize, // Use dynamic particle size
      sizeAttenuation: true,
    });

    // Points mesh
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    sphereRef.current = particles;
    scene.add(particles);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Soft white light
    scene.add(ambientLight);

    // Directional light 1
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    // Directional light 2
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.1);
    directionalLight2.position.set(-1, -1, -1); // Light from the left side
    scene.add(directionalLight2);

    // Orbit controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false; // Disable zooming
    controls.enableRotate = false; // Disable rotation
    controls.enablePan = false; // Disable panning

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the sphere
      if (sphereRef.current) {
        sphereRef.current.rotation.y += 0.006; // Adjust the rotation speed here
        // sphereRef.current.rotation.x += 0.009; // Adjust the rotation speed here
      }

      controls.update(); // Update orbit controls

      renderer.render(scene, camera); // Render the scene
    };

    animate();

    // Clean up
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [ ]); // Re-run effect when fov or particleSize changes

  
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


  return (
    <div ref={sceneRef} style={{ width: '300px', height: '300px', overflow: 'hidden', backgroundColor: 'transparent' }} />
  );
};

export default PreventSphere;
