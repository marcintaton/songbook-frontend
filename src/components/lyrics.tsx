import { nanoid } from 'nanoid';
import { Box, Stack, Text } from '@chakra-ui/react';
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
          return (
            <Stack key={nanoid()}>
              <Text color={'purple'} fontWeight={'bold'}>
                {line.chordLine}
              </Text>
              <Text color={'black'} fontWeight={'normal'}>
                {line.textLine}
              </Text>
            </Stack>
          );
        })}
      </Box>
    </>
  );
}
