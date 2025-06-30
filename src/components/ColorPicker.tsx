import React from 'react';
import '../styles/components/ColorPicker.css';

interface ColorPickerProps {
  colors: readonly string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

function ColorPicker({
  colors,
  selectedColor,
  onColorSelect,
}: ColorPickerProps) {
  return (
    <div className="color-picker">
      {colors.map(color => (
        <button
          key={color}
          type="button"
          className={`color-option ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
          aria-label={`Select color ${color}`}
        >
          {selectedColor === color && <span className="color-check">✓</span>}
        </button>
      ))}
    </div>
  );
}

export default ColorPicker;
