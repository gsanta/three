#include "./tile_operations.h"

namespace spright
{
namespace editor
{
    void tile_operation_copy_area(const TileView &source, TileView &dest, const BoundsInt &area, const Vec2Int &destPos)
    {
        for (int i = 0; i < area.getWidth(); i++)
        {
            for (int j = 0; j < area.getHeight(); j++)
            {
                Rect2D *tile = source.getAtTilePos(area.minX + i, area.minY + j);

                Vec2Int newDestPos = Vec2Int(destPos.x + i, destPos.y + j);

                if (tile != nullptr)
                {
                    Rect2D newTile(*tile);
                    dest.add(newTile, newDestPos);
                }
            }
        }
    }
} // namespace editor
} // namespace spright
