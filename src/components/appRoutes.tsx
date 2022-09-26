import { Route, Routes } from 'react-router-dom';
import NotFound from '@src/components/notFound';
import MainView from '@src/components/mainView';
import Song from '@src/components/song';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
