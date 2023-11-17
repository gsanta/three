#include "box_builder.h"

namespace spright
{
namespace engine
{
    Box BoxBuilder::build() const
    {
        return Box(m_Pos, m_Width, m_Height, m_Depth, m_Color);
    }

    Box BoxBuilder::build(const Vec3 &pos) const
    {
        return Box(pos, m_Width, m_Height, m_Depth, m_Color);
    }

    void BoxBuilder::setWidth(float width)
    {
        m_Width = width;
    }

    void BoxBuilder::setHeight(float height)
    {
        m_Height = height;
    }

    void BoxBuilder::setDepth(float depth)
    {
        m_Depth = depth;
    }
} // namespace engine
} // namespace spright
