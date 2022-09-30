import { useContext, useEffect, useState } from 'react';
import { Button, Divider, HStack, Icon, VStack } from '@chakra-ui/react';
import { BsPlusLg, BsPrinter, BsTrash } from 'react-icons/bs';
import { appContext } from './context';
import PrintListElement from './printListElement';
import ISong from '@src/types/models/iSong';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import { getSelectedSongs } from '@src/services/songsService';
import HeadingMain from './headingMain';
import BatchSongPrint from '@src/utilities/pdfPrintingSchemas/batchSongPrint';
import parseLyrics from '@src/utilities/lyricsParser';

export default function PrintView() {
  const context = useContext(appContext);
  const cartCookie = context.cookies?.printCart;

  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    const ids = cartCookie?.value.map((x) => x.id);

    apiFetchDelegate(getSelectedSongs, [setSongs], [] as ISong[], [ids]);
  }, [cartCookie?.value]);

  function removeAll() {
    cartCookie?.set('print-cart', []);
  }

  function savePdf() {
    if (!songs) return;

    console.log(songs);

    BatchSongPrint({
      songs: songs.map((x) => {
        const _lyrics = parseLyrics(x.lyrics, 0);
        return {
          title: x.title,
          lyrics: _lyrics.lyrics,
          areChordsVisible: x._id !== '0',
          shouldPrintBlackAndWhite: x._id === '0',
          notes: '',
        };
      }),
    });
  }

  return (
    <>
      <HeadingMain size="md" title={'Przygotuj wydruk'} />
      <Divider orientation="horizontal" pt={'2em'} borderColor={'lightgrey'} />
      <HStack spacing={'1em'} mt={'2em'}>
        <Button
          leftIcon={<Icon as={BsPlusLg} />}
          colorScheme="purple"
          variant="solid"
          ml={'2em'}
          disabled
        >
          Dodaj
        </Button>
        <Button
          leftIcon={<Icon as={BsTrash} />}
          colorScheme="purple"
          variant="solid"
          ml={'2em'}
          onClick={removeAll}
        >
          Usuń wszystkie
        </Button>
      </HStack>
      {songs && (
        <VStack p={'2em'} spacing={'3em'}>
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
        onClick={savePdf}
      >
        Drukuj
      </Button>
    </>
  );
}
