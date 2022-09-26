import { Box } from '@chakra-ui/react';
import ISongMetadata from '@src/types/models/iSongMetadata';
import AlphaSongSection from '@src/components/alphaSongSection';

interface IProps {
  splitSongs: ISongMetadata[][];
}

export default function SongList(props: IProps) {
  const { splitSongs } = props;
  return (
    <Box width={'100%'} justifyContent={'left'}>
      {splitSongs.map((section) => {
        const firstLetter = section[0].title[0];
        return (
          <AlphaSongSection
            key={firstLetter}
            letter={firstLetter}
            section={section}
          />
        );
      })}
    </Box>
  );
}
