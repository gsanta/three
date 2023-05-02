#include "drawing_state.h"

namespace spright
{
namespace editor
{
    Bounds DrawingState::getBounds()
    {
        return m_Bounds;
    }

    void DrawingState::setBounds(Bounds bounds)
    {
        m_Bounds = bounds;
    }

    void DrawingState::clearBounds()
    {
        m_Bounds = Bounds();
    }
} // namespace editor
} // namespace spright
