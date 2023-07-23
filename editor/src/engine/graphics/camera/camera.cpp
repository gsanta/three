#include "camera.h"

namespace spright
{
namespace engine
{

    Camera::Camera(float windowWidth, float windowHeight, Bounds documentBounds, float near, float far)
        : m_WindowWidth(windowWidth), m_WindowHeight(windowHeight), m_Near(near), m_Far(far)
    {
        m_DocumentBounds = documentBounds;
        updateWindowSize(windowWidth, windowHeight);
    }

    void Camera::translate2D(Vec2 translate)
    {
        Vec3 eye(m_Translate.x + translate.x, m_Translate.y + translate.y, z);
        Vec3 at(m_Translate.x + translate.x, m_Translate.y + translate.y, 0);
        m_Translate.x = eye.x;
        m_Translate.y = eye.y;
        m_View = Mat4::lookAt(eye, at, Vec3(0, 1, 0));
    }

    void Camera::zoom(float deltaWidth)
    {
        float newWidth = m_CameraDim.getWidth() + deltaWidth;
        float newHeight = newWidth / getAspectRatio();

        m_Zoom = m_InitialWidth / newWidth;
        m_CameraDim.setSize(newWidth, newHeight);
        updateAspectRatio();
    }

    float Camera::getZoom()
    {
        return m_Zoom;
    }

    const Bounds &Camera::getBounds() const
    {
        return m_CameraDim;
    }

    const Mat4 Camera::getProjectionMatrix() const
    {
        return m_ProjectionMatrix;
    }

    float Camera::getAspectRatio() const
    {
        return m_AspectRatio;
    }

    const Mat4 &Camera::getViewMatrix() const
    {
        return m_View;
    }

    Vec2 Camera::getCenter2D()
    {
        return m_Translate;
    }

    void Camera::updateWindowSize(float windowWidth, float windowHeight)
    {
        m_WindowWidth = windowWidth;
        m_WindowHeight = windowHeight;
        m_CameraDim = getCameraDimensions();

        m_InitialWidth = m_CameraDim.maxX - m_CameraDim.minX;
        m_View = Mat4::lookAt(Vec3(0, 0, z), Vec3(0, 0, 0), Vec3(0, 1, 0));
        m_Zoom = 1.0f;
        m_Translate.x = 0;
        m_Translate.y = 0;

        updateAspectRatio();
    }

    void Camera::updateAspectRatio()
    {
        m_AspectRatio = (m_CameraDim.maxX - m_CameraDim.minX) / (m_CameraDim.maxY - m_CameraDim.minY);
        m_ProjectionMatrix =
            Mat4::otrthographic(m_CameraDim.minX, m_CameraDim.maxX, m_CameraDim.minY, m_CameraDim.maxY, m_Near, m_Far);
    }

    Vec2 Camera::screenToWorldPos(float x, float y) const
    {
        float w = m_CameraDim.getWidth();
        float h = m_CameraDim.getHeight();

        const Mat4 mat4 = spright::maths::Mat4::scale(
            Vec3(m_CameraDim.getWidth() / m_WindowWidth, m_CameraDim.getHeight() / m_WindowHeight, 1));

        Vec4 result = mat4 * Vec4(x, -y, 0.0f, 1.0f);

        const Mat4 mat2 =
            spright::maths::Mat4::translation(Vec3(m_Translate.x - w / 2.0f, m_Translate.y + h / 2.0f, 0.0f));

        result = mat2 * result;

        return {result.x, result.y};
    }

    Vec2Int Camera::worldToScreenPos(float x, float y) const
    {
        Vec2 pos(x, y);

        pos -= Vec2(m_CameraDim.minX, m_CameraDim.minY);

        pos -= m_Translate;

        float scaleX = m_WindowWidth / m_CameraDim.getWidth();
        float scaleY = m_WindowHeight / m_CameraDim.getHeight();

        pos *= Vec2(scaleX, scaleY);

        return {(int)pos.x, (int)pos.y};
    }

    Bounds Camera::getCameraDimensions()
    {
        float ratio = m_WindowWidth / m_WindowHeight;

        float width;
        float height;

        if (m_DocumentBounds.getWidth() / ratio > m_DocumentBounds.getHeight())
        {
            width = m_DocumentBounds.getWidth();
            height = width / ratio;
        }
        else
        {
            height = m_DocumentBounds.getHeight();
            width = height * ratio; // docDimensions.getRatio();
        }

        return Bounds::createWithPositions(-width / 2.0f, -height / 2.0f, width / 2.0f, height / 2.0f);
    }
} // namespace engine
} // namespace spright
