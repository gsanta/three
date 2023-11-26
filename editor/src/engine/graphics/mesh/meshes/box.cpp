#include "box.h"

namespace spright
{
namespace engine
{
    Box::Box(int vertexCount, const Vec3 *positions) : Mesh(vertexCount, positions)
    {
    }

    Box::Box(int vertexCount, const Vec3 *positions, const unsigned int *colors) : Mesh(vertexCount, positions, colors)
    {
    }

    Box::Box(const Vec3 &pos, float width, float height, float depth, unsigned int color) : Mesh(36, color)
    {
        calcPositions(pos, width, height, depth);
    }

    Box *Box::clone() const
    {
        return new Box(*this);
    }

    void Box::calcPositions(const Vec3 &pos, float width, float height, float depth)
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

        Vec3 vertices[Box::NUM_VERTICES];

        vertices[0] = corners[0]; // front
        vertices[1] = corners[1];
        vertices[2] = corners[2];
        vertices[3] = corners[0];
        vertices[4] = corners[2];
        vertices[5] = corners[3];

        vertices[6] = corners[7]; // back
        vertices[7] = corners[6];
        vertices[8] = corners[5];
        vertices[9] = corners[7];
        vertices[10] = corners[5];
        vertices[11] = corners[4];

        vertices[12] = corners[3]; // right
        vertices[13] = corners[2];
        vertices[14] = corners[6];
        vertices[15] = corners[3];
        vertices[16] = corners[6];
        vertices[17] = corners[7];

        vertices[18] = corners[4]; // left
        vertices[19] = corners[5];
        vertices[20] = corners[1];
        vertices[21] = corners[4];
        vertices[22] = corners[1];
        vertices[23] = corners[0];

        vertices[24] = corners[1]; // top
        vertices[25] = corners[5];
        vertices[26] = corners[6];
        vertices[27] = corners[1];
        vertices[28] = corners[6];
        vertices[29] = corners[2];

        vertices[30] = corners[7]; // bottom
        vertices[31] = corners[4];
        vertices[32] = corners[0];
        vertices[33] = corners[7];
        vertices[34] = corners[0];
        vertices[35] = corners[3];
    }
} // namespace engine
} // namespace spright
