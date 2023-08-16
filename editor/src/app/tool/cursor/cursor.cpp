#include "cursor.h"

namespace spright
{
namespace editor
{
    Cursor::Cursor(bool shouldDisableOnDrag) : m_DisableOnDrag(shouldDisableOnDrag)
    {
    }

    void Cursor::update(TileLayer &foregroundLayer, const PointerInfo &pointerInfo)
    {
    }

    void Cursor::destroy(TileLayer &foregroundLayer)
    {
    }

    void Cursor::setDisabled(bool isDisabled, TileLayer &foregroundLayer)
    {
        if (m_IsDisabled != isDisabled)
        {
            m_IsDisabled = isDisabled;
            if (m_IsDisabled)
            {
                destroy(foregroundLayer);
            }
        }
    }

    bool Cursor::isDisabled() const
    {
        return m_IsDisabled;
    }

    bool Cursor::shouldDisableOnDrag() const
    {
        return m_DisableOnDrag;
    }
} // namespace editor
} // namespace spright
