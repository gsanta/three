import React from 'react';
import Editor from '../Editor';

const EditorContext = React.createContext<Editor | undefined>(undefined);

export default EditorContext;
