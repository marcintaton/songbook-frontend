import config from '@src/utilities/config';
import apiService from './apiService';

// eslint-disable-next-line import/prefer-default-export
export function getTags() {
  return apiService.get(`${config.api}/tags`);
}
