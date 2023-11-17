#include "mesh_builder.h"

namespace spright
{
namespace engine
{
    void MeshBuilder::setColor(int color)
    {
        m_Color = color;
    }

    void MeshBuilder::setPos(const Vec3 &pos)
    {
        m_Pos = pos;
    }
} // namespace engine
} // namespace spright
