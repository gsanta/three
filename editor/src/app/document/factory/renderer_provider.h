#pragma once
#include "../../../engine/graphics/renderer/renderer2d.h"

#include <memory>

namespace spright
{
namespace editor
{

    using namespace engine;

    class RendererProvider
    {
    public:
        virtual std::unique_ptr<Renderer2D> createRenderer2D() const = 0;

        virtual RendererProvider *clone() const = 0;
    };
} // namespace editor
} // namespace spright
