import { nanoid } from 'nanoid';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import React from 'react';

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

          if (line.type === 'chords')
            return <React.Fragment key={nanoid()}></React.Fragment>;

          const chords = [
            {
              value: 'E',
              position: '12em',
            },
            {
              value: 'gis',
              position: '30em',
            },
          ];

          return (
            <div key={nanoid()}>
              <Flex color={color} fontWeight={weight}>
                {line.value.split('').map((char) => (
                  <Stack key={nanoid()}>
                    <Text
                      sx={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'monospace',
                      }}
                      key={nanoid()}
                      color={'purple'}
                      fontWeight={'bold'}
                    >
                      {'e'}
                    </Text>
                    <Text
                      sx={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'monospace',
                      }}
                    >
                      {char}
                    </Text>
                  </Stack>
                ))}
              </Flex>
            </div>
          );
        })}
      </Box>
    </>
  );
}
