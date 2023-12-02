#include "flip_horizontal.h"

namespace spright
{
namespace editing
{
    void flip_horizontal(TileLayer &layer)
    {
        const int layerWidth = layer.getTileBounds().getWidth();
        for (Rect2D *tile : layer.getTiles())
        {
            const Vec2Int tilePos = layer.getTilePos(tile->getPosition2d());
            layer.setTilePos(tile, Vec2Int(layerWidth - 1 - tilePos.x, tilePos.y));
        }
    }

    void flip_horizontal(TileLayer &layer, const SelectionBuffer &selectionBuffer)
    {
        const std::vector<int> tileIndexes = selectionBuffer.getTileIndexes();

        int boundsTileX = selectionBuffer.getTileBounds().minX;
        int boundsTileWidth = selectionBuffer.getTileBounds().getWidth();

        std::vector<Rect2D *> tiles;

        for (int index : tileIndexes)
        {
            Rect2D *tile = layer.getAtTileIndex(index);
            if (tile != nullptr)
            {
                tiles.push_back(tile);
            }
        }

        for (Rect2D *tile : tiles)
        {
            const Vec2Int tilePos = layer.getTilePos(tile->getPosition2d());
            int xStart = tilePos.x - boundsTileX;

            layer.setTilePos(tile, Vec2Int(boundsTileX + boundsTileWidth - 1 - xStart, tilePos.y));
        }
    }

    void flip_horizontal(std::vector<TileLayer> &layers)
    {
        for (TileLayer &layer : layers)
        {
            flip_horizontal(layer);
        }
    }

    void flip_horizontal(std::vector<TileLayer> &layers, const SelectionBuffer &selectionBuffer)
    {
        for (TileLayer &layer : layers)
        {
            flip_horizontal(layer, selectionBuffer);
        }
    }
} // namespace editing
} // namespace spright
