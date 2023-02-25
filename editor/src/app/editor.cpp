#include "editor.h"

namespace spright { namespace editor {
	Editor::Editor()
	{
		m_Window = new GLWindow("Editor", 800, 800);
		m_DocumentHandler = new DocumentHandler(m_Window);

		m_EventEmitter = std::make_unique<EmscriptenEventEmitter>();

		m_DocumentStore = std::make_unique<DocumentStore>();
		m_DocumentStore->setActiveDocument(m_DocumentHandler->createDocument());
		m_DocumentHandler->createUserLayer(m_DocumentStore->getActiveDocument(), "layer1", USER_LAYER_ID_PREFIX + "1");
		m_DocumentHandler->createUserLayer(m_DocumentStore->getActiveDocument(), "layer2", USER_LAYER_ID_PREFIX + "2");

		m_Rendering = new Rendering(m_Window, getDocumentStore());

		m_Services = new spright::Services();

		m_ImageExport = new ImageExport(m_Window, m_Rendering);

		m_JsonExport = std::make_unique<JsonIO>(getDocumentStore(), m_DocumentHandler);

		m_toolHandler = new ToolHandler(m_Window, getDocumentStore(), m_Services, m_DocumentStore->getActiveDocument()->getCamera());
		m_toolHandler->addTool(new BrushTool(getDocumentStore()));
		m_toolHandler->addTool(new RectangleTool(getDocumentStore(), m_Services));
		m_toolHandler->addTool(new EraserTool(new LayerProviderImpl(getDocumentStore()), 3));
		m_toolHandler->addTool(new PanTool(getDocumentStore()->getActiveDocument()->getCamera()));
		m_toolHandler->addTool(new ZoomTool(getDocumentStore()->getActiveDocument()->getCamera()));
		m_toolHandler->addTool(new PaintBucketTool(getDocumentStore(), m_Services));
		m_toolHandler->addTool(new SelectTool(getDocumentStore()));
		m_toolHandler->addTool(new ColorPickerTool(new LayerProviderImpl(getDocumentStore()), m_toolHandler, m_EventEmitter.get()));
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

	DocumentStore* Editor::getDocumentStore()
	{
		return m_DocumentStore.get();
	}

	Rendering* Editor::getRendering()
	{
		return m_Rendering;
	}

	ImageExport* Editor::getImageExport() {
		return m_ImageExport;
	}

	JsonIO* Editor::getJsonIO() {
		return m_JsonExport.get();
	}
}}