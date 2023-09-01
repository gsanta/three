#include "bounds_int.h"

namespace spright
{
namespace engine
{

    BoundsInt::BoundsInt()
    {
    }

    BoundsInt::BoundsInt(int minX, int minY, int maxX, int maxY) : minX(minX), maxX(maxX), minY(minY), maxY(maxY)
    {
    }

    BoundsInt BoundsInt::createWithSize(int minX, int minY, int width, int height)
    {
        return BoundsInt(minX, minY, minX + width, minY + height);
    }

    bool BoundsInt::contains(int x, int y) const
    {
        return minX <= x && maxX >= x && minY <= y && maxY >= y;
    }

    int BoundsInt::getWidth() const
    {
        return maxX - minX;
    }

    int BoundsInt::getHeight() const
    {
        return maxY - minY;
    }

    Vec2Int BoundsInt::getTopRight()
    {
        return Vec2Int(minX, minY);
    }

    Vec2Int BoundsInt::getBottomLeft()
    {
        return Vec2Int(maxX, maxY);
    }

    Vec2Int BoundsInt::getCenter() const
    {
        return Vec2Int(minX + (maxX - minX) / 2.0, minY + (maxY - minY) / 2.0);
    }

    bool BoundsInt::isDefault()
    {
        return minX == 0 && maxX == 0 && minY == 0 && maxY == 0;
    }

    std::string BoundsInt::toString() const
    {
        std::ostringstream ss;
        ss << "(" << minX << "," << minY << "),(" << maxX << "," << maxY << ")";
        return ss.str();
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
