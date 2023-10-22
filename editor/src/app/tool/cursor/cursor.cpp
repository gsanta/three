#include "cursor.h"

namespace spright
{
namespace editor
{
    Cursor::Cursor(bool shouldDisableOnDrag) : m_DisableOnDrag(shouldDisableOnDrag)
    {
    }

    void Cursor::update(ToolContext &toolContext)
    {
    }

    void Cursor::destroy(ToolContext &toolContext)
    {
    }

    void Cursor::setDisabled(ToolContext &context)
    {
        if (m_IsEnabled)
        {
            m_IsEnabled = false;
            destroy(context);
        }
    }

    void Cursor::setEnabled(ToolContext &toolContext) {
        m_IsEnabled = true;
    }

    bool Cursor::isEnabled() const
    {
        return m_IsEnabled;
    }

    bool Cursor::shouldDisableOnDrag() const
    {
        return m_DisableOnDrag;
    }
} // namespace editor
} // namespace spright
