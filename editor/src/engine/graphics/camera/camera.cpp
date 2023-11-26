#include "camera.h"

namespace spright
{
namespace engine
{
    Camera::Camera(const BoundsInt &screenBounds, float near, float far, int zoomFactor)
        : m_ScreenBounds(screenBounds), m_Near(near), m_Far(far), m_ZoomFactor(zoomFactor)
    {
        m_View = Mat4::lookAt(Vec3(0, 0, m_Z), Vec3(0, 0, 0), Vec3(0, 1, 0));
    }

    void Camera::setZoom(float zoom)
    {
        m_Zoom = zoom;
    }

    void Camera::zoomIn()
    {
        m_Zoom *= 1.05;
    }

    void Camera::zoomOut()
    {
        m_Zoom /= 1.05;
    }

    float Camera::getZoom()
    {
        return m_Zoom;
    }

    const Mat4 &Camera::getViewMatrix() const
    {
        return m_View;
    }

    const Mat4 &Camera::getProjectionMatrix() const
    {
        updateProjectionMatrix();
        return m_Proj;
    }

    void Camera::setScreenBounds(const BoundsInt &screenBounds)
    {
        m_ScreenBounds = screenBounds;
    }

    float Camera::getScaleFactor() const
    {
        return ((float)m_ZoomFactor) * m_Zoom;
    }

    Vec2 Camera::screenToWorldPos(float x, float y) const
    {
        float w = (float)m_ScreenBounds.getWidth() / getScaleFactor();
        float h = (float)m_ScreenBounds.getHeight() / getScaleFactor();

        const Mat4 scaleMatrix =
            spright::maths::Mat4::scale(Vec3(1.0f / getScaleFactor(), 1.0f / getScaleFactor(), 1.0f));

        // from the screen's top/left zero pos to center zero pos
        const Mat4 translateMatrix =
            spright::maths::Mat4::translation(Vec3(m_Translate.x - w / 2.0f, m_Translate.y + h / 2.0f, 0.0f));

        Vec4 result = translateMatrix * scaleMatrix * Vec4(x, -y, 0.0f, 1.0f);

        return {result.x, result.y};
    }

    Vec2Int Camera::worldToScreenPos(float x, float y) const
    {
        float scaleX = m_ScreenBounds.getWidth() / getScaleFactor();
        float scaleY = m_ScreenBounds.getHeight() / getScaleFactor();

        const Mat4 translateMatrix = spright::maths::Mat4::translation(
            Vec3(-m_Translate.x + scaleX / 2.0f, -m_Translate.y - scaleY / 2.0f, 0.0f));

        const Mat4 scaleMatrix = spright::maths::Mat4::scale(Vec3(getScaleFactor(), getScaleFactor(), 1));

        Vec4 result = scaleMatrix * translateMatrix * Vec4(x, y, 0.0f, 1.0f);

        return {(int)result.x, (int)-result.y};
    }

    bool Camera::operator==(const Camera &rhs) const
    {
        return m_Near == rhs.m_Near && m_Far == rhs.m_Far && m_ZoomFactor == rhs.m_ZoomFactor &&
               m_ScreenBounds == rhs.m_ScreenBounds;
    }

    bool Camera::operator!=(const Camera &rhs) const
    {
        return !(*this == rhs);
    }
} // namespace engine
} // namespace spright
