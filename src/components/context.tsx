import React, { createContext, PropsWithChildren } from 'react';
import { useCookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

interface IContext {
  cartCookie?: {
    [x: string]: any;
  };
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

  return (
    <appContext.Provider value={{ cartCookie, setCartCookie }}>
      {props.children}
    </appContext.Provider>
  );
}
