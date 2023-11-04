#pragma once

#include "../graphics/layer/group.h"
#include "../graphics/renderable/renderable3d.h"
#include "canvas.h"

namespace spright
{
namespace engine
{
    class Drawing3d : public Canvas
    {
    public:
        Drawing3d(const std::string &uuid,
                  const Bounds &bounds,
                  const Layer &decorationLayer,
                  std::shared_ptr<Renderer2D> renderer);

        Renderable3d &add(const Renderable3d &rect);

        Drawing3d *clone() const override;

        void render(const Camera &camera, Canvas::RenderTarget target) override;

    private:
        Group<Renderable3d> m_Group;

        std::shared_ptr<Renderer2D> m_Renderer;
    };
} // namespace engine
} // namespace spright
