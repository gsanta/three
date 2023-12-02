#include "./tile_operations.h"

namespace spright
{
namespace editing
{
    void tile_operation_copy_area(const TileView &source, TileView &dest, const BoundsInt &area, const Vec2Int &destPos)
    {
        const BoundsInt &destBounds = dest.getTileBounds();

        for (int i = 0; i < area.getWidth(); i++)
        {
            for (int j = 0; j < area.getHeight(); j++)
            {
                Rect2D *tile = source.getAtTilePos(area.minX + i, area.minY + j);

                if (tile == nullptr)
                {
                    continue;
                }

                Vec2Int newDestPos = Vec2Int(destBounds.minX + destPos.x + i, destBounds.minY + destPos.y + j);

                if (dest.getTileBounds().contains(newDestPos.x, newDestPos.y))
                {
                    Rect2D newTile(0, 0, dest.getTileSize(), dest.getTileSize(), tile->getColor());
                    newTile.setCenterPosition(dest.getCenterPos(newDestPos));
                    dest.add(newTile, newDestPos);
                }
            }
        }
    }

    void tile_operation_copy_all(const TileView &source, TileView &dest)
    {
        if (source.getTileBounds() != dest.getTileBounds())
        {
            throw std::invalid_argument("Can not copy to a tile view with different size");
        }

        tile_operation_copy_area(source, dest, source.getTileBounds());
    }

    void tile_operation_copy_indexes(const TileView &source, TileView &dest, const std::vector<int> &indexes)
    {
        for (int index : indexes)
        {
            Rect2D *tile = source.getAtTileIndex(index);

            if (tile != nullptr)
            {
                dest.add(*tile, source.getTilePos(index));
            }
        }
    }

    void tile_operation_remove_indexes(TileView &source, const std::vector<int> &indexes)
    {
        for (int index : indexes)
        {
            source.removeAt(index);
        }
    }

    void tile_operation_remove_area(TileView &tileView, const BoundsInt &area)
    {
        for (int i = 0; i < area.getWidth(); i++)
        {
            for (int j = 0; j < area.getHeight(); j++)
            {
                tileView.removeAt(tileView.getTileIndex(area.minX + i, area.minY + j));
            }
        }
    }
} // namespace editing
} // namespace spright
