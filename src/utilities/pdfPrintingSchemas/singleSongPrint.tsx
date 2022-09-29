import {
  Page,
  Font,
  Text,
  View,
  Document,
  pdf,
  StyleSheet,
} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { nanoid } from 'nanoid';
import ILyricsLine from '@src/types/interfaces/iLyricsLine';
import RobotoMono from '@root/assets/fonts/RobotoMono-Regular.ttf';
import RobotoMonoBold from '@root/assets/fonts/RobotoMono-Bold.ttf';
import Roboto from '@root/assets/fonts/Roboto-Regular.ttf';
import RobotoBold from '@root/assets/fonts/Roboto-Bold.ttf';

interface IProps {
  title: string;
  lyrics: ILyricsLine[];
  size: number;
  areChordsVisible: boolean;
  shouldPrintMonoFont: boolean;
}

Font.register({
  family: 'RobotoMono',
  src: RobotoMono,
  format: 'truetype',
});

Font.register({
  family: 'RobotoMonoBold',
  src: RobotoMonoBold,
  format: 'truetype',
});

Font.register({
  family: 'Roboto',
  src: Roboto,
  format: 'truetype',
});

Font.register({
  family: 'RobotoBold',
  src: RobotoBold,
  format: 'truetype',
});

const baseFontSize = 12;

export default async function SingleSongPrint(props: IProps) {
  const {
    title,
    lyrics,
    size: relativeFontSize,
    areChordsVisible,
    shouldPrintMonoFont,
  } = props;

  const style = StyleSheet.create({
    page: {
      fontFamily: shouldPrintMonoFont ? 'RobotoMono' : 'Roboto',
      margin: '20px',
    },
  });

  const blob = await pdf(
    <Document>
      <Page size="A4" style={style.page}>
        <View>
          <Text
            style={{
              fontSize: `${baseFontSize * relativeFontSize}px`,
              fontFamily: shouldPrintMonoFont ? 'RobotoMonoBold' : 'RobotoBold',
              marginBottom: '20px',
            }}
          >
            {title}
          </Text>

          {lyrics.map((line) => {
            return (
              <View
                key={nanoid()}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {line.lineWords.map((word) => {
                  return (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: `${baseFontSize * relativeFontSize}px`,
                      }}
                      key={nanoid()}
                    >
                      {areChordsVisible && (
                        <Text
                          style={{
                            color: 'purple',
                            fontFamily: shouldPrintMonoFont
                              ? 'RobotoMonoBold'
                              : 'RobotoBold',
                          }}
                        >
                          {word.chords
                            .replaceAll(' ', '\u{2007}')
                            .replaceAll('.', '\u{2007}')}
                        </Text>
                      )}
                      <Text>{word.word}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  ).toBlob();

  saveAs(blob, title);
}
