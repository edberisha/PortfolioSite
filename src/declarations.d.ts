
declare module '*.pdf' {
    const src: string;
    export default src;
  }
  
  declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher, Vector3 } from 'three';
  
    export class OrbitControls extends EventDispatcher {
      enableDamping: boolean;
      dampingFactor: number;
      enableZoom: boolean;
      enableRotate: boolean;
      enablePan: boolean;
      constructor(object: Camera, domElement: HTMLElement);
      object: Camera;
      domElement: HTMLElement;
  
      enabled: boolean;
      target: Vector3;
      minDistance: number;
      maxDistance: number;
      minPolarAngle: number;
      maxPolarAngle: number;
      minAzimuthAngle: number;
      maxAzimuthAngle: number;
  
      update(): void;
      dispose(): void;
    }
  }
  

  