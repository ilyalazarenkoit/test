import { useState } from 'react';
import { FormElement } from '../types';
import { parseInputLines, serializeElements, buildCellKey } from '../utils';

export function useElementDrawer() {
  const [rawInput, setRawInputState] = useState('');
  const [elements, setElements] = useState<FormElement[]>([]);

  const setRawInput = (raw: string) => {
    setRawInputState(raw);
    setElements(parseInputLines(raw));
  };

  const moveElement = (id: string, targetRow: number, targetCol: number) => {
    setElements(prev => {
      const a = prev.find(e => e.id === id);
      if (!a) return prev;
      if (a.row === targetRow && a.col === targetCol) return prev;

      const targetKey = buildCellKey(targetRow, targetCol);
      const b = prev.find(e => buildCellKey(e.row, e.col) === targetKey);

      const updated = prev.map(e => {
        if (e.id === id) return { ...e, row: targetRow, col: targetCol };
        if (b && e.id === b.id) return { ...e, row: a.row, col: a.col };
        return e;
      });

      setRawInputState(serializeElements(updated));
      return updated;
    });
  };

  return { rawInput, setRawInput, elements, moveElement };
}
