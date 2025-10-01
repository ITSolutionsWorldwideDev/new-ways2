// components/Customizer/Controls/TextInput.tsx
import React from 'react';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const TextInput = ({ value, onChange }: Props) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Enter custom text"
    className="border px-2 py-1 w-full"
  />
);

export default TextInput;
