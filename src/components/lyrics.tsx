import { nanoid } from 'nanoid';

interface IProps {
  lyrics: string;
}

interface ILyricsLine {
  type: 'text' | 'chords';
  value: string;
}

export default function Lyrics(props: IProps) {
  const { lyrics } = props;

  const reconstructedLyrics: ILyricsLine[] = [];

  lyrics.split('\n').forEach((line) => {
    const clearLine = line.replace(/\[[\w#]+]/gm, '');
    let chordLine = '';
    let lastChordLength = 0;
    line.split(/(\[.*?\])/gm).forEach((section) => {
      if (section.match(/\[.*?\]/)) {
        const chord = section.slice(1, -1);
        chordLine += chord;
        lastChordLength = chord.length;
      } else {
        chordLine += ' '.repeat(section.length - lastChordLength);
        lastChordLength = 0;
      }
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
