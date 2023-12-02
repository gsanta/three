#include "canvas3d.h"

namespace spright
{
namespace engine
{
    Canvas3d::Canvas3d(const std::string &uuid, const Bounds &bounds, const Renderer2D &renderer)
        : Canvas(uuid, bounds, renderer)
    {
    }

    Canvas3d::Canvas3d(const Canvas3d &drawing)
        : Canvas(drawing), m_Group(drawing.m_Group), m_GizmoGroup(drawing.m_GizmoGroup)
    {
        if (drawing.m_Camera)
        {
            m_Camera.reset(drawing.m_Camera->clone());
        }
    }

    Canvas3d &Canvas3d::operator=(const Canvas3d &other)
    {
        Canvas::operator=(other);

        if (other.m_Camera)
        {
            m_Camera.reset(other.m_Camera->clone());
        }

        m_Group = other.m_Group;
        m_GizmoGroup = other.m_GizmoGroup;

        return *this;
    }

    Mesh &Canvas3d::add(const Mesh &renderable)
    {
        Mesh &newRenderable = m_Group.add(renderable);

        Vec3 center = getBounds().getCenter();
        // newRenderable.setPosition(newRenderable.getPosition() + Vec3(center.x, center.y, 0));

        return newRenderable;
    }

    Group<Mesh> &Canvas3d::getGroup()
    {
        return m_Group;
    }

    Group<Mesh> &Canvas3d::getGizmoGroup()
    {
        return m_GizmoGroup;
    }

    Canvas3d *Canvas3d::clone() const
    {
        return new Canvas3d(*this);
    }

    void Canvas3d::render(const Camera &camera, Canvas::RenderTarget target)
    {
        const Camera *actualCamera = getCamera() != nullptr ? getCamera() : &camera;
        const Mat4 &proj = actualCamera->getProjectionMatrix();
        const Mat4 &view = actualCamera->getViewMatrix();

        m_Group.render(proj, view, getRenderer());

        if (target == Screen)
        {
            getDecorationLayer().render(proj, view, getRenderer());
        }
    }

    void Canvas3d::setCamera(const ArcRotateCamera &camera)
    {
        m_Camera.reset(camera.clone());
    }

    ArcRotateCamera *Canvas3d::getCamera()
    {
        return m_Camera.get();
    }
} // namespace engine
} // namespace spright
