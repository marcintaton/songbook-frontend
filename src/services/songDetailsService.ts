import config from '@src/utilities/config';
import apiService from './apiService';

export function getAllSongsDetails() {
  return apiService.get(`${config.api}/songs`);
}

export function getSongDetails(id: string) {
  return apiService.get(`${config.api}/songs/${id}`);
}
