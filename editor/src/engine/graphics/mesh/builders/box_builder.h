#pragma once

#include "../meshes/box.h"
#include "mesh_builder.h"

#include <algorithm>
#include <map>

namespace spright
{
namespace engine
{
    class BoxBuilder : public MeshBuilder
    {
    public:
        Box build() const;

        Box build(const Vec3 &pos) const;

        BoxBuilder &setWidth(float width);

        BoxBuilder &setHeight(float height);

        BoxBuilder &setDepth(float depth);

        BoxBuilder &setColor(int color);

        BoxBuilder &setFaceColor(Box::Face face, unsigned int color);

    private:
        void calcPositions(const Vec3 &pos, float width, float height, float depth, Vec3 *positions) const;

        void calcColors(unsigned int *colors) const;

    private:
        float m_Width = 1.0;

        float m_Height = 1.0;

        float m_Depth = 1.0;

        std::map<Box::Face, unsigned int> m_FaceColors;
    };
} // namespace engine
} // namespace spright
