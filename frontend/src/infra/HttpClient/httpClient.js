import { tokenService } from "../../services/auth/tokenService";
import { nookies } from 'nookies';

export async function httpClient(fetchURL, fetchOptions = {}) {
  const defaultHeaders = fetchOptions.headers || {}
  const options = { 
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...defaultHeaders ,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };

  return fetch(fetchURL, options)
    .then(async (response) => {
      return {
        ok: response.ok,
        body: await response.json(),
      }
    })
    .then(async (response) => {
      if (!fetchOptions.refresh) return response;
      if (response.status !== 401) return response;

      const isServer = Boolean(fetchOptions?.ctx);
      const currentRefreshToken = fetchOptions?.ctx?.req?.cookies;

      try {
        const refreshResponse = await httpClient('http://localhost:3000/api/refresh', {
          method: isServer ? 'PUT' : 'GET',
          body: isServer ? { refresh_token: currentRefreshToken } : undefined
        });

        const newAccessToken = refreshResponse.body.data.access_token;
        const newRefreshToken = refreshResponse.body.data.refresh_token;

        if (isServer) {
          nookies.set(fetchOptions.ctx, REFRESH_TOKEN_NAME, newRefreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
          });
        }
        tokenService.save(newAccessToken);

        const retryResponse = await httpClient(fetchURL, {
          ...options,
          refresh: false,
          headers: {
            'Authorization': `Bearer ${newAccessToken}`
          }
        })
        return retryResponse;
      } catch (err) {
        return response
      }

    })
}
