import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Icon,
  Tag,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { HiPlus, HiMinus, HiPrinter } from 'react-icons/hi';
import Lyrics from '@src/components/lyrics';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import parseLyrics from '@src/utilities/lyricsParser';
import ISong from '@src/types/models/iSong';
import { getSong } from '@src/services/songsService';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import ViewRoot from './viewRoot';
import HeadingMain from './headingMain';

export default function Song() {
  const { id } = useParams();

  const [song, setSong] = useState<ISong>();
  const [transShift, setTransShift] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(1.2);
  const [lyrics, setLyrics] = useState<ILyricsLine[]>([]);

  useEffect(() => {
    apiFetchDelegate<ISong | undefined>(getSong, [setSong], {} as ISong, [id]);
  }, []);

  useEffect(() => {
    if (!song?.lyrics) return;

    const { lyrics: _lyrics } = parseLyrics(song.lyrics, transShift);
    setLyrics(_lyrics);
  }, [transShift, song]);

  return (
    <>
      <ViewRoot>
        {song && (
          <VStack p={'2em'}>
            <Box alignSelf={'left'}>
              <Link to={`/`}>{`Powrót`}</Link>
            </Box>

            <HeadingMain size="lg" title={song?.title} />
            <Box align={'center'} pt={'3em'}>
              {song.tags.map((tag) => (
                <Tag
                  backgroundColor={'blue'}
                  m={'0.1em'}
                  key={tag}
                  colorScheme={'blue'}
                  variant={'solid'}
                >
                  {tag}
                </Tag>
              ))}
            </Box>
            <Divider
              orientation="horizontal"
              pb={'3em'}
              borderColor={'lightgrey'}
            />
            <Box>
              <Tooltip label="Powiększ czcionkę">
                <Button
                  marginInline={'0.5em'}
                  size={'sm'}
                  colorScheme="purple"
                  variant="solid"
                  onClick={() => setFontSize(Math.min(2.0, fontSize + 0.1))}
                >
                  A
                </Button>
              </Tooltip>
              <Tooltip label="Zmniejsz czcionkę">
                <Button
                  marginInline={'0.5em'}
                  size={'sm'}
                  colorScheme="purple"
                  variant="solid"
                  onClick={() => setFontSize(Math.max(0.5, fontSize - 0.1))}
                >
                  a
                </Button>
              </Tooltip>

              <Tooltip label="Transponuj w górę">
                <Button
                  marginInline={'0.5em'}
                  size={'sm'}
                  colorScheme="purple"
                  variant="solid"
                  onClick={() => setTransShift(transShift + 1)}
                >
                  <Icon as={HiPlus} />
                </Button>
              </Tooltip>
              <Tooltip label="Transponuj w dół">
                <Button
                  marginInline={'0.5em'}
                  size={'sm'}
                  colorScheme="purple"
                  variant="solid"
                  onClick={() => setTransShift(transShift - 1)}
                >
                  <Icon as={HiMinus} />
                </Button>
              </Tooltip>
              <Tooltip label="Dodaj do wydruku">
                <Button
                  marginInline={'0.5em'}
                  size={'sm'}
                  colorScheme="purple"
                  variant="solid"
                  onClick={() => {}}
                >
                  <Icon as={HiPrinter} />
                </Button>
              </Tooltip>
            </Box>
            <Divider orientation="horizontal" borderColor={'lightgrey'} />

            <Box pt={'3em'}>
              <Lyrics lyrics={lyrics} size={`${fontSize}em`} />
            </Box>
          </VStack>
        )}
      </ViewRoot>
    </>
  );
}
