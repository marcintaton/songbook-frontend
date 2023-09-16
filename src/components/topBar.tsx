import { Flex, Spacer, Stack, Button, Tag } from '@chakra-ui/react';
import { BsMusicNote, BsPlusLg, BsPrinter } from 'react-icons/bs';
import { AiOutlineEdit, AiOutlineLogin } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { appContext } from './context';
import TopBarUser from './topBarUser';

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(appContext);

  return (
    <Flex padding={'0.5em'}>
      <Stack direction="row" spacing={4}>
        {location.pathname !== '/' && (
          <Button
            leftIcon={<BsMusicNote />}
            colorScheme="purple"
            variant="ghost"
            size={'md'}
            onClick={() => navigate('/')}
          >
            Śpiewnik
          </Button>
        )}
      </Stack>
      <Spacer />
      <Stack direction="row" spacing={4}>
        {location.pathname === '/' && (
          <>
            <Button
              leftIcon={<BsPlusLg />}
              colorScheme="purple"
              variant="ghost"
              size={'md'}
              onClick={() => navigate('/new')}
            >
              Nowa
            </Button>
          </>
        )}
        {location.pathname.includes('/song') &&
          !location.pathname.includes('/edit') && (
            <>
              <Button
                leftIcon={<AiOutlineEdit />}
                colorScheme="purple"
                variant="ghost"
                size={'md'}
                onClick={() => {
                  navigate(`/song/${location.pathname.split('/').at(-1)}/edit`);
                }}
              >
                Edytuj
              </Button>
            </>
          )}
      </Stack>
      {/* <Stack direction="row" spacing={4}>
        {!user && !location.pathname.includes('/login') && (
          <>
            <Button
              leftIcon={<AiOutlineLogin />}
              colorScheme="purple"
              variant="solid"
              size={'md'}
              onClick={() => {
                navigate(`/login`);
              }}
            >
              Login
            </Button>
          </>
        )}
        {user && (
          <>
            <TopBarUser></TopBarUser>
          </>
        )}
      </Stack> */}
    </Flex>
  );
}
