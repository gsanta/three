#pragma once

#include "../../engine/scene/containers/tile_layer.h"
#include "../../maths/data/bounds.h"
#include "../../maths/vec2_int.h"
#include "../utils/declarations.h"

namespace spright
{
namespace editing
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

} // namespace editing
} // namespace spright
