#pragma once

#include "../../mesh/meshes/mesh.h"
#include "mesh_builder.h"

namespace spright
{
namespace engine
{
    class CylinderBuilder : public MeshBuilder
    {
    public:
        Mesh build() const;

        Mesh build(const Vec3 &pos) const;

        CylinderBuilder &setHeight(float height);

        CylinderBuilder &setDiameterTop(float diameterTop);

        CylinderBuilder &setDiameterBottom(float diameterBottom);

        CylinderBuilder &setTessellation(int tessellation);

        CylinderBuilder &setColor(unsigned int color);

    private:
        float m_Height = 2.0;

        float m_DiameterTop = 1.0;

        float m_DiameterBottom = 0;

        int m_Tessellation = 8;

        unsigned int m_Color;
    };
} // namespace engine
} // namespace spright
