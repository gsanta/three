import getCookie from './getCookie';

const CsrfTokenCookieName = 'CSRF-TOKEN';
const getCsrfTokenCookie = (): string => getCookie<string>(CsrfTokenCookieName) || '';

export default getCsrfTokenCookie;
