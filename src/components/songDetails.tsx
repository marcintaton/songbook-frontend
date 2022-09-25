import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSongMetadata } from '@src/services/songMetadataService';
import ISongMetadata from '@src/types/interfaces/iSongMetadata';
import ISongDetails from '@src/types/interfaces/iSongDetails';
import { getSongDetails } from '@src/services/songDetailsService';
import Lyrics from '@src/components/lyrics';

export default function SongDetails() {
  const { id } = useParams();

  const [songMetadata, setSongMetadata] = useState<ISongMetadata>();
  const [songDetails, setSongDetails] = useState<ISongDetails>();
  const [transShift, setTransShift] = useState<number>(0);

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

  return (
    <>
      <h4>{songMetadata && songMetadata.title}</h4>
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
      <br />
      {songDetails && (
        <Lyrics lyrics={songDetails?.lyrics} transposeShift={transShift} />
      )}
    </>
  );
}
