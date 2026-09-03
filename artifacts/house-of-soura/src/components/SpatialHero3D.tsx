import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDownRight, Sparkles, Volume2, VolumeX, MessageCircle, MapPin, Tag, Compass, Rotate3d, Scissors } from 'lucide-react';
import { 
  createLehengaModel, 
  createTailoringTools, 
  getGoldMaterial, 
  getRubyMaterial, 
  getEmeraldMaterial, 
  getPearlMaterial 
} from './Boutique3DModels';
import { spatialSound } from '../lib/SpatialSound';

export function SpatialHero3D({
  onExplore3D,
  onExploreCollection,
}: {
  onExplore3D: () => void;
  onExploreCollection: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [focusedObject, setFocusedObject] = useState<string>('3D Bridal Mannequin');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Atelier Lighting
    const ambientLight = new THREE.AmbientLight(0x3a2c1b, 1.8);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffe8ba, 5.5, 25, Math.PI / 3.5, 0.4);
    mainSpot.position.set(3.5, 5.0, 5.0);
    scene.add(mainSpot);

    const roseLight = new THREE.PointLight(0xe8a0bd, 3.2, 18);
    roseLight.position.set(-3.5, -2.0, 3.0);
    scene.add(roseLight);

    const goldRim = new THREE.PointLight(0xd6b35a, 4.0, 15);
    goldRim.position.set(0, 4.0, -3.0);
    scene.add(goldRim);

    // -----------------------------------------------------------
    // HERO 3D OBJECT 1: Central Floating Couture Bridal Dress Form
    // -----------------------------------------------------------
    const mannequinModel = createLehengaModel('#2e090e');
    mannequinModel.group.position.set(1.4, -0.3, 0);
    mannequinModel.group.scale.set(1.05, 1.05, 1.05);
    scene.add(mannequinModel.group);

    // -----------------------------------------------------------
    // HERO 3D OBJECT 2: Floating Golden Tailoring Shears & Spool
    // -----------------------------------------------------------
    const toolsModel = createTailoringTools();
    toolsModel.group.position.set(-1.8, 0.1, 0.4);
    toolsModel.group.scale.set(0.9, 0.9, 0.9);
    scene.add(toolsModel.group);

    // -----------------------------------------------------------
    // HERO 3D OBJECT 3: Floating Kundan Royal Gemstones & Pendant
    // -----------------------------------------------------------
    const floatingGemsGroup = new THREE.Group();
    scene.add(floatingGemsGroup);

    const goldMat = getGoldMaterial();
    const rubyMat = getRubyMaterial();
    const emeraldMat = getEmeraldMaterial();
    const pearlMat = getPearlMaterial();

    const gemList: { mesh: THREE.Mesh; baseY: number; speed: number; rotSpeed: number }[] = [];

    for (let i = 0; i < 14; i++) {
      const isRuby = i % 2 === 0;
      const geo = isRuby ? new THREE.OctahedronGeometry(0.08 + Math.random() * 0.05, 1) : new THREE.DodecahedronGeometry(0.09, 0);
      const mesh = new THREE.Mesh(geo, isRuby ? rubyMat : emeraldMat);
      
      const angle = (i / 14) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 1.5;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 2.5
      );
      floatingGemsGroup.add(mesh);

      gemList.push({
        mesh,
        baseY: mesh.position.y,
        speed: 1.0 + Math.random() * 1.5,
        rotSpeed: 0.5 + Math.random() * 1.0,
      });
    }

    // -----------------------------------------------------------
    // HERO 3D OBJECT 4: Glowing Golden Silk Stardust Field
    // -----------------------------------------------------------
    const particleCount = 260;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = Math.random() * 0.003 + 0.001;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(0xd6b35a),
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Cursor tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseX = x;
      targetMouseY = y;
    };

    window.addEventListener('mousemove', onPointerMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse parallax
      curMouseX += (targetMouseX - curMouseX) * 0.05;
      curMouseY += (targetMouseY - curMouseY) * 0.05;

      camera.position.x = curMouseX * 0.8;
      camera.position.y = curMouseY * 0.6;
      camera.lookAt(0, 0, 0);

      // Animate Mannequin Model
      mannequinModel.update(time, delta);
      mannequinModel.group.rotation.y = time * 0.25 + curMouseX * 0.4;
      mannequinModel.group.rotation.x = curMouseY * 0.15;

      // Animate Tailoring Tools
      toolsModel.update(time, delta);
      toolsModel.group.rotation.y = -time * 0.2 + curMouseX * 0.3;
      toolsModel.group.position.y = 0.1 + Math.sin(time * 1.8) * 0.08;

      // Animate Floating Gemstones
      gemList.forEach((gem, idx) => {
        gem.mesh.position.y = gem.baseY + Math.sin(time * gem.speed + idx) * 0.15;
        gem.mesh.rotation.x += delta * gem.rotSpeed;
        gem.mesh.rotation.y += delta * gem.rotSpeed * 1.2;
      });

      // Animate Stardust Particles
      const pos = particleGeo.attributes.position;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] += velocities[i * 3 + 1];
        if (arr[i * 3 + 1] > 5) {
          arr[i * 3 + 1] = -5;
          arr[i * 3] = (Math.random() - 0.5) * 14;
        }
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const toggleSound = () => {
    const muted = spatialSound.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#0c0a09] text-white select-none"
    >
      {/* 3D WebGL Canvas Viewport */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-90" 
      />

      {/* Luxury Vignette & Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-[#0c0a09]/80 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0c0a09]/40 to-[#0c0a09]/95 pointer-events-none z-[1]" />

      {/* Floating 3D Badge Indicators */}
      <div className="absolute top-24 left-6 sm:left-12 z-10 hidden md:flex items-center gap-3 bg-[#181412]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#d6b35a]/30 shadow-xl animate-pulse">
        <span className="w-2.5 h-2.5 rounded-full bg-[#d6b35a]" />
        <span className="text-xs font-mono text-[#e5be62] tracking-wider uppercase font-semibold">
          Live 3D Moving Atelier Objects
        </span>
      </div>

      <div className="absolute top-24 right-6 sm:right-12 z-10 hidden md:flex items-center gap-3">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 bg-[#181412]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-xs text-[#c4b5a5] hover:text-white hover:border-[#d6b35a]/40 transition-all shadow-xl"
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#d6b35a]" />}
          <span>{isAudioMuted ? 'Unmute Atelier Ambience' : 'Atelier Ambience Active'}</span>
        </button>
      </div>

      {/* Central Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center">
        
        {/* Luxury Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d6b35a]/15 border border-[#d6b35a]/30 text-[#e5be62] text-xs uppercase tracking-widest font-semibold mb-6 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          Miyapur's Premier 3D Designer Boutique
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight text-white max-w-5xl leading-[1.08] drop-shadow-2xl">
          Bespoke Couture <br />
          <span className="bg-gradient-to-r from-[#f7e1b5] via-[#d6b35a] to-[#e8a0bd] bg-clip-text text-transparent italic">
            In Living 3D
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#d4c5b6] max-w-2xl font-light leading-relaxed drop-shadow">
          Experience handcrafted bridal lehengas, authentic maggam embroidery blouses with swaying latkans, and pure Kanjivaram silk sarees in real-time 3D motion.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              spatialSound.playChime(659, 0.4);
              onExplore3D();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#d6b35a] via-[#e5be62] to-[#c99e3a] text-[#14100e] font-bold text-sm tracking-wider uppercase shadow-2xl shadow-[#d6b35a]/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            <Rotate3d className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
            <span>Enter 3D Interactive Atelier</span>
          </button>

          <button
            onClick={() => {
              spatialSound.playClick();
              onExploreCollection();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1e1916]/80 backdrop-blur-md border border-[#d6b35a]/30 text-white font-medium text-sm tracking-wider uppercase hover:bg-[#2c2420] hover:border-[#d6b35a] transition-all flex items-center justify-center gap-2"
          >
            <span>View Brochure Collections</span>
            <ArrowDownRight className="w-4 h-4 text-[#d6b35a]" />
          </button>
        </div>

        {/* Live 3D Stats Strip */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full border-t border-white/10 pt-8">
          <div className="text-center p-3 rounded-2xl bg-[#161210]/60 backdrop-blur-md border border-white/5">
            <p className="text-2xl sm:text-3xl font-serif text-[#e5be62] font-bold">360°</p>
            <p className="text-[11px] text-[#a8998a] uppercase tracking-wider mt-1">3D Rotation & Zoom</p>
          </div>
          <div className="text-center p-3 rounded-2xl bg-[#161210]/60 backdrop-blur-md border border-white/5">
            <p className="text-2xl sm:text-3xl font-serif text-[#e8a0bd] font-bold">180+ Hrs</p>
            <p className="text-[11px] text-[#a8998a] uppercase tracking-wider mt-1">Maggam Needlework</p>
          </div>
          <div className="text-center p-3 rounded-2xl bg-[#161210]/60 backdrop-blur-md border border-white/5">
            <p className="text-2xl sm:text-3xl font-serif text-[#e5be62] font-bold">6 Hues</p>
            <p className="text-[11px] text-[#a8998a] uppercase tracking-wider mt-1">Live 3D Fabric Palette</p>
          </div>
          <div className="text-center p-3 rounded-2xl bg-[#161210]/60 backdrop-blur-md border border-white/5">
            <p className="text-2xl sm:text-3xl font-serif text-[#e8a0bd] font-bold">Miyapur</p>
            <p className="text-[11px] text-[#a8998a] uppercase tracking-wider mt-1">Flagship Studio</p>
          </div>
        </div>
      </div>
    </section>
  );
}
