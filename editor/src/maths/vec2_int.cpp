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

    Vec2Int Vec2Int::operator+(int val) const
    {
        return Vec2Int(x + val, y + val);
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

    std::ostream &operator<<(std::ostream &stream, const Vec2Int &vec)
    {
        stream << "vec2: {" << vec.x << ", " << vec.y << "}";
        return stream;
    }
} // namespace maths
} // namespace spright
