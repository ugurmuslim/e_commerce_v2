import * as process from 'node:process';

export const fetchN11 = async ({
  url = '',
  method = 'GET',
  auth = '',
  secretyKey = '',
  body = {},
  headers = {},
}) => {
  const options: RequestInit = {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `no auth`,
      appKey: auth,
      appsecret: secretyKey,
    },
  };
  if (Object.keys(body).length > 0) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(
      `${process.env.TEST_API_ENDPOINT}${url}`,
      options,
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const generateBasicAuth = (
  apiKey: string,
  secretKey: string,
): string => {
  return Buffer.from(`${apiKey}:${secretKey}`).toString('base64');
};
