#include "canvas2d.h"

namespace spright
{
namespace engine
{
    Canvas2d::Canvas2d(const std::string &uuid, const Bounds &bounds, const Renderer2D &renderer)
        : Canvas(uuid, bounds, renderer)
    {
    }

    Canvas2d::Canvas2d(const Canvas2d &canvas) : Canvas(canvas)
    {
        if (canvas.m_Camera)
        {
            m_Camera.reset(canvas.m_Camera->clone());
        }
    }

    Canvas2d &Canvas2d::operator=(const Canvas2d &other)
    {
        Canvas::operator=(other);

        if (other.m_Camera)
        {
            m_Camera.reset(other.m_Camera->clone());
        }

        return *this;
    }

    Canvas2d *Canvas2d::clone() const
    {
        return new Canvas2d(m_Uuid, m_Bounds, *m_Renderer);
    }

    void Canvas2d::setCamera(const Camera &camera)
    {
        m_Camera.reset(camera.clone());
    }

    Camera *Canvas2d::getCamera()
    {
        return m_Camera.get();
    }
} // namespace engine
} // namespace spright
