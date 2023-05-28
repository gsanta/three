import { renderPageComponent } from '@/components/ReactPage';
import AppContainer from '@/components/AppContainer';
import EditorEvents from '@/features/editor/EditorEvents';

window.EditorEvents = new EditorEvents();

const rerender = renderPageComponent(AppContainer);

window.renderApp = rerender;
