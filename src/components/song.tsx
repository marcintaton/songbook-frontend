import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Divider, Icon, VStack } from '@chakra-ui/react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import {
  BsClipboardMinus,
  BsClipboardPlus,
  BsFilePdfFill,
} from 'react-icons/bs';
import { BiCaretDown, BiCaretUp, BiFontFamily } from 'react-icons/bi';
import Cookies from 'universal-cookie';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import Lyrics from '@src/components/lyrics';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import parseLyrics from '@src/utilities/lyricsParser';
import ISong from '@src/types/models/iSong';
import { getSong } from '@src/services/songsService';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';
import HeadingMain from '@src/components/headingMain';
import Tags from '@src/components/tags';
import ButtonPanel from '@src/components/buttonPanel';
import IPrintCartItem from '@src/types/interfaces/iPrintCartItem';
import SingleSongPrint from './singleSongPrint';

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
    if (!printCart) cookies.set('print-cart', [], { path: '/' });
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
    if (!printCart) cookies.set('print-cart', [], { path: '/' });
    const songPresentInCart = printCart.find((x: any) => x.id === id);
    if (shouldAdd && !songPresentInCart) {
      cookies.set(
        'print-cart',
        [
          ...printCart,
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
      cookies.set('print-cart', [...printCart.filter((x) => x.id !== id)], {
        path: '/',
      });
    }
  }

  function savePdf() {
    (document.getElementsByClassName('pdfLink')[0] as HTMLElement).click();
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
        savePdf();
      },
      icon: <Icon as={BsFilePdfFill} />,
      tooltip: 'Drukuj do PDF (WIP)',
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
        ? 'Zapisz do kolejki wydruku (WIP)'
        : 'Usuń z kolejki wydruku (WIP)',
      key: '7',
    },
  ];

  return (
    <>
      <PDFDownloadLink
        className="pdfLink"
        document={<SingleSongPrint />}
        fileName="song.pdf"
      ></PDFDownloadLink>
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
    </>
  );
}
