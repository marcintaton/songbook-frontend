import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Divider, Icon, VStack } from '@chakra-ui/react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { BsClipboardMinus, BsClipboardPlus } from 'react-icons/bs';
import {
  BiCaretDown,
  BiCaretUp,
  BiFontFamily,
  BiPrinter,
} from 'react-icons/bi';
import Cookies from 'universal-cookie';
import Lyrics from '@src/components/lyrics';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import parseLyrics from '@src/utilities/lyricsParser';
import ISong from '@src/types/models/iSong';
import { getSong } from '@src/services/songsService';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import ViewRoot from '@src/components/viewRoot';
import HeadingMain from '@src/components/headingMain';
import Tags from '@src/components/tags';
import ButtonPanel from '@src/components/buttonPanel';
import generateAndSavePdf from '@src/utilities/songToPdf';
import IPrintCartItem from '@src/types/interfaces/iPrintCartItem';

export default function Song() {
  const { id } = useParams();
  const cookies = new Cookies();

  const [song, setSong] = useState<ISong>();
  const [transShift, setTransShift] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(1.2);
  const [lyrics, setLyrics] = useState<ILyricsLine[]>([]);
  const [areChordsVisible, setAreChordsVisible] = useState<boolean>(true);
  const [isMonoFontType, setIsMonoFontType] = useState<boolean>(true);
  const [songSavedForPrint, setSongSavedForPrint] = useState<boolean>(false);

  useEffect(() => {
    apiFetchDelegate<ISong | undefined>(getSong, [setSong], {} as ISong, [id]);

    const printCart = cookies.get('print-cart');
    if (!printCart) cookies.set('print-cart', []);
    if (printCart && printCart.find((x: any) => x.id === id)) {
      setSongSavedForPrint(true);
    }
  }, []);

  useEffect(() => {
    if (!song?.lyrics) return;

    const { lyrics: _lyrics } = parseLyrics(song.lyrics, transShift);
    setLyrics(_lyrics);
  }, [transShift, song]);

  function saveSongForPrinting(shouldAdd: boolean) {
    const printCart: IPrintCartItem[] = cookies.get('print-cart');
    if (!printCart) cookies.set('print-cart', []);
    const songPresentInCart = printCart.find((x: any) => x.id === id);
    if (shouldAdd && !songPresentInCart) {
      cookies.set('print-cart', [
        ...printCart,
        {
          id,
          chords: areChordsVisible,
          monoFont: isMonoFontType,
          transShift,
        },
      ]);
    } else if (!shouldAdd && songPresentInCart) {
      cookies.set('print-cart', [...printCart.filter((x) => x.id !== id)]);
    }
  }

  const mainPanelButtonsConfig = [
    {
      action: () => setIsMonoFontType(!isMonoFontType),
      icon: <Icon as={BiFontFamily} />,
      tooltip: 'Zmień czcionkę',
      key: '0',
    },
    {
      action: () => setFontSize(Math.min(2.0, fontSize + 0.1)),
      icon: <Icon as={BiCaretUp} />,
      tooltip: 'Powiększ czcionkę',
      key: '1',
    },
    {
      action: () => setFontSize(Math.max(0.5, fontSize - 0.1)),
      icon: <Icon as={BiCaretDown} />,
      tooltip: 'Zmniejsz czcionkę',
      key: '2',
    },
    {
      action: () => setTransShift(transShift + 1),
      icon: '♯',
      tooltip: 'Transponuj w górę',
      disabled: !areChordsVisible,
      key: '3',
    },
    {
      action: () => setTransShift(transShift - 1),
      icon: '♭',
      tooltip: 'Transponuj w dół',
      disabled: !areChordsVisible,
      key: '4',
    },
    {
      action: () => setAreChordsVisible(!areChordsVisible),
      icon: areChordsVisible ? (
        <Icon as={HiOutlineEye} />
      ) : (
        <Icon as={HiOutlineEyeOff} />
      ),
      tooltip: areChordsVisible ? 'Ukryj chwyty' : 'Pokaż chwyty',
      key: '5',
    },
    {
      action: () => {
        generateAndSavePdf(
          song!,
          lyrics,
          areChordsVisible,
          isMonoFontType,
          transShift
        );
      },
      icon: <Icon as={BiPrinter} />,
      tooltip: 'Drukuj',
      key: '6',
    },
    {
      action: () => {
        saveSongForPrinting(!songSavedForPrint);
        setSongSavedForPrint(!songSavedForPrint);
      },
      icon: !songSavedForPrint ? (
        <Icon as={BsClipboardPlus} />
      ) : (
        <Icon as={BsClipboardMinus} />
      ),
      tooltip: !songSavedForPrint
        ? 'Zapisz do kolejki wydruku'
        : 'Usuń z kolejki wydruku',
      key: '7',
    },
  ];

  return (
    <>
      <ViewRoot maxWidth="50em">
        {song && (
          <VStack p={'2em'}>
            <Box alignSelf={'left'}>
              <Link to={`/`}>{`Powrót`}</Link>
            </Box>

            <HeadingMain size="lg" title={song?.title} />
            <Tags tags={song.tags} />
            <Divider
              orientation="horizontal"
              pb={'3em'}
              borderColor={'lightgrey'}
            />
            <ButtonPanel
              buttons={mainPanelButtonsConfig}
              color={'purple'}
              variant={'solid'}
              size={'sm'}
              isAttached={true}
            />
            <Divider orientation="horizontal" borderColor={'lightgrey'} />

            <Box pt={'3em'}>
              <Lyrics
                lyrics={lyrics}
                size={`${fontSize}em`}
                areChordsVisible={areChordsVisible}
                fontType={isMonoFontType ? 'monospace' : 'regular'}
              />
            </Box>
          </VStack>
        )}
      </ViewRoot>
    </>
  );
}
