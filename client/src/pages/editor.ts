import { renderPageComponent } from '@/components/ReactPage';
import AppProvider from '@/features/app/AppProvider';
import EditorEvents from '@/features/editor/EditorEvents';

window.EditorEvents = new EditorEvents();

const rerender = renderPageComponent(AppProvider);

window.renderApp = rerender;
