import { useMemo } from 'react';
import { FormElement, ColorMap } from '../types';
import { buildCellKey, mixColors } from '../utils';

export function useGridColors(
  elements: FormElement[],
  color1: string,
  color2: string
): ColorMap {
  return useMemo(() => {
    const accumulator = new Map<string, string[]>();

    const addColor = (row: number, col: number, color: string) => {
      const key = buildCellKey(row, col);
      if (!accumulator.has(key)) accumulator.set(key, []);
      accumulator.get(key)!.push(color);
    };

    for (const el of elements) {
      if (el.type === 'SELECT') {
        addColor(el.row - 1, el.col - 1, color1);
        addColor(el.row - 1, el.col + 1, color1);
        addColor(el.row + 1, el.col - 1, color1);
        addColor(el.row + 1, el.col + 1, color1);
      } else {
        addColor(el.row - 1, el.col, color2);
        addColor(el.row + 1, el.col, color2);
        addColor(el.row, el.col - 1, color2);
        addColor(el.row, el.col + 1, color2);
      }
    }

    const colorMap: ColorMap = {};
    accumulator.forEach((colors, key) => {
      colorMap[key] = colors.length === 1 ? colors[0] : mixColors(colors);
    });
    return colorMap;
  }, [elements, color1, color2]);
}
