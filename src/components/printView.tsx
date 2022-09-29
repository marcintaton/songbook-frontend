import { useContext } from 'react';
import { Text } from '@chakra-ui/react';
import { appContext } from './context';

export default function PrintView() {
  const { cartCookie } = useContext(appContext);

  return (
    <>
      <div>
        {cartCookie &&
          cartCookie.map((song) => <Text key={song.id}>{song.id}</Text>)}
      </div>
    </>
  );
}
