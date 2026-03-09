import { FormElement } from '../types';

interface TextInputElementProps {
  element: FormElement;
  textColor: string;
}

export function TextInputElement({ element, textColor }: TextInputElementProps) {
  const inputId = `text-${element.id}`;
  return (
    <>
      <label
        htmlFor={inputId}
        style={{ color: textColor, display: 'block', marginBottom: 4, fontSize: 12, fontWeight: 500 }}
      >
        {element.label}
      </label>
      <input
        id={inputId}
        type="text"
        placeholder={element.options[0]}
        style={{
          color: textColor,
          background: 'transparent',
          width: '100%',
          padding: '4px',
          borderRadius: 3,
          border: '1px solid currentColor',
          boxSizing: 'border-box',
        }}
      />
    </>
  );
}
