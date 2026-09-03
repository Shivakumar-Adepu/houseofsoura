import * as THREE from 'three';

// -------------------------------------------------------------
// Texture Generators for Authentic Indian Boutique Craftsmanship
// -------------------------------------------------------------

/**
 * Generate procedural gold zardozi & floral embroidery texture
 */
export function createZardoziTexture(baseColorHex = '#3b0d11'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background fabric with micro-texture
  ctx.fillStyle = baseColorHex;
  ctx.fillRect(0, 0, 512, 512);

  // Weave grain
  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 512; i += 4) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Gold floral zardozi motifs
  const goldColor = '#e5be62';
  const brightGold = '#fff2a8';
  const antiqueGold = '#a37a28';

  for (let row = 32; row < 512; row += 64) {
    for (let col = 32; col < 512; col += 64) {
      const cx = col + (Math.floor(row / 64) % 2 === 0 ? 0 : 32);
      const cy = row;

      // Central flower
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = brightGold;
      ctx.fill();

      // Petals
      for (let p = 0; p < 6; p++) {
        const angle = (p / 6) * Math.PI * 2;
        const px = cx + Math.cos(angle) * 14;
        const py = cy + Math.sin(angle) * 14;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = goldColor;
        ctx.fill();

        // Stems/jal
        ctx.strokeStyle = antiqueGold;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

/**
 * Generate Temple Border / Zari Korvai texture
 */
export function createTempleZariTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#b8860b';
  ctx.fillRect(0, 0, 512, 128);

  // Gold zari stripes
  ctx.fillStyle = '#ffd700';
  ctx.fillRect(0, 10, 512, 16);
  ctx.fillRect(0, 102, 512, 16);

  // Temple triangles (Korvai)
  ctx.fillStyle = '#ffe066';
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 90);
    ctx.lineTo(x + 16, 36);
    ctx.lineTo(x + 32, 90);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#8a6200';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

/**
 * Generate Measuring Tape texture with realistic markings
 */
export function createMeasuringTapeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#f4e04d';
  ctx.fillRect(0, 0, 1024, 64);

  // Borders
  ctx.fillStyle = '#d4b727';
  ctx.fillRect(0, 0, 1024, 4);
  ctx.fillRect(0, 60, 1024, 4);

  // Markings
  ctx.fillStyle = '#222222';
  ctx.font = 'bold 16px sans-serif';
  for (let x = 0; x < 1024; x += 8) {
    const isMajor = x % 64 === 0;
    const isMid = x % 32 === 0;
    const h = isMajor ? 28 : isMid ? 18 : 10;
    ctx.fillRect(x, 4, 2, h);

    if (isMajor && x > 0) {
      const inch = Math.floor(x / 64);
      ctx.fillText(`${inch}`, x + 6, 26);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

// -------------------------------------------------------------
// Materials Helper
// -------------------------------------------------------------

export function getGoldMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#d4af37'),
    metalness: 0.95,
    roughness: 0.18,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    reflectivity: 1.0,
  });
}

export function getAntiqueGoldMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#b89742'),
    metalness: 0.88,
    roughness: 0.3,
    clearcoat: 0.5,
  });
}

export function getPearlMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#fdfcf5'),
    metalness: 0.1,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transmission: 0.25,
    transparent: true,
    opacity: 0.95,
    ior: 1.55,
  });
}

export function getRubyMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#9b111e'),
    metalness: 0.1,
    roughness: 0.05,
    clearcoat: 1.0,
    transmission: 0.85,
    transparent: true,
    opacity: 0.9,
    ior: 1.77,
  });
}

export function getEmeraldMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#097969'),
    metalness: 0.1,
    roughness: 0.05,
    clearcoat: 1.0,
    transmission: 0.85,
    transparent: true,
    opacity: 0.9,
    ior: 1.75,
  });
}

export function getFabricMaterial(colorHex: string, roughness = 0.5): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorHex),
    metalness: 0.12,
    roughness: roughness,
    clearcoat: 0.35,
    clearcoatRoughness: 0.25,
    sheen: 1.0,
    sheenColor: new THREE.Color(colorHex).clone().offsetHSL(0.05, 0.2, 0.2),
    sheenRoughness: 0.4,
  });
}

export function getVelvetMaterial(colorHex: string): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorHex),
    metalness: 0.05,
    roughness: 0.75,
    sheen: 1.0,
    sheenColor: new THREE.Color(colorHex).clone().offsetHSL(0.02, 0.3, 0.35),
    sheenRoughness: 0.8,
  });
}

// -------------------------------------------------------------
// 3D MODEL 1: Haute Couture Bridal Lehenga Mannequin
// -------------------------------------------------------------
export interface AnimatedBoutiqueObject {
  group: THREE.Group;
  update: (time: number, delta: number) => void;
  setExplodeProgress?: (progress: number) => void;
  setColor?: (colorHex: string) => void;
  latkanNodes?: THREE.Object3D[];
  clothWaveMesh?: THREE.Mesh;
}

export function createLehengaModel(initialColor = '#2b090c'): AnimatedBoutiqueObject {
  const root = new THREE.Group();
  root.name = 'LehengaModel';

  const goldMat = getGoldMaterial();
  const pearlMat = getPearlMaterial();
  const rubyMat = getRubyMaterial();

  const currentFabricMat = getVelvetMaterial(initialColor);
  const zardoziTex = createZardoziTexture(initialColor);
  const embroideredMat = new THREE.MeshPhysicalMaterial({
    map: zardoziTex,
    roughness: 0.45,
    metalness: 0.25,
    clearcoat: 0.6,
  });

  // Layer groups for exploded view
  const standGroup = new THREE.Group();
  const mannequinGroup = new THREE.Group();
  const skirtGroup = new THREE.Group();
  const blouseGroup = new THREE.Group();
  const dupattaGroup = new THREE.Group();
  const jewelryGroup = new THREE.Group();
  const latkansGroup = new THREE.Group();

  root.add(standGroup);
  root.add(mannequinGroup);
  root.add(skirtGroup);
  root.add(blouseGroup);
  root.add(dupattaGroup);
  root.add(jewelryGroup);
  root.add(latkansGroup);

  // --- 1. LUXURY GOLD MANNEQUIN STAND & PEDESTAL ---
  const baseGeo = new THREE.CylinderGeometry(0.55, 0.6, 0.08, 48);
  const baseMesh = new THREE.Mesh(baseGeo, goldMat);
  baseMesh.position.y = -1.6;
  standGroup.add(baseMesh);

  const poleGeo = new THREE.CylinderGeometry(0.032, 0.032, 2.8, 24);
  const poleMesh = new THREE.Mesh(poleGeo, goldMat);
  poleMesh.position.y = -0.3;
  standGroup.add(poleMesh);

  // Neck Finial Crown
  const finialGeo = new THREE.SphereGeometry(0.1, 24, 24);
  const finialMesh = new THREE.Mesh(finialGeo, goldMat);
  finialMesh.position.y = 1.32;
  mannequinGroup.add(finialMesh);

  const finialSpire = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 16), goldMat);
  finialSpire.position.y = 1.48;
  mannequinGroup.add(finialSpire);

  // --- 2. MANNEQUIN TORSO (COUTURE DRESS FORM) ---
  const torsoMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#14100e'),
    roughness: 0.6,
    metalness: 0.1,
  });

  const chestGeo = new THREE.CylinderGeometry(0.38, 0.3, 0.65, 32);
  const chestMesh = new THREE.Mesh(chestGeo, torsoMat);
  chestMesh.position.y = 0.85;
  chestMesh.scale.set(1.0, 1.0, 0.72);
  mannequinGroup.add(chestMesh);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.25, 24);
  const neckMesh = new THREE.Mesh(neckGeo, torsoMat);
  neckMesh.position.y = 1.22;
  mannequinGroup.add(neckMesh);

  // Waist / Hips
  const waistGeo = new THREE.CylinderGeometry(0.26, 0.38, 0.45, 32);
  const waistMesh = new THREE.Mesh(waistGeo, torsoMat);
  waistMesh.position.y = 0.38;
  waistMesh.scale.set(1.0, 1.0, 0.75);
  mannequinGroup.add(waistMesh);

  // --- 3. SCULPTED SWEETHEART BLOUSE ---
  const blouseBodyGeo = new THREE.CylinderGeometry(0.39, 0.28, 0.48, 32, 1, true);
  const blouseBodyMesh = new THREE.Mesh(blouseBodyGeo, embroideredMat);
  blouseBodyMesh.position.y = 0.82;
  blouseBodyMesh.scale.set(1.02, 1.0, 0.76);
  blouseGroup.add(blouseBodyMesh);

  // Blouse Sweetheart Neckline Gold Trim
  const neckTrimGeo = new THREE.TorusGeometry(0.24, 0.02, 16, 32, Math.PI);
  const neckTrim = new THREE.Mesh(neckTrimGeo, goldMat);
  neckTrim.position.set(0, 1.02, 0.22);
  neckTrim.rotation.x = 0.3;
  neckTrim.rotation.z = Math.PI;
  blouseGroup.add(neckTrim);

  // Blouse Sleeves
  const leftSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.4, 24), embroideredMat);
  leftSleeve.position.set(-0.46, 0.82, 0);
  leftSleeve.rotation.z = 0.35;
  blouseGroup.add(leftSleeve);

  const rightSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.4, 24), embroideredMat);
  rightSleeve.position.set(0.46, 0.82, 0);
  rightSleeve.rotation.z = -0.35;
  blouseGroup.add(rightSleeve);

  // Sleeve Gold Cuffs
  const sleeveCuffL = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.015, 16, 24), goldMat);
  sleeveCuffL.position.set(-0.54, 0.65, 0);
  sleeveCuffL.rotation.y = Math.PI / 2;
  sleeveCuffL.rotation.z = 0.35;
  blouseGroup.add(sleeveCuffL);

  const sleeveCuffR = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.015, 16, 24), goldMat);
  sleeveCuffR.position.set(0.54, 0.65, 0);
  sleeveCuffR.rotation.y = Math.PI / 2;
  sleeveCuffR.rotation.z = -0.35;
  blouseGroup.add(sleeveCuffR);

  // --- 4. OPULENT FLARED KALIDAR LEHENGA SKIRT ---
  const skirtHeight = 1.35;
  const skirtGeo = new THREE.ConeGeometry(1.05, skirtHeight, 48, 12, true);
  const skirtMesh = new THREE.Mesh(skirtGeo, embroideredMat);
  skirtMesh.position.y = -0.45;
  skirtGroup.add(skirtMesh);

  // Skirt Waistband with Gold Zari
  const waistbandGeo = new THREE.TorusGeometry(0.29, 0.035, 16, 48);
  const waistband = new THREE.Mesh(waistbandGeo, goldMat);
  waistband.position.y = 0.22;
  waistband.rotation.x = Math.PI / 2;
  skirtGroup.add(waistband);

  // Waistband Ruby Brooch
  const broochBase = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16), goldMat);
  broochBase.position.set(0, 0.22, 0.3);
  broochBase.rotation.x = Math.PI / 2;
  skirtGroup.add(broochBase);

  const broochGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.035, 1), rubyMat);
  broochGem.position.set(0, 0.22, 0.32);
  skirtGroup.add(broochGem);

  // Broad Hem Border (Gota / Zari Patti at Bottom)
  const hemBorderGeo = new THREE.TorusGeometry(1.04, 0.055, 16, 64);
  const hemBorder = new THREE.Mesh(hemBorderGeo, goldMat);
  hemBorder.position.y = -1.12;
  hemBorder.rotation.x = Math.PI / 2;
  skirtGroup.add(hemBorder);

  // Scalloped fringe at skirt base
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2;
    const dropPearl = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 12), pearlMat);
    dropPearl.position.set(Math.cos(angle) * 1.05, -1.17, Math.sin(angle) * 1.05);
    skirtGroup.add(dropPearl);
  }

  // --- 5. DRAPED SILK DUPATTA / PALLU OVER SHOULDER ---
  const dupattaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.55, 0.9, -0.15),
    new THREE.Vector3(0.42, 1.05, 0.05),
    new THREE.Vector3(0.15, 0.85, 0.35),
    new THREE.Vector3(-0.25, 0.45, 0.48),
    new THREE.Vector3(-0.45, -0.2, 0.52),
    new THREE.Vector3(-0.55, -0.95, 0.4),
  ]);
  const dupattaTubeGeo = new THREE.TubeGeometry(dupattaCurve, 40, 0.12, 16, false);
  const dupattaMesh = new THREE.Mesh(dupattaTubeGeo, currentFabricMat);
  dupattaMesh.scale.set(1.0, 1.0, 0.4);
  dupattaGroup.add(dupattaMesh);

  // Dupatta Gold Border Tube
  const dupattaBorderGeo = new THREE.TubeGeometry(dupattaCurve, 40, 0.02, 8, false);
  const dupattaBorder = new THREE.Mesh(dupattaBorderGeo, goldMat);
  dupattaGroup.add(dupattaBorder);

  // --- 6. HANGING LATKANS & TASSELS (PHYSICS SWAY) ---
  const latkanBells: THREE.Group[] = [];

  for (let side = -1; side <= 1; side += 2) {
    const latkanGroup = new THREE.Group();
    latkanGroup.position.set(side * 0.18, 0.2, 0.3);

    // Cord
    const cordGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.5, 8);
    cordGeo.translate(0, -0.25, 0);
    const cordMesh = new THREE.Mesh(cordGeo, goldMat);
    latkanGroup.add(cordMesh);

    // Jhumka Bell at bottom
    const bellGroup = new THREE.Group();
    bellGroup.position.y = -0.5;

    const bellMesh = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.07, 16), goldMat);
    bellMesh.rotation.x = Math.PI;
    bellGroup.add(bellMesh);

    // Pearl beads on latkan
    for (let p = 0; p < 4; p++) {
      const pAngle = (p / 4) * Math.PI * 2;
      const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 8), pearlMat);
      pearl.position.set(Math.cos(pAngle) * 0.035, -0.05, Math.sin(pAngle) * 0.035);
      bellGroup.add(pearl);
    }
    latkanGroup.add(bellGroup);
    latkanBells.push(bellGroup);
    latkansGroup.add(latkanGroup);
  }

  // --- 7. BRIDAL CHOKER & JEWELRY ACCENTS ---
  const chokerCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.16, 1.15, 0.02),
    new THREE.Vector3(-0.08, 1.13, 0.18),
    new THREE.Vector3(0, 1.12, 0.2),
    new THREE.Vector3(0.08, 1.13, 0.18),
    new THREE.Vector3(0.16, 1.15, 0.02),
  ]);
  const chokerTubeGeo = new THREE.TubeGeometry(chokerCurve, 24, 0.02, 12, false);
  const chokerMesh = new THREE.Mesh(chokerTubeGeo, goldMat);
  jewelryGroup.add(chokerMesh);

  // Centerpiece Emerald on Choker
  const centerEmerald = new THREE.Mesh(new THREE.OctahedronGeometry(0.03, 1), getEmeraldMaterial());
  centerEmerald.position.set(0, 1.1, 0.22);
  jewelryGroup.add(centerEmerald);

  // Explode Controller
  const setExplodeProgress = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));
    blouseGroup.position.y = p * 0.45;
    skirtGroup.position.y = -p * 0.35;
    dupattaGroup.position.x = p * 0.4;
    dupattaGroup.position.z = p * 0.25;
    jewelryGroup.position.y = p * 0.6;
    latkansGroup.position.z = p * 0.35;
  };

  // Color Swapper
  const setColor = (colorHex: string) => {
    currentFabricMat.color.set(colorHex);
    currentFabricMat.sheenColor.set(colorHex).offsetHSL(0.02, 0.3, 0.35);

    const newTex = createZardoziTexture(colorHex);
    embroideredMat.map = newTex;
    embroideredMat.needsUpdate = true;
  };

  // Animation loop hook
  const update = (time: number, delta: number) => {
    root.position.y = Math.sin(time * 1.5) * 0.03;

    const swayAngle = Math.sin(time * 3.0) * 0.15;
    const swayAngle2 = Math.cos(time * 2.5) * 0.1;
    latkanBells.forEach((bell, idx) => {
      bell.rotation.z = (idx === 0 ? swayAngle : -swayAngle) * 1.2;
      bell.rotation.x = swayAngle2;
    });
  };

  return {
    group: root,
    update,
    setExplodeProgress,
    setColor,
    latkanNodes: latkanBells,
  };
}

// -------------------------------------------------------------
// 3D MODEL 2: Bespoke Maggam & Aari Bridal Blouse
// -------------------------------------------------------------
export function createBlouseModel(initialColor = '#4a0e17'): AnimatedBoutiqueObject {
  const root = new THREE.Group();
  root.name = 'BlouseModel';

  const goldMat = getGoldMaterial();
  const pearlMat = getPearlMaterial();
  const rubyMat = getRubyMaterial();

  const zardoziTex = createZardoziTexture(initialColor);
  const blouseFabricMat = new THREE.MeshPhysicalMaterial({
    map: zardoziTex,
    color: new THREE.Color(initialColor),
    roughness: 0.35,
    metalness: 0.2,
    clearcoat: 0.7,
  });

  const standGroup = new THREE.Group();
  const frontGroup = new THREE.Group();
  const backGroup = new THREE.Group();
  const sleeveLGroup = new THREE.Group();
  const sleeveRGroup = new THREE.Group();
  const latkansGroup = new THREE.Group();

  root.add(standGroup);
  root.add(frontGroup);
  root.add(backGroup);
  root.add(sleeveLGroup);
  root.add(sleeveRGroup);
  root.add(latkansGroup);

  // Luxury Studio Display Stand
  const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.06, 32), goldMat);
  baseMesh.position.y = -1.2;
  standGroup.add(baseMesh);

  const poleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.0, 16), goldMat);
  poleMesh.position.y = -0.2;
  standGroup.add(poleMesh);

  const hangerMesh = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.02, 16, 32, Math.PI), goldMat);
  hangerMesh.position.y = 0.7;
  standGroup.add(hangerMesh);

  // Front Padded Bodice
  const frontBodiceGeo = new THREE.CylinderGeometry(0.42, 0.32, 0.65, 32, 4, true, -Math.PI / 2.2, Math.PI * 0.9);
  const frontBodice = new THREE.Mesh(frontBodiceGeo, blouseFabricMat);
  frontBodice.position.set(0, 0.2, 0.05);
  frontBodice.scale.set(1.0, 1.0, 0.75);
  frontGroup.add(frontBodice);

  // Scalloped Sweetheart Cutwork Gold Neckline
  const neckCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.25, 0.5, 0.15),
    new THREE.Vector3(-0.12, 0.32, 0.26),
    new THREE.Vector3(0, 0.22, 0.28),
    new THREE.Vector3(0.12, 0.32, 0.26),
    new THREE.Vector3(0.25, 0.5, 0.15),
  ]);
  const neckBorder = new THREE.Mesh(new THREE.TubeGeometry(neckCurve, 32, 0.022, 12, false), goldMat);
  frontGroup.add(neckBorder);

  // Pearl beads along neckline
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const pt = neckCurve.getPoint(t);
    const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 12), pearlMat);
    pearl.position.set(pt.x, pt.y - 0.02, pt.z + 0.01);
    frontGroup.add(pearl);
  }

  // Intricate Peacock Maggam Motifs on Front Center
  const peacockGeo = new THREE.ConeGeometry(0.08, 0.18, 4);
  const peacockL = new THREE.Mesh(peacockGeo, goldMat);
  peacockL.position.set(-0.1, 0.12, 0.26);
  peacockL.rotation.z = -0.4;
  peacockL.scale.set(0.6, 1.0, 0.3);
  frontGroup.add(peacockL);

  const peacockR = new THREE.Mesh(peacockGeo, goldMat);
  peacockR.position.set(0.1, 0.12, 0.26);
  peacockR.rotation.z = 0.4;
  peacockR.scale.set(0.6, 1.0, 0.3);
  frontGroup.add(peacockR);

  // Center Ruby Drop
  const rubyDrop = new THREE.Mesh(new THREE.OctahedronGeometry(0.025, 1), rubyMat);
  rubyDrop.position.set(0, 0.16, 0.29);
  frontGroup.add(rubyDrop);

  // Left & Right Sleeves with Heavy Embroidered Zari & Pearls
  const sleeveGeo = new THREE.CylinderGeometry(0.14, 0.11, 0.52, 24);
  
  const sleeveL = new THREE.Mesh(sleeveGeo, blouseFabricMat);
  sleeveL.position.set(-0.52, 0.25, 0.02);
  sleeveL.rotation.z = 0.42;
  sleeveLGroup.add(sleeveL);

  const sleeveCuffL = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.02, 16, 24), goldMat);
  sleeveCuffL.position.set(-0.62, 0.02, 0.02);
  sleeveCuffL.rotation.y = Math.PI / 2;
  sleeveCuffL.rotation.z = 0.42;
  sleeveLGroup.add(sleeveCuffL);

  const sleeveR = new THREE.Mesh(sleeveGeo, blouseFabricMat);
  sleeveR.position.set(0.52, 0.25, 0.02);
  sleeveR.rotation.z = -0.42;
  sleeveRGroup.add(sleeveR);

  const sleeveCuffR = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.02, 16, 24), goldMat);
  sleeveCuffR.position.set(0.62, 0.02, 0.02);
  sleeveCuffR.rotation.y = Math.PI / 2;
  sleeveCuffR.rotation.z = -0.42;
  sleeveRGroup.add(sleeveCuffR);

  // Back Cutout & Hanging Dori Latkans
  const backBodiceGeo = new THREE.CylinderGeometry(0.42, 0.32, 0.65, 32, 4, true, Math.PI * 0.5, Math.PI * 0.9);
  const backBodice = new THREE.Mesh(backBodiceGeo, blouseFabricMat);
  backBodice.position.set(0, 0.2, -0.05);
  backBodice.scale.set(1.0, 1.0, 0.75);
  backGroup.add(backBodice);

  // Hanging Back Dori Latkans with physics
  const latkanBells: THREE.Group[] = [];
  for (let i = -1; i <= 1; i += 2) {
    const latkanItem = new THREE.Group();
    latkanItem.position.set(i * 0.08, 0.35, -0.28);

    const doriCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(i * 0.04, -0.2, 0.02),
      new THREE.Vector3(i * 0.02, -0.5, -0.02),
    ]);
    const doriMesh = new THREE.Mesh(new THREE.TubeGeometry(doriCurve, 20, 0.006, 8, false), goldMat);
    latkanItem.add(doriMesh);

    const bell = new THREE.Group();
    bell.position.set(i * 0.02, -0.52, -0.02);

    const bellMesh = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.08, 16), goldMat);
    bellMesh.rotation.x = Math.PI;
    bell.add(bellMesh);

    const bellPearl = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), pearlMat);
    bellPearl.position.y = -0.06;
    bell.add(bellPearl);

    latkanItem.add(bell);
    latkanBells.push(bell);
    latkansGroup.add(latkanItem);
  }

  const setExplodeProgress = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));
    frontGroup.position.z = p * 0.45;
    backGroup.position.z = -p * 0.45;
    sleeveLGroup.position.x = -p * 0.35;
    sleeveRGroup.position.x = p * 0.35;
    latkansGroup.position.y = -p * 0.25;
  };

  const setColor = (colorHex: string) => {
    blouseFabricMat.color.set(colorHex);
    const newTex = createZardoziTexture(colorHex);
    blouseFabricMat.map = newTex;
    blouseFabricMat.needsUpdate = true;
  };

  const update = (time: number, delta: number) => {
    root.position.y = Math.sin(time * 1.8) * 0.025;
    const sway = Math.sin(time * 3.2) * 0.18;
    latkanBells.forEach((bell, idx) => {
      bell.rotation.z = (idx === 0 ? sway : -sway);
      bell.rotation.x = Math.cos(time * 2.8) * 0.12;
    });
  };

  return {
    group: root,
    update,
    setExplodeProgress,
    setColor,
    latkanNodes: latkanBells,
  };
}

// -------------------------------------------------------------
// 3D MODEL 3: Flowing Pure Kanjivaram Silk Saree
// -------------------------------------------------------------
export function createSilkSareeModel(initialColor = '#0b4f3b'): AnimatedBoutiqueObject {
  const root = new THREE.Group();
  root.name = 'SilkSareeModel';

  const goldMat = getGoldMaterial();
  const templeZariTex = createTempleZariTexture();
  const silkFabricMat = getFabricMaterial(initialColor, 0.25);

  const sariRollGroup = new THREE.Group();
  const flowingPalluGroup = new THREE.Group();
  const zariBorderGroup = new THREE.Group();
  const displayPlinthGroup = new THREE.Group();

  root.add(displayPlinthGroup);
  root.add(sariRollGroup);
  root.add(flowingPalluGroup);
  root.add(zariBorderGroup);

  // Luxury Black Marble Plinth
  const plinthMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#161412'),
    roughness: 0.2,
    metalness: 0.3,
  });
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 1.4), plinthMat);
  plinth.position.y = -1.1;
  displayPlinthGroup.add(plinth);

  const plinthGoldBorder = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.02, 1.44), goldMat);
  plinthGoldBorder.position.y = -1.04;
  displayPlinthGroup.add(plinthGoldBorder);

  // 1. Rolled Silk Saree Body on Stand
  const rollGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.85, 32);
  const rollMesh = new THREE.Mesh(rollGeo, silkFabricMat);
  rollMesh.rotation.z = Math.PI / 2;
  rollMesh.position.set(-0.25, -0.65, 0);
  sariRollGroup.add(rollMesh);

  // Gold Zari End on Roll
  const rollEndMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.282, 0.282, 0.18, 32), goldMat);
  rollEndMesh.rotation.z = Math.PI / 2;
  rollEndMesh.position.set(0.18, -0.65, 0);
  sariRollGroup.add(rollEndMesh);

  // 2. Billowing Pleated Flowing Silk Pallu (Dynamic Sine-Wave Cloth)
  const palluWidth = 1.1;
  const palluHeight = 1.9;
  const palluSegmentsW = 32;
  const palluSegmentsH = 48;
  const palluGeo = new THREE.PlaneGeometry(palluWidth, palluHeight, palluSegmentsW, palluSegmentsH);
  
  const posAttr = palluGeo.attributes.position;
  const origPos = new Float32Array(posAttr.array);

  const palluMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(initialColor),
    side: THREE.DoubleSide,
    roughness: 0.2,
    metalness: 0.15,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    sheen: 1.0,
    sheenColor: new THREE.Color('#ffd700'),
    sheenRoughness: 0.3,
  });

  const palluMesh = new THREE.Mesh(palluGeo, palluMat);
  palluMesh.position.set(0.15, 0.35, 0);
  palluMesh.rotation.y = -0.2;
  flowingPalluGroup.add(palluMesh);

  // 3. Gold Temple Zari Border at Pallu End
  const zariBorderMat = new THREE.MeshPhysicalMaterial({
    map: templeZariTex,
    side: THREE.DoubleSide,
    metalness: 0.85,
    roughness: 0.25,
    clearcoat: 0.9,
  });
  const borderMesh = new THREE.Mesh(new THREE.PlaneGeometry(palluWidth, 0.35, 24, 6), zariBorderMat);
  borderMesh.position.set(0.15, 1.15, 0.01);
  borderMesh.rotation.y = -0.2;
  zariBorderGroup.add(borderMesh);

  // Gold tassels along top pallu edge
  for (let t = 0; t <= 12; t++) {
    const tx = -palluWidth / 2 + (t / 12) * palluWidth;
    const tassel = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.06, 8), goldMat);
    tassel.rotation.x = Math.PI;
    tassel.position.set(tx + 0.15, 1.32, 0.01);
    zariBorderGroup.add(tassel);
  }

  const setExplodeProgress = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));
    sariRollGroup.position.x = -p * 0.45;
    flowingPalluGroup.position.x = p * 0.35;
    zariBorderGroup.position.y = p * 0.4;
  };

  const setColor = (colorHex: string) => {
    silkFabricMat.color.set(colorHex);
    palluMat.color.set(colorHex);
  };

  const update = (time: number, delta: number) => {
    root.position.y = Math.sin(time * 1.5) * 0.02;

    const positions = palluGeo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const u = origPos[i * 3];
      const v = origPos[i * 3 + 1];

      const wave1 = Math.sin(v * 3.5 + time * 3.0) * 0.12;
      const wave2 = Math.cos(u * 4.0 + time * 2.2) * 0.06;
      const wave3 = Math.sin((u + v) * 2.0 + time * 4.0) * 0.04;

      positions.setZ(i, origPos[i * 3 + 2] + wave1 + wave2 + wave3);
    }
    positions.needsUpdate = true;
    palluGeo.computeVertexNormals();
  };

  return {
    group: root,
    update,
    setExplodeProgress,
    setColor,
    clothWaveMesh: palluMesh,
  };
}

// -------------------------------------------------------------
// 3D MODEL 4: Royal Kundan Jewelry & Jhumka Ensemble
// -------------------------------------------------------------
export function createJewelryModel(): AnimatedBoutiqueObject {
  const root = new THREE.Group();
  root.name = 'JewelryModel';

  const goldMat = getGoldMaterial();
  const pearlMat = getPearlMaterial();
  const rubyMat = getRubyMaterial();
  const emeraldMat = getEmeraldMaterial();

  const chokerGroup = new THREE.Group();
  const jhumkaLGroup = new THREE.Group();
  const jhumkaRGroup = new THREE.Group();
  const standGroup = new THREE.Group();

  root.add(standGroup);
  root.add(chokerGroup);
  root.add(jhumkaLGroup);
  root.add(jhumkaRGroup);

  // Black Velvet Display Bust
  const velvetBustMat = getVelvetMaterial('#111111');
  const bustGeo = new THREE.CylinderGeometry(0.32, 0.48, 1.1, 32);
  const bustMesh = new THREE.Mesh(bustGeo, velvetBustMat);
  bustMesh.position.y = -0.3;
  bustMesh.scale.set(1.0, 1.0, 0.7);
  standGroup.add(bustMesh);

  // Gold stand base
  const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.08, 32), goldMat);
  baseMesh.position.y = -0.9;
  standGroup.add(baseMesh);

  // 1. Royal Kundan Choker
  const chokerCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.3, 0.12, -0.1),
    new THREE.Vector3(-0.2, 0.08, 0.22),
    new THREE.Vector3(0, 0.05, 0.28),
    new THREE.Vector3(0.2, 0.08, 0.22),
    new THREE.Vector3(0.3, 0.12, -0.1),
  ]);
  const chokerMesh = new THREE.Mesh(new THREE.TubeGeometry(chokerCurve, 32, 0.035, 12, false), goldMat);
  chokerGroup.add(chokerMesh);

  // Studded Gemstones & Pearls along the choker
  for (let i = 0; i < 9; i++) {
    const t = (i + 0.5) / 9;
    const pt = chokerCurve.getPoint(t);

    const setting = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.015, 12), goldMat);
    setting.position.set(pt.x, pt.y, pt.z + 0.02);
    setting.rotation.x = Math.PI / 2;
    chokerGroup.add(setting);

    const gemMat = i % 2 === 0 ? rubyMat : emeraldMat;
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.028, 1), gemMat);
    gem.position.set(pt.x, pt.y, pt.z + 0.035);
    chokerGroup.add(gem);

    const dropPearl = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 12), pearlMat);
    dropPearl.position.set(pt.x, pt.y - 0.06, pt.z + 0.02);
    chokerGroup.add(dropPearl);
  }

  // 2. Large Royal Center Pendant
  const pendantBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16), goldMat);
  pendantBase.position.set(0, -0.05, 0.3);
  pendantBase.rotation.x = Math.PI / 2;
  chokerGroup.add(pendantBase);

  const pendantGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 2), rubyMat);
  pendantGem.position.set(0, -0.05, 0.32);
  chokerGroup.add(pendantGem);

  for (let p = 0; p < 5; p++) {
    const pAngle = (p / 5) * Math.PI * 2;
    const clusterPearl = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 12), pearlMat);
    clusterPearl.position.set(Math.cos(pAngle) * 0.06, -0.05 + Math.sin(pAngle) * 0.06, 0.32);
    chokerGroup.add(clusterPearl);
  }

  // 3. Multi-Tier Jhumka Earrings (Left & Right)
  const buildJhumka = (parentGroup: THREE.Group, side: number) => {
    parentGroup.position.set(side * 0.65, 0.4, 0);

    const stud = new THREE.Mesh(new THREE.OctahedronGeometry(0.04, 1), rubyMat);
    parentGroup.add(stud);

    const link = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.08, 8), goldMat);
    link.position.y = -0.06;
    parentGroup.add(link);

    const bell1 = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.06, 16), goldMat);
    bell1.rotation.x = Math.PI;
    bell1.position.y = -0.12;
    parentGroup.add(bell1);

    const bell2 = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.09, 16), goldMat);
    bell2.rotation.x = Math.PI;
    bell2.position.y = -0.22;
    parentGroup.add(bell2);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 8), pearlMat);
      pearl.position.set(Math.cos(angle) * 0.08, -0.27, Math.sin(angle) * 0.08);
      parentGroup.add(pearl);
    }
  };

  buildJhumka(jhumkaLGroup, -1);
  buildJhumka(jhumkaRGroup, 1);

  const setExplodeProgress = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));
    chokerGroup.position.z = p * 0.4;
    jhumkaLGroup.position.x = -0.65 - p * 0.35;
    jhumkaRGroup.position.x = 0.65 + p * 0.35;
  };

  const update = (time: number, delta: number) => {
    root.position.y = Math.sin(time * 1.6) * 0.025;
    jhumkaLGroup.rotation.y = Math.sin(time * 2.0) * 0.3;
    jhumkaRGroup.rotation.y = -Math.sin(time * 2.0) * 0.3;
  };

  return {
    group: root,
    update,
    setExplodeProgress,
  };
}

// -------------------------------------------------------------
// 3D MODEL 5: Bridal Velvet Potli Clutch
// -------------------------------------------------------------
export function createPotliModel(initialColor = '#3a080d'): AnimatedBoutiqueObject {
  const root = new THREE.Group();
  root.name = 'PotliModel';

  const goldMat = getGoldMaterial();
  const pearlMat = getPearlMaterial();
  const velvetMat = getVelvetMaterial(initialColor);

  const bagBodyGroup = new THREE.Group();
  const handleGroup = new THREE.Group();
  const tasselsGroup = new THREE.Group();

  root.add(bagBodyGroup);
  root.add(handleGroup);
  root.add(tasselsGroup);

  // Gathered Velvet Pouch Body
  const pouchGeo = new THREE.SphereGeometry(0.48, 32, 24);
  pouchGeo.scale(1.0, 1.25, 0.85);
  const pouchMesh = new THREE.Mesh(pouchGeo, velvetMat);
  pouchMesh.position.y = -0.15;
  bagBodyGroup.add(pouchMesh);

  // Gold Drawstring Ring at Neck
  const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.025, 16, 32), goldMat);
  ringMesh.position.y = 0.35;
  ringMesh.rotation.x = Math.PI / 2;
  bagBodyGroup.add(ringMesh);

  // Gathered Top Frills
  const frillGeo = new THREE.ConeGeometry(0.32, 0.3, 24, 1, true);
  const frillMesh = new THREE.Mesh(frillGeo, velvetMat);
  frillMesh.position.y = 0.52;
  bagBodyGroup.add(frillMesh);

  // Braided Pearl & Gold Handle Loop
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.25, 0.35, 0),
    new THREE.Vector3(-0.35, 0.75, 0),
    new THREE.Vector3(0, 1.05, 0),
    new THREE.Vector3(0.35, 0.75, 0),
    new THREE.Vector3(0.25, 0.35, 0),
  ]);
  const handleMesh = new THREE.Mesh(new THREE.TubeGeometry(handleCurve, 32, 0.022, 12, false), pearlMat);
  handleGroup.add(handleMesh);

  // Hanging Pearl Latkan Tassels
  const latkanBells: THREE.Group[] = [];
  for (let i = -1; i <= 1; i += 2) {
    const latkan = new THREE.Group();
    latkan.position.set(i * 0.22, 0.32, 0.15);

    const dori = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.45, 8), goldMat);
    dori.position.y = -0.22;
    latkan.add(dori);

    const bell = new THREE.Group();
    bell.position.y = -0.45;
    const bellMesh = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.08, 16), goldMat);
    bellMesh.rotation.x = Math.PI;
    bell.add(bellMesh);

    const pearlDrop = new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 12), pearlMat);
    pearlDrop.position.y = -0.07;
    bell.add(pearlDrop);

    latkan.add(bell);
    latkanBells.push(bell);
    tasselsGroup.add(latkan);
  }

  const setExplodeProgress = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));
    handleGroup.position.y = p * 0.4;
    tasselsGroup.position.z = p * 0.3;
  };

  const setColor = (colorHex: string) => {
    velvetMat.color.set(colorHex);
  };

  const update = (time: number, delta: number) => {
    root.position.y = Math.sin(time * 1.8) * 0.03;
    const sway = Math.sin(time * 3.5) * 0.2;
    latkanBells.forEach((bell, idx) => {
      bell.rotation.z = idx === 0 ? sway : -sway;
    });
  };

  return {
    group: root,
    update,
    setExplodeProgress,
    setColor,
  };
}

// -------------------------------------------------------------
// 3D MODEL 6: Moving Atelier Tools (Golden Shears, Spool, Tape)
// -------------------------------------------------------------
export function createTailoringTools(): {
  group: THREE.Group;
  update: (time: number, delta: number) => void;
} {
  const root = new THREE.Group();
  root.name = 'TailoringTools';

  const goldMat = getGoldMaterial();
  const measuringTex = createMeasuringTapeTexture();

  // 1. ANIMATED GOLDEN TAILORING SHEARS
  const scissorsGroup = new THREE.Group();
  scissorsGroup.position.set(-1.1, 0.2, 0.2);
  root.add(scissorsGroup);

  const bladeL = new THREE.Group();
  const bladeR = new THREE.Group();
  scissorsGroup.add(bladeL);
  scissorsGroup.add(bladeR);

  // Blade Left
  const bladeLGeo = new THREE.BoxGeometry(0.04, 0.65, 0.015);
  bladeLGeo.translate(0, 0.3, 0);
  const bladeLMesh = new THREE.Mesh(bladeLGeo, goldMat);
  bladeL.add(bladeLMesh);

  const handleL = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 16, 32), goldMat);
  handleL.position.set(-0.1, -0.15, 0);
  bladeL.add(handleL);

  // Blade Right
  const bladeRGeo = new THREE.BoxGeometry(0.04, 0.65, 0.015);
  bladeRGeo.translate(0, 0.3, 0);
  const bladeRMesh = new THREE.Mesh(bladeRGeo, goldMat);
  bladeR.add(bladeRMesh);

  const handleR = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 16, 32), goldMat);
  handleR.position.set(0.1, -0.15, 0);
  bladeR.add(handleR);

  // Scissors Pivot Screw
  const pivotMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 16), goldMat);
  pivotMesh.rotation.x = Math.PI / 2;
  scissorsGroup.add(pivotMesh);

  // 2. GOLDEN SILK THREAD SPOOL & EXTENDING THREAD
  const spoolGroup = new THREE.Group();
  spoolGroup.position.set(1.1, -0.3, 0.3);
  root.add(spoolGroup);

  const spoolWoodMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3b2210'),
    roughness: 0.6,
  });
  const spoolSilkMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#d4af37'),
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.9,
  });

  const spoolRimTop = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.06, 32), spoolWoodMat);
  spoolRimTop.position.y = 0.35;
  spoolGroup.add(spoolRimTop);

  const spoolRimBot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.06, 32), spoolWoodMat);
  spoolRimBot.position.y = -0.35;
  spoolGroup.add(spoolRimBot);

  const spoolCore = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.64, 32), spoolSilkMat);
  spoolGroup.add(spoolCore);

  // Flowing Silk Zari Thread spiral
  const threadCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.18, 0.1, 0),
    new THREE.Vector3(0.4, 0.3, 0.2),
    new THREE.Vector3(0.2, 0.6, 0.4),
    new THREE.Vector3(-0.1, 0.8, 0.3),
  ]);
  const threadMesh = new THREE.Mesh(new THREE.TubeGeometry(threadCurve, 24, 0.01, 8, false), goldMat);
  spoolGroup.add(threadMesh);

  // 3. SPIRALING MEASURING TAPE
  const tapeGroup = new THREE.Group();
  tapeGroup.position.set(0, -0.9, 0.4);
  root.add(tapeGroup);

  const tapeCurvePoints: THREE.Vector3[] = [];
  for (let i = 0; i < 60; i++) {
    const angle = i * 0.25;
    const r = 0.35 + i * 0.008;
    const y = i * 0.006;
    tapeCurvePoints.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
  }
  const tapeCurve = new THREE.CatmullRomCurve3(tapeCurvePoints);
  const tapeGeo = new THREE.TubeGeometry(tapeCurve, 60, 0.025, 8, false);
  const tapeMat = new THREE.MeshStandardMaterial({
    map: measuringTex,
    roughness: 0.4,
  });
  const tapeMesh = new THREE.Mesh(tapeGeo, tapeMat);
  tapeMesh.rotation.x = 0.3;
  tapeGroup.add(tapeMesh);

  // Animation update
  const update = (time: number, delta: number) => {
    const cutAngle = (Math.sin(time * 4.0) * 0.5 + 0.5) * 0.28;
    bladeL.rotation.z = cutAngle;
    bladeR.rotation.z = -cutAngle;
    scissorsGroup.rotation.y = time * 0.5;

    spoolGroup.rotation.y += delta * 1.5;
    spoolGroup.position.y = -0.3 + Math.sin(time * 2.0) * 0.05;

    tapeGroup.rotation.y += delta * 0.3;
  };

  return {
    group: root,
    update,
  };
}
