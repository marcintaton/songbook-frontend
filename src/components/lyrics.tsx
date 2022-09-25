import { nanoid } from 'nanoid';
import transpose from '@src/utilities/transposiotion';

interface IProps {
  lyrics: string;
  transposeShift: number;
}

interface ILyricsLine {
  type: 'text' | 'chords';
  value: string;
}

interface IChordPosition {
  chord: string;
  position: number;
}

export default function Lyrics(props: IProps) {
  const { lyrics, transposeShift } = props;

  const reconstructedLyrics: ILyricsLine[] = [];

  lyrics.split('\n').forEach((line) => {
    const clearLine = line.replace(/\[[\w#]+]/gm, '');
    let caretPosition = 0;
    const chordPositions: IChordPosition[] = [];
    line.split(/(\[.*?\])/gm).forEach((section) => {
      if (section.match(/\[.*?\]/)) {
        const chord = section.slice(1, -1);
        const transposed = transpose(chord, transposeShift);
        chordPositions.push({
          chord: transposed,
          position: caretPosition,
        });
      } else {
        caretPosition += section.length;
      }
    });

    let chordLine = '';

    chordPositions.forEach((chord) => {
      chordLine += ' '.repeat(Math.max(chord.position - chordLine.length, 1));
      chordLine += chord.chord;
    });

    reconstructedLyrics.push({
      type: 'chords',
      value: `${chordLine}\n`,
    });
    reconstructedLyrics.push({
      type: 'text',
      value: `${clearLine}\n`,
    });
  });

  return (
    <>
      <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
        {reconstructedLyrics.map((line) => {
          return (
            <div
              style={
                line.type === 'text'
                  ? { color: 'black', fontWeight: 'normal' }
                  : { color: 'red', fontWeight: 'bold' }
              }
              key={nanoid()}
            >
              {line.value}
            </div>
          );
        })}
      </div>
    </>
  );
}
