# Web Game Development Workflow

Build performant, engaging web games with modern frameworks.

---

## Context Files to Read First

Read these context files before proceeding:
- `.claude/context/games/web-game-development.md` - Complete game development guide

---

## Framework Selection

### Quick Decision

| If you need... | Use |
|----------------|-----|
| Complete 2D game (beginner-friendly) | **Phaser** |
| Maximum 2D performance / custom engine | **PixiJS** |
| 3D experiences | **Three.js** |
| Complex 3D with physics | **Babylon.js** |
| Team collaboration / visual editor | **PlayCanvas** |

### Bundle Size

- Phaser: ~600kb (complete framework)
- PixiJS: ~200kb (rendering only)
- Three.js: ~150kb+ (depends on features)

---

## Phaser (Recommended for 2D Games)

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
  type: Phaser.AUTO,
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

### Asset Preloading

```typescript
// scenes/PreloadScene.ts
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Loading bar
    const progressBar = this.add.graphics();
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(200, 280, 400 * value, 30);
    });

    // Assets
    this.load.image('player', 'assets/sprites/player.png');
    this.load.spritesheet('player-run', 'assets/sprites/player-run.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.audio('jump', 'assets/audio/jump.mp3');
  }

  create() {
    this.scene.start('GameScene');
  }
}
```

---

## Next.js Integration

### Phaser with Next.js

```tsx
// components/PhaserGame.tsx
'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

interface Props {
  config: Phaser.Types.Core.GameConfig;
}

export function PhaserGame({ config }: Props) {
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

### Three.js with React Three Fiber

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

## Mobile Touch Controls

```typescript
// scenes/GameScene.ts
export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  create() {
    this.player = this.physics.add.sprite(100, 450, 'player');

    // Keyboard
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Touch zones for mobile
    if (this.sys.game.device.input.touch) {
      this.createTouchControls();
    }
  }

  createTouchControls() {
    const { width, height } = this.scale;

    // Left half: move left
    const leftZone = this.add.zone(0, 0, width / 3, height)
      .setOrigin(0, 0)
      .setInteractive();

    // Right half: move right
    const rightZone = this.add.zone(width / 3, 0, width / 3, height)
      .setOrigin(0, 0)
      .setInteractive();

    // Top: jump
    const jumpZone = this.add.zone(width * 2/3, 0, width / 3, height)
      .setOrigin(0, 0)
      .setInteractive();

    jumpZone.on('pointerdown', () => {
      if (this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}
```

---

## Save System

### Local Storage

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

### Never Trust Client Scores

```typescript
// Client sends actions, not results
interface GameAction {
  type: 'jump' | 'collect' | 'complete';
  timestamp: number;
  position: { x: number; y: number };
}

// Server validates by replaying
async function validateScore(actions: GameAction[]): Promise<number> {
  const simulation = new GameSimulation();
  for (const action of actions) {
    if (!simulation.isValidAction(action)) {
      throw new Error('Invalid action detected');
    }
    simulation.apply(action);
  }
  return simulation.getScore();
}
```

### Rate Limiting Actions

```typescript
class ActionValidator {
  private lastAction = 0;

  validate(action: GameAction): boolean {
    const now = Date.now();

    // Minimum 50ms between actions
    if (now - this.lastAction < 50) {
      return false; // Too fast
    }

    this.lastAction = now;
    return true;
  }
}
```

---

## Performance Optimization

- Use texture atlases (fewer draw calls)
- Implement object pooling (bullets, particles)
- Lower resolution on mobile
- Pause when tab is hidden

```typescript
// Visibility API
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    game.pause();
  } else {
    game.resume();
  }
});
```

---

## Checklist

- [ ] Framework selected based on requirements
- [ ] Asset loading with progress bar
- [ ] Mobile touch controls implemented
- [ ] Responsive scaling configured
- [ ] Save system implemented
- [ ] Pause when backgrounded
- [ ] Performance tested on mobile
- [ ] Server-side score validation (if competitive)

---

## Resources

- [Phaser Examples](https://phaser.io/examples)
- [PixiJS Examples](https://pixijs.com/examples)
- [Three.js Journey](https://threejs-journey.com/)
- [Free Game Assets](https://itch.io/game-assets/free)

---

**Remember**: Start simple, optimize later. A working game is better than a perfect framework.
