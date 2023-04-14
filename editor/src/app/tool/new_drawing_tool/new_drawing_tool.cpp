#include "new_drawing_tool.h"

namespace spright
{
namespace editor
{
    NewDrawingTool::NewDrawingTool(DocumentStore *documentStore, DocumentFactory *documentFactory)
        : m_DocumentStore(documentStore), m_DocumentFactory(documentFactory), Tool("new_drawing")
    {
    }

    void NewDrawingTool::pointerDown(ToolContext &context)
    {
        m_SelectionBox.setTileLayer(m_DocumentStore->getActiveDocument().getCanvas().getForegroundLayer());
        m_SelectionBox.start(context.pointer.curr);
    }

    void NewDrawingTool::pointerUp(ToolContext &context)
    {
        Drawing drawing = m_DocumentFactory->createDrawing(m_SelectionBox.getBounds());
        m_DocumentStore->getActiveDocument().addDrawing(drawing);
        m_SelectionBox.clear();
    }

    void NewDrawingTool::pointerMove(ToolContext &context)
    {
        if (context.pointer.isDown)
        {
            m_SelectionBox.setPosition(context.pointer.curr);
        }
    }
} // namespace editor
} // namespace spright
