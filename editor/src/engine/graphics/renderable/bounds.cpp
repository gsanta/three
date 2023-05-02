#include "bounds.h"

namespace spright
{
namespace engine
{
    Bounds::Bounds(float minX, float minY, float width, float height)
        : minX(minX), minY(minY), maxX(minX + width), maxY(minY + height)
    {
    }

    Bounds::Bounds(Vec2 bottomLeft, Vec2 topRight)
        : Bounds(bottomLeft.x, bottomLeft.y, topRight.x - bottomLeft.x, topRight.y - bottomLeft.y)
    {
    }

    Bounds::Bounds() : Bounds(0, 0, 0, 0)
    {
    }

    Bounds Bounds::createWithPositions(float minX, float maxX, float minY, float maxY)
    {
        return Bounds(minX, minY, maxX - minX, maxY - minY);
    }

    Vec2 Bounds::getCenter() const
    {
        return Vec2(minX + (maxX - minX) / 2.0, minY + (maxY - minY) / 2.0);
    }

    float Bounds::getWidth() const
    {
        return maxX - minX;
    }

    float Bounds::getHeight() const
    {
        return maxY - minY;
    }

    void Bounds::setSize(float newWidth, float newHeight)
    {
        float deltaWidth = (newWidth - getWidth()) / 2.0f;

        minX -= deltaWidth;
        maxX += deltaWidth;


        float deltaHeight = (newHeight - getHeight()) / 2.0f;

        maxY += deltaHeight;
        minY -= deltaHeight;
    }

    bool Bounds::contains(float x, float y) const
    {
        return minX <= x && maxX >= x && minY <= y && maxY >= y;
    }

    void Bounds::translate(float x, float y)
    {
        minX += x;
        maxX += x;
        minY += y;
        maxY += y;
    }

    bool Bounds::isNull() const
    {
        return minX == 0 && maxX == 0 && minY == 0 && maxY == 0;
    }


    bool operator==(const Bounds &lhs, const Bounds &rhs)
    {
        return lhs.minX == rhs.minX && lhs.maxX == rhs.maxX && lhs.minY == rhs.minY && lhs.maxY == rhs.maxY;
    }

    bool operator!=(const Bounds &lhs, const Bounds &rhs)
    {
        return !(lhs == rhs);
    }

    Vec2 Bounds::getBottomLeft() const
    {
        return Vec2(minX, minY);
    }

    Vec2 Bounds::getTopRight() const
    {
        return Vec2(maxX, maxY);
    }

    std::string Bounds::toString() const
    {
        std::ostringstream ss;
        ss << "(" << minX << "," << minY << "),(" << maxX << "," << maxY << ")";
        return ss.str();
    }
} // namespace engine
} // namespace spright
