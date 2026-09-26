import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface PlateViewerProps {
  className?: string;
  autoRotate?: boolean;
}

/**
 * High-performance lightweight Three.js 3D Olympic Weight Plate.
 * Enforces strict cleanup, IntersectionObserver pause when offscreen,
 * and graceful fallback for reduced motion.
 */
export const PlateViewer: React.FC<PlateViewerProps> = ({
  className,
  autoRotate = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasWebGlError, setHasWebGlError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number | null = null;
    let isVisible = true;

    try {
      // 1. Scene, Camera, Renderer Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 4.2);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // 2. Lighting Rig (Athletic Studio Chiaroscuro)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xff5e1e, 2.0); // Orange rim light
      keyLight.position.set(3, 4, 3);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
      fillLight.position.set(-3, -2, 2);
      scene.add(fillLight);

      // 3. Olympic Weight Plate Geometry (Cast Iron Outer + Steel Hub)
      const plateGroup = new THREE.Group();

      // Outer Cast Iron Rim
      const outerRingGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.22, 64, 1, false);
      const castIronMat = new THREE.MeshStandardMaterial({
        color: 0x15191e,
        roughness: 0.75,
        metalness: 0.35,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, castIronMat);
      outerRing.rotation.x = Math.PI / 2;
      plateGroup.add(outerRing);

      // Inner Recessed Flange
      const innerRecessGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.25, 48);
      const recessMat = new THREE.MeshStandardMaterial({
        color: 0x0c0f12,
        roughness: 0.85,
        metalness: 0.2,
      });
      const innerRecess = new THREE.Mesh(innerRecessGeo, recessMat);
      innerRecess.rotation.x = Math.PI / 2;
      plateGroup.add(innerRecess);

      // Center Stainless Steel Olympic Sleeve Hub (50mm bore)
      const centerHubGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 36);
      const steelMat = new THREE.MeshStandardMaterial({
        color: 0xd0d5dd,
        roughness: 0.2,
        metalness: 0.9,
      });
      const centerHub = new THREE.Mesh(centerHubGeo, steelMat);
      centerHub.rotation.x = Math.PI / 2;
      plateGroup.add(centerHub);

      // Center Bore Hole ring
      const centerBoreGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 32);
      const boreMat = new THREE.MeshBasicMaterial({ color: 0x08090a });
      const centerBore = new THREE.Mesh(centerBoreGeo, boreMat);
      centerBore.rotation.x = Math.PI / 2;
      plateGroup.add(centerBore);

      scene.add(plateGroup);

      // Initial angle
      plateGroup.rotation.y = 0.4;
      plateGroup.rotation.x = 0.2;

      // 4. Mouse Interactive Tilt
      let targetRotY = 0.4;
      let targetRotX = 0.2;

      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = normX * 0.6 + (autoRotate ? 0 : 0.4);
        targetRotX = -normY * 0.4 + 0.2;
      };

      container.addEventListener('mousemove', handlePointerMove);

      // 5. Intersection Observer to Pause Loop when offscreen
      const observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0]?.isIntersecting ?? false;
        },
        { threshold: 0.1 }
      );
      observer.observe(container);

      // 6. Render Loop with controlled delta
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!isVisible) return;

        if (autoRotate) {
          plateGroup.rotation.y += 0.006;
        } else {
          plateGroup.rotation.y += (targetRotY - plateGroup.rotation.y) * 0.05;
        }
        plateGroup.rotation.x += (targetRotX - plateGroup.rotation.x) * 0.05;

        renderer?.render(scene, camera);
      };

      animate();

      // 7. Responsive Resize
      const handleResize = () => {
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // 8. Cleanup & Disposal
      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousemove', handlePointerMove);

        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }

        // Clean GPU memory
        outerRingGeo.dispose();
        innerRecessGeo.dispose();
        centerHubGeo.dispose();
        centerBoreGeo.dispose();
        castIronMat.dispose();
        recessMat.dispose();
        steelMat.dispose();
        boreMat.dispose();
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to static visual:', err);
      setHasWebGlError(true);
    }
  }, [autoRotate, prefersReducedMotion]);

  if (prefersReducedMotion || hasWebGlError) {
    return (
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-brand-surface/40 border border-brand-border p-6 text-center ${className}`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full border-4 border-brand-volt/40 flex items-center justify-center bg-brand-dark/80 shadow-glow-volt">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-brand-surface" />
          </div>
          <span className="text-xs uppercase tracking-widest text-brand-text-muted font-bold">
            Olympic Iron Discipline
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-grab active:cursor-grabbing w-full h-full ${className}`}
      aria-label="Interactive 3D Olympic Weight Plate"
      role="img"
    />
  );
};
