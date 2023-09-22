#pragma once

#include "../../engine/graphics/layer/tileLayer.h"
#include "../../engine/graphics/renderable/bounds_int.h"

#include <algorithm>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace engine;

    class SelectionBuffer
    {
    public:
        SelectionBuffer();

        void add(int tileIndex, const TileLayer &layer);

        void clear();

        const std::vector<int> &getTileIndexes();

        void setTileIndexes(std::vector<int> indexes);

        bool containsIndex(int index);

    private:
        void updateBounds();

    private:
        std::vector<int> m_TileIndexes;

        BoundsInt m_SelectionTileBounds;

        bool m_IsBoundsDirty = false;

        int minX = std::numeric_limits<int>::max();
        int minY = std::numeric_limits<int>::max();
        int maxX = std::numeric_limits<int>::min();
        int maxY = std::numeric_limits<int>::min();
    };
} // namespace editor
} // namespace spright
