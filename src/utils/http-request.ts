export const doRequest = async (url: string, method: string = 'GET', payload?: any): Promise<any> => {
  const headers: HeadersInit = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP fetch failed with code ${response.status}. ${response.statusText}`);
  }

  return response.json();
};
