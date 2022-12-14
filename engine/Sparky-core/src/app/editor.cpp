#include "editor.h"

namespace spright_app {
	Editor::Editor()
	{
		m_Window = new spright_engine::system::Window("Editor", 800, 600);
		m_DocumentHandler = new DocumentHandler();
		m_DocumentHandler->createDocument();

		m_Services = new spright_app::Services();
		m_Services->setEmService(new EmService(m_Services->getEventHandler()));

		ToolHandler tmpToolHandler(m_Window, m_DocumentHandler, editorConfig);
		tmpToolHandler.addTool(new BrushTool(m_DocumentHandler, editorConfig, m_Services, m_Services->getEventHandler()));
		tmpToolHandler.addTool(new RectangleTool(m_DocumentHandler, m_Services, m_Services->getEventHandler()));
		tmpToolHandler.addTool(new EraseTool(m_DocumentHandler, m_Services->getEventHandler()));
		tmpToolHandler.addTool(new PanTool(m_DocumentHandler->getActiveDocument()->getCamera()));
		tmpToolHandler.addTool(new ZoomTool(m_DocumentHandler->getActiveDocument()->getCamera()));
		tmpToolHandler.addTool(new PaintBucketTool(m_DocumentHandler, m_Services));
		tmpToolHandler.addTool(new SelectTool(m_DocumentHandler, m_Services->getEventHandler()));
		tmpToolHandler.addActiveTool("zoom");
		tmpToolHandler.addActiveTool("pan");
		tmpToolHandler.setSelectedTool("brush");

		m_toolHandler = tmpToolHandler;
		m_Window->getInputHandler()->unRegisterListener(&tmpToolHandler);

		m_Window->getFrameHandler()->registerListener(this);
	}

	Editor::~Editor()
	{
		m_Window->getFrameHandler()->unRegisterListener(this);
		delete m_Window;
		delete m_DocumentHandler;
		delete m_Services;
	}

	void Editor::onUpdate(float deltaTime)
	{
		if (m_DocumentHandler->hasActiveDocument()) {
			m_DocumentHandler->getActiveDocument()->render();
		}
	}
}