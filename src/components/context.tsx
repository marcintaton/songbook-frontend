import React, { createContext, PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import IPrintCartItem from '@src/types/interfaces/iPrintCartItem';

interface IContext {
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

  if (!cartCookie['print-cart']) setCartCookie('print-cart', [], { path: '/' });

  return (
    <appContext.Provider
      value={{
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
