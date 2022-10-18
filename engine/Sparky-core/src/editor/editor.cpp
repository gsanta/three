#include "editor.h"

namespace my_app { namespace editor {
	editor::Editor::Editor()
	{
		m_Window = new my_app_engine::system::Window("Editor", 800, 600);
		m_DocumentHandler = new DocumentHandler();
		m_DocumentHandler->createDocument();
		m_CanvasListenerHandler = new core::CanvasListenerHandler();
		m_Window->getInputHandler()->registerListener(m_CanvasListenerHandler);

		m_toolHandler = new ToolHandler(m_Window, m_DocumentHandler, editorConfig);
		
		m_Window->getFrameHandler()->registerListener(this);
	}

	editor::Editor::~Editor()
	{
		m_Window->getFrameHandler()->unRegisterListener(this);
		delete m_toolHandler;
		delete m_Window;
		delete m_DocumentHandler;
	}

	void Editor::onUpdate(float deltaTime)
	{
		if (m_DocumentHandler->hasActiveDocument()) {
			m_DocumentHandler->getActiveDocument()->render();
		}
	}
}}