#include "bounds_int.h"

namespace spright
{
namespace engine
{

    BoundsInt::BoundsInt()
    {
    }

    BoundsInt::BoundsInt(int minX, int maxX, int minY, int maxY) : minX(minX), maxX(maxX), minY(minY), maxY(maxY)
    {
    }


    int BoundsInt::getWidth() const
    {
        return maxX - minX;
    }

    int BoundsInt::getHeight() const
    {
        return maxY - minY;
    }


    Vec2Int BoundsInt::getCenter() const
    {
        return Vec2Int(minX + (maxX - minX) / 2.0, minY + (maxY - minY) / 2.0);
    }

    bool operator==(const BoundsInt &lhs, const BoundsInt &rhs)
    {
        return lhs.minX == rhs.minX && lhs.maxX == rhs.maxX && lhs.minY == rhs.minY && lhs.maxY == rhs.maxY;
    }

    bool operator!=(const BoundsInt &lhs, const BoundsInt &rhs)
    {
        return !(lhs == rhs);
    }
} // namespace engine
} // namespace spright
