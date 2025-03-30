import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';

import { useRef, useState } from 'react';
import PaperScene from './PaperScene';
import { NoToneMapping, SRGBColorSpace } from 'three';

const STICKER_LIST = [
  { id: 'sticker01', src: '/stickers/01.png' },
  { id: 'sticker02', src: '/stickers/02.png' },
  { id: 'sticker03', src: '/stickers/03.png' },
  { id: 'sticker04', src: '/stickers/04.png' },
];

export default function MeritCanvas() {
  const [text, setText] = useState<string>('동료에게 전하고 싶은 메세지를 입력하세요');
  const [texts, setTexts] = useState<{ text: string; x: number; y: number; color: string }[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('black');

  // 팔레트에서 click한 스티커 id
  const [selectedStickerId, setSelectedSticker] = useState<string>('sticker01');

  const [stickerList, setStickerList] = useState<
    {
      sticker: string;
      point: THREE.Vector3;
    }[]
  >([]);

  const handleSelect = (id: string) => {
    setSelectedSticker(id);
  };

  const sceneRef = useRef<THREE.Group>(null);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 50,
          near: 0.3,
          far: 100,
          position: [5, 5, 10],
        }}
        gl={{
          outputColorSpace: SRGBColorSpace,
          toneMapping: NoToneMapping,
        }}
      >
        <OrbitControls />

        <PaperScene
          ref={sceneRef}
          texts={texts}
          // setTexts={setTexts}
          selectedText={text}
          // selectedColor={selectedColor}
          //
          selectedStickerId={selectedStickerId}
          stickerList={stickerList}
          setStickerList={setStickerList}
        />
      </Canvas>

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {STICKER_LIST.map(({ id, src }) => (
          <button
            key={id}
            onClick={() => handleSelect(id)}
            style={{
              border: selectedStickerId === id ? '2px solid #00aaff' : '2px solid transparent',
              borderRadius: '8px',
              padding: '4px',
              backgroundColor: selectedStickerId === id ? '#e6f7ff' : 'transparent',
              cursor: 'pointer',
            }}
          >
            <img src={src} alt={id} style={{ width: 48, height: 48 }} />
          </button>
        ))}
      </div>

      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            fontSize: '16px',
            padding: '5px',
            width: '300px',
            marginBottom: '10px',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
        }}
      >
        {['black', 'red', 'blue', 'green'].map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              fontSize: '16px',
              padding: '8px',
              cursor: 'pointer',
              background: selectedColor === color ? 'gray' : color,
              color: color === 'black' ? 'white' : 'black',
              border: '1px solid black',
              borderRadius: '5px',
            }}
          >
            {color.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
