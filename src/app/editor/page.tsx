import './app.scss';
import '../globals.css';
import EditorPage from './EditorPage';
import { fetchEditorData } from '@/client/editor/setupEditorData';

const Page = async () => {
  const data = await fetchEditorData();

  return <EditorPage {...data} />;
};

export default Page;
