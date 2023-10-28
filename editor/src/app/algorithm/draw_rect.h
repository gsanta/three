#pragma once

#include "../../engine/graphics/layer/tile_layer.h"
#include "../../engine/graphics/renderable/bounds.h"
#include "../../maths/vec2_int.h"
#include "../utils/declarations.h"

namespace spright
{
namespace editor
{
    using namespace engine;
    using namespace maths;

    void draw_filled_rect(TileLayer &tileLayer,
                          const BoundsInt &bounds,
                          int color,
                          const onRect2DCreate &operation = defaultRect2DCreate);

    void draw_outlined_rect(TileLayer &tileLayer,
                            const Bounds &bounds,
                            int color,
                            const onRect2DCreate &operation = defaultRect2DCreate);

} // namespace editor
} // namespace spright
