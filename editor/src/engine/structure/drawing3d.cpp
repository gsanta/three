#include "drawing3d.h"

namespace spright
{
namespace engine
{
    Drawing3d::Drawing3d(const std::string &uuid,
                         const Bounds &bounds,
                         const Layer &decorationLayer,
                         std::shared_ptr<Renderer2D> renderer)
        : Canvas(uuid, bounds, decorationLayer), m_Renderer(renderer)
    {
    }

    Renderable3d &Drawing3d::add(const Renderable3d &renderable)
    {
        Renderable3d &newRenderable = m_Group.add(renderable);

        return newRenderable;
    }

    Drawing3d *Drawing3d::clone() const
    {
        return new Drawing3d(*this);
    }

    void Drawing3d::render(const Camera &camera, Canvas::RenderTarget target)
    {
        m_Group.render(camera, *m_Renderer);

        if (target == Screen)
        {
            getDecorationLayer().render(camera);
        }
    }

} // namespace engine
} // namespace spright
