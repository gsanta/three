#include "select_tool.h"

namespace spright
{
namespace editor
{

    SelectTool::SelectTool(DocumentStore *documentStore) : m_DocumentStore(documentStore), Tool("select")
    {
    }

    void SelectTool::pointerDown(const ToolContext &context)
    {
        if (context.doc.hasActiveDrawing())
        {
            TileLayer &foregroundLayer = context.doc.activeDrawing->getForegroundLayer();
            TileLayer &activeLayer = context.doc.activeDrawing->getActiveLayer();

            if (!m_SelectionBox.getTileLayer())
            {
                m_SelectionBox.reset(&foregroundLayer);
                m_RectSelector.reset(&activeLayer);
            }

            m_IsMove = m_SelectionBox.isInsideSelection(context.pointer.curr);

            if (!m_IsMove)
            {
                m_SelectionBox.reset(&foregroundLayer);
                m_RectSelector.reset(&activeLayer);
                m_SelectionBox.setSelectionStart(context.pointer.curr);
            }
            else
            {
                m_SelectionBox.setMoveStart(context.pointer.curr);
            }
        }
    }

    void SelectTool::pointerUp(const ToolContext &context)
    {
        if (!context.doc.hasActiveDrawing())
        {
            return;
        }

        if (!m_IsMove)
        {
            Vec2 bottomLeft = m_SelectionBox.getBounds().getBottomLeft();
            Vec2 topRight = m_SelectionBox.getBounds().getTopRight();
            m_RectSelector.setSelection(bottomLeft, topRight);
        }
    }

    void SelectTool::pointerMove(const ToolContext &context)
    {
        if (!context.pointer.isLeftButtonDown())
        {
            return;
        }

        if (m_IsMove)
        {
            Vec2 delta = m_SelectionBox.setMoveEnd(context.pointer.curr);
            m_RectSelector.moveSelectionWith(delta);
        }
        else
        {
            m_SelectionBox.setSelectionEnd(context.pointer.curr);
        }
    }
} // namespace editor
} // namespace spright
