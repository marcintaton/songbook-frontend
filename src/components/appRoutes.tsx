import { Route, Routes } from 'react-router-dom';
import NotFound from '@src/components/notFound';
import MainView from '@src/components/mainView';
import SongDetails from '@src/components/songDetails';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/song/:id" element={<SongDetails />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
