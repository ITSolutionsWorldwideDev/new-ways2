// components/Customizer/Controls/BaseSelector.tsx
import React from 'react';

const baseItems = [
  { id: 'b1', name: 'Classic Bong', image: '/bongs/bong1.png' },
  { id: 'b2', name: 'Curved Bong', image: '/bongs/bong2.png' },
  { id: 'b3', name: 'Percolator Bong', image: '/bongs/bong3.png' },
];

type Props = {
  selected: string;
  onSelect: (id: string, image: string) => void;
};

const BaseSelector = ({ selected, onSelect }: Props) => (
  <div className="flex gap-4">
    {baseItems.map((item) => (
      <div
        key={item.id}
        className={`border p-2 cursor-pointer ${selected === item.id ? 'border-blue-500' : ''}`}
        onClick={() => onSelect(item.id, item.image)}
      >
        <img src={item.image} alt={item.name} width={100} />
        <p className="text-center">{item.name}</p>
      </div>
    ))}
  </div>
);

export default BaseSelector;
