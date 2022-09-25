import { nanoid } from 'nanoid';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';

interface IProps {
  lyrics: ILyricsLine[];
}

export default function Lyrics(props: IProps) {
  const { lyrics } = props;

  return (
    <>
      <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
        {lyrics.map((line) => {
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
