import { nanoid } from 'nanoid';
import { Box, Text } from '@chakra-ui/react';
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
          const color = line.type === 'text' ? 'black' : 'purple';
          const weight = line.type === 'text' ? 'normal' : 'bold';
          return (
            <Text color={color} fontWeight={weight} key={nanoid()}>
              {line.value}
            </Text>
          );
        })}
      </Box>
    </>
  );
}
