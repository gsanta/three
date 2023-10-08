#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/bounds_int.h"

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

        const std::vector<int> &getTileIndexes() const;

        void setTileIndexes(const std::vector<int> &indexes, const TileLayer &layer);

        bool containsIndex(int index);

        const BoundsInt &getTileBounds() const;

    private:
        void updateBounds(const Vec2Int &vec2);

    private:
        std::vector<int> m_TileIndexes;

        BoundsInt m_TileBounds;

        bool m_IsBoundsDirty = false;
    };
} // namespace editor
} // namespace spright
