import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '@src/components/notFound';
import SongList from '@src/components/songList';
import SongDetails from '@src/components/songDetails';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={'/songList'} />} />
        <Route path="/songList" element={<SongList />} />
        <Route path="/song/:id" element={<SongDetails />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
