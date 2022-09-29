import { Route, Routes } from 'react-router-dom';
import NotFound from '@src/components/notFound';
import MainView from '@src/components/mainView';
import Song from '@src/components/song';
import NewSongView from '@src/components/newSongView';
import PrintView from './printView';
import EditSongView from './editSongView';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/song/:id/edit" element={<EditSongView />} />
        <Route path="/new" element={<NewSongView />} />
        <Route path="/print" element={<PrintView />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
