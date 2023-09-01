
#pragma once
#include "../../engine/graphics/layer/tile_view.h"
#include "../../engine/graphics/renderable/bounds_int.h"


namespace spright
{
namespace editor
{
    using namespace engine;

    void tile_operation_copy_area(const TileView &source, TileView &dest, const BoundsInt &area, const Vec2Int &dstPos);
} // namespace editor
} // namespace spright
