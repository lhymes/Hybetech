# Web Game Development Guide

**Purpose**: Build performant, engaging web games with modern technologies
**Updated**: December 2025
**Sources**: Phaser, PixiJS, Three.js official documentation

---

## Overview

Modern web games can rival native experiences using WebGL and Canvas. This guide covers:
- Framework selection
- Performance optimization
- Mobile/touch support
- Progressive loading
- Monetization considerations

---

## Framework Selection Matrix

| Framework | Best For | Bundle Size | Learning Curve | 3D Support |
|-----------|----------|-------------|----------------|------------|
| **Phaser** | 2D games, beginners | 600kb | Easy | No |
| **PixiJS** | 2D graphics, performance | 200kb | Medium | No |
| **Three.js** | 3D experiences | 150kb+ | Medium-Hard | Yes |
| **Babylon.js** | Complex 3D, physics | 800kb+ | Medium | Yes |
| **PlayCanvas** | Team collaboration | Cloud | Easy | Yes |

### Decision Tree

```
START
  │
  ├─ Need 3D graphics?
  │   ├─ YES → Complex physics/scene management?
  │   │         ├─ YES → BABYLON.JS
  │   │         └─ NO → THREE.JS
  │   └─ NO → Continue...
  │
  ├─ Building a full game with physics, sprites, audio?
  │   └─ YES → PHASER (complete game framework)
  │
  ├─ Need maximum 2D performance / custom engine?
  │   └─ YES → PIXIJS (rendering only, add own systems)
  │
  ├─ Team collaboration / visual editor?
  │   └─ YES → PLAYCANVAS
  │
  └─ Default → PHASER (most complete for beginners)
```

---

## Phaser (Recommended for 2D Games)

### Why Phaser

- **Complete game framework**: Physics, input, audio, animations included
- **Huge community**: 48K+ GitHub stars, extensive tutorials
- **Beginner-friendly**: Well-documented, sensible defaults
- **TypeScript support**: Full type definitions
- **Free for commercial use**: MIT license

### Setup

```bash
npm create @phaserjs/game@latest my-game
cd my-game
npm install
npm run dev
```

### Basic Game Structure

```typescript
// src/main.ts
import Phaser from 'phaser';
import { PreloadScene } from './scenes/PreloadScene';
import { GameScene } from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // WebGL with Canvas fallback
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: import.meta.env.DEV,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloadScene, GameScene],
};

new Phaser.Game(config);
```

### Asset Loading

```typescript
// scenes/PreloadScene.ts
import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Show loading progress
    const progressBar = this.add.graphics();
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(200, 280, 400 * value, 30);
    });

    // Load assets
    this.load.image('player', 'assets/sprites/player.png');
    this.load.spritesheet('player-run', 'assets/sprites/player-run.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.audio('jump', 'assets/audio/jump.mp3');
    this.load.tilemapTiledJSON('level1', 'assets/maps/level1.json');
  }

  create() {
    this.scene.start('GameScene');
  }
}
```

### Mobile Touch Controls

```typescript
// scenes/GameScene.ts
export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private joystick?: VirtualJoystick;

  create() {
    this.player = this.physics.add.sprite(100, 450, 'player');

    // Detect mobile
    if (this.sys.game.device.input.touch) {
      this.createTouchControls();
    }

    // Keyboard always available
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  createTouchControls() {
    // Virtual joystick plugin or custom implementation
    this.joystick = this.plugins.get('rexvirtualjoystick');

    // Simple touch zones
    const leftZone = this.add.zone(0, 0, 200, 600)
      .setOrigin(0, 0)
      .setInteractive();

    leftZone.on('pointerdown', () => {
      this.player.setVelocityY(-330);
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    }
  }
}
```

---

## PixiJS (High-Performance 2D)

### Why PixiJS

- **Blazing fast**: WebGL-first, optimized rendering
- **Lightweight**: ~200kb, rendering only
- **Flexible**: Build your own game systems
- **Industry proven**: Used by Disney, BBC, Adobe

### Setup

```bash
npm install pixi.js
```

### Basic Application

```typescript
// src/main.ts
import { Application, Sprite, Assets } from 'pixi.js';

async function init() {
  const app = new Application();

  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  document.getElementById('game')!.appendChild(app.canvas);

  // Load assets
  await Assets.load('assets/bunny.png');
  const bunny = Sprite.from('assets/bunny.png');

  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  app.stage.addChild(bunny);

  // Game loop
  app.ticker.add((time) => {
    bunny.rotation += 0.1 * time.deltaTime;
  });
}

init();
```

### Sprite Animation

```typescript
import { AnimatedSprite, Assets, Spritesheet } from 'pixi.js';

async function createAnimatedSprite() {
  // Load spritesheet
  const texture = await Assets.load('assets/character.json');
  const sheet = new Spritesheet(texture, characterData);
  await sheet.parse();

  const character = new AnimatedSprite(sheet.animations['walk']);
  character.animationSpeed = 0.1;
  character.play();

  return character;
}
```

---

## Three.js (3D Experiences)

### Why Three.js

- **Industry standard**: Most popular WebGL library
- **Rich ecosystem**: Extensive add-ons and examples
- **Great documentation**: Thousands of examples
- **React integration**: react-three-fiber

### Setup

```bash
npm install three @types/three
```

### Basic Scene

```typescript
// src/main.ts
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function init() {
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // Resize handling
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

init();
```

### React Three Fiber

```tsx
// components/Game3D.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Box() {
  return (
    <mesh rotation={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export function Game3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} />
      <Box />
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
}
```

---

## Next.js/Astro Integration

### Next.js with Phaser

```tsx
// components/PhaserGame.tsx
'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

export function PhaserGame({ config }: { config: Phaser.Types.Core.GameConfig }) {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    gameRef.current = new Phaser.Game({
      ...config,
      parent: 'phaser-game',
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [config]);

  return <div id="phaser-game" />;
}
```

```tsx
// app/game/page.tsx
import dynamic from 'next/dynamic';
import { gameConfig } from '@/game/config';

const PhaserGame = dynamic(
  () => import('@/components/PhaserGame').then(mod => mod.PhaserGame),
  { ssr: false }
);

export default function GamePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <PhaserGame config={gameConfig} />
    </main>
  );
}
```

### Astro with Three.js

```astro
---
// src/pages/game.astro
import Layout from '../layouts/Layout.astro';
---

<Layout title="3D Game">
  <canvas id="game-canvas"></canvas>
</Layout>

<script>
  import { initGame } from '../game/main';
  initGame(document.getElementById('game-canvas') as HTMLCanvasElement);
</script>
```

---

## Performance Optimization

### Asset Management

```typescript
// Progressive loading
async function loadGame() {
  // Critical assets first
  await loadCriticalAssets();
  showMainMenu();

  // Load remaining in background
  loadRemainingAssets();
}

// Texture atlases reduce draw calls
// Use TexturePacker or free-tex-packer
const atlas = await Assets.load('sprites.json');
```

### Memory Management

```typescript
// Clean up unused textures
scene.events.on('shutdown', () => {
  this.textures.remove('temporary-texture');
});

// Object pooling for bullets, particles
class BulletPool {
  private pool: Bullet[] = [];

  get(): Bullet {
    return this.pool.pop() || new Bullet();
  }

  release(bullet: Bullet) {
    bullet.reset();
    this.pool.push(bullet);
  }
}
```

### Mobile Optimization

```typescript
// Detect device capabilities
const config = {
  // Lower resolution on mobile
  resolution: isMobile ? 1 : window.devicePixelRatio,

  // Reduce particle effects
  maxParticles: isMobile ? 100 : 500,

  // Simpler physics on low-end
  physicsSteps: isLowEnd ? 1 : 2,
};

// Visibility API - pause when backgrounded
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    game.pause();
  } else {
    game.resume();
  }
});
```

---

## Save Systems

### Local Storage (Simple)

```typescript
interface SaveData {
  level: number;
  score: number;
  inventory: string[];
  timestamp: number;
}

function saveGame(data: SaveData) {
  localStorage.setItem('game-save', JSON.stringify(data));
}

function loadGame(): SaveData | null {
  const data = localStorage.getItem('game-save');
  return data ? JSON.parse(data) : null;
}
```

### Cloud Saves (Firebase)

```typescript
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

async function cloudSave(userId: string, data: SaveData) {
  const db = getFirestore();
  await setDoc(doc(db, 'saves', userId), {
    ...data,
    updatedAt: new Date(),
  });
}

async function cloudLoad(userId: string): Promise<SaveData | null> {
  const db = getFirestore();
  const snap = await getDoc(doc(db, 'saves', userId));
  return snap.exists() ? (snap.data() as SaveData) : null;
}
```

---

## Security Considerations

### Client-Side Validation

```typescript
// NEVER trust client scores
// Always validate on server

// Client sends actions, not results
interface GameAction {
  type: 'jump' | 'collect' | 'complete';
  timestamp: number;
  position: { x: number; y: number };
}

// Server replays and validates
async function validateScore(actions: GameAction[]): Promise<number> {
  const simulation = new GameSimulation();
  for (const action of actions) {
    simulation.apply(action);
  }
  return simulation.getScore();
}
```

### Anti-Cheat Basics

```typescript
// Rate limiting actions
class ActionValidator {
  private lastAction = 0;
  private actionCounts = new Map<string, number>();

  validate(action: GameAction): boolean {
    const now = Date.now();

    // Minimum time between actions
    if (now - this.lastAction < 50) {
      return false; // Too fast, possible automation
    }

    // Track action frequency
    const count = (this.actionCounts.get(action.type) || 0) + 1;
    this.actionCounts.set(action.type, count);

    // Check for impossible patterns
    if (action.type === 'jump' && count > 10) {
      // More than 10 jumps per second is impossible
      return false;
    }

    this.lastAction = now;
    return true;
  }
}
```

---

## Monetization Options

### Web Monetization API

```html
<link rel="monetization" href="https://ilp.example.com/~user" />
```

```typescript
// Check if monetized
if (document.monetization?.state === 'started') {
  // User is supporting - remove ads, give bonuses
  removeAds();
  giveBonus();
}
```

### In-App Purchases

```typescript
// Digital Goods API (Chrome)
if ('getDigitalGoodsService' in window) {
  const service = await window.getDigitalGoodsService('https://play.google.com/billing');
  const items = await service.getDetails(['premium_pack']);
  // Display purchase UI
}
```

---

## Performance Checklist

- [ ] Use texture atlases to reduce draw calls
- [ ] Implement object pooling for frequently created/destroyed objects
- [ ] Lower resolution/effects on mobile devices
- [ ] Pause game when tab is not visible
- [ ] Progressive asset loading with loading screen
- [ ] Clean up unused resources on scene changes
- [ ] Test on actual mobile devices, not just emulators

---

## Resources

- [Phaser Examples](https://phaser.io/examples)
- [PixiJS Examples](https://pixijs.com/examples)
- [Three.js Journey](https://threejs-journey.com/) (paid course)
- [Game Dev Resources](https://itch.io/game-assets/free) - Free assets

---

**Remember**: Start simple, optimize later. A working game is better than a perfect framework.
