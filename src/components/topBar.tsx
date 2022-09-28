import { Flex, Spacer, Stack, Button } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { BsMusicNote } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex padding={'0.5em'}>
      <Stack direction="row" spacing={4}>
        {location.pathname !== '/' && (
          <Button
            leftIcon={<MdOutlineKeyboardArrowLeft />}
            colorScheme="purple"
            variant="ghost"
            size={'md'}
            onClick={() => navigate('/')}
          >
            Powrót
          </Button>
        )}
      </Stack>
      <Spacer />
      <Stack direction="row" spacing={4}>
        {location.pathname === '/' && (
          <>
            <Button
              leftIcon={<BsMusicNote />}
              colorScheme="purple"
              variant="ghost"
              size={'md'}
              onClick={() => navigate('/new')}
            >
              Nowa
            </Button>
          </>
        )}
      </Stack>
    </Flex>
  );
}
