#include "camera2d.h"

namespace spright
{
namespace engine
{
    Camera2d::Camera2d(const BoundsInt &screenBounds, float near, float far, int zoomFactor)
        : Camera(screenBounds, near, far, zoomFactor)
    {
        m_View = Mat4::lookAt(Vec3(0, 0, m_Z), Vec3(0, 0, 0), Vec3(0, 1, 0));
    }


    void Camera2d::lookAt(const Vec3 &from)
    {
        m_View = Mat4::lookAt(from, Vec3(0, 0, 0), Vec3(0, 1, 0));
    }

    void Camera2d::translate2D(Vec2 delta)
    {
        setTranslate(m_Translate + delta);
    }

    void Camera2d::setTranslate(Vec2 translate)
    {
        m_Translate = translate;
        Vec3 eye(m_Translate.x, m_Translate.y, m_Z);
        Vec3 at(m_Translate.x, m_Translate.y, 0);
        m_View = Mat4::lookAt(eye, at, Vec3(0, 1, 0));
    }

    void Camera2d::zoomToFit(const Bounds &bounds)
    {
        float windowRatio = m_ScreenBounds.getWidth() / m_ScreenBounds.getHeight();

        float zoom = m_Zoom;

        if (bounds.getWidth() / windowRatio > bounds.getHeight())
        {
            float width = bounds.getWidth();
            zoom = m_ScreenBounds.getWidth() / width / m_ZoomFactor;
        }
        else
        {
            float height = bounds.getHeight();
            zoom = m_ScreenBounds.getHeight() / height / m_ZoomFactor;
        }

        setZoom(zoom);
        setTranslate(bounds.getCenter());
    }

    void Camera2d::setDirection(const Vec3 &direction)
    {
        m_Direction = direction;
    }

    void Camera2d::updateProjectionMatrix() const
    {
        int twiceScaleFactor = getScaleFactor() * 2.0f;
        m_Proj = Mat4::orthographic(-m_ScreenBounds.getWidth() / (twiceScaleFactor + 0.4f),
                                    m_ScreenBounds.getWidth() / (twiceScaleFactor + 0.4f),
                                    -m_ScreenBounds.getHeight() / (twiceScaleFactor + 0.4f),
                                    m_ScreenBounds.getHeight() / (twiceScaleFactor + 0.4f),
                                    m_Near,
                                    m_Far);
    }

    Vec2 Camera2d::getCenter2D()
    {
        return m_Translate;
    }

    void Camera2d::front()
    {

        lookAt(Vec3(0, 0, m_Radius));
    }

    void Camera2d::back()
    {
        lookAt(Vec3(0, 0, -m_Radius));
    }

    void Camera2d::left()
    {
        lookAt(Vec3(-m_Radius, 0, 0));
    }

    void Camera2d::right()
    {
        lookAt(Vec3(m_Radius, 0, 0));
    }

    void Camera2d::top()
    {
        lookAt(Vec3(0, m_Radius, 0));
    }

    void Camera2d::bottom()
    {
        lookAt(Vec3(0, -m_Radius, 0));
    }

    Camera *Camera2d::clone() const
    {
        return new Camera2d(*this);
    }
} // namespace engine
} // namespace spright
