import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Divider,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
  Badge,
  Tag,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import ISongMetadata from '@src/types/models/iSongMetadata';
import ITag from '@src/types/models/iTag';
import { getSongsMetadata } from '@src/services/songsService';
import { getTags } from '@src/services/tagsService';

export default function SongList() {
  const [metadata, setMetadata] = useState<ISongMetadata[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const response = await getSongsMetadata();
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

  const songs = metadata;
  const searchFilteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const firstLetters = Array.from(
    new Set(searchFilteredSongs.map((x) => x.title[0]))
  );
  const splitSongs = firstLetters.map((fl) => {
    return searchFilteredSongs.filter((mt) => mt.title[0] === fl);
  });

  useEffect(() => {
    const getData = async () => {
      const response = await getTags();
      return response.data;
    };

    getData()
      .then((data) => {
        if (data) setTags(data);
      })
      .catch((e: Error) => {
        console.log(e.message);
        setTags([]);
      });
  }, []);

  console.log(searchTerm);

  return (
    <>
      <Center>
        <VStack p={'2em'}>
          <Heading as="h1" size="4xl" textAlign={'center'}>
            Śpiewnik Oazowy
          </Heading>
          <Heading as="h6" size="lg" textAlign={'center'}>
            Oaza Dorosłych Knurów
          </Heading>
          <InputGroup pt={'5em'}>
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Szukaj piosenek..."
              size="lg"
            />
            <InputRightElement pt={'5em'} pr={'0.5em'}>
              {searchTerm !== '' && (
                <Tag mt={'3.3em'}>{searchFilteredSongs.length}</Tag>
              )}
              {searchTerm === '' && <SearchIcon mt={'3em'} color={'grey'} />}
            </InputRightElement>
          </InputGroup>
          <Divider orientation="horizontal" pt={'2em'} />

          <Box width={'100%'} justifyContent={'left'}>
            {splitSongs.map((section) => {
              const firstLetter = section[0].title[0];
              return (
                <Box key={firstLetter}>
                  <Text mt={'1em'} color={'grey'} fontSize="lg">
                    {firstLetter}
                  </Text>
                  <Divider orientation="horizontal" mb={'1em'} />
                  {section.map((song) => {
                    return (
                      <Link
                        key={song._id}
                        to={`/song/${song._id}`}
                      >{`${song.title}`}</Link>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </VStack>
      </Center>
    </>
  );
}
