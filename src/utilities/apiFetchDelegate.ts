import { AxiosResponse } from 'axios';

type Setter<T> = (value: React.SetStateAction<T>) => void;
type Getter<T> = (...args: any[]) => Promise<AxiosResponse<T>>;

export default function apiFetchDelegate<T>(
  getter: Getter<T>,
  setters: Setter<T>[],
  errorValue: T,
  getterArgs: any[] = []
) {
  const getData = async () => {
    const response = await getter(...getterArgs);
    return response.data;
  };

  getData()
    .then((data) => {
      if (data) {
        setters.forEach((setter) => {
          setter(data);
        });
      }
    })
    .catch((e: Error) => {
      console.log(e.message);
      setters.forEach((setter) => {
        setter(errorValue);
      });
    });
}
