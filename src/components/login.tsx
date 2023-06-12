import { Button, Center } from '@chakra-ui/react';
import { BsGoogle } from 'react-icons/bs';
import config from '@src/utilities/config';

export default function Login() {
  return (
    <>
      <Center marginTop={'5em'}>
        <a href={`${config.api}/auth/google`}>
          <Button
            leftIcon={<BsGoogle />}
            colorScheme="purple"
            variant="solid"
            size={'md'}
          >
            Zaloguj kontem Google
          </Button>
        </a>
      </Center>
    </>
  );
}
