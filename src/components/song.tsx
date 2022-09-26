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
              <Lyrics lyrics={parsedLyrics} size={'1em'} />
            </Box>
          </VStack>
        )}
      </ViewRoot>
    </>
  );
}
