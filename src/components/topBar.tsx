import { Flex, Spacer, Stack, Button } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { BsMusicNote } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
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
        {location.pathname.includes('/song') && (
          <>
            <Button
              leftIcon={<AiOutlineEdit />}
              colorScheme="purple"
              variant="ghost"
              size={'md'}
              disabled
              onClick={
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                () => {}
                // navigate(`/edit/${location.pathname.split('/').at(-1)}`)
              }
            >
              Edytuj
            </Button>
          </>
        )}
      </Stack>
    </Flex>
  );
}
