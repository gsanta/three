#pragma once

#include "renderable.h"

namespace spright
{
namespace engine
{
    class Box : public Renderable
    {
    public:
        Box(const Vec3 &pos, float width, float height, float depth, unsigned int color);

        void submit(Renderer2D &renderer) const override;

        Box *clone() const override;

        void setPosition(const Vec3 &pos) override;

    private:
        void updatePosition();

    private:
        float m_Width;

        float m_Height;

        float m_Depth;

        Vec3 m_Corners[8];

        int m_Indexes[24];

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
