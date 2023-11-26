#include "box_builder.h"

namespace spright
{
namespace engine
{
    Box BoxBuilder::build() const
    {
        return build(m_Pos);
    }

    Box BoxBuilder::build(const Vec3 &pos) const
    {
        Vec3 positions[Box::NUM_VERTICES];

        calcPositions(pos, m_Width, m_Height, m_Depth, positions);

        unsigned int colors[Box::NUM_VERTICES];

        calcColors(colors);

        return Box(Box::NUM_VERTICES, positions, colors);
    }

    BoxBuilder &BoxBuilder::setWidth(float width)
    {
        m_Width = width;

        return *this;
    }

    BoxBuilder &BoxBuilder::setHeight(float height)
    {
        m_Height = height;

        return *this;
    }

    BoxBuilder &BoxBuilder::setDepth(float depth)
    {
        m_Depth = depth;

        return *this;
    }

    BoxBuilder &BoxBuilder::setColor(int color)
    {
        m_Color = color;

        return *this;
    }

    BoxBuilder &BoxBuilder::setFaceColor(Box::Face face, unsigned int color)
    {
        m_FaceColors.insert(std::make_pair(face, color));

        return *this;
    }

    void BoxBuilder::calcPositions(const Vec3 &pos, float width, float height, float depth, Vec3 *positions) const
    {
        float halfWidth = width / 2.0;
        float halfHeight = height / 2.0;
        float halfDepth = depth / 2.0;

        Vec3 corners[8];
        corners[0] = Vec3(pos.x - halfWidth, pos.y - halfHeight, pos.z + halfDepth); // bottom left front
        corners[1] = Vec3(pos.x - halfWidth, pos.y + halfHeight, pos.z + halfDepth); // top left front
        corners[2] = Vec3(pos.x + halfWidth, pos.y + halfHeight, pos.z + halfDepth); // top right front
        corners[3] = Vec3(pos.x + halfWidth, pos.y - halfHeight, pos.z + halfDepth); // bottom right front
        corners[4] = Vec3(pos.x - halfWidth, pos.y - halfHeight, pos.z - halfDepth); // bottom left back
        corners[5] = Vec3(pos.x - halfWidth, pos.y + halfHeight, pos.z - halfDepth); // top left back
        corners[6] = Vec3(pos.x + halfWidth, pos.y + halfHeight, pos.z - halfDepth); // top right back
        corners[7] = Vec3(pos.x + halfWidth, pos.y - halfHeight, pos.z - halfDepth); // bottom right back

        positions[0] = corners[0]; // front
        positions[1] = corners[1];
        positions[2] = corners[2];
        positions[3] = corners[0];
        positions[4] = corners[2];
        positions[5] = corners[3];

        positions[6] = corners[7]; // back
        positions[7] = corners[6];
        positions[8] = corners[5];
        positions[9] = corners[7];
        positions[10] = corners[5];
        positions[11] = corners[4];

        positions[12] = corners[3]; // right
        positions[13] = corners[2];
        positions[14] = corners[6];
        positions[15] = corners[3];
        positions[16] = corners[6];
        positions[17] = corners[7];

        positions[18] = corners[4]; // left
        positions[19] = corners[5];
        positions[20] = corners[1];
        positions[21] = corners[4];
        positions[22] = corners[1];
        positions[23] = corners[0];

        positions[24] = corners[1]; // top
        positions[25] = corners[5];
        positions[26] = corners[6];
        positions[27] = corners[1];
        positions[28] = corners[6];
        positions[29] = corners[2];

        positions[30] = corners[7]; // bottom
        positions[31] = corners[4];
        positions[32] = corners[0];
        positions[33] = corners[7];
        positions[34] = corners[0];
        positions[35] = corners[3];
    }

    void BoxBuilder::calcColors(unsigned int *colors) const
    {
        for (int i = 0; i < Box::NUM_VERTICES; i++)
        {
            colors[i] = m_Color;
        }

        for (int faceIndex = 0; faceIndex < Box::NUM_FACES; faceIndex++)
        {
            auto it = m_FaceColors.find(static_cast<Box::Face>(faceIndex));
            if (it != m_FaceColors.end())
            {
                unsigned int color = it->second;

                int posStart = faceIndex * Box::NUM_INDEXES_PER_FACE;

                std::fill(colors + posStart, colors + posStart + Box::NUM_INDEXES_PER_FACE, color);
            }
        }
    }
} // namespace engine
} // namespace spright
