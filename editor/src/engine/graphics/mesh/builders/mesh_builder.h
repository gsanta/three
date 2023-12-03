#pragma once

#include "../../../../maths/vec3.h"
#include "../../colors.h"

#include <memory>

namespace spright
{
namespace engine
{
    using namespace maths;

    class MeshBuilder
    {
    public:
        MeshBuilder &setColor(int color);

        virtual MeshBuilder &setPos(const Vec3 &pos);

    protected:
        int m_Color = COLOR_WHITE;

        Vec3 m_Pos;
    };
} // namespace engine
} // namespace spright
