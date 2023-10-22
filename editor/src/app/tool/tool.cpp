#include "tool.h"

namespace spright
{
namespace editor
{

    Tool::Tool(const string name, std::shared_ptr<Cursor> cursor) : m_Cursor(cursor)
    {
        m_Name = name;
    }

    void Tool::execPointerDown(ToolContext &toolContext)
    {
        pointerDown(toolContext);
    }

    void Tool::execPointerMove(ToolContext &context)
    {
        if (context.pointer.isDown && m_Cursor->shouldDisableOnDrag())
        {
            m_Cursor->setDisabled(context);
        }

        if (context.doc.isLeavingDrawing() && context.doc.prevDrawing != nullptr && m_Cursor->isEnabled())
        {
            m_Cursor->destroy(context);
        }

        if (context.doc.activeDrawing != nullptr && m_Cursor->isEnabled())
        {
            m_Cursor->update(context);
        }

        pointerMove(context);
    }

    void Tool::execPointerUp(ToolContext &context)
    {
        pointerUp(context);
        m_Cursor->setEnabled(context);
    }

    void Tool::execDeactivate(ToolContext &context)
    {
        if (context.doc.hasActiveDrawing())
        {
            m_Cursor->destroy(context);
        }
        deactivate(context);
    }

    std::shared_ptr<Cursor> Tool::getCursor() const
    {
        return m_Cursor;
    }

    void Tool::setCursor(std::shared_ptr<Cursor> cursor)
    {
        m_Cursor = cursor;
    }

} // namespace editor
} // namespace spright
