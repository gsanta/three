#include "editor.h"

namespace my_app { namespace editor {
	editor::Editor::Editor()
	{
		this->m_Window = new Window("Editor", 800, 600);
		this->m_DocumentHandler = new DocumentHandler();
		this->m_DocumentHandler->createDocument();
		this->m_toolHandler = new ToolHandler(this->m_Window, this->m_DocumentHandler, this->editorConfig);
		
		this->m_Window->onUpdate(std::bind(&Editor::onUpdate, this));
	}

	editor::Editor::~Editor()
	{
		delete this->m_toolHandler;
		delete this->m_Window;
		delete this->m_DocumentHandler;
	}

	void Editor::onUpdate()
	{
		if (this->m_DocumentHandler->hasActiveDocument()) {
			this->m_DocumentHandler->getActiveDocument()->render();
		}
	}
}}