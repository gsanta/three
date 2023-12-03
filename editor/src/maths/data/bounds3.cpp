#include "bounds3.h"

namespace spright
{
namespace maths
{

    Bounds3::Bounds3(float x1, float y1, float z1, float x2, float y2, float z2)
    {
        minX = x1 < x2 ? x1 : x2;
        maxX = x1 < x2 ? x2 : x1;
        minY = y1 < y2 ? y1 : y2;
        maxY = y1 < y2 ? y2 : y1;
        minZ = z1 < z2 ? z1 : z2;
        maxZ = z1 < z2 ? z2 : z1;
    }

    Bounds3::Bounds3(const Vec3 &coord1, const Vec3 &coord2)
    {
        minX = coord1.x < coord2.x ? coord1.x : coord2.x;
        maxX = coord1.x < coord2.x ? coord2.x : coord1.x;
        minY = coord1.y < coord2.y ? coord1.y : coord2.y;
        maxY = coord1.y < coord2.y ? coord2.y : coord1.y;
        minZ = coord1.z < coord2.z ? coord1.z : coord2.z;
        maxZ = coord1.z < coord2.z ? coord2.z : coord1.z;
    }

    Vec3 Bounds3::min() const
    {
        return Vec3(minX, minY, minZ);
    }

    Vec3 Bounds3::max() const
    {
        return Vec3(maxX, maxY, maxZ);
    }

} // namespace maths
} // namespace spright
