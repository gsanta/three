#include "vec2_int.h"

namespace spright
{
namespace maths
{
    Vec2Int::Vec2Int()
    {
    }

    maths::Vec2Int::Vec2Int(int x, int y) : x(x), y(y)
    {
    }

    Vec2Int Vec2Int::operator+(const Vec2Int &right)
    {
        return Vec2Int(x + right.x, y + right.y);
    }

    Vec2Int Vec2Int::operator-(const Vec2Int &right)
    {
        return Vec2Int(x - right.x, y - right.y);
    }

    bool operator==(const Vec2Int &left, const Vec2Int &right)
    {
        return left.x == right.x && left.y == right.y;
    }

    bool operator!=(const Vec2Int &left, const Vec2Int &right)
    {
        return !(left == right);
    }
} // namespace maths
} // namespace spright
