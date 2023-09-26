#include "editor.h"

namespace spright
{
namespace editor
{
    Editor::Editor(RunLoop runLoop) : m_RunLoop(runLoop)
    {
    }

    Editor::~Editor()
    {
        m_Window->getInputHandler()->unRegisterListener(m_toolHandler);

        delete m_Rendering;
        delete m_Window;
        delete m_DocumentFactory;
        delete m_Services;
    }

    void Editor::init()
    {
        m_EventEmitter = std::make_unique<EmscriptenEventEmitter>();

        m_Window = new GLWindow("Editor", 1200, 800);
        m_DocumentFactory = new DocumentFactory(m_Window, new GLRendererProvider());

        m_DocumentStore = std::make_shared<DocumentStore>();

        m_DocumentStore->addDocument(m_DocumentFactory->createDocument());

        std::vector<Drawing> &drawings = m_DocumentStore->getActiveDocument().getDrawings();

        m_Rendering = new Rendering(m_Window, getDocumentStore());

        m_Services = new spright::Services();

        m_ImageExport = new ImageExport(m_Window, m_Rendering);

        m_JsonExport = std::make_unique<JsonIO>(m_DocumentFactory);

        m_toolHandler = new ToolHandler(m_Window, getDocumentStore());
        m_toolHandler->getToolStore().addTool(new BrushTool());
        m_toolHandler->getToolStore().addTool(new RectangleTool());
        m_toolHandler->getToolStore().addTool(new EraserTool(3));
        m_toolHandler->getToolStore().addTool(new PanTool(getDocumentStore()));
        m_toolHandler->getToolStore().addTool(new ZoomTool(getDocumentStore()));
        m_toolHandler->getToolStore().addTool(new PaintBucketTool());
        m_toolHandler->getToolStore().addTool(new SelectTool(m_DocumentStore));
        m_toolHandler->getToolStore().addTool(new ColorPickerTool(m_EventEmitter.get()));
        m_toolHandler->getToolStore().addTool(new LineTool());
        m_toolHandler->getToolStore().addTool(new CircleTool());
        m_toolHandler->getToolStore().addTool(new ShearTool());
        m_toolHandler->addActiveTool("zoom");
        m_toolHandler->setSelectedTool("brush");

        m_RunLoop.add(m_FramePlayer);
    }

    Document &Editor::getActiveDocument()
    {
        return m_DocumentStore->getActiveDocument();
    }

    void Editor::setDocument(const Document &document)
    {
        m_DocumentStore->setDocument(document);
        m_DocumentStore->setActiveDocument(0);
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

    FramePlayer &Editor::getFramePlayer()
    {
        return m_FramePlayer;
    }
} // namespace editor
} // namespace spright
