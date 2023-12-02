#pragma once

#include "camera.h"

namespace spright
{
namespace engine
{
    using namespace ::spright::maths;

    class Camera2d : public Camera
    {
    public:
        Camera2d(const BoundsInt &screenBounds, float near = -1.0f, float far = 1.0f, int zoomFactor = 17);

        void lookAt(const Vec3 &from);

        void translate2D(Vec2 delta);

        void setTranslate(Vec2 translate);

        void zoomToFit(const Bounds &bounds);

        void setDirection(const Vec3 &direction);

        Vec2 getCenter2D();

        Camera *clone() const override;

    private:
        void updateProjectionMatrix() const override;

    private:
        Vec3 m_Direction;
    };
} // namespace engine
} // namespace spright
