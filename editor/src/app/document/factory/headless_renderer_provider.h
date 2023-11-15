#pragma once
#include "../../../engine/graphics/impl/headless/headless_renderer2d.h"
#include "renderer_provider.h"

namespace spright
{
namespace editor
{
    using namespace engine;

    class HeadlessRendererProvider : public RendererProvider
    {
    public:
        std::unique_ptr<Renderer2D> createRenderer2D() const override;

        HeadlessRendererProvider *clone() const override;
    };
} // namespace editor
} // namespace spright
