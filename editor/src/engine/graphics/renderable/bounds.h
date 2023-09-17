#pragma once
#include "../../../maths/vec2.h"

#include <sstream>
#include <vector>

namespace spright
{
namespace engine
{
    using namespace spright::maths;

    struct Bounds
    {
        float minX;

        float maxX;

        float minY;

        float maxY;

        Bounds(float x1, float y1, float x2, float y2);

        Bounds(Vec2 vec1, Vec2 vec2);

        Bounds();

        static Bounds createWithPositions(float minX, float minY, float maxX, float maxY);

        static Bounds createWithPositions(const Vec2 &pos1, const Vec2 &pos2);

        static Bounds createWithSize(float minX, float minY, float width, float height);

        Bounds operator*(float ratio);

        friend bool operator==(const Bounds &, const Bounds &);

        friend bool operator!=(const Bounds &, const Bounds &);

        Vec2 getCenter() const;

        float getWidth() const;

        float getHeight() const;

        void setSize(float newWidth, float newHeight);

        bool contains(float x, float y) const;

        void translate(float x, float y);

        bool isNull() const;

        void expand(const Vec2 &vec);

        std::vector<float> toArray() const;

        Vec2 getBottomLeft() const;

        Vec2 getTopRight() const;

        Vec2 getSize() const;

        std::string toString() const;
    };
} // namespace engine
} // namespace spright
