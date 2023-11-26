#include "mesh_builder.h"

namespace spright
{
namespace engine
{
    MeshBuilder &MeshBuilder::setColor(int color)
    {
        m_Color = color;

        return *this;
    }

    MeshBuilder &MeshBuilder::setPos(const Vec3 &pos)
    {
        m_Pos = pos;

        return *this;
    }
} // namespace engine
} // namespace spright
