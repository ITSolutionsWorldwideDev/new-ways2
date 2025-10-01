// components/Customizer/Controls/GenerateButton.tsx
import React from 'react';
import { nanoid } from 'nanoid';

type Props = {
  onGenerate: (code: string) => void;
};

const GenerateButton = ({ onGenerate }: Props) => {
  const handleClick = () => {
    const code = `BONG-${nanoid(6).toUpperCase()}`;
    onGenerate(code);
  };

  return (
    <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded">
      Generate Product Code
    </button>
  );
};

export default GenerateButton;
