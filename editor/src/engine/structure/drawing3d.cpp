#include "drawing3d.h"

namespace spright
{
namespace engine
{
    Drawing3d::Drawing3d(const std::string &uuid, const Bounds &bounds, const Renderer2D &renderer)
        : Canvas(uuid, bounds, renderer)
    {
    }

    Drawing3d &Drawing3d::operator=(const Drawing3d &other)
    {
        Canvas::operator=(other);

        m_Group = other.m_Group;
        return *this;
    }

    Renderable &Drawing3d::add(const Renderable &renderable)
    {
        Renderable &newRenderable = m_Group.add(renderable);

        Vec3 center = getBounds().getCenter();
        // newRenderable.setPosition(newRenderable.getPosition() + Vec3(center.x, center.y, 0));

        return newRenderable;
    }

    Drawing3d *Drawing3d::clone() const
    {
        return new Drawing3d(*this);
    }

    void Drawing3d::render(const Camera &camera, Canvas::RenderTarget target)
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
} // namespace engine
} // namespace spright
