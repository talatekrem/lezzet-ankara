import fs from 'node:fs';
import path from 'node:path';

const restaurantsPath = path.join(process.cwd(), 'src/data/restaurants.ts');
const content = fs.readFileSync(restaurantsPath, 'utf8');

function parseHighlights(note: string): string[] {
  return note
    .split(/\s*\/\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function escapeForTsString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const updated = content.replace(
  /^(\s*)note: '((?:\\'|[^'])*)',$/gm,
  (match, indent, rawNote) => {
    const note = rawNote.replace(/\\'/g, "'");
    const highlights = parseHighlights(note);
    const highlightsLine = `${indent}highlights: [${highlights
      .map((item) => `'${escapeForTsString(item)}'`)
      .join(', ')}],`;

    if (match.includes('highlights:')) {
      return match;
    }

    return `${match}\n${highlightsLine}`;
  },
);

if (updated === content) {
  console.log('Değişiklik yapılmadı; highlights zaten ekli olabilir.');
} else {
  fs.writeFileSync(restaurantsPath, updated);
  console.log('highlights alanları restaurants.ts dosyasına eklendi.');
}
