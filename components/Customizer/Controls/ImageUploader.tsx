// components/Customizer/Controls/ImageUploader.tsx
import React from 'react';

type Props = {
  onUpload: (url: string) => void;
};

const ImageUploader = ({ onUpload }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpload(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return <input type="file" accept="image/*" onChange={handleChange} />;
};

export default ImageUploader;
