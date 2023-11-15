#pragma once
#include "../../../engine/graphics/impl/gl/gl_renderer2d.h"
#include "../../../engine/graphics/impl/gl/gl_shader.h"
#include "renderer_provider.h"

namespace spright
{
namespace editor
{
    using namespace engine;

    class GLRendererProvider : public RendererProvider
    {
    public:
        std::unique_ptr<Renderer2D> createRenderer2D() const override;

        GLRendererProvider *clone() const override;
    };
} // namespace editor
} // namespace spright
