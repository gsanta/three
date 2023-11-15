#include "renderable.h"

namespace spright
{
namespace engine
{
    Renderable::Renderable(const Vec3 &pos, unsigned int color) : m_Color(color)
    {
        m_Position = pos;
    }

    const Vec3 &Renderable::getPosition() const
    {
        return m_Position;
    }

    void Renderable::setPosition(const Vec3 &pos)
    {
        m_Position = pos;
    }
} // namespace engine
} // namespace spright
