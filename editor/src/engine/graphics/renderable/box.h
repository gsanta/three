#pragma once

#include "renderable3d.h"

namespace spright
{
namespace engine
{
    class Box : public Renderable3d
    {
    public:
        Box(const Vec3 &pos, float width, float height, float depth, unsigned int color);

        virtual void submit(Renderer2D &renderer) const override;

        virtual Box *clone() const override;

    private:
        float m_Width;

        float m_Height;

        float m_Depth;

        Vec3 m_Corners[8];

        Vec3 m_FrontTopRight;

        Vec3 m_FrontBottomRight;

        Vec3 m_FrontBottomLeft;

        Vec3 m_FrontTopLeft;

        Vec3 m_BackTopRight;

        Vec3 m_BackBottomRight;

        Vec3 m_BackBottomLeft;

        Vec3 m_BackTopLeft;
    };
} // namespace engine
} // namespace spright
