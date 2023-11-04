#include "box.h"

namespace spright
{
namespace engine
{
    Box::Box(const Vec3 &pos, float width, float height, float depth, unsigned int color)
        : Renderable3d(pos, color), m_Width(width), m_Height(height), m_Depth(depth)
    {
        float halfWidth = m_Width / 2.0;
        float halfHeight = m_Height / 2.0;
        float halfDepth = m_Depth / 2.0;

        m_Corners[0] = Vec3(pos.x + halfWidth, pos.y + halfHeight, pos.z - halfDepth);
        m_Corners[1] = Vec3(pos.x + halfWidth, pos.y - halfHeight, pos.z - halfDepth);
        m_Corners[2] = Vec3(pos.x - halfWidth, pos.y - halfHeight, pos.z - halfDepth);
        m_Corners[3] = Vec3(pos.x - halfWidth, pos.y + halfHeight, pos.z - halfDepth);
        m_Corners[4] = Vec3(pos.x + halfWidth, pos.y + halfHeight, pos.z + halfDepth);
        m_Corners[5] = Vec3(pos.x + halfWidth, pos.y - halfHeight, pos.z + halfDepth);
        m_Corners[6] = Vec3(pos.x - halfWidth, pos.y - halfHeight, pos.z + halfDepth);
        m_Corners[7] = Vec3(pos.x - halfWidth, pos.y + halfHeight, pos.z + halfDepth);
    }

    void Box::submit(Renderer2D &renderer) const
    {
        VertexData *&buffer = renderer.getBuffer();
        const Mat4 *transformation = renderer.getTransformation();

        for (int i = 0; i < 8; i++)
        {
            buffer->vertex = *transformation * m_Corners[i];
            buffer->tid = 0.0f;
            buffer->color = m_Color;
            buffer++;
        }

        renderer.setIndexCount(renderer.getIndexCount() + 6);
    }

    Box *Box::clone() const
    {
        return new Box(*this);
    }
} // namespace engine
} // namespace spright
