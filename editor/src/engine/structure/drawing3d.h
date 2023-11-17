#pragma once

#include "../graphics/layer/group.h"
#include "../graphics/renderable/renderable.h"
#include "canvas.h"

namespace spright
{
namespace engine
{
    class Drawing3d : public Canvas
    {
    public:
        Drawing3d(const std::string &uuid, const Bounds &bounds, const Renderer2D &renderer);

        Drawing3d &operator=(const Drawing3d &other);

        Renderable &add(const Renderable &renderable);

        void remove(const Renderable &renderable);

        std::vector<Renderable *> &getRenderables();

        Drawing3d *clone() const override;

        void render(const Camera &camera, Canvas::RenderTarget target) override;

    private:
        Group<Renderable> m_Group;
    };
} // namespace engine
} // namespace spright
