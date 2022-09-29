import { useParams } from 'react-router-dom';

export default function EditSongView() {
  const { id } = useParams();

  return <>Edit song {id}</>;
}
