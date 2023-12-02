#pragma once

#include "../../../../engine/scene/containers/tile_layer.h"
#include "./selection_buffer.h"

#include <queue>
#include <set>

namespace spright
{
namespace editing
{
    using namespace engine;

    class WandSelector
    {
    public:
        WandSelector(SelectionBuffer &selectionBuffer);

        void select(const TileLayer &activeLayer, TileLayer &toolLayer, const Vec2 &curr, const Vec2 &start);

    private:
        void visit(Rect2D &tile, const TileLayer &layer);

        void drawSelection(TileLayer &toolLayer);

    private:
        SelectionBuffer &m_SelectionBuffer;
    };
} // namespace editing
} // namespace spright
