#include "./rotate.h"

namespace spright
{
namespace editor
{
    void rotate(TileLayer &source, const BoundsInt &bounds, float angle)
    {
        float sina = sin(angle);
        float cosa = cos(angle);

        TileView dest(source.getBounds(), source.getTileSize());

        int minX = bounds.minX - (int)(bounds.getWidth()) < 0 ? 0 : bounds.minX - (int)(bounds.getWidth());
        int minY = bounds.minY - (int)(bounds.getHeight()) < 0 ? 0 : bounds.minY - (int)(bounds.getHeight());
        int maxX = bounds.maxX + (int)(bounds.getWidth());
        int maxY = bounds.maxY + (int)(bounds.getHeight());

        int width = source.getTileBounds().getWidth();
        int height = source.getTileBounds().getHeight();
        int widthMinus1 = width - 1;
        int heightMinus1 = height - 1;

        Vec2Int center = bounds.getCenter();

        for (int i = minY; i < maxY; i++)
        {
            int yDiff = center.y - i;
            for (int j = minX; j < maxX; j++)
            {
                int xDiff = center.x - j;
                int x = center.x + (int)(-xDiff * cosa - yDiff * sina);
                if (x < 0 || x > widthMinus1)
                    continue;
                int y = center.y + (int)(-yDiff * cosa + xDiff * sina);
                if (y < 0 || y > heightMinus1)
                    continue;

                Rect2D *tile = source.getAtTilePos(x, y);

                Vec2Int newDestPos = Vec2Int(j, i);

                if (tile != nullptr)
                {
                    Rect2D newTile(*tile);
                    newTile.setCenterPosition(source.getCenterPos(newDestPos));
                    dest.add(newTile, newDestPos);
                }
            }
        }

        tile_operation_remove_area(source, bounds);
        tile_operation_copy_all(dest, source);
    }
} // namespace editor
} // namespace spright
