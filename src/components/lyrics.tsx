import { nanoid } from 'nanoid';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
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
          const areChordsPresent =
            line.lineWords.filter((word) => word.chords !== '.').length !== 0;
          return (
            <Flex wrap={'wrap'} key={nanoid()}>
              {line.lineWords.map((word) => {
                return (
                  <Stack key={nanoid()} marginTop={'1em'}>
                    {areChordsPresent && (
                      <Flex
                        sx={{
                          fontWeight: 'bold',
                          color: 'purple',
                          opacity: word.chords !== '.' ? '1' : '0',
                        }}
                      >
                        {word.chords}
                      </Flex>
                    )}
                    <Text
                      sx={{
                        marginTop: '0em!important',
                        color: '#444444',
                      }}
                    >
                      {word.word}
                    </Text>
                  </Stack>
                );
              })}
            </Flex>
          );
        })}
      </Box>
    </>
  );
}
