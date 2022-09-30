import { useContext, useEffect, useState } from 'react';
import { Button, Divider, Icon, VStack } from '@chakra-ui/react';
import { appContext } from './context';
import PrintListElement from './printListElement';
import ISong from '@src/types/models/iSong';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import { getSelectedSongs } from '@src/services/songsService';
import HeadingMain from './headingMain';
import { BsFillArrowUpCircleFill, BsPrinter } from 'react-icons/bs';

export default function PrintView() {
  const context = useContext(appContext);
  const cartCookie = context.cookies?.printCart;

  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    const ids = cartCookie?.value.map((x) => x.id);

    apiFetchDelegate(getSelectedSongs, [setSongs], [] as ISong[], [ids]);
  }, [cartCookie?.value]);

  return (
    <>
      <HeadingMain size="md" title={'Przygotuj wydruk'} />
      <Divider orientation="horizontal" pt={'2em'} borderColor={'lightgrey'} />

      {songs && (
        <VStack p={'2em'}>
          {songs.map((song) => {
            return <PrintListElement key={song._id} title={song.title} />;
          })}
        </VStack>
      )}
      <Button
        leftIcon={<Icon as={BsPrinter} />}
        colorScheme="purple"
        variant="solid"
        ml={'2em'}
      >
        Drukuj
      </Button>
    </>
  );
}
