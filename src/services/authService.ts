import config from '@src/utilities/config';
import apiService from './apiService';

export function loginGoogle() {
  return apiService.get(`${config.api}/auth/google`);
}

export function getMe() {
  return apiService.get(`${config.api}/auth/me`);
}
