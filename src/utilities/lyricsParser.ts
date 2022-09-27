import IChordPosition from '@src/types/interfaces/iChordPosition';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import transpose from '@src/utilities/transposition';

export default function parseLyrics(_lyrics: string, _transposeShift: number) {
  const lyrics: ILyricsLine[] = [];
  const chordsDetected: string[] = [];

  _lyrics.split('\n').forEach((line) => {
    const clearLine = line.replace(/\[[\w#]+]/gm, '');
    let caretPosition = 0;
    const chordPositions: IChordPosition[] = [];

    line.split(/(\[.*?\])/gm).forEach((section) => {
      if (section.match(/\[.*?\]/)) {
        const chord = section.slice(1, -1);
        const transposed = transpose(chord, _transposeShift);
        chordPositions.push({
          chord: transposed,
          position: caretPosition,
        });
        if (!chordsDetected.includes(transposed))
          chordsDetected.push(transposed);
      } else {
        caretPosition += section.length;
      }
    });

    let chordLine = '';

    chordPositions.forEach((chord) => {
      chordLine += ' '.repeat(Math.max(chord.position - chordLine.length, 1));
      chordLine += chord.chord;
    });

    lyrics.push({
      chordPositions,
      chordLine: `${chordLine}\n`,
      textLine: `${clearLine}\n`,
    });
  });

  return {
    lyrics,
    chordsDetected,
  };
}
