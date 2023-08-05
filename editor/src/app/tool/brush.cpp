#include "brush.h"

namespace spright
{
namespace editor
{

    void Brush::paint(TileLayer &tileLayer, const Vec2Int &tilePos, unsigned int color, const onRect2DCreate &operation)
    {
        int tileIndex = tileLayer.getTileIndex(tilePos.x, tilePos.y);
        Renderable2D *renderable = tileLayer.getAtTileIndex(tileIndex);
        if (renderable == nullptr)
        {
            float halfTileSize = tileLayer.getTileSize() / 2.0f;
            Vec2 worldPos = tileLayer.getWorldPos(tileIndex) - Vec2(halfTileSize, halfTileSize);

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
        else
        {
            renderable->setColor(color);
        }
    }
} // namespace editor
} // namespace spright
