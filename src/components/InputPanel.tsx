import { TextField } from '@mui/material';

interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
}

export function InputPanel({ value, onChange }: InputPanelProps) {
  return (
    <TextField
      label="Elements"
      multiline
      fullWidth
      rows={6}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="1;1;First Name;TEXT_INPUT;Enter first name"
      inputProps={{ style: { fontFamily: 'monospace', fontSize: 13 } }}
    />
  );
}
