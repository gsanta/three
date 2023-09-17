#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/bounds_int.h"

namespace spright
{
namespace editor
{
    using namespace engine;

    BoundsInt calc_selection_bounds(const TileLayer &layer, const Vec2 &vec1, const Vec2 &vec2);
} // namespace editor
} // namespace spright
