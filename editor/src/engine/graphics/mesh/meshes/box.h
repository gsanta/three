#pragma once

#include "../../colors.h"
#include "./mesh.h"

namespace spright
{
namespace engine
{
    class Box : public Mesh
    {
    public:
        enum Face
        {
            from,
            back,
            right,
            left,
            top,
            bottom
        };

        static const int NUM_VERTICES = 36;

        static const int NUM_FACES = 6;

        static const int NUM_INDEXES_PER_FACE = 6;

        Box(int vertexCount, const Vec3 *positions);

        Box(int vertexCount, const Vec3 *positions, const unsigned int *colors);

        Box(const Vec3 &pos, float width, float height, float depth, unsigned int color);

        Box(const Box &other) = default;

        Box *clone() const override;

    private:
        void calcPositions(const Vec3 &pos, float width, float height, float depth);
    };
} // namespace engine
} // namespace spright
