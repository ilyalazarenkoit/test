import { useState } from 'react';
import { FormElement } from '../types';
import { getContrastColor } from '../utils';
import { SelectElement } from './SelectElement';
import { TextInputElement } from './TextInputElement';

interface GridCellProps {
  row: number;
  col: number;
  element: FormElement | null;
  bgColor: string | undefined;
  onDrop: (id: string, row: number, col: number) => void;
}

export function GridCell({ row, col, element, bgColor, onDrop }: GridCellProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const bg = bgColor ?? 'transparent';
  const textColor = bgColor ? getContrastColor(bgColor) : '#000000';

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!element) return;
    e.dataTransfer.setData('text/plain', element.id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const id = e.dataTransfer.getData('text/plain');
    if (id) onDrop(id, row, col);
  };

  const classNames = [
    'grid-cell',
    isDragging ? 'dragging' : '',
    isDragOver ? 'drag-over' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="gridcell"
      aria-label={element ? element.label : 'Empty cell'}
      className={classNames}
      draggable={!!element}
      style={{ backgroundColor: bg }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {element?.type === 'SELECT' && (
        <SelectElement element={element} textColor={textColor} />
      )}
      {element?.type === 'TEXT_INPUT' && (
        <TextInputElement element={element} textColor={textColor} />
      )}
    </div>
  );
}
