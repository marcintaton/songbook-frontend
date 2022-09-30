import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Icon, VStack } from '@chakra-ui/react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { BsFilePdfFill, BsPrinter, BsPrinterFill } from 'react-icons/bs';
import { BiCaretDown, BiCaretUp, BiFontFamily } from 'react-icons/bi';
import Lyrics from '@src/components/lyrics';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import parseLyrics from '@src/utilities/lyricsParser';
import ISong from '@src/types/models/iSong';
import { getSong } from '@src/services/songsService';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import HeadingMain from '@src/components/headingMain';
import Tags from '@src/components/tags';
import ButtonPanel from '@src/components/buttonPanel';
import SingleSongPrint from '../utilities/pdfPrintingSchemas/singleSongPrint';
import OptionalTextSection from './optionalTextSection';
import { appContext } from './context';

export default function Song() {
  const { id } = useParams();
  const context = useContext(appContext);
  const cartCookie = context.cookies?.printCart;

  const [song, setSong] = useState<ISong>();
  const [transShift, setTransShift] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(1.2);
  const [lyrics, setLyrics] = useState<ILyricsLine[]>([]);
  const [areChordsVisible, setAreChordsVisible] = useState<boolean>(true);
  const [isMonoFontType, setIsMonoFontType] = useState<boolean>(true);
  const [songSavedForPrint, setSongSavedForPrint] = useState<boolean>(false);

  useEffect(() => {
    apiFetchDelegate<ISong | undefined>(getSong, [setSong], {} as ISong, [id]);

    if (!cartCookie) return;

    if (!cartCookie.value) cartCookie.set('print-cart', [], { path: '/' });
    else if (cartCookie.value.find((x: any) => x.id === id)) {
      setSongSavedForPrint(true);
    }
  }, []);

  useEffect(() => {
    if (!song?.lyrics) return;

    const { lyrics: _lyrics } = parseLyrics(song.lyrics, transShift);
    setLyrics(_lyrics);
  }, [transShift, song]);

  function saveSongForPrinting(shouldAdd: boolean) {
    if (!cartCookie) return;

    if (!cartCookie.value) cartCookie.set('print-cart', [], { path: '/' });
    const songPresentInCart = cartCookie.value.find((x: any) => x.id === id);
    if (shouldAdd && !songPresentInCart) {
      cartCookie.set(
        'print-cart',
        [
          ...cartCookie.value,
          {
            id,
            chords: areChordsVisible,
            monoFont: isMonoFontType,
            transShift,
          },
        ],
        { path: '/' }
      );
    } else if (!shouldAdd && songPresentInCart) {
      cartCookie.set(
        'print-cart',
        [...cartCookie.value.filter((x) => x.id !== id)],
        {
          path: '/',
        }
      );
    }
  }

  function savePdf() {
    if (!song) return;

    SingleSongPrint({
      title: song?.title,
      lyrics,
      size: fontSize,
      areChordsVisible,
      shouldPrintMonoFont: isMonoFontType,
    });
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
      tooltip: `Transponuj w górę (${transShift})`,
      disabled: !areChordsVisible,
      key: '3',
    },
    {
      action: () => setTransShift(transShift - 1),
      icon: '♭',
      tooltip: `Transponuj w dół (${transShift})`,
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
        savePdf();
      },
      icon: <Icon as={BsFilePdfFill} />,
      tooltip: 'Drukuj do PDF',
      key: '6',
    },
    {
      action: () => {
        saveSongForPrinting(!songSavedForPrint);
        setSongSavedForPrint(!songSavedForPrint);
      },
      icon: !songSavedForPrint ? (
        <Icon as={BsPrinter} />
      ) : (
        <Icon as={BsPrinterFill} />
      ),
      tooltip: !songSavedForPrint
        ? 'Zapisz do kolejki wydruku (WIP)'
        : 'Usuń z kolejki wydruku (WIP)',
      key: '7',
    },
  ];

  return (
    <>
      {song && (
        <VStack p={'2em'}>
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
            variant={'ghost'}
            size={'md'}
            isAttached={true}
          />
          <Divider orientation="horizontal" borderColor={'lightgrey'} />
          {song.notes && (
            <Box pt={'2em'} width={'100%'}>
              <OptionalTextSection
                title={'Notatki'}
                value={song.notes}
                fontStyle={'italic'}
                newLineTitle
              />
            </Box>
          )}
          <Box pt={'2em'} width={'100%'}>
            <Lyrics
              lyrics={lyrics}
              size={`${fontSize}em`}
              areChordsVisible={areChordsVisible}
              fontType={isMonoFontType ? 'monospace' : 'regular'}
            />
          </Box>
          {song.credits && (
            <Box pt={'2em'} width={'100%'}>
              <OptionalTextSection
                title={'Źródło:'}
                value={song.credits}
                fontStyle={'italic'}
                textColor={'grey'}
              />
            </Box>
          )}
        </VStack>
      )}
    </>
  );
}
