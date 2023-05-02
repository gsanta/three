#include "editor.h"

namespace spright
{
namespace editor
{
    Editor::Editor(RunLoop runLoop) : m_RunLoop(runLoop)
    {
        m_EventEmitter = std::make_unique<EmscriptenEventEmitter>();

        m_Window = new GLWindow("Editor", 800, 800);
        m_DocumentFactory = new DocumentFactory(m_Window, new GLRendererProvider(), m_EventEmitter.get());

        m_DocumentStore = std::make_unique<DocumentStore>();

        m_DocumentStore->addDocument(m_DocumentFactory->createDocument());

        std::vector<Drawing> &drawings = m_DocumentStore->getActiveDocument().getDrawings();

        m_Rendering = new Rendering(m_Window, getDocumentStore());

        m_Services = new spright::Services();

        m_ImageExport = new ImageExport(m_Window, m_Rendering);

        m_JsonExport = std::make_unique<JsonIO>(getDocumentStore(), m_DocumentFactory);

        m_FramePlayerHandler.setDocumentStore(getDocumentStore());

        m_toolHandler = new ToolHandler(m_Window, getDocumentStore(), m_Services, m_ImageExport, m_DocumentFactory);
        m_toolHandler->addTool(new BrushTool(getDocumentStore()));
        m_toolHandler->addTool(new RectangleTool(m_Services));
        m_toolHandler->addTool(new EraserTool(3));
        m_toolHandler->addTool(new PanTool(getDocumentStore()));
        m_toolHandler->addTool(new ZoomTool(getDocumentStore()));
        m_toolHandler->addTool(new PaintBucketTool(m_Services));
        m_toolHandler->addTool(new SelectTool());
        m_toolHandler->addTool(new ColorPickerTool(m_toolHandler, m_EventEmitter.get()));
        m_toolHandler->addTool(new NewDrawingTool(getDocumentStore(), m_DocumentFactory));
        m_toolHandler->addActiveTool("zoom");
        m_toolHandler->addActiveTool("pan");
        m_toolHandler->setSelectedTool("brush");

        m_RunLoop.add(m_FramePlayerHandler);
    }

    Editor::~Editor()
    {
        m_Window->getInputHandler()->unRegisterListener(m_toolHandler);

        delete m_Rendering;
        delete m_Window;
        delete m_DocumentFactory;
        delete m_Services;
    }

    Document &Editor::getActiveDocument()
    {
        return m_DocumentStore->getActiveDocument();
    }

    ActiveFrame &Editor::getActiveFrame()
    {
        return m_DocumentStore->getActiveDocument().getActiveFrame();
    }

    TileLayer &Editor::getActiveLayer()
    {
        return getActiveFrame().getActiveLayer();
    }

    Window *Editor::getWindow() const
    {
        return m_Window;
    }

    DocumentFactory *Editor::getDocumentFactory()
    {
        return m_DocumentFactory;
    }

    DocumentStore *Editor::getDocumentStore()
    {
        return m_DocumentStore.get();
    }

    ToolHandler *Editor::getToolHandler()
    {
        return m_toolHandler;
    }

    Rendering *Editor::getRendering()
    {
        return m_Rendering;
    }

    ImageExport *Editor::getImageExport()
    {
        return m_ImageExport;
    }

    JsonIO *Editor::getJsonIO()
    {
        return m_JsonExport.get();
    }

    RunLoop &Editor::getRunLoop()
    {
        return m_RunLoop;
    }
} // namespace editor
} // namespace spright
