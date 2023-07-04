#pragma once

#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/renderable/bounds.h"
#include "drawing.h"

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    Drawing resize_drawing(Drawing &orig, Bounds bounds);

} // namespace editor
} // namespace spright
