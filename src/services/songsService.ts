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

export function addNewSong(payload: unknown) {
  return apiService.post(`${config.api}/songs`, payload);
}

export function updateSong(id: string, payload: unknown) {
  return apiService.put(`${config.api}/songs/${id}`, payload);
}
