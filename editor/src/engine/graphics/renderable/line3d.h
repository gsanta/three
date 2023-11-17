#pragma once

#include "../../../maths/vec3.h"
#include "../renderer/renderer2d.h"
#include "renderable.h"

#include <cmath>

namespace spright
{
namespace engine
{
    using namespace spright::maths;

    class Line3d : public Renderable
    {
    public:
        Line3d(const Vec3 &start, const Vec3 &end, float thickness, unsigned int color);

        void submit(Renderer2D &renderer) const override;

        Line3d *clone() const override;

    private:
        Vec3 m_Start;

        Vec3 m_End;

        float m_Thickness;

        float m_Length;

        Vec3 m_Dir;

        Vec3 m_Normal;

        Vec3 m_Coords[4];
    };

} // namespace engine
} // namespace spright
