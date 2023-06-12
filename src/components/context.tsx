import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import IPrintCartItem from '@src/types/interfaces/iPrintCartItem';
import IUser from '@src/types/interfaces/iUser';
import { getMe } from '@src/services/authService';

interface IContext {
  user?: IUser;
  cookies?: {
    printCart: {
      value: IPrintCartItem[];
      set: (value: any) => void;
    };
  };
}

export const appContext = createContext<IContext>({});

export default function Context(
  props: PropsWithChildren<IContext>
): JSX.Element {
  const [cartCookie, setCartCookie] = useCookies<string>(['print-cart']);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const cb = async () => {
      try {
        const { data } = await getMe();
        return data.payload;
      } catch (e: any) {
        console.log(e.message);
        return undefined;
      }
    };

    cb().then((_user) => {
      if (_user && _user.id) {
        setUser(_user);
      }
    });
  }, []);

  if (!cartCookie['print-cart']) setCartCookie('print-cart', [], { path: '/' });

  return (
    <appContext.Provider
      value={{
        user,
        cookies: {
          printCart: {
            value: cartCookie['print-cart'],
            set: (value: any) => {
              setCartCookie('print-cart', value, {
                path: '/',
              });
            },
          },
        },
      }}
    >
      {props.children}
    </appContext.Provider>
  );
}
