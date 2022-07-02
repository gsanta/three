import getCookie from '../ui/components/menubar/getCookie';

const CsrfTokenCookieName = 'X-CSRF-Token';
const getCsrfTokenCookie = (): string => getCookie<string>(CsrfTokenCookieName) || '';

export default getCsrfTokenCookie;
