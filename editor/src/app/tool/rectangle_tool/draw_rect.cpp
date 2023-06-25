#include "draw_rect.h"

namespace spright
{
namespace editor
{
    void draw_filled_rect(TileLayer &tileLayer, const Bounds &bounds, int color)
    {
        Vec2Int bottomLeft = tileLayer.getTilePos(bounds.getBottomLeft());
        Vec2Int topRight = tileLayer.getTilePos(bounds.getTopRight());

        float tileSize = tileLayer.getTileSize();

        for (int i = bottomLeft.x; i < topRight.x; i++)
        {
            for (int j = bottomLeft.y; j < topRight.y; j++)
            {
                Rect2D &rect = tileLayer.add(Rect2D(0, 0, tileSize, tileSize, color));

                tileLayer.setTilePos(&rect, Vec2Int(i, j));
            }
        }
    }

    void draw_outlined_rect(TileLayer &tileLayer, const Bounds &bounds, int color)
    {
        Vec2Int bottomLeft = tileLayer.getTilePos(bounds.getBottomLeft());
        Vec2Int topRight = tileLayer.getTilePos(bounds.getTopRight());

        float tileSize = tileLayer.getTileSize();

        for (int i = bottomLeft.x; i < topRight.x; i++)
        {
            Rect2D &rect = tileLayer.add(Rect2D(0, 0, tileSize, tileSize, color));

            tileLayer.setTilePos(&rect, Vec2Int(i, topRight.y - 1));
        }

        for (int i = bottomLeft.x; i < topRight.x; i++)
        {
            Rect2D &rect = tileLayer.add(Rect2D(0, 0, tileSize, tileSize, color));

            tileLayer.setTilePos(&rect, Vec2Int(i, bottomLeft.y));
        }

        for (int i = bottomLeft.y + 1; i < topRight.y - 1; i++)
        {
            Rect2D &rect = tileLayer.add(Rect2D(0, 0, tileSize, tileSize, color));

            tileLayer.setTilePos(&rect, Vec2Int(bottomLeft.x, i));
        }

        for (int i = bottomLeft.y + 1; i < topRight.y - 1; i++)
        {
            Rect2D &rect = tileLayer.add(Rect2D(0, 0, tileSize, tileSize, color));

            tileLayer.setTilePos(&rect, Vec2Int(topRight.x - 1, i));
        }
    }

} // namespace editor
} // namespace spright
