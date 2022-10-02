import { AxiosResponse } from 'axios';

type Getter<T> = (...args: any[]) => Promise<AxiosResponse<T>>;

export default function apiFetchDelegate<T>(
  getter: Getter<T>,
  callback: (payload: T) => void,
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
        callback(data);
      }
    })
    .catch((e: Error) => {
      console.log(e.message);
      callback(errorValue);
    });
}
