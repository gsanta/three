#include "brush.h"

namespace spright
{
namespace editor
{

    void Brush::paint(TileLayer &tileLayer, const Vec2Int &tilePos, unsigned int color, const onRect2DCreate &operation)
    {
        int tileIndex = tileLayer.getTileIndex(tilePos.x, tilePos.y);
        Renderable2D *renderable = tileLayer.getAtTileIndex(tileIndex);
        Vec2 worldPos = tileLayer.getBottomLeftPos(tileIndex);

        std::shared_ptr<Rect2D> prev;

        if (auto tile = tileLayer.getAtTilePos(tilePos.x, tilePos.y))
        {
            prev.reset(new Rect2D(*tile));
        }

        Rect2D &rect =
            tileLayer.add(Rect2D(worldPos.x, worldPos.y, tileLayer.getTileSize(), tileLayer.getTileSize(), color));

        std::shared_ptr<Rect2D> next = std::make_shared<Rect2D>(rect);

        operation(prev, next);
    }
} // namespace editor
} // namespace spright
