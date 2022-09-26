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
  Tag,
  SimpleGrid,
  GridItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import ISongMetadata from '@src/types/models/iSongMetadata';
import ITag from '@src/types/models/iTag';
import { getSongsMetadata } from '@src/services/songsService';
import { getTags } from '@src/services/tagsService';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';

export default function SongList() {
  const [metadata, setMetadata] = useState<ISongMetadata[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    apiFetchDelegate<ISongMetadata[]>(getSongsMetadata, [setMetadata], []);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await getTags();
      return response.data;
    };

    getData()
      .then((data) => {
        if (data) {
          setTags(data);
          setSelectedTags(data);
        }
      })
      .catch((e: Error) => {
        console.log(e.message);
        setTags([]);
        setSelectedTags([]);
      });
  }, []);

  const songs = metadata;
  const tagFilteredSongs = songs.filter((song) =>
    song.tags.some((tag) => selectedTags.map((x) => x.name).includes(tag))
  );

  const areTagFiltersActive = tags.length !== selectedTags.length;

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
      <SimpleGrid
        columns={[1, 1, 3]}
        templateColumns={['1fr', '1fr', 'repeat(5, 1fr)']}
      >
        <GridItem colSpan={[0, 0, 1]}></GridItem>
        <GridItem colSpan={[0, 0, 3]}>
          <Center margin={'auto'} maxWidth={'41.8em'}>
            <VStack p={'2em'}>
              <Heading
                pt={'0.4em'}
                as="h1"
                size="4xl"
                textAlign={'center'}
                bgGradient={'linear(to-r, blue.500, purple.500)'}
                bgClip={'text'}
              >
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
                    <Tag color={'grey'} mt={'3.3em'}>
                      {searchFilteredSongs.length}
                    </Tag>
                  )}
                  {searchTerm === '' && (
                    <SearchIcon mt={'3em'} color={'grey'} />
                  )}
                </InputRightElement>
              </InputGroup>

              <Accordion allowToggle width={'100%'} maxWidth={'41em'}>
                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left" color={'grey'}>
                            Filtruj...
                          </Box>
                          <Tag
                            display={
                              areTagFiltersActive && !isExpanded
                                ? 'inherit'
                                : 'none'
                            }
                            color={'grey'}
                          >
                            Filtry Aktywne!
                          </Tag>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Tag
                          colorScheme={areTagFiltersActive ? 'purple' : 'blue'}
                          variant={areTagFiltersActive ? 'subtle' : 'solid'}
                          m={'0.1em'}
                          onClick={() => {
                            if (tags.length === selectedTags.length)
                              setSelectedTags([]);
                            else setSelectedTags([...tags]);
                          }}
                        >
                          Wszystkie
                        </Tag>
                        {tags.map((tag) => {
                          const isSelected = selectedTags.includes(tag);
                          return (
                            <Tag
                              colorScheme={isSelected ? 'blue' : 'purple'}
                              variant={isSelected ? 'solid' : 'subtle'}
                              key={tag._id}
                              m={'0.1em'}
                              onClick={() => {
                                if (isSelected)
                                  setSelectedTags([
                                    ...selectedTags.filter(
                                      (x) => x._id !== tag._id
                                    ),
                                  ]);
                                else setSelectedTags([...selectedTags, tag]);
                              }}
                            >
                              {tag.name}
                            </Tag>
                          );
                        })}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>

              {/* <Divider orientation="horizontal" pt={'2em'} /> */}

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
        </GridItem>
        <GridItem colSpan={[0, 0, 1]}></GridItem>
      </SimpleGrid>
    </>
  );
}
