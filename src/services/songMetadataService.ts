import config from '@src/utilities/config';
import apiService from './apiService';

export function getAllSongsMetadata() {
  return apiService.get(`${config.api}/metadata`);
}

export function getSongMetadata(id: string) {
  return apiService.get(`${config.api}/metadata/${id}`);
}
