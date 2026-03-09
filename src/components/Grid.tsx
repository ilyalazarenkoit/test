import { FormElement, ColorMap } from '../types';
import { calcGridDimensions, buildCellKey } from '../utils';
import { GridCell } from './GridCell';

interface GridProps {
  elements: FormElement[];
  colorMap: ColorMap;
  onDrop: (id: string, row: number, col: number) => void;
}

export function Grid({ elements, colorMap, onDrop }: GridProps) {
  if (elements.length === 0) return null;

  const dims = calcGridDimensions(elements);
  const cols = dims.maxCol - dims.minCol + 1;

  const elementMap = new Map<string, FormElement>();
  for (const el of elements) {
    elementMap.set(buildCellKey(el.row, el.col), el);
  }

  const cells = [];
  for (let row = dims.minRow; row <= dims.maxRow; row++) {
    for (let col = dims.minCol; col <= dims.maxCol; col++) {
      const key = buildCellKey(row, col);
      cells.push(
        <GridCell
          key={key}
          row={row}
          col={col}
          element={elementMap.get(key) ?? null}
          bgColor={colorMap[key]}
          onDrop={onDrop}
        />
      );
    }
  }

  return (
    <div
      role="grid"
      aria-label="Form elements grid"
      className="grid-container"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(160px, 1fr))`,
        gap: '4px',
      }}
    >
      {cells}
    </div>
  );
}
