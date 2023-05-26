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

export function validateChord(chord: string) {
  const modifierMatch = chord.match(/[^A-Za-z]+/);
  const modifier = modifierMatch !== null ? modifierMatch[0] : '';

  const modSliced = chord.replace(modifier, '');
  const upCased = modSliced.charAt(0).toUpperCase() + modSliced.slice(1);
  const currentIndex = chords.indexOf(upCased);

  return currentIndex !== -1;
}

export function validateChords(lyrics: string) {
  let result = true;

  const chordsInText = lyrics.match(/(?<=\[).+?(?=\])/gm)?.filter((v, i, a) => {
    return a.indexOf(v) === i;
  });

  if (!chordsInText) return true;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < chordsInText.length; i++) {
    const chordResult = validateChord(chordsInText[i]);

    if (!chordResult) {
      result = false;
      break;
    }
  }

  return result;
}

export default chords;
