#include "./wand_selector.h"

namespace spright
{
namespace editor
{
    WandSelector::WandSelector(SelectionBuffer &selectionBuffer) : m_SelectionBuffer(selectionBuffer)
    {
    }

    void WandSelector::select(const TileLayer &activeLayer, TileLayer &toolLayer, const Vec2 &curr, const Vec2 &start)
    {
        Rect2D *tile = activeLayer.getAtWorldPos(curr);

        if (tile != nullptr)
        {
            visit(*tile, activeLayer);
        }

        drawSelection(toolLayer);
    }

    void WandSelector::visit(Rect2D &tile, const TileLayer &layer)
    {
        std::queue<int> toVisit;
        std::set<int> visited;
        int color = tile.getColor();

        toVisit.push(layer.getTileIndex(tile));

        while (!toVisit.empty())
        {
            int current = toVisit.front();
            toVisit.pop();

            const bool isVisited = visited.find(current) != visited.end();

            if (isVisited)
            {
                continue;
            }

            visited.insert(current);

            Rect2D *currentTile = layer.getAtTileIndex(current);

            if (currentTile->getColor() == color)
            {
                m_SelectionBuffer.add(current, layer);
            }
            else
            {
                continue;
            }

            const Rect2D *neighbour = nullptr;

            for (int i = 0; i < 4; i++)
            {

                neighbour = layer.getNeighbour(current, static_cast<Direction>(i));
                if (neighbour == nullptr)
                {
                    continue;
                }

                const int neighbourIndex = layer.getTileIndex(*neighbour);
                toVisit.push(neighbourIndex);
            }
        }
    }

    void WandSelector::drawSelection(TileLayer &toolLayer)
    {
        float tileSize = toolLayer.getTileSize();
        unsigned int color = 0x800099ff;

        for (int index : m_SelectionBuffer.getTileIndexes())
        {
            Vec2 bottomLeft = toolLayer.getBottomLeftPos(index);
            Rect2D rect(bottomLeft.x, bottomLeft.y, tileSize, tileSize, color);

            toolLayer.add(rect);
        }
    }
} // namespace editor
} // namespace spright
