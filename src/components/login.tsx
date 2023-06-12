import { Button, Center } from '@chakra-ui/react';
import { BsGoogle } from 'react-icons/bs';
import { loginGoogle } from '@src/services/authService';

export default function Login() {
  async function callLogin() {
    const result = await loginGoogle();
    console.log(result);
  }

  return (
    <>
      <Center marginTop={'5em'}>
        <Button
          leftIcon={<BsGoogle />}
          colorScheme="purple"
          variant="solid"
          size={'md'}
          onClick={() => callLogin()}
        >
          Zaloguj kontem Google
        </Button>
      </Center>
    </>
  );
}
