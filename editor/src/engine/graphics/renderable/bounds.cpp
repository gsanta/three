#include "bounds.h"

namespace spright
{
namespace engine
{
    Bounds::Bounds(float minX, float minY, float maxX, float maxY) : minX(minX), minY(minY), maxX(maxX), maxY(maxY)
    {
    }

    Bounds::Bounds(Vec2 bottomLeft, Vec2 topRight) : Bounds(bottomLeft.x, bottomLeft.y, topRight.x, topRight.y)
    {
    }

    Bounds::Bounds() : Bounds(0, 0, 0, 0)
    {
    }

    Bounds Bounds::createWithPositions(float x1, float y1, float x2, float y2)
    {
        float minX = x1 < x2 ? x1 : x2;
        float maxX = x1 < x2 ? x2 : x1;
        float minY = y1 < y2 ? y1 : y2;
        float maxY = y1 < y2 ? y2 : y1;

        return Bounds(minX, minY, maxX, maxY);
    }

    Bounds Bounds::createWithPositions(const Vec2 &pos1, const Vec2 &pos2)
    {
        return createWithPositions(pos1.x, pos1.y, pos2.x, pos2.y);
    }

    Bounds Bounds::createWithSize(float minX, float minY, float width, float height)
    {
        return Bounds(minX, minY, minX + width, minY + height);
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

    std::vector<float> Bounds::toArray() const
    {
        return std::vector<float>{minX, minY, maxX, maxY};
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

    Vec2 Bounds::getSize() const
    {
        return getTopRight() - getBottomLeft();
    }

    std::string Bounds::toString() const
    {
        std::ostringstream ss;
        ss << "(" << minX << "," << minY << "),(" << maxX << "," << maxY << ")";
        return ss.str();
    }

    Bounds Bounds::operator*(float ratio)
    {
        float newWidth = getWidth() * ratio;
        minX = getCenter().x - newWidth / 2;
        maxX = getCenter().x + newWidth / 2;

        return Bounds::createWithPositions(getBottomLeft(), getTopRight());
    }
} // namespace engine
} // namespace spright
