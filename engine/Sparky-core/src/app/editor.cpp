#include "editor.h"

namespace spright {
	Editor::Editor()
	{
		m_Window = new Window("Editor", 800, 600);
		m_DocumentHandler = new DocumentHandler();
		m_DocumentHandler->createDocument();

		m_Rendering = new Rendering(m_Window, m_DocumentHandler);

		m_Services = new spright::Services();
		m_Services->setEmService(new EmService(m_Services->getEventHandler()));

		m_ImageExport = new ImageExport(m_Rendering);

		m_toolHandler = new ToolHandler(m_Window, m_DocumentHandler, editorConfig, m_Services, m_ImageExport);
		m_toolHandler->addTool(new BrushTool(m_DocumentHandler, editorConfig, m_Services, m_Services->getEventHandler()));
		m_toolHandler->addTool(new RectangleTool(m_DocumentHandler, m_Services, m_Services->getEventHandler()));
		m_toolHandler->addTool(new EraseTool(m_DocumentHandler, m_Services->getEventHandler()));
		m_toolHandler->addTool(new PanTool(m_DocumentHandler->getActiveDocument()->getCamera()));
		m_toolHandler->addTool(new ZoomTool(m_DocumentHandler->getActiveDocument()->getCamera()));
		m_toolHandler->addTool(new PaintBucketTool(m_DocumentHandler, m_Services));
		m_toolHandler->addTool(new SelectTool(m_DocumentHandler, m_Services->getEventHandler()));
		m_toolHandler->addTool(new ColorPickerTool(m_DocumentHandler, m_Services));
		m_toolHandler->addActiveTool("zoom");
		m_toolHandler->addActiveTool("pan");
		m_toolHandler->setSelectedTool("brush");
	}

	Editor::~Editor()
	{
		delete m_Rendering;
		delete m_Window;
		delete m_DocumentHandler;
		delete m_Services;
	}

	Rendering* Editor::getRendering()
	{
		return m_Rendering;
	}

	ImageExport* Editor::getImageExport() {
		return m_ImageExport;
	}
}