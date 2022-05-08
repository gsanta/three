import 'react-reflex/styles.css';
import 'antd/dist/antd.css';
import '../src/app.scss';
import '../src/pages/editor/Canvas.scss';
import '../src/ui/components/Palette.scss';
import '../src/ui/components/Toolbar.scss';
import '../src/ui/components/menubar/Menubar.scss';
// import '../src/components/canvas.scss';
if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  require('../msw_mock_api/mocks');
}

export default MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
