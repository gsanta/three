#include "tool.h"

namespace spright
{
namespace editor
{

    Tool::Tool(const string name, std::shared_ptr<Cursor> cursor) : m_Cursor(cursor)
    {
        m_Name = name;
    }

    void Tool::execPointerDown(const ToolContext &toolContext)
    {
        pointerDown(toolContext);
    }

    void Tool::execPointerMove(const ToolContext &context)
    {
        if (context.pointer.isDown && m_Cursor->shouldDisableOnDrag())
        {
            m_Cursor->setDisabled(true, context.doc.activeDrawing->getForegroundLayer());
        }

        if (context.doc.isLeavingDrawing() && context.doc.prevDrawing != nullptr && !m_Cursor->isDisabled())
        {
            m_Cursor->destroy(context.doc.prevDrawing->getForegroundLayer());
        }

        if (context.doc.activeDrawing != nullptr && !m_Cursor->isDisabled())
        {
            m_Cursor->update(context.doc.activeDrawing->getForegroundLayer(), context.pointer);
        }
        pointerMove(context);
    }

    void Tool::execPointerUp(const ToolContext &toolContext)
    {
        pointerUp(toolContext);
        m_Cursor->setDisabled(false, toolContext.doc.activeDrawing->getForegroundLayer());
    }

    void Tool::execDeactivate(const ToolContext &context)
    {
        if (context.doc.hasActiveDrawing())
        {
            m_Cursor->destroy(context.doc.activeDrawing->getForegroundLayer());
        }
        deactivate(context);
    }

    std::shared_ptr<Cursor> Tool::getCursor() const
    {
        return m_Cursor;
    }

} // namespace editor
} // namespace spright
