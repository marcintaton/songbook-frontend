import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import IUser from '@src/types/interfaces/iUser';
import { getMe } from '@src/services/authService';

interface IContext {
  user?: IUser;
}

export const appContext = createContext<IContext>({});

export default function Context(
  props: PropsWithChildren<IContext>
): JSX.Element {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const cb = async () => {
      try {
        const { data } = await getMe();
        console.log(data);

        return data;
      } catch (e: any) {
        console.log(e.message);
        return undefined;
      }
    };

    cb().then((_user) => {
      if (_user) setUser(_user);
    });
  }, []);

  return (
    <appContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
}
