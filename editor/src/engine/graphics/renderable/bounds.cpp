#include "bounds.h"

namespace spright { namespace engine {
    Bounds::Bounds(float bottomLeftX, float bottomLeftY, float width, float height)
    {
        minX = bottomLeftX;
        minY = bottomLeftY;
        maxX = minX + width;
        maxY = minY + height;
    }

    Bounds::Bounds() {}

    Vec2 Bounds::getCenter() const
    {
        return Vec2(minX + (maxX - minX) / 2.0, minY + (maxY - minY) / 2.0);
    }

    float Bounds::getWidth() const {
        return maxX - minX;
    }

    float Bounds::getHeight() const {
        return maxY - minY;
    }
}}

