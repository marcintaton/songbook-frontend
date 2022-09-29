import React, { createContext, PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';
import IPrintCartItem from '@src/types/interfaces/iPrintCartItem';

interface IContext {
  cartCookie?: IPrintCartItem[];
  setCartCookie?: (
    name: 'print-cart',
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
}

export const appContext = createContext<IContext>({});

export default function Context(
  props: PropsWithChildren<IContext>
): JSX.Element {
  const [cartCookie, setCartCookie] = useCookies<string>(['print-cart']);

  console.log(cartCookie);

  return (
    <appContext.Provider
      value={{ cartCookie: cartCookie['print-cart'], setCartCookie }}
    >
      {props.children}
    </appContext.Provider>
  );
}
