import { OrbitControls, RoundedBox, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import EditorCanvas from '@/components/EditorCanvas';
import EditorPanel from '@/components/EditorPanel';

const EditorScene = () => {
  return (
    <>
      <EditorCanvas />
      <div className="h-screen bg-cover bg-center">
        <EditorPanel />
      </div>
    </>
  );
};

export default EditorScene;
