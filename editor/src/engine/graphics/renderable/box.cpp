#include "box.h"

namespace spright
{
namespace engine
{
    Box::Box(const Vec3 &pos, float width, float height, float depth, unsigned int color)
        : Renderable(pos, color), m_Width(width), m_Height(height), m_Depth(depth)
    {
        updatePosition();
    }

    void Box::submit(Renderer2D &renderer) const
    {
        VertexData *&buffer = renderer.getBuffer();
        const Mat4 *transformation = renderer.getTransformation();

        for (int i : m_Indexes)
        {
            buffer->vertex = *transformation * m_Corners[i];
            buffer->tid = 0.0f;
            buffer->color = m_Color;
            buffer++;
        }

        renderer.setIndexCount(renderer.getIndexCount() + 36);
    }

    Box *Box::clone() const
    {
        return new Box(*this);
    }

    void Box::setPosition(const Vec3 &pos)
    {
        Renderable::setPosition(pos);
        updatePosition();
    }

    void Box::updatePosition()
    {
        float halfWidth = m_Width / 2.0;
        float halfHeight = m_Height / 2.0;
        float halfDepth = m_Depth / 2.0;

        Vec3 pos = getPosition();

        m_Corners[0] = Vec3(pos.x - halfWidth, pos.y - halfHeight, pos.z + halfDepth); // bottom left front
        m_Corners[1] = Vec3(pos.x - halfWidth, pos.y + halfHeight, pos.z + halfDepth); // top left front
        m_Corners[2] = Vec3(pos.x + halfWidth, pos.y + halfHeight, pos.z + halfDepth); // top right front
        m_Corners[3] = Vec3(pos.x + halfWidth, pos.y - halfHeight, pos.z + halfDepth); // bottom right front
        m_Corners[4] = Vec3(pos.x - halfWidth, pos.y - halfHeight, pos.z - halfDepth); // bottom left back
        m_Corners[5] = Vec3(pos.x - halfWidth, pos.y + halfHeight, pos.z - halfDepth); // top left back
        m_Corners[6] = Vec3(pos.x + halfWidth, pos.y + halfHeight, pos.z - halfDepth); // top right back
        m_Corners[7] = Vec3(pos.x + halfWidth, pos.y - halfHeight, pos.z - halfDepth); // bottom right back

        m_Indexes[0] = 0; // front
        m_Indexes[1] = 1;
        m_Indexes[2] = 2;
        m_Indexes[3] = 3;

        m_Indexes[4] = 7; // back
        m_Indexes[5] = 6;
        m_Indexes[6] = 5;
        m_Indexes[7] = 4;

        m_Indexes[8] = 3; // right
        m_Indexes[9] = 2;
        m_Indexes[10] = 6;
        m_Indexes[11] = 7;
        // m_Indexes[16] = 3;
        // m_Indexes[17] = 7;

        m_Indexes[12] = 4; // left
        m_Indexes[13] = 5;
        m_Indexes[14] = 1;
        m_Indexes[15] = 0;
        // m_Indexes[16] = 1;
        // m_Indexes[17] = 1;

        m_Indexes[16] = 1; // top
        m_Indexes[17] = 5;
        m_Indexes[18] = 6;
        m_Indexes[19] = 2;
        // m_Indexes[22] = 5;
        // m_Indexes[23] = 4;

        m_Indexes[20] = 7; // bottom
        m_Indexes[21] = 4;
        m_Indexes[22] = 0;
        m_Indexes[23] = 3;
        // m_Indexes[28] = 5;
        // m_Indexes[29] = 1;

        // m_Indexes[30] = 3; // bottom
        // m_Indexes[31] = 4;
        // m_Indexes[32] = 7;
        // m_Indexes[33] = 3;
        // m_Indexes[34] = 0;
        // m_Indexes[35] = 4;
    }
} // namespace engine
} // namespace spright
