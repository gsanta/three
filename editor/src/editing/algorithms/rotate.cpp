#include "./rotate.h"

namespace spright
{
namespace editing
{
    std::vector<int> rotate(TileLayer &source, const BoundsInt &bounds, float angle)
    {
        float sina = sin(angle);
        float cosa = cos(angle);

        TileView dest(source.getBounds(), source.getTileSize());

        int minX = bounds.minX;
        int minY = bounds.minY;
        int maxX = bounds.maxX;
        int maxY = bounds.maxY;

        int width = source.getTileBounds().getWidth();
        int height = source.getTileBounds().getHeight();
        int widthMinus1 = width - 1;
        int heightMinus1 = height - 1;

        Vec2Int center = bounds.getCenter() - Vec2Int(0, 0);

        double a = M_PI;

        int xOffset = 0;
        int yOffset = 0;

        for (int i = minX; i < maxX; i++)
        {
            int xDiff = center.x - i;
            for (int j = minY; j < maxY; j++)
            {
                int yDiff = center.y - j;
                int x = center.x + (int)std::round(-xDiff * cosa - yDiff * sina) + xOffset;
                int y = center.y + (int)std::round(-yDiff * cosa + xDiff * sina) + yOffset;

                Rect2D *tile = source.getAtTilePos(i, j);

                if (tile != nullptr)
                {
                    Vec2Int newDestPos = Vec2Int(x, y);
                    Rect2D newTile(*tile);
                    newTile.setCenterPosition(source.getCenterPos(newDestPos));
                    dest.add(newTile, newDestPos);
                }
            }
        }

        tile_operation_remove_area(source, bounds);
        tile_operation_copy_all(dest, source);

        std::vector<int> newIndexes;

        for (const Rect2D *tile : dest.getTiles())
        {
            newIndexes.push_back(dest.getTileIndex(tile->getCenterPosition2d()));
        }

        return newIndexes;
    }
} // namespace editing
} // namespace spright
