import { FormElement } from '../types';

interface SelectElementProps {
  element: FormElement;
  textColor: string;
}

export function SelectElement({ element, textColor }: SelectElementProps) {
  const inputId = `select-${element.id}`;
  return (
    <>
      <label
        htmlFor={inputId}
        style={{ color: textColor, display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}
      >
        {element.label}
      </label>
      <select
        id={inputId}
        style={{ color: textColor, background: 'transparent', width: '100%', padding: '4px', borderRadius: 3, border: '1px solid currentColor', boxSizing: 'border-box' }}
      >
        {element.options.map((opt, i) => (
          <option key={i} value={opt} style={{ color: '#000000' }}>
            {opt}
          </option>
        ))}
      </select>
    </>
  );
}
