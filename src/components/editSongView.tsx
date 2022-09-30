import { useEffect, useState } from 'react';
import { Divider } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSong, updateSong } from '@src/services/songsService';
import IFormSongData from '@src/types/interfaces/iFormSongData';
import HeadingMain from './headingMain';
import SongForm from './songForm';
import ISong from '@src/types/models/iSong';
import apiFetchDelegate from '@src/utilities/apiFetchDelegate';

export default function NewSongView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState<ISong>({} as ISong);

  useEffect(() => {
    apiFetchDelegate<ISong>(getSong, [setSong], {} as ISong, [id]);
  }, [id]);

  async function submitCallback(payload: IFormSongData) {
    if (!id) return 500;
    const response = await updateSong(id, payload);
    return response.status;
  }

  function returnCallback() {
    navigate(`/song/${id}`);
  }

  return (
    <>
      <HeadingMain size="md" title={'Edytuj piosenkę'} />
      <HeadingMain size="sm" title={song.title} />
      <Divider orientation="horizontal" pt={'2em'} borderColor={'lightgrey'} />
      <SongForm
        variant={'edit'}
        submitCallback={submitCallback}
        dataForEdit={{
          title: song.title,
          lyrics: song.lyrics,
          tags: song.tags,
          credits: song.credits,
          notes: song.notes,
          customBackCallback: returnCallback,
        }}
      />
    </>
  );
}
