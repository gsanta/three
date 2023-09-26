#include "colorable.h"

// TODO: remove colorable, the color can be accessed via ToolContext
namespace spright
{
namespace editor
{
    unsigned int editor::Colorable::getColor() const
    {
        return m_Color;
    }

    void Colorable::setColor(unsigned int color)
    {
        m_Color = color;
    }
} // namespace editor
} // namespace spright
