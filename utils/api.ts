import axios from 'axios';
import { makeRedirectUri } from 'expo-auth-session';

axios.defaults.baseURL = 'https://api.intra.42.fr/';

export async function get(url: string, params?: any): Promise<any> {
  return axios.get(url, { params });
}

export function post(url: string, data: any): Promise<any> {
  return axios.post(url, data);
}

export async function getToken(code: string, state: string): Promise<any | null> {
  let res;

  try {
    res = await axios.post('oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.EXPO_PUBLIC_API_UID,
      client_secret: process.env.EXPO_PUBLIC_SECRET,
      code: code,
      state: state,
      redirect_uri: makeRedirectUri({
        native: 'com.swiftycompanion://oauth'
      })
    });
  } catch (e) {
    console.error('Error while getting token:', e);
    return null;
  }
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;
  return res.data.access_token;
}
