import { Flex, Spacer, Stack, Button, Icon } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
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
            colorScheme="purple"
            variant="ghost"
            size={'sm'}
            onClick={() => navigate('/')}
          >
            <Icon as={BiArrowBack} />
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
