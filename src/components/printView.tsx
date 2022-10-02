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
import IPrintListItem from '@src/types/interfaces/iPrintListItem';

export default function PrintView() {
  const context = useContext(appContext);
  const cartCookie = context.cookies?.printCart;

  const [songs, setSongs] = useState<IPrintListItem[]>([]);

  useEffect(() => {
    const ids = cartCookie?.value.map((x) => x.id);

    apiFetchDelegate(
      getSelectedSongs,
      (payload: ISong[]) => {
        setSongs(
          payload.map((song) => {
            const cookieProps = cartCookie?.value.find(
              (cartData) => cartData.id === song._id
            );
            return {
              song,
              areChordsVisible: cookieProps?.chords || false,
              hasMonoFont: cookieProps?.monoFont || false,
              transShift: cookieProps?.transShift || 0,
              shouldPrintBnW: false,
              orderId: payload.indexOf(song),
            };
          })
        );
      },
      [] as ISong[],
      [ids]
    );
  }, [cartCookie?.value]);

  function removeAll() {
    cartCookie?.set([]);
  }

  function savePdf() {
    if (!songs) return;

    BatchSongPrint({
      songs: songs.map((x) => {
        const _lyrics = parseLyrics(x.song.lyrics, 0);
        return {
          title: x.song.title,
          lyrics: _lyrics.lyrics,
          areChordsVisible: x.areChordsVisible,
          shouldPrintBlackAndWhite: x.shouldPrintBnW,
          notes: '',
        };
      }),
    });
  }

  function onItemChange(_payload: IPrintListItem) {
    setSongs([
      ...songs.filter((x) => x.song._id !== _payload.song._id),
      _payload,
    ]);
  }

  const _songs = songs.sort((a, b) => a.orderId - b.orderId);

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
      {_songs && (
        <VStack p={'2em'} spacing={'3em'}>
          {_songs.map((item) => {
            return (
              <PrintListElement
                key={item.song._id}
                item={item}
                onChange={onItemChange}
              />
            );
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
