import { Box, Divider, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ISongMetadata from '@src/types/models/iSongMetadata';

interface IProps {
  letter: string;
  section: ISongMetadata[];
}

export default function AlphaSongSection(props: IProps) {
  const { letter, section } = props;
  return (
    <Box key={letter}>
      <Text mt={'1em'} color={'grey'} fontSize="lg">
        {letter}
      </Text>
      <Divider orientation="horizontal" mb={'1em'} borderColor={'lightgrey'} />
      {section.map((song) => {
        return (
          <Link key={song._id} to={`/song/${song._id}`}>{`${song.title}`}</Link>
        );
      })}
    </Box>
  );
}
