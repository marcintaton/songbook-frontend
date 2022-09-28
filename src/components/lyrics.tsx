import { nanoid } from 'nanoid';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';

interface IProps {
  lyrics: ILyricsLine[];
  size: string;
  areChordsVisible: boolean;
  fontType: 'regular' | 'monospace';
}

export default function Lyrics(props: IProps) {
  const { lyrics, size, areChordsVisible, fontType } = props;

  return (
    <>
      <Box
        sx={{
          whiteSpace: 'pre-wrap',
          fontFamily: fontType,
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
                    {areChordsPresent && areChordsVisible && (
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
