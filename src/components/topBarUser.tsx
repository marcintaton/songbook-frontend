import { useContext } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { appContext } from './context';
import { logout } from '@src/services/authService';

export default function TopBarUser() {
  const { user } = useContext(appContext);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/');
    navigate(0);
  }

  return (
    <>
      <Box padding={'9px'}>{user ? user.name : 'undefined'}</Box>
      <Button
        colorScheme="purple"
        variant="solid"
        onClick={() => handleLogout()}
      >
        Wyloguj
      </Button>
    </>
  );
}
