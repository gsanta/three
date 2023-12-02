#pragma once

#include "../../../../engine/graphics/mesh/meshes/rect2d.h"
#include "../../../../engine/scene/containers/tile_layer.h"
#include "../../../../maths/data/bounds.h"
#include "./selection_buffer.h"

#include <cmath>
#include <vector>

namespace spright
{
namespace editing
{
    using namespace ::spright::engine;

    class BoxSelector
    {
    public:
        BoxSelector(SelectionBuffer &selectionBuffer);

        void select(const TileLayer &activeLayer, TileLayer &toolLayer, const Vec2 &curr, const Vec2 &start);

        void clear();

        bool isSelectionChanged(const TileLayer &layer, const Vec2 &curr, const Vec2 &prev, const Vec2 &start) const;

    private:
        void fillTempLayer(TileLayer &toolLayer, const Vec2 &curr, const Vec2 &start);

        BoundsInt calcSelectionBounds(const TileLayer &toolLayer, const Vec2 &vec1, const Vec2 &vec2) const;

    private:
        float m_DashSize = 0.2f;

        Vec2 m_SelectioinStart;

        SelectionBuffer &m_SelectionBuffer;
    };
} // namespace editing
} // namespace spright
