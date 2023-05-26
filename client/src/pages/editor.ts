import { renderPageComponent } from '@/utils/ReactPage';
import AppContainer from '@/ui/components/AppContainer';
import EditorEvents from '@/services/editor/EditorEvents';

window.EditorEvents = new EditorEvents();

const rerender = renderPageComponent(AppContainer);

window.renderApp = rerender;
