#pragma once
#include "../../../maths/vec2_int.h"

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

        BoundsInt(int minX, int maxX, int minY, int maxY);

        friend bool operator==(const BoundsInt &, const BoundsInt &);

        friend bool operator!=(const BoundsInt &, const BoundsInt &);

        int getWidth() const;

        int getHeight() const;

        Vec2Int getCenter() const;
    };

} // namespace engine
} // namespace spright
