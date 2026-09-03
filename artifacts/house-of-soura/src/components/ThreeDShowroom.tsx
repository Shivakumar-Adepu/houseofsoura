import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Rotate3d, 
  Sparkles, 
  Sun, 
  Eye, 
  Compass,
  MessageCircle,
  Scissors,
  Layers,
  Palette,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sliders,
  Check,
  ChevronRight,
  Info,
  Flame,
  Volume2,
  VolumeX
} from 'lucide-react';
import { 
  createLehengaModel, 
  createBlouseModel, 
  createSilkSareeModel, 
  createJewelryModel, 
  createPotliModel, 
  createTailoringTools,
  AnimatedBoutiqueObject 
} from './Boutique3DModels';
import { spatialSound } from '../lib/SpatialSound';

export type Product3DKey = 'designer-wear' | 'blouses' | 'silk-sarees' | 'ethnic-wear' | 'western-wear' | 'daily-wear' | 'atelier-tools';

interface BoutiqueShowcaseItem {
  id: Product3DKey;
  name: string;
  category: string;
  subtitle: string;
  badge: string;
  description: string;
  craftHighlights: string[];
  fabricSpecs: string;
  customizationNotes: string;
  hotspots: {
    title: string;
    description: string;
    position: [number, number, number];
  }[];
}

const BOUTIQUE_3D_ITEMS: Record<Product3DKey, BoutiqueShowcaseItem> = {
  'designer-wear': {
    id: 'designer-wear',
    name: 'Royal Zardozi Bridal Lehenga',
    category: '01 / Haute Couture',
    subtitle: '360° Sculpted Bridal & Reception Silhouette',
    badge: 'Flagship 3D Couture',
    description: 'Opulent royal black & antique gold bridal lehenga hand-embroidered with micro zardozi needlework, floral zari jal, and a sculpted sweetheart blouse with velvet pallu.',
    craftHighlights: [
      'Authentic metallic gold zardozi & dabka needlework',
      'Flared 36-kali skirt with built-in structured cancan volume',
      'Sweetheart neck with pearl trim and drop latkans',
      'Explodable 3D view reveals internal boning & drape'
    ],
    fabricSpecs: 'Pure Raw Silk • Royal Micro-Velvet • 24k Gold Wire Zari',
    customizationNotes: 'Custom bridal drafting takes 3-4 weeks with personal fittings in Miyapur studio.',
    hotspots: [
      { title: 'Zardozi Neckline', description: 'Hand-sewn micro dabka and antique gold wire embroidery.', position: [0, 0.9, 0.35] },
      { title: 'Brooch & Waistband', description: 'Cast gold buckle embedded with faceted ruby gemstone.', position: [0, 0.22, 0.35] },
      { title: 'Swaying Latkans', description: 'Dual tier metallic gold bells with freshwater pearls.', position: [0.2, 0.0, 0.35] },
      { title: 'Kalidar Zari Hem', description: 'Broad temple border with 64 scalloped pearl drops.', position: [0.6, -1.0, 0.4] },
    ]
  },
  'blouses': {
    id: 'blouses',
    name: 'Peacock Maggam Bridal Blouse',
    category: '02 / Designer Blouses',
    subtitle: 'Handcrafted Zardozi & Aari Couture with Swaying Latkans',
    badge: 'Atelier Signature',
    description: 'Bespoke bridal blouse featuring 180 hours of hand-guided aari and maggam embroidery on royal velvet with peacock motifs, pearl drops, and scalloped sweetheart cutwork.',
    craftHighlights: [
      '180 hours of intricate maggam & bead needlework',
      'Scalloped cutwork neckline contouring collarbone',
      'Physics-animated hanging dori latkans with gold bells',
      'Custom padded bustier tailored to exact measurements'
    ],
    fabricSpecs: 'Micro-Velvet Foundation • Pure Raw Silk Lining • Pearl Beads',
    customizationNotes: 'Designed to perfectly complement your heirloom bridal silk saree.',
    hotspots: [
      { title: 'Peacock Motif', description: 'Hand-guided aari needlework with emerald & ruby accents.', position: [0, 0.16, 0.32] },
      { title: 'Sweetheart Cutwork', description: 'Scalloped gold borders contouring neckline.', position: [0.15, 0.35, 0.28] },
      { title: 'Hanging Back Latkan', description: 'Hand-strung gold tassel bells with pearl core.', position: [0.08, -0.2, -0.3] },
    ]
  },
  'silk-sarees': {
    id: 'silk-sarees',
    name: 'Pure Kanjivaram Brocade Silk Saree',
    category: '03 / Premium Silk Sarees',
    subtitle: 'Heirloom Handloom Pure Gold Zari with Flowing Pallu',
    badge: 'Silk Mark Certified',
    description: 'Handloom Kanjivaram pure silk saree woven with 3-ply mulberry silk and certified gold zari. Features authentic korvai temple borders and an undulating silk pallu.',
    craftHighlights: [
      'Pure 3-ply mulberry silk with Silk Mark authentication',
      'Dynamic undulating 3D sine-wave silk pallu drape',
      'Traditional Korvai interlock temple border weaving',
      'Accompanied by unstitched matching designer blouse piece'
    ],
    fabricSpecs: '100% Pure Mulberry Silk • Handloom Weave • Gold Zari',
    customizationNotes: 'Custom maggam work available on the accompanying blouse piece.',
    hotspots: [
      { title: 'Undulating Pallu', description: 'Fluid silk cloth responding to virtual atelier breeze.', position: [0.2, 0.4, 0.1] },
      { title: 'Temple Korvai Border', description: 'Ancient hand-interlocked temple triangle zari.', position: [0.2, 1.15, 0.05] },
      { title: 'Pure Silk Roll', description: 'Tight 3-ply mulberry silk warp and weft weave.', position: [-0.25, -0.65, 0.2] },
    ]
  },
  'ethnic-wear': {
    id: 'ethnic-wear',
    name: 'Sage Gota-Patti Anarkali Ensemble',
    category: '04 / Ethnic Wear',
    subtitle: '36-Kali Flared Festive Silhouette',
    badge: 'Festive Grandeur',
    description: 'Regal sage green floor-length 36-kali flared anarkali gown adorned with champagne gota-patti embroidery, mirror highlights, and a scalloped pure organza dupatta.',
    craftHighlights: [
      '36-kali flared silhouette with dramatic 360° floor glide',
      'Detailed gotta-patti needlework on high-neck yoke and sleeves',
      'Lightweight breathable lining for long celebration wear',
      'Coordinated organza dupatta with multi-tiered gold lace'
    ],
    fabricSpecs: 'Pure Chanderi Silk • Cotton Voile Lining • Organza Dupatta',
    customizationNotes: 'Available in custom festive hues (Emerald, Ruby, Mustard, Powder Blue).',
    hotspots: [
      { title: 'Gota-Patti Neckline', description: 'Lustrous ribbon appliqué with antique gold thread.', position: [0, 0.8, 0.3] },
      { title: '360° Kali Flare', description: 'Architecturally structured multi-tier panels.', position: [0.5, -0.4, 0.4] },
    ]
  },
  'western-wear': {
    id: 'western-wear',
    name: 'Royal Kundan Choker & Jhumka Set',
    category: '05 / Fine Jewellery',
    subtitle: 'Hand-Cast 24k Gold & Gemstone Ensemble',
    badge: 'Heirloom Jewels',
    description: 'Breathtaking 3D Kundan choker necklace accompanied by dual multi-tier spinning jhumka earrings studded with rubies, emeralds, and glowing freshwater pearls.',
    craftHighlights: [
      'Ornate hand-cast 24k gold choker with 9 gemstone settings',
      'Dual multi-tier spinning jhumkas with hanging pearl fringe',
      'Large center royal ruby pendant with pearl rosette',
      'Black velvet exhibition bust mounting'
    ],
    fabricSpecs: '24k Gold Plated Brass • Faceted Rubies • Emeralds • Pearls',
    customizationNotes: 'Available with matching maang tikka and bridal haathphool on request.',
    hotspots: [
      { title: 'Royal Ruby Centerpiece', description: 'Faceted oval gemstone mounted in gold kundan collet.', position: [0, -0.05, 0.35] },
      { title: 'Spinning Jhumkas', description: 'Dual bell earrings with acoustic gold clappers.', position: [0.65, 0.3, 0.1] },
      { title: 'Choker Neckband', description: 'Flexible articulated gold links with velvet tie-cord.', position: [0, 0.1, 0.28] },
    ]
  },
  'daily-wear': {
    id: 'daily-wear',
    name: 'Bridal Velvet Beaded Potli Bag',
    category: '06 / Accessories',
    subtitle: 'Hand-Embroidered Drawstring Clutch',
    badge: 'Bridal Essentials',
    description: 'Lustrous gathered velvet pouch adorned with floral zardozi embroidery, pearl handle strap, and long swaying latkan bells.',
    craftHighlights: [
      'Rich micro-velvet gathered bag body with satin lining',
      'Braided freshwater pearl handle strap',
      'Dual hanging gold tassel bells with pearl cores',
      'Solid gold drawstring retention collar'
    ],
    fabricSpecs: 'Royal Velvet • Satin Lining • Pearl Handle • Gold Tassels',
    customizationNotes: 'Monogram embroidery available with bride & groom initials.',
    hotspots: [
      { title: 'Gathered Velvet Frills', description: 'Soft ruffled crown with gold drawstring ring.', position: [0, 0.45, 0.1] },
      { title: 'Pearl Handle', description: 'Heavy strung pearl cord for wrist carry.', position: [0, 0.9, 0.1] },
      { title: 'Swaying Potli Latkans', description: 'Dangling gold tassels that swing with motion.', position: [0.22, 0.0, 0.2] },
    ]
  },
  'atelier-tools': {
    id: 'atelier-tools',
    name: 'Master Atelier Tailoring Instruments',
    category: '07 / Craft Instruments',
    subtitle: 'Moving 3D Shears, Spools & Measuring Helix',
    badge: 'Behind The Craft',
    description: 'Interactive animated 3D tailoring suite featuring golden cutting shears opening and closing, a spinning gold silk thread spool, and a spiraling tape measure.',
    craftHighlights: [
      'Continuous scissor cutting motion with gold blade sheen',
      'Spinning wooden spool with flowing metallic zari thread',
      'Spiraling 3D measuring tape with millimetre gradations',
      'The authentic tools used in our Miyapur boutique studio'
    ],
    fabricSpecs: 'Forged Gold Finish Steel • Polished Rosewood • Zari Thread',
    customizationNotes: 'Every stitch in House of Soura is hand-drafted with bespoke precision.',
    hotspots: [
      { title: 'Golden Shears', description: 'Bespoke tailoring scissors with precision pivot screw.', position: [-1.1, 0.4, 0.2] },
      { title: 'Silk Thread Spool', description: 'Spooling pure zari wire for bridal embroidery.', position: [1.1, -0.1, 0.3] },
      { title: 'Tape Measure Spiral', description: 'Flexible measuring tape for precise body drafting.', position: [0, -0.9, 0.4] },
    ]
  }
};

const COLOR_PALETTE = [
  { id: 'maroon', name: 'Royal Maroon Velvet', hex: '#3b080d', border: '#e5be62' },
  { id: 'emerald', name: 'Emerald Brocade', hex: '#0a3d2c', border: '#52b788' },
  { id: 'noir', name: 'Midnight Noir Gold', hex: '#141414', border: '#ffd700' },
  { id: 'gold', name: 'Champagne Liquid Gold', hex: '#8a6d2b', border: '#fff2a8' },
  { id: 'rose', name: 'Blush Rose Silk', hex: '#7a2048', border: '#f4a261' },
  { id: 'sapphire', name: 'Royal Peacock Blue', hex: '#0c2444', border: '#64dfdf' },
];

type LightingMode = 'chandelier' | 'studio' | 'evening';

const LIGHTING_PRESETS: { id: LightingMode; label: string; icon: string; desc: string }[] = [
  { id: 'chandelier', label: 'Boutique Chandelier', icon: '✨', desc: 'Warm 3000K chandelier studio lighting' },
  { id: 'studio', label: 'Daylight Studio', icon: '☀️', desc: 'Crisp diffused 5500K daylight inspection' },
  { id: 'evening', label: 'Evening Stage', icon: '🌙', desc: 'Dramatic spotlights for reception wear' },
];

export function ThreeDShowroom({
  initialProductKey = 'designer-wear',
  onRequestViewing,
}: {
  initialProductKey?: Product3DKey;
  onRequestViewing?: (productName: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeItemKey, setActiveItemKey] = useState<Product3DKey>(initialProductKey);
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_PALETTE[0].hex);
  const [activeLighting, setActiveLighting] = useState<LightingMode>('chandelier');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [explodeValue, setExplodeValue] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [enableAnimation, setEnableAnimation] = useState<boolean>(true);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const currentObjectRef = useRef<AnimatedBoutiqueObject | { group: THREE.Group; update: (time: number, delta: number) => void } | null>(null);
  const objectContainerGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    mainSpot: THREE.SpotLight;
    warmFill: THREE.PointLight;
    rimLight: THREE.PointLight;
    podiumLight: THREE.PointLight;
  } | null>(null);

  // Drag / Orbit interaction state
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.005 });
  const targetCameraDistanceRef = useRef(4.8);
  const currentCameraDistanceRef = useRef(4.8);

  const currentItem = BOUTIQUE_3D_ITEMS[activeItemKey];

  // Lighting Preset Handler
  const applyLightingPreset = useCallback((preset: LightingMode) => {
    const lights = lightsRef.current;
    if (!lights) return;

    if (preset === 'chandelier') {
      lights.ambient.color.setHex(0x382c1e);
      lights.ambient.intensity = 1.8;

      lights.mainSpot.color.setHex(0xffe8ba);
      lights.mainSpot.intensity = 6.0;
      lights.mainSpot.position.set(3.0, 5.0, 4.0);

      lights.warmFill.color.setHex(0xe8a0bd);
      lights.warmFill.intensity = 3.0;

      lights.rimLight.color.setHex(0xd6b35a);
      lights.rimLight.intensity = 4.5;

      lights.podiumLight.color.setHex(0xd6b35a);
      lights.podiumLight.intensity = 3.5;
    } else if (preset === 'studio') {
      lights.ambient.color.setHex(0x353535);
      lights.ambient.intensity = 2.6;

      lights.mainSpot.color.setHex(0xffffff);
      lights.mainSpot.intensity = 4.8;
      lights.mainSpot.position.set(0, 5.5, 4.5);

      lights.warmFill.color.setHex(0xfff5ea);
      lights.warmFill.intensity = 2.5;

      lights.rimLight.color.setHex(0xffffff);
      lights.rimLight.intensity = 3.0;

      lights.podiumLight.color.setHex(0xffffff);
      lights.podiumLight.intensity = 2.5;
    } else if (preset === 'evening') {
      lights.ambient.color.setHex(0x161210);
      lights.ambient.intensity = 1.0;

      lights.mainSpot.color.setHex(0xffdd88);
      lights.mainSpot.intensity = 8.0;
      lights.mainSpot.position.set(0, 6.0, 3.5);

      lights.warmFill.color.setHex(0xec4899);
      lights.warmFill.intensity = 4.0;

      lights.rimLight.color.setHex(0x60a5fa);
      lights.rimLight.intensity = 4.5;

      lights.podiumLight.color.setHex(0xd6b35a);
      lights.podiumLight.intensity = 5.0;
    }
  }, []);

  // Switch 3D Product Mesh
  const load3DProduct = useCallback((itemKey: Product3DKey, color: string) => {
    if (!objectContainerGroupRef.current) return;
    const parent = objectContainerGroupRef.current;

    // Clean old object
    while (parent.children.length > 0) {
      parent.remove(parent.children[0]);
    }

    let newObj: AnimatedBoutiqueObject | { group: THREE.Group; update: (time: number, delta: number) => void };

    switch (itemKey) {
      case 'designer-wear':
        newObj = createLehengaModel(color);
        break;
      case 'blouses':
        newObj = createBlouseModel(color);
        break;
      case 'silk-sarees':
        newObj = createSilkSareeModel(color);
        break;
      case 'western-wear':
        newObj = createJewelryModel();
        break;
      case 'daily-wear':
        newObj = createPotliModel(color);
        break;
      case 'atelier-tools':
        newObj = createTailoringTools();
        break;
      case 'ethnic-wear':
      default:
        newObj = createLehengaModel(color);
        break;
    }

    parent.add(newObj.group);
    currentObjectRef.current = newObj;

    // Reset exploded state
    setIsExploded(false);
    setExplodeValue(0);
    setActiveHotspotIndex(null);
  }, []);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 580;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0.3, 4.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 1. Dynamic Lighting
    const ambient = new THREE.AmbientLight(0x382c1e, 1.8);
    scene.add(ambient);

    const mainSpot = new THREE.SpotLight(0xffe8ba, 6.0, 18, Math.PI / 3.5, 0.45);
    mainSpot.position.set(3.0, 5.0, 4.0);
    scene.add(mainSpot);

    const warmFill = new THREE.PointLight(0xe8a0bd, 3.0, 12);
    warmFill.position.set(-3.5, 1.0, 3.0);
    scene.add(warmFill);

    const rimLight = new THREE.PointLight(0xd6b35a, 4.5, 12);
    rimLight.position.set(0, 3.5, -3.5);
    scene.add(rimLight);

    const podiumLight = new THREE.PointLight(0xd6b35a, 3.5, 8);
    podiumLight.position.set(0, -1.5, 0);
    scene.add(podiumLight);

    lightsRef.current = { ambient, mainSpot, warmFill, rimLight, podiumLight };

    // 2. Boutique Luxury Marble Stage Podium
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const marbleMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x141210),
      roughness: 0.2,
      metalness: 0.25,
    });
    const podiumMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.8, 0.25, 64), marbleMat);
    podiumMesh.position.y = -1.65;
    stageGroup.add(podiumMesh);

    const goldBorderMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xd4af37),
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 0.9,
    });
    const goldRing = new THREE.Mesh(new THREE.TorusGeometry(1.66, 0.035, 16, 64), goldBorderMat);
    goldRing.rotation.x = Math.PI / 2;
    goldRing.position.y = -1.52;
    stageGroup.add(goldRing);

    // Inner Glowing Ring
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.02, 16, 64), goldBorderMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = -1.51;
    stageGroup.add(innerRing);

    // 3. Floating Stardust Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd6b35a,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Object Root Container
    const objectContainer = new THREE.Group();
    scene.add(objectContainer);
    objectContainerGroupRef.current = objectContainer;

    // Load initial model
    load3DProduct(activeItemKey, selectedColor);

    // 5. Animation Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Camera distance interpolation
      currentCameraDistanceRef.current += (targetCameraDistanceRef.current - currentCameraDistanceRef.current) * 0.1;
      camera.position.z = currentCameraDistanceRef.current;

      // Auto rotation & inertia damping
      if (objectContainerGroupRef.current) {
        if (autoRotate && !isDraggingRef.current) {
          objectContainerGroupRef.current.rotation.y += 0.008;
        } else if (!isDraggingRef.current) {
          objectContainerGroupRef.current.rotation.y += rotationVelocityRef.current.y;
          objectContainerGroupRef.current.rotation.x += rotationVelocityRef.current.x;
          rotationVelocityRef.current.x *= 0.92;
          rotationVelocityRef.current.y *= 0.92;
        }
      }

      // Update 3D model specific physics/cloth
      if (currentObjectRef.current && enableAnimation) {
        currentObjectRef.current.update(time, delta);
      }

      // Gently rotate stardust
      particles.rotation.y = time * 0.04;

      renderer.render(scene, camera);
    };

    renderLoop();

    // 6. Resize Observer
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
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [load3DProduct]);

  // Handle Drag / Touch Rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !objectContainerGroupRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;

    objectContainerGroupRef.current.rotation.y += deltaX * 0.008;
    objectContainerGroupRef.current.rotation.x = Math.max(
      -0.4,
      Math.min(0.4, objectContainerGroupRef.current.rotation.x + deltaY * 0.006)
    );

    rotationVelocityRef.current = { x: deltaY * 0.001, y: deltaX * 0.002 };
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.003;
    targetCameraDistanceRef.current = Math.max(2.8, Math.min(6.8, targetCameraDistanceRef.current + zoomDelta));
  };

  // Explode Layers Progress Handler
  const handleToggleExplode = () => {
    spatialSound.playClick();
    const nextExploded = !isExploded;
    setIsExploded(nextExploded);

    const targetVal = nextExploded ? 1.0 : 0.0;
    setExplodeValue(targetVal);

    if (currentObjectRef.current && 'setExplodeProgress' in currentObjectRef.current && currentObjectRef.current.setExplodeProgress) {
      currentObjectRef.current.setExplodeProgress(targetVal);
    }
  };

  // Color selection
  const handleSelectColor = (colorHex: string) => {
    spatialSound.playClick();
    setSelectedColor(colorHex);
    if (currentObjectRef.current && 'setColor' in currentObjectRef.current && currentObjectRef.current.setColor) {
      currentObjectRef.current.setColor(colorHex);
    }
  };

  // Switch Active 3D Product
  const handleSelectProduct = (key: Product3DKey) => {
    spatialSound.playChime(659, 0.4);
    setActiveItemKey(key);
    load3DProduct(key, selectedColor);
  };

  // Reset Camera View
  const handleResetCamera = () => {
    spatialSound.playClick();
    targetCameraDistanceRef.current = 4.8;
    if (objectContainerGroupRef.current) {
      objectContainerGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const openWhatsAppInquiry = () => {
    spatialSound.playChime(784, 0.6);
    const colorObj = COLOR_PALETTE.find(c => c.hex === selectedColor);
    const msg = `Namaste House of Soura! I am admiring the 3D "${currentItem.name}" (${colorObj?.name || 'Custom Color'}) in your 3D Atelier. I would like to consult with your master designer regarding custom stitching, fabric customization, and price details.`;
    window.open(`https://wa.me/918341984852?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="gallery-3d" className="relative py-20 bg-gradient-to-b from-[#0e0c0b] via-[#161311] to-[#0e0c0b] text-white overflow-hidden border-y border-[#d6b35a]/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d6b35a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e8a0bd]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d6b35a]/15 border border-[#d6b35a]/30 text-[#e5be62] text-xs uppercase tracking-widest font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive 3D Boutique Atelier
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
            Explore Moving 3D <span className="italic text-[#e5be62]">Boutique Creations</span>
          </h2>
          <p className="mt-3 text-[#c4b5a5] text-sm sm:text-base leading-relaxed">
            Drag to rotate 360°, inspect pure zardozi craftsmanship, explode construction layers, and test live bespoke colors on actual 3D boutique garments and atelier instruments.
          </p>
        </div>

        {/* 3D Product Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {(Object.keys(BOUTIQUE_3D_ITEMS) as Product3DKey[]).map((key) => {
            const item = BOUTIQUE_3D_ITEMS[key];
            const isActive = activeItemKey === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectProduct(key)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d6b35a] to-[#e5be62] text-[#14100e] shadow-lg shadow-[#d6b35a]/25 font-bold scale-105'
                    : 'bg-[#1e1a17]/80 text-[#c4b5a5] hover:text-white hover:bg-[#2a2420] border border-white/5'
                }`}
              >
                <span>{item.name.split(' ')[0]} {item.name.split(' ')[1]}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-black/20 text-[#14100e]' : 'bg-white/10 text-[#d6b35a]'}`}>
                  {key === 'atelier-tools' ? 'Tools' : '3D'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 3D Interactive Stage + Control Suite Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3D VIEWPORT CANVAS (7 COLS) */}
          <div className="lg:col-span-7 bg-[#14110f]/90 rounded-3xl p-4 sm:p-6 border border-[#d6b35a]/30 shadow-2xl backdrop-blur-xl relative group">
            
            {/* Top Toolbar overlay on Canvas */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-[#d6b35a] uppercase tracking-wider font-semibold">
                  3D WebGL Canvas • {currentItem.badge}
                </span>
              </div>

              {/* Interaction Action Icons */}
              <div className="flex items-center gap-2">
                {/* Auto Rotate Toggle */}
                <button
                  onClick={() => {
                    spatialSound.playClick();
                    setAutoRotate(!autoRotate);
                  }}
                  title={autoRotate ? 'Pause 360° Rotation' : 'Start 360° Rotation'}
                  className={`p-2 rounded-lg text-xs transition-all ${
                    autoRotate ? 'bg-[#d6b35a] text-[#14100e]' : 'bg-[#26201c] text-[#c4b5a5] hover:text-white'
                  }`}
                >
                  <Rotate3d className="w-4 h-4" />
                </button>

                {/* Animation physics toggle */}
                <button
                  onClick={() => {
                    spatialSound.playClick();
                    setEnableAnimation(!enableAnimation);
                  }}
                  title={enableAnimation ? 'Pause Motion & Sway' : 'Enable Motion & Sway'}
                  className={`p-2 rounded-lg text-xs transition-all ${
                    enableAnimation ? 'bg-[#e8a0bd] text-[#14100e]' : 'bg-[#26201c] text-[#c4b5a5] hover:text-white'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                </button>

                {/* Reset Camera */}
                <button
                  onClick={handleResetCamera}
                  title="Reset Camera View"
                  className="p-2 rounded-lg bg-[#26201c] text-[#c4b5a5] hover:text-white transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Canvas Container */}
            <div 
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onWheel={handleWheel}
              className="relative w-full h-[380px] sm:h-[480px] rounded-2xl bg-gradient-to-b from-[#1b1714] to-[#0d0b09] overflow-hidden cursor-grab active:cursor-grabbing border border-white/5 flex items-center justify-center select-none"
            >
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Interaction Hint Overlay */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-[#c4b5a5] flex items-center gap-2 pointer-events-none">
                <Compass className="w-3.5 h-3.5 text-[#d6b35a]" />
                Drag to Orbit 360° • Scroll to Zoom
              </div>

              {/* Explode Indicator Tag */}
              {isExploded && (
                <div className="absolute top-3 left-3 bg-[#d6b35a] text-[#14100e] text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                  <Layers className="w-3.5 h-3.5" />
                  Craft Layers Deconstructed
                </div>
              )}

              {/* 3D Hotspots Overlay Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                {currentItem.hotspots.map((spot, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      spatialSound.playClick();
                      setActiveHotspotIndex(activeHotspotIndex === idx ? null : idx);
                    }}
                    className={`text-left text-[11px] px-2.5 py-1.5 rounded-lg backdrop-blur-md border transition-all ${
                      activeHotspotIndex === idx
                        ? 'bg-[#d6b35a] text-[#14100e] border-[#d6b35a] font-bold shadow-lg'
                        : 'bg-black/50 text-[#c4b5a5] hover:text-white border-white/10'
                    }`}
                  >
                    📍 {spot.title}
                  </button>
                ))}
              </div>

              {/* Active Hotspot Detail Card */}
              {activeHotspotIndex !== null && (
                <div className="absolute bottom-12 right-3 max-w-xs bg-[#1a1614]/95 border border-[#d6b35a]/60 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#e5be62] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {currentItem.hotspots[activeHotspotIndex].title}
                    </span>
                    <button 
                      onClick={() => setActiveHotspotIndex(null)}
                      className="text-[#c4b5a5] hover:text-white text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[12px] text-[#e8dfd8] leading-relaxed">
                    {currentItem.hotspots[activeHotspotIndex].description}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom 3D Mode Bar (Explode + Lighting Presets) */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              
              {/* Explode Layers Button */}
              <button
                onClick={handleToggleExplode}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isExploded
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-[#26201c] text-[#e5be62] hover:bg-[#322a24] border border-[#d6b35a]/30'
                }`}
              >
                <Layers className="w-4 h-4" />
                {isExploded ? 'Assemble 3D Garment' : 'Explode Craft Layers'}
              </button>

              {/* Lighting Presets */}
              <div className="flex items-center gap-1.5 bg-[#1b1714] p-1 rounded-xl border border-white/10">
                {LIGHTING_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      spatialSound.playClick();
                      setActiveLighting(preset.id);
                      applyLightingPreset(preset.id);
                    }}
                    title={preset.desc}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      activeLighting === preset.id
                        ? 'bg-[#d6b35a] text-[#14100e] font-bold shadow-md'
                        : 'text-[#c4b5a5] hover:text-white'
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <span className="hidden sm:inline">{preset.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE PRODUCT CUSTOMIZER & CRAFTSMANSHIP SPECS (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Product Meta Card */}
            <div className="bg-[#14110f]/90 rounded-3xl p-6 border border-[#d6b35a]/30 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-[#d6b35a] font-semibold">
                  {currentItem.category}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#d6b35a]/15 text-[#e5be62] border border-[#d6b35a]/30 font-medium">
                  {currentItem.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
                {currentItem.name}
              </h3>
              <p className="text-xs text-[#c4b5a5] mt-1 font-mono">
                {currentItem.subtitle}
              </p>

              <p className="mt-4 text-sm text-[#e8dfd8] leading-relaxed border-t border-white/10 pt-4">
                {currentItem.description}
              </p>

              {/* Live Fabric & Color Palette Customizer */}
              {activeItemKey !== 'atelier-tools' && activeItemKey !== 'western-wear' && (
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#e5be62] flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5" />
                      Live 3D Fabric & Color Atelier:
                    </span>
                    <span className="text-[11px] text-[#c4b5a5]">
                      {COLOR_PALETTE.find(c => c.hex === selectedColor)?.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {COLOR_PALETTE.map((color) => {
                      const isSelected = selectedColor === color.hex;
                      return (
                        <button
                          key={color.id}
                          onClick={() => handleSelectColor(color.hex)}
                          title={color.name}
                          className={`w-9 h-9 rounded-full transition-all duration-300 relative flex items-center justify-center shadow-lg ${
                            isSelected ? 'scale-110 ring-2 ring-offset-2 ring-offset-[#14110f] ring-[#d6b35a]' : 'hover:scale-105 opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: color.hex, border: `2px solid ${color.border}` }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Craft Highlights List */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider text-[#d6b35a] font-semibold block mb-2.5">
                  Artisan Craft Highlights
                </span>
                <ul className="space-y-2">
                  {currentItem.craftHighlights.map((highlight, i) => (
                    <li key={i} className="text-xs text-[#c4b5a5] flex items-start gap-2">
                      <span className="text-[#d6b35a] font-bold mt-0.5">✦</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fabric Specs Tag */}
              <div className="mt-4 p-3 rounded-xl bg-[#1d1815] border border-white/5 text-[11px] text-[#e8dfd8] flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#d6b35a] flex-shrink-0" />
                <span><strong>Composition:</strong> {currentItem.fabricSpecs}</span>
              </div>

              {/* WhatsApp Atelier Consultation CTA */}
              <button
                onClick={openWhatsAppInquiry}
                className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#d6b35a] via-[#e5be62] to-[#c99e3a] text-[#14100e] font-bold text-sm shadow-xl shadow-[#d6b35a]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2.5 group"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Consult Master Designer in WhatsApp</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
