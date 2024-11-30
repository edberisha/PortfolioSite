import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface DetectSphereProps {
  fov: number;
  particleSize: number;
  rotationSpeed: number; // Speed of rotation
  colorShift: number; // Added colorShift to the props
}

const DetectSphere: React.FC<DetectSphereProps> = ({ fov, particleSize, rotationSpeed, colorShift }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Points | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  
  // Store rotation speed in a ref to ensure it updates dynamically
  const rotationSpeedRef = useRef(rotationSpeed);

  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed; // Update ref with the latest rotationSpeed
  }, [rotationSpeed]); // Update rotationSpeedRef whenever rotationSpeed changes

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create the scene, camera, and renderer only if they don't exist already
    if (!rendererRef.current) {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = null; // Set background color to null for transparency

      // Camera setup
      const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 1000);
      camera.position.set(0, 0, 5);
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(400, 400); // Adjust size to fit the sphere
      renderer.setPixelRatio(window.devicePixelRatio); // Ensure proper scaling on high-DPI screens
      rendererRef.current = renderer;
      sceneRef.current.appendChild(renderer.domElement);

      // Orbit controls setup
      const controls = new OrbitControls(camera, renderer.domElement) as any;
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = true;
      controlsRef.current = controls;

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 4);
      directionalLight1.position.set(1, 1, 1);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.1);
      directionalLight2.position.set(-1, -1, -1);
      scene.add(directionalLight2);

      // Create the sphere geometry and particles
      const sphereRadius = 1.80;
      const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);

      const particlesGeometry = new THREE.BufferGeometry();
      const vertices: THREE.Vector3[] = [];
      for (let i = 0; i < sphereGeometry.attributes.position.count; i++) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(sphereGeometry.attributes.position, i);
        vertices.push(vertex);
      }
      particlesGeometry.setFromPoints(vertices);

      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x41ead4,
        size: particleSize, // Dynamic size of particles
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      sphereRef.current = particles;
      scene.add(particles);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        if (sphereRef.current) {
          // Update rotation speed using the ref
          sphereRef.current.rotation.y += rotationSpeedRef.current; // Use the rotationSpeedRef
          sphereRef.current.rotation.x += rotationSpeedRef.current; // Use the rotationSpeedRef
        }

        if (controlsRef.current) {
          controlsRef.current.update();
        }

        if (rendererRef.current && cameraRef.current) {
          rendererRef.current.render(scene, cameraRef.current);
        }
      };

      animate();
    }

    // Cleanup
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []); // Run this effect only once, when the component is mounted

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [fov]);

  useEffect(() => {
    if (sphereRef.current) {
      (sphereRef.current.material as THREE.PointsMaterial).size = particleSize;
    }
  }, [particleSize]);

  // Handle color shift prop here
  useEffect(() => {
    if (sphereRef.current) {
      const material = sphereRef.current.material as THREE.PointsMaterial;
      material.color.setHSL(colorShift, 1, 0.5); // Apply color shift based on the colorShift prop
    }
  }, [colorShift]);

  return <div ref={sceneRef} style={{ width: '300px', height: '300px', overflow: 'visible' }} />;
};

export default DetectSphere;
