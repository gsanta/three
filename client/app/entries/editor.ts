import { renderPageComponent } from '@/common/components/ReactPage';
import AppProvider from '@/app/AppProvider';
import EditorEvents from '@/features/editor/EditorEvents';

window.EditorEvents = new EditorEvents();

const rerender = renderPageComponent(AppProvider);

window.renderApp = rerender;
