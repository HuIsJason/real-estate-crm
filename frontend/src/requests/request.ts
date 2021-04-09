import endpoints from './endpoints';
import ENV from './../config'

const API_HOST = ENV.api_host

const SERVER = API_HOST; 

export default function send(
  requestType: string,
  data: any = {},
  extra_url: string | null = null
) {
  const endpoint = endpoints.filter((e) => e.name === requestType)[0];

  if (endpoint) {
    // endpoint exists
    let path = SERVER + endpoint.endpoint;
    if (extra_url !== null) {
      path = path + extra_url;
    }

    const options: RequestInit = {
      method: endpoint.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    if (endpoint.method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    return fetch(path, options);
  } else {
    return Promise.resolve(new Response());
  }
}
