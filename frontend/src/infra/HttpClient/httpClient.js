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
}
