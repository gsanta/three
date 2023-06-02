#include "brush.h"

namespace spright
{
namespace editor
{

    void Brush::paint(TileLayer &tileLayer, const Vec2Int &tilePos, unsigned int color)
    {
        int tileIndex = tileLayer.getTileIndex(tilePos.x, tilePos.y);
        Renderable2D *renderable = tileLayer.getAtTileIndex(tileIndex);

        if (renderable == nullptr)
        {
            float halfTileSize = tileLayer.getTileSize() / 2.0f;
            Vec2 worldPos = tileLayer.getWorldPos(tileIndex) - Vec2(halfTileSize, halfTileSize);
            tileLayer.add(Rect2D(worldPos.x, worldPos.y, tileLayer.getTileSize(), tileLayer.getTileSize(), color));
        }
        else
        {
            renderable->setColor(color);
        }
    }
} // namespace editor
} // namespace spright
