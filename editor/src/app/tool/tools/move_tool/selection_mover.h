#pragma once

#include "../../../../engine/graphics/layer/tileLayer.h"
#include "../../../../engine/graphics/renderable/rect2d.h"
#include "../../../../maths/vec2.h"
#include "../select_tool/selection_buffer.h"

#include <memory>

namespace spright
{
namespace editor
{
    using namespace engine;

    class SelectionMover
    {
    public:
        std::vector<int> move(TileLayer &layer, const Vec2 &curr, const Vec2 &prev, const Vec2 &start);

    private:
        Vec2 calcMoveToStart(TileLayer &layer, const Vec2 &prev, const Vec2 &start);

        Vec2 calcMoveToCurr(TileLayer &layer, const Vec2 &curr, const Vec2 &start);

        void translate(Rect2D &tile, Vec2 &deltaToStart, const Vec2 &deltaToCurr);
    };
} // namespace editor
} // namespace spright
