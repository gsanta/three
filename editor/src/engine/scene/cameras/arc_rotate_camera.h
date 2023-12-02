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
        ArcRotateCamera(const BoundsInt &screenBounds, float near = -100.0f, float far = 100.0f, int zoomFactor = 17);

        void setPos(const Vec3 &pos);

        void setYaw(float yaw);

        float getYaw() const;

        void setPitch(float pitch);

        float getPitch() const;

        Vec3 screenToWorldPos3d(float x, float y, float z) const;

        void front();

        void back();

        void left();

        void right();

        void top();

        void bottom();

        ArcRotateCamera *clone() const override;

    private:
        void updateProjectionMatrix() const override;

        void updateDirection();

    private:
        Vec3 m_Pos;

        Vec3 m_Front;

        Vec3 m_Up = Vec3(0.0, 1.0, 0.0);

        float m_Yaw = 0;

        float m_Pitch = 0;

        float m_Radius = 5.0;
    };
} // namespace engine
} // namespace spright
