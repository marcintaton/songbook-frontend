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

interface IProps {
  title: string;
  lyrics: ILyricsLine[];
  size: number;
  areChordsVisible: boolean;
  fontType: string;
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

const style = StyleSheet.create({
  page: {
    fontFamily: 'RobotoMono',
    margin: '20px',
  },
});

const baseFontSize = 12;

export default async function SingleSongPrint(props: IProps) {
  const {
    title,
    lyrics,
    size: relativeFontSize,
    // areChordsVisible,
    // fontType,
  } = props;

  const blob = await pdf(
    <Document>
      <Page size="A4" style={style.page}>
        <View>
          <Text
            style={{
              fontSize: `${baseFontSize * relativeFontSize}px`,
              fontFamily: 'RobotoMonoBold',
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
                      <Text
                        style={{
                          color: 'purple',
                          fontFamily: 'RobotoMonoBold',
                        }}
                      >
                        {word.chords
                          .replaceAll(' ', '\t')
                          .replaceAll('.', '\t')}
                      </Text>
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
