import { useContext } from 'react';
import { Box } from '@chakra-ui/react';
import { appContext } from './context';

export default function TopBarUser() {
  const { user } = useContext(appContext);

  return (
    <>
      <Box>{user ? user.id : 'undefined'}</Box>
    </>
  );
}
