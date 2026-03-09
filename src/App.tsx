import { useState } from 'react';
import { Box, Typography, Alert, Stack } from '@mui/material';
import './styles.css';
import { useElementDrawer } from './hooks/useElementDrawer';
import { useGridColors } from './hooks/useGridColors';
import { InputPanel } from './components/InputPanel';
import { Grid } from './components/Grid';
import { ColorSelectors } from './components/ColorSelectors';

export default function App() {
  const { rawInput, setRawInput, elements, moveElement } = useElementDrawer();
  const [color1, setColor1] = useState('#FF0000');
  const [color2, setColor2] = useState('#0000FF');
  const colorMap = useGridColors(elements, color1, color2);

  return (
    <Box component="main" sx={{ p: 3, maxWidth: '100%' }}>
      <header>
        <Typography variant="h4" gutterBottom>
          Element Drawer
        </Typography>
      </header>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="caption" component="p" sx={{ fontFamily: 'monospace' }}>
          rowNumber;columnNumber;inputLabel;inputType;inputOptions
        </Typography>
        <Typography variant="caption" component="p" sx={{ mt: 0.5, color: 'text.secondary' }}>
          Example: 1;1;First Name;TEXT_INPUT;Enter first name
        </Typography>
      </Alert>

      <Stack spacing={3}>
        <section>
          <InputPanel value={rawInput} onChange={setRawInput} />
        </section>

        <section>
          <ColorSelectors
            color1={color1}
            color2={color2}
            onColor1Change={setColor1}
            onColor2Change={setColor2}
          />
        </section>

        <section className="grid-wrapper">
          {elements.length === 0 ? (
            <Typography color="text.secondary" variant="body2">
              Enter elements above to render the grid.
            </Typography>
          ) : (
            <Grid elements={elements} colorMap={colorMap} onDrop={moveElement} />
          )}
        </section>
      </Stack>
    </Box>
  );
}
