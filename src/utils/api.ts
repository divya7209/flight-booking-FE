// import { apiUrl } from "../constants/api";

interface ICustomFetchParams {
  path: string;
  data?: object;
  method?: string;
}

// const apiUrl = import.meta.env.VITE_API_URL;
export const apiUrl = 'http://localhost:8080/api/v1'

export const customFetch = async <T>({
  path,
  method = "GET",
  data,
}: ICustomFetchParams): Promise<T> => {
  const result = await fetch(`${apiUrl}/${path}`, {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((result) => result)
    .catch((e) => {
      throw new Error(e?.message);
    });

  return result;
};
