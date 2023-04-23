#include "new_drawing_tool.h"

namespace spright
{
namespace editor
{
    NewDrawingTool::NewDrawingTool(DocumentStore *documentStore, DocumentFactory *documentFactory)
        : m_DocumentStore(documentStore), m_DocumentFactory(documentFactory), Tool("new_drawing")
    {
        m_SelectionBox.reset(&m_DocumentStore->getActiveDocument().getCanvas().getForegroundLayer());
    }

    void NewDrawingTool::pointerDown(const ToolContext &context)
    {

        m_SelectionBox.setSelectionStart(context.pointer.curr);
    }

    void NewDrawingTool::pointerUp(const ToolContext &context)
    {
        Drawing drawing = m_DocumentFactory->createDrawing(m_SelectionBox.getBounds());
        m_DocumentStore->getActiveDocument().addDrawing(drawing);
        m_SelectionBox.clear();
    }

    void NewDrawingTool::pointerMove(const ToolContext &context)
    {
        if (context.pointer.isDown)
        {
            m_SelectionBox.setSelectionEnd(context.pointer.curr);
        }
    }
} // namespace editor
} // namespace spright
