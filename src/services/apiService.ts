import axios from 'axios';

axios.interceptors.response.use(
  (response: any) => {
    // response correct
    return response;
  },
  (error: any) => {
    if (error.response) {
      // unauthorized
      return error.response;
    }
    // server error
    return undefined;
  }
);

axios.defaults.withCredentials = true;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
