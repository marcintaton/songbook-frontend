import { Page, Text, View, Document } from '@react-pdf/renderer';

export default function SingleSongPrint() {
  return (
    <>
      <Document>
        <Page size="A4">
          <View>
            <Text>Section #1</Text>
          </View>
          <View>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </>
  );
}
