import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ISongMetadata from '@src/types/interfaces/iSongMetadata';
import { getAllSongsMetadata } from '@src/services/songMetadataService';

export default function SongList() {
  const [metadata, setMetadata] = useState<ISongMetadata[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getAllSongsMetadata();

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

  useEffect(() => {
    const _tags: string[] = [];
    metadata.forEach((x) => {
      x.tags.forEach((tag) => {
        if (!_tags.includes(tag)) _tags.push(tag);
      });
    });
    setTags(_tags);
    setSelectedTags(_tags);
  }, [metadata]);

  console.log(selectedTags);

  const filteredSongs = metadata.filter((meta) => {
    return selectedTags.filter((st) => meta.tags.includes(st)).length !== 0;
  });

  return (
    <>
      <p>Filtruj:</p>
      <div>
        {tags.map((tag) => {
          return (
            <button
              key={tag}
              style={{ marginRight: '0.5em' }}
              onClick={() => {
                if (selectedTags.includes(tag))
                  setSelectedTags(selectedTags.filter((_tag) => _tag !== tag));
                else setSelectedTags([...selectedTags, tag]);
              }}
            >
              <div
                style={
                  selectedTags.includes(tag)
                    ? { color: 'red', fontWeight: 'bold' }
                    : { color: 'black', fontWeight: 'normal' }
                }
              >
                {tag}
              </div>
            </button>
          );
        })}
      </div>
      <br />
      Piosenki:
      <ul>
        {filteredSongs.map((x) => {
          return (
            <li key={x._id}>
              <Link to={`/song/${x._id}`}>
                {`${x.title} (${x.tags.join(', ')})`}
              </Link>
            </li>
          );
        })}
      </ul>
      <br />
    </>
  );
}
