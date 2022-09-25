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
    throw new Error('Chord not recognized');
  }

  const newIndex =
    (currentIndex + shiftBy > 0
      ? currentIndex + shiftBy
      : chords.length - (currentIndex + shiftBy)) % chords.length;

  let newChord = chords[newIndex];
  if (isMinor) newChord = newChord.toLocaleLowerCase();
  newChord += modifier;

  return newChord;
}
