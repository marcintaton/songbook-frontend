import { nanoid } from 'nanoid';
import { Box, Container, Flex, Stack, Text, VStack } from '@chakra-ui/react';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';

interface IProps {
  lyrics: ILyricsLine[];
  size: string;
}

export default function Lyrics(props: IProps) {
  const { lyrics, size } = props;

  return (
    <>
      <Box
        sx={{
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          fontSize: size,
        }}
      >
        {lyrics.map((line) => {
          const _lineWords = line.textLine.split(' ');
          const lineWords = [];
          for (let i = 0; i < _lineWords.length; i += 1) {
            const fcp = _lineWords
              .slice(0, i)
              .reduce((partial, a) => partial + a.length + 1, 0);
            lineWords.push({
              word: `${_lineWords[i]} `,
              firstCharPos: fcp,
              boundChords: line.chordPositions.filter(
                (chord) =>
                  chord.position >= fcp &&
                  chord.position < fcp + _lineWords[i].length
              ),
            });
          }

          // console.log(line.chordPositions);
          // console.log(lineWords);

          return (
            <Flex key={nanoid()}>
              {lineWords.map((word) => (
                <VStack key={nanoid()}>
                  <Flex
                    sx={{
                      fontWeight: 'bold',
                      color: 'purple',
                    }}
                  >
                    {word.boundChords.length !== 0
                      ? word.boundChords.map((c) => c.chord)
                      : '.'}
                  </Flex>
                  <Flex
                    sx={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'monospace',
                    }}
                  >
                    {word.word}
                  </Flex>
                </VStack>
              ))}
            </Flex>
          );
        })}
      </Box>
    </>
  );
}
