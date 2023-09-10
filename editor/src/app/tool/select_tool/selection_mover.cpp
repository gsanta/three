
#include "./selection_mover.h"

namespace spright
{
namespace editor
{
    SelectionMover::SelectionMover(std::shared_ptr<SelectionBuffer> selectionBuffer)
        : m_SelectionBuffer(selectionBuffer)
    {
    }

    Vec2 SelectionMover::move(TileLayer &layer, const Vec2 &curr, const Vec2 &prev, const Vec2 &start)
    {
        Vec2 delta = curr - start;
        Vec2 deltaPrev = prev - start;

        float tileSize = layer.getTileSize();

        float tiledDeltaPrevX = static_cast<int>(deltaPrev.x / tileSize) * tileSize;
        float tiledDeltaPrevY = static_cast<int>(deltaPrev.y / tileSize) * tileSize;
        Vec2 tileDeltaPrev = Vec2(tiledDeltaPrevX, tiledDeltaPrevY);

        float tiledDeltaX = static_cast<int>(delta.x / tileSize) * tileSize;
        float tiledDeltaY = static_cast<int>(delta.y / tileSize) * tileSize;
        Vec2 tileDelta = Vec2(tiledDeltaX, tiledDeltaY);

        for (int tileIndex : m_SelectionBuffer->getTileIndexes())
        {
            Rect2D *tile = layer.getAtTileIndex(tileIndex);
            if (tile != nullptr)
            {
                tile->translate(-tileDeltaPrev);
                tile->translate(tileDelta);
            }
        }

        Vec2 diff = tileDelta - tileDeltaPrev;

        return diff;
    }

    void SelectionMover::finish(TileLayer &layer)
    {
        for (int tileIndex : m_SelectionBuffer->getTileIndexes())
        {
            Rect2D *tile = layer.getAtTileIndex(tileIndex);
            if (tile != nullptr)
            {
                layer.updateTileIndex(tile);
            }
        }
    }
} // namespace editor
} // namespace spright
