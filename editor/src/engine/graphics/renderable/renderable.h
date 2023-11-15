#pragma once

#include "../../../maths/vec3.h"
#include "../renderer/renderer2d.h"

namespace spright
{
namespace engine
{
    using namespace maths;

    class Renderable
    {
    public:
        Renderable(const Vec3 &pos, unsigned int color);

        virtual ~Renderable() = default;

        const Vec3 &getPosition() const;

        virtual void setPosition(const Vec3 &pos);

        virtual void submit(Renderer2D &renderer) const = 0;

        virtual Renderable *clone() const = 0;

    protected:
        Vec3 m_Position;

        unsigned int m_Color;
    };
} // namespace engine
} // namespace spright
