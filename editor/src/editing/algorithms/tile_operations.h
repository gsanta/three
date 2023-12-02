
#pragma once
#include "../../engine/scene/containers/tile_view.h"
#include "../../maths/data/bounds_int.h"


namespace spright
{
namespace editing
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

} // namespace editing
} // namespace spright
