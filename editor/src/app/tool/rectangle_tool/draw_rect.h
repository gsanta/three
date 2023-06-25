#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/bounds.h"
#include "../../../maths/vec2_int.h"

namespace spright
{
namespace editor
{
    using namespace engine;
    using namespace maths;

    void draw_filled_rect(TileLayer &tileLayer, const Bounds &bounds, int color);

    void draw_outlined_rect(TileLayer &tileLayer, const Bounds &bounds, int color);

} // namespace editor
} // namespace spright
