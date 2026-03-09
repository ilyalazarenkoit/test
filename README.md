# Element Drawer

Interactive form builder that renders form elements in a dynamic grid from text input.

## How it works

Enter one or more lines in the format:

```
rowNumber;columnNumber;inputLabel;inputType;inputOptions
```

Example:
```
1;1;First Name;TEXT_INPUT;Enter your first name
1;2;Country;SELECT;USA,Canada,UK
2;1;Last Name;TEXT_INPUT;Enter your last name
```

## Features

- **Dynamic grid** — expands to fit any row/column coordinates, empty cells rendered as placeholders
- **Drag & Drop** — native HTML API, swap on occupied cells, textarea syncs in real time
- **Adjacency coloring** — SELECT colors diagonal neighbours, TEXT_INPUT colors orthogonal neighbours
- **Color mixing** — cells affected by multiple elements get blended background
- **WCAG 2.1 contrast** — text automatically switches to black/white for 4.5:1 ratio
- **Two color pickers** — customize SELECT (default red) and TEXT_INPUT (default blue) highlight colors


## Architecture

```
src/
├── types.ts              — FormElement, GridDimensions, ColorMap interfaces
├── utils.ts              — parser, serializer, color mixing, WCAG contrast
├── hooks/
│   ├── useElementDrawer.ts — state management: parsing ↔ serialization, drag swap
│   └── useGridColors.ts    — adjacency coloring logic with useMemo
├── components/
│   ├── InputPanel.tsx      — multiline textarea for string input
│   ├── ColorSelectors.tsx  — two native color pickers
│   ├── Grid.tsx            — CSS Grid container, iterates rows × cols
│   ├── GridCell.tsx        — single cell: D&D handlers, background color, contrast
│   ├── SelectElement.tsx   — label + native <select>
│   └── TextInputElement.tsx — label + native <input>
└── App.tsx               — orchestrator: connects hooks and components
```

## Key decisions

**Stable element IDs** — generated as `"row-col"` instead of random UUIDs. Prevents full DOM re-mount on every textarea keystroke, keeps React reconciliation efficient.

**Native Drag & Drop** — no external libraries (react-dnd, dnd-kit). The task only requires cell-to-cell moves with optional swap — 5 event handlers in GridCell cover this completely.

**Color mixing via RGB averaging** — each cell accumulates colors from adjacent elements. SELECT adds color1 to 4 diagonal neighbours, TEXT_INPUT adds color2 to 4 orthogonal neighbours. Multiple colors are mixed by averaging RGB channels.

**WCAG contrast** — `getContrastColor()` computes relative luminance using the sRGB→linear formula, then picks black or white text to guarantee ≥4.5:1 contrast ratio on any background.

**Parser resilience** — all fields trimmed, invalid lines silently skipped, duplicate coordinates resolved (last wins). No crashes on malformed input.

**Accessibility** — `role="grid"` / `role="gridcell"`, `<label htmlFor>` linked to every input/select, `aria-label` on empty cells, semantic HTML (`<header>`, `<main>`, `<section>`).
