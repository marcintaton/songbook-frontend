import { Flex, Spacer, Stack, Button } from '@chakra-ui/react';
import { BsMusicNote, BsPrinter } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex padding={'1em'}>
      <Spacer />
      <Stack direction="row" spacing={4}>
        {location.pathname === '/' && (
          <>
            <Button
              leftIcon={<BsMusicNote />}
              colorScheme="purple"
              variant="outline"
              onClick={() => navigate('/new')}
            >
              Nowa
            </Button>

            {/* <Button
              leftIcon={<BsPrinter />}
              colorScheme="purple"
              variant="outline"
            >
              Druk
            </Button> */}
          </>
        )}
      </Stack>
    </Flex>
  );
}
