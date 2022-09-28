import { useState, useEffect } from 'react';
import { VStack } from '@chakra-ui/react';
import ISongMetadata from '@src/types/models/iSongMetadata';
import ITag from '@src/types/models/iTag';
import { getSongsMetadata } from '@src/services/songsService';
import { getTags } from '@src/services/tagsService';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import HeadingMain from '@src/components/headingMain';
import SearchBox from '@src/components/searchBox';
import TagSelector from '@src/components/tagSelector';
import SongList from '@src/components/songList';

export default function MainView() {
  const [metadata, setMetadata] = useState<ISongMetadata[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    apiFetchDelegate<ISongMetadata[]>(getSongsMetadata, [setMetadata], []);
    apiFetchDelegate<ITag[]>(getTags, [setTags, setSelectedTags], []);
  }, []);

  const songs = metadata;
  const tagFilteredSongs = songs.filter((song) =>
    song.tags.some((tag) => selectedTags.map((x) => x.name).includes(tag))
  );

  const searchFilteredSongs = tagFilteredSongs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const firstLetters = Array.from(
    new Set(searchFilteredSongs.map((x) => x.title[0]))
  );
  const splitSongs = firstLetters.map((fl) => {
    return searchFilteredSongs.filter((mt) => mt.title[0] === fl);
  });

  return (
    <>
      <VStack p={'2em'}>
        <HeadingMain
          size="lg"
          title={'Śpiewnik'}
          subTitle={'Oaza Dorosłych Knurów'}
        />
        <SearchBox
          onInputChange={(v) => setSearchTerm(v)}
          value={searchTerm}
          placeholder={'Szukaj piosenek...'}
          foundItemsCount={searchFilteredSongs.length}
        />
        <TagSelector
          title="Filtruj..."
          tags={tags}
          selectedTags={selectedTags}
          setSelected={(_tags: ITag[]) => {
            setSelectedTags(_tags);
          }}
          shouldWarn={selectedTags.length !== tags.length}
          warnText={'Filtry aktywne!'}
        />
        <SongList splitSongs={splitSongs} />
      </VStack>
    </>
  );
}
