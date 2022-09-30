import { Divider } from '@chakra-ui/react';
import { addNewSong } from '@src/services/songsService';
import IFormSongData from '@src/types/interfaces/iFormSongData';
import HeadingMain from './headingMain';
import SongForm from './songForm';

export default function NewSongView() {
  async function submitCallback(payload: IFormSongData) {
    const response = await addNewSong(payload);
    return response.status;
  }

  return (
    <>
      <HeadingMain size="md" title={'Dodaj piosenkę'} />
      <Divider orientation="horizontal" pt={'2em'} borderColor={'lightgrey'} />
      <SongForm variant={'new'} submitCallback={submitCallback} />
    </>
  );
}
