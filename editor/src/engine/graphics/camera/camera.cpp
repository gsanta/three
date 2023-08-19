#include "camera.h"

namespace spright
{
namespace engine
{

    Camera::Camera(const Window *window, float near, float far, int scaleFactor)
        : m_Window(window), m_Near(near), m_Far(far), m_ScaleFactor(scaleFactor)
    {
        m_View = Mat4::lookAt(Vec3(0, 0, m_Z), Vec3(0, 0, 0), Vec3(0, 1, 0));
    }

    void Camera::translate2D(Vec2 translate)
    {
        m_Translate += translate;
        Vec3 eye(m_Translate.x, m_Translate.y, m_Z);
        Vec3 at(m_Translate.x, m_Translate.y, 0);
        m_View = Mat4::lookAt(eye, at, Vec3(0, 1, 0));
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

    const Mat4 Camera::getProjectionMatrix() const
    {
        int twiceScaleFactor = getScaleFactor() * 2;
        return Mat4::otrthographic(-m_Window->getWidth() / twiceScaleFactor,
                                   m_Window->getWidth() / twiceScaleFactor,
                                   -m_Window->getHeight() / twiceScaleFactor,
                                   m_Window->getHeight() / twiceScaleFactor,
                                   m_Near,
                                   m_Far);
    }

    const Mat4 &Camera::getViewMatrix() const
    {
        return m_View;
    }

    Vec2 Camera::getCenter2D()
    {
        return m_Translate;
    }

    Vec2 Camera::screenToWorldPos(float x, float y) const
    {
        float w = (float)m_Window->getWidth() / getScaleFactor();
        float h = (float)m_Window->getHeight() / getScaleFactor();

        const Mat4 scaleMatrix = spright::maths::Mat4::scale(Vec3(1.0 / getScaleFactor(), 1.0 / getScaleFactor(), 1));

        // from the screen's top/left zero pos to center zero pos
        const Mat4 translateMatrix =
            spright::maths::Mat4::translation(Vec3(m_Translate.x - w / 2.0f, m_Translate.y + h / 2.0f, 0.0f));

        Vec4 result = translateMatrix * scaleMatrix * Vec4(x, -y, 0.0f, 1.0f);

        return {result.x, result.y};
    }

    Vec2Int Camera::worldToScreenPos(float x, float y) const
    {
        float scaleX = m_Window->getWidth() / getScaleFactor();
        float scaleY = m_Window->getHeight() / getScaleFactor();

        const Mat4 translateMatrix = spright::maths::Mat4::translation(
            Vec3(-m_Translate.x + scaleX / 2.0f, -m_Translate.y - scaleY / 2.0f, 0.0f));
        // Vec4 result = mat4 * Vec4(x, -y, 0.0f, 1.0f);
        // pos -= m_Translate;
        const Mat4 scaleMatrix = spright::maths::Mat4::scale(Vec3(getScaleFactor(), getScaleFactor(), 1));

        // pos *= Vec2(scaleX, scaleY);
        Vec4 result = scaleMatrix * translateMatrix * Vec4(x, y, 0.0f, 1.0f);

        return {(int)result.x, (int)-result.y};
    }

    float Camera::getScaleFactor() const
    {
        return ((float)m_ScaleFactor) * m_Zoom;
    }
} // namespace engine
} // namespace spright
