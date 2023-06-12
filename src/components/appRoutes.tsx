import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import NotFound from '@src/components/notFound';
import MainView from '@src/components/mainView';
import Song from '@src/components/song';
import NewSongView from '@src/components/newSongView';
import EditSongView from './editSongView';
import Login from './login';
import { appContext } from './context';

export default function AppRoutes() {
  const { user } = useContext(appContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/song/:id/edit" element={<EditSongView />} />
        <Route path="/new" element={<NewSongView />} />
        {!user && <Route path="/login" element={<Login />} />}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
