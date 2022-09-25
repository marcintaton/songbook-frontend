import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ISongMetadata from '@src/types/interfaces/iSongMetadata';
import { getAllSongsMetadata } from '@src/services/songMetadataService';

export default function SongList() {
  const [metadata, setMetadata] = useState<ISongMetadata[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getAllSongsMetadata();
      console.log(response.data);

      return response.data;
    };

    getData()
      .then((data) => {
        if (data) setMetadata(data);
      })
      .catch((e: Error) => {
        console.log(e.message);
        setMetadata([]);
      });
  }, []);

  return (
    <>
      Piosenki
      <ul>
        {metadata.map((x) => {
          return (
            <li key={x._id}>
              <Link to={`/song/${x._id}`}>{x.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
