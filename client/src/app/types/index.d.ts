/* eslint-disable no-var */

import EditorEvents from '@/features/editor/EditorEvents';
import EditorListener from '@/services/editor/EditorListener';

declare global {
  function renderApp(): void;

  var Module: Editor | undefined;

  var EditorEvents: EditorEvents;
  var EditorListener: EditorListener;
}

export {};
