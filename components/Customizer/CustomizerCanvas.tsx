// components/Customizer/CustomizerCanvas.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text as KonvaText,
  Transformer,
} from "react-konva";
import useImage from "use-image";

type Props = {
  baseImageUrl: string;
  uploadedImageUrl?: string;
  customText?: string;
  color?: string;
};

const CustomizerCanvas = ({
  baseImageUrl,
  uploadedImageUrl,
  customText,
  color,
}: Props) => {
  const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);

  const logoRef = useRef<any>(null);
  const textRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  const [selectedShapeName, setSelectedShapeName] = useState<string | null>(null);

  // Load base image
  useEffect(() => {
    const img = new window.Image();
    img.src = baseImageUrl;
    img.onload = () => setBaseImage(img);
  }, [baseImageUrl]);

  // Load uploaded logo image
  useEffect(() => {
    if (uploadedImageUrl) {
      const img = new window.Image();
      img.src = uploadedImageUrl;
      img.onload = () => setLogoImage(img);
    }
  }, [uploadedImageUrl]);

  // Attach transformer on select
  useEffect(() => {
    if (transformerRef.current) {
      const stage = transformerRef.current.getStage();
      const selectedNode =
        selectedShapeName === 'logo' ? logoRef.current : selectedShapeName === 'text' ? textRef.current : null;

      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      } else {
        transformerRef.current.nodes([]);
      }
    }
  }, [selectedShapeName]);

  return (
    <Stage
      width={400}
      height={400}
      onMouseDown={(e) => {
        // Deselect if clicking outside any shape
        if (e.target === e.target.getStage()) {
          setSelectedShapeName(null);
        }
      }}
    >
      <Layer>
        {/* Base bong image */}
        {baseImage && <KonvaImage image={baseImage} width={400} height={400} />}

        {/* Draggable uploaded image */}
        {logoImage && (
          <KonvaImage
            name="logo"
            ref={logoRef}
            image={logoImage}
            x={100}
            y={100}
            width={100}
            height={100}
            draggable
            onClick={() => setSelectedShapeName('logo')}
          />
        )}

        {/* Draggable custom text */}
        {customText && (
          <KonvaText
            name="text"
            ref={textRef}
            text={customText}
            x={50}
            y={300}
            fontSize={24}
            fill={color || 'black'}
            fontStyle="bold"
            draggable
            onClick={() => setSelectedShapeName('text')}
          />
        )}

        {/* Transformer for scaling and rotating */}
        <Transformer
          ref={transformerRef}
          rotateEnabled={true}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit size
            if (newBox.width < 20 || newBox.height < 20) {
              return oldBox;
            }
            return newBox;
          }}
        />
      </Layer>
    </Stage>
  );

  /* return (
    <Stage width={400} height={400}>
      <Layer>
        {baseImage && <KonvaImage image={baseImage} width={400} height={400} />}
        {logoImage && (
          <KonvaImage
            image={logoImage}
            x={100}
            y={100}
            width={100}
            height={100}
            opacity={0.8}
          />
        )}
        {customText && (
          <KonvaText
            text={customText}
            x={50}
            y={300}
            fontSize={24}
            fill={color || "black"}
            fontStyle="bold"
          />
        )}
      </Layer>
    </Stage>
  ); */
};

export default CustomizerCanvas;
