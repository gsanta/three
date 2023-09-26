#include "bounds_int.h"

namespace spright
{
namespace engine
{

    BoundsInt::BoundsInt() : minX(0), minY(0), maxX(0), maxY(0)
    {
    }

    BoundsInt::BoundsInt(int x1, int y1, int x2, int y2)
    {
        minX = x1 < x2 ? x1 : x2;
        maxX = x1 < x2 ? x2 : x1;
        minY = y1 < y2 ? y1 : y2;
        maxY = y1 < y2 ? y2 : y1;
    }

    BoundsInt::BoundsInt(const Vec2Int &vec1, const Vec2Int &vec2) : BoundsInt(vec1.x, vec1.y, vec2.x, vec2.y)
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

    Vec2Int BoundsInt::getTopRight() const
    {
        return Vec2Int(maxX, maxY);
    }

    Vec2Int BoundsInt::getBottomLeft() const
    {
        return Vec2Int(minX, minY);
    }

    Vec2Int BoundsInt::getCenter() const
    {
        return Vec2Int(minX + (maxX - minX) / 2.0, minY + (maxY - minY) / 2.0);
    }

    bool BoundsInt::isDefault()
    {
        return minX == 0 && maxX == 0 && minY == 0 && maxY == 0;
    }

    void BoundsInt::expand(const Vec2Int &vec)
    {
        if (vec.x < minX)
        {
            minX = vec.x;
        }
        else if (vec.x + 1 > maxX)
        {
            maxX = vec.x + 1;
        }

        if (vec.y < minY)
        {
            minY = vec.y;
        }
        else if (vec.y + 1 > maxY)
        {
            maxY = vec.y + 1;
        }
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
