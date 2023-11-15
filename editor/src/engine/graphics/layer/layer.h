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
        void render(const Mat4 &proj, const Mat4 &view, Renderer2D &renderer);

        Renderable2D &add(const Renderable2D &rect);

        std::vector<Renderable2D *> &getRenderables();

        void clear();

    private:
        Group<Renderable2D> m_Group;
    };
} // namespace engine
} // namespace spright
