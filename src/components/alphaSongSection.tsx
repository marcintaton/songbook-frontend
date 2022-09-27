import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ISongMetadata from '@src/types/models/iSongMetadata';

interface IProps {
  letter: string;
  section: ISongMetadata[];
}

export default function AlphaSongSection(props: IProps) {
  const { letter, section } = props;
  const navigate = useNavigate();
  return (
    <Box key={letter}>
      <Text mt={'1em'} color={'grey'} fontSize="lg">
        {letter}
      </Text>
      <Divider orientation="horizontal" mb={'1em'} borderColor={'lightgrey'} />
      {section.map((song) => {
        return (
          <Flex
            as={'button'}
            _active={{
              transform: 'scale(0.98)',
            }}
            width={'100%'}
            onClick={() => navigate(`/song/${song._id}`)}
            key={song._id}
            paddingBlock={'0.5em'}
          >
            {`${song.title}`}
          </Flex>
        );
      })}
    </Box>
  );
}
