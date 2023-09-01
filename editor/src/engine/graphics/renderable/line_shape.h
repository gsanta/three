#pragma once

#include "../../../maths/vec3.h"
#include "../renderer/renderer2d.h"
#include "renderable2d.h"

#include <cmath>

namespace spright
{
namespace engine
{
    using namespace spright::maths;

    class LineShape : public Renderable2D
    {
    private:
        Vec2 m_Start;
        Vec2 m_End;
        float m_Thickness;
        float m_Length;
        Vec2 m_Dir;
        Vec2 m_Normal;
        Vec3 m_Coords[4];

    public:
        LineShape(float x1, float y1, float x2, float y2, float thickness, unsigned int color);

        virtual void submit(Renderer2D &renderer) const override;
    };

} // namespace engine
} // namespace spright
