#pragma once

#include "../../engine/graphics/renderable/rect2d.h"

namespace spright
{
namespace editor
{
    using namespace engine;
    using onRect2DCreate = std::function<void(std::shared_ptr<Rect2D>, std::shared_ptr<Rect2D>)>;

    inline void defaultRect2DCreate(std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next)
    {
    }
} // namespace editor
} // namespace spright
