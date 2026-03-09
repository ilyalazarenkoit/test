interface ColorSelectorsProps {
  color1: string;
  color2: string;
  onColor1Change: (color: string) => void;
  onColor2Change: (color: string) => void;
}

export function ColorSelectors({ color1, color2, onColor1Change, onColor2Change }: ColorSelectorsProps) {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <span>Color 1 — SELECT diagonals</span>
        <input
          type="color"
          value={color1}
          onChange={e => onColor1Change(e.target.value)}
          style={{ width: 36, height: 28, cursor: 'pointer', border: 'none', padding: 0 }}
        />
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <span>Color 2 — TEXT_INPUT orthogonals</span>
        <input
          type="color"
          value={color2}
          onChange={e => onColor2Change(e.target.value)}
          style={{ width: 36, height: 28, cursor: 'pointer', border: 'none', padding: 0 }}
        />
      </label>
    </div>
  );
}
