import AppProvider from '@/components/AppProvider';
import { renderPageComponent } from '@/components/ReactPage';
import EditorEvents from '@/features/editor/EditorEvents';

window.EditorEvents = new EditorEvents();

const rerender = renderPageComponent(AppProvider);

window.renderApp = rerender;
