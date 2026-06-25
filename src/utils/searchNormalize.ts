/**
 * Lowercases with Turkish locale rules, then maps Turkish letters to ASCII
 * so "ciger" matches "ciğer", "izgara" matches "ızgara", etc.
 */
export function normalizeForSearch(text: string): string {
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u');
}
