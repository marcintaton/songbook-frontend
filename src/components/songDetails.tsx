import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Lyrics from '@src/components/lyrics';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import parseLyrics from '@src/utilities/lyricsParser';
import ISong from '@src/types/models/iSong';
import { getSong } from '@src/services/songsService';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';

export default function SongDetails() {
  const { id } = useParams();

  const [song, setSong] = useState<ISong>();
  const [transShift, setTransShift] = useState<number>(0);
  const [parsedLyrics, setParsedLyrics] = useState<ILyricsLine[]>([]);
  const [chords, setChords] = useState<string[]>([]);

  useEffect(() => {
    apiFetchDelegate<ISong | undefined>(getSong, [setSong], {} as ISong, [id]);
  }, []);

  useEffect(() => {
    if (!song?.lyrics) return;

    const { parsedLyrics: _parsedLyrics, chordsDetected } = parseLyrics(
      song.lyrics,
      transShift
    );
    setParsedLyrics(_parsedLyrics);
    setChords(chordsDetected);
  }, [transShift, song]);

  return (
    <>
      {song?.lyrics && (
        <>
          <h4>{song.title}</h4>
          <p>Tagi:</p>
          <div>{song.tags.join(', ')}</div>
          <br />
          <p>Transponuj:</p>
          <div>
            <button
              onClick={() => {
                setTransShift(transShift + 1);
              }}
              style={{ marginRight: '1em', width: '2em' }}
            >
              +
            </button>
            <button
              onClick={() => {
                setTransShift(transShift - 1);
              }}
              style={{ marginRight: '1em', width: '2em' }}
            >
              -
            </button>
          </div>
          <div>{chords.join(' ')}</div>
          <br />
          {song && <Lyrics lyrics={parsedLyrics} />}
        </>
      )}
    </>
  );
}
