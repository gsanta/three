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
    }

    void Editor::init()
    {
        m_EventEmitter = std::make_unique<EmscriptenEventEmitter>();

        m_Window = new GLWindow("Editor", 1200, 800);
        m_DocumentFactory = std::make_shared<DocumentFactory>(m_Window, new GLRendererProvider());

        m_DocumentStore = std::make_shared<DocumentStore>();

        m_DocumentStore->setDocument(m_DocumentFactory->createDocument());

        m_SpriteSheet = std::make_unique<SpriteSheet>(m_DocumentFactory, &m_DocumentStore->getActiveDocument());

        m_Rendering = new Rendering(m_Window, getDocumentStore());

        m_ImageExport = new ImageExport(m_Window, m_Rendering);

        m_JsonExport = std::make_unique<JsonIO>(m_DocumentFactory);

        m_toolHandler = new ToolHandler(getDocumentStore());

        m_Window->getInputHandler()->registerListener(m_toolHandler);

        m_toolHandler->getToolStore().addTool(new BrushTool());
        m_toolHandler->getToolStore().addTool(new RectangleTool());
        m_toolHandler->getToolStore().addTool(new EraserTool(3));
        m_toolHandler->getToolStore().addTool(new PanTool(getDocumentStore()));
        m_toolHandler->getToolStore().addTool(new ZoomTool(getDocumentStore()));
        m_toolHandler->getToolStore().addTool(new PaintBucketTool());
        m_toolHandler->getToolStore().addTool(new SelectTool());
        m_toolHandler->getToolStore().addTool(new ColorPickerTool(m_EventEmitter.get()));
        m_toolHandler->getToolStore().addTool(new LineTool());
        m_toolHandler->getToolStore().addTool(new CircleTool());
        m_toolHandler->getToolStore().addTool(new ShearTool());
        m_toolHandler->getToolStore().addTool(new RotateTool());
        m_toolHandler->getToolStore().addTool(new MoveTool());
        m_toolHandler->getToolStore().addTool(new CanvasSelectionTool());
        m_toolHandler->addActiveTool("zoom");
        m_toolHandler->setSelectedTool("brush");

        m_RunLoop.add(m_FramePlayer);
    }

    Document &Editor::getActiveDocument()
    {
        return m_DocumentStore->getActiveDocument();
    }

    Window *Editor::getWindow() const
    {
        return m_Window;
    }

    std::shared_ptr<DocumentFactory> Editor::getDocumentFactory()
    {
        return m_DocumentFactory;
    }

    DocumentStore *Editor::getDocumentStore()
    {
        return m_DocumentStore.get();
    }

    SpriteSheet &Editor::getSpriteSheet()
    {
        return *m_SpriteSheet;
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
