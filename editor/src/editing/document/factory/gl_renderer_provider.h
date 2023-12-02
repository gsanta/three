#pragma once
#include "../../../engine/graphics/renderer/gl/gl_renderer2d.h"
#include "../../../engine/graphics/shader/gl/gl_shader.h"
#include "renderer_provider.h"

namespace spright
{
namespace editing
{
    using namespace engine;

    class GLRendererProvider : public RendererProvider
    {
    public:
        std::unique_ptr<Renderer2D> createRenderer2D() const override;

        GLRendererProvider *clone() const override;
    };
} // namespace editing
} // namespace spright
