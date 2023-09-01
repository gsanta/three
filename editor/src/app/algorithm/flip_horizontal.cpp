#include "flip_horizontal.h"

namespace spright
{
namespace editor
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

    void flip_horizontal(TileLayer &layer, const Bounds &bounds)
    {
        RectSelector rectSelector(&layer);
        rectSelector.setSelection(bounds.getBottomLeft(), bounds.getTopRight());

        const std::vector<Rect2D *> tiles = rectSelector.getSelection();

        int boundsTileX = std::round(layer.getTilePos(bounds.getBottomLeft()).x);
        int boundsTileWidth = std::round(bounds.getWidth() / layer.getTileSize());

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

    void flip_horizontal(std::vector<TileLayer> &layers, const Bounds &bounds)
    {
        for (TileLayer &layer : layers)
        {
            flip_horizontal(layer, bounds);
        }
    }
} // namespace editor
} // namespace spright
