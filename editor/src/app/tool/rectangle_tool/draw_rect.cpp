#include "draw_rect.h"

#include <functional>

namespace spright
{
namespace editor
{
    void defaultRect2DCreate(std::shared_ptr<Rect2D> prev, std::shared_ptr<Rect2D> next)
    {
    }

    void draw_filled_rect(TileLayer &tileLayer, const Bounds &bounds, int color, const onRect2DCreate &operation)
    {
        Vec2Int bottomLeft = tileLayer.getTilePos(bounds.getBottomLeft());
        Vec2Int topRight = tileLayer.getTilePos(bounds.getTopRight());

        float tileSize = tileLayer.getTileSize();

        for (int i = bottomLeft.x; i < topRight.x; i++)
        {
            for (int j = bottomLeft.y; j < topRight.y; j++)
            {
                std::shared_ptr<Rect2D> prev;

                if (auto tile = tileLayer.getAtTilePos(i, j))
                {
                    prev.reset(new Rect2D(*tile));
                }

                Rect2D &rect = tileLayer.add(Rect2D(0, 0, tileSize, tileSize, color));
                tileLayer.setTilePos(&rect, Vec2Int(i, j));

                std::shared_ptr<Rect2D> newRect = std::make_shared<Rect2D>(rect);

                operation(prev, newRect);
            }
        }
    }

    void draw_outlined_rect(TileLayer &tileLayer, const Bounds &bounds, int color, const onRect2DCreate &operation)
    {
        Vec2Int bottomLeft = tileLayer.getTilePos(bounds.getBottomLeft());
        Vec2Int topRight = tileLayer.getTilePos(bounds.getTopRight());

        float tileSize = tileLayer.getTileSize();

        std::vector<Vec2Int> positions;

        for (int i = bottomLeft.x; i < topRight.x; i++)
        {
            positions.push_back(Vec2Int(i, topRight.y - 1));
        }

        for (int i = bottomLeft.x; i < topRight.x; i++)
        {
            positions.push_back(Vec2Int(i, bottomLeft.y));
        }

        for (int i = bottomLeft.y + 1; i < topRight.y - 1; i++)
        {
            positions.push_back(Vec2Int(bottomLeft.x, i));
        }

        for (int i = bottomLeft.y + 1; i < topRight.y - 1; i++)
        {
            positions.push_back(Vec2Int(topRight.x - 1, i));
        }

        Vec2 halfTilesize(tileLayer.getTileSize() / 2);

        for (Vec2Int &tilePos : positions)
        {
            std::shared_ptr<Rect2D> prev;
            if (auto tile = tileLayer.getAtTilePos(tilePos.x, tilePos.y))
            {
                prev.reset(new Rect2D(*tile));
            }

            Vec2 worldPos = tileLayer.getWorldPos(tilePos) - halfTilesize;
            Rect2D &rect = tileLayer.add(Rect2D(worldPos.x, worldPos.y, tileSize, tileSize, color));

            std::shared_ptr<Rect2D> newRect = std::make_shared<Rect2D>(rect);

            operation(prev, newRect);
        }
    }

} // namespace editor
} // namespace spright
