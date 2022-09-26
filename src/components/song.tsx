import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Tag, VStack } from '@chakra-ui/react';
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
            <HeadingMain size="md" title={song?.title} />
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

            <Box pt={'3em'}>
              <Lyrics lyrics={parsedLyrics} />
            </Box>
          </VStack>
        )}
      </ViewRoot>
      <br />
      <br />
      <br />
      <br />
      <br />
      {song?.lyrics && (
        <>
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
          <br />
        </>
      )}
    </>
  );
}
