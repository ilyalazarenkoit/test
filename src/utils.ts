import { FormElement, GridDimensions, ColorMap } from './types';

export function parseInputLines(raw: string): FormElement[] {
  const seen = new Set<string>();
  const results: FormElement[] = [];

  const lines = raw.split('\n').filter(line => line.trim() !== '');
  for (const line of lines) {
    const parts = line.split(';');
    if (parts.length !== 5) continue;

    const row = parseInt(parts[0].trim(), 10);
    const col = parseInt(parts[1].trim(), 10);
    const label = parts[2].trim();
    const typeStr = parts[3].trim();
    const optionsStr = parts[4].trim();

    if (isNaN(row) || row <= 0 || isNaN(col) || col <= 0) continue;
    if (typeStr !== 'SELECT' && typeStr !== 'TEXT_INPUT') continue;

    const key = buildCellKey(row, col);
    const options = typeStr === 'SELECT'
      ? optionsStr.split(',').map(o => o.trim())
      : [optionsStr];

    if (seen.has(key)) {
      const idx = results.findIndex(e => buildCellKey(e.row, e.col) === key);
      if (idx !== -1) results.splice(idx, 1);
    }
    seen.add(key);

    results.push({ id: key, row, col, label, type: typeStr, options });
  }
  return results;
}

export function serializeElements(elements: FormElement[]): string {
  return elements
    .map(el => {
      const opts = el.type === 'SELECT' ? el.options.join(',') : el.options[0];
      return `${el.row};${el.col};${el.label};${el.type};${opts}`;
    })
    .join('\n');
}

export function calcGridDimensions(elements: FormElement[]): GridDimensions {
  const rows = elements.map(e => e.row);
  const cols = elements.map(e => e.col);
  return {
    minRow: Math.min(...rows),
    maxRow: Math.max(...rows),
    minCol: Math.min(...cols),
    maxCol: Math.max(...cols),
  };
}

export function buildCellKey(row: number, col: number): string {
  return `${row}-${col}`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '');
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

export function mixColors(colors: string[]): string {
  const rgbs = colors.map(hexToRgb);
  const count = rgbs.length;
  const r = Math.round(rgbs.reduce((s, c) => s + c.r, 0) / count);
  const g = Math.round(rgbs.reduce((s, c) => s + c.g, 0) / count);
  const b = Math.round(rgbs.reduce((s, c) => s + c.b, 0) / count);
  return rgbToHex(r, g, b);
}

export function getContrastColor(bgHex: string): '#000000' | '#FFFFFF' {
  const { r, g, b } = hexToRgb(bgHex);
  const toLinear = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  const contrastWithWhite = 1.05 / (L + 0.05);
  return contrastWithWhite >= 4.5 ? '#FFFFFF' : '#000000';
}

export type { ColorMap };
