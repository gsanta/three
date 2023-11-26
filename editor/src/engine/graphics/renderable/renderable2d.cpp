#include "renderable2d.h"

namespace spright
{
namespace engine
{

    Renderable2D::Renderable2D() : Mesh(Vec3(), COLOR_WHITE)
    {
        setUVDefaults();
    }

    Renderable2D::Renderable2D(const Bounds &bounds, unsigned int color)
        : Mesh(Vec3(bounds.getCenter(), 0), COLOR_WHITE), m_bounds(bounds), m_Color(color)
    {
        setUVDefaults();
    }

    void Renderable2D::setUVDefaults()
    {
        m_UV.push_back(Vec2(0, 0));
        m_UV.push_back(Vec2(0, 1));
        m_UV.push_back(Vec2(1, 1));
        m_UV.push_back(Vec2(1, 0));
    }

    bool Renderable2D::isEqual(const Renderable2D &rhs) const
    {
        return m_VertexCount == rhs.m_VertexCount && m_Color == rhs.m_Color && m_bounds == rhs.m_bounds;
    }

    bool operator==(const Renderable2D &lhs, const Renderable2D &rhs)
    {
        return typeid(lhs) == typeid(rhs) && lhs.isEqual(rhs);
    }

    bool operator!=(const Renderable2D &lhs, const Renderable2D &rhs)
    {
        return !(lhs == rhs);
    }
} // namespace engine
} // namespace spright
