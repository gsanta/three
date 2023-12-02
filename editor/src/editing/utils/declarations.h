#pragma once

#include "../../engine/graphics/mesh/meshes/rect2d.h"

namespace spright
{
namespace editing
{
    using namespace engine;
    using onRect2DCreate = std::function<void(std::shared_ptr<Rect2D>, std::shared_ptr<Rect2D>)>;

    inline void defaultRect2DCreate(std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next)
    {
    }
} // namespace editing
} // namespace spright
