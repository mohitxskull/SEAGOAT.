export const FetchPost = async (
  PATH: string,
  OBJECT: object
): Promise<Response> => fetch(PATH, {
    method: 'POST',
    body: JSON.stringify(OBJECT),
    headers: {
      'Content-Type': 'application/json',
    },
  });
