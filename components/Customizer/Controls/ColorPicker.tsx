// components/Customizer/Controls/ColorPicker.tsx
import React from 'react';
import { CirclePicker } from 'react-color';

type Props = {
  color: string;
  onChange: (color: string) => void;
};

const ColorPicker = ({ color, onChange }: Props) => (
  <CirclePicker color={color} onChangeComplete={(c) => onChange(c.hex)} />
);

export default ColorPicker;
