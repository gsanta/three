import Cookies from 'js-cookie';

type CookieValueDeserializer<T> = (value: string, name: string) => T;

const getCookie = <T = string>(name: string, deserializer?: CookieValueDeserializer<T>): T | null => {
  const value = Cookies.get(name);

  if (value === undefined || value === null) {
    return null;
  }

  return deserializer ? deserializer(value, name) : (value as unknown as T);
};

export default getCookie;
