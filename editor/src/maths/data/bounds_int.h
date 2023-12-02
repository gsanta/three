#pragma once
#include "../vec2_int.h"

#include <sstream>


namespace spright
{
namespace engine
{

    using namespace maths;

    class BoundsInt
    {
    public:
        int minX;

        int maxX;

        int minY;

        int maxY;

        BoundsInt();

        BoundsInt(int minX, int minY, int maxX, int maxY);

        BoundsInt(const Vec2Int &bottomLeft, const Vec2Int &topRight);

        static BoundsInt createWithSize(int minX, int minY, int width, int height);

        bool contains(int x, int y) const;

        friend bool operator==(const BoundsInt &, const BoundsInt &);

        friend bool operator!=(const BoundsInt &, const BoundsInt &);

        int getWidth() const;

        int getHeight() const;

        Vec2Int getTopRight() const;

        Vec2Int getBottomLeft() const;

        Vec2Int getCenter() const;

        bool isNull() const;

        void expand(const Vec2Int &vec);

        std::string toString() const;
    };

} // namespace engine
} // namespace spright
