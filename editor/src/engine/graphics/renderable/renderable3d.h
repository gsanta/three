#pragma once

#include "../../../maths/vec3.h"
#include "../renderer/renderer2d.h"

namespace spright
{
namespace engine
{
    using namespace maths;

    class Renderable3d
    {
    public:
        Renderable3d(const Vec3 &pos, unsigned int color);

        virtual ~Renderable3d() = default;

        const Vec3 &getPosition() const;

        virtual void submit(Renderer2D &renderer) const = 0;

        virtual Renderable3d *clone() const = 0;

    protected:
        Vec3 m_Position;

        unsigned int m_Color;
    };
} // namespace engine
} // namespace spright
