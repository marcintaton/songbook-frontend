import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSongMetadata } from '@src/services/songMetadataService';
import ISongMetadata from '@src/types/interfaces/iSongMetadata';
import ISongDetails from '@src/types/interfaces/iSongDetails';
import { getSongDetails } from '@src/services/songDetailsService';
import Lyrics from '@src/components/lyrics';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import parseLyrics from '@src/utilities/lyricsParser';

export default function SongDetails() {
  const { id } = useParams();

  const [songMetadata, setSongMetadata] = useState<ISongMetadata>();
  const [songDetails, setSongDetails] = useState<ISongDetails>();
  const [transShift, setTransShift] = useState<number>(0);
  const [parsedLyrics, setParsedLyrics] = useState<ILyricsLine[]>([]);
  const [chords, setChords] = useState<string[]>([]);

  useEffect(() => {
    if (id === undefined) return;

    const getMetadata = async () => {
      const response = await getSongMetadata(id);
      return response.data;
    };

    const getDetails = async () => {
      const response = await getSongDetails(id);
      return response.data;
    };

    getMetadata()
      .then((data) => {
        if (data) setSongMetadata(data);
      })
      .catch((e: Error) => {
        console.log(e.message);
        setSongMetadata({} as ISongMetadata);
      });

    getDetails()
      .then((data) => {
        if (data) setSongDetails(data);
      })
      .catch((e: Error) => {
        console.log(e.message);
        setSongDetails({} as ISongDetails);
      });
  }, []);

  useEffect(() => {
    if (!songDetails?.lyrics) return;

    const { parsedLyrics: _parsedLyrics, chordsDetected } = parseLyrics(
      songDetails.lyrics,
      transShift
    );
    setParsedLyrics(_parsedLyrics);
    setChords(chordsDetected);
  }, [transShift, songDetails]);

  return (
    <>
      {songMetadata?.tags && (
        <>
          <h4>{songMetadata.title}</h4>
          <p>Tagi:</p>
          <div>{songMetadata.tags.join(', ')}</div>
          <br />
          <p>Transponuj:</p>
        </>
      )}
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
      {songDetails && <Lyrics lyrics={parsedLyrics} />}
    </>
  );
}
