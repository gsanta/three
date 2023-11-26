#include "arc_rotate_camera.h"

namespace spright
{
namespace engine
{
    ArcRotateCamera::ArcRotateCamera(const BoundsInt &screenBounds, float near, float far, int zoomFactor)
        : Camera(screenBounds, near, far, zoomFactor)
    {
    }

    void ArcRotateCamera::setPos(const Vec3 &pos)
    {
        m_Pos = pos;

        m_View = Mat4::lookAt(pos, Vec3(0, 0, 0), Vec3(0, 1, 0));
    }


    void ArcRotateCamera::setYaw(float yaw)
    {
        m_Yaw = yaw;
        updateDirection();
    }

    float ArcRotateCamera::getYaw() const
    {
        return m_Yaw;
    }

    void ArcRotateCamera::setPitch(float pitch)
    {
        if (pitch > M_PI_2)
        {
            m_Pitch = 89.0f;
        }
        else if (pitch < -M_PI_2)
        {
            m_Pitch = -89.0f;
        }
        else
        {
            m_Pitch = pitch;
        }

        updateDirection();
    }

    float ArcRotateCamera::getPitch() const
    {
        return m_Pitch;
    }

    Vec3 ArcRotateCamera::screenToWorldPos3d(float x, float y, float z) const
    {
        Mat4 model(1);
        model.columns[3].x = x;
        model.columns[3].y = y;
        model.columns[3].z = z;

        Mat4 inverseView(m_View);
        inverseView.transpose();

        Vec4 origin(0, 0, 0, 1);

        Vec4 res = inverseView * model * origin;

        return Vec3(res.x, res.y, res.z);
    }

    void ArcRotateCamera::front()
    {
        m_View = Mat4::lookAt(Vec3(0, 0, m_Radius), Vec3(0, 0, 0), Vec3(0, 1, 0));
    }

    void ArcRotateCamera::back()
    {
        m_View = Mat4::lookAt(Vec3(0, 0, -m_Radius), Vec3(0, 0, 0), Vec3(0, 1, 0));
    }

    void ArcRotateCamera::left()
    {
        m_View = Mat4::lookAt(Vec3(-m_Radius, 0, 0), Vec3(0, 0, 0), Vec3(0, 1, 0));
    }

    void ArcRotateCamera::right()
    {
        m_View = Mat4::lookAt(Vec3(m_Radius, 0, 0), Vec3(0, 0, 0), Vec3(0, 1, 0));
    }

    void ArcRotateCamera::top()
    {
        m_View = Mat4::lookAt(Vec3(0, m_Radius, 0), Vec3(0, 0, 0), Vec3(0, 1, 0));
    }

    void ArcRotateCamera::bottom()
    {
        m_View = Mat4::lookAt(Vec3(0, -m_Radius, 0), Vec3(0, 0, 0), Vec3(0, 1, 0));
    }

    Camera *ArcRotateCamera::clone() const
    {
        return new ArcRotateCamera(*this);
    }


    void ArcRotateCamera::updateProjectionMatrix() const
    {
        int twiceScaleFactor = getScaleFactor() * 2.0f;
        m_Proj = Mat4::orthographic(-m_ScreenBounds.getWidth() / (twiceScaleFactor + 0.4f),
                                    m_ScreenBounds.getWidth() / (twiceScaleFactor + 0.4f),
                                    -m_ScreenBounds.getHeight() / (twiceScaleFactor + 0.4f),
                                    m_ScreenBounds.getHeight() / (twiceScaleFactor + 0.4f),
                                    m_Near,
                                    m_Far);
    }

    void ArcRotateCamera::updateDirection()
    {
        Vec3 direction;
        direction.x = cos(m_Yaw) * cos(m_Pitch);
        direction.y = sin(m_Pitch);
        direction.z = sin(m_Yaw) * cos(m_Pitch);
        direction.normalize();

        m_View = Mat4::lookAt(direction, Vec3(0, 0, 0), Vec3(0, 1, 0));
    }
} // namespace engine
} // namespace spright
