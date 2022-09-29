import { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import { appContext } from './context';

export default function PrintView() {
  const context = useContext(appContext);
  const cartCookie = context.cookies?.printCart;

  return (
    <>
      <div>
        {cartCookie?.value &&
          cartCookie.value.map((song) => <Text key={song.id}>{song.id}</Text>)}
      </div>
    </>
  );
}
