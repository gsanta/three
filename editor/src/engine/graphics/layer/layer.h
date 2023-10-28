#pragma once
#include "../camera/camera.h"
#include "../renderer/renderer2d.h"
#include "group.h"

#include <memory>

namespace spright
{
namespace engine
{
    class Camera;

    class Layer
    {
    public:
        Layer(std::shared_ptr<Renderer2D> renderer);

        void render(const Camera &camera);

        Renderable2D &add(const Renderable2D &rect);

        std::vector<Renderable2D *> &getRenderables();

        void clear();

    private:
        std::shared_ptr<Renderer2D> m_Renderer;

        Group<Renderable2D> m_Group;
    };
} // namespace engine
} // namespace spright
