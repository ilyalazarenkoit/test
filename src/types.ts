export interface FormElement {
  id: string;
  row: number;
  col: number;
  label: string;
  type: 'SELECT' | 'TEXT_INPUT';
  options: string[];
}

export interface GridDimensions {
  minRow: number;
  maxRow: number;
  minCol: number;
  maxCol: number;
}

export type ColorMap = Record<string, string>;
