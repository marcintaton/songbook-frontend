const chords = [
  'A',
  'B',
  'H',
  'C',
  'Cis',
  'D',
  'Dis',
  'E',
  'F',
  'Fis',
  'G',
  'Gis',
];

export default function transpose(chord: string, shiftBy: number) {
  const isMinor = chord[0].toLowerCase() === chord[0];
  const modifierMatch = chord.match(/[^A-Za-z]+/);
  const modifier = modifierMatch !== null ? modifierMatch[0] : '';

  const modSliced = chord.replace(modifier, '');
  const upCased = modSliced.charAt(0).toUpperCase() + modSliced.slice(1);
  const currentIndex = chords.indexOf(upCased);

  if (currentIndex === -1) {
    throw new Error(`Chord not recognized: ${chord}`);
  }

  const newIndex =
    (currentIndex + shiftBy > 0
      ? currentIndex + shiftBy
      : chords.length - ((-1 * (currentIndex + shiftBy)) % chords.length)) %
    chords.length;

  let newChord = chords[newIndex];
  if (isMinor) newChord = newChord.toLowerCase();
  newChord += modifier;

  return newChord;
}
