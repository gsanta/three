#pragma once

#include "../../../engine/graphics/layer/tileLayer.h"
#include "../../../engine/graphics/renderable/bounds.h"
#include "../../../engine/graphics/renderable/rect2d.h"
#include "../../document/selection_buffer.h"

#include <cmath>
#include <vector>

namespace spright
{
namespace editor
{
    using namespace ::spright::engine;

    class BoxSelector
    {
    public:
        BoxSelector(std::shared_ptr<SelectionBuffer> selectionBuffer);

        ~BoxSelector();

        void select(const TileLayer &activeLayer, TileLayer &tempLayer, const Vec2 &curr, const Vec2 &start);

        void clear();

        bool isSelectionChanged(const TileLayer &layer, const Vec2 &curr, const Vec2 &prev, const Vec2 &start) const;

    private:
        void fillTempLayer(TileLayer &tempLayer, const Vec2 &curr, const Vec2 &start);

        BoundsInt calcSelectionBounds(const TileLayer &tempLayer, const Vec2 &vec1, const Vec2 &vec2) const;

    private:
        float m_DashSize = 0.2f;

        Vec2 m_SelectioinStart;

        std::shared_ptr<SelectionBuffer> m_SelectionBuffer;
    };
} // namespace editor
} // namespace spright
