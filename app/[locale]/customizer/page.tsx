// customizer/page.tsx
"use client";
import { useState } from 'react';
import BaseSelector from '@/components/Customizer/Controls/BaseSelector';
import ImageUploader from '@/components/Customizer/Controls/ImageUploader';
import TextInput from '@/components/Customizer/Controls/TextInput';
import ColorPicker from '@/components/Customizer/Controls/ColorPicker';
import CustomizerCanvas from '@/components/Customizer/CustomizerCanvas';
import GenerateButton from '@/components/Customizer/Controls/GenerateButton';
// import { useCart } from '@/components/Cart/useCart';

export default function CustomizePage() {
  const [baseId, setBaseId] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string>();
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000');
  const [productCode, setProductCode] = useState('');

//   const addToCart = useCart((state) => state.addItem);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Customize Your Bong</h1>

      <BaseSelector
        selected={baseId}
        onSelect={(id, image) => {
          setBaseId(id);
          setBaseImage(image);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <CustomizerCanvas
          baseImageUrl={baseImage}
          uploadedImageUrl={uploadedImage}
          customText={text}
          color={color}
        />

        <div className="space-y-4">
          <ImageUploader onUpload={setUploadedImage} />
          <TextInput value={text} onChange={setText} />
          <ColorPicker color={color} onChange={setColor} />
          <GenerateButton onGenerate={setProductCode} />

          {/* {productCode && (
            <button
              onClick={() =>
                addToCart({
                  code: productCode,
                  baseId,
                  baseImage,
                  uploadedImage,
                  text,
                  color,
                })
              }
              className="bg-green-600 text-white px-4 py-2 rounded mt-2"
            >
              Add to Cart (Code: {productCode})
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
