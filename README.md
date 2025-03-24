# Number to word converter

Converts numbers to words.

## Setup

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Usage

```typescript
import { EnglishPreset } from './src/utilities/number-to-word-converter-presets'
import { NumberToWordConverter } from './src/utilities/number-to-word-converter'

const englishNumberToWord = new NumberToWordConverter(EnglishPreset)

englishNumberToWord.convert(1234) // one thousand two hundred thirty-four
```
