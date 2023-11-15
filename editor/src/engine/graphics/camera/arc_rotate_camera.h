#pragma once

#include "camera.h"

namespace spright
{
namespace engine
{
    using namespace ::spright::maths;

    class ArcRotateCamera : public Camera
    {
    public:
        ArcRotateCamera(const BoundsInt &screenBounds, float near = -10.0f, float far = 10.0f, int zoomFactor = 17);

        void setPos(const Vec3 &pos);

        void setYaw(float yaw);

        float getYaw() const;

        void setPitch(float pitch);

        float getPitch() const;

        Camera *clone() const override;

    private:
        void updateProjectionMatrix() const override;

        void updateDirection();

    private:
        Vec3 m_Pos;

        Vec3 m_Front;

        Vec3 m_Up = Vec3(0.0, 1.0, 0.0);

        float m_Yaw;

        float m_Pitch;
    };
} // namespace engine
} // namespace spright
