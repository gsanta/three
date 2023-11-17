#pragma once

#include "../../renderable/box.h"
#include "mesh_builder.h"

namespace spright
{
namespace engine
{
    class BoxBuilder : public MeshBuilder
    {
    public:
        Box build() const;

        Box build(const Vec3 &pos) const;

        void setWidth(float width);

        void setHeight(float height);

        void setDepth(float depth);

    private:
        float m_Width = 1.0;

        float m_Height = 1.0;

        float m_Depth = 1.0;
    };
} // namespace engine
} // namespace spright
