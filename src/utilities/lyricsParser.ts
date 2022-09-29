import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import transpose from '@src/utilities/transposition';

export default function parseLyrics(_lyrics: string, _transposeShift: number) {
  const lyrics: ILyricsLine[] = [];

  _lyrics.split('\n').forEach((line) => {
    const clearLine = line.replace(/\[[\w#]+]/gm, '');
    let potentialTouchState = false;

    const words = line.split(/(?<=\s)/g).map((word) => {
      let caretPosition = 0;
      let chordLine = '';
      let clearWord = '';

      word.split(/(\[.*?\])/g).forEach((section) => {
        if (section.match(/\[.*?\]/)) {
          const chord = section.slice(1, -1);
          const transposed = transpose(chord, _transposeShift);
          if (potentialTouchState && caretPosition === 0) {
            clearWord += ' ';
          }
          const maxSpaceMod =
            !(chordLine.length === 0) || potentialTouchState ? 1 : 0;
          chordLine +=
            ' '.repeat(
              Math.max(caretPosition - chordLine.length, maxSpaceMod)
            ) + transposed;
        } else {
          caretPosition += section.length;
        }
      });

      clearWord += word.replace(/\[[\w#|]+]/gm, '');

      potentialTouchState = clearWord.length <= chordLine.length;

      return {
        word: clearWord,
        chords: chordLine || '.',
      };
    });

    words[words.length - 1].word += '\n';

    lyrics.push({
      lineWords: words,
      textLine: `${clearLine}`,
    });
  });

  return {
    lyrics,
  };
}
