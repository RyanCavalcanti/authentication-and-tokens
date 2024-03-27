import { tokenService } from "../../services/auth/tokenService";

export async function httpClient(fetchURL, fetchOptions) {
  const options = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };

  return fetch(fetchURL, options)
  .then(async (response) => {
    return{
      ok: response.ok,
      body: await response.json(),
    }
  })
  .then(async (response) => {
    if(!fetchOptions.refresh) return response;
    if(response.status !== 401) return response;

    console.log('jsndjandiewnkandjaenkxnasj');
    const refreshResponse = await httpClient('http://localhost:3000/api/refresh', {
      method: 'GET'
    });
    const newAccessToken = refreshResponse.body.data.access_token;
    const newRefreshToken = refreshResponse.body.data.refresh_token;

    tokenService.save(newAccessToken);

    const retryResponse = await httpClient(fetchURL, {
      ...options,
      refresh: false,
      headers: {
        'Authorization': `Bearer ${newAccessToken}`
      }
    })
    
    return retryResponse;
  })
}
