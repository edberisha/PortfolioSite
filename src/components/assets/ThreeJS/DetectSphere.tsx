import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface DetectSphereProps {
  fov: number;
  particleSize: number;
  rotationSpeed: number;
  colorShift: number;
}

const DetectSphere: React.FC<DetectSphereProps> = ({ fov, particleSize, rotationSpeed, colorShift }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Points | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const rotationSpeedRef = useRef(rotationSpeed);

  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    if (!sceneRef.current) return;

    if (!rendererRef.current) {
      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 1000);
      camera.position.set(0, 0, 5);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(400, 400);
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;
      sceneRef.current.appendChild(renderer.domElement);

      // Orbit controls setup with type assertion
      const controls = new OrbitControls(camera, renderer.domElement) as OrbitControls;
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
        size: particleSize,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      sphereRef.current = particles;
      scene.add(particles);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        if (sphereRef.current) {
          sphereRef.current.rotation.y += rotationSpeedRef.current;
          sphereRef.current.rotation.x += rotationSpeedRef.current;
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

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

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

  useEffect(() => {
    if (sphereRef.current) {
      const material = sphereRef.current.material as THREE.PointsMaterial;
      material.color.setHSL(colorShift, 1, 0.5);
    }
  }, [colorShift]);

  return <div ref={sceneRef} style={{ width: '300px', height: '300px', overflow: 'visible' }} />;
};

export default DetectSphere;
