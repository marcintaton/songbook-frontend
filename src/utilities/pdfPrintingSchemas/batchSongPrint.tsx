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
  songs: {
    title: string;
    lyrics: ILyricsLine[];
    areChordsVisible: boolean;
    shouldPrintBlackAndWhite: boolean;
    notes: string;
  }[];
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

const baseFontSize = 12;

export default async function BatchSongPrint(props: IProps) {
  const { songs } = props;

  const style = StyleSheet.create({
    page: {
      fontFamily: 'RobotoMono',
      margin: '20px',
    },
  });

  const blob = await pdf(
    <Document>
      <Page size="A4" style={style.page} wrap>
        <View wrap>
          {songs.map((song) => {
            return (
              <View key={nanoid()} break={songs.indexOf(song) !== 0}>
                <Text
                  style={{
                    fontSize: `${baseFontSize}px`,
                    fontFamily: 'RobotoMonoBold',
                    marginBottom: '20px',
                  }}
                >
                  {song.title}
                </Text>

                {song.lyrics.map((line) => {
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
                              fontSize: `${baseFontSize}px`,
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
                                .replaceAll(' ', '\u{2007}')
                                .replaceAll('.', '\u{2007}')}
                            </Text>
                            <Text>{word.word}</Text>
                          </View>
                        );
                      })}
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

  saveAs(blob, 'batch');
}
