#include "flip_vertical.h"

namespace spright
{
namespace editor
{
    void flip_vertical(TileLayer &layer)
    {
        const int layerHeight = layer.getTileBounds().getHeight();
        for (Rect2D *tile : layer.getTiles())
        {
            const Vec2Int tilePos = layer.getTilePos(tile->getPosition2d());
            layer.setTilePos(tile, Vec2Int(tilePos.x, layerHeight - 1 - tilePos.y));
        }
    }
} // namespace editor
} // namespace spright
