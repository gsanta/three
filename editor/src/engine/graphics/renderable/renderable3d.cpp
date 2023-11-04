#include "renderable3d.h"

namespace spright
{
namespace engine
{
    Renderable3d::Renderable3d(const Vec3 &pos, unsigned int color) : m_Color(color)
    {
        m_Position = pos;
    }

    const Vec3 &Renderable3d::getPosition() const
    {
        return m_Position;
    }
} // namespace engine
} // namespace spright
