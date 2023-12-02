#pragma once
#include "../../../engine/graphics/renderer/headless/headless_renderer2d.h"
#include "renderer_provider.h"

namespace spright
{
namespace editing
{
    using namespace engine;

    class HeadlessRendererProvider : public RendererProvider
    {
    public:
        std::unique_ptr<Renderer2D> createRenderer2D() const override;

        HeadlessRendererProvider *clone() const override;
    };
} // namespace editing
} // namespace spright
