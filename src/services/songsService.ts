import config from '@src/utilities/config';
import apiService from './apiService';

export function getSongs() {
  return apiService.get(`${config.api}/songs`);
}

export function getSongsMetadata() {
  return apiService.get(`${config.api}/songs/metadata/all`);
}

export function getSong(id: string) {
  return apiService.get(`${config.api}/songs/${id}`);
}
