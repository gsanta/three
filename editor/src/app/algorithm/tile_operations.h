
#pragma once
#include "../../engine/graphics/layer/tile_view.h"
#include "../../engine/graphics/renderable/bounds_int.h"


namespace spright
{
namespace editor
{
    using namespace engine;

    void tile_operation_copy_area(const TileView &source,
                                  TileView &dest,
                                  const BoundsInt &area,
                                  const Vec2Int &dstPos = Vec2Int(0, 0));

    void tile_operation_copy_all(const TileView &source, TileView &dest);

    void tile_operation_copy_indexes(const TileView &source, TileView &dest, const std::vector<int> &indexes);

    void tile_operation_remove_indexes(TileView &source, const std::vector<int> &indexes);

    void tile_operation_remove_area(TileView &tileView, const BoundsInt &area);

} // namespace editor
} // namespace spright
