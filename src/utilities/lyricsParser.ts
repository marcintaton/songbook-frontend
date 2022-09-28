import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import transpose from '@src/utilities/transposition';

export default function parseLyrics(_lyrics: string, _transposeShift: number) {
  const lyrics: ILyricsLine[] = [];

  _lyrics.split('\n').forEach((line) => {
    const clearLine = line.replace(/\[[\w#]+]/gm, '');

    const words = line.split(/(?<=\s)/g).map((word) => {
      let caretPosition = 0;
      let chordLine = '';

      word.split(/(\[.*?\])/g).forEach((section) => {
        if (section.match(/\[.*?\]/)) {
          const chord = section.slice(1, -1);
          const transposed = transpose(chord, _transposeShift);
          chordLine +=
            ' '.repeat(
              Math.max(
                caretPosition - chordLine.length,
                chordLine.length === 0 ? 0 : 1
              )
            ) + transposed;
        } else {
          caretPosition += section.length;
        }
      });

      const clearWord = word.replace(/\[[\w#]+]/gm, '');

      return {
        word: clearWord,
        chords: chordLine || '.',
      };
    });

    words[words.length - 1].word += '\n';

    console.log(words);

    lyrics.push({
      lineWords: words,
      textLine: `${clearLine}`,
    });
  });

  return {
    lyrics,
  };
}
