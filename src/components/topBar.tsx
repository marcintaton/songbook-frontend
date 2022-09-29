import { Flex, Spacer, Stack, Button, Tag } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { BsMusicNote, BsPrinter } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { appContext } from './context';

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(appContext);
  const cartCookie = context.cookies?.printCart;

  const [songsInCart, setSongsInCart] = useState<number>();

  useEffect(() => {
    if (!cartCookie?.value) setSongsInCart(0);
    else setSongsInCart(cartCookie.value.length);
  }, [cartCookie]);

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
        {!location.pathname.includes('/print') &&
          !location.pathname.includes('/new') && (
            <Button
              leftIcon={<BsPrinter />}
              rightIcon={
                songsInCart !== 0 ? (
                  <Tag variant="solid" colorScheme="purple">
                    {songsInCart}
                  </Tag>
                ) : (
                  <></>
                )
              }
              colorScheme="purple"
              variant="ghost"
              size={'md'}
              onClick={() => navigate('/print')}
            >
              Drukuj
            </Button>
          )}
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
