#include "headless_renderer_provider.h"

namespace spright
{
namespace editor
{
    std::shared_ptr<Renderer2D> HeadlessRendererProvider::createRenderer2D() const
    {
        return std::make_shared<HeadlessRenderer2D>();
    }

    HeadlessRendererProvider *HeadlessRendererProvider::clone() const
    {
        return new HeadlessRendererProvider();
    }
} // namespace editor
} // namespace spright
