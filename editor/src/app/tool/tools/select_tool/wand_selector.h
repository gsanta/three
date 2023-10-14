#pragma once

#include "../../../../engine/graphics/layer/tileLayer.h"
#include "./selection_buffer.h"

#include <queue>
#include <set>

namespace spright
{
namespace editor
{
    using namespace engine;

    class WandSelector
    {
    public:
        WandSelector(SelectionBuffer &selectionBuffer);

        void select(const TileLayer &activeLayer, TileLayer &tempLayer, const Vec2 &curr, const Vec2 &start);

    private:
        void visit(Rect2D &tile, const TileLayer &layer);

        void drawSelection(TileLayer &tempLayer);

    private:
        SelectionBuffer &m_SelectionBuffer;
    };
} // namespace editor
} // namespace spright
