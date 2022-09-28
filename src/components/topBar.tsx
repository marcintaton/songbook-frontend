import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Stack, Button } from '@chakra-ui/react';
import { BsBack, BsMusicNote } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex padding={'0.5em'}>
      <Button
        colorScheme="purple"
        variant="ghost"
        size={'sm'}
        onClick={() => navigate('/')}
      >
        <ArrowBackIcon />
      </Button>
      <Spacer />
      <Stack direction="row" spacing={4}>
        {location.pathname === '/' && (
          <>
            <Button
              leftIcon={<BsMusicNote />}
              colorScheme="purple"
              variant="ghost"
              size={'sm'}
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
